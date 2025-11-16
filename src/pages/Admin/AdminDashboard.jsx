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
    { name: "Businesses", icon: "📊" },
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
            return ' ';
        }

        if (key === 'Logo URL' && (value.startsWith('http://') || value.startsWith('https://'))) {
            const maxLength = 50; 
            if (value.length > maxLength) {
                const start = value.substring(0, 25);
                const end = value.substring(value.length - 20);
                return `${start}...${end}`;
            }
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
                <button type="button" onClick={onBack} className="px-4 py-2 sm:px-2 sm:py-1 text-blue-300 border border-white-600 rounded-lg hover:bg-gray-700 transition cursor-pointer">← Back to Dashboard</button>
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
                <div className="flex justify-between pt-4 border-t border-gray-700 items-start">
                    <button type="button" onClick={onBack} className="px-3 py-1.5 text-sm text-blue-300 border border-white-600 rounded-lg hover:bg-gray-700 transition cursor-pointer">← Back to List</button>
                    
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 space-x-3">
                        <button 
                            type="button" 
                            onClick={onDeleteClick} 
                            className="w-full sm:w-auto px-3 py-1.5 text-sm bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition shadow-md sm:px-6 sm:py-2 sm:text-base cursor-pointer"                        >
                            Delete Business
                        </button>
                        <button 
                            type="submit" 
                            className="w-full sm:w-auto px-3 py-1.5 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md sm:px-6 sm:py-2 sm:text-base cursor-pointer"                        >
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
            <h2 className="text-2xl font-bold text-blue-400 mb-8 text-center">TBT Admin</h2>
            <ul className="flex-grow space-y-2">
                {dashboardNavItems.map(item => (
                    <li key={item.name}>
                        <button onClick={() => handleNavClick(item.name)} className={`w-full text-left flex items-center p-3 rounded-lg transition duration-150 cursor-pointer ${activeNavItem === item.name ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700'}`}>
                            <span className="mr-3">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="p-4 border-t border-gray-700 mt-4 flex items-center space-x-3">
                <img className="w-8 h-8 rounded-full" src="" alt="Admin Profile" />
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
                    className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
                <h1 className="text-xl sm:text-3xl font-light text-white">{getHeaderTitle()}</h1>
            </div>
            <div className="flex items-center space-x-4">
                {activeNavItem === 'Businesses' && !selectedBusiness && !isAddingNew && (
                    <button onClick={() => setIsAddingNew(true)} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base cursor-pointer">
                        + Add New
                    </button>
                )}
                
                <button onClick={handleLogout} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base cursor-pointer">
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