const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "weddingvenue",
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to MySQL database");
});

// Register User
app.post('/api/register', async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
            [email, hashedPassword, username],
            (err, result) => {
                if (err) {
                    console.error("Error inserting user:", err);
                    return res.status(500).json({ message: 'Error registering user.' });
                }
                res.status(201).json({ message: 'Registration successful!' });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error occurred.' });
    }
});

// Login User
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const storedPassword = results[0].password;
        const isValidPassword = await bcrypt.compare(password, storedPassword);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.json({ message: "Login successful", email: results[0].email, role: results[0].role });
    });
});

app.get("/api/dashboard", (req, res) => {
    const statsQuery = `
        SELECT 
            (SELECT COUNT(*) FROM bookings WHERE status='booked') AS newBookings,
            (SELECT COUNT(*) FROM venues WHERE available=1) AS availableRooms,
            (SELECT SUM(amount) FROM bookings) AS revenue,
            (SELECT COUNT(*) FROM bookings WHERE status='checkout') AS checkouts;
    `;

    const bookingQuery = `
        SELECT DATE_FORMAT(check_in, '%m/%d') AS date, 
               COUNT(CASE WHEN status='booked' THEN 1 END) AS booked, 
               COUNT(CASE WHEN status='cancelled' THEN 1 END) AS cancelled 
        FROM bookings 
        WHERE check_in >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY check_in;
    `;

    const venueQuery = `
        SELECT 
            COUNT(CASE WHEN status='occupied' THEN 1 END) AS occupied,
            COUNT(CASE WHEN status='reserved' THEN 1 END) AS reserved,
            COUNT(CASE WHEN status='available' THEN 1 END) AS available,
            COUNT(CASE WHEN status='maintenance' THEN 1 END) AS notReady
        FROM venues;
    `;

    db.query(statsQuery, (err, statsResult) => {
        if (err) {
            console.error("Error fetching stats:", err);
            return res.status(500).json({ error: err.message });
        }

        db.query(bookingQuery, (err, bookingResult) => {
            if (err) {
                console.error("Error fetching bookings:", err);
                return res.status(500).json({ error: err.message });
            }

            db.query(venueQuery, (err, venueResult) => {
                if (err) {
                    console.error("Error fetching venues:", err);
                    return res.status(500).json({ error: err.message });
                }

                console.log("Stats Result:", statsResult);
                console.log("Booking Result:", bookingResult);
                console.log("Venue Result:", venueResult);

                res.json({
                    stats: statsResult[0] || {}, // Ensure object structure
                    bookings: bookingResult || [], // Ensure array structure
                    rooms: venueResult[0] || {} // Ensure object structure
                });
            });
        });
    });
});



app.get("/api/bookings", (req, res) => {
    db.query("SELECT * FROM bookings", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

app.post("/api/bookings", (req, res) => {
    console.log("Received Booking Request:", req.body); // Log request data

    const { user_id, venue_id, customer, email, packageType, status, checkIn, checkOut, payment, contact } = req.body;

    if (!user_id || !venue_id || !customer || !email || !packageType || !checkIn || !checkOut || !payment || !contact) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert into MySQL with updated column name
    const sql = `INSERT INTO bookings (user_id, venue_id, customer, email, package_type, status, checkIn, checkOut, payment, contact) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [user_id, venue_id, customer, email, packageType, status, checkIn, checkOut, payment, contact], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Booking created successfully!", bookingId: result.insertId });
    });
});





app.get("/api/venues", (req, res) => {
    db.query("SELECT * FROM venues", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching venues" });
        }
        res.json(results);
    });
});

app.post("/api/add-venue", upload.single("image"), async (req, res) => {
    try {
        console.log("Received request:", req.body);
        console.log("Uploaded file:", req.file);

        const { name, location, capacity, pricePerHour, about, googleMapLink } = req.body;
        const image = req.file ? req.file.filename : null;

        const sql = `
    INSERT INTO venues (name, location, capacity, pricePerHour, about, googleMapLink, imageDir)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;
        const values = [name, location, capacity, pricePerHour, about, googleMapLink, image];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Error adding venue", error: err.message });
            }
            res.json({ message: "Venue added successfully", id: result.insertId });
        });

    } catch (error) {
        console.error("Error adding venue:", error);
        res.status(500).json({ message: "Error adding venue", error: error.message });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
