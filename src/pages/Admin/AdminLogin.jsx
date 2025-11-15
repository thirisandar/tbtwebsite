// src/pages/Admin/AdminLogin.jsx
import React, { useState } from 'react';
// ⭐️ IMPORT Firebase Auth and the initialized 'auth' object ⭐️
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust path if necessary

function AdminLogin({ setCurrentView, views, onLoginSuccess }) {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the login attempt
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Start loading state

    try {
      // 1. Firebase Authentication attempt
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. SUCCESS: The user object is returned
      // Note: We use the email here, as we cannot guarantee 'name' is in the user object
      // The admin dashboard can use the email for display.
      onLoginSuccess(user.email); 
      
    } catch (firebaseError) {
      // 3. FAILURE: Firebase returns an error code (e.g., 'auth/user-not-found')
      console.error("Firebase Login Error:", firebaseError);
      
      let message = "An unexpected login error occurred.";
      
      // Provide user-friendly messages based on common Firebase errors
      switch (firebaseError.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          message = "Invalid Admin Email or Password. Please check your credentials.";
          break;
        case 'auth/too-many-requests':
          message = "Access temporarily blocked due to too many failed attempts.";
          break;
        default:
          message = "Login failed. Please check your internet connection or contact support.";
      }
      
      setError(message);
      
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-1">
          Log in to get access
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign in to the TBT Business Management Dashboard
        </p>
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Disable inputs while loading
              disabled={isLoading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="e.g., admin1@tbt.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // Disable inputs while loading
              disabled={isLoading}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your secret password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </p>
          )}

          {/* Log In Button (Primary Action) */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
          
        </form>

        {/* Back to Home Link (Under the buttons, as requested) */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => setCurrentView(views.HOME)}
            className="text-md font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition duration-150"
          >
            ← Back to TBT Website
          </button>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;