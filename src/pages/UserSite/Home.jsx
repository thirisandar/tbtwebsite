import React, { useState, useEffect, useMemo } from 'react';
import PopUpModal from '../../components/PopUpModal.jsx'; 
import { db } from '../../firebase'; // ⭐️ Import your Firestore database instance
import { collection, query, where, onSnapshot } from 'firebase/firestore'; 

// --- Card Component (Simplified to be inside Home.jsx for now) ---
const CardBox = ({ business, onModalOpen }) => (
    <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between">
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{business['Business Name']}</h3>
            <p className="text-sm text-blue-600 mt-1 mb-3 bg-blue-50 px-2 py-0.5 inline-block rounded-full">
                {business['Industry Type']}
            </p>
        </div>
        <button 
            onClick={() => onModalOpen(business)} 
            className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150 cursor-pointer"
        >
            View Details
        </button>
    </div>
);


function Home({ setCurrentView, views }) {
  
  // ⭐️ STATE FOR FIREBASE DATA ⭐️
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  // --- Search and Filter State Hooks ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState(''); 
  const [activeFilter, setActiveFilter] = useState('All'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  
  // ⭐️ 1. FIREBASE FETCH EFFECT ⭐️
  useEffect(() => {
    // Query only for businesses with Status: 'Active'
    const q = query(
        collection(db, 'businesses'), 
        where('Status', '==', 'Active')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const businessList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setBusinesses(businessList);
        setIsLoading(false);
        setDataError(null);
    }, (err) => {
        console.error("Home Page Firestore Read Error:", err);
        setDataError("Failed to load business data.");
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, []); // Runs once on mount
  
  
  // ⭐️ 2. DYNAMIC CATEGORIES & FILTERING LOGIC ⭐️
  const DYNAMIC_FILTER_CATEGORIES = useMemo(() => {
    // Create a set of unique Industry Types from the fetched active businesses
    const uniqueIndustries = [...new Set(businesses.map(b => b['Industry Type']))]
      .filter(Boolean) 
      .sort();
      
    return ['All', ...uniqueIndustries];
  }, [businesses]);
  
  // --- Filtering Logic: Combines Name Search and Category Filter ---
  const filteredBusinesses = useMemo(() => {
    return businesses
      // 1. Filter by the active Category Link ('Industry Type')
      .filter(business => {
        if (activeFilter === 'All') return true;
        return business['Industry Type'] === activeFilter;
      })
      // 2. Filter by Search Term (Business Name, Owner Name, Physical Address)
      .filter(business => {
          const lowerCaseSearch = searchTerm.toLowerCase();
          
          const nameMatch = business['Business Name']?.toLowerCase().includes(lowerCaseSearch);
          const typeMatch = business['Industry Type']?.toLowerCase().includes(lowerCaseSearch);
          const addressMatch = business['Physical Address']?.toLowerCase().includes(lowerCaseSearch);
          const ownerMatch = business['Owner Name']?.toLowerCase().includes(lowerCaseSearch);
          
          return nameMatch || typeMatch || addressMatch || ownerMatch;
      });
  }, [businesses, activeFilter, searchTerm]);

  // --- Modal Functions ---
  const handleModalOpen = (business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBusiness(null);
  };
  
  // --- Loading/Error State Rendering ---
  if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-xl text-gray-600">Loading active businesses... 🔄</p>
        </div>
      );
  }
  
  if (dataError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-xl text-red-600">Error: {dataError}</p>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. HEADER SECTION */}
      <header className="p-4 bg-white shadow-md border-b sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start">
            
            <div className="w-1/4 hidden sm:block"></div> 

            <div className="w-full sm:w-2/4 flex flex-col items-center mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center">
                    TBT Website
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mt-1 text-center">
                    This is the business matching website.
                </p>
            </div>

            <div className="w-full sm:w-1/4 flex flex-row sm:flex-col justify-center sm:justify-end items-center sm:items-end space-x-3 sm:space-x-0 space-y-0 sm:space-y-2 mt-2 sm:mt-0">
                 
                 <button 
                    onClick={() => setCurrentView(views.ADMIN_LOGIN)}
                    className="px-3 py-2 sm:px-5 sm:py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md text-sm sm:text-base whitespace-nowrap w-1/2 sm:w-full"
                 >
                    Admin Login
                 </button>

                 <button
                    onClick={() => setCurrentView(views.BUSINESS_REGISTER)}
                    className="px-3 py-2 sm:px-3 sm:py-2 cursor-pointer bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition duration-150 text-sm sm:text-base whitespace-nowrap w-1/2 sm:w-full"
                >
                    Register for business!
                </button>
                
            </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="container mx-auto p-4 pt-4">
        
        {/* SEARCH SECTION */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Search Businesses ({businesses.length} Active)</h2>
            
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch">
                
                <input 
                    type="text"
                    placeholder="Search by name, type, owner or address"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full flex-grow p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150"
                />

                <div className="relative w-full md:w-1/4">
                    <select 
                        value={activeFilter} 
                        onChange={(e) => {
                            setActiveFilter(e.target.value);
                            setSearchType(e.target.value);
                        }}
                        className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150 cursor-pointer"
                    >
                        {DYNAMIC_FILTER_CATEGORIES.map(type => (
                            <option key={type} value={type}>{type === 'All' ? 'Filter by Type' : type}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <button 
                    className="w-full md:w-auto px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-150 cursor-pointer"
                    onClick={() => { /* Filtering is live, no action needed */ }}
                >
                    Search
                </button>
            </div>
        </div>

        {/* 3. FILTER LINKS */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
            {DYNAMIC_FILTER_CATEGORIES.map(category => (
                <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`
                        py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer
                        ${activeFilter === category 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-gray-700 hover:bg-gray-200 transition duration-150'
                        }
                    `}
                >
                    {category}
                </button>
            ))}
        </div>

        {/* 4. Card Display Area */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map(business => (
                    <CardBox 
                        key={business.id} 
                        business={business} 
                        onModalOpen={handleModalOpen} 
                    />
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500 py-10">
                    No active businesses found matching the filter and search criteria.
                </p>
            )}
        </div>
      </main>

      {/* 5. Modal (Popup Box) will be rendered here */}
      {isModalOpen && <PopUpModal onClose={handleModalClose} data={selectedBusiness} />}
    </div>
  );
}
export default Home;