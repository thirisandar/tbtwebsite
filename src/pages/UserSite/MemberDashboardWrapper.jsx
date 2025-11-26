// File: src/pages/UserSite/MemberDashboardWrapper.jsx

import React from 'react';
// Import the list component which is your core dashboard view
import MemberBusinessList from './MemberBusinessList.jsx'; 

function MemberDashboardWrapper({ memberUser, setCurrentView, views, onMemberLogout }) {
    
    // --- Header / Logout Functionality ---
    const handleLogoutClick = () => {
        onMemberLogout();
        // Since onMemberLogout should clear the user and redirect to VIEWS.HOME, 
        // no further action is needed here.
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* 1. HEADER SECTION (With Logout Button) */}
            <header className="p-4 bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                         {/* Replace this with your actual logo/title element */}
                         <h1 className="text-xl font-extrabold text-blue-800">TBT Member Dashboard</h1>
                    </div>
                    
                    {/* RIGHT SIDE: Dynamic Buttons */}
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600 font-medium hidden sm:inline">
                            မဂ်လာပါ, {memberUser?.['Owner Name'] || 'Member'}!
                        </span>
                        <button
                            onClick={handleLogoutClick}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. MAIN CONTENT - RENDER YOUR BUSINESS LIST */}
            <main className="container mx-auto p-4 pt-8">
                {/* ⭐️ This is the core component you want to show ⭐️ */}
                <MemberBusinessList
                    memberUser={memberUser} 
                    setCurrentView={setCurrentView}
                    views={views}
                    // Add any other props MemberBusinessList needs (like business data or refresh handlers)
                />
            </main>
        </div>
    );
}

export default MemberDashboardWrapper;