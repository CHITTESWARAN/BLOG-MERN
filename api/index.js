const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./Models/user");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const fs = require('fs');
const path = require("path");
const Post = require("./Models/post");

// CORS middleware for allowing front-end communication
app.use(cors({
    origin: 'http://localhost:5173', // React app running on localhost:5173
    credentials: true,
}));

// Middleware for handling file uploads
const uploadMiddleware = multer({ dest: 'uploads/' });
app.use(cookieParser());
app.use(express.json());

// Serve the uploads directory as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//it is use to the use the a the images for the local foalder.

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://chitteswarancj06:XgJ38-2w5X%3FYbHr@cluster0.zx7h3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

// Connect to the database
connectDB();

// JWT secret
const secret = "snxk93p3mxnz63ms9";

// Register Route
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json("Username and Password are required");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userDoc = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", user: { id: userDoc._id, username: userDoc.username } });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).send("Error registering user");
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            return res.status(400).json("Wrong credentials");
        }

        const passOk = await bcrypt.compare(password, userDoc.password);

        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true, secure: false }).json({ id: userDoc._id, username });
            });
        } else {
            res.status(400).json("Wrong credentials");
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json("Server error");
    }
});

// Profile Route
app.get('/profile', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json('No token provided');
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(401).json('Invalid token');
        }
        res.json(user);
    });
});

// Logout Route
app.post("/logout", (req, res) => {
    res.cookie("token", "", { expires: new Date(0) }).json("ok");
});

// Post Route with file upload
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
    const { originalname, path: tempPath } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path.join(__dirname, 'uploads', `${req.file.filename}.${ext}`); // Set new path for the file with extension

    fs.rename(tempPath, newPath, async (err) => {
        if (err) {
            console.error("Error renaming file:", err);
            return res.status(500).json("Error uploading file");
        }

        const { token } = req.cookies;
        // Verify the user by using the token in the cookies
        jwt.verify(token, secret, async (err, user) => {
            if (err) {
                return res.status(401).json('Invalid token');
            }

            const { title, summary, content } = req.body;

            try {
                const postDoc = await Post.create({
                    title,
                    summary,
                    content,
                    cover: newPath,
                    author:user.id,

                });
                res.json(postDoc);
            } catch (error) {
                console.error("Error creating post:", error.message);
                res.status(500).json("Error creating post");
            }
        });
    });
});

// Get all posts
app.get('/post', async (req, res) => {
    try {
            //populate author is used to a the return  post collection along the user collection  author also included and tells the author give only usernameto Store the username in a cookie after login to manage user sessions.
        const posts = await Post.find()
        .populate('author',["username"])
        .sort({createdAt:-1})
        .limit(20)
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json("Error fetching posts");
    }
});

app.get("/post/:id", async (req, res) => {
    const { token } = req.cookies; // Extract token from cookies
    const { id } = req.params; // Extract post ID from URL params
  
    // Verify JWT token
    jwt.verify(token, secret, async (err, user) => {
      if (err) {
        return res.status(401).json('Invalid token'); // Send 401 if token is invalid
      }
  
      try {
        // Find the authenticated user in the User collection
        const userDoc = await User.findById(user.id);
  
        if (!userDoc) {
          return res.status(404).json('User not found'); // Send 404 if user doesn't exist
        }
        
        console.log("Authenticated user found in the database");
  
        // Fetch the post by ID if user is valid
        const postDoc = await Post.findById(id).populate('author', 'username');
  
        if (!postDoc) {
          return res.status(404).json('Post not found'); // Send 404 if post not found
        }
  
        // Return the post data
        return res.json(postDoc);
  
      } catch (error) {
        console.error("Error:", error.message); // Log the error
        return res.status(500).json('Server error'); // Send server error
      }
    });
  });
  
// Start the server
app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000`);
});
