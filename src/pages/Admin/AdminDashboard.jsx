// // import React, { useState } from 'react';

// // // --- Configuration Data ---
// // const dashboardNavItems = [
// //     { name: "Dashboard", icon: "🏠" },
// //     { name: "Businesses", icon: "🏢" },
// //     { name: "Settings", icon: "⚙️" },
// // ];

// // // ⭐️ NEW: Predefined list of Industry options for the admin dropdown ⭐️
// // const IndustryOptions = [
// //     'IT', 
// //     'Food', 
// //     'Industry', 
// //     'General', 
// //     'Construction', 
// //     'Retail', 
// //     'Healthcare',
// //     'Unspecified Industry'
// // ];
// // // ---------------------------------------------


// // // ---------------------------------------------
// // // --- REUSABLE SUBCOMPONENT: Kanban Board ---
// // // ---------------------------------------------
// // const KanbanBoard = ({ businessData, onSelectBusiness, groupByField, title }) => {
    
// //     const groups = businessData.reduce((acc, business) => {
// //         let key;
        
// //         if (groupByField === 'Industry Type') {
// //             key = business['type'] || business['Industry Type'] || 'Unspecified Industry';
// //         } else {
// //             key = business[groupByField] || `Unspecified ${groupByField}`;
// //         }

// //         if (!acc[key]) {
// //             acc[key] = [];
// //         }
// //         acc[key].push(business);
// //         return acc;
// //     }, {});

// //     const uniqueGroups = Object.keys(groups).sort();

// //     const getColor = (groupKey) => {
// //         const hash = groupKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
// //         const colors = [
// //             { header: 'bg-indigo-700', border: 'border-indigo-600', text: 'text-indigo-300', cardBorder: 'border-blue-500' },
// //             { header: 'bg-teal-700', border: 'border-teal-600', text: 'text-teal-300', cardBorder: 'border-teal-500' },
// //             { header: 'bg-pink-700', border: 'border-pink-600', text: 'text-pink-300', cardBorder: 'border-pink-500' },
// //             { header: 'bg-purple-700', border: 'border-purple-600', text: 'text-purple-300', cardBorder: 'border-purple-500' },
// //         ];
// //         return colors[hash % colors.length];
// //     };
    
// //     if (uniqueGroups.length === 0 || businessData.length === 0) {
// //         return (
// //             <div className="text-center p-12 bg-gray-800 rounded-xl shadow-lg">
// //                 <p className="text-xl text-gray-400">📊 No businesses found to display in this view.</p>
// //                 <p className="text-sm text-gray-500 mt-2">Check the 'Businesses' tab or ensure data is available.</p>
// //             </div>
// //         );
// //     }
    
// //     return (
// //         <div>
// //             <h2 className="text-3xl font-extrabold text-white mb-6">{title}</h2>
            
// //             <div className="flex space-x-6 overflow-x-auto pb-4">
// //                 {uniqueGroups.map(groupKey => {
// //                     const businesses = groups[groupKey]; 
// //                     const color = getColor(groupKey);
                    
// //                     return (
// //                         <div key={groupKey} className="flex-shrink-0 w-80"> 
                            
// //                             <div className={`p-3 rounded-t-xl ${color.header} shadow-lg flex justify-between items-center`}>
// //                                 <h3 className={`text-lg font-bold text-white`}>
// //                                     {groupKey}
// //                                 </h3>
// //                                 <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-gray-900 text-white">
// //                                     {businesses.length}
// //                                 </span>
// //                             </div>

// //                             <div className="bg-gray-800 p-3 space-y-3 rounded-b-xl min-h-[500px] shadow-inner border-x border-b border-gray-700">
// //                                 {businesses.map(business => (
// //                                     <div 
// //                                         key={business.id}
// //                                         onClick={() => onSelectBusiness(business)}
// //                                         className={`p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-150 shadow-md border-l-4 ${color.cardBorder}`}
// //                                     >
// //                                         <h4 className="text-md font-bold text-white truncate">
// //                                             {business['Business Name'] || 'Unnamed'}
// //                                         </h4>
// //                                         <p className="text-xs text-gray-400 mt-1">
// //                                             Owner: {business['Owner Name'] || 'N/A'}
// //                                         </p>
// //                                         <p className="text-xs text-gray-400 mt-1">
// //                                             {groupByField === 'Status' ? `Industry: ${business['Industry Type'] || 'N/A'}` : `Status: ${business.Status || 'N/A'}`}
// //                                         </p>
// //                                         <span className={`mt-2 inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-0.5 ${
// //                                             business.Status === 'Active' ? 'bg-green-700 text-green-100' : 
// //                                             business.Status === 'Pending Review' ? 'bg-yellow-700 text-yellow-100' :
// //                                             'bg-red-700 text-red-100'
// //                                         }`}>
// //                                             {business.Status || 'N/A'}
// //                                         </span>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     );
// //                 })}
// //             </div>
// //         </div>
// //     );
// // };


// // // --- SUBCOMPONENT: Custom Confirmation Modal (Deleted for brevity) ---
// // const DeleteConfirmModal = ({ businessName, onConfirm, onCancel }) => {/* ... */ return (
// //     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
// //         <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-red-700 transform scale-100 transition-transform duration-300">
// //             <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
// //             <p className="text-gray-300 mb-6">
// //                 Are you sure you want to **permanently delete** the business: 
// //                 <span className="font-semibold text-red-400"> "{businessName}"</span>? 
// //                 This action cannot be undone.
// //             </p>
// //             <div className="flex justify-end space-x-4">
// //                 <button
// //                     onClick={onCancel}
// //                     className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-150"
// //                 >
// //                     Cancel
// //                 </button>
// //                 <button
// //                     onClick={onConfirm}
// //                     className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-150"
// //                 >
// //                     Yes, Delete Permanently
// //                 </button>
// //             </div>
// //         </div>
// //     </div>
// // );};

// // // --- Subcomponent: Custom Success Toast/Message (Deleted for brevity) ---
// // const SuccessToast = ({ message, onClose }) => {
// //     React.useEffect(() => {
// //         const timer = setTimeout(() => {
// //             onClose();
// //         }, 3000);
// //         return () => clearTimeout(timer);
// //     }, [onClose]);

// //     return (
// //         <div className="fixed top-5 right-5 z-[100] p-4 bg-green-600 text-white rounded-lg shadow-xl flex items-center space-x-3 transition-opacity duration-300">
// //             <span>✅ {message}</span>
// //             <button onClick={onClose} className="text-white hover:text-gray-200 font-bold ml-2">
// //                 &times;
// //             </button>
// //         </div>
// //     );
// // };


// // // ---------------------------------------------
// // // --- Subcomponent: Business Detail View/Edit Form ⭐️ MODIFIED ⭐️ ---
// // // ---------------------------------------------
// // const BusinessDetailView = ({ business, onBack, onUpdateData, setSuccessMessage }) => {
    
// //     const [editData, setEditData] = useState(business);
// //     const StatusOptions = ["Pending Review", "Active", "Rejected"];

// //     // Keys to render as editable fields (excluding 'id' and 'Status')
// //     const editableKeys = Object.keys(business).filter(key => key !== 'id' && key !== 'Status');
    
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setEditData(prev => ({ 
// //             ...prev, 
// //             [name]: value 
// //         }));
// //     };
    
// //     const handleSaveClick = () => {
// //         onUpdateData(business.id, editData); 
// //         setSuccessMessage(`Business ${business['Business Name']} saved successfully!`);
// //         onBack(); 
// //     };

// //     return (
// //         <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
// //             <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">
// //                 Editing: {business['Business Name'] || 'N/A'}
// //             </h2>
            
// //             <button
// //                 onClick={onBack}
// //                 className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150"
// //             >
// //                 ← Back to List
// //             </button>

// //             <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-300">
                    
// //                     {/* Render ALL data fields, checking for Industry Type */}
// //                     {editableKeys.map(key => {
// //                         const isIndustryType = key === 'Industry Type';
                        
// //                         return (
// //                             <div key={key} className="p-3 bg-gray-700 rounded-lg">
// //                                 <label className="text-xs uppercase text-gray-400 font-bold block mb-1">
// //                                     {key}:
// //                                 </label>

// //                                 {isIndustryType ? (
// //                                     // ⭐️ RENDER SELECT DROPDOWN FOR INDUSTRY TYPE ⭐️
// //                                     <select
// //                                         name={key}
// //                                         value={editData[key] || ''}
// //                                         onChange={handleChange}
// //                                         className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                                     >
// //                                         {IndustryOptions.map(industry => (
// //                                             <option 
// //                                                 key={industry} 
// //                                                 value={industry}
// //                                             >
// //                                                 {industry}
// //                                             </option>
// //                                         ))}
// //                                     </select>
// //                                 ) : (
// //                                     // RENDER STANDARD INPUT FOR ALL OTHER FIELDS
// //                                     <input
// //                                         type='text'
// //                                         name={key}
// //                                         value={editData[key] || ''}
// //                                         onChange={handleChange}
// //                                         className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                                     />
// //                                 )}
// //                             </div>
// //                         );
// //                     })}
                    
// //                     {/* Status Update Field (Kept as select) */}
// //                     <div className="p-3 bg-gray-600 rounded-lg md:col-span-2">
// //                         <label htmlFor="status-select" className="text-xs uppercase text-gray-400 font-bold block mb-1">
// //                             Update Status:
// //                         </label>
// //                         <select
// //                             id="status-select"
// //                             name="Status"
// //                             value={editData.Status}
// //                             onChange={handleChange}
// //                             className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                         >
// //                             {StatusOptions.map(s => (
// //                                 <option key={s} value={s}>{s}</option>
// //                             ))}
// //                         </select>
// //                     </div>

// //                 </div>
                
// //                 <div className="pt-6 mt-6 border-t border-gray-700">
// //                     <button
// //                         type="submit"
// //                         className="mt-3 w-full py-3 bg-green-600 text-xl font-extrabold text-white rounded-lg hover:bg-green-700 transition duration-150 shadow-md"
// //                     >
// //                         Save All Changes
// //                     </button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };
// // // ---------------------------------------------


// // function AdminDashboard({ setCurrentView, views , businessData , adminName , onUpdateData, onDeleteBusiness}) {
  
// //   const [selectedBusiness, setSelectedBusiness] = useState(null);
// //   const [businessToDelete, setBusinessToDelete] = useState(null); 
// //   const [successMessage, setSuccessMessage] = useState(null);
// //   const [activeNavItem, setActiveNavItem] = useState('Dashboard'); 


// //   const dataToDisplay = businessData;

// //   const handleViewEditClick = (business) => {
// //     setSelectedBusiness(business);
// //   };

// //   const handleBackToList = () => {
// //     setSelectedBusiness(null);
// //     setActiveNavItem(activeNavItem);
// //   };

// //   const handleDeleteClick = (business) => {
// //       setBusinessToDelete(business); 
// //   };
  
// //   const handleConfirmDelete = () => {
// //       if (businessToDelete) {
// //           const name = businessToDelete['Business Name'];
// //           onDeleteBusiness(businessToDelete.id); 
// //           setSuccessMessage(`${name} has been permanently deleted.`);
// //       }
// //       setBusinessToDelete(null); 
// //   };

// //   const handleCancelDelete = () => {
// //       setBusinessToDelete(null); 
// //   };
  
// //   const handleCloseToast = () => {
// //       setSuccessMessage(null);
// //   };
  
// //   const handleNavClick = (itemName) => {
// //       setActiveNavItem(itemName);
// //       setSelectedBusiness(null);
// //   };


// //   const renderContent = () => {
// //     // 1. DETAIL VIEW (Highest Priority)
// //     if (selectedBusiness) {
// //         return (
// //             <BusinessDetailView 
// //                 business={selectedBusiness} 
// //                 onBack={handleBackToList}
// //                 onUpdateData={onUpdateData} 
// //                 setSuccessMessage={setSuccessMessage}
// //             />
// //         );
// //     }
  
// //     // 2. DASHBOARD VIEW - Grouped by INDUSTRY TYPE
// //     if (activeNavItem === 'Dashboard') {
// //         return (
// //             <KanbanBoard 
// //                 businessData={dataToDisplay} 
// //                 onSelectBusiness={handleViewEditClick}
// //                 groupByField={'Industry Type'} // Group by Industry Type
// //                 title={'Dashboard: Grouped by Industry Type'}
// //             />
// //         );
// //     }
    
// //     // 3. BUSINESSES VIEW - Grouped by STATUS
// //     if (activeNavItem === 'Businesses') {
// //         return (
// //             <KanbanBoard 
// //                 businessData={dataToDisplay} 
// //                 onSelectBusiness={handleViewEditClick}
// //                 groupByField={'Status'} // Group by Status
// //                 title={'Businesses: Grouped by Business Status'}
// //             />
// //         );
// //     }
    
// //     // 4. SETTINGS VIEW (Placeholder)
// //     if (activeNavItem === 'Settings') {
// //         return (
// //             <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-96 flex items-center justify-center">
// //                 <p className="text-2xl text-gray-400 font-light">⚙️ Settings Management Coming Soon...</p>
// //             </div>
// //         );
// //     }
    
// //     return null;
// //   };

// //   const getHeaderTitle = () => {
// //     if (selectedBusiness) {
// //         return `Editing: ${selectedBusiness['Business Name']}`;
// //     }
// //     return activeNavItem;
// //   };


// //   return (
// //     <div className="min-h-screen flex bg-gray-900 text-gray-100">
      
// //       {/* 1. LEFT SIDEBAR */}
// //       <nav className="w-64 bg-gray-800 shadow-2xl flex-shrink-0 flex flex-col justify-between fixed h-screen z-20">
// //         <div>
// //             {/* Logo/Title Area */}
// //             <div className="p-4 border-b border-gray-700">
// //                 <h2 className="text-xl font-bold text-white tracking-wider">TBT Admin</h2>
// //             </div>
// //             {/* Navigation Links */}
// //             <ul className="py-4 space-y-2">
// //                 {dashboardNavItems.map((item) => (
// //                     <li key={item.name}>
// //                         <a 
// //                             href="#" 
// //                             onClick={() => handleNavClick(item.name)}
// //                             className={`flex items-center space-x-3 px-4 py-2 font-medium transition duration-150 ${
// //                                 item.name === activeNavItem
// //                                 ? 'bg-blue-600 text-white' 
// //                                 : 'text-gray-300 hover:bg-gray-700'
// //                             }`}
// //                         >
// //                             <span className="text-lg">{item.icon}</span>
// //                             <span>{item.name}</span>
// //                         </a>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //         {/* User Profile/Settings Placeholder (Dynamic name) */}
// //         <div className="p-4 border-t border-gray-700">
// //             <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
// //                 <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?img=68" alt="Admin Profile" />
// //                 <span className="text-sm font-medium">{adminName}</span>
// //             </div>
// //         </div>
// //       </nav>

// //       {/* 2. MAIN CONTENT AREA */}
// //       <div className="w-64 flex-shrink-0 hidden md:block"></div> 
// //       <div className="flex-1 p-4 sm:p-8 overflow-x-hidden"> 
        
// //         {/* Top Header/Action Bar (Dynamic Title) */}
// //         <header className="flex justify-between items-center pb-6 border-b border-gray-700 mb-8">
// //             <h1 className="text-3xl font-light text-white">
// //                 {getHeaderTitle()} 
// //             </h1>
// //             <button
// //                 onClick={() => setCurrentView(views.HOME)}
// //                 className="px-4 py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition duration-150 shadow-md whitespace-nowrap"
// //               >
// //                   Logout
// //             </button>
// //         </header>

// //         {/* ⭐️ Render Content based on state */}
// //         {renderContent()}

// //       </div>
      
// //       {/* ⭐️ Render the custom delete modal */}
// //       {businessToDelete && (
// //           <DeleteConfirmModal
// //               businessName={businessToDelete['Business Name']}
// //               onConfirm={handleConfirmDelete}
// //               onCancel={handleCancelDelete}
// //           />
// //       )}

// //       {/* ⭐️ Render the custom success toast */}
// //       {successMessage && (
// //           <SuccessToast 
// //               message={successMessage} 
// //               onClose={handleCloseToast} 
// //           />
// //       )}
// //     </div>
// //   );
// // }
// // export default AdminDashboard;


// // import React, { useState } from 'react';

// // // --- Configuration Data ---
// // const dashboardNavItems = [
// //     { name: "Dashboard", icon: "🏠" },
// //     { name: "Businesses", icon: "🏢" },
// //     { name: "Settings", icon: "⚙️" }, // Removed Reviews for simplicity/focus
// // ];

// // // ---------------------------------------------
// // // --- ⭐️ NEW SUBCOMPONENT: Industry Management Form ---
// // // ---------------------------------------------
// // const AddIndustryForm = ({ onAddIndustry, currentIndustries, setSuccessMessage }) => {
    
// //     const [newIndustry, setNewIndustry] = useState('');

// //     const handleSave = (e) => {
// //         e.preventDefault();
// //         const industryName = newIndustry.trim();

// //         if (!industryName) {
// //             alert("Please enter a valid industry name.");
// //             return;
// //         }

// //         // Check for duplicates (case-insensitive)
// //         if (currentIndustries.map(i => i.toLowerCase()).includes(industryName.toLowerCase())) {
// //             alert(`Industry "${industryName}" already exists.`);
// //             return;
// //         }
        
// //         // ⭐️ KEY FIX: Call the global update function to save the new industry
// //         onAddIndustry(industryName); 
        
// //         setSuccessMessage(`Industry "${industryName}" added successfully!`);
// //         setNewIndustry('');
// //     };
    
// //     return (
// //         <div className="p-6 bg-gray-800 rounded-xl shadow-lg mt-6">
// //             <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Add New Industry Type</h3>
            
// //             <form onSubmit={handleSave} className="flex gap-4 mb-8">
// //                 <input
// //                     type="text"
// //                     value={newIndustry}
// //                     onChange={(e) => setNewIndustry(e.target.value)}
// //                     placeholder="e.g., Finance, Tourism, IT"
// //                     className="flex-grow p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //                 <button 
// //                     type="submit"
// //                     className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 whitespace-nowrap"
// //                 >
// //                     Add Industry
// //                 </button>
// //             </form>
            
// //             <h3 className="text-xl font-semibold text-white mb-3">Current Industries</h3>
// //             <div className="flex flex-wrap gap-3">
// //                 {currentIndustries.length > 0 ? (
// //                     currentIndustries.map(i => (
// //                         <span key={i} className="px-4 py-1 bg-green-700 text-white rounded-full text-sm font-medium">
// //                             {i}
// //                         </span>
// //                     ))
// //                 ) : (
// //                     <p className="text-gray-400">No custom industries added yet. Only 'All' is available on the home page.</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // // ---------------------------------------------
// // // --- ⭐️ NEW SUBCOMPONENT: Settings View ---
// // // ---------------------------------------------
// // const SettingsView = ({ currentIndustries, onAddIndustry, setSuccessMessage }) => {
// //     return (
// //         <div>
// //             <h2 className="text-3xl font-light text-white mb-6">Settings</h2>
            
// //             <AddIndustryForm 
// //                 currentIndustries={currentIndustries}
// //                 onAddIndustry={onAddIndustry}
// //                 setSuccessMessage={setSuccessMessage}
// //             />
            
// //             {/* You can add more settings here later, like changing admin password */}
// //         </div>
// //     );
// // };


// // // ---------------------------------------------
// // // --- Subcomponent: Delete/Success (omitted for brevity) ---
// // // ---------------------------------------------
// // const DeleteConfirmModal = ({ businessName, onConfirm, onCancel }) => (
// //     /* ... (Your existing DeleteConfirmModal component) ... */
// //     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
// //         <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-red-700 transform scale-100 transition-transform duration-300">
// //             <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
// //             <p className="text-gray-300 mb-6">
// //                 Are you sure you want to **permanently delete** the business: 
// //                 <span className="font-semibold text-red-400"> "{businessName}"</span>? 
// //             </p>
// //             <div className="flex justify-end space-x-4">
// //                 <button onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-150">
// //                     Cancel
// //                 </button>
// //                 <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-150">
// //                     Yes, Delete Permanently
// //                 </button>
// //             </div>
// //         </div>
// //     </div>
// // );

// // const SuccessToast = ({ message, onClose }) => {
// //     React.useEffect(() => {
// //         const timer = setTimeout(() => {
// //             onClose();
// //         }, 3000);
// //         return () => clearTimeout(timer);
// //     }, [onClose]);

// //     return (
// //         <div className="fixed top-5 right-5 z-[100] p-4 bg-green-600 text-white rounded-lg shadow-xl flex items-center space-x-3 transition-opacity duration-300">
// //             <span>✅ {message}</span>
// //             <button onClick={onClose} className="text-white hover:text-gray-200 font-bold ml-2">
// //                 &times;
// //             </button>
// //         </div>
// //     );
// // };

// // // ---------------------------------------------
// // // --- Subcomponent: Business Detail View/Edit Form (omitted for brevity) ---
// // // ---------------------------------------------
// // const BusinessDetailView = ({ business, onBack, onUpdateData, setSuccessMessage }) => {
    
// //     const [editData, setEditData] = useState(business);
// //     const StatusOptions = ["Pending Review", "Active", "Rejected"];

// //     const editableKeys = Object.keys(business).filter(key => key !== 'id' && key !== 'Status');
    
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setEditData(prev => ({ 
// //             ...prev, 
// //             [name]: value 
// //         }));
// //     };
    
// //     const handleSaveClick = () => {
// //         onUpdateData(business.id, editData); 
// //         setSuccessMessage(`Business ${business['Business Name']} saved successfully!`);
// //         onBack(); 
// //     };

// //     return (
// //         <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
// //             <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">
// //                 Editing: {business['Business Name'] || 'N/A'}
// //             </h2>
            
// //             <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150">
// //                 ← Back to List
// //             </button>

// //             <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-300">
                    
// //                     {/* Render ALL data fields as editable INPUTS */}
// //                     {editableKeys.map(key => (
// //                         <div key={key} className="p-3 bg-gray-700 rounded-lg">
// //                             <label className="text-xs uppercase text-gray-400 font-bold block mb-1">
// //                                 {key}:
// //                             </label>
// //                             <input
// //                                 type='text'
// //                                 name={key}
// //                                 value={editData[key] || ''}
// //                                 onChange={handleChange}
// //                                 className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                             />
// //                         </div>
// //                     ))}
                    
// //                     {/* Status Update Field */}
// //                     <div className="p-3 bg-gray-600 rounded-lg md:col-span-2">
// //                         <label htmlFor="status-select" className="text-xs uppercase text-gray-400 font-bold block mb-1">
// //                             Update Status:
// //                         </label>
// //                         <select
// //                             id="status-select"
// //                             name="Status"
// //                             value={editData.Status}
// //                             onChange={handleChange}
// //                             className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                         >
// //                             {StatusOptions.map(s => (
// //                                 <option key={s} value={s}>{s}</option>
// //                             ))}
// //                         </select>
// //                     </div>

// //                 </div>
                
// //                 <div className="pt-6 mt-6 border-t border-gray-700">
// //                     <button
// //                         type="submit"
// //                         className="mt-3 w-full py-3 bg-green-600 text-xl font-extrabold text-white rounded-lg hover:bg-green-700 transition duration-150 shadow-md"
// //                     >
// //                         Save All Changes
// //                     </button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };


// // // ---------------------------------------------
// // // --- ⭐️ MAIN COMPONENT: AdminDashboard ---
// // // ---------------------------------------------
// // function AdminDashboard({ 
// //     setCurrentView, 
// //     views, 
// //     businessData, 
// //     adminName, 
// //     onUpdateData, 
// //     onDeleteBusiness,
// //     // ⭐️ NEW DYNAMIC PROPS ⭐️
// //     currentIndustryOptions,
// //     onAddIndustry
// // }) {
  
// //   // ⭐️ State to track active sidebar item (default to Dashboard)
// //   const [activeNavItem, setActiveNavItem] = useState('Dashboard');
// //   const [selectedBusiness, setSelectedBusiness] = useState(null);
// //   const [businessToDelete, setBusinessToDelete] = useState(null); 
// //   const [successMessage, setSuccessMessage] = useState(null);


// //   const dataToDisplay = businessData.filter(b => b.Status === 'Pending Review'); // Show only Pending for the Business table view
// //   const displayColumns = [
// //     'Business Name', 
// //     'Owner Name',
// //     'Industry Type', 
// //     'Phone Number', 
// //     'Status' 
// //   ];

// //   const getCellValue = (business, colName) => {
// //       if (colName === 'Phone Number') return business['Phone Number'] || business['Phone No'] || 'N/A';
// //       return business[colName] || 'N/A';
// //   };

// //   const handleViewEditClick = (business) => {
// //     setSelectedBusiness(business);
// //   };

// //   const handleBackToList = () => {
// //     setSelectedBusiness(null);
// //   };

// //   const handleDeleteClick = (business) => {
// //       setBusinessToDelete(business);
// //   };
  
// //   const handleConfirmDelete = () => {
// //       if (businessToDelete) {
// //           const name = businessToDelete['Business Name'];
// //           onDeleteBusiness(businessToDelete.id); 
// //           setSuccessMessage(`${name} has been permanently deleted.`);
// //       }
// //       setBusinessToDelete(null);
// //   };

// //   const handleCancelDelete = () => {
// //       setBusinessToDelete(null);
// //   };
  
// //   const handleCloseToast = () => {
// //       setSuccessMessage(null);
// //   };


// //   // Function to conditionally render the correct view based on state
// //   const renderContent = () => {
      
// //     // 1. DETAIL VIEW (Highest Priority)
// //     if (selectedBusiness) {
// //         return (
// //             <BusinessDetailView 
// //                 business={selectedBusiness} 
// //                 onBack={handleBackToList}
// //                 onUpdateData={onUpdateData} 
// //                 setSuccessMessage={setSuccessMessage}
// //             />
// //         );
// //     }

// //     // 2. SETTINGS VIEW
// //     if (activeNavItem === 'Settings') {
// //         return (
// //             <SettingsView 
// //                 currentIndustries={currentIndustryOptions}
// //                 onAddIndustry={onAddIndustry}
// //                 setSuccessMessage={setSuccessMessage}
// //             />
// //         );
// //     }
    
// //     // 3. BUSINESSES VIEW (Show Pending Review Businesses)
// //     if (activeNavItem === 'Businesses') {
// //         return (
// //             <div className="bg-gray-800 p-6 rounded-xl shadow-lg overflow-x-auto">
// //                 <h2 className="text-2xl font-semibold text-gray-200 mb-4">
// //                     Businesses Pending Review ({dataToDisplay.length})
// //                 </h2>

// //                 <table className="min-w-full divide-y divide-gray-700 table-fixed">
// //                     <thead className="bg-gray-700">
// //                     <tr>
// //                         {displayColumns.map((col) => (
// //                         <th key={col} className="w-[15%] px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
// //                             {col}
// //                         </th>
// //                         ))}
// //                         <th className="w-[30%] px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
// //                         Action
// //                         </th>
// //                     </tr>
// //                     </thead>
// //                     <tbody className="bg-gray-800 divide-y divide-gray-700">
// //                     {dataToDisplay.map((business) => (
// //                         <tr key={business.id} className="hover:bg-gray-700 transition duration-150">
// //                         {displayColumns.map((col) => (
// //                             <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 overflow-hidden text-ellipsis">
// //                             {col === 'Status' ? (
// //                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                                 business[col] === 'Active' ? 'bg-green-700 text-green-100' : 'bg-yellow-700 text-yellow-100'
// //                                 }`}>
// //                                 {business[col]}
// //                                 </span>
// //                             ) : (
// //                                 getCellValue(business, col)
// //                             )}
// //                             </td>
// //                         ))}
// //                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
// //                             <button 
// //                                 onClick={() => handleViewEditClick(business)}
// //                                 className="text-blue-400 hover:text-blue-200 transition duration-150"
// //                             >
// //                                 View/Edit
// //                             </button>
// //                             <button 
// //                                 onClick={() => handleDeleteClick(business)}
// //                                 className="text-red-500 hover:text-red-400 transition duration-150"
// //                             >
// //                                 Delete
// //                             </button>
// //                         </td>
// //                         </tr>
// //                     ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         );
// //     }
    
// //     // 4. DEFAULT/DASHBOARD VIEW
// //     return (
// //         <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
// //             <h2 className="text-2xl font-semibold text-gray-200 mb-4">Admin Dashboard Overview</h2>
// //             <p className="text-gray-400">Welcome back, {adminName}. Use the navigation panel to manage businesses and settings.</p>
// //             {/* You can add your grouped dashboard cards here */}
            
// //         </div>
// //     );
// //   }; // End of renderContent

// //   return (
// //     // Main container uses flex to hold sidebar and content
// //     <div className="min-h-screen flex bg-gray-900 text-gray-100">
      
// //       {/* 1. LEFT SIDEBAR (Updated to track state) */}
// //       <nav className="w-64 bg-gray-800 shadow-2xl flex-shrink-0 flex flex-col justify-between fixed h-screen z-20">
// //         <div>
// //             {/* Logo/Title Area */}
// //             <div className="p-4 border-b border-gray-700">
// //                 <h2 className="text-xl font-bold text-white tracking-wider">TBT Admin</h2>
// //             </div>
// //             {/* Navigation Links */}
// //             <ul className="py-4 space-y-2">
// //                 {dashboardNavItems.map((item) => (
// //                     <li key={item.name}>
// //                         <a 
// //                             href="#" 
// //                             onClick={() => {
// //                                 setActiveNavItem(item.name);
// //                                 setSelectedBusiness(null); // Clear detail view when navigating
// //                             }}
// //                             className={`flex items-center space-x-3 px-4 py-2 font-medium transition duration-150 ${
// //                                 activeNavItem === item.name 
// //                                 ? 'bg-blue-600 text-white' 
// //                                 : 'text-gray-300 hover:bg-gray-700'
// //                             }`}
// //                         >
// //                             <span className="text-lg">{item.icon}</span>
// //                             <span>{item.name}</span>
// //                         </a>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //         {/* User Profile/Settings Placeholder */}
// //         <div className="p-4 border-t border-gray-700">
// //             <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
// //                 <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?img=68" alt="Admin Profile" />
// //                 <span className="text-sm font-medium">{adminName}</span>
// //             </div>
// //         </div>
// //       </nav>

// //       {/* 2. MAIN CONTENT AREA */}
// //       <div className="w-64 flex-shrink-0 hidden md:block"></div> 
// //       <div className="flex-1 p-4 sm:p-8 overflow-x-hidden"> 
        
// //         {/* Top Header/Action Bar */}
// //         <header className="flex justify-between items-center pb-6 border-b border-gray-700 mb-8">
// //             <h1 className="text-3xl font-light text-white">
// //                 {/* Dynamic Header Title */}
// //                 {selectedBusiness ? `Editing: ${selectedBusiness['Business Name']}` : activeNavItem}
// //             </h1>
// //             <button
// //                 onClick={() => setCurrentView(views.HOME)}
// //                 className="px-4 py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition duration-150 shadow-md whitespace-nowrap"
// //               >
// //                   Logout
// //             </button>
// //         </header>

// //         {/* ⭐️ Render Content based on state */}
// //         {renderContent()}

// //       </div>
      
// //       {/* ⭐️ Render the custom delete modal */}
// //       {businessToDelete && (
// //           <DeleteConfirmModal
// //               businessName={businessToDelete['Business Name']}
// //               onConfirm={handleConfirmDelete}
// //               onCancel={handleCancelDelete}
// //           />
// //       )}

// //       {/* ⭐️ Render the custom success toast */}
// //       {successMessage && (
// //           <SuccessToast 
// //               message={successMessage} 
// //               onClose={handleCloseToast} 
// //           />
// //       )}
// //     </div>
// //   );
// // }
// // export default AdminDashboard;
// // **admin dashboard home.jsx to fetch data

// // // new
// // import React, { useState } from 'react';

// // // --- Configuration Data ---
// // const dashboardNavItems = [
// //     { name: "Dashboard", icon: "🏠" },  
// //     { name: "Businesses", icon: "🏢" },
// //     { name: "Settings", icon: "⚙️" },
// // ];

// // // --- 1. DASHBOARD VIEW (Kanban Components) ---
// // const BusinessKanbanCard = ({ business, onCardClick }) => (
// //     <div 
// //         onClick={() => onCardClick(business)}
// //         className={`p-3 mb-3 bg-gray-800 text-gray-100 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-150 border-l-4 
// //             ${business.Status === 'Active' ? 'border-green-500' : 
// //               business.Status === 'Pending Review' ? 'border-yellow-500' :
// //               'border-red-500'}`}
// //     >
// //         <h4 className="text-base font-semibold text-white truncate">{business['Business Name']}</h4>
// //         <p className="text-xs text-gray-400 mt-0.5">Owner: {business['Owner Name']}</p>
// //         <p className={`text-xs mt-1 px-2 py-0.5 inline-block rounded-full font-bold
// //             ${business.Status === 'Active' ? 'bg-green-700 text-green-100' : 
// //               business.Status === 'Pending Review' ? 'bg-yellow-700 text-yellow-100' :
// //               'bg-red-700 text-red-100'}`}>
// //             {business.Status}
// //         </p>
// //     </div>
// // );

// // const KanbanBoard = ({ businessData, onCardClick }) => {
// //     const groupedBusinesses = businessData.reduce((acc, business) => {
// //         const industry = business['Industry Type'] || 'Unspecified Industry';
// //         if (!acc[industry]) acc[industry] = [];
// //         acc[industry].push(business);
// //         return acc;
// //     }, {});
    
// //     const industryTypes = Object.keys(groupedBusinesses).sort();

// //     return (
// //         <div className="flex space-x-4 overflow-x-auto h-[70vh] pb-4">
// //             {industryTypes.map(industry => (
// //                 <div key={industry} className="flex-shrink-0 w-80 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700 flex flex-col">
// //                     <h3 className="text-lg font-bold text-white mb-3 sticky top-0 bg-gray-800 pb-2 border-b border-gray-700">
// //                         {industry} ({groupedBusinesses[industry].length})
// //                     </h3>
// //                     <div className="flex-grow overflow-y-auto pr-2">
// //                         {groupedBusinesses[industry].map(business => (
// //                             <BusinessKanbanCard 
// //                                 key={business.id} 
// //                                 business={business} 
// //                                 onCardClick={onCardClick} 
// //                             />
// //                         ))}
// //                     </div>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };


// // // ---------------------------------------------
// // // --- 2. SETTINGS VIEW COMPONENTS ---
// // // ---------------------------------------------

// // // ⭐️ Admin Business Registration Form (This component relies on 'onRegisterBusiness' prop)
// // const AdminBusinessRegisterForm = ({ 
// //     onBack, 
// //     onRegisterBusiness, // ⭐️ This is the prop that was missing
// //     industryOptions, 
// //     setSuccessMessage 
// // }) => {
// //     const [formData, setFormData] = useState({
// //         'Business Name': '',
// //         'Owner Name': '',
// //         'Industry Type': '',
// //         'Physical Address': '',
// //         'Phone Number': '',
// //         'Email Address': '',
// //         'Viber Number': '',
// //         'Website Link': '',
// //         'Facebook Link': '',
// //         'Tiktok Link': '',
// //         'Google Map Link': '',
// //         'Logo URL': '',
// //         'Status': 'Active' // Default to Active
// //     });

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
        
// //         // MANDATORY FIELD VALIDATION LOGIC
// //         const requiredFields = [
// //             'Business Name', 'Owner Name', 'Industry Type', 
// //             'Physical Address', 'Phone Number', 'Email Address'
// //         ];
        
// //         for (const field of requiredFields) {
// //             if (!formData[field] || formData[field].trim() === '') {
// //                 alert(`Error: '${field}' is a required field.`);
// //                 return;
// //             }
// //         }

// //         // ⭐️ CALLING THE PROP (This is line ~1059 that failed)
// //         onRegisterBusiness(formData); 
// //         setSuccessMessage(`Business '${formData['Business Name']}' added successfully and is now live!`);
        
// //         onBack();
// //     };
    
// //     // Define the fields and their properties (mandatory flag)
// //     const formFields = [
// //         {'key': 'Business Name', 'type': 'text', 'required': true},
// //         {'key': 'Owner Name', 'type': 'text', 'required': true},
// //         {'key': 'Industry Type', 'type': 'select', 'options': industryOptions, 'required': true},
// //         {'key': 'Physical Address', 'type': 'text', 'required': true},
// //         {'key': 'Phone Number', 'type': 'text', 'required': true},
// //         {'key': 'Email Address', 'type': 'email', 'required': true},
// //         {'key': 'Viber Number', 'type': 'text'},
// //         {'key': 'Website Link', 'type': 'url'},
// //         {'key': 'Facebook Link', 'type': 'url'},
// //         {'key': 'Tiktok Link', 'type': 'url'},
// //         {'key': 'Google Map Link', 'type': 'url'},
// //         {'key': 'Logo URL', 'type': 'url'},
// //     ];

// //     return (
// //         <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-6">
// //             <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">Manual Business Registration</h2>
// //             <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
// //                 ← Back to Settings
// //             </button>
// //             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
// //                 {formFields.map(field => (
// //                     <div key={field.key} className="p-3 bg-gray-700 rounded-lg">
// //                         <label className="text-xs uppercase text-gray-400 font-bold block mb-1">
// //                             {field.key} {field.required ? '(*)' : ''}
// //                         </label>
                        
// //                         {field.type === 'select' ? (
// //                             <select 
// //                                 name={field.key} 
// //                                 value={formData[field.key]} 
// //                                 onChange={handleChange} 
// //                                 required={field.required}
// //                                 className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                             >
// //                                 <option value="">-- Select Industry --</option>
// //                                 {field.options.map(option => (
// //                                     <option key={option} value={option}>{option}</option>
// //                                 ))}
// //                             </select>
// //                         ) : (
// //                             <input 
// //                                 type={field.type} 
// //                                 name={field.key} 
// //                                 value={formData[field.key]} 
// //                                 onChange={handleChange} 
// //                                 required={field.required}
// //                                 placeholder={field.required ? '' : 'Optional'}
// //                                 className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3"
// //                             />
// //                         )}
// //                     </div>
// //                 ))}

// //                 {/* Status Field */}
// //                 <div className="p-3 bg-gray-600 rounded-lg md:col-span-2">
// //                     <label className="text-xs uppercase text-gray-400 font-bold block mb-1">Update Status:</label>
// //                     <select
// //                         name="Status"
// //                         value={formData.Status}
// //                         onChange={handleChange}
// //                         className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3"
// //                     >
// //                         <option value="Active">Active (Default for Admin-added)</option>
// //                         <option value="Pending Review">Pending Review</option>
// //                         <option value="Rejected">Rejected</option>
// //                     </select>
// //                 </div>
                
// //                 {/* Submit Button */}
// //                 <div className="md:col-span-2 pt-4 border-t border-gray-700">
// //                     <button type="submit" className="w-full py-3 bg-green-600 text-xl font-extrabold text-white rounded-lg hover:bg-green-700 shadow-md">
// //                         Register Business
// //                     </button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };


// // // Subcomponent to add dynamic Industry Type
// // const AddIndustryForm = ({ onAddIndustry, currentIndustries, setSuccessMessage }) => {
// //     const [newIndustry, setNewIndustry] = useState('');
// //     const handleSave = (e) => {
// //         e.preventDefault();
// //         const industryName = newIndustry.trim();
// //         if (!industryName) return alert("Please enter a valid industry name.");
// //         if (currentIndustries.map(i => i.toLowerCase()).includes(industryName.toLowerCase())) {
// //             return alert(`Industry "${industryName}" already exists.`);
// //         }
// //         onAddIndustry(industryName); 
// //         setSuccessMessage(`Industry "${industryName}" added successfully!`);
// //         setNewIndustry('');
// //     };
    
// //     return (
// //         <div className="p-6 bg-gray-800 rounded-xl shadow-lg mt-6">
// //             <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Add Dynamic Industry Type</h3>
// //             <form onSubmit={handleSave} className="flex gap-4 mb-8">
// //                 <input
// //                     type="text"
// //                     value={newIndustry}
// //                     onChange={(e) => setNewIndustry(e.target.value)}
// //                     placeholder="e.g., Finance, Tourism, IT"
// //                     className="flex-grow p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //                 <button 
// //                     type="submit"
// //                     className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 whitespace-nowrap"
// //                 >
// //                     Add Industry
// //                 </button>
// //             </form>
// //             <h3 className="text-xl font-semibold text-white mb-3">Current Active Industries:</h3>
// //             <div className="flex flex-wrap gap-3">
// //                 {currentIndustries.length > 0 ? (
// //                     currentIndustries.map(i => (
// //                         <span key={i} className="px-4 py-1 bg-green-700 text-white rounded-full text-sm font-medium">
// //                             {i}
// //                         </span>
// //                     ))
// //                 ) : (
// //                     <p className="text-gray-400">No custom industries added yet.</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };


// // // Button to switch to the Business Register Form
// // const AddBusinessSection = ({ onNavigateToForm }) => ( 
// //     <div className="p-6 bg-gray-800 rounded-xl shadow-lg mt-6">
// //         <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Register New Business (Admin)</h3>
// //         <p className="text-gray-400 mb-4">Click below to manually add a new business *inside* the admin panel.</p>
// //         <button 
// //             onClick={onNavigateToForm} 
// //             className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150"
// //         >
// //             Go to Business Register Form
// //         </button>
// //     </div>
// // );


// // // Combined Settings View (Manages sub-view state)
// // const SettingsView = ({ 
// //     currentIndustries, 
// //     onAddIndustry, 
// //     onRegisterBusiness, // ⭐️ Prop passed down
// //     setSuccessMessage, 
// //     settingsSubView,
// //     setSettingsSubView,
// // }) => {
    
// //     if (settingsSubView === 'register') {
// //         return (
// //             <AdminBusinessRegisterForm
// //                 onBack={() => setSettingsSubView('main')}
// //                 onRegisterBusiness={onRegisterBusiness} // ⭐️ Prop passed down
// //                 industryOptions={currentIndustries}
// //                 setSuccessMessage={setSuccessMessage}
// //             />
// //         );
// //     }

// //     // Default 'main' settings view
// //     return (
// //         <div>
// //             <h2 className="text-3xl font-light text-white mb-6">Settings</h2>
            
// //             {/* 1. Add Industry Type Section */}
// //             <AddIndustryForm 
// //                 currentIndustries={currentIndustries}
// //                 onAddIndustry={onAddIndustry}
// //                 setSuccessMessage={setSuccessMessage}
// //             />
            
// //             {/* 2. Add Business Section (Button) */}
// //             <AddBusinessSection 
// //                 onNavigateToForm={() => setSettingsSubView('register')}
// //             />
// //         </div>
// //     );
// // };


// // // ---------------------------------------------
// // // --- 3. BUSINESS DETAIL VIEW (For editing existing) ---
// // // ---------------------------------------------

// // const BusinessDetailView = ({ business, onBack, onUpdateData, setSuccessMessage, industryOptions }) => {
// //     const [editData, setEditData] = useState(business);
// //     const StatusOptions = ["Pending Review", "Active", "Rejected"];
// //     // Keys to show in the edit view. Include all fields mentioned for consistency.
// //     const allBusinessKeys = [
// //         'Business Name', 'Owner Name', 'Industry Type', 'Physical Address', 
// //         'Phone Number', 'Email Address', 'Viber Number', 'Website Link', 
// //         'Facebook Link', 'Tiktok Link', 'Google Map Link', 'Logo URL'
// //     ];
// //     // Filter out 'id' and 'Status' since they have special handling/placement
// //     const editableKeys = allBusinessKeys.filter(key => key !== 'id' && key !== 'Status');
    
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setEditData(prev => ({ ...prev, [name]: value }));
// //     };
    
// //     const handleSaveClick = () => {
// //         onUpdateData(business.id, editData); 
// //         setSuccessMessage(`Business ${business['Business Name']} saved successfully!`);
// //         onBack(); 
// //     };

// //     return (
// //         <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
// //             <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">Editing: {business['Business Name'] || 'N/A'}</h2>
// //             <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">← Back to Dashboard</button>
// //             <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-300">
// //                     {editableKeys.map(key => (
// //                         <div key={key} className="p-3 bg-gray-700 rounded-lg">
// //                             <label className="text-xs uppercase text-gray-400 font-bold block mb-1">{key}:</label>
                            
// //                             {key === 'Industry Type' ? (
// //                                 <select
// //                                     name={key}
// //                                     value={editData[key] || ''}
// //                                     onChange={handleChange}
// //                                     className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                                 >
// //                                     <option value="">Select Industry</option>
// //                                     {industryOptions.map(option => (
// //                                         <option key={option} value={option}>{option}</option>
// //                                     ))}
// //                                 </select>
// //                             ) : (
// //                                 <input
// //                                     type='text' 
// //                                     name={key}
// //                                     value={editData[key] || ''}
// //                                     onChange={handleChange}
// //                                     className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                                 />
// //                             )}
                            
// //                         </div>
// //                     ))}
// //                     <div className="p-3 bg-gray-600 rounded-lg md:col-span-2">
// //                         <label htmlFor="status-select" className="text-xs uppercase text-gray-400 font-bold block mb-1">Update Status:</label>
// //                         <select
// //                             id="status-select"
// //                             name="Status"
// //                             value={editData.Status}
// //                             onChange={handleChange}
// //                             className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3"
// //                         >
// //                             {StatusOptions.map(s => (<option key={s} value={s}>{s}</option>))}
// //                         </select>
// //                     </div>
// //                 </div>
// //                 <div className="pt-6 mt-6 border-t border-gray-700">
// //                     <button type="submit" className="mt-3 w-full py-3 bg-green-600 text-xl font-extrabold text-white rounded-lg hover:bg-green-700">Save All Changes</button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };


// // // --- Other Subcomponents (Modal/Toast) ---
// // const DeleteConfirmModal = ({ businessName, onConfirm, onCancel }) => (
// //     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
// //         <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-red-700">
// //             <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
// //             <p className="text-gray-300 mb-6">Are you sure you want to **permanently delete** "{businessName}"?</p>
// //             <div className="flex justify-end space-x-4">
// //                 <button onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Cancel</button>
// //                 <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">Yes, Delete Permanently</button>
// //             </div>
// //         </div>
// //     </div>
// // );

// // const SuccessToast = ({ message, onClose }) => {
// //     React.useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
// //     return (
// //         <div className="fixed top-5 right-5 z-[100] p-4 bg-green-600 text-white rounded-lg shadow-xl flex items-center space-x-3">
// //             <span>✅ {message}</span>
// //             <button onClick={onClose} className="text-white hover:text-gray-200 font-bold ml-2">&times;</button>
// //         </div>
// //     );
// // };


// // // ---------------------------------------------
// // // --- ⭐️ MAIN COMPONENT: AdminDashboard ---
// // // ---------------------------------------------
// // function AdminDashboard({ 
// //     setCurrentView, 
// //     views, 
// //     businessData, 
// //     adminName, 
// //     onUpdateData, 
// //     onDeleteBusiness,
// //     currentIndustryOptions,
// //     onAddIndustry,
// //     onRegisterBusiness, // ⭐️ THIS PROP MUST BE PROVIDED BY THE PARENT!
// // }) {
  
// //   const [activeNavItem, setActiveNavItem] = useState('Dashboard');
// //   const [selectedBusiness, setSelectedBusiness] = useState(null);
// //   const [businessToDelete, setBusinessToDelete] = useState(null); 
// //   const [successMessage, setSuccessMessage] = useState(null);
// //   const [settingsSubView, setSettingsSubView] = useState('main'); 

// //   const handleNavItemClick = (itemName) => {
// //     setActiveNavItem(itemName);
// //     setSelectedBusiness(null);
// //     if (itemName !== 'Settings') {
// //         setSettingsSubView('main');
// //     }
// //   };


// //   const getCellValue = (business, colName) => {
// //       if (colName === 'Phone Number') return business['Phone Number'] || business['Phone No'] || 'N/A';
// //       return business[colName] || 'N/A';
// //   };
  
// //   const handleBackToList = () => { setSelectedBusiness(null); };
// //   const handleDeleteClick = (business) => { setBusinessToDelete(business); };
  
// //   const handleConfirmDelete = () => {
// //       if (businessToDelete) {
// //           const name = businessToDelete['Business Name'];
// //           onDeleteBusiness(businessToDelete.id); 
// //           setSuccessMessage(`${name} has been permanently deleted.`);
// //       }
// //       setBusinessToDelete(null);
// //   };

// //   const handleCancelDelete = () => { setBusinessToDelete(null); };
// //   const handleCloseToast = () => { setSuccessMessage(null); };

// //   const renderDashboardView = () => {
// //     const totalBusinesses = businessData.length;
// //     const activeCount = businessData.filter(b => b.Status === 'Active').length;
// //     const pendingCount = businessData.filter(b => b.Status === 'Pending Review').length;
    
// //     return (
// //         <div>
// //             <h2 className="text-3xl font-light text-white mb-6">Kanban Board Overview</h2>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
// //                 <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-blue-500">
// //                     <p className="text-sm uppercase text-gray-400 font-bold">Total Businesses</p>
// //                     <p className="text-4xl font-extrabold text-white mt-1">{totalBusinesses}</p>
// //                 </div>
// //                 <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-green-500">
// //                     <p className="text-sm uppercase text-gray-400 font-bold">Active Businesses</p>
// //                     <p className="text-4xl font-extrabold text-white mt-1">{activeCount}</p>
// //                 </div>
// //                 <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-yellow-500">
// //                     <p className="text-sm uppercase text-gray-400 font-bold">Pending Review</p>
// //                     <p className="text-4xl font-extrabold text-white mt-1">{pendingCount}</p>
// //                 </div>
// //             </div>
            
// //             <h3 className="text-2xl font-semibold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Business Kanban by Industry Type</h3>
// //             <KanbanBoard businessData={businessData} onCardClick={setSelectedBusiness} />
// //         </div>
// //     );
// //   };

// //   const renderContent = () => {
      
// //     if (selectedBusiness) {
// //         return (
// //             <BusinessDetailView 
// //                 business={selectedBusiness} 
// //                 onBack={handleBackToList}
// //                 onUpdateData={onUpdateData} 
// //                 setSuccessMessage={setSuccessMessage}
// //                 industryOptions={currentIndustryOptions} 
// //             />
// //         );
// //     }
    
// //     if (activeNavItem === 'Dashboard') {
// //         return renderDashboardView(); 
// //     }
    
// //     if (activeNavItem === 'Settings') {
// //         return (
// //             <SettingsView 
// //                 currentIndustries={currentIndustryOptions}
// //                 onAddIndustry={onAddIndustry}
// //                 onRegisterBusiness={onRegisterBusiness} // ⭐️ Prop passed into SettingsView
// //                 setSuccessMessage={setSuccessMessage}
// //                 settingsSubView={settingsSubView}
// //                 setSettingsSubView={setSettingsSubView}
// //             />
// //         );
// //     }
    
// //     if (activeNavItem === 'Businesses') {
// //         const dataToDisplay = businessData.filter(b => b.Status === 'Pending Review'); 
// //         const displayColumns = [
// //             'Business Name', 
// //             'Owner Name',
// //             'Industry Type', 
// //             'Phone Number', 
// //             'Status' 
// //         ];

// //         return (
// //             <div className="bg-gray-800 p-6 rounded-xl shadow-lg overflow-x-auto">
// //                 <h2 className="text-2xl font-semibold text-gray-200 mb-4">
// //                     Businesses Pending Review ({dataToDisplay.length})
// //                 </h2>
// //                 <table className="min-w-full divide-y divide-gray-700 table-fixed">
// //                     <thead className="bg-gray-700">
// //                     <tr>
// //                         {displayColumns.map((col) => (
// //                         <th key={col} className="w-[15%] px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
// //                             {col}
// //                         </th>
// //                         ))}
// //                         <th className="w-[30%] px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
// //                         Action
// //                         </th>
// //                     </tr>
// //                     </thead>
// //                     <tbody className="bg-gray-800 divide-y divide-gray-700">
// //                     {dataToDisplay.map((business) => (
// //                         <tr key={business.id} className="hover:bg-gray-700 transition duration-150">
// //                         {displayColumns.map((col) => (
// //                             <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 overflow-hidden text-ellipsis">
// //                             {col === 'Status' ? (
// //                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                                 business[col] === 'Active' ? 'bg-green-700 text-green-100' : 'bg-yellow-700 text-yellow-100'
// //                                 }`}>
// //                                 {business[col]}
// //                                 </span>
// //                             ) : (
// //                                 getCellValue(business, col)
// //                             )}
// //                             </td>
// //                         ))}
// //                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
// //                             <button 
// //                                 onClick={() => setSelectedBusiness(business)}
// //                                 className="text-blue-400 hover:text-blue-200 transition duration-150"
// //                             >
// //                                 View/Edit
// //                             </button>
// //                             <button 
// //                                 onClick={() => handleDeleteClick(business)}
// //                                 className="text-red-500 hover:text-red-400 transition duration-150"
// //                             >
// //                                 Delete
// //                             </button>
// //                         </td>
// //                         </tr>
// //                     ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         );
// //     }
    
// //     return renderDashboardView();
// //   }; 

// //   return (
// //     <div className="min-h-screen flex bg-gray-900 text-gray-100">
      
// //       {/* 1. LEFT SIDEBAR (Navigation) */}
// //       <nav className="w-64 bg-gray-800 shadow-2xl flex-shrink-0 flex flex-col justify-between fixed h-screen z-20">
// //         <div>
// //             <div className="p-4 border-b border-gray-700">
// //                 <h2 className="text-xl font-bold text-white tracking-wider">TBT Admin</h2>
// //             </div>
// //             <ul className="py-4 space-y-2">
// //                 {dashboardNavItems.map((item) => (
// //                     <li key={item.name}>
// //                         <a 
// //                             href="#" 
// //                             onClick={() => handleNavItemClick(item.name)} 
// //                             className={`flex items-center space-x-3 px-4 py-2 font-medium transition duration-150 ${
// //                                 activeNavItem === item.name 
// //                                 ? 'bg-blue-600 text-white' 
// //                                 : 'text-gray-300 hover:bg-gray-700'
// //                             }`}
// //                         >
// //                             <span className="text-lg">{item.icon}</span>
// //                             <span>{item.name}</span>
// //                         </a>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //         <div className="p-4 border-t border-gray-700">
// //             <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
// //                 <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?img=68" alt="Admin Profile" />
// //                 <span className="text-sm font-medium">{adminName}</span>
// //             </div>
// //         </div>
// //       </nav>

// //       {/* 2. MAIN CONTENT AREA */}
// //       <div className="w-64 flex-shrink-0 hidden md:block"></div> 
// //       <div className="flex-1 p-4 sm:p-8 overflow-x-hidden"> 
        
// //         {/* Top Header/Action Bar */}
// //         <header className="flex justify-between items-center pb-6 border-b border-gray-700 mb-8">
// //             <h1 className="text-3xl font-light text-white">
// //                 {selectedBusiness ? `Editing: ${selectedBusiness['Business Name']}` : activeNavItem}
// //             </h1>
// //             <button
// //                 onClick={() => setCurrentView(views.HOME)}
// //                 className="px-4 py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition duration-150 shadow-md whitespace-nowrap"
// //               >
// //                   Logout
// //             </button>
// //         </header>

// //         {renderContent()}

// //       </div>
      
// //       {businessToDelete && (
// //           <DeleteConfirmModal
// //               businessName={businessToDelete['Business Name']}
// //               onConfirm={handleConfirmDelete}
// //               onCancel={handleCancelDelete}
// //           />
// //       )}

// //       {successMessage && (
// //           <SuccessToast 
// //               message={successMessage} 
// //               onClose={handleCloseToast} 
// //           />
// //       )}
// //     </div>
// //   );
// // }
// // // export default AdminDashboard;
// // import React, { useState } from 'react';

// // // --- Configuration Data ---
// // const dashboardNavItems = [
// //     { name: "Dashboard", icon: "🏠" },  
// //     { name: "Businesses", icon: "🏢" },
// //     { name: "Settings", icon: "⚙️" },
// // ];

// // // --- 1. DASHBOARD VIEW (Kanban Components) ---
// // const BusinessKanbanCard = ({ business, onCardClick }) => (
// //     <div 
// //         onClick={() => onCardClick(business)}
// //         className={`p-3 mb-3 bg-gray-800 text-gray-100 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-150 border-l-4 
// //             ${business.Status === 'Active' ? 'border-green-500' : 
// //               business.Status === 'Pending Review' ? 'border-yellow-500' :
// //               'border-red-500'}`}
// //     >
// //         <h4 className="text-base font-semibold text-white truncate">{business['Business Name']}</h4>
// //         <p className="text-xs text-gray-400 mt-0.5">Owner: {business['Owner Name']}</p>
// //         <p className={`text-xs mt-1 px-2 py-0.5 inline-block rounded-full font-bold
// //             ${business.Status === 'Active' ? 'bg-green-700 text-green-100' : 
// //               business.Status === 'Pending Review' ? 'bg-yellow-700 text-yellow-100' :
// //               'bg-red-700 text-red-100'}`}>
// //             {business.Status}
// //         </p>
// //     </div>
// // );

// // const KanbanBoard = ({ businessData, onCardClick }) => {
// //     const groupedBusinesses = businessData.reduce((acc, business) => {
// //         const industry = business['Industry Type'] || 'Unspecified Industry';
// //         if (!acc[industry]) acc[industry] = [];
// //         acc[industry].push(business);
// //         return acc;
// //     }, {});
    
// //     const industryTypes = Object.keys(groupedBusinesses).sort();

// //     return (
// //         <div className="flex space-x-4 overflow-x-auto h-[70vh] pb-4">
// //             {industryTypes.map(industry => (
// //                 <div key={industry} className="flex-shrink-0 w-80 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700 flex flex-col">
// //                     <h3 className="text-lg font-bold text-white mb-3 sticky top-0 bg-gray-800 pb-2 border-b border-gray-700">
// //                         {industry} ({groupedBusinesses[industry].length})
// //                     </h3>
// //                     <div className="flex-grow overflow-y-auto pr-2">
// //                         {groupedBusinesses[industry].map(business => (
// //                             <BusinessKanbanCard 
// //                                 key={business.id} 
// //                                 business={business} 
// //                                 onCardClick={onCardClick} 
// //                             />
// //                         ))}
// //                     </div>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };


// // // ---------------------------------------------
// // // --- 2. SETTINGS VIEW COMPONENTS ---
// // // ---------------------------------------------

// // const AdminBusinessRegisterForm = ({ 
// //     onBack, 
// //     onRegisterBusiness, 
// //     industryOptions, 
// //     setSuccessMessage 
// // }) => {
// //     const [formData, setFormData] = useState({
// //         'Business Name': '',
// //         'Owner Name': '',
// //         'Industry Type': '',
// //         'Physical Address': '',
// //         'Phone Number': '',
// //         'Email Address': '',
// //         'Viber Number': '',
// //         'Website Link': '',
// //         'Facebook Link': '',
// //         'Tiktok Link': '',
// //         'Google Map Link': '',
// //         'Logo URL': '',
// //         'Status': 'Active' 
// //     });

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
        
// //         const requiredFields = [
// //             'Business Name', 'Owner Name', 'Industry Type', 
// //             'Physical Address', 'Phone Number', 'Email Address'
// //         ];
        
// //         for (const field of requiredFields) {
// //             if (!formData[field] || formData[field].trim() === '') {
// //                 alert(`Error: '${field}' is a required field.`);
// //                 return;
// //             }
// //         }

// //         onRegisterBusiness(formData); 
// //         setSuccessMessage(`Business '${formData['Business Name']}' added successfully and is now live!`);
        
// //         onBack();
// //     };
    
// //     const formFields = [
// //         {'key': 'Business Name', 'type': 'text', 'required': true},
// //         {'key': 'Owner Name', 'type': 'text', 'required': true},
// //         {'key': 'Industry Type', 'type': 'select', 'options': industryOptions, 'required': true},
// //         {'key': 'Physical Address', 'type': 'text', 'required': true},
// //         {'key': 'Phone Number', 'type': 'text', 'required': true},
// //         {'key': 'Email Address', 'type': 'email', 'required': true},
// //         {'key': 'Viber Number', 'type': 'text'},
// //         {'key': 'Website Link', 'type': 'url'},
// //         {'key': 'Facebook Link', 'type': 'url'},
// //         {'key': 'Tiktok Link', 'type': 'url'},
// //         {'key': 'Google Map Link', 'type': 'url'},
// //         {'key': 'Logo URL', 'type': 'url'},
// //     ];

// //     return (
// //         <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-6">
// //             <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">Manual Business Registration</h2>
// //             <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
// //                 ← Back to Settings
// //             </button>
// //             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
// //                 {formFields.map(field => (
// //                     <div key={field.key} className="p-3 bg-gray-700 rounded-lg">
// //                         <label className="text-xs uppercase text-gray-400 font-bold block mb-1">
// //                             {field.key} {field.required ? '(*)' : ''}
// //                         </label>
                        
// //                         {field.type === 'select' ? (
// //                             <select 
// //                                 name={field.key} 
// //                                 value={formData[field.key]} 
// //                                 onChange={handleChange} 
// //                                 required={field.required}
// //                                 className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                             >
// //                                 <option value="">-- Select Industry --</option>
// //                                 {field.options.map(option => (
// //                                     <option key={option} value={option}>{option}</option>
// //                                 ))}
// //                             </select>
// //                         ) : (
// //                             <input 
// //                                 type={field.type} 
// //                                 name={field.key} 
// //                                 value={formData[field.key]} 
// //                                 onChange={handleChange} 
// //                                 required={field.required}
// //                                 placeholder={field.required ? '' : 'Optional'}
// //                                 className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3"
// //                             />
// //                         )}
// //                     </div>
// //                 ))}

// //                 <div className="p-3 bg-gray-600 rounded-lg md:col-span-2">
// //                     <label className="text-xs uppercase text-gray-400 font-bold block mb-1">Update Status:</label>
// //                     <select
// //                         name="Status"
// //                         value={formData.Status}
// //                         onChange={handleChange}
// //                         className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3"
// //                     >
// //                         <option value="Active">Active (Default for Admin-added)</option>
// //                         <option value="Pending Review">Pending Review</option>
// //                         <option value="Rejected">Rejected</option>
// //                     </select>
// //                 </div>
                
// //                 <div className="md:col-span-2 pt-4 border-t border-gray-700">
// //                     <button type="submit" className="w-full py-3 bg-green-600 text-xl font-extrabold text-white rounded-lg hover:bg-green-700 shadow-md">
// //                         Register Business
// //                     </button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };

// // const AddIndustryForm = ({ onAddIndustry, currentIndustries, setSuccessMessage }) => {
// //     const [newIndustry, setNewIndustry] = useState('');
// //     const handleSave = (e) => {
// //         e.preventDefault();
// //         const industryName = newIndustry.trim();
// //         if (!industryName) return alert("Please enter a valid industry name.");
// //         if (currentIndustries.map(i => i.toLowerCase()).includes(industryName.toLowerCase())) {
// //             return alert(`Industry "${industryName}" already exists.`);
// //         }
// //         onAddIndustry(industryName); 
// //         setSuccessMessage(`Industry "${industryName}" added successfully!`);
// //         setNewIndustry('');
// //     };
    
// //     return (
// //         <div className="p-6 bg-gray-800 rounded-xl shadow-lg mt-6">
// //             <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Add Dynamic Industry Type</h3>
// //             <form onSubmit={handleSave} className="flex gap-4 mb-8">
// //                 <input
// //                     type="text"
// //                     value={newIndustry}
// //                     onChange={(e) => setNewIndustry(e.target.value)}
// //                     placeholder="e.g., Finance, Tourism, IT"
// //                     className="flex-grow p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //                 <button 
// //                     type="submit"
// //                     className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 whitespace-nowrap"
// //                 >
// //                     Add Industry
// //                 </button>
// //             </form>
// //             <h3 className="text-xl font-semibold text-white mb-3">Current Active Industries:</h3>
// //             <div className="flex flex-wrap gap-3">
// //                 {currentIndustries.length > 0 ? (
// //                     currentIndustries.map(i => (
// //                         <span key={i} className="px-4 py-1 bg-green-700 text-white rounded-full text-sm font-medium">
// //                             {i}
// //                         </span>
// //                     ))
// //                 ) : (
// //                     <p className="text-gray-400">No custom industries added yet.</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // const AddBusinessSection = ({ onNavigateToForm }) => ( 
// //     <div className="p-6 bg-gray-800 rounded-xl shadow-lg mt-6">
// //         <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Register New Business (Admin)</h3>
// //         <p className="text-gray-400 mb-4">Click below to manually add a new business *inside* the admin panel.</p>
// //         <button 
// //             onClick={onNavigateToForm} 
// //             className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150"
// //         >
// //             Go to Business Register Form
// //         </button>
// //     </div>
// // );

// // const SettingsView = ({ 
// //     currentIndustries, 
// //     onAddIndustry, 
// //     onRegisterBusiness, 
// //     setSuccessMessage, 
// //     settingsSubView,
// //     setSettingsSubView,
// // }) => {
    
// //     if (settingsSubView === 'register') {
// //         return (
// //             <AdminBusinessRegisterForm
// //                 onBack={() => setSettingsSubView('main')}
// //                 onRegisterBusiness={onRegisterBusiness} 
// //                 industryOptions={currentIndustries}
// //                 setSuccessMessage={setSuccessMessage}
// //             />
// //         );
// //     }

// //     return (
// //         <div>
// //             <h2 className="text-3xl font-light text-white mb-6">Settings</h2>
            
// //             <AddIndustryForm 
// //                 currentIndustries={currentIndustries}
// //                 onAddIndustry={onAddIndustry}
// //                 setSuccessMessage={setSuccessMessage}
// //             />
            
// //             <AddBusinessSection 
// //                 onNavigateToForm={() => setSettingsSubView('register')}
// //             />
// //         </div>
// //     );
// // };


// // // ---------------------------------------------
// // // --- 3. BUSINESS DETAIL VIEW (For editing existing) ---
// // // ---------------------------------------------

// // const BusinessDetailView = ({ business, onBack, onUpdateData, setSuccessMessage, industryOptions }) => {
// //     const [editData, setEditData] = useState(business);
// //     const StatusOptions = ["Pending Review", "Active", "Rejected"];
// //     const allBusinessKeys = [
// //         'Business Name', 'Owner Name', 'Industry Type', 'Physical Address', 
// //         'Phone Number', 'Email Address', 'Viber Number', 'Website Link', 
// //         'Facebook Link', 'Tiktok Link', 'Google Map Link', 'Logo URL'
// //     ];
// //     const editableKeys = allBusinessKeys.filter(key => key !== 'id' && key !== 'Status');
    
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setEditData(prev => ({ ...prev, [name]: value }));
// //     };
    
// //     const handleSaveClick = () => {
// //         onUpdateData(business.id, editData); 
// //         setSuccessMessage(`Business ${business['Business Name']} saved successfully!`);
// //         onBack(); 
// //     };

// //     return (
// //         <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
// //             <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">Editing: {business['Business Name'] || 'N/A'}</h2>
// //             <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">← Back to Dashboard</button>
// //             <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-300">
// //                     {editableKeys.map(key => (
// //                         <div key={key} className="p-3 bg-gray-700 rounded-lg">
// //                             <label className="text-xs uppercase text-gray-400 font-bold block mb-1">{key}:</label>
                            
// //                             {key === 'Industry Type' ? (
// //                                 <select
// //                                     name={key}
// //                                     value={editData[key] || ''}
// //                                     onChange={handleChange}
// //                                     className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                                 >
// //                                     <option value="">Select Industry</option>
// //                                     {industryOptions.map(option => (
// //                                         <option key={option} value={option}>{option}</option>
// //                                     ))}
// //                                 </select>
// //                             ) : (
// //                                 <input
// //                                     type='text' 
// //                                     name={key}
// //                                     value={editData[key] || ''}
// //                                     onChange={handleChange}
// //                                     className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// //                                 />
// //                             )}
                            
// //                         </div>
// //                     ))}
// //                     <div className="p-3 bg-gray-600 rounded-lg md:col-span-2">
// //                         <label htmlFor="status-select" className="text-xs uppercase text-gray-400 font-bold block mb-1">Update Status:</label>
// //                         <select
// //                             id="status-select"
// //                             name="Status"
// //                             value={editData.Status}
// //                             onChange={handleChange}
// //                             className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3"
// //                         >
// //                             {StatusOptions.map(s => (<option key={s} value={s}>{s}</option>))}
// //                         </select>
// //                     </div>
// //                 </div>
// //                 <div className="pt-6 mt-6 border-t border-gray-700">
// //                     <button type="submit" className="mt-3 w-full py-3 bg-green-600 text-xl font-extrabold text-white rounded-lg hover:bg-green-700">Save All Changes</button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };


// // // --- Other Subcomponents (Modal/Toast) ---
// // const DeleteConfirmModal = ({ businessName, onConfirm, onCancel }) => (
// //     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
// //         <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-red-700">
// //             <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
// //             <p className="text-gray-300 mb-6">Are you sure you want to **permanently delete** "{businessName}"?</p>
// //             <div className="flex justify-end space-x-4">
// //                 <button onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Cancel</button>
// //                 <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">Yes, Delete Permanently</button>
// //             </div>
// //         </div>
// //     </div>
// // );

// // const SuccessToast = ({ message, onClose }) => {
// //     React.useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
// //     return (
// //         <div className="fixed top-5 right-5 z-[100] p-4 bg-green-600 text-white rounded-lg shadow-xl flex items-center space-x-3">
// //             <span>✅ {message}</span>
// //             <button onClick={onClose} className="text-white hover:text-gray-200 font-bold ml-2">&times;</button>
// //         </div>
// //     );
// // };


// // // ---------------------------------------------
// // // --- ⭐️ MAIN COMPONENT: AdminDashboard (MOBILE RESPONSIVE CHANGES) ---
// // // ---------------------------------------------
// // function AdminDashboard({ 
// //     setCurrentView, 
// //     views, 
// //     businessData, 
// //     adminName, 
// //     onUpdateData, 
// //     onDeleteBusiness,
// //     currentIndustryOptions,
// //     onAddIndustry,
// //     onRegisterBusiness,
// // }) {
  
// //   const [activeNavItem, setActiveNavItem] = useState('Dashboard');
// //   const [selectedBusiness, setSelectedBusiness] = useState(null);
// //   const [businessToDelete, setBusinessToDelete] = useState(null); 
// //   const [successMessage, setSuccessMessage] = useState(null);
// //   const [settingsSubView, setSettingsSubView] = useState('main'); 
// //   // ⭐️ NEW STATE for mobile sidebar
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

// //   const handleNavItemClick = (itemName) => {
// //     setActiveNavItem(itemName);
// //     setSelectedBusiness(null);
// //     if (itemName !== 'Settings') {
// //         setSettingsSubView('main');
// //     }
// //     // ⭐️ Close sidebar on item click
// //     setIsSidebarOpen(false); 
// //   };


// //   const getCellValue = (business, colName) => {
// //       if (colName === 'Phone Number') return business['Phone Number'] || business['Phone No'] || 'N/A';
// //       return business[colName] || 'N/A';
// //   };
  
// //   const handleBackToList = () => { setSelectedBusiness(null); };
// //   const handleDeleteClick = (business) => { setBusinessToDelete(business); };
  
// //   const handleConfirmDelete = () => {
// //       if (businessToDelete) {
// //           const name = businessToDelete['Business Name'];
// //           onDeleteBusiness(businessToDelete.id); 
// //           setSuccessMessage(`${name} has been permanently deleted.`);
// //       }
// //       setBusinessToDelete(null);
// //   };

// //   const handleCancelDelete = () => { setBusinessToDelete(null); };
// //   const handleCloseToast = () => { setSuccessMessage(null); };

// //   const renderDashboardView = () => {
// //     const totalBusinesses = businessData.length;
// //     const activeCount = businessData.filter(b => b.Status === 'Active').length;
// //     const pendingCount = businessData.filter(b => b.Status === 'Pending Review').length;
    
// //     return (
// //         <div>
// //             <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">Kanban Board Overview</h2>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
// //                 <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-blue-500">
// //                     <p className="text-sm uppercase text-gray-400 font-bold">Total Businesses</p>
// //                     <p className="text-4xl font-extrabold text-white mt-1">{totalBusinesses}</p>
// //                 </div>
// //                 <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-green-500">
// //                     <p className="text-sm uppercase text-gray-400 font-bold">Active Businesses</p>
// //                     <p className="text-4xl font-extrabold text-white mt-1">{activeCount}</p>
// //                 </div>
// //                 <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-yellow-500">
// //                     <p className="text-sm uppercase text-gray-400 font-bold">Pending Review</p>
// //                     <p className="text-4xl font-extrabold text-white mt-1">{pendingCount}</p>
// //                 </div>
// //             </div>
            
// //             <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Business Kanban by Industry Type</h3>
// //             <KanbanBoard businessData={businessData} onCardClick={setSelectedBusiness} />
// //         </div>
// //     );
// //   };

// //   const renderContent = () => {
      
// //     if (selectedBusiness) {
// //         return (
// //             <BusinessDetailView 
// //                 business={selectedBusiness} 
// //                 onBack={handleBackToList}
// //                 onUpdateData={onUpdateData} 
// //                 setSuccessMessage={setSuccessMessage}
// //                 industryOptions={currentIndustryOptions} 
// //             />
// //         );
// //     }
    
// //     if (activeNavItem === 'Dashboard') {
// //         return renderDashboardView(); 
// //     }
    
// //     if (activeNavItem === 'Settings') {
// //         return (
// //             <SettingsView 
// //                 currentIndustries={currentIndustryOptions}
// //                 onAddIndustry={onAddIndustry}
// //                 onRegisterBusiness={onRegisterBusiness} 
// //                 setSuccessMessage={setSuccessMessage}
// //                 settingsSubView={settingsSubView}
// //                 setSettingsSubView={setSettingsSubView}
// //             />
// //         );
// //     }
    
// //     if (activeNavItem === 'Businesses') {
// //         const dataToDisplay = businessData.filter(b => b.Status === 'Pending Review'); 
// //         // ⭐️ Reduced columns for mobile visibility
// //         const displayColumns = [
// //             'Business Name', 
// //             'Owner Name',
// //             'Industry Type', 
// //             'Status' // Removed Phone Number from default view
// //         ];

// //         return (
// //             <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
// //                 <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-4">
// //                     Businesses Pending Review ({dataToDisplay.length})
// //                 </h2>
// //                 {/* ⭐️ Ensured min-w-full and overflow-x-auto for scrollable table on mobile */}
// //                 <table className="min-w-full divide-y divide-gray-700 table-fixed">
// //                     <thead className="bg-gray-700">
// //                     <tr>
// //                         {displayColumns.map((col) => (
// //                         <th key={col} className="w-[20%] px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
// //                             {col}
// //                         </th>
// //                         ))}
// //                         <th className="w-[20%] px-3 py-2 sm:px-6 sm:py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
// //                         Action
// //                         </th>
// //                     </tr>
// //                     </thead>
// //                     <tbody className="bg-gray-800 divide-y divide-gray-700">
// //                     {dataToDisplay.map((business) => (
// //                         <tr key={business.id} className="hover:bg-gray-700 transition duration-150">
// //                         {displayColumns.map((col) => (
// //                             <td key={col} className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300 overflow-hidden text-ellipsis">
// //                             {col === 'Status' ? (
// //                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                                 business[col] === 'Active' ? 'bg-green-700 text-green-100' : 'bg-yellow-700 text-yellow-100'
// //                                 }`}>
// //                                 {business[col]}
// //                                 </span>
// //                             ) : (
// //                                 getCellValue(business, col)
// //                             )}
// //                             </td>
// //                         ))}
// //                         {/* ⭐️ Action buttons stack vertically on mobile (flex-col) */}
// //                         <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
// //                             <div className="flex flex-col sm:flex-row justify-end space-y-1 sm:space-y-0 sm:space-x-2">
// //                                 <button 
// //                                     onClick={() => setSelectedBusiness(business)}
// //                                     className="text-blue-400 hover:text-blue-200 transition duration-150"
// //                                 >
// //                                     View/Edit
// //                                 </button>
// //                                 <button 
// //                                     onClick={() => handleDeleteClick(business)}
// //                                     className="text-red-500 hover:text-red-400 transition duration-150"
// //                                 >
// //                                     Delete
// //                                 </button>
// //                             </div>
// //                         </td>
// //                         </tr>
// //                     ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         );
// //     }
    
// //     return renderDashboardView();
// //   }; 

// //   return (
// //     // Main container uses flex to hold sidebar and content
// //     <div className="min-h-screen flex bg-gray-900 text-gray-100">
      
// //       {/* 1. LEFT SIDEBAR (Navigation) - MOBILE REFATOR */}
// //       <nav className={`
// //           w-64 bg-gray-800 shadow-2xl flex-shrink-0 flex flex-col justify-between h-screen z-40 
// //           fixed top-0 left-0 transition-transform duration-300 ease-in-out
// //           md:translate-x-0 md:static // Always visible on desktop (md+)
// //           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} // Slide in/out on mobile
// //       `}>
// //         <div>
// //             {/* ⭐️ Added close button for mobile */}
// //             <div className="p-4 border-b border-gray-700 flex justify-between items-center">
// //                 <h2 className="text-xl font-bold text-white tracking-wider">TBT Admin</h2>
// //                 <button 
// //                     onClick={() => setIsSidebarOpen(false)} 
// //                     className="md:hidden text-white hover:text-gray-300 text-2xl"
// //                 >
// //                     &times;
// //                 </button>
// //             </div>
// //             <ul className="py-4 space-y-2">
// //                 {dashboardNavItems.map((item) => (
// //                     <li key={item.name}>
// //                         <a 
// //                             href="#" 
// //                             onClick={() => handleNavItemClick(item.name)} 
// //                             className={`flex items-center space-x-3 px-4 py-2 font-medium transition duration-150 ${
// //                                 activeNavItem === item.name 
// //                                 ? 'bg-blue-600 text-white' 
// //                                 : 'text-gray-300 hover:bg-gray-700'
// //                             }`}
// //                         >
// //                             <span className="text-lg">{item.icon}</span>
// //                             <span>{item.name}</span>
// //                         </a>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //         <div className="p-4 border-t border-gray-700">
// //             <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
// //                 <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?img=68" alt="Admin Profile" />
// //                 <span className="text-sm font-medium">{adminName}</span>
// //             </div>
// //         </div>
// //       </nav>
      
// //       {/* ⭐️ NEW: Overlay for Mobile when sidebar is open */}
// //       {isSidebarOpen && (
// //           <div 
// //               className="fixed inset-0 bg-gray-900 opacity-50 z-30 md:hidden"
// //               onClick={() => setIsSidebarOpen(false)}
// //           ></div>
// //       )}


// //       {/* 2. MAIN CONTENT AREA - REMOVED OFFSET DIV */}
// //       {/* REMOVED: <div className="w-64 flex-shrink-0 hidden md:block"></div> */}
// //       <div className="flex-1 p-4 sm:p-8 overflow-x-hidden w-full"> 
        
// //         {/* Top Header/Action Bar - MOBILE REFATOR */}
// //         <header className="flex justify-between items-center pb-4 sm:pb-6 border-b border-gray-700 mb-6 sm:mb-8 sticky top-0 bg-gray-900 z-10">
            
// //             <div className="flex items-center space-x-3">
// //                 {/* ⭐️ NEW: Mobile Menu Button */}
// //                 <button 
// //                     onClick={() => setIsSidebarOpen(true)}
// //                     className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800"
// //                 >
// //                     {/* Menu Icon (Hamburger) */}
// //                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
// //                 </button>
                
// //                 <h1 className="text-xl sm:text-3xl font-light text-white truncate max-w-[200px] sm:max-w-none">
// //                     {selectedBusiness ? `Editing: ${selectedBusiness['Business Name']}` : activeNavItem}
// //                 </h1>
// //             </div>

// //             <button
// //                 onClick={() => setCurrentView(views.HOME)}
// //                 className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base"
// //               >
// //                   Logout
// //             </button>
// //         </header>

// //         {renderContent()}

// //       </div>
      
// //       {businessToDelete && (
// //           <DeleteConfirmModal
// //               businessName={businessToDelete['Business Name']}
// //               onConfirm={handleConfirmDelete}
// //               onCancel={handleCancelDelete}
// //           />
// //       )}

// //       {successMessage && (
// //           <SuccessToast 
// //               message={successMessage} 
// //               onClose={handleCloseToast} 
// //           />
// //       )}
// //     </div>
// //   );
// // }
// // export default AdminDashboard;
// // src/pages/Admin/AdminDashboard.jsx

// import React, { useState, useEffect, useCallback } from 'react';
// // ⭐️ New Firebase Imports ⭐️
// import { auth, db } from '../../firebase';
// import { 
//     collection, 
//     onSnapshot, 
//     query, 
//     orderBy, 
//     doc, 
//     deleteDoc, 
//     updateDoc, 
//     setDoc,
//     getDoc, 
//     arrayUnion, 
//     arrayRemove, 
//     addDoc
// } from 'firebase/firestore'; 
// import { signOut } from 'firebase/auth'; 

// // --- Configuration Data ---
// const dashboardNavItems = [
//     { name: "Dashboard", icon: "🏠" },  
//     { name: "Businesses", icon: "🏢" },
//     { name: "Settings", icon: "⚙️" },
// ];

// const SETTINGS_DOC_PATH = 'settings/global';
// const INDUSTRY_FIELD_NAME = 'industryOptions'; // Used to store the array of industries

// // ---------------------------------------------
// // --- 1. REUSABLE SUBCOMPONENTS (From User Snippet) ---
// // ---------------------------------------------

// // --- Dashboard Kanban Components ---

// const BusinessKanbanCard = ({ business, onCardClick }) => (
//     <div 
//         onClick={() => onCardClick(business)}
//         className={`p-3 mb-3 bg-gray-800 text-gray-100 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-150 border-l-4 
//             ${business.Status === 'Active' ? 'border-green-500' : 
//               business.Status === 'Pending Review' ? 'border-yellow-500' :
//               'border-red-500'}`}
//     >
//         <h4 className="text-base font-semibold text-white truncate">{business['Business Name']}</h4>
//         <p className="text-xs text-gray-400 mt-0.5">Owner: {business['Owner Name']}</p>
//         <p className={`text-xs mt-1 px-2 py-0.5 inline-block rounded-full font-bold
//             ${business.Status === 'Active' ? 'bg-green-700 text-green-100' : 
//               business.Status === 'Pending Review' ? 'bg-yellow-700 text-yellow-100' :
//               'bg-red-700 text-red-100'}`}>
//             {business.Status}
//         </p>
//     </div>
// );

// const KanbanBoard = ({ businessData, onCardClick }) => {
//     const groupedBusinesses = businessData.reduce((acc, business) => {
//         const industry = business['Industry Type'] || 'Unspecified Industry';
//         if (!acc[industry]) acc[industry] = [];
//         acc[industry].push(business);
//         return acc;
//     }, {});
    
//     const industryTypes = Object.keys(groupedBusinesses).sort();

//     return (
//         <div className="flex space-x-4 overflow-x-auto h-[70vh] pb-4">
//             {industryTypes.map(industry => (
//                 <div key={industry} className="flex-shrink-0 w-80 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700 flex flex-col">
//                     <h3 className="text-lg font-bold text-white mb-3 sticky top-0 bg-gray-800 pb-2 border-b border-gray-700">
//                         {industry} ({groupedBusinesses[industry].length})
//                     </h3>
//                     <div className="flex-grow overflow-y-auto pr-2">
//                         {groupedBusinesses[industry].map(business => (
//                             <BusinessKanbanCard 
//                                 key={business.id} 
//                                 business={business} 
//                                 onCardClick={onCardClick} 
//                             />
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };


// // --- Settings View Components ---

// const AdminBusinessRegisterForm = ({ 
//     onBack, 
//     onRegisterBusiness, 
//     industryOptions, 
//     setSuccessMessage 
// }) => {
//     // Note: The rest of AdminBusinessRegisterForm implementation from your snippet
//     // ... (omitted for brevity, assume it's copied in full)
//     const [formData, setFormData] = useState({
//         'Business Name': '',
//         'Owner Name': '',
//         'Industry Type': '',
//         'Physical Address': '',
//         'Phone Number': '',
//         'Email Address': '',
//         'Viber Number': '',
//         'Website Link': '',
//         'Facebook Link': '',
//         'Tiktok Link': '',
//         'Google Map Link': '',
//         'Logo URL': '',
//         'Status': 'Active' 
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         const requiredFields = [
//             'Business Name', 'Owner Name', 'Industry Type', 
//             'Physical Address', 'Phone Number', 'Email Address'
//         ];
        
//         for (const field of requiredFields) {
//             if (!formData[field] || formData[field].trim() === '') {
//                 alert(`Error: '${field}' is a required field.`);
//                 return;
//             }
//         }

//         onRegisterBusiness(formData); 
//         setSuccessMessage(`Business '${formData['Business Name']}' added successfully and is now live!`);
        
//         onBack();
//     };
    
//     const formFields = [
//         {'key': 'Business Name', 'type': 'text', 'required': true},
//         {'key': 'Owner Name', 'type': 'text', 'required': true},
//         {'key': 'Industry Type', 'type': 'select', 'options': industryOptions, 'required': true},
//         {'key': 'Physical Address', 'type': 'text', 'required': true},
//         {'key': 'Phone Number', 'type': 'text', 'required': true},
//         {'key': 'Email Address', 'type': 'email', 'required': true},
//         {'key': 'Viber Number', 'type': 'text'},
//         {'key': 'Website Link', 'type': 'url'},
//         {'key': 'Facebook Link', 'type': 'url'},
//         {'key': 'Tiktok Link', 'type': 'url'},
//         {'key': 'Google Map Link', 'type': 'url'},
//         {'key': 'Logo URL', 'type': 'url'},
//     ];

//     return (
//         <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-6">
//             <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">Manual Business Registration</h2>
//             <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
//                 ← Back to Settings
//             </button>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
//                 {formFields.map(field => (
//                     <div key={field.key} className="p-3 bg-gray-700 rounded-lg">
//                         <label className="text-xs uppercase text-gray-400 font-bold block mb-1">
//                             {field.key} {field.required ? '(*)' : ''}
//                         </label>
                        
//                         {field.type === 'select' ? (
//                             <select 
//                                 name={field.key} 
//                                 value={formData[field.key]} 
//                                 onChange={handleChange} 
//                                 required={field.required}
//                                 className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             >
//                                 <option value="">-- Select Industry --</option>
//                                 {field.options.map(option => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         ) : (
//                             <input 
//                                 type={field.type} 
//                                 name={field.key} 
//                                 value={formData[field.key]} 
//                                 onChange={handleChange} 
//                                 required={field.required}
//                                 placeholder={field.required ? '' : 'Optional'}
//                                 className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3"
//                             />
//                         )}
//                     </div>
//                 ))}

//                 <div className="p-3 bg-gray-600 rounded-lg md:col-span-2">
//                     <label className="text-xs uppercase text-gray-400 font-bold block mb-1">Update Status:</label>
//                     <select
//                         name="Status"
//                         value={formData.Status}
//                         onChange={handleChange}
//                         className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3"
//                     >
//                         <option value="Active">Active (Default for Admin-added)</option>
//                         <option value="Pending Review">Pending Review</option>
//                         <option value="Rejected">Rejected</option>
//                     </select>
//                 </div>
                
//                 <div className="md:col-span-2 pt-4 border-t border-gray-700">
//                     <button type="submit" className="w-full py-3 bg-green-600 text-xl font-extrabold text-white rounded-lg hover:bg-green-700 shadow-md">
//                         Register Business
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// const AddIndustryForm = ({ onAddIndustry, currentIndustries, setSuccessMessage }) => {
//     // Note: The rest of AddIndustryForm implementation from your snippet
//     // ... (omitted for brevity, assume it's copied in full)
//     const [newIndustry, setNewIndustry] = useState('');
//     const handleSave = (e) => {
//         e.preventDefault();
//         const industryName = newIndustry.trim();
//         if (!industryName) return alert("Please enter a valid industry name.");
//         if (currentIndustries.map(i => i.toLowerCase()).includes(industryName.toLowerCase())) {
//             return alert(`Industry "${industryName}" already exists.`);
//         }
//         onAddIndustry(industryName); 
//         setSuccessMessage(`Industry "${industryName}" added successfully!`);
//         setNewIndustry('');
//     };
    
//     return (
//         <div className="p-6 bg-gray-800 rounded-xl shadow-lg mt-6">
//             <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Add Dynamic Industry Type</h3>
//             <form onSubmit={handleSave} className="flex gap-4 mb-8">
//                 <input
//                     type="text"
//                     value={newIndustry}
//                     onChange={(e) => setNewIndustry(e.target.value)}
//                     placeholder="e.g., Finance, Tourism, IT"
//                     className="flex-grow p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <button 
//                     type="submit"
//                     className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 whitespace-nowrap"
//                 >
//                     Add Industry
//                 </button>
//             </form>
//             <h3 className="text-xl font-semibold text-white mb-3">Current Active Industries:</h3>
//             <div className="flex flex-wrap gap-3">
//                 {currentIndustries.length > 0 ? (
//                     currentIndustries.map(i => (
//                         <span key={i} className="px-4 py-1 bg-green-700 text-white rounded-full text-sm font-medium">
//                             {i}
//                         </span>
//                     ))
//                 ) : (
//                     <p className="text-gray-400">No custom industries added yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// const AddBusinessSection = ({ onNavigateToForm }) => ( 
//     <div className="p-6 bg-gray-800 rounded-xl shadow-lg mt-6">
//         <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Register New Business (Admin)</h3>
//         <p className="text-gray-400 mb-4">Click below to manually add a new business *inside* the admin panel.</p>
//         <button 
//             onClick={onNavigateToForm} 
//             className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150"
//         >
//             Go to Business Register Form
//         </button>
//     </div>
// );

// const SettingsView = ({ 
//     currentIndustries, 
//     onAddIndustry, 
//     onRegisterBusiness, 
//     setSuccessMessage, 
//     settingsSubView,
//     setSettingsSubView,
// }) => {
    
//     if (settingsSubView === 'register') {
//         return (
//             <AdminBusinessRegisterForm
//                 onBack={() => setSettingsSubView('main')}
//                 onRegisterBusiness={onRegisterBusiness} 
//                 industryOptions={currentIndustries}
//                 setSuccessMessage={setSuccessMessage}
//             />
//         );
//     }

//     return (
//         <div>
//             <h2 className="text-3xl font-light text-white mb-6">Settings</h2>
            
//             <AddIndustryForm 
//                 currentIndustries={currentIndustries}
//                 onAddIndustry={onAddIndustry}
//                 setSuccessMessage={setSuccessMessage}
//             />
            
//             <AddBusinessSection 
//                 onNavigateToForm={() => setSettingsSubView('register')}
//             />
//         </div>
//     );
// };

// // --- Business Detail View (Edit Existing) ---

// const BusinessDetailView = ({ business, onBack, onUpdateData, setSuccessMessage, industryOptions }) => {
//     // Note: The rest of BusinessDetailView implementation from your snippet
//     // ... (omitted for brevity, assume it's copied in full)
//     const [editData, setEditData] = useState(business);
//     const StatusOptions = ["Pending Review", "Active", "Rejected"];
//     const allBusinessKeys = [
//         'Business Name', 'Owner Name', 'Industry Type', 'Physical Address', 
//         'Phone Number', 'Email Address', 'Viber Number', 'Website Link', 
//         'Facebook Link', 'Tiktok Link', 'Google Map Link', 'Logo URL'
//     ];
//     const editableKeys = allBusinessKeys.filter(key => key !== 'id' && key !== 'Status');
    
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditData(prev => ({ ...prev, [name]: value }));
//     };
    
//     const handleSaveClick = () => {
//         // Only update fields that are explicitly edited or required for status/type
//         const fieldsToUpdate = { 
//              ...editData,
//              'Status': editData.Status, 
//              'Industry Type': editData['Industry Type']
//         };
//         onUpdateData(business.id, fieldsToUpdate); 
//         setSuccessMessage(`Business ${business['Business Name']} saved successfully!`);
//         onBack(); 
//     };

//     return (
//         <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
//             <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">Editing: {business['Business Name'] || 'N/A'}</h2>
//             <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">← Back to Dashboard</button>
//             <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-300">
//                     {editableKeys.map(key => (
//                         <div key={key} className="p-3 bg-gray-700 rounded-lg">
//                             <label className="text-xs uppercase text-gray-400 font-bold block mb-1">{key}:</label>
                            
//                             {key === 'Industry Type' ? (
//                                 <select
//                                     name={key}
//                                     value={editData[key] || ''}
//                                     onChange={handleChange}
//                                     className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                 >
//                                     <option value="">Select Industry</option>
//                                     {industryOptions.map(option => (
//                                         <option key={option} value={option}>{option}</option>
//                                     ))}
//                                 </select>
//                             ) : (
//                                 <input
//                                     type='text' 
//                                     name={key}
//                                     value={editData[key] || ''}
//                                     onChange={handleChange}
//                                     className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                             )}
                            
//                         </div>
//                     ))}
//                     <div className="p-3 bg-gray-600 rounded-lg md:col-span-2">
//                         <label htmlFor="status-select" className="text-xs uppercase text-gray-400 font-bold block mb-1">Update Status:</label>
//                         <select
//                             id="status-select"
//                             name="Status"
//                             value={editData.Status}
//                             onChange={handleChange}
//                             className="w-full bg-gray-500 text-white border border-gray-400 rounded-md py-2 px-3"
//                         >
//                             {StatusOptions.map(s => (<option key={s} value={s}>{s}</option>))}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="pt-6 mt-6 border-t border-gray-700">
//                     <button type="submit" className="mt-3 w-full py-3 bg-green-600 text-xl font-extrabold text-white rounded-lg hover:bg-green-700">Save All Changes</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// // --- Other Subcomponents (Modal/Toast) ---
// const DeleteConfirmModal = ({ businessName, onConfirm, onCancel }) => (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
//         <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-red-700">
//             <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
//             <p className="text-gray-300 mb-6">Are you sure you want to **permanently delete** "{businessName}"?</p>
//             <div className="flex justify-end space-x-4">
//                 <button onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Cancel</button>
//                 <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">Yes, Delete Permanently</button>
//             </div>
//         </div>
//     </div>
// );

// const SuccessToast = ({ message, onClose }) => {
//     React.useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
//     return (
//         <div className="fixed top-5 right-5 z-[100] p-4 bg-green-600 text-white rounded-lg shadow-xl flex items-center space-x-3">
//             <span>✅ {message}</span>
//             <button onClick={onClose} className="text-white hover:text-gray-200 font-bold ml-2">&times;</button>
//         </div>
//     );
// };


// // ---------------------------------------------
// // --- ⭐️ MAIN COMPONENT: AdminDashboard ⭐️ ---
// // ---------------------------------------------
// function AdminDashboard({ 
//     setCurrentView, 
//     views, 
//     adminName, 
// }) {
  
//   // ⭐️ NEW: STATE FOR DATA AND LOADING ⭐️
//   const [businesses, setBusinesses] = useState([]);
//   const [currentIndustries, setCurrentIndustries] = useState(['Unspecified Industry']);
//   const [isLoading, setIsLoading] = useState(true);
//   const [dataError, setDataError] = useState(null);

//   // Existing UI state
//   const [activeNavItem, setActiveNavItem] = useState('Dashboard');
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [businessToDelete, setBusinessToDelete] = useState(null); 
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [settingsSubView, setSettingsSubView] = useState('main'); 
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); 


//   // 1. Fetch Business Data (Primary Listener)
//   useEffect(() => {
//     setIsLoading(true);
//     const q = query(collection(db, 'businesses'), orderBy('Business Name', 'asc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//         const businessList = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         setBusinesses(businessList);
//         // Do NOT set isLoading=false here, wait for both fetches to complete
//         setDataError(null); 
//     }, (err) => {
//         console.error("Firestore Read Error: Business Data:", err); 
//         setDataError("Failed to fetch business data. Check Firebase Rules and Admin Claim.");
//         setIsLoading(false); // Set to false on failure
//     });
//     return () => unsubscribe();
//   }, []); 

//   // 2. Fetch Industry Options (Secondary Listener)
//   useEffect(() => {
//     const settingsRef = doc(db, 'settings', 'global');
    
//     const unsubscribe = onSnapshot(settingsRef, (docSnap) => {
//         let fetchedOptions = ['Unspecified Industry']; // Always include default
        
//         if (docSnap.exists() && docSnap.data()[INDUSTRY_FIELD_NAME]) {
//             // Ensure data is an array and combine with default, then sort
//             fetchedOptions = [...new Set([...fetchedOptions, ...docSnap.data()[INDUSTRY_FIELD_NAME]])].sort();
//         }
        
//         setCurrentIndustries(fetchedOptions);
//         setIsLoading(false); // Set to false on SUCCESS
        
//     }, (error) => {
//         console.error("Firestore Read Error: Industry Options:", error); 
//         // Do not set error here, as the primary business error is more critical.
//         // We ensure a default list exists even if this fails.
//         setIsLoading(false); // Set to false on FAILURE too
//     });

//     return () => unsubscribe();
//   }, []); 


//   // ⭐️ HANDLER FUNCTIONS (Using Firebase) ⭐️

//   const handleUpdateData = useCallback(async (businessId, updatedFields) => {
//       try {
//           const businessRef = doc(db, 'businesses', businessId);
//           await updateDoc(businessRef, updatedFields);
//       } catch (err) { setDataError("Failed to save changes. Please try again."); }
//   }, []);

//   const handleDeleteBusiness = useCallback(async (businessId) => {
//       try {
//           const businessRef = doc(db, 'businesses', businessId); 
//           await deleteDoc(businessRef);
//       } catch (err) { setDataError("Failed to delete business. Please try again."); }
//   }, []);
  
//   const handleRegisterBusiness = useCallback(async (newBusinessData) => {
//       try {
//           const collectionRef = collection(db, 'businesses');
//           await addDoc(collectionRef, {
//               ...newBusinessData,
//               'Created Date': new Date().toISOString(),
//           });
//       } catch (err) { setDataError("Failed to register new business. Please try again."); }
//   }, []);

//   const handleAddIndustry = useCallback(async (newIndustry) => {
//       try {
//           const settingsRef = doc(db, 'settings', 'global');
//           // Use arrayUnion to add the new industry without overwriting existing ones
//           await updateDoc(settingsRef, {
//             [INDUSTRY_FIELD_NAME]: arrayUnion(newIndustry)
//           });
//       } catch (err) { setDataError("Failed to add new industry. Check write permissions."); }
//   }, []);
  
//   // --- UI Handlers ---
//   const handleConfirmDelete = () => {
//       if (!businessToDelete) return;
//       const name = businessToDelete['Business Name'];
//       handleDeleteBusiness(businessToDelete.id); 
//       setSuccessMessage(`${name} has been permanently deleted.`);
//       setBusinessToDelete(null);
//   };
  
//   const handleBackToList = () => { setSelectedBusiness(null); setSettingsSubView('main'); };
//   const handleDeleteClick = (business) => { setBusinessToDelete(business); };
//   const handleCancelDelete = () => { setBusinessToDelete(null); };
//   const handleCloseToast = () => { setSuccessMessage(null); };

//   const handleLogout = async () => {
//     try {
//         await signOut(auth); 
//         setCurrentView(views.HOME); 
//     } catch (error) { console.error("Logout Error:", error); }
//   };

//   const getCellValue = (business, colName) => {
//       if (colName === 'Phone Number') return business['Phone Number'] || business['Phone No'] || 'N/A';
//       return business[colName] || 'N/A';
//   };
  
//   const handleNavItemClick = (itemName) => {
//     setActiveNavItem(itemName);
//     setSelectedBusiness(null);
//     if (itemName !== 'Settings') {
//         setSettingsSubView('main');
//     }
//     setIsSidebarOpen(false); 
//   };


//   const renderDashboardView = () => {
//     const totalBusinesses = businesses.length;
//     const activeCount = businesses.filter(b => b.Status === 'Active').length;
//     const pendingCount = businesses.filter(b => b.Status === 'Pending Review').length;
    
//     return (
//         <div>
//             <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">Kanban Board Overview</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//                 <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-blue-500">
//                     <p className="text-sm uppercase text-gray-400 font-bold">Total Businesses</p>
//                     <p className="text-4xl font-extrabold text-white mt-1">{totalBusinesses}</p>
//                 </div>
//                 <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-green-500">
//                     <p className="text-sm uppercase text-gray-400 font-bold">Active Businesses</p>
//                     <p className="text-4xl font-extrabold text-white mt-1">{activeCount}</p>
//                 </div>
//                 <div className="bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 border-yellow-500">
//                     <p className="text-sm uppercase text-gray-400 font-bold">Pending Review</p>
//                     <p className="text-4xl font-extrabold text-white mt-1">{pendingCount}</p>
//                 </div>
//             </div>
            
//             <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4 border-b border-gray-700 pb-2">Business Kanban by Industry Type</h3>
//             <KanbanBoard businessData={businesses} onCardClick={setSelectedBusiness} />
//         </div>
//     );
//   };

//   const renderContent = () => {
    
//     if (isLoading) { return (<div className="bg-gray-800 p-8 rounded-xl shadow-lg h-96 flex items-center justify-center"><p className="text-2xl text-white font-light">Loading data from Firestore... 🔄</p></div>); }
//     if (dataError) { return (<div className="bg-red-800 p-8 rounded-xl shadow-lg h-96 flex items-center justify-center"><p className="text-2xl text-white font-light">❌ Data Error: {dataError}</p></div>); }

//     if (selectedBusiness) {
//         return (
//             <BusinessDetailView 
//                 business={selectedBusiness} 
//                 onBack={handleBackToList}
//                 onUpdateData={handleUpdateData} 
//                 setSuccessMessage={setSuccessMessage}
//                 industryOptions={currentIndustries} 
//             />
//         );
//     }
    
//     if (activeNavItem === 'Dashboard') {
//         return renderDashboardView(); 
//     }
    
//     if (activeNavItem === 'Settings') {
//         return (
//             <SettingsView 
//                 currentIndustries={currentIndustries}
//                 onAddIndustry={handleAddIndustry}
//                 onRegisterBusiness={handleRegisterBusiness} 
//                 setSuccessMessage={setSuccessMessage}
//                 settingsSubView={settingsSubView}
//                 setSettingsSubView={setSettingsSubView}
//             />
//         );
//     }
    
//     if (activeNavItem === 'Businesses') {
//         const dataToDisplay = businesses.filter(b => b.Status === 'Pending Review'); 
//         const displayColumns = [
//             'Business Name', 
//             'Owner Name',
//             'Industry Type', 
//             'Status' 
//         ];

//         return (
//             <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
//                 <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-4">
//                     Businesses Pending Review ({dataToDisplay.length})
//                 </h2>
//                 <table className="min-w-full divide-y divide-gray-700 table-fixed">
//                     <thead className="bg-gray-700">
//                     <tr>
//                         {displayColumns.map((col) => (
//                         <th key={col} className="w-[20%] px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
//                             {col}
//                         </th>
//                         ))}
//                         <th className="w-[20%] px-3 py-2 sm:px-6 sm:py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
//                         Action
//                         </th>
//                     </tr>
//                     </thead>
//                     <tbody className="bg-gray-800 divide-y divide-gray-700">
//                     {dataToDisplay.map((business) => (
//                         <tr key={business.id} className="hover:bg-gray-700 transition duration-150">
//                         {displayColumns.map((col) => (
//                             <td key={col} className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300 overflow-hidden text-ellipsis">
//                             {col === 'Status' ? (
//                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                 business[col] === 'Active' ? 'bg-green-700 text-green-100' : 'bg-yellow-700 text-yellow-100'
//                                 }`}>
//                                 {business[col]}
//                                 </span>
//                             ) : (
//                                 getCellValue(business, col)
//                             )}
//                             </td>
//                         ))}
//                         <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
//                             <div className="flex flex-col sm:flex-row justify-end space-y-1 sm:space-y-0 sm:space-x-2">
//                                 <button 
//                                     onClick={() => setSelectedBusiness(business)}
//                                     className="text-blue-400 hover:text-blue-200 transition duration-150"
//                                 >
//                                     View/Edit
//                                 </button>
//                                 <button 
//                                     onClick={() => handleDeleteClick(business)}
//                                     className="text-red-500 hover:text-red-400 transition duration-150"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
    
//     return renderDashboardView();
//   }; 

//   return (
//     <div className="min-h-screen flex bg-gray-900 text-gray-100">
      
//       {/* 1. LEFT SIDEBAR (Navigation) */}
//       <nav className={`
//           w-64 bg-gray-800 shadow-2xl flex-shrink-0 flex flex-col justify-between h-screen z-40 
//           fixed top-0 left-0 transition-transform duration-300 ease-in-out
//           md:translate-x-0 md:static
//           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         <div>
//             <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//                 <h2 className="text-xl font-bold text-white tracking-wider">TBT Admin</h2>
//                 <button 
//                     onClick={() => setIsSidebarOpen(false)} 
//                     className="md:hidden text-white hover:text-gray-300 text-2xl"
//                 >
//                     &times;
//                 </button>
//             </div>
//             <ul className="py-4 space-y-2">
//                 {dashboardNavItems.map((item) => (
//                     <li key={item.name}>
//                         <a 
//                             href="#" 
//                             onClick={(e) => {e.preventDefault(); handleNavItemClick(item.name);}} 
//                             className={`flex items-center space-x-3 px-4 py-2 font-medium transition duration-150 ${
//                                 activeNavItem === item.name 
//                                 ? 'bg-blue-600 text-white' 
//                                 : 'text-gray-300 hover:bg-gray-700'
//                             }`}
//                         >
//                             <span className="text-lg">{item.icon}</span>
//                             <span>{item.name}</span>
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//         <div className="p-4 border-t border-gray-700">
//             <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
//                 <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?img=68" alt="Admin Profile" />
//                 <span className="text-sm font-medium">{adminName}</span>
//             </div>
//         </div>
//       </nav>
      
//       {/* Overlay for Mobile when sidebar is open */}
//       {isSidebarOpen && (
//           <div 
//               className="fixed inset-0 bg-gray-900 opacity-50 z-30 md:hidden"
//               onClick={() => setIsSidebarOpen(false)}
//           ></div>
//       )}

//       {/* 2. MAIN CONTENT AREA */}
//       <div className="flex-1 p-4 sm:p-8 overflow-x-hidden w-full"> 
        
//         {/* Top Header/Action Bar */}
//         <header className="flex justify-between items-center pb-4 sm:pb-6 border-b border-gray-700 mb-6 sm:mb-8 sticky top-0 bg-gray-900 z-10">
            
//             <div className="flex items-center space-x-3">
//                 <button 
//                     onClick={() => setIsSidebarOpen(true)}
//                     className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800"
//                 >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
//                 </button>
                
//                 <h1 className="text-xl sm:text-3xl font-light text-white truncate max-w-[200px] sm:max-w-none">
//                     {selectedBusiness ? `Editing: ${selectedBusiness['Business Name']}` : activeNavItem}
//                 </h1>
//             </div>

//             <button
//                 onClick={handleLogout}
//                 className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base"
//               >
//                   Logout
//             </button>
//         </header>

//         {renderContent()}

//       </div>
      
//       {businessToDelete && (
//           <DeleteConfirmModal
//               businessName={businessToDelete['Business Name']}
//               onConfirm={handleConfirmDelete}
//               onCancel={handleCancelDelete}
//           />
//       )}

//       {successMessage && (
//           <SuccessToast 
//               message={successMessage} 
//               onClose={handleCloseToast} 
//           />
//       )}
//     </div>
//   );
// }
// export default AdminDashboard;
import React, { useState, useEffect, useCallback } from 'react';
import { auth, db } from '../../firebase';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy, 
    doc, 
    deleteDoc, 
    updateDoc, 
    setDoc,
    getDoc, 
    arrayUnion, 
    arrayRemove, 
    addDoc
} from 'firebase/firestore'; 
import { signOut } from 'firebase/auth'; 

// IMPORT NEW COMPONENTS (Ensure these files exist in your project)
import AddBusinessForm from './AddBusinessForm'; 
import SettingsView from './SettingsView'; 
// ---------------------------------------------


// --- Configuration Data ---
const dashboardNavItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Businesses", icon: "🏢" },
    { name: "Settings", icon: "⚙️" },
];
// ---------------------------------------------

// ---------------------------------------------
// --- REUSABLE SUBCOMPONENTS ---
// ---------------------------------------------

const SuccessToast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-xl z-50 transition-opacity duration-300">
            {message}
        </div>
    );
};

const ConfirmModal = ({ itemName, itemType, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-sm w-full border border-gray-700">
                <h3 className="text-xl font-bold text-red-400 mb-3">Confirm Deletion</h3>
                <p className="text-gray-300 mb-6">
                    Are you sure you want to permanently delete the **{itemType}**: **{itemName}**? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button onClick={onCancel} className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">Delete</button>
                </div>
            </div>
        </div>
    );
};

const BusinessView = ({ business, onBack }) => {
    const displayKeys = [
        'Business Name', 'Owner Name', 'Industry Type', 'Status', 'Logo URL', 
        'Physical Address', 'Email Address', 'Phone Number', 'Viber Number', 
        'Website Link', 'Facebook Link', 'Tiktok Link', 'Google Map Link', 
        'Created Date'
    ];

    const getDisplayValue = (key, value) => {
        if (!value) {
            return 'N/A';
        }

        if (key === 'Logo URL' && value.startsWith('data:image/')) {
            const dataLength = value.length;
            const type = value.substring(0, value.indexOf(';'));
            return `${type} (Size: ${dataLength} chars) — [Data Compressed]`;
        }

        if (key === 'Created Date') {
            return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
        
        return value;
    };

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Business Details (View Only)</h3>
            
            {business['Logo URL'] && !business['Logo URL'].startsWith('data:image/') && (
                <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Logo Preview</label>
                    <img src={business['Logo URL']} alt="Logo Preview" className="w-24 h-24 object-contain rounded-lg border border-gray-600 p-1" />
                </div>
            )}
            
            <div className="space-y-4">
                {displayKeys.map(key => (
                    <div key={key} className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                        <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">{key}</label>
                        <p className="text-gray-200 font-semibold">{getDisplayValue(key, business[key])}</p>
                    </div>
                ))}
            </div>
            
            <div className="pt-6 border-t border-gray-700 mt-6">
                <button type="button" onClick={onBack} className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition">← Back to Dashboard</button>
            </div>
        </div>
    );
};

const BusinessDetailView = ({ business, onBack, onUpdateData, setSuccessMessage, onDeleteClick, industryOptions }) => {
    const [editData, setEditData] = useState(business);
    const StatusOptions = ["Pending Review", "Active", "Rejected"];
    
    const allPossibleKeys = [
        'Business Name', 'Owner Name', 'Logo URL', 'Physical Address', 
        'Email Address', 'Phone Number', 'Viber Number', 'Website Link', 
        'Facebook Link', 'Tiktok Link', 'Google Map Link', 
    ];

    useEffect(() => {
        const defaultState = allPossibleKeys.reduce((acc, key) => {
            acc[key] = business[key] || ''; 
            return acc;
        }, { ...business });
        
        setEditData(defaultState);
    }, [business]);

    const editableKeys = allPossibleKeys;
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = async () => {
      const cleanedData = Object.keys(editData).reduce((acc, key) => {
          const value = editData[key];
          // Only save if value is not empty or if it's a critical field
          if (value !== '' || ['Status', 'Industry Type', 'Business Name'].includes(key)) {
              acc[key] = value;
          }
          return acc;
      }, {});
        
      await onUpdateData(business.id, cleanedData); 
      setSuccessMessage(`Business ${business['Business Name']} saved successfully!`);
      onBack(); 
    };

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Edit Business Details</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }} className="space-y-6">
                
                {/* 1. STATUS Dropdown */}
                <div>
                    <label htmlFor="Status" className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                    <select id="Status" name="Status" value={editData.Status} onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500">
                        {StatusOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                    </select>
                </div>
                
                {/* 2. INDUSTRY TYPE Dropdown */}
                <div>
                    <label htmlFor="Industry Type" className="block text-sm font-medium text-gray-400 mb-1">Industry Type</label>
                    <select 
                        id="Industry Type" 
                        name="Industry Type" 
                        value={editData['Industry Type'] || industryOptions[0]} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
                    >
                        {industryOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                    </select>
                </div>

                {/* 3. CORE FIELD: BUSINESS NAME (required, text) */}
                <div>
                    <label htmlFor="Business Name" className="block text-sm font-medium text-gray-400 mb-1">Business Name <span className="text-red-400">*</span></label>
                    <input type="text" id="Business Name" name="Business Name" required value={editData['Business Name'] || ''} onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                
                {/* 4. OTHER FIELDS (dynamic text inputs) */}
                {editableKeys.filter(key => key !== 'Business Name').map(key => (
                    <div key={key}>
                        <label htmlFor={key} className="block text-sm font-medium text-gray-400 mb-1">{key}</label>
                        <input type="text" id={key} name={key} value={editData[key] || ''} onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                ))}
                
                {/* 5. READ-ONLY FIELD: CREATED DATE */}
                {business['Created Date'] && (
                    <div className="pt-4">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Created Date</label>
                        <p className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 text-sm">
                            {new Date(business['Created Date']).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-700">
                    <button type="button" onClick={onBack} className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition">← Back to List</button>
                    
                    <div className="flex space-x-3">
                        <button 
                            type="button" 
                            onClick={onDeleteClick} 
                            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition shadow-md"
                        >
                            Delete Business
                        </button>
                        <button 
                            type="submit" 
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

const KanbanBoard = ({ businessData, onSelectBusiness, groupByField, title }) => {
    
    const groups = businessData.reduce((acc, business) => {
        let key = business[groupByField] || `Unspecified ${groupByField}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(business);
        return acc;
    }, {});

    const uniqueGroups = Object.keys(groups).sort();

    const getColor = (groupKey) => {
        let hash = 0;
        for (let i = 0; i < groupKey.length; i++) { hash = groupKey.charCodeAt(i) + ((hash << 5) - hash); }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    };


    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">{title}</h2>
            
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {uniqueGroups.map(groupKey => (
                    <div key={groupKey} className="flex-shrink-0 w-80 bg-gray-800 p-4 rounded-xl shadow-xl border-t-4"
                        style={{ borderTopColor: getColor(groupKey) }}>
                        <h3 className="text-lg font-bold text-white mb-4 flex justify-between items-center">
                            {groupKey}
                            <span className="text-sm bg-gray-700 px-2 py-0.5 rounded-full">{groups[groupKey].length}</span>
                        </h3>
                        
                        <div className="space-y-3">
                            {groups[groupKey].map(business => (
                                <div 
                                    key={business.id} 
                                    onClick={() => onSelectBusiness && onSelectBusiness(business)} 
                                    className={`bg-gray-700 p-4 rounded-lg shadow-md transition duration-150 border border-gray-600 ${onSelectBusiness ? 'cursor-pointer hover:bg-gray-600' : ''}`}
                                >
                                    <div className="flex items-start space-x-3">
                                        {business['Logo URL'] && (
                                            <img 
                                                src={business['Logo URL']} 
                                                alt={`${business['Business Name']} Logo`} 
                                                className="w-10 h-10 object-cover rounded-full flex-shrink-0"
                                                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} 
                                            />
                                        )}
                                        
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-100 truncate">{business['Business Name']}</p>
                                            
                                            {business['Owner Name'] && (
                                                <p className="text-xs text-gray-400 mt-0.5 truncate">
                                                    Owner: {business['Owner Name']}
                                                </p>
                                            )}
                                            
                                            <p className="text-sm text-blue-400 mt-1">Status: {business.Status}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ---------------------------------------------
// --- ⭐️ MAIN COMPONENT: AdminDashboard ⭐️ ---
// ---------------------------------------------
function AdminDashboard({ 
    setCurrentView, 
    views, 
    adminName, 
}) {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
  // ⭐️ STATE ⭐️
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false); 

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessToDelete, setBusinessToDelete] = useState(null); 
  const [industryToDelete, setIndustryToDelete] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState('Dashboard');
  const [isViewingOnly, setIsViewingOnly] = useState(false);


  // 1. Fetch Business Data 
  useEffect(() => {
    const q = query(collection(db, 'businesses'), orderBy('Status', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const businessList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setBusinesses(businessList);
        setIsLoading(false);
        setDataError(null);
    }, (err) => {
        console.error("Firestore Read Error:", err);
        // This is the error message the user was seeing. It is now properly caught.
        setDataError("Failed to fetch business data. Check Firebase Rules and Admin Claim.");
        setIsLoading(false);
    });
    return () => unsubscribe();
  }, []); 

  // 2. Fetch Industry Options ⭐️ FIX: Path and Uncommented Function Call ⭐️
  useEffect(() => {
    // Correct path: 'settings' collection, 'global' document
    const docRef = doc(db, 'settings', 'global'); 
    
    const fetchIndustryOptions = async () => {
        try {
            const docSnap = await getDoc(docRef);
            let options = [];
            // Correct field name: 'industryOptions'
            if (docSnap.exists() && docSnap.data().industryOptions) {
                options = docSnap.data().industryOptions;
            }
            // if (!options.includes('Unspecified Industry')) {
            //     options.push('Unspecified Industry');
            // }
            setIndustryOptions(options.sort());
        } catch (error) {
            console.error("Error fetching industry options:", error);
            setIndustryOptions(['Unspecified Industry']);
        }
    };
    fetchIndustryOptions(); // ⭐️ CRITICAL FIX: FUNCTION CALL UNCOMMENTED ⭐️
  }, []); 


  // ⭐️ HANDLERS ⭐️

  const handleUpdateData = useCallback(async (businessId, updatedFields) => {
      setIsLoading(true);
      try {
          const businessRef = doc(db, 'businesses', businessId);
          await updateDoc(businessRef, updatedFields);
      } catch (err) { setDataError("Failed to save changes. Please try again.");
      } finally { setIsLoading(false); }
  }, []);

  // 1. Business Deletion Handlers
  const handleConfirmDeleteBusiness = async () => {
      if (!businessToDelete) return;
      setIsLoading(true);
      const name = businessToDelete['Business Name'];
      try {
          const businessRef = doc(db, 'businesses', businessToDelete.id); 
          await deleteDoc(businessRef);
          setSuccessMessage(`${name} has been permanently deleted.`);
          setBusinessToDelete(null); // Close the modal
      } catch (err) { setDataError("Failed to delete business. Please try again.");
      } finally { setIsLoading(false); }
  };
  const handleCancelDeleteBusiness = () => { setBusinessToDelete(null); };
  
  // 2. Industry Deletion Handlers 
  const handleConfirmDeleteIndustry = async () => {
      if (!industryToDelete) return;
      setIsLoading(true);
      const name = industryToDelete;
      try {
          await handleDeleteIndustry(name); 
          setSuccessMessage(`Industry '${name}' has been permanently deleted.`);
      } catch (err) { 
          setDataError(`Failed to delete industry: ${err.message}`);
      } finally { 
          setIndustryToDelete(null); 
          setIsLoading(false); 
      }
  };
  const handleCancelDeleteIndustry = () => { setIndustryToDelete(null); }; 


  const handleAddBusiness = async (newBusinessData) => {
      setIsLoading(true);
      try {
          const collectionRef = collection(db, 'businesses');
          await addDoc(collectionRef, {
              ...newBusinessData,
              Status: "Pending Review", 
              'Created Date': new Date().toISOString(),
          });
          setSuccessMessage(`Business '${newBusinessData['Business Name']}' registered successfully!`);
      } catch (err) { setDataError("Failed to register new business. Please try again.");
      } finally { setIsLoading(false); }
  };

 // Inside AdminDashboard.jsx
const handleAddIndustry = async (newIndustryName) => {
    // ⭐️ PREVENTION FIX: Trim and check if the name is empty ⭐️
    const trimmedName = newIndustryName ? newIndustryName.trim() : '';
    
    if (!trimmedName) {
        // You would typically show an error message here instead of throwing silently
        console.error("Cannot add an empty industry name.");
        return; 
    }
    
    try {
        const docRef = doc(db, 'settings', 'global');
        await setDoc(docRef, { industryOptions: arrayUnion(trimmedName) }, { merge: true });
        
        setIndustryOptions(prev => [...prev.filter(opt => opt !== trimmedName), trimmedName].sort());
    } catch (err) { throw err; }
};
  // ⭐️ CORRECTED: Uses 'settings/global' and field 'industryOptions' ⭐️
  const handleDeleteIndustry = async (industryName) => {
      try {
          const docRef = doc(db, 'settings', 'global');
          await setDoc(docRef, { industryOptions: arrayRemove(industryName) }, { merge: true });
          setIndustryOptions(prev => prev.filter(opt => opt !== industryName));
      } catch (err) { throw err; }
  };
  
  const handleLogout = async () => {
    try {
        await signOut(auth); 
        setCurrentView(views.HOME); 
    } catch (error) { console.error("Logout Error:", error); }
  };

  // --- UI Handlers ---
  // When clicking a business on the 'Businesses' tab (for Edit/Delete)
  const handleViewEditClick = (business) => { setSelectedBusiness(business); setIsViewingOnly(false);};
  
  const handleBackToList = () => { setSelectedBusiness(null); setIsAddingNew(false); setIsViewingOnly(false); };
  
  // When clicking a business on the 'Dashboard' tab (for View Only)
  const handleViewOnlyClick = (business) => {
    setSelectedBusiness(business);
    setIsViewingOnly(true); 
  };
  
  const handleDeleteClick = (business) => { setBusinessToDelete(business); }; 
  
  const handleCloseToast = useCallback(() => { setSuccessMessage(null); }, []);
  
  const handleNavClick = (name) => { 
      setActiveNavItem(name); 
      setSelectedBusiness(null); 
      setIsAddingNew(false); 
      setIsViewingOnly(false); 
      setIsMobileMenuOpen(false); 
  };
  
  const getHeaderTitle = () => {
      if (isAddingNew) return "Register New Business";
      if (selectedBusiness) {
        return isViewingOnly 
            ? `Viewing: ${selectedBusiness['Business Name']}` 
            : `Editing: ${selectedBusiness['Business Name']}`;
    }
    return activeNavItem;
  };

  // ⭐️ RENDER CONTENT ⭐️
  const renderContent = () => {
    
    if (isLoading) { return (<div className="bg-gray-800 p-8 rounded-xl shadow-lg h-96 flex items-center justify-center"><p className="text-2xl text-white font-light">Loading data from Firestore... 🔄</p></div>); }
    if (dataError) { return (<div className="bg-red-800 p-8 rounded-xl shadow-lg h-96 flex items-center justify-center"><p className="text-2xl text-white font-light">❌ Data Error: {dataError}</p></div>); }
      
    // 1. Add Business Form View
    if (isAddingNew) {
        return (
            <AddBusinessForm onAddBusiness={handleAddBusiness} onCancel={handleBackToList} industryOptions={industryOptions} />
        );
    }
      
    // 2. Business Details View (Edit or View Only)
    if (selectedBusiness) {
        if (isViewingOnly) {
            return (
                <BusinessView 
                    business={selectedBusiness} 
                    onBack={handleBackToList}
                />
            );
        }
        return (
            <BusinessDetailView 
                business={selectedBusiness} 
                onBack={handleBackToList}
                onUpdateData={handleUpdateData}
                setSuccessMessage={setSuccessMessage}
                onDeleteClick={() => handleDeleteClick(selectedBusiness)} 
                industryOptions={industryOptions}
            />
        );
    }
  
    // 3. Dashboard View (Kanban by Industry Type)
    if (activeNavItem === 'Dashboard') {
        return (
            <KanbanBoard 
                businessData={businesses} 
                onSelectBusiness={handleViewOnlyClick} 
                groupByField={'Industry Type'} 
                title={'Dashboard: Grouped by Industry Type'}
            />
        );  
    }
    
    // 4. Businesses View (Kanban by Status)
    if (activeNavItem === 'Businesses') {
        return (
            <KanbanBoard 
                businessData={businesses} 
                onSelectBusiness={handleViewEditClick} 
                groupByField={'Status'} 
                title={'Businesses: Grouped by Business Status'}
            />
        );
    }
    
    // 5. Settings View
    if (activeNavItem === 'Settings') {
        return (
             <SettingsView 
                 industryOptions={industryOptions} 
                 onAddIndustry={handleAddIndustry}   
                 onDeleteIndustry={(name) => setIndustryToDelete(name)} 
                 setSuccessMessage={setSuccessMessage} 
             />
        );
    }
    
    return null;
  };

  

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100 relative">
      
      {/* ⭐️ Mobile Menu and Sidebar (Code Omitted for brevity, but retained layout) ⭐️ */}
      {isMobileMenuOpen && (
          <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
              onClick={() => setIsMobileMenuOpen(false)}
          ></div>
      )}

      {/* 1. LEFT SIDEBAR */}
      <nav className={`fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700 p-4 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:relative md:translate-x-0 md:block`}>
        <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-blue-400 mb-8">TBT Admin</h2>
            <ul className="flex-grow space-y-2">
                {dashboardNavItems.map(item => (
                    <li key={item.name}>
                        <button onClick={() => handleNavClick(item.name)} className={`w-full text-left flex items-center p-3 rounded-lg transition duration-150 ${activeNavItem === item.name ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700'}`}>
                            <span className="mr-3">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="p-4 border-t border-gray-700 mt-4 flex items-center space-x-3">
                <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?img=68" alt="Admin Profile" />
                <span className="text-sm font-medium">{adminName}</span>
            </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 p-4 sm:p-8 overflow-x-hidden"> 
        
        {/* Top Header/Action Bar */}
        <header className="flex justify-between items-center pb-6 border-b border-gray-700 mb-8">
            <div className="flex items-center space-x-3">
                <button 
                    onClick={() => setIsMobileMenuOpen(true)} 
                    className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
                <h1 className="text-xl sm:text-3xl font-light text-white">{getHeaderTitle()}</h1>
            </div>
            <div className="flex items-center space-x-4">
                {activeNavItem === 'Businesses' && !selectedBusiness && !isAddingNew && (
                    <button onClick={() => setIsAddingNew(true)} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base">
                        + Add New
                    </button>
                )}
                
                <button onClick={handleLogout} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base">
                    Logout
                </button>
            </div>
        </header>

        {renderContent()}
        
        {/* ⭐️ 1. Delete Modal for BUSINESSES ⭐️ */}
        {businessToDelete && (
            <ConfirmModal 
                itemName={businessToDelete['Business Name']} 
                itemType="Business"
                onConfirm={handleConfirmDeleteBusiness} 
                onCancel={handleCancelDeleteBusiness}
            />
        )}

        {/* ⭐️ 2. Delete Modal for INDUSTRIES ⭐️ */}
        {industryToDelete && (
            <ConfirmModal 
                itemName={industryToDelete} 
                itemType="Industry Type"
                onConfirm={handleConfirmDeleteIndustry} 
                onCancel={handleCancelDeleteIndustry}
            />
        )}

        {/* Success Toast */}
        {successMessage && (<SuccessToast message={successMessage} onClose={handleCloseToast} />)}
      </div>
    </div>
  );
}
export default AdminDashboard;