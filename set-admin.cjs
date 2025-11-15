// set-admin.cjs
const admin = require('firebase-admin');

// ⭐️ CRITICAL FIX: Added './' to specify the file is in the current directory ⭐️
const serviceAccount = require('./key.json'); 

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Admin UID confirmed from your previous input
const adminUID = 'G0r02OpUjLYK5QUNNBuhaCm6AeP2'; 
const customClaims = {
  admin: true
};

admin.auth().setCustomUserClaims(adminUID, customClaims)
  .then(() => {
    console.log(`✅ Success! Custom claim 'admin: true' set for user: ${adminUID}`);
    console.log('--- ACTION REQUIRED: Log out and log back into the React app immediately. ---');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error setting custom claim:', error);
    process.exit(1);
  });