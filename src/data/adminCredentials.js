// src/data/adminCredentials.js

// ⚠️ IMPORTANT: In a REAL application, these credentials would be stored
// securely in a backend database (hashed), not in a client-side file.
// This setup is ONLY for simulating authentication in a pure React front-end environment.

export const ADMIN_USERS = [
    { 
        email: "admin1@tbt.com", 
        password: "securepassword123", 
        name: "Aung Aung" 
    },
    { 
        email: "thiris613@gmail.com", 
        password: "12345678", 
        name: "Thiri" 
    },
];

// We will use these credentials in AdminLogin.jsx