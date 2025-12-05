import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Assuming correct path
import { collection, query, where, onSnapshot } from 'firebase/firestore'; 


// ⭐️ Reusable Components ⭐️
const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-3 text-lg text-gray-500">Loading businesses...</p>
    </div>
);

const BusinessListItem = ({ business }) => {
    // ⭐️ Your existing business display logic ⭐️
    const status = business.Status || 'Status Unknown';
    let statusClass = 'bg-gray-100 text-gray-800';
    if (status === 'Active') {
        statusClass = 'bg-green-100 text-green-700 font-bold border border-green-300'; 
    } else if (status === 'Pending Review') {
        statusClass = 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    }

    const allDetails = [
        { label: 'Industry', value: business['Industry Type'], icon: '🏢' },
        { label: 'Address', value: business['Physical Address'], icon: '📍' },
        { label: 'Email', value: business['Email Address'], icon: '📧' },
        { label: 'Phone', value: business['Phone Number'], icon: '📞' },
        { label: 'Viber', value: business['Viber Number'], icon: '💬' }, 
        { label: 'Website', value: business['Website Link'], isLink: true, icon: '🔗' },
        { label: 'Facebook', value: business['Facebook Link'], isLink: true, icon: '📘' },
        { label: 'TikTok', value: business['Tiktok Link'], isLink: true, icon: '🎵' },
        { label: 'Map', value: business['Google Map Link'], isLink: true, icon: '🗺️' }, 
        { label: 'Created', value: business['Created Date'] ? new Date(business['Created Date']).toLocaleDateString() : '', icon: '📅' },
    ]; 
    
    const filteredDetails = allDetails.filter(item => {
        return item.value && (typeof item.value !== 'string' || item.value.trim().length > 0);
    });
    
    const logoUrl = business['Logo URL'];
    const isLogoValid = logoUrl && (logoUrl.startsWith('http') || logoUrl.startsWith('https'));
    
    return (
        <div className="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-200 flex flex-col space-y-3 hover:border-blue-400">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-3">
                    {isLogoValid ? (
                        <img src={logoUrl} alt={`Logo for ${business['Business Name']}`} className="w-10 h-10 object-contain rounded" onError={(e) => { e.target.style.display = 'none'; }} />
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
            <p className="text-sm font-semibold text-gray-700">Owner: <span className="text-md text-blue-600">{business['Owner Name'] || 'N/A'}</span></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm text-gray-600 pt-2">
                {filteredDetails.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                        <span className="font-medium text-gray-500 w-20 shrink-0 flex items-center">{item.icon} <span className="ml-1">{item.label}:</span></span>
                        {item.isLink ? (
                            <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium flex-1 min-w-0 truncate break-all">
                                {item.value.replace(/^https?:\/\//, '')}
                            </a>
                        ) : (
                            <span className="flex-1 min-w-0 truncate text-gray-800 font-medium">{item.value}</span>
                        )}
                    </div>
                ))}
            </div>
            {filteredDetails.length === 0 && ( <p className="text-sm text-gray-500 pt-2 italic">No additional details were provided for this business.</p> )}
        </div>
    );
};
// ----------------------------------------------------------------


function MemberBusinessList({ memberUser, views, setCurrentView }) {
    
    const [memberBusinesses, setMemberBusinesses] = useState([]);
    const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(true);

    const memberPhone = memberUser['Phone Number']; 
    const welcomeName = memberUser['Owner Name'] || 'TBT Member';
    
    useEffect(() => {
        const q = query(
            collection(db, 'businesses'), 
            where('Phone Number', '==', memberPhone) // Filter by the logged-in member's phone number
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedBusinesses = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data() 
            }));
            
            // Only show businesses that are active or pending review
            const activeBusinesses = fetchedBusinesses.filter(b => b.Status === 'Active' || b.Status === 'Pending Review'); 
            
            setMemberBusinesses(activeBusinesses);
            setIsLoadingBusinesses(false);
        }, (error) => {
            console.error("Error fetching member's businesses:", error);
            setIsLoadingBusinesses(false);
        });

        return () => unsubscribe(); 
    }, [memberPhone]);

    // ⭐️ FIX: Handler to navigate immediately ⭐️
    const handleNavigateToRegister = () => {
        // This is the correct action to switch the view instantly
        setCurrentView(views.BUSINESS_REGISTER);
    };

    return (
        <div className="container mx-auto max-w-6xl p-4 pt-0">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border-4 border-gray-200 mt-8">
                
                <div className="py-6 sm:py-8 mb-4 sm:mb-8 text-black border-b border-gray-200">
                    <h1 className="text-xl sm:text-2xl font-bold mb-1">
                        မဂ်လာပါ , {welcomeName}! 
                    </h1>
                    <p className="text-sm sm:text-base text-gray-700">
                        This is your personal dashboard view of all registered businesses.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                        စီးပွါးရေးလုပ်ငန်းများ စာရင်း                        
                    </h2>
                
                    <button
                        // ⭐️ Use the simple navigation handler ⭐️
                        onClick={handleNavigateToRegister} 
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
                        // This spinner is only for loading the business list from Firebase, not the form.
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
                                Click the '+ စာရင်းအသစ်သွင်းရန်' button above to get started!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MemberBusinessList;