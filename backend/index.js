require('dotenv').config(); // Load environment variables
const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const bcrypt = require('bcryptjs');
const cors = require('cors'); // Import CORS middleware
const multer = require('multer'); // Import multer for file uploads
const path = require('path'); // For handling file paths
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import socket.io


// Initialize express and http server
const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port
const server = http.createServer(app); // Create server with http
const io = new Server(server, {
  cors: {
    origin: '*', // Allow cross-origin requests
    methods: ['GET', 'POST'],
  },
});
const allowedOrigins = ['http://localhost:3000', 'https://thefoundershubb.netlify.app'];

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));



// Configure PostgreSQL connection with SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Disable SSL certificate validation
  },
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name collisions
  },
});
const upload = multer({ storage: storage });

// Real-time Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for job postings
  socket.on('newJob', (job) => {
    // Emit the job posting to all connected clients
    io.emit('jobPosted', job);
  });

  

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });

});


// Signup Route to handle POST request
app.post('/signup', async (req, res) => {
  const { fullName, firstName, gmailId, mobileNumber, profile, gender, dob, hasAssets, password } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE gmail_id = $1', [gmailId]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists with this Gmail ID' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (full_name, first_name, gmail_id, mobile_number, profile, gender, dob, has_assets, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [fullName, firstName, gmailId, mobileNumber, profile, gender, dob, hasAssets === 'yes', hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error saving user:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { gmailId, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE gmail_id = $1', [gmailId]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid Gmail ID' });
    }

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      token: 'your-generated-token', // Placeholder for a real token
      profile: user.profile, // Add profile to response
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Post startup details route
app.post('/startups', upload.single('companyLogo'), async (req, res) => {
  const { companyName, founders, industry, productServices, targetMarket, revenueGeneration, fundingStage, previousHistory, teamSize, companyHQ, companyWebsite } = req.body;
  const companyLogo = req.file ? req.file.path : null; // Get file path from multer

  try {
    const result = await pool.query(
      'INSERT INTO startups (company_name, founders, industry, product_services, target_market, revenue_generation, funding_stage, previous_history, team_size, company_hq, company_website, logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [companyName, founders, industry, productServices, targetMarket, revenueGeneration, fundingStage, previousHistory, teamSize, companyHQ, companyWebsite, companyLogo]
    );

    res.status(201).json({ message: 'Signup successful', startup: result.rows[0] });
  } catch (error) {
    console.error('Error saving startup details:', error.message);
    res.status(500).json({ message: 'Submission failed' });
  }
});

// Job posting route
app.post('/jobs', async (req, res) => {
  const { title, description, requirements, location, startup_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, description, requirements, location, startup_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, requirements, location, startup_id]
    );

    const newJob = result.rows[0];
    io.emit('jobPosted', newJob); // Emit new job to clients

    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (error) {
    console.error('Error posting job:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch jobs route
app.get('/jobs', async (req, res) => {
  try {
    const jobsListing = `
      SELECT jobs.title, jobs.description, jobs.requirements, jobs.location, startups.company_name 
      FROM jobs 
      JOIN startups ON jobs.startup_id = startups.id;
    `;
    const result = await pool.query(jobsListing);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update job route
app.put('/jobs/:id', async (req, res) => {
  const { id } = req.params; // Get job ID from request params
  const { title, description, requirements, location } = req.body; // Get updated data from request body

  try {
    const result = await pool.query(
      `UPDATE jobs
       SET title = $1, description = $2, requirements = $3, location = $4
       WHERE id = $5
       RETURNING *`,
      [title, description, requirements, location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job updated successfully', job: result.rows[0] });
  } catch (error) {
    console.error('Error updating job:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete job route
app.delete('/jobs/:id', async (req, res) => {
  const { id } = req.params; // Get job ID from request params

  try {
    const result = await pool.query(
      'DELETE FROM jobs WHERE id = $1 RETURNING *', // Fixed missing quotes
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/pitches', async (req, res) => {
  const { title, description, requirements, location, investment_amount, valuation, investment_type, startup_id } = req.body;
  console.log("Received data:", { requirements, investment_amount, investment_type });

  try {
    const newPitch = await pool.query(
      'INSERT INTO pitches (title, description, requirements, location, investment_amount, valuation, investment_type, startup_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, description, requirements, location, investment_amount, valuation, investment_type, startup_id]
    );

    res.status(201).json(newPitch.rows[0]);
  } catch (error) {
    console.error('Error creating pitch:', error);
    res.status(500).send('Server error');
  }
});

app.get('/pitches', async (req, res) => {
  try {
    const pitches = await pool.query('SELECT * FROM pitches');
    res.status(200).json(pitches.rows); // Send all pitches as a response
  } catch (error) {
    console.error('Error fetching pitches:', error);
    res.status(500).send('Server error');
  }
});
app.post('/invest', (req, res) => {
  const { pitchId, startupId, investorName } = req.body;

  // Input validation
  if (!pitchId || !startupId || !investorName) {
    return res.status(400).json({ error: 'Pitch ID, Startup ID, and Investor Name are required.' });
  }

  // Emit the notification event to all connected clients
  io.emit('investmentNotification', {
    message: `Investor ${investorName} is interested in your startup!`,
    startupId: startupId // Send the startupId to identify the correct startup
  });

  res.status(200).json({ message: 'Investment notification sent via Socket.io' });
});

// POST route to add investor details
app.post('/investors', async (req, res) => {
  const { investor_name, expertise, interested_sectors, what_provide_to_entrepreneurs, type_of_company } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO investors (investor_name, expertise, interested_sectors, what_provide_to_entrepreneurs, type_of_company) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [investor_name, expertise, interested_sectors, what_provide_to_entrepreneurs, type_of_company]
    );
    res.status(201).json(result.rows[0]); // Respond with the created investor data
  } catch (error) {
    console.error('Error inserting investor data:', error.message);
    res.status(500).json({ error: 'Failed to add investor' });
  }
});

// GET route to fetch all investor details
app.get('/investors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM investors');
    res.status(200).json(result.rows); // Respond with the list of investors
  } catch (error) {
    console.error('Error fetching investors:', error.message);
    res.status(500).json({ error: 'Failed to fetch investors' });
  }
});

app.post('/business_overview', async (req, res) => {
  const { revenue, customers, profit, burnRate } = req.body;

  try {
    // Log the incoming data
    console.log("Received data for business overview:", { revenue, customers, profit, burnRate });

    // Insert data into the database
    const result = await pool.query(
      'INSERT INTO business_overview (revenue, customers, profit, burn_rate) VALUES ($1, $2, $3, $4) RETURNING *',
      [revenue, customers, profit, burnRate]
    );

    // Log the result of the query to confirm successful insertion
    console.log("Database insertion result:", result.rows[0]);

    // Emit the new data to all clients
    io.emit('updateBusinessData', result.rows[0]);

    res.status(201).json({ message: 'Business overview data saved successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error saving business overview data:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Get business overview details
app.get('/business_overview', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM business_overview ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching business overview data:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/business_overview/latest', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.business_overview ORDER BY created_at DESC LIMIT 1');
    console.log('Latest business overview result:', result.rows); // Log the result
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(204).send(); // No content
    }
  } catch (error) {
    console.error('Error fetching latest business overview:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Assuming you have already set up your Express app and PostgreSQL client
app.post('/funding', async (req, res) => {
  const { amount, investors, milestone } = req.body;
  try {
      await pool.query(
          'INSERT INTO funding (amount, investors, milestone) VALUES ($1, $2, $3)',
          [amount, investors, milestone]
      );
      res.status(201).send('Funding data saved successfully');
  } catch (error) {
      console.error('Error saving funding data:', error);
      res.status(500).send('Error saving funding data');
  }
});

app.get('/financial_snapshot', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM public.financial_snapshot ORDER BY created_at DESC LIMIT 1');
      res.json(result.rows[0]); // Return the most recent entry
  } catch (error) {
      console.error('Error fetching financial snapshot:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/financial_snapshot', async (req, res) => {
  const { totalExpenses } = req.body;

  // Check if totalExpenses is provided
  if (totalExpenses === undefined || totalExpenses === null) { // Ensure it is not null or undefined
      return res.status(400).json({ error: 'Total expenses are required' });
  }

  try {
      // Logic to insert totalExpenses into the database
      await pool.query('INSERT INTO public.financial_snapshot (total_expenses) VALUES ($1)', [totalExpenses]); // Corrected column name
      res.status(201).send('Expenses saved');
  } catch (error) {
      console.error('Error saving expenses:', error);
      res.status(500).send('Error saving expenses');
  }
});

app.post('/mentors', async (req, res) => {
  const { name, expertise, email } = req.body;
  try {
    const newMentor = await pool.query(
      'INSERT INTO mentors (name, expertise, email) VALUES ($1, $2, $3) RETURNING *',
      [name, expertise, email]
    );
    res.json(newMentor.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Fetch all mentors
app.get('/mentors', async (req, res) => {
  try {
    const allMentors = await pool.query('SELECT * FROM mentors');
    res.json(allMentors.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Save upcoming mentoring sessions
app.post('/sessions', async (req, res) => {
  const { session_name, session_date, session_time, location } = req.body;
  try {
    const newSession = await pool.query(
      'INSERT INTO mentoring_sessions (session_name, session_date, session_time, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [session_name, session_date, session_time, location]
    );
    res.json(newSession.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Fetch upcoming sessions
app.get('/sessions', async (req, res) => {
  try {
    const allSessions = await pool.query('SELECT * FROM mentoring_sessions');
    res.json(allSessions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new class
app.post('/classes', (req, res) => {
  const { class_name, class_details, class_date, class_time } = req.body; // Ensure these match the request body
  const query = `
    INSERT INTO public.classes (class_name, class_details, class_date, class_time)
    VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [class_name, class_details, class_date, class_time];

  pool.query(query, values)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => {
      console.error('Error adding class:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


app.get('/classes', (req, res) => {
  const query = 'SELECT id, class_name, class_details, class_date, class_time FROM classes WHERE class_date >= NOW() ORDER BY class_date ASC';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching classes:', error);
      res.status(500).send('Error fetching classes');
    } else {
      res.json(results.rows);
    }
  });
});




// Start the server with Socket.io
server.listen(port, () => {
  console.log(`Server running on port ${port}`); // Used template literals for consistency
});
