import React, { useState, useEffect, useMemo } from 'react';
import PopUpModal from '../../components/PopUpModal.jsx'; 
import { db } from '../../firebase'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore'; 

// ⭐️ NEW COMPONENT: Loading Spinner (Reusable) ⭐️
const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12 col-span-full">
        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-3 text-lg text-gray-500">Loading Businesses...</p>
    </div>
);

// --- Card Component ---
const CardBox = ({ business, onModalOpen }) => (
    // Card Design: White background, subtle shadow, blue hover effect
    <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 hover:border-blue-300 flex flex-col justify-between">
        <div>
            {/* Business Name: Prominent Gray/Black */}
            <h3 className="text-xl font-semibold text-gray-800">{business['Business Name']}</h3>
            
            {/* Industry Type: Light Blue Accent */}
            <p className="text-sm text-blue-700 mt-1 mb-3 bg-blue-100 px-2 py-0.5 inline-block rounded-full font-medium">
                {business['Industry Type']}
            </p>
        </div>
        <button 
            onClick={() => onModalOpen(business)} 
            // Button: Strong Blue for contrast
            className="w-full mt-4 py-2 bg-blue-300 text-gray-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition duration-150 shadow-md cursor-pointer"
        >
            View Details
        </button>
    </div>
);

function Home({ setCurrentView, views }) {
  // ... (State hooks and useEffect for Firebase remain exactly the same as before) ...
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  
  // Firebase Fetch Logic (Same as before)
  useEffect(() => {
    const q = query(collection(db, 'businesses'), where('Status', '==', 'Active'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setBusinesses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
    }, (err) => { setIsLoading(false); });
    return () => unsubscribe();
  }, []); 

  // Filter Logic (Same as before)
  const DYNAMIC_FILTER_CATEGORIES = useMemo(() => {
    const uniqueIndustries = [...new Set(businesses.map(b => b['Industry Type']))].filter(Boolean).sort();
    return ['All', ...uniqueIndustries];
  }, [businesses]);
  
  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter(b => activeFilter === 'All' || b['Industry Type'] === activeFilter)
      .filter(b => {
          const s = searchTerm.toLowerCase();
          return b['Business Name']?.toLowerCase().includes(s) || 
                 b['Industry Type']?.toLowerCase().includes(s) || 
                 b['Physical Address']?.toLowerCase().includes(s) || 
                 b['Owner Name']?.toLowerCase().includes(s);
      });
  }, [businesses, activeFilter, searchTerm]);

  const handleModalOpen = (b) => { setSelectedBusiness(b); setIsModalOpen(true); };
  const handleModalClose = () => { setIsModalOpen(false); setSelectedBusiness(null); };
  
  // ... (Loading/Error renders same as before) ...

  return (
    // Main Background: Light Gray
    <div className="min-h-screen bg-gray-100">
      
      {/* 1. HEADER SECTION - ⭐️ DESIGN UPDATED FOR NEW LAYOUT ⭐️ */}
      <header className="p-6 bg-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto">
            
            {/* TOP ROW: Title/Text centered, Logo positioned absolutely right */}
            <div className="flex justify-center items-center relative pb-3">
                
                {/* Title/Text (Centered) */}
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">TBT Website </h1>
                    <p className="text-md text-gray-800 mt-1 font-light">This is TBT Business Matching Portal Website</p>
                </div>

                {/* Logo (Top Right - absolute positioning) */}
                <img 
                    src="/tbtlogo.jpg" 
                    alt="TBT Logo" 
                    className="absolute right-0 top-0 h-10 sm:h-12 w-auto rounded-full" 
                />
            </div>

            {/* BOTTOM ROW: Buttons (Centered under the text, separated by a light line) */}
            <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
                 
                 {/* MEMBER LOGIN (Light Blue Accent, rounded full) */}
                 <button
                    onClick={() => setCurrentView(views.MEMBER_AUTH)} 
                    className="px-6 py-2 cursor-pointer bg-blue-300 text-gray-700 font-medium rounded-full hover:bg-blue-600 hover:text-white transition duration-150 shadow-md text-base"
                >
                    Member Login
                </button>

                {/* ADMIN LOGIN (Darker Blue, rounded full) */}
                 <button 
                    onClick={() => setCurrentView(views.ADMIN_LOGIN)}
                    className="px-6 py-2 cursor-pointer bg-blue-400 text-gray-800 font-medium rounded-full hover:bg-blue-800 hover:text-white transition duration-150 shadow-md text-base"
                 >
                    Admin Login
                 </button>
            </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT (Search, Filter, Grid) */}
      <main className="container mx-auto p-4 pt-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Please Search Businesses</h2>
            <span className="text-blue-600">{businesses.length} Active Business</span> 
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch">
                <input 
                    type="text" 
                    placeholder="Search by name, type, or location..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    // Search Input: Clean border focus
                    className="w-full flex-grow p-3 border border-gray-300 rounded-lg focus:border-gray-500  focus:outline-none" 
                />
                <div className="relative w-full md:w-1/4">
                    <select 
                        value={activeFilter} 
                        onChange={(e) => setActiveFilter(e.target.value)} 
                        // Select Input: Clean border
                        className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-blue-300 focus:outline-none"
                    >
                        {DYNAMIC_FILTER_CATEGORIES.map(type => <option key={type} value={type}>{type === 'All' ? 'Filter by Type' : type}</option>)}
                    </select>
                </div>
            </div>
        </div>

        {/* Filter Buttons: Scrollable, light blue accent */}
        <div className="flex space-x-3 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
            {DYNAMIC_FILTER_CATEGORIES.map(category => (
                <button 
                    key={category} 
                    onClick={() => setActiveFilter(category)} 
                    className={`py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap transition duration-150 
                        ${activeFilter === category 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-gray-700 bg-white border border-gray-200 hover:bg-blue-50 hover:text-gray-700'
                        }`}
                >
                    {category === 'All' ? 'All Types' : category}
                </button>
            ))}
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
                // ⭐️ MODIFIED: Using the new spinner component ⭐️
                <LoadingSpinner />
            ) : filteredBusinesses.length > 0 ? (
                filteredBusinesses.map(b => <CardBox key={b.id} business={b} onModalOpen={handleModalOpen} />)
            ) : <p className="col-span-full text-center text-gray-500">No active businesses found matching your criteria.</p>}
        </div>
      </main>

      {isModalOpen && <PopUpModal onClose={handleModalClose} data={selectedBusiness} />}
    </div>
  );
}
export default Home;