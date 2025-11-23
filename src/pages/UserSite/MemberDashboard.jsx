
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Assuming correct path to your firebase config
import { collection, query, where, onSnapshot } from 'firebase/firestore'; 

// Component to render a single business item
const BusinessListItem = ({ business }) => {
    
    // Determine status class for styling
    const status = business.Status || 'Status Unknown';
    let statusClass = 'bg-gray-100 text-gray-800';
    if (status === 'Active') {
        statusClass = 'bg-green-100 text-green-700 font-bold border border-green-300'; 
    } else if (status === 'Pending Review') {
        statusClass = 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    }

    // Prepare details list, only including fields that have data
    const details = [
        { label: 'Industry', value: business['Industry Type'] },
        { label: 'Address', value: business['Physical Address'] },
        { label: 'Email', value: business['Email Address'] },
        { label: 'Phone', value: business['Phone Number'] },
        { label: 'Viber', value: business['Viber Number'] }, 
        { label: 'Website', value: business['Website Link'], isLink: true },
        { label: 'Facebook', value: business['Facebook Link'], isLink: true },
        { label: 'TikTok', value: business['Tiktok Link'], isLink: true },
        { label: 'Map', value: business['Google Map Link'], isLink: true }, 
    ].filter(item => item.value); // Only show items that have a value

    return (
        // Business Item Card: wide, clean, light blue accent on hover
        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-200 flex flex-col space-y-3 hover:border-blue-300">
            
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                <h4 className="text-xl font-extrabold text-blue-700 leading-tight">
                    {business['Business Name'] || 'Business Name Missing'}
                </h4>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusClass}`}>
                    {status}
                </span>
            </div>

            {/* Owner Details */}
            <p className="text-sm font-semibold text-gray-700">
                Owner: <span className="text-blue-500">{business['Owner Name'] || 'N/A'}</span>
            </p>

            {/* Detailed Business Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 pt-2">
                {details.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <span className="font-medium text-gray-500 w-20 shrink-0">{item.label}:</span>
                        {item.isLink ? (
                            <a 
                                href={item.value} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-500 hover:text-blue-700 truncate font-medium"
                            >
                                {item.value.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                            </a>
                        ) : (
                            <span className="truncate text-gray-800">{item.value}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


function MemberDashboard({ setCurrentView, views, memberUser, onLogout }) {
    
    const [memberBusinesses, setMemberBusinesses] = useState([]);
    const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(true);

    if (!memberUser) {
        useEffect(() => {
            setCurrentView(views.MEMBER_AUTH);
        }, [setCurrentView, views.MEMBER_AUTH]);
        return null;
    }
    
    // Get member details
    const memberPhone = memberUser['Phone Number']; 
    const welcomeName = memberUser['Owner Name'] || 'TBT Member';
    
    useEffect(() => {
        if (!memberPhone) {
            setIsLoadingBusinesses(false);
            return;
        }

        const q = query(
            collection(db, 'businesses'), 
            where('Phone Number', '==', memberPhone) 
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedBusinesses = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data() 
            }));
            setMemberBusinesses(fetchedBusinesses);
            setIsLoadingBusinesses(false);
        }, (error) => {
            console.error("Error fetching member's businesses:", error);
            setIsLoadingBusinesses(false);
        });

        return () => unsubscribe(); 
    }, [memberPhone]);


    return (
        // Full Page Background
        <div className="min-h-screen bg-gray-100">
            
            {/* 1. STICKY HEADER (Full Width) */}
            <header className="bg-white shadow-lg p-3 sticky top-0 z-20 border-b border-gray-200">
                <div className="container mx-auto max-w-6xl flex justify-between items-center">
                    
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <img 
                            src="/tbtlogo.jpg" 
                            alt="TBT Logo" 
                            className="h-10 w-auto rounded-full" 
                        />
                        <h1 className="text-xl font-extrabold text-blue-700 hidden sm:block">
                            Member Portal
                        </h1>
                    </div>

                    {/* Navigation/Logout Buttons (Prominent) */}
                    <div className="flex space-x-3">
                        {/* BACK TO PUBLIC HOME BUTTON (Secondary Action) */}
                        <button 
                            onClick={() => setCurrentView(views.HOME)} 
                            className="py-2 px-4 bg-white border border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-150 shadow-sm text-sm"
                        >
                            ← Public Home
                        </button>
                        
                        {/* LOGOUT BUTTON (Critical Action) */}
                        <button 
                            onClick={onLogout} 
                            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. WELCOME BANNER (Full Width) */}
            <div className="bg-blue-700 text-white py-8 mb-8 shadow-md">
                <div className="container mx-auto max-w-6xl px-4 sm:px-0">
                    <h1 className="text-3xl font-extrabold mb-1">
                        Welcome Back, {welcomeName}! 👋
                    </h1>
                    <p className="text-blue-200 text-base">
                        Your private dashboard. Logged in as: **{memberPhone}**.
                    </p>
                </div>
            </div>
            
            {/* 3. MAIN CONTENT (Wide Central Card) */}
            <main className="container mx-auto max-w-6xl p-4 pt-0">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border-4 border-gray-200">
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                        Business Management
                    </h2>

                    {/* ADD BUSINESS BUTTON */}
                    <button
                        onClick={() => setCurrentView(views.BUSINESS_REGISTER)}
                        className="w-full py-3 px-4 mb-8 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-150 shadow-lg text-lg"
                    >
                        + Add New Business Listing
                    </button>

                    <div className="text-left border-t pt-6">
                        <h3 className="text-xl font-bold text-gray-700 mb-6">
                            Your Registered Businesses (<span className="text-blue-600">{memberBusinesses.length}</span>)
                        </h3>

                        {isLoadingBusinesses ? (
                            <p className="text-gray-500 text-center py-8">Loading businesses...</p>
                        ) : memberBusinesses.length > 0 ? (
                            <div className="space-y-6"> 
                                {memberBusinesses.map(business => (
                                    <BusinessListItem key={business.id} business={business} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
                                <p className="text-blue-700 font-medium">
                                    You haven't listed any businesses yet.
                                </p>
                                <p className="text-sm text-blue-600 mt-2">
                                    Click the 'Add New Business Listing' button above to get started!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MemberDashboard;