// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import QRCode from 'react-qr-code'; 
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

// // IMPORT NEW COMPONENTS (Ensure these files exist in your project)
// import AddBusinessForm from './AddBusinessForm'; 
// import SettingsView from './SettingsView'; 
// // ---------------------------------------------


// // --- Configuration Data ---
// const dashboardNavItems = [
//     { name: "Dashboard", icon: "🏠" },
//     { name: "Businesses", icon: "📊" },
//     { name: "Business Owner", icon: "👤" },     // COMBINED VIEW
//     { name: "Settings", icon: "⚙️" },
// ];
// // ---------------------------------------------

// // ---------------------------------------------
// // --- REUSABLE SUBCOMPONENTS ---
// // ---------------------------------------------

// const SuccessToast = ({ message, onClose }) => {
//     useEffect(() => {
//         const timer = setTimeout(onClose, 4000);
//         return () => clearTimeout(timer);
//     }, [message, onClose]);

//     return (
//         <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-xl z-50 transition-opacity duration-300">
//             {message}
//         </div>
//     );
// };

// const ConfirmModal = ({ itemName, itemType, onConfirm, onCancel }) => {
//     return (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
//             <div className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-sm w-full border border-gray-700">
//                 <h3 className="text-xl font-bold text-red-400 mb-3">Confirm Deletion</h3>
//                 <p className="text-gray-300 mb-6">
//                     Are you sure you want to permanently delete the **{itemType}**: **{itemName}**? This action cannot be undone.
//                 </p>
//                 <div className="flex justify-end space-x-3">
//                     <button onClick={onCancel} className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition">Cancel</button>
//                     <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">Delete</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- REUSABLE SUBCOMPONENT: QRCodeDisplay ---
// const QRCodeDisplay = ({ phoneNum, pin, ownerName, onClose }) => {
    
//     // The data to be encoded (Phone Number-Pin)
//     const rawData = `${phoneNum}-${pin}`;
    
//     // The final URL to be encoded in the QR code (This is still needed for scanning functionality)
//     // IMPORTANT: Replace 'https://yourdomain.com' with your actual live domain.
//     // Use 'http://localhost:5173' for local testing.
//     const baseUrl = "https://yourdomain.com/scan?data="; 
//     const dataString = `${baseUrl}${rawData}`; 

//     return (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
//             <div 
//                 className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-sm w-full text-center border border-gray-700" 
//                 onClick={e => e.stopPropagation()} // Prevents closing when clicking inside the modal
//             >
//                 <h3 className="text-xl font-bold text-white mb-2">Member QR Code</h3>
                
//                 {/* 1. Owner Name */}
//                 <p className="text-xl font-semibold text-blue-300 mb-4">{ownerName}</p>
                
//                 {/* 2. QR Code Photo */}
//                 <div className="bg-white p-4 rounded-lg flex items-center justify-center h-64 w-64 mx-auto">
//                      <QRCode 
//                         value={dataString} 
//                         size={256} 
//                         style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//                      /> 
//                 </div>
                
//                 {/* 3. Display Phone Number and PIN (Clean Display) */}
//                 <div className="mt-4 space-y-2 p-3 bg-gray-700 rounded-lg">
//                     <div className="flex justify-between items-center">
//                         <p className="text-sm font-medium text-gray-400">Phone Number:</p>
//                         <p className="text-lg font-bold text-white">{phoneNum}</p>
//                     </div>
                    
//                     <div className="flex justify-between items-center pt-2 border-t border-gray-600">
//                         <p className="text-sm font-medium text-gray-400">PIN:</p>
//                         <p className="text-lg font-bold text-green-400">{pin}</p>
//                     </div>
//                 </div>
                
//                 <button onClick={onClose} className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Close</button>
//             </div>
//         </div>
//     );
// };
// const BusinessView = ({ business, onBack }) => {
//     const displayKeys = [
//         'Business Name', 'Owner Name', 'Industry Type', 'Status', 'Logo URL', 
//         'Physical Address', 'Email Address', 'Phone Number', 'Viber Number', 
//         'Website Link', 'Facebook Link', 'Tiktok Link', 'Google Map Link', 
//         'Created Date'
//     ];

//     const getDisplayValue = (key, value) => {
//         if (!value) { return ' '; }
//         if (key === 'Logo URL' && (value.startsWith('http://') || value.startsWith('https://'))) {
//             const maxLength = 50; 
//             if (value.length > maxLength) {
//                 const start = value.substring(0, 25);
//                 const end = value.substring(value.length - 20);
//                 return `${start}...${end}`;
//             }
//         }
//         if (key === 'Created Date') {
//             return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
//         }
//         return value;
//     };

//     return (
//         <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
//             <h3 className="text-2xl font-bold text-white mb-6">Business Details (View Only)</h3>
            
//             {business['Logo URL'] && business['Logo URL'].trim().length > 0 && !business['Logo URL'].startsWith('data:image/') && (
//                 <div className="mb-6">
//                     <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Logo Preview</label>
//                     <img src={business['Logo URL']} alt="Logo Preview" className="w-24 h-24 object-contain rounded-lg border border-gray-600 p-1" />
//                 </div>
//             )}
            
//             <div className="space-y-4">
//                 {displayKeys.map(key => (
//                     <div key={key} className="p-3 bg-gray-700 rounded-lg border border-gray-600">
//                         <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">{key}</label>
//                         <p className="text-gray-200 font-semibold">{getDisplayValue(key, business[key])}</p>
//                     </div>
//                 ))}
//             </div>
            
//             <div className="pt-6 border-t border-gray-700 mt-6">
//                 <button type="button" onClick={onBack} className="px-4 py-2 sm:px-2 sm:py-1 text-blue-300 border border-white-600 rounded-lg hover:bg-gray-700 transition cursor-pointer">← Back to Dashboard</button>
//             </div>
//         </div>
//     );
// };


// const BusinessDetailView = ({ business, onBack, onUpdateData, setSuccessMessage, onDeleteClick, industryOptions }) => {
//     const [editData, setEditData] = useState(business);
//     const StatusOptions = ["Pending Review", "Active", "Rejected"];
    
//     const allPossibleKeys = [
//         'Business Name', 'Owner Name', 'Logo URL', 'Physical Address', 
//         'Email Address', 'Phone Number', 'Viber Number', 'Website Link', 
//         'Facebook Link', 'Tiktok Link', 'Google Map Link', 
//     ];

//     useEffect(() => {
//         const defaultState = allPossibleKeys.reduce((acc, key) => {
//             acc[key] = business[key] || ''; 
//             return acc;
//         }, { ...business });
        
//         setEditData(defaultState);
//     }, [business]);

//     const editableKeys = allPossibleKeys;
    
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setEditData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSaveClick = async () => {
//       const cleanedData = Object.keys(editData).reduce((acc, key) => {
//           const value = editData[key];
//           if (value !== '' || ['Status', 'Industry Type', 'Business Name'].includes(key)) {
//               acc[key] = value;
//           }
//           return acc;
//       }, {});
        
//       await onUpdateData(business.id, cleanedData); 
//       setSuccessMessage(`Business ${business['Business Name']} saved successfully!`);
//       onBack(); 
//     };

//     return (
//         <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
//             <h3 className="text-2xl font-bold text-white mb-6">Edit Business Details</h3>
//             <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }} className="space-y-6">
                
//                 {/* 1. STATUS Dropdown */}
//                 <div>
//                     <label htmlFor="Status" className="block text-sm font-medium text-gray-400 mb-1">Status</label>
//                     <select id="Status" name="Status" value={editData.Status} onChange={handleChange}
//                         className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500">
//                         {StatusOptions.map(option => (<option key={option} value={option}>{option}</option>))}
//                     </select>
//                 </div>
                
//                 {/* 2. INDUSTRY TYPE Dropdown */}
//                 <div>
//                     <label htmlFor="Industry Type" className="block text-sm font-medium text-gray-400 mb-1">Industry Type</label>
//                     <select 
//                         id="Industry Type" 
//                         name="Industry Type" 
//                         value={editData['Industry Type'] || industryOptions[0]} 
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
//                     >
//                         {industryOptions.map(option => (<option key={option} value={option}>{option}</option>))}
//                     </select>
//                 </div>

//                 {/* 3. CORE FIELD: BUSINESS NAME (required, text) */}
//                 <div>
//                     <label htmlFor="Business Name" className="block text-sm font-medium text-gray-400 mb-1">Business Name <span className="text-red-400">*</span></label>
//                     <input type="text" id="Business Name" name="Business Name" required value={editData['Business Name'] || ''} onChange={handleChange}
//                         className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"/>
//                 </div>
                
//                 {/* 4. OTHER FIELDS (dynamic text inputs) */}
//                 {editableKeys.filter(key => key !== 'Business Name').map(key => (
//                     <div key={key}>
//                         <label htmlFor={key} className="block text-sm font-medium text-gray-400 mb-1">{key}</label>
//                         <input type="text" id={key} name={key} value={editData[key] || ''} onChange={handleChange}
//                             className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"/>
//                     </div>
//                 ))}
                
//                 {/* 5. READ-ONLY FIELD: CREATED DATE */}
//                 {business['Created Date'] && (
//                     <div className="pt-4">
//                         <label className="block text-sm font-medium text-gray-400 mb-1">Created Date</label>
//                         <p className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 text-sm">
//                             {new Date(business['Created Date']).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
//                         </p>
//                     </div>
//                 )}
                
//                 {/* Action Buttons */}
//                 <div className="flex justify-between pt-4 border-t border-gray-700 items-start">
//                     <button type="button" onClick={onBack} className="px-3 py-1.5 text-sm text-blue-300 border border-white-600 rounded-lg hover:bg-gray-700 transition cursor-pointer">← Back to List</button>
                    
//                     <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 space-x-3">
//                         <button 
//                             type="button" 
//                             onClick={onDeleteClick} 
//                             className="w-full sm:w-auto px-3 py-1.5 text-sm bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition shadow-md sm:px-6 sm:py-2 sm:text-base cursor-pointer"                        >
//                             Delete Business
//                         </button>
//                         <button 
//                             type="submit" 
//                             className="w-full sm:w-auto px-3 py-1.5 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md sm:px-6 sm:py-2 sm:text-base cursor-pointer"                        >
//                             Save Changes
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// const KanbanBoard = ({ businessData, onSelectBusiness, groupByField, title }) => {
    
//     const groups = businessData.reduce((acc, business) => {
//         let key = business[groupByField] || `Unspecified ${groupByField}`;
//         if (!acc[key]) {
//             acc[key] = [];
//         }
//         acc[key].push(business);
//         return acc;
//     }, {});

//     const uniqueGroups = Object.keys(groups).sort();

//     const getColor = (groupKey) => {
//         let hash = 0;
//         for (let i = 0; i < groupKey.length; i++) { hash = groupKey.charCodeAt(i) + ((hash << 5) - hash); }
//         let color = '#';
//         for (let i = 0; i < 3; i++) {
//             let value = (hash >> (i * 8)) & 0xFF;
//             color += ('00' + value.toString(16)).substr(-2);
//         }
//         return color;
//     };


//     return (
//         <div className="space-y-6">
//             <h2 className="text-xl font-semibold text-gray-300 mb-4">{title}</h2>
            
//             <div className="flex space-x-4 overflow-x-auto pb-4">
//                 {uniqueGroups.map(groupKey => (
//                     <div key={groupKey} className="flex-shrink-0 w-80 bg-gray-800 p-4 rounded-xl shadow-xl border-t-4"
//                         style={{ borderTopColor: getColor(groupKey) }}>
//                         <h3 className="text-lg font-bold text-white mb-4 flex justify-between items-center">
//                             {groupKey}
//                             <span className="text-sm bg-gray-700 px-2 py-0.5 rounded-full">{groups[groupKey].length}</span>
//                         </h3>
                        
//                         <div className="space-y-3">
//                             {groups[groupKey].map(business => (
//                                 <div 
//                                     key={business.id} 
//                                     onClick={() => onSelectBusiness && onSelectBusiness(business)} 
//                                     className={`bg-gray-700 p-4 rounded-lg shadow-md transition duration-150 border border-gray-600 ${onSelectBusiness ? 'cursor-pointer hover:bg-gray-600' : ''}`}
//                                 >
//                                     <div className="flex items-start space-x-3">
//                                         {business['Logo URL'] && business['Logo URL'].trim().length > 0 && (
//                                             <img 
//                                                 src={business['Logo URL']} 
//                                                 alt={`${business['Business Name']} Logo`} 
//                                                 className="w-10 h-10 object-cover rounded-full flex-shrink-0"
//                                                 onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} 
//                                             />
//                                         )}
                                        
//                                         <div className="flex-1 min-w-0">
//                                             <p className="font-semibold text-gray-100 truncate">{business['Business Name']}</p>
                                            
//                                             {business['Owner Name'] && (
//                                                 <p className="text-xs text-gray-400 mt-0.5 truncate">
//                                                     Owner: {business['Owner Name']}
//                                                 </p>
//                                             )}
                                            
//                                             <p className="text-sm text-blue-400 mt-1">Status: {business.Status}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // ⭐️ NEW COMPONENT: AddMemberAccountForm (Placeholder for full implementation detail) ⭐️
// // NOTE: I am not fully implementing the new form logic here as it was part of the previous response's plan, 
// // and the user provided a version where it was simplified back into AddBusinessForm's place.
// // The primary focus now is the design change. I will create a dedicated placeholder component for clarity.
// const AddMemberAccountForm = ({ onAddMember, onCancel }) => {
//     const [formData, setFormData] = useState({
//         'Owner Name': '',
//         'Phone Number': '',
//         'Pin': '',
//     });
//     const [isSaving, setIsSaving] = useState(false);
    
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         let finalValue = value;
        
//         if (name === 'Pin') {
//             finalValue = value.replace(/[^0-9]/g, '').substring(0, 6);
//         }

//         setFormData(prev => ({ ...prev, [name]: finalValue }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!formData['Owner Name'] || !formData['Phone Number'] || formData.Pin.length !== 6) {
//             alert("Please fill in Owner Name, Phone Number, and ensure PIN is exactly 6 digits.");
//             return;
//         }

//         setIsSaving(true);
//         await onAddMember(formData);
//         setIsSaving(false);
//     };

//     return (
//         <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 max-w-lg mx-auto">
//             <h3 className="text-2xl font-bold text-white mb-6">Register New Member Account</h3>
//             <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* Owner Name */}
//                 <div>
//                     <label htmlFor="ownerName" className="block text-sm font-medium text-gray-400 mb-1">Owner Name <span className="text-red-400">*</span></label>
//                     <input type="text" id="ownerName" name="Owner Name" required value={formData['Owner Name']} onChange={handleChange}
//                         className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"/>
//                 </div>
                
//                 {/* Phone Number */}
//                 <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Phone Number <span className="text-red-400">*</span></label>
//                     <input type="tel" id="phone" name="Phone Number" required value={formData['Phone Number']} onChange={handleChange}
//                         className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"/>
//                 </div>
                
//                 {/* PIN (6 Digits) */}
//                 <div>
//                     <label htmlFor="pin" className="block text-sm font-medium text-gray-400 mb-1">6-Digit PIN <span className="text-red-400">*</span></label>
//                     <input type="text" id="pin" name="Pin" required value={formData.Pin} onChange={handleChange}
//                         maxLength={6} 
//                         placeholder="e.g. 123456"
//                         className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-center font-mono text-xl focus:ring-blue-500 focus:border-blue-500"/>
//                     <p className="mt-1 text-xs text-gray-500">Must be exactly 6 numeric digits.</p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-between pt-4 border-t border-gray-700">
//                     <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-700 transition">← Cancel</button>
//                     <button 
//                         type="submit" 
//                         disabled={isSaving || formData.Pin.length !== 6 || !formData['Owner Name'] || !formData['Phone Number']}
//                         className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md disabled:bg-gray-500 cursor-pointer"
//                     >
//                         {isSaving ? 'Adding...' : 'Add Account'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };
// // ⭐️ END NEW COMPONENT ⭐️


// // ⭐️ REUSABLE SUBCOMPONENT: BusinessOwnerListView (Used by the Combined Business Owner tab) ⭐️
// const BusinessOwnerListView = ({ businesses, industryOptions, onUpdateMemberPin, setSuccessMessage, onDeleteMemberClick }) => { // <-- ADDED PROP
//     // State for filtering
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterType, setFilterType] = useState('Owner Name'); 
    
//     // Track which business's PIN is visible
//     const [visiblePinId, setVisiblePinId] = useState(null);
    
//     // ⭐️ NEW PIN EDIT STATE ⭐️
//     const [pinBeingEdited, setPinBeingEdited] = useState(null); // stores member.id
//     const [newPin, setNewPin] = useState('');
    
//     // ⭐️ NEW QR CODE STATE: Holds all data for the modal ⭐️
//     const [qrCodeData, setQrCodeData] = useState(null); // stores { phoneNum, pin, ownerName }


//     // Memoized filtering logic
//     const filteredBusinesses = useMemo(() => {
//         if (!searchTerm) return businesses;

//         const lowerCaseSearch = searchTerm.toLowerCase();
//         const fieldKey = filterType; 

//         return businesses.filter(business => {
//             const value = business[fieldKey] || ''; 
//             return value.toLowerCase().includes(lowerCaseSearch);
//         });
//     }, [businesses, searchTerm, filterType]);
    
//     // Table columns configuration
//     const columns = [
//         { name: 'Business Name', key: 'Business Name' },
//         { name: 'Owner Name', key: 'Owner Name' },
//         { name: 'Industry Type', key: 'Industry Type' },
//         { name: 'Phone Number', key: 'Phone Number' },
//         { name: 'Status', key: 'Status' },
//         { name: 'Created Date', key: 'Created Date' },
//         { name: 'Pin', key: 'Pin' }, 
//     ];
    
//     const displayValue = (key, value) => {
//         if (key === 'Created Date' && value) {
//             const date = typeof value === 'string' && value.includes('-') 
//                          ? new Date(value) 
//                          : new Date(value); 
            
//             if (!isNaN(date.getTime())) {
//                 return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//             }
//         }
//         return value || 'N/A';
//     }
    
//     const togglePinVisibility = (businessId) => {
//         // If Pin is being edited, we don't allow toggling visibility
//         if (pinBeingEdited === businessId) return;
//         setVisiblePinId(prevId => prevId === businessId ? null : businessId);
//     };

//     // ⭐️ UPDATED QR CODE HANDLERS ⭐️
//     const handleGenerateQR = (business) => { 
//         if (business && business.Pin && business['Phone Number']) {
//             setQrCodeData({
//                 phoneNum: business['Phone Number'],
//                 pin: business.Pin,
//                 ownerName: business['Owner Name'] // Pass the owner name
//             });
//         } else {
//             setSuccessMessage("Cannot generate QR: Phone Number or Pin is missing.");
//         }
//     };
    
//     const handleCloseQR = () => {
//         setQrCodeData(null);
//     };
//     // ⭐️ END UPDATED QR CODE HANDLERS ⭐️


//     // ⭐️ NEW PIN EDIT HANDLERS ⭐️
//     const handleEditPinClick = (business) => {
//         // Only allow editing for the Members/Pins view (which this is now)
//         if (!onUpdateMemberPin) return; 
        
//         // Hide PIN if currently visible
//         setVisiblePinId(null); 
        
//         setPinBeingEdited(business.id);
//         setNewPin(business.Pin || '');
//     };

//     const handleCancelEditPin = () => {
//         setPinBeingEdited(null);
//         setNewPin('');
//     };

//     const handleSavePin = async (memberId) => {
//         // ⭐️ UPDATED PIN LENGTH CHECK: Now 6 digits to match the user's example ⭐️
//         if (!newPin || newPin.length !== 6) { 
//             setSuccessMessage("PIN must be 6 characters long to match your example data."); 
//             return;
//         }
        
//         if (onUpdateMemberPin) {
//             await onUpdateMemberPin(memberId, newPin); 
//         }
        
//         // Reset state and show pin
//         setPinBeingEdited(null);
//         setNewPin('');
//         setVisiblePinId(memberId);
//     };
//     // ⭐️ END NEW PIN EDIT HANDLERS ⭐️


//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-white">
//                 Member Accounts & PIN Management
//             </h2>
            
//             <p className="text-gray-400">
//                 This list shows all registered user accounts, including those who have not yet submitted a business form ('Account Only'). Pin column is editable here.
//             </p>

//             {/* Filter Controls */}
//             <div className="bg-gray-800 p-4 rounded-xl shadow-inner flex flex-col sm:flex-row gap-4">
//                 {/* Search Input */}
//                 <input
//                     type="text"
//                     placeholder={`Search by ${filterType}...`} 
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full sm:flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
//                 />

//                 {/* Filter Type Selection */}
//                 <select
//                     value={filterType}
//                     onChange={(e) => setFilterType(e.target.value)}
//                     className="w-full sm:w-auto px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
//                 >
//                     <option value="Owner Name">Owner Name</option>
//                     <option value="Phone Number">Phone Number</option>
//                     <option value="Status">Status</option>
//                     <option value="Industry Type">Industry Type</option>
//                 </select>
//             </div>

//             {/* Business Table */}
//             <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700">
//                 <table className="min-w-full divide-y divide-gray-700">
//                     <thead>
//                         <tr className="bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
//                             {columns.map(col => (
//                                 <th key={col.key} scope="col" className="px-6 py-3">{col.name}</th>
//                             ))}
//                             {/* New column header for the delete button */}
//                             <th scope="col" className="px-6 py-3">Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-700">
//                         {filteredBusinesses.length > 0 ? (
//                             filteredBusinesses.map(business => (
//                                 <tr key={business.id} className="hover:bg-gray-700 transition duration-100 text-sm text-gray-300"> 
//                                     {columns.map(col => (
//                                         <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                                            
//                                             {/* ⭐️ NEW PIN COLUMN LOGIC (View/Edit/QR) ⭐️ */}
//                                             {col.key === 'Pin' ? (
//                                                 <div className="flex items-center space-x-3">
//                                                     {/* PIN EDIT MODE (Only for Members/Pins view) */}
//                                                     {onUpdateMemberPin && pinBeingEdited === business.id ? (
//                                                         <div className="flex items-center space-x-2">
//                                                             <input
//                                                                 type="text"
//                                                                 value={newPin}
//                                                                 // ⭐️ UPDATED: Max 6 digits ⭐️
//                                                                 onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))}
//                                                                 maxLength={6}
//                                                                 className="w-24 px-2 py-1 bg-gray-600 border border-blue-500 rounded-md text-white text-center font-bold placeholder-gray-400"
//                                                                 placeholder="PIN"
//                                                             />
//                                                             <button 
//                                                                 onClick={() => handleSavePin(business.id)} 
//                                                                 disabled={newPin.length !== 6}
//                                                                 className="px-2 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-500 transition"
//                                                             >
//                                                                 Save
//                                                             </button>
//                                                             <button 
//                                                                 onClick={handleCancelEditPin} 
//                                                                 className="px-2 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//                                                             >
//                                                                 Cancel
//                                                             </button>
//                                                         </div>
//                                                     ) : (
//                                                         // PIN VIEW MODE (For both tabs)
//                                                         <>
//                                                             <div className="flex items-center space-x-2">
//                                                                 {/* Pin Value Display */}
//                                                                 {business.Pin && visiblePinId === business.id ? (
//                                                                     <span className="font-bold text-lg text-green-400 bg-gray-700 px-3 py-1 rounded-md shadow mr-1">
//                                                                         {business.Pin}
//                                                                     </span>
//                                                                 ) : (
//                                                                     <span className="text-gray-500 text-lg mr-1">{business.Pin ? '••••••' : 'N/A'}</span>
//                                                                 )}

//                                                                 {/* Show/Hide Pin Button */}
//                                                                 <button 
//                                                                     onClick={() => togglePinVisibility(business.id)}
//                                                                     disabled={!business.Pin} 
//                                                                     className={`px-2 py-1 rounded-lg transition text-xs font-medium w-20 
//                                                                         ${business.Pin
//                                                                             ? 'bg-blue-600 text-white hover:bg-blue-700'
//                                                                             : 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                                                                         }`}
//                                                                 >
//                                                                     {visiblePinId === business.id ? 'Hide Pin' : 'Show Pin'}
//                                                                 </button>
                                                                
//                                                                 {/* Edit Button (Only for Members/Pins tab) */}
//                                                                 {onUpdateMemberPin && (
//                                                                     <button 
//                                                                         onClick={() => handleEditPinClick(business)}
//                                                                         disabled={!business.Pin} 
//                                                                         className={`px-2 py-1 rounded-lg transition text-xs font-medium w-16
//                                                                             ${business.Pin
//                                                                                 ? 'bg-purple-600 text-white hover:bg-purple-700'
//                                                                                 : 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                                                                             }`}
//                                                                     >
//                                                                         Edit
//                                                                     </button>
//                                                                 )}

//                                                                 {/* ⭐️ NEW: Generate QR Button ⭐️ */}
//                                                                 <button 
//                                                                     onClick={() => handleGenerateQR(business)}
//                                                                     disabled={!business.Pin || !business['Phone Number']} 
//                                                                     className={`px-2 py-1 rounded-lg transition text-xs font-medium w-24 
//                                                                         ${business.Pin && business['Phone Number']
//                                                                             ? 'bg-green-600 text-white hover:bg-green-700'
//                                                                             : 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                                                                         }`}
//                                                                 >
//                                                                     Generate QR
//                                                                 </button>
//                                                             </div>
//                                                         </>
//                                                     )}
//                                                 </div>
//                                             ) : (
//                                                 // ⭐️ NEW LOGIC for Business Name/Status ⭐️
//                                                 col.key === 'Business Name' && business.isMultipleBusiness ? (
//                                                     <span className="font-medium text-blue-300">
//                                                         {business['Business Name']}
//                                                     </span>
//                                                 ) : col.key === 'Status' && business.Status === 'Account Only' ? (
//                                                     <span className="text-yellow-500 font-medium">{business[col.key]}</span>
//                                                 ) : col.key === 'Status' && business.Status.startsWith('Multiple') ? (
//                                                     <span className={`font-medium text-purple-400`}>
//                                                         {business.Status}
//                                                     </span>
//                                                 ) : (
//                                                     // Default rendering
//                                                     displayValue(col.key, business[col.key])
//                                                 )
//                                             )}
//                                         </td>
//                                     ))}
//                                     {/* ⭐️ NEW: Delete Member Button Column ⭐️ */}
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <button 
//                                             onClick={() => onDeleteMemberClick(business)}
//                                             className="px-3 py-1.5 text-xs bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition shadow-md whitespace-nowrap"
//                                         >
//                                             Delete Member
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                              <tr>
//                                 <td colSpan={columns.length + 1} className="px-6 py-10 text-center text-gray-500">
//                                     No records found matching current filters.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
            
//             {/* ⭐️ NEW: QR Code Modal ⭐️ */}
//             {qrCodeData && (
//                 <QRCodeDisplay 
//                     phoneNum={qrCodeData.phoneNum}
//                     pin={qrCodeData.pin}
//                     ownerName={qrCodeData.ownerName} // ⭐️ PASS OWNER NAME HERE ⭐️
//                     onClose={handleCloseQR}
//                 />
//             )}
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
//     // ⭐️ ADDED: adminEmail prop with a default placeholder ⭐️
//     adminEmail = 'admin@tbt-corp.com', 
// }) {
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
//   // ⭐️ STATE ⭐️
//   const [businesses, setBusinesses] = useState([]);
//   const [members, setMembers] = useState([]); 
//   const [isLoading, setIsLoading] = useState(true);
//   const [dataError, setDataError] = useState(null);
//   const [industryOptions, setIndustryOptions] = useState([]);
//   // ⭐️ NEW: Track if we are adding a Business or a Member Account ⭐️
//   const [isAddingNew, setIsAddingNew] = useState(false); 


//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [businessToDelete, setBusinessToDelete] = useState(null); 
//   const [industryToDelete, setIndustryToDelete] = useState(null); 
//   // ⭐️ NEW: State for member deletion ⭐️
//   const [memberToDelete, setMemberToDelete] = useState(null); 
//   // ⭐️ END NEW ⭐️
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [activeNavItem, setActiveNavItem] = useState('Dashboard');
//   const [isViewingOnly, setIsViewingOnly] = useState(false);


//   // 1. Fetch Business Data 
//   useEffect(() => {
//     const q = query(collection(db, 'businesses'), orderBy('Status', 'asc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//         const businessList = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         setBusinesses(businessList);
//         setIsLoading(false);
//         setDataError(null);
//     }, (err) => {
//         console.error("Firestore Business Data Read Error:", err);
//         setDataError("Failed to fetch business data.");
//         setIsLoading(false);
//     });
//     return () => unsubscribe();
//   }, []); 
  
//   // 2. Fetch Member Data (for PIN and Owner List base) 
//   useEffect(() => {
//     const q = query(collection(db, 'members')); 
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//         const memberList = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         setMembers(memberList);
//     }, (err) => {
//         console.error("Firestore Member Data Read Error:", err);
//     });
//     setIsLoading(false);
//     return () => unsubscribe();
//   }, []); 

//   // 3. Fetch Industry Options (Unchanged)
//   useEffect(() => {
//     const docRef = doc(db, 'settings', 'global'); 
    
//     const fetchIndustryOptions = async () => {
//         try {
//             const docSnap = await getDoc(docRef);
//             let options = [];
//             if (docSnap.exists() && docSnap.data().industryOptions) {
//                 options = docSnap.data().industryOptions;
//             }
//             setIndustryOptions(options.sort());
//         } catch (error) {
//             console.error("Error fetching industry options:", error);
//             setIndustryOptions(['Unspecified Industry']);
//         }
//     };
//     fetchIndustryOptions();
//   }, []); 
  
  
//   // ⭐️ 4. Member Pin List Data (For the new "Business Owner" tab - Includes ALL accounts and handles multiples) ⭐️
//   const memberPinListData = useMemo(() => {
//     const businessMap = businesses.reduce((acc, business) => {
//         const phoneNumber = business['Phone Number'];
//         if (phoneNumber) {
//             if (!acc[phoneNumber]) {
//                 acc[phoneNumber] = [];
//             }
//             acc[phoneNumber].push(business); // Store array of businesses
//         }
//         return acc;
//     }, {});

//     return members.map(member => {
//         const phoneNumber = member['Phone Number'];
//         const userBusinesses = businessMap[phoneNumber] || [];
        
//         let businessName, industryType, status, isMultipleBusiness;
        
//         if (userBusinesses.length === 0) {
//             businessName = 'No Business Registered';
//             industryType = 'N/A';
//             status = 'Account Only';
//             isMultipleBusiness = false;
//         } else if (userBusinesses.length === 1) {
//             const business = userBusinesses[0];
//             businessName = business['Business Name'];
//             industryType = business['Industry Type'];
//             status = business.Status;
//             isMultipleBusiness = false;
//         } else {
//             // Multiple Businesses
//             isMultipleBusiness = true;
//             businessName = `${userBusinesses.length} Businesses Registered`;
            
//             // Summarize industries
//             const uniqueIndustries = [...new Set(userBusinesses.map(b => b['Industry Type']))].join(', ');
//             industryType = uniqueIndustries.length < 50 ? uniqueIndustries : 'Multiple Industries';
            
//             // Summarize status: prioritize Pending Review > Active > Mixed
//             const hasPending = userBusinesses.some(b => b.Status === 'Pending Review');
//             const hasActive = userBusinesses.some(b => b.Status === 'Active');
            
//             if (hasPending) {
//                  status = `Multiple: ${userBusinesses.length} (Pending Review)`;
//             } else if (hasActive) {
//                  status = `Multiple: ${userBusinesses.length} (Active)`;
//             } else {
//                  status = `Multiple: ${userBusinesses.length} (Mixed)`;
//             }
//         }

//         return {
//             id: member.id, // Member ID is crucial for PIN updates
//             'Owner Name': member['Owner Name'] || 'N/A',
//             'Phone Number': phoneNumber || 'N/A',
//             Pin: member.Pin || null, 
            
//             // Updated Business Info
//             'Business Name': businessName,
//             'Industry Type': industryType,
//             Status: status, 
//             'Created Date': userBusinesses[0]?.['Created Date'] || member.createdAt, 
//             isMultipleBusiness: isMultipleBusiness, // Flag for rendering
//         };
//     }).sort((a, b) => {
//         const dateA = new Date(a['Created Date'] || 0);
//         const dateB = new Date(b['Created Date'] || 0);
//         return dateB.getTime() - dateA.getTime();
//     });
//   }, [businesses, members]);


//   // ⭐️ NEW HANDLER: Update Member PIN ⭐️
//   const handleUpdateMemberPin = useCallback(async (memberId, newPin) => {
//       setIsLoading(true);
//       try {
//           const memberRef = doc(db, 'members', memberId);
//           await updateDoc(memberRef, { Pin: newPin });
//           setSuccessMessage("Member PIN updated successfully!");
//           return true; // Indicate success
//       } catch (err) { 
//           console.error("Failed to update PIN:", err);
//           setSuccessMessage("Failed to update PIN. Please try again."); // Use toast for error
//           return false; // Indicate failure
//       } finally { 
//           setIsLoading(false);
//       }
//   }, [setSuccessMessage]);
//   // ⭐️ END NEW HANDLER ⭐️

//   // ⭐️ HANDLER: Delete Member Account ⭐️
//   const handleDeleteMemberClick = (member) => { 
//       setMemberToDelete(member); 
//   };
    
//   const handleConfirmDeleteMember = async () => {
//       if (!memberToDelete) return;
      
//       setIsLoading(true);
//       const name = memberToDelete['Owner Name'];
      
//       try {
//           const memberRef = doc(db, 'members', memberToDelete.id);
//           await deleteDoc(memberRef);
          
//           setSuccessMessage(`Member account '${name}' deleted successfully!`);
//           setMemberToDelete(null); 
//       } catch (err) {
//           setDataError("Failed to delete member account. Please try again.");
//       } finally {
//           setIsLoading(false);
//       }
//   };
  
//   const handleCancelDeleteMember = () => {
//       setMemberToDelete(null);
//   };
//   // ⭐️ END HANDLER: Delete Member Account ⭐️


//   // ⭐️ HANDLERS (Unchanged) ⭐️
//   const handleUpdateData = useCallback(async (businessId, updatedFields) => {
//       setIsLoading(true);
//       try {
//           const businessRef = doc(db, 'businesses', businessId);
//           await updateDoc(businessRef, updatedFields);
//       } catch (err) {
//           setDataError("Failed to save changes. Please try again.");
//       } finally {
//           setIsLoading(false);
//       }
//   }, []);

//   const handleConfirmDeleteBusiness = async () => {
//       if (!businessToDelete) return;

//       setIsLoading(true);
//       const name = businessToDelete['Business Name'];
//       try {
//           const businessRef = doc(db, 'businesses', businessToDelete.id);
//           await deleteDoc(businessRef);
          
//           setSuccessMessage(`Business '${name}' deleted successfully!`);
//           setBusinessToDelete(null); 
//           setSelectedBusiness(null); 
//       } catch (err) {
//           setDataError("Failed to delete business. Please try again.");
//       } finally {
//           setIsLoading(false);
//       }
//   };

//   const handleCancelDeleteBusiness = () => {
//       setBusinessToDelete(null);
//   };
  
//   const handleConfirmDeleteIndustry = async () => {
//       if (!industryToDelete) return;
      
//       try {
//           const docRef = doc(db, 'settings', 'global');
//           await setDoc(docRef, { industryOptions: arrayRemove(industryToDelete) }, { merge: true });
//           setIndustryOptions(prev => prev.filter(opt => opt !== industryToDelete));
//           setSuccessMessage(`Industry '${industryToDelete}' deleted successfully!`);
//           setIndustryToDelete(null);
//       } catch (err) {
//           setSuccessMessage("Failed to delete industry. Please try again.");
//       }
//   };

//   const handleCancelDeleteIndustry = () => {
//       setIndustryToDelete(null);
//   };

//   const handleAddBusiness = async (newBusinessData) => {
//       setIsLoading(true);
//       try {
//           const collectionRef = collection(db, 'businesses');
//           await addDoc(collectionRef, {
//               ...newBusinessData,
//               Status: "Pending Review",
//               'Created Date': new Date().toISOString(),
//           });
//           setSuccessMessage(`Business '${newBusinessData['Business Name']}' registered successfully!`);
//           handleBackToList(); // Go back to the list after adding
//       } catch (err) {
//           setDataError("Failed to register new business. Please try again.");
//       } finally {
//           setIsLoading(false);
//       }
//   };
  
//   // ⭐️ NEW HANDLER: Add Member Account (Simplified logic from user's file) ⭐️
//   const handleAddMemberAccount = async (newMemberData) => { 
//     setIsLoading(true); 
//     try { 
//         const collectionRef = collection(db, 'members'); 
//         await addDoc(collectionRef, { 
//             ...newMemberData, 
//             createdAt: new Date().toISOString(), // Timestamp for the new member account
//         }); 
//         setSuccessMessage(`Member '${newMemberData['Owner Name']}' added successfully!`); 
//         handleBackToList(); // Go back to the list view
//     } catch (err) { 
//         console.error("Failed to add new member:", err);
//         setSuccessMessage("Failed to add new member account. Please check console for details."); 
//     } finally { 
//         setIsLoading(false); 
//     } 
//   };
//   // ⭐️ END NEW HANDLER ⭐️

//   const handleAddIndustry = async (newIndustryName) => {
//       const trimmedName = newIndustryName ? newIndustryName.trim() : '';
//       if (!trimmedName) { return; }
//       try {
//           const docRef = doc(db, 'settings', 'global');
//           await setDoc(docRef, { industryOptions: arrayUnion(trimmedName) }, { merge: true });
//           setIndustryOptions(prev => [...prev.filter(opt => opt !== trimmedName), trimmedName].sort());
//       } catch (err) {
//           throw err;
//       }
//   };

//   const handleDeleteIndustry = async (industryName) => {
//       try {
//           const docRef = doc(db, 'settings', 'global');
//           await setDoc(docRef, { industryOptions: arrayRemove(industryName) }, { merge: true });
//           setIndustryOptions(prev => prev.filter(opt => opt !== industryName));
//       } catch (err) {
//           throw err;
//       }
//   };

//   const handleLogout = async () => {
//       try {
//           await signOut(auth);
//           setCurrentView(views.HOME);
//       } catch (error) {
//           console.error("Logout Error:", error);
//       }
//   };

//   const handleViewEditClick = (business) => {
//       setSelectedBusiness(business);
//       setIsViewingOnly(false);
//   };

//   const handleBackToList = () => {
//       setSelectedBusiness(null);
//       setIsAddingNew(false);
//       setIsViewingOnly(false);
//   };

//   const handleViewOnlyClick = (business) => {
//       setSelectedBusiness(business);
//       setIsViewingOnly(true);
//   };

//   const handleDeleteClick = (business) => { setBusinessToDelete(business); };

//   const handleCloseToast = useCallback(() => { setSuccessMessage(null); }, []);

//   const handleNavClick = (name) => {
//       setActiveNavItem(name);
//       setSelectedBusiness(null);
//       setIsAddingNew(false);
//       setIsViewingOnly(false);
//       setIsMobileMenuOpen(false);
//   };

//   // ⭐️ NEW HANDLERS for Add Button Logic ⭐️
//   const handleAddNewClick = () => {
//     // Determine which form to show based on the active tab
//     if (activeNavItem === 'Businesses') {
//         // Show AddBusinessForm
//         setIsAddingNew(true);
//         // I will rely on the AddBusinessForm component internally to know it's a full business add.
//     } else if (activeNavItem === 'Business Owner') {
//         // Show AddMemberAccountForm (using a dedicated component now)
//         setIsAddingNew(true);
//     }
//   };

//   const getHeaderTitle = () => {
//       if (isAddingNew) {
//           return activeNavItem === 'Businesses' ? "Register New Business Listing" : "Register New Member Account";
//       }
//       if (selectedBusiness) {
//           return isViewingOnly
//               ? `Viewing: ${selectedBusiness['Business Name']}`
//               : `Editing: ${selectedBusiness['Business Name']}`;
//       }
//       return activeNavItem;
//   };

//   // ⭐️ RENDER CONTENT ⭐️
//   const renderContent = () => {
//       if (isLoading && activeNavItem !== 'Business Owner') {
//           return (<div className="bg-gray-800 p-8 rounded-xl shadow-lg h-96 flex items-center justify-center"><p className="text-2xl text-white font-light">Loading data from Firestore... 🔄</p></div>);
//       }
//       if (dataError) { return (<div className="bg-red-800 p-8 rounded-xl shadow-lg h-96 flex items-center justify-center"><p className="text-2xl text-white font-light">❌ Data Error: {dataError}</p></div>); }

//       // 1. Add Form View
//       if (isAddingNew) {
//           if (activeNavItem === 'Businesses') {
//               return (
//                   <AddBusinessForm 
//                       onAddBusiness={handleAddBusiness} 
//                       onCancel={handleBackToList} 
//                       industryOptions={industryOptions} 
//                       isAddingMember={false} 
//                   />
//               );
//           } else if (activeNavItem === 'Business Owner') {
//               // This is the correct form for the 'Business Owner' tab's Add New button
//               return (
//                   <AddMemberAccountForm 
//                       onAddMember={handleAddMemberAccount} 
//                       onCancel={handleBackToList} 
//                   />
//               );
//           }
//       }

//       // 2. Business Details View (Edit or View Only)
//       if (selectedBusiness) {
//           if (isViewingOnly) {
//               return (
//                   <BusinessView
//                       business={selectedBusiness}
//                       onBack={handleBackToList}
//                   />
//               );
//           }
//           return (
//               <BusinessDetailView
//                   business={selectedBusiness}
//                   onBack={handleBackToList}
//                   onUpdateData={handleUpdateData}
//                   setSuccessMessage={setSuccessMessage}
//                   onDeleteClick={() => handleDeleteClick(selectedBusiness)}
//                   industryOptions={industryOptions}
//               />
//           );
//       }

//       // 3. Dashboard View (Kanban by Industry Type)
//       if (activeNavItem === 'Dashboard') {
//           return (
//               <KanbanBoard 
//                   businessData={businesses} 
//                   onSelectBusiness={handleViewOnlyClick} 
//                   groupByField={'Industry Type'} 
//                   title={'Dashboard: Grouped by Industry Type'} 
//               />
//           );
//       }

//       // 4. Businesses View (Kanban by Status)
//       if (activeNavItem === 'Businesses') {
//           return (
//               <KanbanBoard 
//                   businessData={businesses} 
//                   onSelectBusiness={handleViewEditClick} 
//                   groupByField={'Status'} 
//                   title={'Businesses: Grouped by Business Status'} 
//               />
//           );
//       }

//       // 5. Business Owner List View (COMBINED VIEW)
//       if (activeNavItem === 'Business Owner') {
//           return (
//               <BusinessOwnerListView 
//                   businesses={memberPinListData} // Use the comprehensive list of ALL members
//                   industryOptions={industryOptions} 
//                   onUpdateMemberPin={handleUpdateMemberPin} 
//                   setSuccessMessage={setSuccessMessage} 
//                   onDeleteMemberClick={handleDeleteMemberClick} // <-- NEW PROP PASSED
//               />
//           );
//       }
      
//       // 6. Settings View
//       if (activeNavItem === 'Settings') {
//           return (
//               <SettingsView 
//                   industryOptions={industryOptions} 
//                   onAddIndustry={handleAddIndustry}
//                   onDeleteIndustry={(name) => setIndustryToDelete(name)}
//                   setSuccessMessage={setSuccessMessage}
//               />
//           );
//       }

//       return null;
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-900 text-gray-100 relative">
//         {/* Mobile Menu Overlay */}
//         {isMobileMenuOpen && (
//             <div
//                 className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//                 onClick={() => setIsMobileMenuOpen(false)}
//             ></div>
//         )}

//         {/* 1. LEFT SIDEBAR (Dark, eye-catchy blue accent) */}
//         <nav className={`fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700 p-4 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:relative md:translate-x-0 md:block`}>
//             <div className="flex flex-col h-full">
                
//                 {/* ⭐️ NEW: Logo, Admin Name, and Email at the TOP ⭐️ */}
//                 <div className="flex flex-col items-center pb-6 mb-6 border-b border-gray-700">
//                     {/* Logo/Avatar Placeholder (Simple, eye-catchy blue circle) */}
//                         <img 
//                             src="/tbtlogo.jpg" 
//                             alt="TBT Admin Logo" 
//                             className="h-12 w-auto mx-auto rounded-full" // Set height, auto width, and center it
//                         />             
                    
//                     {/* Admin Name */}
//                     <p className="text-lg font-bold text-white mb-0.5">{adminName}</p>
//                     {/* Admin Email */}
//                     {/* <p className="text-sm text-gray-400 font-light truncate max-w-full px-2">{adminEmail}</p> */}
//                 </div>
//                 {/* ⭐️ END NEW TOP SECTION ⭐️ */}
                
//                 <ul className="flex-grow space-y-2">
//                     {dashboardNavItems.map(item => (
//                         <li key={item.name}>
//                             <button onClick={() => handleNavClick(item.name)} className={`w-full text-left flex items-center p-3 rounded-lg transition duration-150 cursor-pointer ${activeNavItem === item.name ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700'}`}>
//                                 <span className="mr-3">{item.icon}</span>
//                                 <span className="font-medium">{item.name}</span>
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//                 {/* Removed old login info from the bottom of the sidebar */}
//             </div>
//         </nav>

//         {/* 2. MAIN CONTENT AREA */}
//         <div className="flex-1 min-w-0 p-4 md:p-8">
//             {/* Header and Controls */}
//             <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
//                 <div className="flex items-center space-x-4">
//                     <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-400 hover:text-white transition">
//                         {/* Hamburger Icon */}
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
//                     </button>
//                     <h1 className="text-3xl font-extrabold text-white">{getHeaderTitle()}</h1>
//                 </div>
                
//                 <div className="flex space-x-3 sm:space-x-4 items-center">
//                     {/* Add New Button (Only show on Businesses OR Business Owner tabs when not viewing/editing) */}
//                     {
//                         !selectedBusiness && !isAddingNew && 
//                         (activeNavItem === 'Businesses' || activeNavItem === 'Business Owner') && (
//                         <button 
//                             onClick={handleAddNewClick} 
//                             className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base cursor-pointer"
//                         >
//                             {activeNavItem === 'Businesses' ? '+ Add Business' : '+ Add Member'}
//                         </button>
//                     )}
                    
//                     <button onClick={handleLogout} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base cursor-pointer">
//                         Logout
//                     </button>
//                 </div>
//             </header>

//             {renderContent()}
            
//             {/* ⭐️ 1. Delete Modal for BUSINESSES ⭐️ */}
//             {businessToDelete && (
//                 <ConfirmModal 
//                     itemName={businessToDelete['Business Name']} 
//                     itemType="Business"
//                     onConfirm={handleConfirmDeleteBusiness} 
//                     onCancel={handleCancelDeleteBusiness}
//                 />
//             )}

//             {/* ⭐️ 2. Delete Modal for INDUSTRIES ⭐️ */}
//             {industryToDelete && (
//                 <ConfirmModal 
//                     itemName={industryToDelete} 
//                     itemType="Industry Type"
//                     onConfirm={handleConfirmDeleteIndustry} 
//                     onCancel={handleCancelDeleteIndustry}
//                 />
//             )}

//             {/* ⭐️ 3. Delete Modal for MEMBERS ⭐️ */}
//             {memberToDelete && (
//                 <ConfirmModal 
//                     itemName={memberToDelete['Owner Name']} 
//                     itemType="Member Account" // Item type changed to Member Account
//                     onConfirm={handleConfirmDeleteMember} 
//                     onCancel={handleCancelDeleteMember}
//                 />
//             )}

//             {/* Success Toast */}
//             {successMessage && (<SuccessToast message={successMessage} onClose={handleCloseToast} />)}
//         </div>
//     </div>
//   );
// }
// export default AdminDashboard;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import QRCode from 'react-qr-code'; 
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
    { name: "Business Owner", icon: "👤" },     // COMBINED VIEW
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

// --- REUSABLE SUBCOMPONENT: QRCodeDisplay ---
const QRCodeDisplay = ({ phoneNum, pin, ownerName, onClose }) => {
    
    // The data to be encoded (Phone Number-Pin)
    const rawData = `${phoneNum}-${pin}`;
    
    // The final URL to be encoded in the QR code (This is still needed for scanning functionality)
    // IMPORTANT: Replace 'https://yourdomain.com' with your actual live domain.
    // Use 'http://localhost:5173' for local testing.
    const baseUrl = "https://yourdomain.com/scan?data="; 
    const dataString = `${baseUrl}${rawData}`; 

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
            <div 
                className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-sm w-full text-center border border-gray-700" 
                onClick={e => e.stopPropagation()} // Prevents closing when clicking inside the modal
            >
                <h3 className="text-xl font-bold text-white mb-2">Member QR Code</h3>
                
                {/* 1. Owner Name */}
                <p className="text-xl font-semibold text-blue-300 mb-4">{ownerName}</p>
                
                {/* 2. QR Code Photo */}
                <div className="bg-white p-4 rounded-lg flex items-center justify-center h-64 w-64 mx-auto">
                     <QRCode 
                        value={dataString} 
                        size={256} 
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                     /> 
                </div>
                
                {/* 3. Display Phone Number and PIN (Clean Display) */}
                <div className="mt-4 space-y-2 p-3 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-400">Phone Number:</p>
                        <p className="text-lg font-bold text-white">{phoneNum}</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                        <p className="text-sm font-medium text-gray-400">PIN:</p>
                        <p className="text-lg font-bold text-green-400">{pin}</p>
                    </div>
                </div>
                
                <button onClick={onClose} className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Close</button>
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
        if (!value) { return ' '; }
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
            
            {business['Logo URL'] && business['Logo URL'].trim().length > 0 && !business['Logo URL'].startsWith('data:image/') && (
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
                                        {business['Logo URL'] && business['Logo URL'].trim().length > 0 && (
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

// ⭐️ NEW COMPONENT: AddMemberAccountForm ⭐️
const AddMemberAccountForm = ({ onAddMember, onCancel }) => {
    const [formData, setFormData] = useState({
        'Owner Name': '',
        'Phone Number': '',
        'Pin': '',
    });
    const [isSaving, setIsSaving] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;
        
        if (name === 'Pin') {
            finalValue = value.replace(/[^0-9]/g, '').substring(0, 6);
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData['Owner Name'] || !formData['Phone Number'] || formData.Pin.length !== 6) {
            alert("Please fill in Owner Name, Phone Number, and ensure PIN is exactly 6 digits.");
            return;
        }

        setIsSaving(true);
        await onAddMember(formData);
        setIsSaving(false);
    };

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Register New Member Account</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Owner Name */}
                <div>
                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-400 mb-1">Owner Name <span className="text-red-400">*</span></label>
                    <input type="text" id="ownerName" name="Owner Name" required value={formData['Owner Name']} onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                
                {/* Phone Number */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Phone Number <span className="text-red-400">*</span></label>
                    <input type="tel" id="phone" name="Phone Number" required value={formData['Phone Number']} onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                
                {/* PIN (6 Digits) */}
                <div>
                    <label htmlFor="pin" className="block text-sm font-medium text-gray-400 mb-1">6-Digit PIN <span className="text-red-400">*</span></label>
                    <input type="text" id="pin" name="Pin" required value={formData.Pin} onChange={handleChange}
                        maxLength={6} 
                        placeholder="e.g. 123456"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-center font-mono text-xl focus:ring-blue-500 focus:border-blue-500"/>
                    <p className="mt-1 text-xs text-gray-500">Must be exactly 6 numeric digits.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-700">
                    <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-700 transition">← Cancel</button>
                    <button 
                        type="submit" 
                        disabled={isSaving || formData.Pin.length !== 6 || !formData['Owner Name'] || !formData['Phone Number']}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md disabled:bg-gray-500 cursor-pointer"
                    >
                        {isSaving ? 'Adding...' : 'Add Account'}
                    </button>
                </div>
            </form>
        </div>
    );
};
// ⭐️ END NEW COMPONENT ⭐️


// ⭐️ REUSABLE SUBCOMPONENT: BusinessOwnerListView (Used by the Combined Business Owner tab) ⭐️
const BusinessOwnerListView = ({ businesses, industryOptions, onUpdateMemberPin, setSuccessMessage, onDeleteMemberClick }) => { 
    // State for filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('Owner Name'); 
    
    // Track which business's PIN is visible
    const [visiblePinId, setVisiblePinId] = useState(null);
    
    // ⭐️ NEW PIN EDIT STATE ⭐️
    const [pinBeingEdited, setPinBeingEdited] = useState(null); // stores member.id
    const [newPin, setNewPin] = useState('');
    
    // ⭐️ NEW QR CODE STATE: Holds all data for the modal ⭐️
    const [qrCodeData, setQrCodeData] = useState(null); // stores { phoneNum, pin, ownerName }


    // Memoized filtering logic
    const filteredBusinesses = useMemo(() => {
        if (!searchTerm) return businesses;

        const lowerCaseSearch = searchTerm.toLowerCase();
        const fieldKey = filterType; 

        return businesses.filter(business => {
            const value = business[fieldKey] || ''; 
            return value.toLowerCase().includes(lowerCaseSearch);
        });
    }, [businesses, searchTerm, filterType]);
    
    // Table columns configuration
    const columns = [
        { name: 'Business Name', key: 'Business Name' },
        { name: 'Owner Name', key: 'Owner Name' },
        { name: 'Industry Type', key: 'Industry Type' },
        { name: 'Phone Number', key: 'Phone Number' },
        { name: 'Status', key: 'Status' },
        { name: 'Created Date', key: 'Created Date' },
        { name: 'Pin', key: 'Pin' }, 
    ];
    
    const displayValue = (key, value) => {
        if (key === 'Created Date' && value) {
            const date = typeof value === 'string' && value.includes('-') 
                         ? new Date(value) 
                         : new Date(value); 
            
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            }
        }
        return value || 'N/A';
    }
    
    const togglePinVisibility = (businessId) => {
        // If Pin is being edited, we don't allow toggling visibility
        if (pinBeingEdited === businessId) return;
        setVisiblePinId(prevId => prevId === businessId ? null : businessId);
    };

    // ⭐️ UPDATED QR CODE HANDLERS ⭐️
    const handleGenerateQR = (business) => { 
        if (business && business.Pin && business['Phone Number']) {
            setQrCodeData({
                phoneNum: business['Phone Number'],
                pin: business.Pin,
                ownerName: business['Owner Name'] // Pass the owner name
            });
        } else {
            setSuccessMessage("Cannot generate QR: Phone Number or Pin is missing.");
        }
    };
    
    const handleCloseQR = () => {
        setQrCodeData(null);
    };
    // ⭐️ END UPDATED QR CODE HANDLERS ⭐️


    // ⭐️ NEW PIN EDIT HANDLERS ⭐️
    const handleEditPinClick = (business) => {
        // Only allow editing for the Members/Pins view (which this is now)
        if (!onUpdateMemberPin) return; 
        
        // Hide PIN if currently visible
        setVisiblePinId(null); 
        
        setPinBeingEdited(business.id);
        setNewPin(business.Pin || '');
    };

    const handleCancelEditPin = () => {
        setPinBeingEdited(null);
        setNewPin('');
    };

    const handleSavePin = async (memberId) => {
        // ⭐️ UPDATED PIN LENGTH CHECK: Now 6 digits to match the user's example ⭐️
        if (!newPin || newPin.length !== 6) { 
            setSuccessMessage("PIN must be 6 characters long to match your example data."); 
            return;
        }
        
        if (onUpdateMemberPin) {
            await onUpdateMemberPin(memberId, newPin); 
        }
        
        // Reset state and show pin
        setPinBeingEdited(null);
        setNewPin('');
        setVisiblePinId(memberId);
    };
    // ⭐️ END NEW PIN EDIT HANDLERS ⭐️


    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
                Member Accounts & PIN Management
            </h2>
            
            <p className="text-gray-400">
                This list shows all registered user accounts, including those who have not yet submitted a business form ('Account Only'). Pin column is editable here.
            </p>

            {/* Filter Controls */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-inner flex flex-col sm:flex-row gap-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder={`Search by ${filterType}...`} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Filter Type Selection */}
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="Owner Name">Owner Name</option>
                    <option value="Phone Number">Phone Number</option>
                    <option value="Status">Status</option>
                    <option value="Industry Type">Industry Type</option>
                </select>
            </div>

            {/* Business Table */}
            <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr className="bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {columns.map(col => (
                                <th key={col.key} scope="col" className="px-6 py-3">{col.name}</th>
                            ))}
                            <th scope="col" className="px-6 py-3">Actions</th> {/* Added Action column */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredBusinesses.length > 0 ? (
                            filteredBusinesses.map(business => (
                                <tr key={business.id} className="hover:bg-gray-700 transition duration-100 text-sm text-gray-300"> 
                                    {columns.map(col => (
                                        <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                                            
                                            {/* ⭐️ NEW PIN COLUMN LOGIC (View/Edit/QR) ⭐️ */}
                                            {col.key === 'Pin' ? (
                                                <div className="flex items-center space-x-3">
                                                    {/* PIN EDIT MODE (Only for Members/Pins view) */}
                                                    {onUpdateMemberPin && pinBeingEdited === business.id ? (
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                value={newPin}
                                                                // ⭐️ UPDATED: Max 6 digits ⭐️
                                                                onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))}
                                                                maxLength={6}
                                                                className="w-24 px-2 py-1 bg-gray-600 border border-blue-500 rounded-md text-white text-center font-bold placeholder-gray-400"
                                                            />
                                                            <button onClick={() => handleSavePin(business.id)} disabled={newPin.length !== 6} className="text-green-400 hover:text-green-300 text-sm font-medium">Save</button>
                                                            <button onClick={handleCancelEditPin} className="text-red-400 hover:text-red-300 text-sm font-medium">Cancel</button>
                                                        </div>
                                                    ) : (
                                                        // PIN DISPLAY MODE
                                                        <>
                                                            <span className="font-mono text-base">
                                                                {visiblePinId === business.id ? (
                                                                    <span className="text-green-400 font-bold">{business.Pin || 'N/A'}</span>
                                                                ) : (
                                                                    <span className="text-gray-500">{business.Pin ? '••••••' : 'N/A'}</span>
                                                                )}
                                                            </span>

                                                            {business.Pin && (
                                                                <button 
                                                                    onClick={() => togglePinVisibility(business.id)} 
                                                                    className="text-gray-400 hover:text-blue-400 ml-2"
                                                                    aria-label={visiblePinId === business.id ? 'Hide PIN' : 'Show PIN'}
                                                                >
                                                                    {/* Simple Eye Icon placeholder */}
                                                                    <span className="text-lg">{visiblePinId === business.id ? '👁️' : '🔒'}</span> 
                                                                </button>
                                                            )}
                                                            
                                                            {/* ⭐️ NEW: Edit PIN Button ⭐️ */}
                                                            {onUpdateMemberPin && (
                                                                <button 
                                                                    onClick={() => handleEditPinClick(business)} 
                                                                    className="text-blue-400 hover:text-blue-300 ml-2 text-xs font-medium"
                                                                >
                                                                    (Edit)
                                                                </button>
                                                            )}
                                                            
                                                            {/* ⭐️ NEW: Generate QR Button ⭐️ */}
                                                            <button
                                                                onClick={() => handleGenerateQR(business)}
                                                                disabled={!business.Pin || !business['Phone Number']}
                                                                className={`px-2 py-1 rounded-lg transition text-xs font-medium w-24 
                                                                    ${business.Pin && business['Phone Number'] 
                                                                        ? 'bg-green-600 text-white hover:bg-green-700' 
                                                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                                    }`}
                                                            >
                                                                Generate QR
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                // ⭐️ NEW LOGIC for Business Name/Status ⭐️
                                                col.key === 'Business Name' && business.isMultipleBusiness ? (
                                                    <span className="font-medium text-blue-300">
                                                        {business['Business Name']}
                                                    </span>
                                                ) : col.key === 'Status' ? (
                                                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        business.Status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                                        business.Status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                                        business.Status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                                                        'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                                                    }`}>
                                                        {business.Status}
                                                    </span>
                                                ) : (
                                                    // Default rendering
                                                    displayValue(col.key, business[col.key])
                                                )
                                            )}
                                        </td>
                                    ))}
                                    {/* ⭐️ NEW: Delete Member Button Column ⭐️ */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button 
                                            onClick={() => onDeleteMemberClick(business)} 
                                            className="px-3 py-1.5 text-xs bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition shadow-md whitespace-nowrap"
                                        >
                                            Delete Member
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-10 text-center text-gray-500">
                                    No records found matching current filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ⭐️ NEW: QR Code Modal ⭐️ */}
            {qrCodeData && (
                <QRCodeDisplay 
                    phoneNum={qrCodeData.phoneNum} 
                    pin={qrCodeData.pin} 
                    ownerName={qrCodeData.ownerName} // ⭐️ PASS OWNER NAME HERE ⭐️
                    onClose={handleCloseQR} 
                />
            )}
        </div>
    );
};
// ---------------------------------------------
// --- ⭐️ MAIN COMPONENT: AdminDashboard ⭐️ ---
// ---------------------------------------------
function AdminDashboard({ setCurrentView, views, adminName, // ⭐️ ADDED: adminEmail prop with a default placeholder ⭐️
    adminEmail = 'admin@tbt-corp.com',
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // ⭐️ STATE ⭐️
    const [businesses, setBusinesses] = useState([]);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataError, setDataError] = useState(null);
    const [industryOptions, setIndustryOptions] = useState([]);
    
    // ⭐️ NEW: Track if we are adding a Business or a Member Account ⭐️
    const [isAddingNew, setIsAddingNew] = useState(false);
    
    const [activeNavItem, setActiveNavItem] = useState('Dashboard'); 
    const [selectedBusiness, setSelectedBusiness] = useState(null); 
    const [isViewingOnly, setIsViewingOnly] = useState(false); 
    const [successMessage, setSuccessMessage] = useState(null); 
    const [businessToDelete, setBusinessToDelete] = useState(null); 
    const [industryToDelete, setIndustryToDelete] = useState(null);
    // ⭐️ NEW: State for member deletion ⭐️
    const [memberToDelete, setMemberToDelete] = useState(null); 
    // ------------------------------------
    
    
    // ⭐️ 1. Listen for Businesses ⭐️
    useEffect(() => {
        const q = query(collection(db, 'businesses'), orderBy('Created Date', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const businessData = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(), 
                // Ensure the date is a string for consistent parsing later
                'Created Date': doc.data()['Created Date'] instanceof Object && 'toDate' in doc.data()['Created Date'] 
                    ? doc.data()['Created Date'].toDate().toISOString() 
                    : doc.data()['Created Date']
            }));
            setBusinesses(businessData);
            setIsLoading(false);
        }, (error) => {
            console.error("Firestore Business Error:", error);
            setDataError("Failed to load business data.");
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);
    
    // ⭐️ 2. Listen for Members ⭐️
    useEffect(() => {
        const q = query(collection(db, 'members'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const memberData = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(),
                // Ensure the date is a string
                createdAt: doc.data().createdAt instanceof Object && 'toDate' in doc.data().createdAt 
                    ? doc.data().createdAt.toDate().toISOString() 
                    : doc.data().createdAt
            }));
            setMembers(memberData);
        }, (error) => {
            console.error("Firestore Member Error:", error);
            // Member list error is less critical than business list, just log it.
        });
        return () => unsubscribe();
    }, []);
    
    // ⭐️ 3. Fetch Industry Options ⭐️
    useEffect(() => {
        const docRef = doc(db, 'settings', 'global');
        const fetchIndustryOptions = async () => {
            try {
                const docSnap = await getDoc(docRef);
                let options = [];
                if (docSnap.exists() && docSnap.data().industryOptions) {
                    options = docSnap.data().industryOptions;
                }
                setIndustryOptions(options.sort());
            } catch (error) {
                console.error("Error fetching industry options:", error);
                setIndustryOptions(['Unspecified Industry']);
            }
        };
        fetchIndustryOptions();
    }, []);

    // ⭐️ 4. Member Pin List Data (For the new "Business Owner" tab - Includes ALL accounts and handles multiples) ⭐️
    const memberPinListData = useMemo(() => {
        const businessMap = businesses.reduce((acc, business) => {
            const phoneNumber = business['Phone Number'];
            if (phoneNumber) {
                if (!acc[phoneNumber]) {
                    acc[phoneNumber] = [];
                }
                acc[phoneNumber].push(business); // Store array of businesses
            }
            return acc;
        }, {});

        return members.map(member => {
            const phoneNumber = member['Phone Number'];
            const userBusinesses = businessMap[phoneNumber] || [];

            let businessName, industryType, status, isMultipleBusiness;

            if (userBusinesses.length === 0) {
                businessName = 'No Business Registered';
                industryType = 'N/A';
                status = 'Account Only';
                isMultipleBusiness = false;
            } else if (userBusinesses.length === 1) {
                const business = userBusinesses[0];
                businessName = business['Business Name'];
                industryType = business['Industry Type'];
                status = business.Status;
                isMultipleBusiness = false;
            } else {
                // Multiple Businesses
                isMultipleBusiness = true;
                businessName = `${userBusinesses.length} Businesses Registered`;
                
                // Summarize industries
                const uniqueIndustries = [...new Set(userBusinesses.map(b => b['Industry Type']))].join(', ');
                industryType = uniqueIndustries.length < 50 ? uniqueIndustries : 'Multiple Industries';

                // Summarize status: prioritize Pending Review > Active > Mixed
                const hasPending = userBusinesses.some(b => b.Status === 'Pending Review');
                const hasActive = userBusinesses.some(b => b.Status === 'Active');
                if (hasPending) {
                    status = `Multiple: ${userBusinesses.length} (Pending Review)`;
                } else if (hasActive) {
                    status = `Multiple: ${userBusinesses.length} (Active)`;
                } else {
                    status = `Multiple: ${userBusinesses.length} (Mixed)`;
                }
            }

            return {
                id: member.id, // Member ID is crucial for PIN updates
                'Owner Name': member['Owner Name'] || 'N/A',
                'Phone Number': phoneNumber || 'N/A',
                Pin: member.Pin || null,
                
                // Updated Business Info
                'Business Name': businessName,
                'Industry Type': industryType,
                Status: status,
                'Created Date': userBusinesses[0]?.['Created Date'] || member.createdAt,
                isMultipleBusiness: isMultipleBusiness, // Flag for rendering
            };
        }).sort((a, b) => {
            const dateA = new Date(a['Created Date'] || a.createdAt).getTime();
            const dateB = new Date(b['Created Date'] || b.createdAt).getTime();
            return dateB - dateA; // Sort descending
        });
    }, [businesses, members]);


    // ⭐️ NEW HANDLER: Add Member Account (Simplified logic from user's file) ⭐️
    const handleAddMemberAccount = async (newMemberData) => {
        setIsLoading(true);
        try {
            const collectionRef = collection(db, 'members');
            await addDoc(collectionRef, {
                ...newMemberData,
                createdAt: new Date().toISOString(), // Timestamp for the new member account
            });
            setSuccessMessage(`Member '${newMemberData['Owner Name']}' added successfully!`);
            handleBackToList(); // Go back to the list view
        } catch (err) {
            console.error("Failed to add new member:", err);
            setSuccessMessage("Failed to add new member account. Please check console for details.");
        } finally {
            setIsLoading(false);
        }
    };
    // ⭐️ END NEW HANDLER ⭐️

    // ⭐️ NEW HANDLER: Add Business (Unchanged but included for completeness) ⭐️
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
            handleBackToList(); 
        } catch (err) {
            console.error("Failed to add new business:", err);
            setSuccessMessage("Failed to add new business. Please check console for details.");
        } finally {
            setIsLoading(false);
        }
    };
    // ⭐️ END NEW HANDLER ⭐️

    // ⭐️ NEW HANDLER: Update Member PIN ⭐️
    const handleUpdateMemberPin = useCallback(async (memberId, newPin) => {
        setIsLoading(true);
        try {
            const memberRef = doc(db, 'members', memberId);
            await updateDoc(memberRef, { Pin: newPin });
            setSuccessMessage("Member PIN updated successfully!");
            return true; // Indicate success
        } catch (err) {
            console.error("Failed to update PIN:", err);
            setSuccessMessage("Failed to update PIN. Please try again."); // Use toast for error
            return false; // Indicate failure
        } finally {
            setIsLoading(false);
        }
    }, [setSuccessMessage]);
    // ⭐️ END NEW HANDLER ⭐️

    // ⭐️ HANDLER: Delete Member Account ⭐️
    const handleDeleteMemberClick = (member) => {
        setMemberToDelete(member);
    };

    const handleConfirmDeleteMember = async () => {
        if (!memberToDelete) return;

        setIsLoading(true);
        const name = memberToDelete['Owner Name'];
        try {
            const memberRef = doc(db, 'members', memberToDelete.id);
            await deleteDoc(memberRef);
            setSuccessMessage(`Member account '${name}' deleted successfully!`);
            setMemberToDelete(null);
        } catch (err) {
            setDataError("Failed to delete member account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelDeleteMember = () => {
        setMemberToDelete(null);
    };
    // ⭐️ END HANDLER: Delete Member Account ⭐️

    // ⭐️ HANDLERS (Unchanged) ⭐️
    const handleUpdateData = useCallback(async (businessId, updatedFields) => {
        setIsLoading(true);
        try {
            const businessRef = doc(db, 'businesses', businessId);
            await updateDoc(businessRef, updatedFields);
        } catch (err) {
            setDataError("Failed to save changes. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleConfirmDeleteBusiness = async () => {
        if (!businessToDelete) return;

        setIsLoading(true);
        const name = businessToDelete['Business Name'];
        try {
            const businessRef = doc(db, 'businesses', businessToDelete.id);
            await deleteDoc(businessRef);
            setSuccessMessage(`Business '${name}' deleted successfully!`);
            setBusinessToDelete(null);
            setSelectedBusiness(null);
        } catch (err) {
            setDataError("Failed to delete business. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelDeleteBusiness = () => {
        setBusinessToDelete(null);
    };
    
    const handleConfirmDeleteIndustry = async () => {
        if (!industryToDelete) return;
        try {
            const docRef = doc(db, 'settings', 'global');
            await setDoc(docRef, { industryOptions: arrayRemove(industryToDelete) }, { merge: true });
            setIndustryOptions(prev => prev.filter(opt => opt !== industryToDelete));
            setSuccessMessage(`Industry '${industryToDelete}' deleted successfully!`);
            setIndustryToDelete(null);
        } catch (err) {
            setSuccessMessage("Failed to delete industry. Please try again.");
        }
    };

    const handleCancelDeleteIndustry = () => {
        setIndustryToDelete(null);
    };

    const handleAddIndustry = async (newIndustryName) => {
        const trimmedName = newIndustryName ? newIndustryName.trim() : '';
        if (!trimmedName) { return; }
        try {
            const docRef = doc(db, 'settings', 'global');
            await setDoc(docRef, { industryOptions: arrayUnion(trimmedName) }, { merge: true });
            setIndustryOptions(prev => [...prev.filter(opt => opt !== trimmedName), trimmedName].sort());
        } catch (err) {
            throw err;
        }
    };

    const handleDeleteIndustry = async (industryName) => {
        try {
            const docRef = doc(db, 'settings', 'global');
            await setDoc(docRef, { industryOptions: arrayRemove(industryName) }, { merge: true });
            setIndustryOptions(prev => prev.filter(opt => opt !== industryName));
        } catch (err) {
            throw err;
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setCurrentView(views.HOME);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const handleViewEditClick = (business) => {
        setSelectedBusiness(business);
        setIsViewingOnly(false);
    };

    const handleBackToList = () => {
        setSelectedBusiness(null);
        setIsAddingNew(false);
        setIsViewingOnly(false);
    };

    const handleViewOnlyClick = (business) => {
        setSelectedBusiness(business);
        setIsViewingOnly(true);
    };

    const handleDeleteClick = (business) => { setBusinessToDelete(business); };
    const handleCloseToast = useCallback(() => { setSuccessMessage(null); }, []);
    
    const handleNavClick = (itemName) => {
        setActiveNavItem(itemName);
        handleBackToList(); // Reset view when navigating
    };

    // Helper to determine the main title
    const getPageTitle = () => {
        if (isAddingNew) { return activeNavItem === 'Businesses' ? "Register New Business" : "Register New Member Account"; }
        if (selectedBusiness) { return isViewingOnly ? `Viewing: ${selectedBusiness['Business Name']}` : `Editing: ${selectedBusiness['Business Name']}`; }
        return activeNavItem;
    };
    
    // ⭐️ RENDER CONTENT ⭐️
    const renderContent = () => {
        if (isLoading && activeNavItem !== 'Business Owner') {
            return (<div className="bg-gray-800 p-8 rounded-xl shadow-lg h-96 flex items-center justify-center"><p className="text-2xl text-white font-light">Loading data from Firestore... 🔄</p></div>);
        }
        if (dataError) { return (<div className="bg-red-800 p-8 rounded-xl shadow-lg h-96 flex items-center justify-center"><p className="text-2xl text-white font-light">❌ Data Error: {dataError}</p></div>); }

        // 1. Add Form View
        if (isAddingNew) {
            if (activeNavItem === 'Businesses') {
                return (
                    <AddBusinessForm 
                        // ⭐️ FIX: The crucial change to force form remount on new member ⭐️
                        key={members.length} 
                        onAddBusiness={handleAddBusiness} 
                        onCancel={handleBackToList} 
                        industryOptions={industryOptions} 
                        // IMPORTANT: Pass the members list for the dropdown
                        memberList={members} 
                    />
                );
            } else if (activeNavItem === 'Business Owner') {
                // This is the correct form for the 'Business Owner' tab's Add New button
                return (
                    <AddMemberAccountForm 
                        onAddMember={handleAddMemberAccount} 
                        onCancel={handleBackToList} 
                    />
                );
            }
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
                    title="Businesses by Industry Type" 
                />
            );
        }

        // 4. Businesses List View (Kanban by Status)
        if (activeNavItem === 'Businesses') {
             return (
                <KanbanBoard 
                    businessData={businesses} 
                    onSelectBusiness={handleViewEditClick} 
                    groupByField={'Status'} 
                    title="Business Application Status" 
                />
            );
        }
        
        // 5. Business Owner List View (Combined Member/Business Data)
        if (activeNavItem === 'Business Owner') {
            return (
                <BusinessOwnerListView 
                    businesses={memberPinListData}
                    industryOptions={industryOptions}
                    onUpdateMemberPin={handleUpdateMemberPin}
                    setSuccessMessage={setSuccessMessage}
                    onDeleteMemberClick={handleDeleteMemberClick}
                />
            );
        }

        // 6. Settings View
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
    // ⭐️ END RENDER CONTENT ⭐️


    return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>
        )}

        {/* 1. LEFT SIDEBAR (Dark, eye-catchy blue accent) */}
        <nav className={`fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700 p-4 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:relative md:translate-x-0 md:block`}>
            <div className="flex flex-col h-full">
                {/* ⭐️ NEW: Logo, Admin Name, and Email at the TOP ⭐️ */}
                <div className="flex flex-col items-center pb-6 mb-6 border-b border-gray-700">
                    {/* Logo/Avatar Placeholder (Simple, eye-catchy blue circle) */}
                    <img src="/tbtlogo.jpg" alt="TBT Admin Logo" className="h-12 w-auto mx-auto rounded-full" // Set height, auto width, and center it
                    /> 
                    {/* Admin Name */}
                    <p className="text-lg font-bold text-white mb-0.5">{adminName}</p>
                    {/* Admin Email */}
                    {/* <p className="text-sm text-gray-400 font-light truncate max-w-full px-2">{adminEmail}</p> */}
                </div>
                {/* ⭐️ END NEW TOP SECTION ⭐️ */}
                <ul className="flex-grow space-y-2">
                    {dashboardNavItems.map(item => (
                        <li key={item.name}>
                            <button
                                onClick={() => handleNavClick(item.name)}
                                className={`w-full text-left flex items-center p-3 rounded-lg transition duration-150 cursor-pointer ${
                                    activeNavItem === item.name 
                                        ? 'bg-blue-600 text-white shadow-lg' 
                                        : 'text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                
                {/* Mobile close button */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white md:hidden"
                    aria-label="Close menu"
                >
                    &times;
                </button>
            </div>
        </nav>

        {/* 2. MAIN CONTENT AREA */}
        <div className="flex flex-col flex-1 overflow-y-auto">
            {/* TOP HEADER */}
            <header className="flex items-center justify-between p-4 sm:p-6 bg-gray-800 border-b border-gray-700 sticky top-0 z-20 shadow-md">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-gray-400 hover:text-white md:hidden mr-4"
                    aria-label="Open menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>

                <h1 className="text-xl sm:text-2xl font-bold text-white truncate max-w-[50%] sm:max-w-none">
                    {getPageTitle()}
                </h1>

                <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* Conditional "Add New" Button */}
                    {!isAddingNew && !selectedBusiness && (activeNavItem === 'Businesses' || activeNavItem === 'Business Owner') && (
                        <button 
                            onClick={() => setIsAddingNew(true)}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base cursor-pointer"
                        >
                            + Add New
                        </button>
                    )}
                    
                    <button onClick={handleLogout} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition duration-150 shadow-md whitespace-nowrap text-sm sm:text-base cursor-pointer">
                        Logout
                    </button>
                </div>
            </header>

            <div className="p-4 sm:p-6 flex-1">
                {renderContent()}
            </div>
            
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

            {/* ⭐️ 3. Delete Modal for MEMBERS ⭐️ */}
            {memberToDelete && (
                <ConfirmModal 
                    itemName={memberToDelete['Owner Name']} 
                    itemType="Member Account" // Item type changed to Member Account
                    onConfirm={handleConfirmDeleteMember} 
                    onCancel={handleCancelDeleteMember}
                />
            )}

            {/* Success Toast */}
            {successMessage && (<SuccessToast message={successMessage} onClose={handleCloseToast} />)}
        </div>
    </div>
  );
}
export default AdminDashboard;