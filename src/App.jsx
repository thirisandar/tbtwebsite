// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from "./pages/UserSite/Home.jsx";

// import AdminLogin from "./pages/Admin/AdminLogin.jsx";
// import BusinessRegister from "./pages/Admin/BusinessRegister.jsx";
// import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// import MemberAuth from "./pages/UserSite/MemberAuth.jsx"; 
// import MemberDashboard from "./pages/UserSite/MemberDashboard.jsx"; 

// import { INITIAL_BUSINESS_DATA } from './data/adminDashboardData'; 
// import ScanPage from "./pages/UserSite/ScanPage.jsx";

// const VIEWS = {
//   HOME:'home',
//   MEMBER_AUTH: 'memberAuth',
//   MEMBER_DASHBOARD: 'memberDashboard',
//   ADMIN_LOGIN:'adminLogin',
//   BUSINESS_REGISTER:'businessRegister',
//   ADMIN_DASHBOARD:'adminDashboard'
// }

// // Key for Local Storage
// const LOCAL_STORAGE_KEY = 'tbt_business_directory';
// const VIEW_STORAGE_KEY = 'tbt_current_view';
// const ADMIN_NAME_KEY = 'tbt_admin_name';
// const INDUSTRY_KEY = 'tbt_industry_options';
// const MEMBER_DATA_KEY = 'tbt_member_data';

// // ⭐️ NEW CONSTANT: Key for Session Storage to hold temporary scanned member data ⭐️
// const SCANNED_MEMBER_KEY = 'tbt_scanned_member'; 

// // Base industry list for the app
// const BASE_INDUSTRY_OPTIONS = [
//     'IT', 
//     'Food', 
//     'Industry', 
//     'General'
// ];

// function App() {
  
//   // --- STATE MANAGEMENT ---
//   const [currentView, setCurrentView] = useState(() => {
//     const savedView = localStorage.getItem(VIEW_STORAGE_KEY);
//     return savedView || VIEWS.HOME;
//   });

//   const [adminName, setAdminName] = useState(() => {
//     const savedName = localStorage.getItem(ADMIN_NAME_KEY);
//     return savedName || 'Admin User';
//   });
  
//   // ⭐️ NEW STATE: Store logged-in member info
//   const [memberUser, setMemberUser] = useState(null);

//   // 1. Initialize businessData from localStorage or fall back to mock data
//   const [businessData, setBusinessData] = useState(() => {
//       const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
//       if (savedData) {
//           try {
//               return JSON.parse(savedData);
//           } catch (e) {
//               console.error("Could not parse localStorage data:", e);
//           }
//       }
//       return INITIAL_BUSINESS_DATA;
//   });

//   // 2. Initialize Industry Options
//   const [currentIndustryOptions, setCurrentIndustryOptions] = useState(() => {
//     const savedOptions = localStorage.getItem(INDUSTRY_KEY);
//     if (savedOptions) {
//         try {
//             return JSON.parse(savedOptions);
//         } catch (e) {
//             console.error("Could not parse industry options:", e);
//         }
//     }
//     return BASE_INDUSTRY_OPTIONS;
//   });


//   // --- EFFECT HOOKS FOR PERSISTENCE ---

//   // Save businessData to localStorage whenever it changes
//   useEffect(() => {
//     if (businessData && businessData.length >= 0) {
//       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(businessData));
//     }
//   }, [businessData]); 

//   // Save Industry Options
//   useEffect(() => {
//     localStorage.setItem(INDUSTRY_KEY, JSON.stringify(currentIndustryOptions));
//   }, [currentIndustryOptions]);

//   // Persist View and Admin Name
//   useEffect(() => {
//     localStorage.setItem(ADMIN_NAME_KEY, adminName);
//     localStorage.setItem(VIEW_STORAGE_KEY, currentView);
    
//     if (currentView === VIEWS.HOME) {
//         localStorage.removeItem(ADMIN_NAME_KEY);
//         // Note: I've left the VIEW_STORAGE_KEY removal here, 
//         // assuming it's intended to clear the view on a full logout/home state,
//         // but be aware this is often a source of state bugs.
//         // localStorage.removeItem(VIEW_STORAGE_KEY); 
//         setAdminName('Admin User'); 
//     }
//   }, [adminName, currentView]);


//   // ⭐️ NEW EFFECT HOOK for QR Scan Login ⭐️
//   useEffect(() => {
//     const savedMemberJson = sessionStorage.getItem(SCANNED_MEMBER_KEY);
    
//     if (savedMemberJson) {
//       try {
//         const memberData = JSON.parse(savedMemberJson);
        
//         // 1. Log the user in
//         setMemberUser(memberData);
        
//         // 2. Change the view to the dashboard
//         setCurrentView(VIEWS.MEMBER_DASHBOARD);
        
//         // 3. Clean up the Session Storage token
//         sessionStorage.removeItem(SCANNED_MEMBER_KEY);
        
//       } catch (e) {
//         console.error("Failed to parse scanned member data from session storage:", e);
//         sessionStorage.removeItem(SCANNED_MEMBER_KEY); 
//       }
//     }
//   }, []); // Run only once on component mount


//   // --- GENERAL HANDLERS ---
  
//   // Handler for Admin Login
//   const handleAdminLogin = (name) => {
//     setAdminName(name); 
//     setCurrentView(VIEWS.ADMIN_DASHBOARD); 
//   };

//   // ⭐️ CRUCIAL HANDLER: Member Login Success ⭐️
//   const handleMemberLoginSuccess = (memberData) => {
//       console.log("Member Logged In:", memberData);
//       setMemberUser(memberData);
      
//       // After login, we redirect them to the Dashboard
//       setCurrentView(VIEWS.MEMBER_DASHBOARD); 
//   };

//   // Handler for adding a new Industry Type (used in AdminDashboard Settings)
//   const onAddIndustry = (newIndustry) => {
//       setCurrentIndustryOptions(prevOptions => {
//           return [...prevOptions, newIndustry].sort();
//       });
//   };

//   // Handler to delete a business
//   const deleteBusiness = (businessId) => {
//     setBusinessData(prevData => {
//         return prevData.filter(business => business.id !== businessId);
//     });
//   };

//   // Handler to update ANY field(s) of a business
//   const updateBusinessData = (businessId, updatedFields) => {
//     setBusinessData(prevData => {
//       return prevData.map(business => {
//         if (business.id === businessId) {
//           return { ...business, ...updatedFields };
//         }
//         return business;
//       });
//     });
//   };


//   // --- BUSINESS REGISTRATION HANDLERS ---
  
//   // 1. Used by BusinessRegister.jsx (User/Member submitted)
//   const registerBusinessFromUser = (newBusinessFormData) => {
//     const newId = Date.now();
    
//     const newBusiness = {
//         id: newId,
//         'Business Name': newBusinessFormData.businessName,
//         'Owner Name': newBusinessFormData.ownerName,
//         'Industry Type': newBusinessFormData.type,
//         'Physical Address': newBusinessFormData.address,
//         'Phone Number': newBusinessFormData.phNo,
//         'Viber Number': newBusinessFormData.viberNo,
//         'Email Address': newBusinessFormData.email,
//         'Website Link': newBusinessFormData.websiteLink,
//         'Facebook Link': newBusinessFormData.fbLink,
//         'Tiktok Link': newBusinessFormData.tiktokLink,
//         'Google Map Link': newBusinessFormData.googleMapLink,
//         'Logo URL': newBusinessFormData.logo,
//         Status: 'Pending Review', 
//         // Optional: Link business to the logged-in member if available
//         MemberPhone: memberUser ? memberUser['Phone Number'] : null 
//     };
    
//     setBusinessData(prevData => [...prevData, newBusiness]);
//     setCurrentView(VIEWS.HOME); 
//   };
  
//   // 2. Used by AdminDashboard.jsx
//   const handleRegisterBusiness = (newBusinessFormData) => {
//     const newId = Date.now();
    
//     const newBusiness = {
//         id: newId,
//         ...newBusinessFormData, 
//         Status: newBusinessFormData.Status || 'Active' 
//     };
    
//     setBusinessData(prevData => [...prevData, newBusiness]);
//   };


//   // --- VIEW RENDERING ---

//   let ContentComponent;

//   switch(currentView){
//     case VIEWS.HOME:
//       // ⭐️ FIX IS HERE: Pass the onMemberLoginSuccess function to Home ⭐️
//       ContentComponent =  (
//           <Home 
//               setCurrentView={setCurrentView} 
//               views={VIEWS} 
//               onMemberLoginSuccess={handleMemberLoginSuccess} 
//           />
//       );
//       break; 
      
//     case VIEWS.MEMBER_AUTH: // ⭐️ NEW VIEW CASE
//       ContentComponent = (
//         <MemberAuth 
//             setCurrentView={setCurrentView} 
//             views={VIEWS} 
//             onMemberLoginSuccess={handleMemberLoginSuccess} 
//         />
//       );
//       break;
      
//       case VIEWS.MEMBER_DASHBOARD:
//         // Pass member data and navigation functions
//         ContentComponent = (
//             <MemberDashboard
//                 setCurrentView={setCurrentView}
//                 views={VIEWS}
//                 memberUser={memberUser}
//                 onLogout={() => { setMemberUser(null); setCurrentView(VIEWS.HOME); localStorage.removeItem(MEMBER_DATA_KEY); }}
//             />
//         );
//         break;

//     case VIEWS.ADMIN_LOGIN:
//       ContentComponent = <AdminLogin views={VIEWS} onLoginSuccess={handleAdminLogin} setCurrentView={setCurrentView} />;      
//       break; 
      
//     case VIEWS.BUSINESS_REGISTER:
//       ContentComponent = (
//         <BusinessRegister 
//             setCurrentView={setCurrentView} 
//             views={VIEWS} 
//             addBusiness={registerBusinessFromUser} 
//             industryOptions={currentIndustryOptions} 
//             // Optional: Pass member data to pre-fill form
//             currentUser={memberUser} 
//         />
//       );
//       break; 
      
//     case VIEWS.ADMIN_DASHBOARD:
//       ContentComponent  = <AdminDashboard 
//                                 setCurrentView={setCurrentView} 
//                                 views={VIEWS} 
//                                 businessData={businessData} 
//                                 adminName={adminName} 
//                                 onUpdateData={updateBusinessData} 
//                                 onDeleteBusiness={deleteBusiness}
//                                 currentIndustryOptions={currentIndustryOptions} 
//                                 onAddIndustry={onAddIndustry}                     
//                                 onRegisterBusiness={handleRegisterBusiness}       
//                             />;
//       break; 
      
//     default:
//       ContentComponent = <Home setCurrentView={setCurrentView} views={VIEWS} allBusinesses={businessData} />;
//   }
  
//   return (
//     <Router> 
//         <Routes>
//             {/* 1. Dedicated Route for QR Code Scanning - Renders ScanPage */}
//             <Route path="/scan" element={<ScanPage />} /> 

//             {/* 2. Main Application Content - Renders your state-based views */}
//             <Route path="*" element={
//                 <div className="app-container">
//                     {ContentComponent}
//                 </div>
//             } />
//         </Routes>
//    </Router>
//   )
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/UserSite/Home.jsx";

import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import BusinessRegister from "./pages/Admin/BusinessRegister.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import MemberAuth from "./pages/UserSite/MemberAuth.jsx"; // NOTE: This view is now technically redundant if Home handles auth.
import MemberDashboard from "./pages/UserSite/MemberDashboard.jsx"; 

import { INITIAL_BUSINESS_DATA } from './data/adminDashboardData'; 
import ScanPage from "./pages/UserSite/ScanPage.jsx";

const VIEWS = {
  HOME:'home',
  MEMBER_AUTH: 'memberAuth', // Keeping this constant, but we'll focus primary auth on HOME
  MEMBER_DASHBOARD: 'memberDashboard',
  ADMIN_LOGIN:'adminLogin',
  BUSINESS_REGISTER:'businessRegister',
  ADMIN_DASHBOARD:'adminDashboard'
}

// Key for Local Storage
const LOCAL_STORAGE_KEY = 'tbt_business_directory';
const VIEW_STORAGE_KEY = 'tbt_current_view';
const ADMIN_NAME_KEY = 'tbt_admin_name';
const INDUSTRY_KEY = 'tbt_industry_options';
const MEMBER_DATA_KEY = 'tbt_member_data'; // ⭐️ CRITICAL: Member data persistence key

// Key for Session Storage to hold temporary scanned member data
const SCANNED_MEMBER_KEY = 'tbt_scanned_member'; 

// Base industry list for the app
const BASE_INDUSTRY_OPTIONS = [
    'IT', 
    'Food', 
    'Industry', 
    'General'
];

function App() {
  
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState(() => {
    const savedView = localStorage.getItem(VIEW_STORAGE_KEY);
    return savedView || VIEWS.HOME;
  });

  const [adminName, setAdminName] = useState(() => {
    const savedName = localStorage.getItem(ADMIN_NAME_KEY);
    return savedName || 'Admin User';
  });
  
  // ⭐️ UPDATED STATE INITIALIZATION: Check localStorage for logged-in member info
  const [memberUser, setMemberUser] = useState(() => {
      const savedMember = localStorage.getItem(MEMBER_DATA_KEY);
      try {
          return savedMember ? JSON.parse(savedMember) : null;
      } catch (e) {
          console.error("Failed to parse stored member data.");
          localStorage.removeItem(MEMBER_DATA_KEY);
          return null;
      }
  });

  // 1. Initialize businessData from localStorage or fall back to mock data
  const [businessData, setBusinessData] = useState(() => {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
          try {
              return JSON.parse(savedData);
          } catch (e) {
              console.error("Could not parse localStorage data:", e);
          }
      }
      return INITIAL_BUSINESS_DATA;
  });

  // 2. Initialize Industry Options
  const [currentIndustryOptions, setCurrentIndustryOptions] = useState(() => {
    const savedOptions = localStorage.getItem(INDUSTRY_KEY);
    if (savedOptions) {
        try {
            return JSON.parse(savedOptions);
        } catch (e) {
            console.error("Could not parse industry options:", e);
        }
    }
    return BASE_INDUSTRY_OPTIONS;
  });


  // --- EFFECT HOOKS FOR PERSISTENCE ---

  // Save businessData to localStorage whenever it changes
  useEffect(() => {
    if (businessData && businessData.length >= 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(businessData));
    }
  }, [businessData]); 

  // Save Industry Options
  useEffect(() => {
    localStorage.setItem(INDUSTRY_KEY, JSON.stringify(currentIndustryOptions));
  }, [currentIndustryOptions]);

  // Persist View and Admin Name
  useEffect(() => {
    localStorage.setItem(ADMIN_NAME_KEY, adminName);
    localStorage.setItem(VIEW_STORAGE_KEY, currentView);
    
    // Logic to clear admin state if returning to HOME
    if (currentView === VIEWS.HOME && !memberUser) {
        localStorage.removeItem(ADMIN_NAME_KEY);
        setAdminName('Admin User'); 
    }
  }, [adminName, currentView, memberUser]);


  // ⭐️ QR Scan Login logic - Uses existing logic ⭐️
  useEffect(() => {
    const savedMemberJson = sessionStorage.getItem(SCANNED_MEMBER_KEY);
    
    if (savedMemberJson) {
      try {
        const memberData = JSON.parse(savedMemberJson);
        
        // Use the unified success handler to log in and update state/storage
        handleMemberLoginSuccess(memberData); 
        
        // Clean up the Session Storage token
        sessionStorage.removeItem(SCANNED_MEMBER_KEY);
        
      } catch (e) {
        console.error("Failed to parse scanned member data from session storage:", e);
        sessionStorage.removeItem(SCANNED_MEMBER_KEY); 
      }
    }
  }, []); 


  // --- GENERAL HANDLERS ---
  
  // Handler for Admin Login
  const handleAdminLogin = (name) => {
    setAdminName(name); 
    setCurrentView(VIEWS.ADMIN_DASHBOARD); 
  };

  // ⭐️ CRUCIAL FIX 1: Member Login Success (Redirects to HOME) ⭐️
  const handleMemberLoginSuccess = (memberData) => {
      console.log("Member Logged In:", memberData);
      setMemberUser(memberData);
      // ⭐️ CRITICAL: Persist member data to localStorage
      localStorage.setItem(MEMBER_DATA_KEY, JSON.stringify(memberData));
      
      // We set the view to HOME, which will now display the MemberBusinessList
      setCurrentView(VIEWS.MEMBER_DASHBOARD);
    };
  
  // ⭐️ CRUCIAL FIX 2: Member Logout Handler ⭐️
  const handleMemberLogout = () => {
      setMemberUser(null);
      localStorage.removeItem(MEMBER_DATA_KEY);
      setCurrentView(VIEWS.HOME);
  };


  // Handler for adding a new Industry Type (used in AdminDashboard Settings)
  const onAddIndustry = (newIndustry) => {
      setCurrentIndustryOptions(prevOptions => {
          return [...prevOptions, newIndustry].sort();
      });
  };

  // Handler to delete a business
  const deleteBusiness = (businessId) => {
    setBusinessData(prevData => {
        return prevData.filter(business => business.id !== businessId);
    });
  };

  // Handler to update ANY field(s) of a business
  const updateBusinessData = (businessId, updatedFields) => {
    setBusinessData(prevData => {
      return prevData.map(business => {
        if (business.id === businessId) {
          return { ...business, ...updatedFields };
        }
        return business;
      });
    });
  };


  // --- BUSINESS REGISTRATION HANDLERS ---
  
  // 1. Used by BusinessRegister.jsx (User/Member submitted)
  const registerBusinessFromUser = (newBusinessFormData) => {
    const newId = Date.now();
    
    const newBusiness = {
        id: newId,
        'Business Name': newBusinessFormData.businessName,
        'Owner Name': newBusinessFormData.ownerName,
        'Industry Type': newBusinessFormData.type,
        'Physical Address': newBusinessFormData.address,
        'Phone Number': newBusinessFormData.phNo,
        'Viber Number': newBusinessFormData.viberNo,
        'Email Address': newBusinessFormData.email,
        'Website Link': newBusinessFormData.websiteLink,
        'Facebook Link': newBusinessFormData.fbLink,
        'Tiktok Link': newBusinessFormData.tiktokLink,
        'Google Map Link': newBusinessFormData.googleMapLink,
        'Logo URL': newBusinessFormData.logo,
        Status: 'Pending Review', 
        // Optional: Link business to the logged-in member if available
        MemberPhone: memberUser ? memberUser['Phone Number'] : null 
    };
    
    setBusinessData(prevData => [...prevData, newBusiness]);
    setCurrentView(VIEWS.HOME); 
  };
  
  // 2. Used by AdminDashboard.jsx
  const handleRegisterBusiness = (newBusinessFormData) => {
    const newId = Date.now();
    
    const newBusiness = {
        id: newId,
        ...newBusinessFormData, 
        Status: newBusinessFormData.Status || 'Active' 
    };
    
    setBusinessData(prevData => [...prevData, newBusiness]);
  };


  // --- VIEW RENDERING ---

  let ContentComponent;

  switch(currentView){
    case VIEWS.HOME:
      // ⭐️ CRITICAL FIX 3: Pass memberUser and Logout Handler to Home.jsx ⭐️
      ContentComponent =  (
          <Home 
              setCurrentView={setCurrentView} 
              views={VIEWS} 
              memberUser={memberUser} // 👈 Added
              onMemberLoginSuccess={handleMemberLoginSuccess} 
              onMemberLogout={handleMemberLogout} // 👈 Added
          />
      );
      break; 
      
    case VIEWS.MEMBER_AUTH: 
      // NOTE: If Home.jsx handles login, this view might be obsolete. 
      // I am keeping it for routing consistency, but ensure MemberAuth also calls handleMemberLoginSuccess.
      ContentComponent = (
        <MemberAuth 
            setCurrentView={setCurrentView} 
            views={VIEWS} 
            onMemberLoginSuccess={handleMemberLoginSuccess} 
        />
      );
      break;
      
      case VIEWS.MEMBER_DASHBOARD:
        // Ensure user is logged in before showing the dashboard
        if (!memberUser) {
            setCurrentView(VIEWS.HOME);
            ContentComponent = <div className="text-center p-12">Redirecting to login...</div>;
        } else {
            // Pass member data and navigation functions
            ContentComponent = (
                <MemberDashboard
                    setCurrentView={setCurrentView}
                    views={VIEWS}
                    memberUser={memberUser}
                    // ⭐️ CRITICAL FIX 4: Use the centralized logout handler ⭐️
                    onLogout={handleMemberLogout}
                />
            );
        }
        break;

    case VIEWS.ADMIN_LOGIN:
      ContentComponent = <AdminLogin views={VIEWS} onLoginSuccess={handleAdminLogin} setCurrentView={setCurrentView} />;      
      break; 
      
    case VIEWS.BUSINESS_REGISTER:
      ContentComponent = (
        <BusinessRegister 
            setCurrentView={setCurrentView} 
            views={VIEWS} 
            addBusiness={registerBusinessFromUser} 
            industryOptions={currentIndustryOptions} 
            // Only allow registration if a member is logged in, otherwise redirect
            currentUser={memberUser} 
        />
      );
      break; 
      
    case VIEWS.ADMIN_DASHBOARD:
      ContentComponent  = <AdminDashboard 
                                setCurrentView={setCurrentView} 
                                views={VIEWS} 
                                businessData={businessData} 
                                adminName={adminName} 
                                onUpdateData={updateBusinessData} 
                                onDeleteBusiness={deleteBusiness}
                                currentIndustryOptions={currentIndustryOptions} 
                                onAddIndustry={onAddIndustry}                     
                                onRegisterBusiness={handleRegisterBusiness}
                                onMemberLoginSuccess={handleMemberLoginSuccess}       
                            />;
      break; 
      
    default:
      ContentComponent = <Home setCurrentView={setCurrentView} views={VIEWS} memberUser={memberUser} onMemberLoginSuccess={handleMemberLoginSuccess} onMemberLogout={handleMemberLogout} />;
  }
  
  return (
    <Router> 
        <Routes>
            {/* 1. Dedicated Route for QR Code Scanning - Renders ScanPage */}
            <Route path="/scan" element={<ScanPage />} /> 

            {/* 2. Main Application Content - Renders your state-based views */}
            <Route path="*" element={
                <div className="app-container">
                    {ContentComponent}
                </div>
            } />
        </Routes>
   </Router>
  )
}

export default App;