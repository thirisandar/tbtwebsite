import React from 'react';

// ⭐️ Import the new conditional views ⭐️
import ActiveBusinessDirectory from './ActiveBusinessDirectory'; 
import MemberLoginRegistrationForm from './MemberLoginRegistrationForm'; 

// -----------------------------------------------------------------
// ⭐️ MAIN HOME COMPONENT (The Gatekeeper) ⭐️
// -----------------------------------------------------------------
function Home({ setCurrentView, views, memberUser, onMemberLoginSuccess, onMemberLogout }) {
  
  // --- Dynamic Header Buttons ---
  const renderHeaderButton = () => {
    if (memberUser) {
        // Logged in: Show Dashboard button and Logout button
        return (
            <div className="flex space-x-3 items-center">
                <p className="hidden sm:block text-sm font-medium text-gray-700">
                Homepageမှကြိုဆိုပါသည်, {memberUser['Owner Name'] || 'Member'}
                </p>
                <button 
                    onClick={() => setCurrentView(views.MEMBER_DASHBOARD)} 
                    className="sm:px-4 py-2 px-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-800 transition duration-150 shadow-md text-sm cursor-pointer"
                >
                   Go to dashboard
                </button>
                 <button 
                    onClick={onMemberLogout} // Call the logout handler from App.jsx
                    className="sm:px-4 py-2 px-3 bg-red-500 text-black font-medium rounded-full hover:bg-red-600 hover:text-white transition duration-150 shadow-md text-sm cursor-pointer"
                >
                    Logout
                </button>
            </div>
        );
    }
    
    // Not logged in: Only show the Admin Login button
    return (
        <div className="flex space-x-3 items-center">
             <button 
                onClick={() => setCurrentView(views.ADMIN_LOGIN)}
                className="px-4 py-2 cursor-pointer bg-blue-800 text-white font-medium rounded-full hover:bg-blue-900 transition duration-150 shadow-md text-sm"
             >
                Admin Login
             </button>
        </div>
    );
  }
  
  // ⭐️ CRITICAL FIX: CONDITIONAL MAIN CONTENT ⭐️
// File: Home.jsx

const renderMainContent = () => {
    
    // ⭐️ FIX 3: If member is logged in, force the redirect to the full dashboard ⭐️
    if (memberUser) {
        // This stops Home.jsx from rendering the incomplete directory
        return <ActiveBusinessDirectory />;
    }               
    
    // If not logged in, continue with the login/registration form
    return (
        <>
            <MemberLoginRegistrationForm
                onMemberLoginSuccess={onMemberLoginSuccess}
            />
            <ActiveBusinessDirectory />
            {/* If you have ActiveBusinessDirectory here, it only renders when logged out */}
        </>
    );
}

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* 1. HEADER SECTION */}
      <header className="p-4 bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between">
            
            {/* LEFT SIDE: Logo and Title/Text (Same as previous step) */}
            <div 
                className="flex items-center space-x-3 cursor-pointer" 
                onClick={() => setCurrentView(views.HOME)}
            >
                 <img 
                    src="/tbtlogo.jpg" 
                    alt="TBT Logo" 
                    className="h-10 sm:h-12 w-auto rounded-full" 
                />
                <div>
                     <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 tracking-tight">Thursday Business Talk</h1>
                </div>
            </div>

            {/* RIGHT SIDE: Dynamic Buttons */}
            {renderHeaderButton()}
        </div>
      </header>

      {/* 2. MAIN CONTENT (Conditional Rendering) */}
      <main className="container mx-auto p-4 pt-8">
          {renderMainContent()}
      </main>
    </div>
  );
}
export default Home;