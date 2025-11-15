// // // src/App.jsx

// // import React, {useState } from 'react';
// // import Home from "./pages/UserSite/Home.jsx";
// // import AdminLogin from "./pages/Admin/AdminLogin.jsx";
// // import BusinessRegister from "./pages/Admin/BusinessRegister.jsx";
// // import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// // // 💡 Recommended file rename: './data/mockBusinessData' for clarity
// // import { INITIAL_BUSINESS_DATA } from './data/adminDashboardData'; 

// // const VIEWS = {
// //   HOME:'home',
// //   ADMIN_LOGIN:'adminLogin',
// //   BUSINESS_REGISTER:'businessRegister',
// //   ADMIN_DASHBOARD:'adminDashboard'
// // }

// // function App() {
// //   const [currentView,setCurrentView] = useState(VIEWS.HOME);
// //   const [businessData, setBusinessData] = useState(INITIAL_BUSINESS_DATA);

// //   const addBusiness = (newBusinessFormData) => {
// //     const newId = businessData.length + 1;
    
// //     // Map the form data keys (camelCase) to the required dashboard keys (Title Case)
// //     const newBusiness = {
// //         id: newId,
// //         'Business Name': newBusinessFormData.businessName,
// //         'Owner Name': newBusinessFormData.ownerName,
// //         'Industry Type': newBusinessFormData.type,
// //         'Physical Address': newBusinessFormData.address,
// //         'Phone Number': newBusinessFormData.phNo,
// //         'Viber Number': newBusinessFormData.viberNo,
// //         'Email Address': newBusinessFormData.email,
// //         'Website Link': newBusinessFormData.websiteLink,
// //         'Facebook Link': newBusinessFormData.fbLink,
// //         'Tiktok Link': newBusinessFormData.tiktokLink,
// //         'Google Map Link': newBusinessFormData.googleMapLink,
// //         'Logo URL': newBusinessFormData.logo,
// //         Status: 'Pending Review', // Default status for new submissions
// //     };
    
// //     // Add new business to the state
// //     setBusinessData(prevData => [...prevData, newBusiness]);
// // };

// // let ContentComponent;

// //     switch(currentView){
// //       case VIEWS.HOME:
// //         // Pass data to Home for display
// //         ContentComponent =  <Home setCurrentView={setCurrentView} views={VIEWS} businessData={businessData} />;
// //         break; // 👈 CRITICAL FIX: ADD BREAK
// //       case VIEWS.ADMIN_LOGIN:
// //         ContentComponent = <AdminLogin setCurrentView={setCurrentView} views={VIEWS}/>;
// //         break; // 👈 CRITICAL FIX: ADD BREAK
// //       case VIEWS.BUSINESS_REGISTER:
// //         // Pass the addBusiness function
// //         ContentComponent = <BusinessRegister setCurrentView={setCurrentView} views={VIEWS} addBusiness={addBusiness} />;
// //         break; // 👈 CRITICAL FIX: ADD BREAK
// //       case VIEWS.ADMIN_DASHBOARD:
// //         // Pass the central data to the dashboard
// //         ContentComponent  = <AdminDashboard setCurrentView={setCurrentView} views={VIEWS} businessData={businessData} />;
// //         break; // 👈 CRITICAL FIX: ADD BREAK
// //       default:
// //         ContentComponent = <Home setCurrentView={setCurrentView} views={VIEWS} businessData={businessData}/>;
// //       }
  
// //   return (
// //        <div className="app-container">
// //           {ContentComponent}
// //        </div>
// //   )
// // }

// // export default App;

// // src/App.jsx (FINAL WITH LOCAL STORAGE)

// // import React, { useState, useEffect } from 'react'; // <-- IMPORT useEffect
// // import Home from "./pages/UserSite/Home.jsx";
// // import AdminLogin from "./pages/Admin/AdminLogin.jsx";
// // import BusinessRegister from "./pages/Admin/BusinessRegister.jsx";
// // import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// // import { INITIAL_BUSINESS_DATA } from './data/adminDashboardData'; 

// // const VIEWS = {
// //   HOME:'home',
// //   ADMIN_LOGIN:'adminLogin',
// //   BUSINESS_REGISTER:'businessRegister',
// //   ADMIN_DASHBOARD:'adminDashboard'
// // }

// // // Key for Local Storage
// // const LOCAL_STORAGE_KEY = 'tbt_business_directory';
// // const VIEW_STORAGE_KEY = 'tbt_current_view';
// // const ADMIN_NAME_KEY = 'tbt_admin_name';

// // function App() {
// //   const [currentView, setCurrentView] = useState(() => {
// //     const savedView = localStorage.getItem(VIEW_STORAGE_KEY);
// //     return savedView || VIEWS.HOME;
// //   });

// //   const [adminName, setAdminName] = useState(() => {
// //     const savedName = localStorage.getItem(ADMIN_NAME_KEY);
// //     return savedName || 'Admin User';
// // });

// //   // 1. Initialize businessData from localStorage or fall back to mock data
// //   const [businessData, setBusinessData] = useState(() => {
// //       const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
// //       if (savedData) {
// //           try {
// //               return JSON.parse(savedData);
// //           } catch (e) {
// //               console.error("Could not parse localStorage data:", e);
// //           }
// //       }
// //       return INITIAL_BUSINESS_DATA;
// //   });

// //   // 2. Save businessData to localStorage whenever it changes
// //   useEffect(() => {
// //     // Check if businessData is valid before saving
// //     if (businessData && businessData.length >= 0) {
// //       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(businessData));
// //     }
// //   }, [businessData]); // Trigger this effect every time businessData state changes

// //   useEffect(() => {
// //     localStorage.setItem(VIEW_STORAGE_KEY, currentView);
    
// //     // IMPORTANT: If we're logging out (going to HOME), we must clear the saved view.
// //     if (currentView === VIEWS.HOME) {
// //         localStorage.removeItem(VIEW_STORAGE_KEY);
// //     }
// //   }, [currentView]);

  


// // useEffect(() => {
// //   localStorage.setItem(ADMIN_NAME_KEY, adminName);
// //   localStorage.setItem(VIEW_STORAGE_KEY, currentView);
  
// //   // Clear admin state if logging out
// //   if (currentView === VIEWS.HOME) {
// //       localStorage.removeItem(ADMIN_NAME_KEY);
// //       localStorage.removeItem(VIEW_STORAGE_KEY);
// //       // Reset adminName state when logging out
// //       setAdminName('Admin User'); 
// //   }
// // }, [adminName, currentView]);

// // const handleAdminLogin = (name) => {
// //   // This is called by AdminLogin.jsx ONLY after successful verification.
// //   setAdminName(name); // Set the dynamic name received from the login component
// //   setCurrentView(VIEWS.ADMIN_DASHBOARD); 
// // };


// //   const addBusiness = (newBusinessFormData) => {
// //     // Generate a unique ID (using timestamp is a simple way for local data)
// //     const newId = Date.now();
    
// //     // Map the form data keys (camelCase) to the required dashboard keys (Title Case)
// //     const newBusiness = {
// //         id: newId,
// //         'Business Name': newBusinessFormData.businessName,
// //         'Owner Name': newBusinessFormData.ownerName,
// //         'Industry Type': newBusinessFormData.type,
// //         'Physical Address': newBusinessFormData.address,
// //         'Phone Number': newBusinessFormData.phNo,
// //         'Viber Number': newBusinessFormData.viberNo,
// //         'Email Address': newBusinessFormData.email,
// //         'Website Link': newBusinessFormData.websiteLink,
// //         'Facebook Link': newBusinessFormData.fbLink,
// //         'Tiktok Link': newBusinessFormData.tiktokLink,
// //         'Google Map Link': newBusinessFormData.googleMapLink,
// //         'Logo URL': newBusinessFormData.logo,
// //         Status: 'Pending Review', // Default status for new submissions
// //     };
    
// //     // Add new business to the state (This triggers the useEffect and saves to localStorage)
// //     setBusinessData(prevData => [...prevData, newBusiness]);

// //     // Navigate back to the Home page after successful registration
// //     setCurrentView(VIEWS.HOME);
// //   };

// //   let ContentComponent;

// //   switch(currentView){
// //     case VIEWS.HOME:
// //       ContentComponent =  <Home setCurrentView={setCurrentView} views={VIEWS} businessData={businessData} />;
// //       break; 
// //     case VIEWS.ADMIN_LOGIN:
// //       ContentComponent = <AdminLogin views={VIEWS} onLoginSuccess={handleAdminLogin} />;      break; 
// //     case VIEWS.BUSINESS_REGISTER:
// //       // Pass the addBusiness function
// //       ContentComponent = <BusinessRegister setCurrentView={setCurrentView} views={VIEWS} addBusiness={addBusiness} />;
// //       break; 
// //     case VIEWS.ADMIN_DASHBOARD:
// //       // Pass the central data to the dashboard
// //       ContentComponent  = <AdminDashboard setCurrentView={setCurrentView} views={VIEWS} businessData={businessData} adminName={adminName} />;
// //       break; 
// //     default:
// //       ContentComponent = <Home setCurrentView={setCurrentView} views={VIEWS} businessData={businessData} />;
// //   }
  
// //   return (
// //        <div className="app-container">
// //           {ContentComponent}
// //        </div>
// //   )
// // }

// // export default App;
// // src/App.jsx (FINAL VERSION)

// import React, { useState, useEffect } from 'react';
// import Home from "./pages/UserSite/Home.jsx";
// import AdminLogin from "./pages/Admin/AdminLogin.jsx";
// import BusinessRegister from "./pages/Admin/BusinessRegister.jsx";
// import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// import { INITIAL_BUSINESS_DATA } from './data/adminDashboardData'; 

// const VIEWS = {
//   HOME:'home',
//   ADMIN_LOGIN:'adminLogin',
//   BUSINESS_REGISTER:'businessRegister',
//   ADMIN_DASHBOARD:'adminDashboard'
// }

// // Key for Local Storage
// const LOCAL_STORAGE_KEY = 'tbt_business_directory';
// const VIEW_STORAGE_KEY = 'tbt_current_view';
// const ADMIN_NAME_KEY = 'tbt_admin_name';

// function App() {
//   const [currentView, setCurrentView] = useState(() => {
//     const savedView = localStorage.getItem(VIEW_STORAGE_KEY);
//     return savedView || VIEWS.HOME;
//   });

//   const [adminName, setAdminName] = useState(() => {
//     const savedName = localStorage.getItem(ADMIN_NAME_KEY);
//     return savedName || 'Admin User';
// });

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

//   // 2. Save businessData to localStorage whenever it changes
//   useEffect(() => {
//     // Check if businessData is valid before saving
//     if (businessData && businessData.length >= 0) {
//       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(businessData));
//     }
//   }, [businessData]); // Trigger this effect every time businessData state changes

//   // 3. Persist View and Admin Name
//   useEffect(() => {
//     localStorage.setItem(ADMIN_NAME_KEY, adminName);
//     localStorage.setItem(VIEW_STORAGE_KEY, currentView);
    
//     // Clear admin state if logging out
//     if (currentView === VIEWS.HOME) {
//         localStorage.removeItem(ADMIN_NAME_KEY);
//         localStorage.removeItem(VIEW_STORAGE_KEY);
//         // Reset adminName state when logging out
//         setAdminName('Admin User'); 
//     }
//   }, [adminName, currentView]);

//   // Handler for Admin Login
//   const handleAdminLogin = (name) => {
//     setAdminName(name); 
//     setCurrentView(VIEWS.ADMIN_DASHBOARD); 
//   };

//   // ⭐️ NEW: General Handler to update ANY field(s) of a business
//   const updateBusinessData = (businessId, updatedFields) => {
//     setBusinessData(prevData => {
//       return prevData.map(business => {
//         if (business.id === businessId) {
//           // Merge the existing business data with the new updatedFields object
//           return {
//             ...business,
//             ...updatedFields
//           };
//         }
//         return business;
//       });
//     });
//     // The useEffect for [businessData] will automatically save this to localStorage.
//   };


//   const addBusiness = (newBusinessFormData) => {
//     // Generate a unique ID (using timestamp is a simple way for local data)
//     const newId = Date.now();
    
//     // Map the form data keys (camelCase) to the required dashboard keys (Title Case)
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
//         Status: 'Pending Review', // Default status for new submissions
//     };
    
//     // Add new business to the state (This triggers the useEffect and saves to localStorage)
//     setBusinessData(prevData => [...prevData, newBusiness]);

//     // Navigate back to the Home page after successful registration
//     // setCurrentView(VIEWS.HOME);
//   };
//   const deleteBusiness = (businessId) => {
//     setBusinessData(prevData => {
//         // Filter out the business with the matching ID
//         return prevData.filter(business => business.id !== businessId);
//     });
//     // The useEffect for [businessData] will automatically save this to localStorage.
// };

//   let ContentComponent;

//   switch(currentView){
//     case VIEWS.HOME:
//       ContentComponent =  <Home setCurrentView={setCurrentView} views={VIEWS} allBusinesses={businessData} />;
//       break; 
//     case VIEWS.ADMIN_LOGIN:
//       ContentComponent = <AdminLogin views={VIEWS} onLoginSuccess={handleAdminLogin} setCurrentView={setCurrentView} />;      
//       break; 
//     case VIEWS.BUSINESS_REGISTER:
//       // Pass the addBusiness function
//       ContentComponent = <BusinessRegister setCurrentView={setCurrentView} views={VIEWS} addBusiness={addBusiness} />;
//       break; 
//     case VIEWS.ADMIN_DASHBOARD:
//       // ⭐️ Pass the central data AND the generalized update function
//       ContentComponent  = <AdminDashboard 
//                                 setCurrentView={setCurrentView} 
//                                 views={VIEWS} 
//                                 businessData={businessData} 
//                                 adminName={adminName} 
//                                 onUpdateData={updateBusinessData} // <-- PASSED DOWN
//                                 onDeleteBusiness={deleteBusiness}
//                             />;
//       break; 
//     default:
//       ContentComponent = <Home setCurrentView={setCurrentView} views={VIEWS} businessData={businessData} />;
//   }
  
//   return (
//        <div className="app-container">
//           {ContentComponent}
//        </div>
//   )
// }

// // export default App;
// import React, { useState, useEffect } from 'react';
// import Home from "./pages/UserSite/Home.jsx";
// import AdminLogin from "./pages/Admin/AdminLogin.jsx";
// import BusinessRegister from "./pages/Admin/BusinessRegister.jsx";
// import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// import { INITIAL_BUSINESS_DATA } from './data/adminDashboardData'; 

// const VIEWS = {
//   HOME:'home',
//   ADMIN_LOGIN:'adminLogin',
//   BUSINESS_REGISTER:'businessRegister',
//   ADMIN_DASHBOARD:'adminDashboard'
// }

// // Key for Local Storage
// const LOCAL_STORAGE_KEY = 'tbt_business_directory';
// const LOCAL_STORAGE_INDUSTRY_KEY = 'tbt_industry_options'; // ⭐️ NEW KEY ⭐️
// const VIEW_STORAGE_KEY = 'tbt_current_view';
// const ADMIN_NAME_KEY = 'tbt_admin_name';

// function App() {
//   const [currentView, setCurrentView] = useState(() => {
//     const savedView = localStorage.getItem(VIEW_STORAGE_KEY);
//     return savedView || VIEWS.HOME;
//   });

//   const [adminName, setAdminName] = useState(() => {
//     const savedName = localStorage.getItem(ADMIN_NAME_KEY);
//     return savedName || 'Admin User';
//   });

//   // ⭐️ NEW STATE: Initialize industry options from localStorage or an empty array ⭐️
//   const [allIndustryOptions, setAllIndustryOptions] = useState(() => {
//     const savedOptions = localStorage.getItem(LOCAL_STORAGE_INDUSTRY_KEY);
//     if (savedOptions) {
//         try {
//             return JSON.parse(savedOptions);
//         } catch (e) {
//             console.error("Could not parse industry options:", e);
//         }
//     }
//     return []; // Starts empty, as requested
//   });
  
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

//   // 2. Save businessData to localStorage whenever it changes
//   useEffect(() => {
//     if (businessData && businessData.length >= 0) {
//       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(businessData));
//     }
//   }, [businessData]); 

//   // ⭐️ NEW EFFECT: Save industryOptions to localStorage whenever it changes ⭐️
//   useEffect(() => {
//     if (allIndustryOptions && allIndustryOptions.length >= 0) {
//       localStorage.setItem(LOCAL_STORAGE_INDUSTRY_KEY, JSON.stringify(allIndustryOptions));
//     }
//   }, [allIndustryOptions]);


//   // 3. Persist View and Admin Name
//   useEffect(() => {
//     localStorage.setItem(ADMIN_NAME_KEY, adminName);
//     localStorage.setItem(VIEW_STORAGE_KEY, currentView);
    
//     // Clear admin state if logging out
//     if (currentView === VIEWS.HOME) {
//         localStorage.removeItem(ADMIN_NAME_KEY);
//         localStorage.removeItem(VIEW_STORAGE_KEY);
//         setAdminName('Admin User'); 
//     }
//   }, [adminName, currentView]);

//   // Handler for Admin Login
//   const handleAdminLogin = (name) => {
//     setAdminName(name); 
//     setCurrentView(VIEWS.ADMIN_DASHBOARD); 
//   };
  
//   // ⭐️ NEW HANDLER: Function to update the industry options state ⭐️
//   const handleAddIndustry = (newIndustryName) => {
//       const cleanedName = newIndustryName.trim();
//       // Only add if the name is not empty and not already in the list
//       if (cleanedName && !allIndustryOptions.includes(cleanedName)) {
//           setAllIndustryOptions(prevOptions => [...prevOptions, cleanedName]);
//       }
//   };


//   // General Handler to update ANY field(s) of a business
//   const updateBusinessData = (businessId, updatedFields) => {
//     setBusinessData(prevData => {
//       return prevData.map(business => {
//         if (business.id === businessId) {
//           return {
//             ...business,
//             ...updatedFields
//           };
//         }
//         return business;
//       });
//     });
//   };


//   const addBusiness = (newBusinessFormData) => {
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
//     };
    
//     setBusinessData(prevData => [...prevData, newBusiness]);
//     // Optionally add the new industry type to the list if it doesn't exist
//     if (newBusinessFormData.type) {
//         handleAddIndustry(newBusinessFormData.type);
//     }
//   };

//   const deleteBusiness = (businessId) => {
//     setBusinessData(prevData => {
//         return prevData.filter(business => business.id !== businessId);
//     });
//   };

//   let ContentComponent;

//   switch(currentView){
//     case VIEWS.HOME:
//       // ➡️ PASS INDUSTRY DATA TO USER SITE 
//       ContentComponent =  <Home setCurrentView={setCurrentView} views={VIEWS} allBusinesses={businessData} industryOptions={allIndustryOptions} />;
//       break; 
//     case VIEWS.ADMIN_LOGIN:
//       ContentComponent = <AdminLogin views={VIEWS} onLoginSuccess={handleAdminLogin} setCurrentView={setCurrentView} />;      
//       break; 
//     case VIEWS.BUSINESS_REGISTER:
//       ContentComponent = <BusinessRegister setCurrentView={setCurrentView} views={VIEWS} addBusiness={addBusiness} industryOptions={allIndustryOptions} />; // Pass options for the dropdown
//       break; 
//     case VIEWS.ADMIN_DASHBOARD:
//       // ➡️ PASS INDUSTRY DATA AND UPDATE FUNCTION TO ADMIN SITE
//       ContentComponent  = <AdminDashboard 
//                                 setCurrentView={setCurrentView} 
//                                 views={VIEWS} 
//                                 businessData={businessData} 
//                                 adminName={adminName} 
//                                 onUpdateData={updateBusinessData}
//                                 onDeleteBusiness={deleteBusiness}
//                                 currentIndustryOptions={allIndustryOptions} // ⭐️ NEW PROP ⭐️
//                                 onAddIndustry={handleAddIndustry}
//                                 onRegisterBusiness={handleRegisterBusiness} // ⭐️ NEW PROP ⭐️
//                             />;
//       break; 
//     default:
//       ContentComponent = <Home setCurrentView={setCurrentView} views={VIEWS} allBusinesses={businessData} industryOptions={allIndustryOptions} />;
//   }
  
//   return (
//        <div className="app-container">
//           {ContentComponent}
//        </div>
//   )
// }

// export default App;
import React, { useState, useEffect } from 'react';
import Home from "./pages/UserSite/Home.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import BusinessRegister from "./pages/Admin/BusinessRegister.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import { INITIAL_BUSINESS_DATA } from './data/adminDashboardData'; 
// NOTE: Ensure './data/adminDashboardData' exists and exports INITIAL_BUSINESS_DATA

const VIEWS = {
  HOME:'home',
  ADMIN_LOGIN:'adminLogin',
  BUSINESS_REGISTER:'businessRegister',
  ADMIN_DASHBOARD:'adminDashboard'
}

// Key for Local Storage
const LOCAL_STORAGE_KEY = 'tbt_business_directory';
const VIEW_STORAGE_KEY = 'tbt_current_view';
const ADMIN_NAME_KEY = 'tbt_admin_name';
const INDUSTRY_KEY = 'tbt_industry_options';

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
    
    if (currentView === VIEWS.HOME) {
        localStorage.removeItem(ADMIN_NAME_KEY);
        localStorage.removeItem(VIEW_STORAGE_KEY);
        setAdminName('Admin User'); 
    }
  }, [adminName, currentView]);


  // --- GENERAL HANDLERS ---
  
  // Handler for Admin Login
  const handleAdminLogin = (name) => {
    setAdminName(name); 
    setCurrentView(VIEWS.ADMIN_DASHBOARD); 
  };

  // Handler for adding a new Industry Type (used in AdminDashboard Settings)
  const onAddIndustry = (newIndustry) => {
      setCurrentIndustryOptions(prevOptions => {
          // Add the new industry and sort alphabetically
          return [...prevOptions, newIndustry].sort();
      });
  };

  // Handler to delete a business (used in AdminDashboard)
  const deleteBusiness = (businessId) => {
    setBusinessData(prevData => {
        return prevData.filter(business => business.id !== businessId);
    });
  };

  // Handler to update ANY field(s) of a business (used in AdminDashboard Edit View)
  const updateBusinessData = (businessId, updatedFields) => {
    setBusinessData(prevData => {
      return prevData.map(business => {
        if (business.id === businessId) {
          return {
            ...business,
            ...updatedFields
          };
        }
        return business;
      });
    });
  };


  // --- BUSINESS REGISTRATION HANDLERS ---
  
  // 1. Used by BusinessRegister.jsx (User-submitted form, requires field name mapping)
  const registerBusinessFromUser = (newBusinessFormData) => {
    const newId = Date.now();
    
    // Map the form data keys (camelCase) to the required dashboard keys (Title Case)
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
        Status: 'Pending Review', // Default status for user submissions
    };
    
    setBusinessData(prevData => [...prevData, newBusiness]);
    setCurrentView(VIEWS.HOME); // Navigate back to the Home page after successful registration
  };
  
  // 2. ⭐️ MISSING FUNCTION (The fix for the ReferenceError) 
  // Used by AdminDashboard.jsx (Admin-submitted form, data is already in Title Case)
  const handleRegisterBusiness = (newBusinessFormData) => {
    const newId = Date.now();
    
    // The Admin form already uses the correct Title Case keys, so we just add the ID
    const newBusiness = {
        id: newId,
        // Spread the entire form data passed from AdminDashboard
        ...newBusinessFormData, 
        // Ensure Status defaults to 'Active' if not provided by the form
        Status: newBusinessFormData.Status || 'Active' 
    };
    
    setBusinessData(prevData => [...prevData, newBusiness]);
    // Note: AdminDashboard handles navigation/messages internally
  };


  // --- VIEW RENDERING ---

  let ContentComponent;

  switch(currentView){
    case VIEWS.HOME:
      // Pass the businessData as 'allBusinesses' for clarity in Home.jsx
      ContentComponent =  <Home setCurrentView={setCurrentView} views={VIEWS} allBusinesses={businessData} />;
      break; 
    case VIEWS.ADMIN_LOGIN:
      ContentComponent = <AdminLogin views={VIEWS} onLoginSuccess={handleAdminLogin} setCurrentView={setCurrentView} />;      
      break; 
    case VIEWS.BUSINESS_REGISTER:
      // Pass the user registration function
      ContentComponent = <BusinessRegister setCurrentView={setCurrentView} views={VIEWS} addBusiness={registerBusinessFromUser} industryOptions={currentIndustryOptions} />;
      break; 
    case VIEWS.ADMIN_DASHBOARD:
      ContentComponent  = <AdminDashboard 
                                setCurrentView={setCurrentView} 
                                views={VIEWS} 
                                businessData={businessData} 
                                adminName={adminName} 
                                onUpdateData={updateBusinessData} 
                                onDeleteBusiness={deleteBusiness}
                                currentIndustryOptions={currentIndustryOptions} // <-- PASSED
                                onAddIndustry={onAddIndustry}                     // <-- PASSED
                                onRegisterBusiness={handleRegisterBusiness}       // ⭐️ PASSED (FIXED ERROR)
                            />;
      break; 
    default:
      ContentComponent = <Home setCurrentView={setCurrentView} views={VIEWS} allBusinesses={businessData} />;
  }
  
  return (
       <div className="app-container">
          {ContentComponent}
       </div>
  )
}

export default App;