// import React, { useState, useMemo, useEffect } from 'react'; 
// import { db } from '../../firebase'; 
// import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'; 

// // Define the required input fields
// const BUSINESS_FIELDS_BASE = [
//     { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
//     { name: 'ownerName', label: 'Owner Name', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
//     { name: 'type', label: 'Industry Type', type: 'select', required: true, options: [] }, 
//     { name: 'logo', label: 'Logo URL', type: 'url', required: false, placeholder: 'Link to your logo image' },
//     { name: 'address', label: 'Physical Address', type: 'text', required: true, placeholder: 'Street address, floor, etc.' },
//     { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'contact@business.com' },
//     { name: 'phNo', label: 'Phone Number', type: 'tel', required: true, placeholder: 'e.g., 09 123 456 789' },
//     { name: 'viberNo', label: 'Viber Number', type: 'tel', required: false, placeholder: 'Viber contact number (optional)' },
//     { name: 'websiteLink', label: 'Website Link', type: 'url', required: false, placeholder: 'https://yourwebsite.com' },
//     { name: 'fbLink', label: 'Facebook Link', type: 'url', required: false, placeholder: 'https://facebook.com/yourpage' },
//     { name: 'tiktokLink', label: 'TikTok Link', type: 'url', required: false, placeholder: 'https://tiktok.com/@yourprofile' },
//     { name: 'googleMapLink', label: 'Google Map Link', type: 'url', required: false, placeholder: 'Link to Google Maps location' },
// ];


// function BusinessRegister({ setCurrentView, views, currentUser }) { 
    
//     const [industryOptions, setIndustryOptions] = useState([]);
//     const [isOptionsLoading, setIsOptionsLoading] = useState(true);
//     const [formData, setFormData] = useState({}); 
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     // ⭐️ UPDATED CODE: 1. MODIFIED FIELD DEFS to make ALL fields optional ⭐️
//     const MODIFIED_FIELDS_BASE = useMemo(() => {
//         return BUSINESS_FIELDS_BASE.map(field => {
//             // Force ALL fields to be optional (required: false)
//             return { ...field, required: false };
//         });
//     }, []);
    
//     // --- Fetch industry options from Firestore ---
//     useEffect(() => {
//         const settingsDocRef = doc(db, 'settings', 'global');
        
//         const unsubscribe = onSnapshot(settingsDocRef, (docSnap) => {
//             let fetchedOptions = [];
            
//             if (docSnap.exists() && docSnap.data().industryOptions) {
//                 const rawOptions = docSnap.data().industryOptions;
                
//                 if (Array.isArray(rawOptions)) {
//                     fetchedOptions = rawOptions;
//                 } else if (typeof rawOptions === 'string') {
//                     fetchedOptions = rawOptions
//                         .split(',')
//                         .map(item => item.trim())
//                         .filter(item => item.length > 0);
//                 }
//             } 
            
//             if (fetchedOptions.length > 0) {
//                 // Add an initial empty/placeholder option for optionality
//                 setIndustryOptions(['', ...new Set(fetchedOptions)].sort());
//             } else {
//                 setIndustryOptions(['', 'IT', 'Test', 'General', 'Unspecified Industry']); 
//             }
//             setIsOptionsLoading(false);
            
//         }, (error) => {
//             console.error("Error fetching industry options:", error);
//             setIndustryOptions(['', 'IT', 'Test', 'General', 'Unspecified Industry']); 
//             setIsOptionsLoading(false);
//         });

//         return () => unsubscribe(); 
//     }, []);


//     // --- 2. Dynamically Inject Options & Create Final Field List ---
//     const BUSINESS_FIELDS = useMemo(() => {
//         return MODIFIED_FIELDS_BASE.map(field => {
//             if (field.name === 'type') {
//                 return { ...field, options: industryOptions };
//             }
//             return field;
//         });
//     }, [industryOptions, MODIFIED_FIELDS_BASE]);


//     // 3. Initialize formData with defaults AND current user data
//     useEffect(() => {
//         if (industryOptions.length > 0) {
//             const initial = BUSINESS_FIELDS.reduce((acc, field) => {
//                 // Set default for all fields to an empty string, including the select field
//                 acc[field.name] = ''; 
//                 return acc;
//             }, {});
            
//             // PRE-FILL OWNER NAME AND PHONE NUMBER FROM LOGGED-IN MEMBER
//             if (currentUser) {
//                 initial.ownerName = currentUser.ownerName || '';
//                 initial.phNo = currentUser.phoneNumber || '';
//             }

//             setFormData(initial);
//         }
//     }, [industryOptions, BUSINESS_FIELDS, currentUser]);


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const submissionData = {
//                 'Business Name': formData.businessName,
//                 'Owner Name': formData.ownerName,
//                 'Industry Type': formData.type, 
//                 'Logo URL': formData.logo,
//                 'Physical Address': formData.address,
//                 'Email Address': formData.email,
//                 'Phone Number': formData.phNo,
//                 'Viber Number': formData.viberNo,
//                 'Website Link': formData.websiteLink,
//                 'Facebook Link': formData.fbLink,
//                 'Tiktok Link': formData.tiktokLink,
//                 'Google Map Link': formData.googleMapLink,
                
//                 'Status': 'Pending Review', 
//                 'Created Date': new Date().toISOString(),
//                 'Member Phone': currentUser?.phoneNumber || 'N/A' 
//             };
            
//             // Remove fields that are empty strings before submission for cleaner data
//             Object.keys(submissionData).forEach(key => {
//                 if (submissionData[key] === '' || submissionData[key] === null) {
//                     delete submissionData[key];
//                 }
//             });

//             // ⚠️ Safety Check: Prevent submitting a completely empty business (optional, but wise)
//             if (Object.keys(submissionData).length <= 3) { // 3 fields are 'Status', 'Created Date', 'Member Phone'
//                  alert("Please fill in at least one business-specific detail (like Business Name or Address) before submitting.");
//                  return;
//             }

//             await addDoc(collection(db, 'businesses'), submissionData);
            
//             setIsSubmitted(true);
//         } catch (error) {
//             console.error("Error adding business registration: ", error);
//             alert("Registration failed. Please check your network and try again.");
//         }

//     }

//     // --- Conditional Render: Loading State ---
//     if (isOptionsLoading || Object.keys(formData).length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center">
//                 <h2 className="text-xl text-gray-700">Loading registration form...</h2>
//             </div>
//         );
//     }

//     // --- Conditional Render: Success State ---
//     if (isSubmitted) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 text-center">
//                 <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-green-600 max-w-lg w-full text-white">
//                     <div className="text-6xl text-green-500 mb-6">✅</div>
//                     <h2 className="text-3xl font-bold text-green-400 mb-4">Submission Complete!</h2>
//                     <p className="text-gray-300 mb-8 text-lg">
//                         Thank you for registering. Your listing is **pending review**.
//                     </p>
//                     <button
//                         onClick={() => setCurrentView(views.MEMBER_DASHBOARD)} 
//                         className="w-full px-6 py-3 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg mt-4"
//                     >
//                         Return to Dashboard
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // --- Component for a Field Group ---
//     const renderField = (field) => {
//         const currentField = BUSINESS_FIELDS.find(f => f.name === field.name) || field;
//         const fieldValue = formData[currentField.name] || ''; 

//         return (
//             <div key={currentField.name} className={currentField.name === 'address' ? 'md:col-span-2' : ''}>
//                 <label htmlFor={currentField.name} className="block text-sm font-semibold text-gray-700 mb-1">
//                     {currentField.label} 
//                 </label>
                
//                 {currentField.type === 'select' ? (
//                     <select
//                         id={currentField.name}
//                         name={currentField.name}
//                         value={fieldValue}
//                         onChange={handleChange}
//                         // ⭐️ Final Change: required={false} for the select field ⭐️
//                         required={false} 
//                         className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
//                     >
//                         {currentField.options.map((option, index) => (
//                             // Add a placeholder/empty option when it is the first index
//                             <option key={option || index} value={option}>{option || "--- Select an Industry (Optional) ---"}</option>
//                         ))}
//                     </select>
//                 ) : (
//                     <input
//                         id={currentField.name}
//                         type={currentField.type}
//                         name={currentField.name}
//                         // ⭐️ This was already correct: required={false} for input fields ⭐️
//                         required={false} 
//                         value={fieldValue}
//                         onChange={handleChange}
//                         placeholder={currentField.placeholder}
//                         className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
//                     />
//                 )}
//             </div>
//         );
//     };

//     // --- Main Form Render ---
//     return (
//         <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
//             <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
                
//                 <div className="bg-yellow-600 text-white p-6 flex justify-between items-center">
//                     <h2 className="text-xl font-extrabold">Business Registration</h2>
//                     <button
//                         onClick={() => setCurrentView(views.MEMBER_DASHBOARD)}
//                         className="text-md px-3 py-1 border border-black/50 text-white-500 rounded-full cursor-pointer hover:bg-black hover:text-white-600 transition duration-200"
//                     >
//                         ← Back to Dashboard
//                     </button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
//                     <p className="text-gray-600 text-lg">
//                         Welcome! Please fill in the details below to list your business.
//                         <br />
//                         <span className="font-semibold text-blue-600">Your information (Owner Name, Phone Number) has been pre-filled from your member account. All fields are now optional for flexible submission.</span>
//                     </p>
                    
//                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-6">
//                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">1. Core Information</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                             {BUSINESS_FIELDS_BASE.slice(0, 8).map(renderField)}
//                         </div>
//                     </div>

//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-6">
//                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">2. Online Presence (Optional)</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                             {BUSINESS_FIELDS_BASE.slice(8).map(renderField)}
//                         </div>
//                     </div>

//                     <div className="pt-6 border-t mt-6">
//                         <button
//                             type="submit"
//                             className="w-full sm:w-1/2 mx-auto p-3 flex justify-center  border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500/50 transition duration-200 transform hover:scale-[1.01]"
//                         >
//                             Submit Registration
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
// export default BusinessRegister;
import React, { useState, useMemo, useEffect } from 'react'; 
import { db } from '../../firebase'; 
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'; 

// Define the required input fields
const BUSINESS_FIELDS_BASE = [
    { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
    { name: 'ownerName', label: 'Owner Name', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
    { name: 'type', label: 'Industry Type', type: 'select', required: true, options: [] }, 
    { name: 'logo', label: 'Logo URL', type: 'url', required: false, placeholder: 'Link to your logo image' },
    { name: 'address', label: 'Physical Address', type: 'text', required: true, placeholder: 'Street address, floor, etc.' },
    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'contact@business.com' },
    { name: 'phNo', label: 'Phone Number', type: 'tel', required: true, placeholder: 'e.g., 09 123 456 789' },
    { name: 'viberNo', label: 'Viber Number', type: 'tel', required: false, placeholder: 'Viber contact number (optional)' },
    { name: 'websiteLink', label: 'Website Link', type: 'url', required: false, placeholder: 'https://yourwebsite.com' },
    { name: 'fbLink', label: 'Facebook Link', type: 'url', required: false, placeholder: 'https://facebook.com/yourpage' },
    { name: 'tiktokLink', label: 'TikTok Link', type: 'url', required: false, placeholder: 'https://tiktok.com/@yourprofile' },
    { name: 'googleMapLink', label: 'Google Map Link', type: 'url', required: false, placeholder: 'Link to Google Maps location' },
];


function BusinessRegister({ setCurrentView, views, currentUser }) { 
    
    const [industryOptions, setIndustryOptions] = useState([]);
    const [isOptionsLoading, setIsOptionsLoading] = useState(true);
    const [formData, setFormData] = useState({}); 
    const [isSubmitted, setIsSubmitted] = useState(false);

    // ⭐️ UPDATED CODE: 1. MODIFIED FIELD DEFS to make ALL fields optional ⭐️
    const MODIFIED_FIELDS_BASE = useMemo(() => {
        return BUSINESS_FIELDS_BASE.map(field => {
            // Force ALL fields to be optional (required: false)
            return { ...field, required: false };
        });
    }, []);
    
    // --- Fetch industry options from Firestore ---
    useEffect(() => {
        const settingsDocRef = doc(db, 'settings', 'global');
        
        const unsubscribe = onSnapshot(settingsDocRef, (docSnap) => {
            let fetchedOptions = [];
            
            if (docSnap.exists() && docSnap.data().industryOptions) {
                const rawOptions = docSnap.data().industryOptions;
                
                if (Array.isArray(rawOptions)) {
                    fetchedOptions = rawOptions;
                } else if (typeof rawOptions === 'string') {
                    fetchedOptions = rawOptions
                        .split(',')
                        .map(item => item.trim())
                        .filter(item => item.length > 0);
                }
            } 
            
            if (fetchedOptions.length > 0) {
                // Add an initial empty/placeholder option for optionality
                setIndustryOptions(['', ...new Set(fetchedOptions)].sort());
            } else {
                setIndustryOptions(['', 'IT', 'Test', 'General', 'Unspecified Industry']); 
            }
            setIsOptionsLoading(false);
            
        }, (error) => {
            console.error("Error fetching industry options:", error);
            setIndustryOptions(['', 'IT', 'Test', 'General', 'Unspecified Industry']); 
            setIsOptionsLoading(false);
        });

        return () => unsubscribe(); 
    }, []);


    // --- 2. Dynamically Inject Options & Create Final Field List ---
    const BUSINESS_FIELDS = useMemo(() => {
        return MODIFIED_FIELDS_BASE.map(field => {
            if (field.name === 'type') {
                return { ...field, options: industryOptions };
            }
            return field;
        });
    }, [industryOptions, MODIFIED_FIELDS_BASE]);


    // 3. Initialize formData with defaults AND current user data
    useEffect(() => {
        if (industryOptions.length > 0) {
            const initial = BUSINESS_FIELDS.reduce((acc, field) => {
                // Set default for all fields to an empty string, including the select field
                acc[field.name] = ''; 
                return acc;
            }, {});
            
            // ⭐️ NEW LOGIC: Set default 'type' to the first actual industry ⭐️
            // If the array has more than just the initial empty string placeholder
            if (industryOptions.length > 1) {
                initial.type = industryOptions[1]; 
            }

            // ⭐️ FIX A: Use standardized Firestore keys for pre-fill ⭐️
            if (currentUser) {
                initial.ownerName = currentUser['Owner Name'] || currentUser.ownerName || '';
                initial.phNo = currentUser['Phone Number'] || currentUser.phoneNumber || '';
            }

            setFormData(initial);
        }
    }, [industryOptions, BUSINESS_FIELDS, currentUser]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const submissionData = {
                'Business Name': formData.businessName,
                'Owner Name': formData.ownerName,
                'Industry Type': formData.type, 
                'Logo URL': formData.logo,
                'Physical Address': formData.address,
                'Email Address': formData.email,
                
                // ⭐️ CRITICAL FIX B: This is the exact field key the Dashboard queries! ⭐️
                'Phone Number': formData.phNo, 
                
                'Viber Number': formData.viberNo,
                'Website Link': formData.websiteLink,
                'Facebook Link': formData.fbLink,
                'Tiktok Link': formData.tiktokLink,
                'Google Map Link': formData.googleMapLink,
                
                'Status': 'Pending Review', 
                'Created Date': new Date().toISOString(),
                
                // ❌ Removed the incorrect and redundant 'Member Phone' field.
            };
            
            // Remove fields that are empty strings before submission for cleaner data
            Object.keys(submissionData).forEach(key => {
                if (submissionData[key] === '' || submissionData[key] === null) {
                    delete submissionData[key];
                }
            });

            // ⚠️ Safety Check: Prevent submitting a completely empty business 
            // Only 'Status' and 'Created Date' should remain if nothing else is entered.
            if (Object.keys(submissionData).length <= 2) { 
                 alert("Please fill in at least one business-specific detail (like Business Name or Address) before submitting.");
                 return;
            }

            await addDoc(collection(db, 'businesses'), submissionData);
            
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error adding business registration: ", error);
            alert("Registration failed. Please check your network and try again.");
        }

    }

    // --- Conditional Render: Loading State ---
    if (isOptionsLoading || Object.keys(formData).length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center">
                <h2 className="text-xl text-gray-700">Loading registration form...</h2>
            </div>
        );
    }

    // --- Conditional Render: Success State ⭐️ DESIGN UPDATED ⭐️ ---
    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-center">
                <div className="bg-white p-10 rounded-2xl shadow-2xl border-4 border-blue-200 max-w-lg w-full text-gray-800">
                    <div className="text-6xl text-green-500 mb-6">✅</div>
                    <h2 className="text-3xl font-extrabold text-blue-700 mb-4">Submission Complete!</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Thank you for registering. Your listing is **pending review**.
                    </p>
                    <button
                        onClick={() => setCurrentView(views.MEMBER_DASHBOARD)} 
                        className="w-full px-6 py-3 bg-blue-600 text-white font-extrabold rounded-lg hover:bg-blue-700 transition duration-150 shadow-lg mt-4 text-lg"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // --- Component for a Field Group ---
    const renderField = (field) => {
        const currentField = BUSINESS_FIELDS.find(f => f.name === field.name) || field;
        const fieldValue = formData[currentField.name] || ''; 

        return (
            <div key={currentField.name} className={currentField.name === 'address' ? 'md:col-span-2' : ''}>
                <label htmlFor={currentField.name} className="block text-sm font-semibold text-gray-700 mb-1">
                    {currentField.label} 
                </label>
                
                {currentField.type === 'select' ? (
                    <select
                        id={currentField.name}
                        name={currentField.name}
                        value={fieldValue}
                        onChange={handleChange}
                        required={false} 
                        className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
                    >
                        {currentField.options.map((option, index) => (
                            // Use placeholder text only if the option value is the empty string
                            <option key={option || index} value={option}>{option || "--- Select an Industry (Optional) ---"}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={currentField.name}
                        type={currentField.type}
                        name={currentField.name}
                        required={false} 
                        value={fieldValue}
                        onChange={handleChange}
                        placeholder={currentField.placeholder}
                        // ⭐️ Input Focus Color Updated to Blue ⭐️
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    />
                )}
            </div>
        );
    };

    // --- Main Form Render ⭐️ DESIGN UPDATED ⭐️ ---
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
            <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8 border-4 border-gray-200">
                
                {/* ⭐️ HEADER: Changed to Blue ⭐️ */}
                <div className="bg-blue-700 text-white p-6 flex justify-between items-center shadow-lg">
                    <h2 className="text-2xl font-extrabold tracking-wide">Business Registration</h2>
                    <button
                        onClick={() => setCurrentView(views.MEMBER_DASHBOARD)}
                        className="text-md px-4 py-2 border border-blue-500 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200 font-semibold shadow-md"
                    >
                        ← Back to Dashboard
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
                    <p className="text-gray-600 text-lg">
                        Welcome! Please fill in the details below to list your business.
                        <br />
                        <span className="font-semibold text-blue-600">Your information (Owner Name, Phone Number) has been pre-filled from your member account. All fields are now optional for flexible submission.</span>
                    </p>
                    
                    {/* CORE INFO SECTION */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">1. Core Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {BUSINESS_FIELDS_BASE.slice(0, 8).map(renderField)}
                        </div>
                    </div>

                    {/* ONLINE PRESENCE SECTION */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">2. Online Presence (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {BUSINESS_FIELDS_BASE.slice(8).map(renderField)}
                        </div>
                    </div>

                    <div className="pt-6 border-t mt-6">
                        {/* ⭐️ SUBMIT BUTTON: Changed to Blue ⭐️ */}
                        <button
                            type="submit"
                            className="w-full sm:w-1/2 mx-auto p-3 flex justify-center border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50 transition duration-200 transform hover:scale-[1.01]"
                        >
                            Submit Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default BusinessRegister;