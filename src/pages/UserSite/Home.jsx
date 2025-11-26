
// // import React, { useState, useEffect } from 'react';
// // import { db } from '../../firebase';
// // import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

// // const MEMBER_DATA_KEY = 'tbt_member_data';

// // // ⭐️ Button Spinner (From MemberAuth.jsx) ⭐️
// // const ButtonSpinner = () => (
// //     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //     </svg>
// // );

// // // -----------------------------------------------------------------
// // // ⭐️ MEMBER LOGIN/REGISTRATION FORM (Embedded in Home) ⭐️
// // // -----------------------------------------------------------------
// // function MemberLoginRegistrationForm({ setCurrentView, views, onMemberLoginSuccess }) {
// //     const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login/Register
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const [successMsg, setSuccessMsg] = useState('');

// //     const [ownerName, setOwnerName] = useState('');
// //     const [phoneNumber, setPhoneNumber] = useState('');
// //     const [memberCode, setMemberCode] = useState(''); // 6 digit code

// //     const handleClearFormAndStorage = (newIsRegisteringValue) => {
// //         localStorage.removeItem(MEMBER_DATA_KEY);
        
// //         setOwnerName('');
// //         setPhoneNumber('');
// //         setMemberCode('');
        
// //         setIsRegistering(newIsRegisteringValue);
// //         setError('');
// //         setSuccessMsg('');
// //     };

// //     // ⭐️ REGISTRATION LOGIC - Shows success message, then switches to Login view ⭐️
// //     const handleRegister = async (e) => {
// //         e.preventDefault();
// //         setError('');
// //         setSuccessMsg('');
        
// //         if (memberCode.length !== 6) {
// //             setError("Member code must be exactly 6 digits.");
// //             return;
// //         }

// //         setIsLoading(true);
// //         try {
// //             // 1. Check if phone number already exists
// //             const q = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber));
// //             const querySnapshot = await getDocs(q);

// //             if (!querySnapshot.empty) {
// //                 setError("ထိုဖုန်းနံပါတ်ဖြင့်registerပြုလုပါပီးဖြစ်ပါသည်။တခြားဖုန်းနံပါတ်ဖြင့်registerပြုလုပ်ပါ။");
// //                 setIsLoading(false);
// //                 return;
// //             }

// //             // 2. Create new member
// //             const newMemberBaseData = {
// //                 'Owner Name': ownerName,
// //                 'Phone Number': phoneNumber,
// //                 'Pin': memberCode, 
// //                 createdAt: new Date().toISOString(),
// //                 role: 'member'
// //             };

// //             await addDoc(collection(db, 'members'), newMemberBaseData);
            
// //             // Clear registration-specific form state
// //             setOwnerName(''); 
// //             setPhoneNumber(''); 
// //             setMemberCode(''); 
            
// //             // ⭐️ STEP 3: Show success message and switch to login view ⭐️
// //             setSuccessMsg("Registerလုပ်ခြင်းအောင်မြင်ပါသည်။Phone numberနဲ့Member code (6)လုံးပြန်ရိုက်ထည့်ပီး loginပြန်၀င်ပါ။");
// //             setIsRegistering(false); // Switch to the Login view
            
// //         } catch (err) {
// //             console.error("Registration Error:", err);
// //             setError("Failed to register. Please try again.");
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     // ⭐️ LOGIN LOGIC - Handles navigation to MemberDashboard ⭐️
// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         setError('');
// //         setSuccessMsg(''); // Clear any pending success message from registration
// //         setIsLoading(true);

// //         if (memberCode.length !== 6) {
// //             setError("The Member Code must be exactly 6 digits.");
// //             setIsLoading(false);
// //             return;
// //         }


// //         try {
// //             const q = query(
// //                 collection(db, 'members'), 
// //                 where('Phone Number', '==', phoneNumber),
// //                 where('Pin', '==', memberCode) 
// //             );
// //             const querySnapshot = await getDocs(q);

// //             if (!querySnapshot.empty) {
// //                 const memberDoc = querySnapshot.docs[0];
// //                 const memberData = memberDoc.data();
                
// //                 const loggedInMemberData = {
// //                     ...memberData,
// //                     uid: memberDoc.id
// //                 };
                
// //                 // ⭐️ DEBUGGING STEP: Check console immediately after hitting Login ⭐️
// //                 console.log("LOGIN SUCCESSFUL. Attempting navigation with data:", loggedInMemberData);
// //                 // -------------------------------------------------------------

// //                 if (typeof onMemberLoginSuccess === 'function') {
// //                     // Call the success handler, which MUST navigate
// //                     onMemberLoginSuccess(loggedInMemberData); 
                    
// //                     // Clear state *after* navigation is triggered
// //                     setPhoneNumber('');
// //                     setMemberCode('');
// //                 } else {
// //                     // Debugging fallback: If the function is missing, alert the developer
// //                     console.error("onMemberLoginSuccess prop is missing or not a function.");
// //                     alert("Login Successful! But app navigation failed. Check parent component.");
// //                     setPhoneNumber('');
// //                     setMemberCode('');
// //                 }
                
// //                 setIsLoading(false); 
                
// //             } else {
// //                 // Login failed: invalid credentials
// //                 setError("Phone numberနဲ့Member codeအားပြန်ရိုက်ထည့်ပါ");
// //                 setIsLoading(false); 
// //             }
// //         } catch (err) {
// //             // General Firebase/Network Error
// //             console.error("Login Error (Network/Query Failed):", err);
// //             setError("Login failed. Check console for network errors.");
// //             setIsLoading(false);
// //         } 
// //     };

// //     return (
// //         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-10 overflow-hidden">
// //             <div className="w-full max-w-md p-8 rounded-xl  border-4 border-gray-200 bg-white shadow-2xl">
                
// //                 <h2 className="text-3xl font-bold text-center text-black mb-2">
// //                     {isRegistering ? 'Member Accountသစ်ဖန်တီးရန်' : 'Member Login ၀င်ရန်'}
// //                 </h2>
// //                 <p className="text-center text-gray-800 mb-8 font-light">
// //                     {isRegistering ? 'Join TBT to connect with businesses.' : 'Securely access your member portal.'}
// //                 </p>

// //                 {/* ERROR/SUCCESS MESSAGES */}
// //                 {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>}
// //                 {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">{successMsg}</div>}

// //                 <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
                    
// //                     {/* Owner Name (Only for Registration) */}
// //                     {isRegistering && (
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700">Owner Name ဖြည့်ရနိ</label>
// //                             <input 
// //                                 type="text" 
// //                                 required 
// //                                 value={ownerName} 
// //                                 onChange={(e) => setOwnerName(e.target.value)} 
// //                                 className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" 
// //                                 autoComplete="name" 
// //                                 data-lpignore="true"
// //                             />
// //                         </div>
// //                     )}

// //                     {/* Phone Number */}
// //                     <div>
// //                         <label className="block text-md font-medium text-gray-700">Phone Number ဖြည့်ရနိ</label>
// //                         <input 
// //                             type="text" 
// //                             required 
// //                             value={phoneNumber} 
// //                             onChange={(e) => setPhoneNumber(e.target.value)} 
// //                             placeholder="e.g., 09xxxxxxxxx"
// //                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition" 
// //                             autoComplete="off" // Ensures no browser autofill
// //                             data-lpignore="true"
// //                         />
// //                     </div>

// //                     {/* 6-Digit Code */}
// //                     <div>
// //                         <label className="block text-md font-medium text-gray-700">6-Digit Member Code ဖြည့်ရနိ</label>
// //                         <input 
// //                             type="text" 
// //                             required 
// //                             maxLength="6"
// //                             value={memberCode} 
// //                             onChange={(e) => {
// //                                 const val = e.target.value.replace(/[^0-9]/g, '');
// //                                 setMemberCode(val);
// //                             }} 
// //                             placeholder="123456"
// //                             className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition" 
// //                             autoComplete="off" // Ensures no browser autofill
// //                             data-lpignore="true"
// //                         />
// //                     </div>

// //                     <button 
// //                         type="submit" 
// //                         disabled={isLoading}
// //                         className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
// //                             ${isLoading 
// //                                 ? 'bg-blue-600 text-white opacity-80 cursor-not-allowed' 
// //                                 : 'text-black bg-blue-400 hover:bg-blue-700 hover:text-white cursor-pointer'
// //                             }`
// //                         }
// //                     >
// //                         {isLoading ? (
// //                             <>
// //                                 <ButtonSpinner />
// //                                 Processing...
// //                             </>
// //                         ) : (
// //                             isRegistering ? 'Account registerလုပ်ရန်' : 'Login၀င်ရန်'
// //                         )}
// //                     </button>
// //                 </form>

// //                 {/* Toggle Login/Register */}
// //                 <div className="mt-8 text-center text-sm">
// //                     {isRegistering ? (
// //                         <p className="text-gray-600">Memberဖြစ်ပါက <button onClick={() => handleClearFormAndStorage(false)} className="text-md text-blue-600 font-bold hover:text-blue-800 cursor-pointer transition">Loginပြန်၀င်ပါ</button></p>
// //                     ) : (
// //                         <p className="text-gray-600 text-md">Memberအသစ်ဖြစ်ပါက  <button onClick={() => handleClearFormAndStorage(true)} className="text-blue-800 text-lg cursor-pointer font-bold hover:text-blue-700  transition">accountအသစ်ဖန်တီးရန်</button></p>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // // -----------------------------------------------------------------
// // // ⭐️ MAIN HOME COMPONENT ⭐️
// // // -----------------------------------------------------------------
// // function Home({ setCurrentView, views, onMemberLoginSuccess = () => {} }) {
    
// //     const navigateToAdminLogin = () => {
// //         setCurrentView(views.ADMIN_LOGIN);
// //     };

// //     return (
// //         <div className="min-h-screen bg-gray-100">
          
// //             <header className="p-4 bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
// //                 <div className="container mx-auto flex items-center justify-between">
                    
// //                     <div className="flex items-center space-x-3 cursor-pointer">
// //                          <img 
// //                             src="/tbtlogo.jpg" 
// //                             alt="TBT Logo" 
// //                             className="h-10 sm:h-12 w-auto rounded-full" 
// //                         />
// //                         <div>
// //                              <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 tracking-tight">Thursday Business Talk</h1>
// //                         </div>
// //                     </div>

// //                     <button 
// //                         onClick={navigateToAdminLogin}
// //                         className="sm:px-6 py-2 px-4 py-1 cursor-pointer bg-blue-400 text-gray-800 font-medium rounded-full hover:bg-blue-800 hover:text-white transition duration-150 shadow-md text-base"
// //                      >
// //                         Admin Login
// //                      </button>
// //                 </div>
// //             </header>
    
// //             <main className="container mx-auto">
// //                 <MemberLoginRegistrationForm 
// //                     setCurrentView={setCurrentView} 
// //                     views={views}
// //                     onMemberLoginSuccess={onMemberLoginSuccess}
// //                 />
// //             </main>
// //         </div>
// //       );
// // }

// // export default Home;
// // File: Home.jsx (Updated to unify Home and Member Business List)
// // File: Home.jsx (The Unified Home Page)
// import React, { useEffect } from 'react';
// // ⭐️ You must ensure these new components exist in the correct path ⭐️
// import MemberAuth from './MemberAuth'; // Your login/register form
// import MemberBusinessList from './MemberBusinessList'; // The component that lists businesses

// const MEMBER_DATA_KEY = 'tbt_member_data'; // Re-used for auto-login check

// // This component expects memberUser state and a function to update it from the parent App component.
// function Home({ setCurrentView, views, memberUser, onMemberLoginSuccess }) {
    
//     // --- Auto-Login Check (Ensures user stays logged in after refresh) ---
//     useEffect(() => {
//         // If the user is already set (logged in), do nothing.
//         if (memberUser) return; 

//         const storedMemberData = localStorage.getItem(MEMBER_DATA_KEY);
//         if (storedMemberData) {
//             try {
//                 const memberData = JSON.parse(storedMemberData);
//                 // Call the success handler in the parent to set memberUser state
//                 onMemberLoginSuccess(memberData);
//             } catch (e) {
//                 console.error("Error parsing stored member data, clearing storage:", e);
//                 localStorage.removeItem(MEMBER_DATA_KEY);
//             }
//         }
//     }, [memberUser, onMemberLoginSuccess]);


//     // --- Dynamic Header Button Logic (The boss's requirement) ---
//     const renderHeaderButton = () => {
//         if (memberUser) {
//             // Logged in: Button takes them to the secondary dashboard page (e.g., account settings, new business form)
//             return (
//                 <button 
//                     onClick={() => setCurrentView(views.MEMBER_DASHBOARD)} // Or views.BUSINESS_REGISTER
//                     className="sm:px-6 py-2 px-4 py-1 cursor-pointer bg-blue-600 text-white font-medium rounded-full hover:bg-blue-800 transition duration-150 shadow-md text-base"
//                  >
//                     Member Dashboard
//                  </button>
//             );
//         }
        
//         // Not logged in: Show the Admin Login button
//         return (
//             <button 
//                 onClick={() => setCurrentView(views.ADMIN_LOGIN)}
//                 className="sm:px-6 py-2 px-4 py-1 cursor-pointer bg-blue-400 text-gray-800 font-medium rounded-full hover:bg-blue-800 hover:text-white transition duration-150 shadow-md text-base"
//              >
//                 Admin Login
//              </button>
//         );
//     }
    
//     // --- Conditional Main Content Logic (The core router) ---
//     const renderMainContent = () => {
//         if (memberUser) {
//             // ⭐️ 1. LOGGED IN: Show the list of the member's active businesses ⭐️
//             return (
//                 <MemberBusinessList 
//                     memberUser={memberUser} 
//                     views={views}
//                     setCurrentView={setCurrentView}
//                 />
//             );
//         }
        
//         // ⭐️ 2. NOT LOGGED IN: Show the Login/Registration form ⭐️
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-10 overflow-hidden">
//                 <MemberAuth
//                     setCurrentView={setCurrentView} 
//                     views={views}
//                     onMemberLoginSuccess={onMemberLoginSuccess}
//                 />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100">
          
//             {/* Header: Always show Home title, and the dynamic button */}
//             <header className="p-4 bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
//                 <div className="container mx-auto flex items-center justify-between">
                    
//                     <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView(views.HOME)}>
//                          <img 
//                             src="/tbtlogo.jpg" 
//                             alt="TBT Logo" 
//                             className="h-10 sm:h-12 w-auto rounded-full" 
//                         />
//                         <div>
//                              <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 tracking-tight">Thursday Business Talk</h1>
//                         </div>
//                     </div>

//                     {renderHeaderButton()}
//                 </div>
//             </header>
    
//             <main>
//                 {renderMainContent()}
//             </main>
//         </div>
//       );
// }

// export default Home;
// File: Home.jsx (The Unified Home Page)
// File: Home.jsx (UPDATED)
// import React, { useState, useEffect, useMemo } from 'react';
// import PopUpModal from '../../components/PopUpModal.jsx'; 
// import { db } from '../../firebase'; 
// import { collection, query, where, onSnapshot } from 'firebase/firestore'; 

// // ⭐️ NEW COMPONENT: Loading Spinner (Reusable) ⭐️
// const LoadingSpinner = () => (
//     <div className="flex flex-col items-center justify-center py-12 col-span-full">
//         <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//         </svg>
//         <p className="mt-3 text-lg text-gray-500">Loading Businesses...</p>
//     </div>
// );

// // --- Card Component ---
// const CardBox = ({ business, onModalOpen }) => (
//     // Card Design: White background, subtle shadow, blue hover effect
//     <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 hover:border-blue-300 flex flex-col justify-between">
//         <div>
//             {/* Business Name: Prominent Gray/Black */}
//             <h3 className="text-xl font-semibold text-gray-800">{business['Business Name']}</h3>
            
//             {/* Industry Type: Light Blue Accent */}
//             <p className="text-sm text-blue-700 mt-1 mb-3 bg-blue-100 px-2 py-0.5 inline-block rounded-full font-medium">
//                 {business['Industry Type']}
//             </p>
//         </div>
//         <button 
//             onClick={() => onModalOpen(business)} 
//             // Button: Strong Blue for contrast
//             className="w-full mt-4 py-2 bg-blue-300 text-gray-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition duration-150 shadow-md cursor-pointer"
//         >
//             View Details
//         </button>
//     </div>
// );

// function Home({ setCurrentView, views }) {
//   // ... (State hooks and useEffect for Firebase remain exactly the same as before) ...
//   const [businesses, setBusinesses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [dataError, setDataError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeFilter, setActiveFilter] = useState('All'); 
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
  
//   // Firebase Fetch Logic (Same as before)
//   useEffect(() => {
//     const q = query(collection(db, 'businesses'), where('Status', '==', 'Active'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//         setBusinesses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//         setIsLoading(false);
//     }, (err) => { setIsLoading(false); });
//     return () => unsubscribe();
//   }, []); 

//   // Filter Logic (Same as before)
//   const DYNAMIC_FILTER_CATEGORIES = useMemo(() => {
//     const uniqueIndustries = [...new Set(businesses.map(b => b['Industry Type']))].filter(Boolean).sort();
//     return ['All', ...uniqueIndustries];
//   }, [businesses]);
  
//   const filteredBusinesses = useMemo(() => {
//     return businesses
//       .filter(b => activeFilter === 'All' || b['Industry Type'] === activeFilter)
//       .filter(b => {
//           const s = searchTerm.toLowerCase();
//           return b['Business Name']?.toLowerCase().includes(s) || 
//                  b['Industry Type']?.toLowerCase().includes(s) || 
//                  b['Physical Address']?.toLowerCase().includes(s) || 
//                  b['Owner Name']?.toLowerCase().includes(s);
//       });
//   }, [businesses, activeFilter, searchTerm]);

//   const handleModalOpen = (b) => { setSelectedBusiness(b); setIsModalOpen(true); };
//   const handleModalClose = () => { setIsModalOpen(false); setSelectedBusiness(null); };
  
//   // ... (Loading/Error renders same as before) ...

//   return (
//     // Main Background: Light Gray
//     <div className="min-h-screen bg-gray-100">
      
//       {/* 1. HEADER SECTION - ⭐️ DESIGN UPDATED FOR NEW LAYOUT ⭐️ */}
//       <header className="p-6 bg-white shadow-lg sticky top-0 z-10">
//         <div className="container mx-auto">
            
//             {/* TOP ROW: Title/Text centered, Logo positioned absolutely right */}
//             <div className="flex justify-center items-center relative pb-3">
                
//                 {/* Title/Text (Centered) */}
//                 <div className="flex flex-col items-center">
//                     <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">TBT Website </h1>
//                     <p className="text-md text-gray-800 mt-1 font-light">This is TBT Business Matching Portal Website</p>
//                 </div>

//                 {/* Logo (Top Right - absolute positioning) */}
//                 <img 
//                     src="/tbtlogo.jpg" 
//                     alt="TBT Logo" 
//                     className="absolute right-0 top-0 h-10 sm:h-12 w-auto rounded-full" 
//                 />
//             </div>

//             {/* BOTTOM ROW: Buttons (Centered under the text, separated by a light line) */}
//             <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
                 
//                  {/* MEMBER LOGIN (Light Blue Accent, rounded full) */}
//                  <button
//                     onClick={() => setCurrentView(views.MEMBER_AUTH)} 
//                     className="px-6 py-2 cursor-pointer bg-blue-300 text-gray-700 font-medium rounded-full hover:bg-blue-600 hover:text-white transition duration-150 shadow-md text-base"
//                 >
//                     Member Login
//                 </button>

//                 {/* ADMIN LOGIN (Darker Blue, rounded full) */}
//                  <button 
//                     onClick={() => setCurrentView(views.ADMIN_LOGIN)}
//                     className="px-6 py-2 cursor-pointer bg-blue-400 text-gray-800 font-medium rounded-full hover:bg-blue-800 hover:text-white transition duration-150 shadow-md text-base"
//                  >
//                     Admin Login
//                  </button>
//             </div>
//         </div>
//       </header>

//       {/* 2. MAIN CONTENT (Search, Filter, Grid) */}
//       <main className="container mx-auto p-4 pt-8">
//         <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Please Search Businesses</h2>
//             <span className="text-blue-600">{businesses.length} Active Business</span> 
//             <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch">
//                 <input 
//                     type="text" 
//                     placeholder="Search by name, type, or location..." 
//                     value={searchTerm} 
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                     // Search Input: Clean border focus
//                     className="w-full flex-grow p-3 border border-gray-300 rounded-lg focus:border-gray-500  focus:outline-none" 
//                 />
//                 <div className="relative w-full md:w-1/4">
//                     <select 
//                         value={activeFilter} 
//                         onChange={(e) => setActiveFilter(e.target.value)} 
//                         // Select Input: Clean border
//                         className="appearance-none w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-blue-300 focus:outline-none"
//                     >
//                         {DYNAMIC_FILTER_CATEGORIES.map(type => <option key={type} value={type}>{type === 'All' ? 'Filter by Type' : type}</option>)}
//                     </select>
//                 </div>
//             </div>
//         </div>

//         {/* Filter Buttons: Scrollable, light blue accent */}
//         <div className="flex space-x-3 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
//             {DYNAMIC_FILTER_CATEGORIES.map(category => (
//                 <button 
//                     key={category} 
//                     onClick={() => setActiveFilter(category)} 
//                     className={`py-2 px-4 rounded-full font-medium text-sm whitespace-nowrap transition duration-150 
//                         ${activeFilter === category 
//                             ? 'bg-blue-600 text-white shadow-md' 
//                             : 'text-gray-700 bg-white border border-gray-200 hover:bg-blue-50 hover:text-gray-700'
//                         }`}
//                 >
//                     {category === 'All' ? 'All Types' : category}
//                 </button>
//             ))}
//         </div>

//         {/* Business Grid */}
//         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {isLoading ? (
//                 // ⭐️ MODIFIED: Using the new spinner component ⭐️
//                 <LoadingSpinner />
//             ) : filteredBusinesses.length > 0 ? (
//                 filteredBusinesses.map(b => <CardBox key={b.id} business={b} onModalOpen={handleModalOpen} />)
//             ) : <p className="col-span-full text-center text-gray-500">No active businesses found matching your criteria.</p>}
//         </div>
//       </main>

//       {isModalOpen && <PopUpModal onClose={handleModalClose} data={selectedBusiness} />}
//     </div>
//   );
// }
// export default Home;
// File: src/pages/UserSite/Home.jsx (FINAL UPDATE)

import React from 'react';

// ⭐️ Import the new conditional views ⭐️
import ActiveBusinessDirectory from './ActiveBusinessDirectory'; 
import MemberLoginRegistrationForm from './MemberLoginRegistrationForm'; 

// -----------------------------------------------------------------
// ⭐️ MAIN HOME COMPONENT (The Gatekeeper) ⭐️
// -----------------------------------------------------------------
function Home({ setCurrentView, views, memberUser, onMemberLoginSuccess, onMemberLogout }) {
  
  // --- Dynamic Header Buttons ---
  const renderHeaderButton = () => {
    if (memberUser) {
        // Logged in: Show Dashboard button and Logout button
        return (
            <div className="flex space-x-3 items-center">
                <p className="hidden sm:block text-sm font-medium text-gray-700">
                Homepageမှကြိုဆိုပါသည်, {memberUser['Owner Name'] || 'Member'}
                </p>
                <button 
                    onClick={() => setCurrentView(views.MEMBER_DASHBOARD)} 
                    className="sm:px-4 py-2 px-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-800 transition duration-150 shadow-md text-sm cursor-pointer"
                >
                   Go to dashboard
                </button>
                 <button 
                    onClick={onMemberLogout} // Call the logout handler from App.jsx
                    className="sm:px-4 py-2 px-3 bg-red-500 text-black font-medium rounded-full hover:bg-red-600 hover:text-white transition duration-150 shadow-md text-sm cursor-pointer"
                >
                    Logout
                </button>
            </div>
        );
    }
    
    // Not logged in: Only show the Admin Login button
    return (
        <div className="flex space-x-3 items-center">
             <button 
                onClick={() => setCurrentView(views.ADMIN_LOGIN)}
                className="px-4 py-2 cursor-pointer bg-blue-800 text-white font-medium rounded-full hover:bg-blue-900 transition duration-150 shadow-md text-sm"
             >
                Admin Login
             </button>
        </div>
    );
  }
  
  // ⭐️ CRITICAL FIX: CONDITIONAL MAIN CONTENT ⭐️
// File: Home.jsx

const renderMainContent = () => {
    
    // ⭐️ FIX 3: If member is logged in, force the redirect to the full dashboard ⭐️
    if (memberUser) {
        // This stops Home.jsx from rendering the incomplete directory
        return <ActiveBusinessDirectory />;
    }               
    
    // If not logged in, continue with the login/registration form
    return (
        <>
            <MemberLoginRegistrationForm
                onMemberLoginSuccess={onMemberLoginSuccess}
            />
            {/* If you have ActiveBusinessDirectory here, it only renders when logged out */}
        </>
    );
}

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* 1. HEADER SECTION */}
      <header className="p-4 bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between">
            
            {/* LEFT SIDE: Logo and Title/Text (Same as previous step) */}
            <div 
                className="flex items-center space-x-3 cursor-pointer" 
                onClick={() => setCurrentView(views.HOME)}
            >
                 <img 
                    src="/tbtlogo.jpg" 
                    alt="TBT Logo" 
                    className="h-10 sm:h-12 w-auto rounded-full" 
                />
                <div>
                     <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 tracking-tight">Thursday Business Talk</h1>
                </div>
            </div>

            {/* RIGHT SIDE: Dynamic Buttons */}
            {renderHeaderButton()}
        </div>
      </header>

      {/* 2. MAIN CONTENT (Conditional Rendering) */}
      <main className="container mx-auto p-4 pt-8">
          {renderMainContent()}
      </main>
    </div>
  );
}
export default Home;