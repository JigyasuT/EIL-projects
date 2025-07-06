// const express = require("express");
// const app = express();
// require("dotenv").config();
// require("./models/db");
// app.use(express.json()); // ✅ This line enables req.body to work
// const cors = require("cors");
// const multer = require("multer");
// app.use(express.urlencoded({ extended: true }));
// const AuthRouter = require("./routes/AuthRouter");
// const PersonRouter=require('./routes/PersonRouter')
// // const applicationRoutes = require("./routes/applicationRoutes"); 
// const storage = multer.memoryStorage(); // or use diskStorage
// const upload = multer({ storage: storage });

// const PORT = process.env.PORT || 3001;

// app.use(cors({
//   origin: "http://localhost:8080", // frontend port
//   credentials: true // if you're using cookies or auth headers
// }));

// // your routes and other middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Welcome from Eil");
// });

// app.use("/auth", AuthRouter);
// app.use("/userdata", PersonRouter);
// app.use("/",AuthRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on the port http://localhost:${PORT}`);
// });





const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const multer = require("multer");

// Middleware
// app.use(cors({
//   origin: "http://localhost:8080", // Frontend origin
//   credentials: true
// }));
app.use(cors({
  origin: ["https://eil-projects-kws7.vercel.app", "http://localhost:8080"], // ✅ Allow both production and local frontend
  credentials: true
}));



// // ✅ Correct CORS setup
// const allowedOrigins = [
//   "http://localhost:8080",                  // Local dev
//   "http://localhost:3000",                  // Local dev alternative
//   "https://eil-projects-kws7.vercel.app"    // ✅ Your deployed frontend on Vercel
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));


// Multer setup (memory storage for now, can be changed later)
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// Routes
const AuthRouter = require("./routes/AuthRouter");
const PersonRouter = require("./routes/PersonRouter");
// const ApplicationRouter = require("./routes/applicationRoutes"); // Uncomment when available


// Health check
app.get("/", (req, res) => {
  res.send("Welcome from Eil");
});

// Use routers
app.use("/auth", AuthRouter);
app.use("/userdata", PersonRouter);
// app.use("/application", ApplicationRouter); // Recommended route prefix for applications
app.use("/",AuthRouter);
// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on the port http://localhost:${PORT}`);
});
