// // // src/pages/UserSite/Home.jsx
// // import React, { useState } from 'react';
// // import PopUpModal from '../../components/PopUpModal.jsx'; // <-- ADD THIS LINE
// // // --- MOCK DATA (You can move this to src/data/businesses.js later) ---
// // const MOCK_BUSINESSES = [
// //   { id: 1, name: "Yangon IT Solutions", type: "IT", description: "High-quality software development and networking.", contact: "contact@yangonits.com" },
// //   { id: 2, name: "Mandalay Food Corner", type: "Food", description: "Serving traditional Myanmar cuisine and snacks.", contact: "order@mandalayfood.com" },
// //   { id: 3, name: "Myanmar Tech Hub", type: "IT", description: "Training and consultation for digital transformation.", contact: "hello@mth.edu.mm" },
// //   { id: 4, name: "Bagan Local Delights", type: "Food", description: "Handcrafted snacks and desserts from the Bagan region.", contact: "bagansnacks@local.mm" },
// //   { id: 5, name: "Hlaing Industry Supply", type: "Industry", description: "Heavy machinery and industrial equipment supplier.", contact: "sales@hlaingind.mm" },
// //   { id: 6, name: "Global Services Co.", type: "Industry", description: "Import/export consultation and logistics.", contact: "info@global.mm" },
// //   { id: 7, name: "All-Purpose Shop MM", type: "General", description: "A non-filterable type for testing 'All' filter.", contact: "all@purpose.mm" },
// // ];

// // const FILTER_CATEGORIES = ['All', 'IT', 'Food', 'Industry'];

// // // --- Card Component (Place this in src/components/CardBox.jsx later) ---
// // const CardBox = ({ business, onModalOpen }) => (
// //     <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between">
// //         <div>
// //             <h3 className="text-xl font-semibold text-gray-800">{business.name}</h3>
// //             <p className="text-sm text-blue-600 mt-1 mb-3 bg-blue-50 px-2 py-0.5 inline-block rounded-full">
// //                 {business.type}
// //             </p>
// //             <p className="text-gray-600 text-sm line-clamp-2">{business.description}</p>
// //         </div>
// //         <button 
// //             onClick={() => onModalOpen(business)} 
// //             className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150"
// //         >
// //             View
// //         </button>
// //     </div>
// // );


// // function Home({ setCurrentView, views }) {
// //   // --- State Hooks ---
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [searchType, setSearchType] = useState(''); // State for Dropdown search (optional)
// //   const [activeFilter, setActiveFilter] = useState('All'); // State for the 4 link buttons
// //   const [isModalOpen, setIsModalOpen] = useState(false); // State for the popup
// //   const [selectedBusiness, setSelectedBusiness] = useState(null); // Data for the popup

// //   // --- Filtering Logic: Combines Name Search and Category Filter ---
// //   const filteredBusinesses = MOCK_BUSINESSES
// //     // 1. Filter by the active Category Link (All, IT, Food, Industry)
// //     .filter(business => {
// //       if (activeFilter === 'All') return true;
// //       return business.type === activeFilter;
// //     })
// //     // 2. Filter by Search Term (Name)
// //     .filter(business => 
// //       business.name.toLowerCase().includes(searchTerm.toLowerCase())
// //     );

// //   // --- Modal Functions ---
// //   const handleModalOpen = (business) => {
// //     setSelectedBusiness(business);
// //     setIsModalOpen(true);
// //   };
  
// //   const handleModalClose = () => {
// //     setIsModalOpen(false);
// //     setSelectedBusiness(null);
// //   };
  

// //   return (
// //     <div className="min-h-screen bg-gray-50">
      
// //       {/* 1. REVISED HEADER SECTION (Centered Title, Right Buttons) */}
// //       <header className="p-4 bg-white shadow-md border-b sticky top-0 z-10">
// //         <div className="flex justify-between items-start">
            
// //             {/* Left Placeholder for balance */}
// //             <div className="w-1/4 hidden sm:block"></div> 

// //             {/* Center Content: Title and Tagline */}
// //             <div className="w-full sm:w-2/4 flex flex-col items-center">
// //                 <h1 className="text-3xl font-extrabold text-gray-800">
// //                     TBT Website
// //                 </h1>
// //                 <p className="text-lg text-gray-700 mt-1 text-center">
// //                     This is the business matching website.
// //                 </p>
// //             </div>

// //             {/* Right Side: Both Buttons Side-by-Side */}
// //             <div className="w-1/4 flex flex-col sm:flex-row justify-end items-end space-y-2 sm:space-y-0 sm:space-x-3 mt-1">
                 
// //                  {/* Admin Login Button */}
// //                  <button 
// //                     onClick={() => setCurrentView(views.ADMIN_LOGIN)}
// //                     className="px-5 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md whitespace-nowrap"
// //                  >
// //                     Admin Login
// //                  </button>

// //                  {/* Register for Business Button */}
// //                  <button
// //                     onClick={() => setCurrentView(views.BUSINESS_REGISTER)}
// //                     className="text-sm px-3 py-2 cursor-pointer bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition duration-150 whitespace-nowrap"
// //                 >
// //                     Register for business!
// //                 </button>
                
                
// //             </div>
// //         </div>
// //       </header>

// //       {/* 2. MAIN CONTENT AREA */}
// //       <main className="container mx-auto p-4 pt-4">
        
// //         {/* SEARCH AND TYPE DROPDOWN SECTION */}
// //         <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
// //             <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Businesses by name,type and city</h2>
            
// //             <div className="flex flex-col md:flex-row gap-4 items-stretch">
// //                 {/* Search by Name/Keyword Input (Live Filtering) */}
// //                 <input 
// //                     type="text"
// //                     placeholder="Search by business name,type and city"
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="flex-grow p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150"
// //                 />

// //                 {/* Search by Type Dropdown */}
// //                 <div className="relative md:w-1/4">
// //                     <select 
// //                         value={searchType}
// //                         onChange={(e) => setSearchType(e.target.value)}
// //                         className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150 cursor-pointer"
// //                     >
// //                         <option value="" disabled>Search by Type</option>
// //                         {FILTER_CATEGORIES.slice(1).map(type => (
// //                             <option key={type} value={type}>{type}</option>
// //                         ))}
// //                     </select>
// //                     {/* Custom Dropdown Arrow Icon */}
// //                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
// //                         {/* You can use an icon from react-icons here if installed */}
// //                         <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //                             <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
// //                         </svg>
// //                     </div>
// //                 </div>

// //                 {/* Search Button */}
// //                 <button 
// //                     className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-150 md:w-auto"
// //                 >
// //                     Search
// //                 </button>
// //             </div>
// //         </div>

// //         {/* 3. FILTER LINKS (ALL, IT, Food, Industry) */}
// //         <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
// //             {FILTER_CATEGORIES.map(category => (
// //                 <button
// //                     key={category}
// //                     onClick={() => {
// //                         setActiveFilter(category);
// //                         // Optional: Clear search term when clicking a main filter
// //                         // setSearchTerm('');
// //                     }}
// //                     className={`
// //                         py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap
// //                         ${activeFilter === category 
// //                             ? 'bg-blue-600 text-white shadow-md' // Active Style
// //                             : 'text-gray-700 hover:bg-gray-200 transition duration-150' // Inactive Style
// //                         }
// //                     `}
// //                 >
// //                     {category}
// //                 </button>
// //             ))}
// //         </div>

// //         {/* 4. Card Display Area */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //             {filteredBusinesses.length > 0 ? (
// //                 filteredBusinesses.map(business => (
// //                     <CardBox 
// //                         key={business.id} 
// //                         business={business} 
// //                         onModalOpen={handleModalOpen} 
// //                     />
// //                 ))
// //             ) : (
// //                 <p className="col-span-full text-center text-gray-500 py-10">
// //                     No businesses found matching the filter and search criteria.
// //                 </p>
// //             )}
// //         </div>
// //       </main>

// //       {/* 5. Modal (Popup Box) will be rendered here */}
// //       {isModalOpen && <PopUpModal onClose={handleModalClose} data={selectedBusiness} />}
// //     </div>
// //   );
// // }
// // export default Home;
// // src/pages/UserSite/Home.jsx
// import React, { useState } from 'react';
// import PopUpModal from '../../components/PopUpModal.jsx'; 
// // NOTE: MOCK_BUSINESSES has been removed. Data now comes via props.

// const FILTER_CATEGORIES = ['All', 'IT', 'Food', 'Industry', 'General'];

// // --- Card Component (Place this in src/components/CardBox.jsx later) ---
// const CardBox = ({ business, onModalOpen }) => (
//     <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between">
//         <div>
//             {/* Using the real data key 'Business Name' */}
//             <h3 className="text-xl font-semibold text-gray-800">{business['Business Name']}</h3>
//             {/* Using the real data key 'Industry Type' */}
//             <p className="text-sm text-blue-600 mt-1 mb-3 bg-blue-50 px-2 py-0.5 inline-block rounded-full">
//                 {business['Industry Type']}
//             </p>
//             <p className={`text-xs mt-1 px-2 py-0.5 inline-block rounded-full font-bold
//                 ${business.Status === 'Active' ? 'bg-green-100 text-green-700' : 
//                   business.Status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
//                   'bg-red-100 text-red-700'}`}>
//                 Status: {business.Status}
//             </p>        </div>
//         <button 
//             onClick={() => onModalOpen(business)} 
//             className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150 cursor-pointer"
//         >
//             View
//         </button>
//     </div>
// );


// // ⭐️ MODIFIED: Now accepts allBusinesses prop
// function Home({ setCurrentView, views, allBusinesses }) {
//   // 1. FILTER: Only show businesses marked 'Active' by the admin
//   const activeBusinesses = allBusinesses;
//   // --- State Hooks ---
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState('');
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);

//   // --- Filtering Logic: Combines Name Search and Category Filter ---
//   const filteredBusinesses = activeBusinesses
//     // 1. Filter by the active Category Link
//     .filter(business => {
//       // Use the actual key 'Industry Type'
//       if (activeFilter === 'All') return true;
//       return business['Industry Type'] === activeFilter;
//     })
//     // 2. Filter by Search Term (Name)
//     .filter(business => 
//       business['Business Name'].toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   // --- Modal Functions ---
//   const handleModalOpen = (business) => {
//     setSelectedBusiness(business);
//     setIsModalOpen(true);
//   };
  
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedBusiness(null);
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* 1. HEADER SECTION (No logic change) */}
//       <header className="p-4 bg-white shadow-md border-b sticky top-0 z-10">
//         <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
            
//             {/* Left Placeholder for balance */}
//             <div className="w-1/4 hidden sm:block"></div> 

//             {/* Center Content: Title and Tagline */}
//             <div className="w-full sm:w-2/4 flex flex-col items-center order-1 sm:order-none">
//                 <h1 className="text-3xl font-extrabold text-gray-800">
//                     TBT Website
//                 </h1>
//                 <p className="text-lg text-gray-700 mt-1 text-center">
//                     This is the business matching website.
//                 </p>
//             </div>

//             {/* Right Side: Both Buttons Side-by-Side */}
//             <div className="w-full sm:w-1/4 flex justify-center sm:justify-end space-x-3 mt-4 sm:mt-1 order-2 sm:order-none">
                 
//                  {/* Admin Login Button */}
//                  <button 
//                     onClick={() => setCurrentView(views.ADMIN_LOGIN)}
//                     className="px-5 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md whitespace-nowrap"
//                  >
//                     Admin Login
//                  </button>

//                  {/* Register for Business Button */}
//                  <button
//                     onClick={() => setCurrentView(views.BUSINESS_REGISTER)}
//                     className="text-sm px-3 py-2 cursor-pointer bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition duration-150 whitespace-nowrap"
//                 >
//                     Register for business!
//                 </button>
                
                
//             </div>
//         </div>
//       </header>

//       {/* 2. MAIN CONTENT AREA */}
//       <main className="container mx-auto p-4 pt-4">
        
//         {/* SEARCH AND TYPE DROPDOWN SECTION */}
//         <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Businesses by name, type and city</h2>
            
//             <div className="flex flex-col md:flex-row gap-4 items-stretch">
//                 {/* Search by Name/Keyword Input (Live Filtering) */}
//                 <input 
//                     type="text"
//                     placeholder="Search by business name, type and city"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="flex-grow p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150"
//                 />

//                 {/* Search by Type Dropdown */}
//                 <div className="relative md:w-1/4">
//                     <select 
//                         value={searchType}
//                         onChange={(e) => setSearchType(e.target.value)}
//                         className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150 cursor-pointer"
//                     >
//                         <option value="" disabled>Search by Type</option>
//                         {FILTER_CATEGORIES.slice(1).map(type => (
//                             <option key={type} value={type}>{type}</option>
//                         ))}
//                     </select>
//                     {/* Custom Dropdown Arrow Icon */}
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                         {/* You can use an icon from react-icons here if installed */}
//                         <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                         </svg>
//                     </div>
//                 </div>

//                 {/* Search Button (Currently triggers filtering on input change) */}
//                 <button 
//                     className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-150 md:w-auto"
//                 >
//                     Search
//                 </button>
//             </div>
//         </div>

//         {/* 3. FILTER LINKS (ALL, IT, Food, Industry) */}
//         <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
//             {FILTER_CATEGORIES.map(category => (
//                 <button
//                     key={category}
//                     onClick={() => {
//                         setActiveFilter(category);
//                         // Optional: Clear search term when clicking a main filter
//                         // setSearchTerm('');
//                     }}
//                     className={`
//                         py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap
//                         ${activeFilter === category 
//                             ? 'bg-blue-600 text-white shadow-md' // Active Style
//                             : 'text-gray-700 hover:bg-gray-200 transition duration-150' // Inactive Style
//                         }
//                     `}
//                 >
//                     {category}
//                 </button>
//             ))}
//         </div>

//         {/* 4. Card Display Area */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredBusinesses.length > 0 ? (
//                 filteredBusinesses.map(business => (
//                     <CardBox 
//                         // Use the real 'id' from the admin data
//                         key={business.id} 
//                         business={business} 
//                         onModalOpen={handleModalOpen} 
//                     />
//                 ))
//             ) : (
//                 <p className="col-span-full text-center text-gray-500 py-10">
//                     No businesses found matching the filter and search criteria.
//                 </p>
//             )}
//         </div>
//       </main>

//       {/* 5. Modal (Popup Box) will be rendered here */}
//       {isModalOpen && <PopUpModal onClose={handleModalClose} data={selectedBusiness} />}
//     </div>
//   );
// }
// export default Home;
// import React, { useState } from 'react';
// import PopUpModal from '../../components/PopUpModal.jsx'; 

// // --- Card Component (Place this in src/components/CardBox.jsx later) ---
// const CardBox = ({ business, onModalOpen }) => (
//     <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between">
//         <div>
//             {/* Using the real data key 'Business Name' */}
//             <h3 className="text-xl font-semibold text-gray-800">{business['Business Name']}</h3>
//             {/* Using the real data key 'Industry Type' */}
//             <p className="text-sm text-blue-600 mt-1 mb-3 bg-blue-50 px-2 py-0.5 inline-block rounded-full">
//                 {business['Industry Type']}
//             </p>
//             <p className={`text-xs mt-1 px-2 py-0.5 inline-block rounded-full font-bold
//                 ${business.Status === 'Active' ? 'bg-green-100 text-green-700' : 
//                   business.Status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' :
//                   'bg-red-100 text-red-700'}`}>
//                 Status: {business.Status}
//             </p>        
//         </div>
//         <button 
//             onClick={() => onModalOpen(business)} 
//             className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150 cursor-pointer"
//         >
//             View
//         </button>
//     </div>
// );


// // ⭐️ FIX: Ensuring industryOptions defaults to an empty array for safety ⭐️
// function Home({ setCurrentView, views, allBusinesses, industryOptions = [] }) {
  
//   // 🐛 DEBUGGING CHECK: Check your browser console to see what data is being passed
//   // console.log("Industry Options received:", industryOptions); 
    
//   // Create a clean list of industries for the UI
//   // This removes 'Unspecified Industry' (if present) but keeps all others.
//   const cleanIndustryOptions = (industryOptions || []).filter(i => i !== 'Unspecified Industry');
  
//   // The main filter categories will start with 'All'
//   const DYNAMIC_FILTER_CATEGORIES = ['All', ...cleanIndustryOptions];

//   // 1. FILTER: Only show businesses marked 'Active' by the admin
//   const activeBusinesses = (allBusinesses || []).filter(b => b.Status === 'Active');
  
//   // --- State Hooks ---
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState(''); // Value from the dropdown
//   const [activeFilter, setActiveFilter] = useState('All'); // Value from the filter links
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);

//   // --- Filtering Logic: Combines Name Search, Link Filter, and Dropdown Search ---
//   const filteredBusinesses = activeBusinesses
//     // 1. Filter by the active Category Link (Primary Filter)
//     .filter(business => {
//       if (activeFilter === 'All') return true;
//       return business['Industry Type'] === activeFilter;
//     })
//     // 2. Filter by Search Term (Name/Keyword)
//     .filter(business => 
//       business['Business Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       business['Physical Address']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       business['Industry Type']?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     // 3. Filter by Search Type Dropdown (Secondary Filter)
//     .filter(business => {
//         if (!searchType) return true;
//         return business['Industry Type'] === searchType;
//     });


//   // --- Modal Functions ---
//   const handleModalOpen = (business) => {
//     setSelectedBusiness(business);
//     setIsModalOpen(true);
//   };
  
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedBusiness(null);
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* 1. HEADER SECTION (No logic change) */}
//       <header className="p-4 bg-white shadow-md border-b sticky top-0 z-10">
//         <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
            
//             {/* Left Placeholder for balance */}
//             <div className="w-1/4 hidden sm:block"></div> 

//             {/* Center Content: Title and Tagline */}
//             <div className="w-full sm:w-2/4 flex flex-col items-center order-1 sm:order-none">
//                 <h1 className="text-3xl font-extrabold text-gray-800">
//                     TBT Website
//                 </h1>
//                 <p className="text-lg text-gray-700 mt-1 text-center">
//                     This is the business matching website.
//                 </p>
//             </div>

//             {/* Right Side: Both Buttons Side-by-Side */}
//             <div className="w-full sm:w-1/4 flex justify-center sm:justify-end space-x-3 mt-4 sm:mt-1 order-2 sm:order-none">
                 
//                  {/* Admin Login Button */}
//                  <button 
//                     onClick={() => setCurrentView(views.ADMIN_LOGIN)}
//                     className="px-5 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md whitespace-nowrap"
//                  >
//                     Admin Login
//                  </button>

//                  {/* Register for Business Button */}
//                  <button
//                     onClick={() => setCurrentView(views.BUSINESS_REGISTER)}
//                     className="text-sm px-3 py-2 cursor-pointer bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition duration-150 whitespace-nowrap"
//                 >
//                     Register for business!
//                 </button>
                
                
//             </div>
//         </div>
//       </header>

//       {/* 2. MAIN CONTENT AREA */}
//       <main className="container mx-auto p-4 pt-4">
        
//         {/* SEARCH AND TYPE DROPDOWN SECTION */}
//         <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Businesses by name, type and city</h2>
            
//             <div className="flex flex-col md:flex-row gap-4 items-stretch">
//                 {/* Search by Name/Keyword Input (Live Filtering) */}
//                 <input 
//                     type="text"
//                     placeholder="Search by business name, type and city"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="flex-grow p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150"
//                 />

//                 {/* Search by Type Dropdown */}
//                 <div className="relative md:w-1/4">
//                     <select 
//                         value={searchType}
//                         onChange={(e) => setSearchType(e.target.value)}
//                         className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150 cursor-pointer"
//                     >
//                         <option value="">Search by Type</option>
//                         {/* Use the dynamic industryOptions prop */}
//                         {cleanIndustryOptions.map(type => (
//                             <option key={type} value={type}>{type}</option>
//                         ))}
//                     </select>
//                     {/* Custom Dropdown Arrow Icon */}
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                         {/* You can use an icon from react-icons here if installed */}
//                         <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                         </svg>
//                     </div>
//                 </div>

//                 {/* Search Button (Currently triggers filtering on input change) */}
//                 <button 
//                     // No onClick needed as filtering is live, but it looks good
//                     className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-150 md:w-auto"
//                 >
//                     Search
//                 </button>
//             </div>
//         </div>

//         {/* 3. FILTER LINKS (Dynamically generated) ⭐️ This section now correctly uses the dynamic array ⭐️ */}
//         <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
//             {DYNAMIC_FILTER_CATEGORIES.map(category => (
//                 <button
//                     key={category}
//                     onClick={() => {
//                         setActiveFilter(category);
//                         // Clear the dropdown when clicking a link filter
//                         setSearchType(''); 
//                     }}
//                     className={`
//                         py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap
//                         ${activeFilter === category 
//                             ? 'bg-blue-600 text-white shadow-md' // Active Style
//                             : 'text-gray-700 hover:bg-gray-200 transition duration-150' // Inactive Style
//                         }
//                     `}
//                 >
//                     {category}
//                 </button>
//             ))}
//         </div>

//         {/* 4. Card Display Area */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredBusinesses.length > 0 ? (
//                 filteredBusinesses.map(business => (
//                     <CardBox 
//                         // Use the real 'id' from the admin data
//                         key={business.id} 
//                         business={business} 
//                         onModalOpen={handleModalOpen} 
//                     />
//                 ))
//             ) : (
//                 <p className="col-span-full text-center text-gray-500 py-10">
//                     No businesses found matching the filter and search criteria.
//                 </p>
//             )}
//         </div>
//       </main>

//       {/* 5. Modal (Popup Box) will be rendered here */}
//       {isModalOpen && <PopUpModal onClose={handleModalClose} data={selectedBusiness} />}
//     </div>
//   );
// }
// export default Home;
// import React, { useState } from 'react';
// import PopUpModal from '../../components/PopUpModal.jsx'; 

// // --- Card Component (Place this in src/components/CardBox.jsx later) ---
// const CardBox = ({ business, onModalOpen }) => (
//     <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between">
//         <div>
//             {/* Using the real data key 'Business Name' */}
//             <h3 className="text-xl font-semibold text-gray-800">{business['Business Name']}</h3>
//             {/* Using the real data key 'Industry Type' */}
//             <p className="text-sm text-blue-600 mt-1 mb-3 bg-blue-50 px-2 py-0.5 inline-block rounded-full">
//                 {business['Industry Type']}
//             </p>
//             <p className={`text-xs mt-1 px-2 py-0.5 inline-block rounded-full font-bold
//                 ${business.Status === 'Active' ? 'bg-green-100 text-green-700' : 
//                   business.Status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' :
//                   'bg-red-100 text-red-700'}`}>
//                 Status: {business.Status}
//             </p>        
//         </div>
//         <button 
//             onClick={() => onModalOpen(business)} 
//             className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150 cursor-pointer"
//         >
//             View
//         </button>
//     </div>
// );


// // ⭐️ CRITICAL FIX: Add a robust fallback list for development ⭐️
// const FALLBACK_INDUSTRY_OPTIONS = ['IT', 'Food', 'Industry', 'General', 'Construction'];


// function Home({ setCurrentView, views, allBusinesses, industryOptions = [] }) {
  
//   // Choose the dynamic options or the fallback if the dynamic list is empty
//   const optionsToUse = (industryOptions && industryOptions.length > 0) 
//       ? industryOptions 
//       : FALLBACK_INDUSTRY_OPTIONS;
    
//   // Create a clean list of industries for the UI
//   const cleanIndustryOptions = optionsToUse.filter(i => i !== 'Unspecified Industry');
  
//   // The main filter categories will start with 'All'
//   const DYNAMIC_FILTER_CATEGORIES = ['All', ...cleanIndustryOptions];

//   // 1. FILTER: Only show businesses marked 'Active' by the admin
//   const activeBusinesses = (allBusinesses || []).filter(b => b.Status === 'Active');
  
//   // --- State Hooks ---
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState(''); // Value from the dropdown
//   const [activeFilter, setActiveFilter] = useState('All'); // Value from the filter links
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);

//   // --- Filtering Logic: Combines Name Search, Link Filter, and Dropdown Search ---
//   const filteredBusinesses = activeBusinesses
//     // 1. Filter by the active Category Link (Primary Filter)
//     .filter(business => {
//       if (activeFilter === 'All') return true;
//       return business['Industry Type'] === activeFilter;
//     })
//     // 2. Filter by Search Term (Name/Keyword)
//     .filter(business => 
//       business['Business Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       business['Physical Address']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       business['Industry Type']?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     // 3. Filter by Search Type Dropdown (Secondary Filter)
//     .filter(business => {
//         if (!searchType) return true;
//         return business['Industry Type'] === searchType;
//     });


//   // --- Modal Functions ---
//   const handleModalOpen = (business) => {
//     setSelectedBusiness(business);
//     setIsModalOpen(true);
//   };
  
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedBusiness(null);
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* 1. HEADER SECTION (No logic change) */}
//       <header className="p-4 bg-white shadow-md border-b sticky top-0 z-10">
//         <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
            
//             {/* Left Placeholder for balance */}
//             <div className="w-1/4 hidden sm:block"></div> 

//             {/* Center Content: Title and Tagline */}
//             <div className="w-full sm:w-2/4 flex flex-col items-center order-1 sm:order-none">
//                 <h1 className="text-3xl font-extrabold text-gray-800">
//                     TBT Website
//                 </h1>
//                 <p className="text-lg text-gray-700 mt-1 text-center">
//                     This is the business matching website.
//                 </p>
//             </div>

//             {/* Right Side: Both Buttons Side-by-Side */}
//             <div className="w-full sm:w-1/4 flex justify-center sm:justify-end space-x-3 mt-4 sm:mt-1 order-2 sm:order-none">
                 
//                  {/* Admin Login Button */}
//                  <button 
//                     onClick={() => setCurrentView(views.ADMIN_LOGIN)}
//                     className="px-5 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md whitespace-nowrap"
//                  >
//                     Admin Login
//                  </button>

//                  {/* Register for Business Button */}
//                  <button
//                     onClick={() => setCurrentView(views.BUSINESS_REGISTER)}
//                     className="text-sm px-3 py-2 cursor-pointer bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition duration-150 whitespace-nowrap"
//                 >
//                     Register for business!
//                 </button>
                
                
//             </div>
//         </div>
//       </header>

//       {/* 2. MAIN CONTENT AREA */}
//       <main className="container mx-auto p-4 pt-4">
        
//         {/* SEARCH AND TYPE DROPDOWN SECTION */}
//         <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Businesses by name, type and city</h2>
            
//             <div className="flex flex-col md:flex-row gap-4 items-stretch">
//                 {/* Search by Name/Keyword Input (Live Filtering) */}
//                 <input 
//                     type="text"
//                     placeholder="Search by business name, type and city"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="flex-grow p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150"
//                 />

//                 {/* Search by Type Dropdown */}
//                 <div className="relative md:w-1/4">
//                     <select 
//                         value={searchType}
//                         onChange={(e) => setSearchType(e.target.value)}
//                         className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150 cursor-pointer"
//                     >
//                         <option value="">Search by Type</option>
//                         {/* Use the dynamic industryOptions prop */}
//                         {cleanIndustryOptions.map(type => (
//                             <option key={type} value={type}>{type}</option>
//                         ))}
//                     </select>
//                     {/* Custom Dropdown Arrow Icon */}
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                         {/* You can use an icon from react-icons here if installed */}
//                         <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                         </svg>
//                     </div>
//                 </div>

//                 {/* Search Button (Currently triggers filtering on input change) */}
//                 <button 
//                     // No onClick needed as filtering is live, but it looks good
//                     className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-150 md:w-auto"
//                 >
//                     Search
//                 </button>
//             </div>
//         </div>

//         {/* 3. FILTER LINKS (Dynamically generated) ⭐️ This section now correctly uses the dynamic array ⭐️ */}
//         <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
//             {DYNAMIC_FILTER_CATEGORIES.map(category => (
//                 <button
//                     key={category}
//                     onClick={() => {
//                         setActiveFilter(category);
//                         // Clear the dropdown when clicking a link filter
//                         setSearchType(''); 
//                     }}
//                     className={`
//                         py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap
//                         ${activeFilter === category 
//                             ? 'bg-blue-600 text-white shadow-md' // Active Style
//                             : 'text-gray-700 hover:bg-gray-200 transition duration-150' // Inactive Style
//                         }
//                     `}
//                 >
//                     {category}
//                 </button>
//             ))}
//         </div>

//         {/* 4. Card Display Area */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredBusinesses.length > 0 ? (
//                 filteredBusinesses.map(business => (
//                     <CardBox 
//                         // Use the real 'id' from the admin data
//                         key={business.id} 
//                         business={business} 
//                         onModalOpen={handleModalOpen} 
//                     />
//                 ))
//             ) : (
//                 <p className="col-span-full text-center text-gray-500 py-10">
//                     No businesses found matching the filter and search criteria.
//                 </p>
//             )}
//         </div>
//       </main>

//       {/* 5. Modal (Popup Box) will be rendered here */}
//       {isModalOpen && <PopUpModal onClose={handleModalClose} data={selectedBusiness} />}
//     </div>
//   );
// }
// export default Home;
// import React, { useState } from 'react';
// import PopUpModal from '../../components/PopUpModal.jsx'; 

// // --- Card Component (Place this in src/components/CardBox.jsx later) ---
// const CardBox = ({ business, onModalOpen }) => (
//     <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between">
//         <div>
//             {/* Using the real data key 'Business Name' */}
//             <h3 className="text-xl font-semibold text-gray-800">{business['Business Name']}</h3>
//             {/* Using the real data key 'Industry Type' */}
//             <p className="text-sm text-blue-600 mt-1 mb-3 bg-blue-50 px-2 py-0.5 inline-block rounded-full">
//                 {business['Industry Type']}
//             </p>
//             <p className={`text-xs mt-1 px-2 py-0.5 inline-block rounded-full font-bold
//                 ${business.Status === 'Active' ? 'bg-green-100 text-green-700' : 
//                   business.Status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' :
//                   'bg-red-100 text-red-700'}`}>
//                 Status: {business.Status}
//             </p>        
//         </div>
//         <button 
//             onClick={() => onModalOpen(business)} 
//             className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150 cursor-pointer"
//         >
//             View
//         </button>
//     </div>
// );


// // ⭐️ CRITICAL FIX: Add a robust fallback list for development ⭐️
// const FALLBACK_INDUSTRY_OPTIONS = ['IT', 'Food', 'Industry', 'General', 'Construction'];


// function Home({ setCurrentView, views, allBusinesses, industryOptions = [] }) {
  
//   // Choose the dynamic options or the fallback if the dynamic list is empty
//   const optionsToUse = (industryOptions && industryOptions.length > 0) 
//       ? industryOptions 
//       : FALLBACK_INDUSTRY_OPTIONS;
    
//   // Create a clean list of industries for the UI
//   const cleanIndustryOptions = optionsToUse.filter(i => i !== 'Unspecified Industry');
  
//   // The main filter categories will start with 'All'
//   const DYNAMIC_FILTER_CATEGORIES = ['All', ...cleanIndustryOptions];

//   // 1. FILTER: Only show businesses marked 'Active' by the admin
//   const activeBusinesses = (allBusinesses || []).filter(b => b.Status === 'Active');
  
//   // --- State Hooks ---
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState(''); // Value from the dropdown
//   const [activeFilter, setActiveFilter] = useState('All'); // Value from the filter links
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);

//   // --- Filtering Logic: Combines Name Search, Link Filter, and Dropdown Search ---
//   const filteredBusinesses = activeBusinesses
//     // 1. Filter by the active Category Link (Primary Filter)
//     .filter(business => {
//       if (activeFilter === 'All') return true;
//       return business['Industry Type'] === activeFilter;
//     })
//     // 2. Filter by Search Term (Name/Keyword)
//     .filter(business => 
//       business['Business Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       business['Physical Address']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       business['Industry Type']?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     // 3. Filter by Search Type Dropdown (Secondary Filter)
//     .filter(business => {
//         if (!searchType) return true;
//         return business['Industry Type'] === searchType;
//     });


//   // --- Modal Functions ---
//   const handleModalOpen = (business) => {
//     setSelectedBusiness(business);
//     setIsModalOpen(true);
//   };
  
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedBusiness(null);
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* 1. HEADER SECTION (No logic change) */}
//       <header className="p-4 bg-white shadow-md border-b sticky top-0 z-10">
//         <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
            
//             {/* Left Placeholder for balance */}
//             <div className="w-1/4 hidden sm:block"></div> 

//             {/* Center Content: Title and Tagline */}
//             <div className="w-full sm:w-2/4 flex flex-col items-center order-1 sm:order-none">
//                 <h1 className="text-3xl font-extrabold text-gray-800">
//                     TBT Website
//                 </h1>
//                 <p className="text-lg text-gray-700 mt-1 text-center">
//                     This is the business matching website.
//                 </p>
//             </div>

//             {/* Right Side: Both Buttons Side-by-Side */}
//             <div className="w-full sm:w-1/4 flex justify-center sm:justify-end space-x-3 mt-4 sm:mt-1 order-2 sm:order-none">
                 
//                  {/* Admin Login Button */}
//                  <button 
//                     onClick={() => setCurrentView(views.ADMIN_LOGIN)}
//                     className="px-5 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md whitespace-nowrap"
//                  >
//                     Admin Login
//                  </button>

//                  {/* Register for Business Button */}
//                  <button
//                     onClick={() => setCurrentView(views.BUSINESS_REGISTER)}
//                     className="text-sm px-3 py-2 cursor-pointer bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition duration-150 whitespace-nowrap"
//                 >
//                     Register for business!
//                 </button>
                
                
//             </div>
//         </div>
//       </header>

//       {/* 2. MAIN CONTENT AREA */}
//       <main className="container mx-auto p-4 pt-4">
        
//         {/* SEARCH AND TYPE DROPDOWN SECTION */}
//         <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Businesses by name, type and city</h2>
            
//             <div className="flex flex-col md:flex-row gap-4 items-stretch">
//                 {/* Search by Name/Keyword Input (Live Filtering) */}
//                 <input 
//                     type="text"
//                     placeholder="Search by business name, type and city"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="flex-grow p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150"
//                 />

//                 {/* Search by Type Dropdown */}
//                 <div className="relative md:w-1/4">
//                     <select 
//                         value={searchType}
//                         onChange={(e) => setSearchType(e.target.value)}
//                         className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150 cursor-pointer"
//                     >
//                         <option value="">Search by Type</option>
//                         {/* Use the dynamic industryOptions prop */}
//                         {cleanIndustryOptions.map(type => (
//                             <option key={type} value={type}>{type}</option>
//                         ))}
//                     </select>
//                     {/* Custom Dropdown Arrow Icon */}
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                         {/* You can use an icon from react-icons here if installed */}
//                         <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                         </svg>
//                     </div>
//                 </div>

//                 {/* Search Button (Currently triggers filtering on input change) */}
//                 <button 
//                     // No onClick needed as filtering is live, but it looks good
//                     className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-150 md:w-auto"
//                 >
//                     Search
//                 </button>
//             </div>
//         </div>

//         {/* 3. FILTER LINKS (Dynamically generated) ⭐️ This section now correctly uses the dynamic array ⭐️ */}
//         <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
//             {DYNAMIC_FILTER_CATEGORIES.map(category => (
//                 <button
//                     key={category}
//                     onClick={() => {
//                         setActiveFilter(category);
//                         // Clear the dropdown when clicking a link filter
//                         setSearchType(''); 
//                     }}
//                     className={`
//                         py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap
//                         ${activeFilter === category 
//                             ? 'bg-blue-600 text-white shadow-md' // Active Style
//                             : 'text-gray-700 hover:bg-gray-200 transition duration-150' // Inactive Style
//                         }
//                     `}
//                 >
//                     {category}
//                 </button>
//             ))}
//         </div>

//         {/* 4. Card Display Area */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredBusinesses.length > 0 ? (
//                 filteredBusinesses.map(business => (
//                     <CardBox 
//                         // Use the real 'id' from the admin data
//                         key={business.id} 
//                         business={business} 
//                         onModalOpen={handleModalOpen} 
//                     />
//                 ))
//             ) : (
//                 <p className="col-span-full text-center text-gray-500 py-10">
//                     No businesses found matching the filter and search criteria.
//                 </p>
//             )}
//         </div>
//       </main>

//       {/* 5. Modal (Popup Box) will be rendered here */}
//       {isModalOpen && <PopUpModal onClose={handleModalClose} data={selectedBusiness} />}
//     </div>
//   );
// }
// export default Home;
// import React, { useState, useMemo } from 'react'; // ⭐️ Import useMemo
// import PopUpModal from '../../components/PopUpModal.jsx'; 

// // --- Card Component (Simplified to be inside Home.jsx for now) ---
// const CardBox = ({ business, onModalOpen }) => (
//     <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between">
//         <div>
//             {/* Using the real data key 'Business Name' */}
//             <h3 className="text-xl font-semibold text-gray-800">{business['Business Name']}</h3>
//             {/* Using the real data key 'Industry Type' */}
//             <p className="text-sm text-blue-600 mt-1 mb-3 bg-blue-50 px-2 py-0.5 inline-block rounded-full">
//                 {business['Industry Type']}
//             </p>
//             {/* Removed Status display as all businesses shown on Home are meant to be 'Active' */}
//         </div>
//         <button 
//             onClick={() => onModalOpen(business)} 
//             className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150"
//         >
//             View Details
//         </button>
//     </div>
// );


// // ⭐️ MODIFIED: Now uses dynamic categories and filters by 'Active' status.
// function Home({ setCurrentView, views, allBusinesses }) {
  
//   // --- Data Preprocessing (Use useMemo for performance) ---
//   const activeBusinesses = useMemo(() => 
//     // 1. FILTER: Only show businesses marked 'Active' for the public site
//     allBusinesses.filter(b => b.Status === 'Active')
//   , [allBusinesses]);
  
//   const DYNAMIC_FILTER_CATEGORIES = useMemo(() => {
//     // 2. DYNAMIC CATEGORIES: Create a set of unique Industry Types from active businesses
//     const uniqueIndustries = [...new Set(activeBusinesses.map(b => b['Industry Type']))]
//       .filter(Boolean) // Remove null/undefined/empty types
//       .sort();
      
//     // The filter buttons will now show 'All' plus only the categories present in active data (e.g., 'IT', 'Finance', 'General')
//     return ['All', ...uniqueIndustries];
//   }, [activeBusinesses]);
  

//   // --- State Hooks ---
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState(''); // Dropdown search is currently unused in filtering logic
//   const [activeFilter, setActiveFilter] = useState('All'); // State for the category link buttons
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);

//   // --- Filtering Logic: Combines Name Search and Category Filter ---
//   const filteredBusinesses = useMemo(() => {
//     return activeBusinesses
//       // 1. Filter by the active Category Link ('Industry Type')
//       .filter(business => {
//         if (activeFilter === 'All') return true;
//         // ⭐️ IMPORTANT: This requires your business data to use the key 'Industry Type'
//         return business['Industry Type'] === activeFilter;
//       })
//       // 2. Filter by Search Term (Business Name, Owner Name, Physical Address)
//       .filter(business => {
//           const lowerCaseSearch = searchTerm.toLowerCase();
          
//           // Search across key fields
//           const nameMatch = business['Business Name']?.toLowerCase().includes(lowerCaseSearch);
//           const typeMatch = business['Industry Type']?.toLowerCase().includes(lowerCaseSearch);
//           const addressMatch = business['Physical Address']?.toLowerCase().includes(lowerCaseSearch);
//           const ownerMatch = business['Owner Name']?.toLowerCase().includes(lowerCaseSearch);
          
//           return nameMatch || typeMatch || addressMatch || ownerMatch;
//       });
//   }, [activeBusinesses, activeFilter, searchTerm]);

//   // --- Modal Functions ---
//   const handleModalOpen = (business) => {
//     setSelectedBusiness(business);
//     setIsModalOpen(true);
//   };
  
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedBusiness(null);
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* 1. HEADER SECTION */}
//       <header className="p-4 bg-white shadow-md border-b sticky top-0 z-10">
//         <div className="flex justify-between items-start">
            
//             <div className="w-1/4 hidden sm:block"></div> 

//             <div className="w-full sm:w-2/4 flex flex-col items-center">
//                 <h1 className="text-3xl font-extrabold text-gray-800">
//                     TBT Website
//                 </h1>
//                 <p className="text-lg text-gray-700 mt-1 text-center">
//                     This is the business matching website.
//                 </p>
//             </div>

//             <div className="w-1/4 flex flex-col sm:flex-row justify-end items-end space-y-2 sm:space-y-0 sm:space-x-3 mt-1">
                 
//                  <button 
//                     onClick={() => setCurrentView(views.ADMIN_LOGIN)}
//                     className="px-5 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md whitespace-nowrap"
//                  >
//                     Admin Login
//                  </button>

//                  <button
//                     onClick={() => setCurrentView(views.BUSINESS_REGISTER)}
//                     className="text-sm px-3 py-2 cursor-pointer bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition duration-150 whitespace-nowrap"
//                 >
//                     Register for business!
//                 </button>
                
//             </div>
//         </div>
//       </header>

//       {/* 2. MAIN CONTENT AREA */}
//       <main className="container mx-auto p-4 pt-4">
        
//         {/* SEARCH SECTION */}
//         <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Businesses by name, type, owner, or address</h2>
            
//             <div className="flex flex-col md:flex-row gap-4 items-stretch">
                
//                 <input 
//                     type="text"
//                     placeholder="Search by business name, type, owner or address"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="flex-grow p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150"
//                 />

//                 {/* Search by Type Dropdown (now uses DYNAMIC_FILTER_CATEGORIES) */}
//                 <div className="relative md:w-1/4">
//                     <select 
//                         value={activeFilter} // Changed to use activeFilter for consistency
//                         onChange={(e) => {
//                             setActiveFilter(e.target.value);
//                             setSearchType(e.target.value);
//                         }}
//                         className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring focus:ring-blue-200/50 transition duration-150 cursor-pointer"
//                     >
//                         {/* ⭐️ Use dynamic categories */}
//                         {DYNAMIC_FILTER_CATEGORIES.map(type => (
//                             <option key={type} value={type}>{type === 'All' ? 'Filter by Type' : type}</option>
//                         ))}
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                         <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                         </svg>
//                     </div>
//                 </div>

//                 {/* Search Button (kept but filtering is live) */}
//                 <button 
//                     className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-150 md:w-auto"
//                     onClick={() => { /* Filtering is live, no action needed */ }}
//                 >
//                     Search
//                 </button>
//             </div>
//         </div>

//         {/* 3. FILTER LINKS (Now dynamic) */}
//         <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
//             {/* ⭐️ Use dynamic categories */}
//             {DYNAMIC_FILTER_CATEGORIES.map(category => (
//                 <button
//                     key={category}
//                     onClick={() => setActiveFilter(category)}
//                     className={`
//                         py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap
//                         ${activeFilter === category 
//                             ? 'bg-blue-600 text-white shadow-md' 
//                             : 'text-gray-700 hover:bg-gray-200 transition duration-150'
//                         }
//                     `}
//                 >
//                     {category}
//                 </button>
//             ))}
//         </div>

//         {/* 4. Card Display Area */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredBusinesses.length > 0 ? (
//                 filteredBusinesses.map(business => (
//                     <CardBox 
//                         key={business.id} 
//                         business={business} 
//                         onModalOpen={handleModalOpen} 
//                     />
//                 ))
//             ) : (
//                 <p className="col-span-full text-center text-gray-500 py-10">
//                     No active businesses found matching the filter and search criteria.
//                 </p>
//             )}
//         </div>
//       </main>

//       {/* 5. Modal (Popup Box) will be rendered here */}
//       {isModalOpen && <PopUpModal onClose={handleModalClose} data={selectedBusiness} />}
//     </div>
//   );
// }
// export default Home;
// new mobile/

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
            className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150"
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
                    className="w-full md:w-auto px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-150"
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
                        py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap
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