import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Server/config/db.js";
import path from "path";
import UserRoutes from "./Server/router/users.js";
import AdminRoutes from "./Server/router/admin.js";
import CompanyRoutes from "./Server/router/company.js";
import JobRoutes from "./Server/router/job.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// CROSS-ORIGIN ACCESS
app.use(cors());

// DEALING WITH THE SIZE OF URL ENCODED BODIES COMING FROM CLIENT
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);

// DEALING WITH THE SIZE OF URL JSON BODIES COMING FROM CLIENT
app.use(bodyParser.json({ limit: "50mb" }));

// CONNECTING TO MONGO DB (IN FOLDER CONFIG)
connectDB();

// ROUTES TO THE USERS
app.use("/user", UserRoutes);
// ROUTES TO THE COMPANY
app.use("/company", CompanyRoutes);
// ROUTES TO THE JOB
app.use("/job", JobRoutes);

// app.use('/admin', AdminRoutes);
// Serve static assets in production
// app.get("/", (req, res) => {
//   res.send("Hello it is Recrutior");
// });

// SCRIPT OF PRODUCTION
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(__dirname, "client", "build", "index.html");
    });
}

// LISTENING TO THE PORT
app.listen(PORT, console.log(`Server running on port ${PORT}`));
