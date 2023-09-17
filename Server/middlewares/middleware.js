import jwt from "jsonwebtoken";

const companySecretKey = process.env.companySecretKey;

// Middleware to verify JWT tokens for user authentication
export const verifyJWT = (req, res, next) => {
    const secretKey = process.env.JWToken;
    const token = req.headers["authorization"];

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }

        // Store the user ID from the token in the request object
        req.user = user.user.id;
        next();
    });
};

// Function to generate JWT token for the company
export const generateCompanyToken = (id) => {
    const token = jwt.sign({ id }, companySecretKey, { expiresIn: "5 days" });
    return token;
};

// Middleware to verify JWT tokens for company authentication
export const verifyCompanyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token using the company's secret key
    jwt.verify(token, companySecretKey, (err, result) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }

        // Store the company ID from the token in the request object
        req.company = result.id;
        next();
    });
};
