import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Assuming correct path to your firebase config
import { collection, query, where, onSnapshot } from 'firebase/firestore'; 


    // ⭐️ NEW COMPONENT: Loading Spinner (Reusable) ⭐️
    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-12">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-3 text-lg text-gray-500">Loading businesses...</p>
        </div>
    );


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

        // ⭐️ MODIFIED: Define ALL fields ⭐️
        const allDetails = [
            { label: 'Industry', value: business['Industry Type'], icon: '' },
            { label: 'Address', value: business['Physical Address'], icon: '' },
            { label: 'Email', value: business['Email Address'], icon: '' },
            { label: 'Phone', value: business['Phone Number'], icon: '' },
            { label: 'Ph number & Viber', value: business['Viber Number'], icon: '' }, 
            { label: 'Website', value: business['Website Link'], isLink: true, icon: '' },
            { label: 'Facebook', value: business['Facebook Link'], isLink: true, icon: '' },
            { label: 'TikTok', value: business['Tiktok Link'], isLink: true, icon: '' },
            { label: 'Map', value: business['Google Map Link'], isLink: true, icon: '' }, 
            { label: 'Created', value: business['Created Date'] ? new Date(business['Created Date']).toLocaleDateString() : '', icon: '' },
        ]; 
        
        // ⭐️ KEY CHANGE: Filter the details to show only filled information ⭐️
        const filteredDetails = allDetails.filter(item => {
            // Return true only if the value is truthy AND (if it's a string) it's not just whitespace
            return item.value && (typeof item.value !== 'string' || item.value.trim().length > 0);
        });
        
        const logoUrl = business['Logo URL'];
        const isLogoValid = logoUrl && (logoUrl.startsWith('http') || logoUrl.startsWith('https'));


        return (
            // Business Item Card: wide, clean, light blue accent on hover
            <div className="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex flex-col space-y-3 hover:border-blue-400">
                
                {/* Business Name, Logo, and Status */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                    <div className="flex items-center space-x-3">
                        {/* Logo Display */}
                        {isLogoValid ? (
                            <img 
                                src={logoUrl} 
                                alt={`Logo for ${business['Business Name']}`} 
                                className="w-10 h-10 object-contain rounded" 
                                onError={(e) => { e.target.style.display = 'none'; }} 
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-lg text-gray-500 font-bold shrink-0">
                                {business['Business Name'] ? business['Business Name'][0].toUpperCase() : 'B'}
                            </div>
                        )}
                        <h4 className="text-base sm:text-lg font-extrabold text-black leading-tight pr-4">
                            {business['Business Name'] || 'Business Name Missing'}
                        </h4>
                    </div>
                    
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusClass}`}>
                        {status}
                    </span>
                </div>

                {/* Owner Details */}
                <p className="text-sm font-semibold text-gray-700">
                    Owner: <span className="text-md text-blue-600">{business['Owner Name'] || 'N/A'}</span>
                </p>

                {/* Detailed Business Info (Enhanced Grid Layout) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm text-gray-600 pt-2">
                    {filteredDetails.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                            <span className="font-medium text-gray-500 w-20 shrink-0 flex items-center">
                                {item.icon} <span className="ml-1">{item.label}:</span>
                            </span>
                            
                            {/* Since we filtered, item.value is guaranteed to exist here */}
                            {item.isLink ? (
                                <a 
                                    href={item.value} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-600 hover:text-blue-800 font-medium flex-1 min-w-0 truncate break-all"
                                >
                                    {item.value.replace(/^https?:\/\//, '')}
                                </a>
                            ) : (
                                <span className="flex-1 min-w-0 truncate text-gray-800 font-medium">
                                    {item.value}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Show a message if only required info (Name, Owner, Status) was present */}
                {filteredDetails.length === 0 && (
                    <p className="text-sm text-gray-500 pt-2 italic">No additional details were provided for this business.</p>
                )}

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
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <img 
                                src="/tbtlogo.jpg" 
                                alt="TBT Logo" 
                                className="h-8 w-auto sm:h-10 rounded-full" 
                            />
                            <h1 className="text-lg  sm:text-md font-extrabold text-black ">
                                Personal Member Dashboard
                            </h1>
                        </div>

                        {/* Navigation/Logout Buttons (Prominent) */}
                        <div className="flex space-x-2 sm:space-x-3">
                            {/* BACK TO PUBLIC HOME BUTTON (Secondary Action) */}
                            <button 
                                onClick={() => setCurrentView(views.HOME)} 
                                className="py-1.5 px-3 sm:py-2 sm:px-4 bg-white border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition text-sm cursor-pointer"
                            >
                                ← Home
                            </button>
                            
                            {/* LOGOUT BUTTON (Critical Action) */}
                            <button 
                                onClick={onLogout} 
                                className="py-1.5 px-3 sm:py-2 sm:px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md text-sm cursor-pointer"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* 2. WELCOME BANNER (Full Width) */}
                <div className="py-6 sm:py-8 mb-4 sm:mb-8 text-black bg-white shadow-sm border-b border-gray-200">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-0">
                        <h1 className="text-xl sm:text-2xl font-semibold mb-1">
                            Profile Name - {welcomeName}
                        </h1>   
                    </div>
                </div>
                
                {/* 3. MAIN CONTENT (Wide Central Card) */}
                <main className="container mx-auto max-w-6xl p-4 pt-0">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border-4 border-gray-200">
                        
                    {/* ⭐️ FIX: Responsive Layout for Header and Button ⭐️ */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                စီးပွါးရေးလုပ်ငန်းများ စာရင်း                        </h2>
                        
                            {/* ADD BUSINESS BUTTON (Prominent) */}
                            <button
                                onClick={() => setCurrentView(views.BUSINESS_REGISTER)}
                                className="w-full sm:w-auto py-2 px-4 text-white text-base cursor-pointer font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-150 shadow-md"
                            >
                                + စာရင်းအသစ်သွင်းရန်
                            </button>
                    </div>

                        <div className="text-left pt-2">
                            <h3 className="text-xl font-bold text-gray-700 mb-6">
                            စာရင်းပေးသွင်းထားသော စီးပွါးရေးလုပ်ငန်းများ (<span className="text-blue-900 text-lg font-bold">{memberBusinesses.length}</span>)
                            </h3>

                            {isLoadingBusinesses ? (
                                // ⭐️ MODIFIED: Replaced text with spinning icon ⭐️
                                <LoadingSpinner />
                            ) : memberBusinesses.length > 0 ? (
                                <div className="space-y-6"> 
                                    {memberBusinesses.map(business => (
                                        <BusinessListItem key={business.id} business={business} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
                                    <p className="text-black font-medium">
                                        လက်ရှိထိ စီးပွါးရေး စာရင်းသွင်းထားခြင်းမရှိပါ။                                </p>
                                    <p className="text-sm text-gray-600 mt-2">
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