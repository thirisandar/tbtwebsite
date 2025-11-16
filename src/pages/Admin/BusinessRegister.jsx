// // // // src/pages/Admin/BusinessRegister.jsx
// // // import React, { useState } from 'react';

// // // // Define the required input fields for easy mapping
// // // const BUSINESS_FIELDS = [
// // //     { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
// // //     { name: 'ownerName', label: 'Owner Name', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
// // //     { name: 'type', label: 'Industry Type', type: 'select', required: true, options: ['IT', 'Food', 'Industry', 'General'] },
// // //     { name: 'logo', label: 'Logo URL', type: 'url', required: false, placeholder: 'Link to your logo image' },
// // //     { name: 'address', label: 'Physical Address', type: 'text', required: true, placeholder: 'Street address, floor, etc.' },
// // //     { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'contact@business.com' },
// // //     { name: 'phNo', label: 'Phone Number', type: 'tel', required: true, placeholder: 'e.g., 09 123 456 789' },
// // //     { name: 'viberNo', label: 'Viber Number', type: 'tel', required: false, placeholder: 'Viber contact number (optional)' },
// // //     { name: 'websiteLink', label: 'Website Link', type: 'url', required: false, placeholder: 'https://yourwebsite.com' },
// // //     { name: 'fbLink', label: 'Facebook Link', type: 'url', required: false, placeholder: 'https://facebook.com/yourpage' },
// // //     { name: 'tiktokLink', label: 'TikTok Link', type: 'url', required: false, placeholder: 'https://tiktok.com/@yourprofile' },
// // //     { name: 'googleMapLink', label: 'Google Map Link', type: 'url', required: false, placeholder: 'Link to Google Maps location' },
// // // ];


// // // function BusinessRegister({ setCurrentView, views , addBusiness}) {
// // //     // Initial state setup
// // //     const initialFormState = BUSINESS_FIELDS.reduce((acc, field) => {
// // //         acc[field.name] = field.type === 'select' ? field.options[0] : '';
// // //         return acc;
// // //     }, {});
    
// // //     const [formData, setFormData] = useState(initialFormState);
// // //     const [isSubmitted, setIsSubmitted] = useState(false);

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData(prev => ({ ...prev, [name]: value }));
// // //     };

// // //     const handleSubmit = (e) => {
// // //         e.preventDefault();
// // //         // ⚠️ In a REAL application, this is where you would send data to your backend API
// // //         console.log("Form Data Submitted:", formData);
// // //         addBusiness(formData);

// // //         setIsSubmitted(true);

// // //     };


// // //     if (isSubmitted) {
// // //         return (
// // //             <div className="min-h-screen flex items-center justify-center bg-green-50 p-4 text-center">
// // //                 <div className="bg-white p-8 rounded-xl shadow-2xl border border-green-300 max-w-lg">
// // //                     <h2 className="text-3xl font-bold text-green-700 mb-4">Submission Successful! 🎉</h2>
// // //                     <p className="text-gray-600 mb-6">
// // //                         Thank you for registering your business, **{formData.businessName}**. Your listing is now pending review by our TBT Admin team.
// // //                     </p>
// // //                     <button
// // //                         onClick={() => setCurrentView(views.HOME)}
// // //                         className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
// // //                     >
// // //                         Return to TBT Website
// // //                     </button>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     // --- Component for a Field Group ---
// // //     const renderField = (field) => (
// // //         <div key={field.name} className={field.name === 'address' ? 'md:col-span-2' : ''}>
// // //             <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
// // //                 {field.label} {field.required && <span className="text-red-500">*</span>}
// // //             </label>
            
// // //             {field.type === 'select' ? (
// // //                 <select
// // //                     id={field.name}
// // //                     name={field.name}
// // //                     value={formData[field.name]}
// // //                     onChange={handleChange}
// // //                     required={field.required}
// // //                     className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
// // //                 >
// // //                     {field.options.map(option => (
// // //                         <option key={option} value={option}>{option}</option>
// // //                     ))}
// // //                 </select>
// // //             ) : (
// // //                 <input
// // //                     id={field.name}
// // //                     type={field.type}
// // //                     name={field.name}
// // //                     required={field.required}
// // //                     value={formData[field.name]}
// // //                     onChange={handleChange}
// // //                     placeholder={field.placeholder}
// // //                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
// // //                 />
// // //             )}
// // //         </div>
// // //     );

// // //     return (
// // //         <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
// // //             <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
                
// // //                 {/* Header Section (Blue strip for visual interest) */}
// // //                 <div className="bg-yellow-600 text-white p-6 flex justify-between items-center">
// // //                     <h2 className="text-3xl font-extrabold">
// // //                         Business Registration
// // //                     </h2>
// // //                     <button
// // //                         onClick={() => setCurrentView(views.HOME)}
// // //                         className="text-md  px-3 py-1 border border-white/50 rounded-full cursor-pointer hover:bg-white hover:text-blue-600 transition duration-200"
// // //                     >
// // //                         ← Back to Home
// // //                     </button>
// // //                 </div>

// // //                 {/* Form Body */}
// // //                 <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
// // //                     <p className="text-gray-600 text-lg">
// // //                         Welcome! Please fill in the details below to list your business on the TBT Directory.
// // //                     </p>
                    
// // //                     {/* 1. Primary Contact & Identity */}
// // //                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-6">
// // //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// // //                             1. Core Information
// // //                         </h3>
// // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// // //                             {renderField(BUSINESS_FIELDS[0])} {/* Business Name */}
// // //                             {renderField(BUSINESS_FIELDS[1])} {/* Owner Name */}
// // //                             {renderField(BUSINESS_FIELDS[2])} {/* Logo URL */}
// // //                             {renderField(BUSINESS_FIELDS[3])} {/* Type */}
// // //                             {renderField(BUSINESS_FIELDS[4])} {/* Address (Span 2 columns) */}
// // //                             {renderField(BUSINESS_FIELDS[5])} {/* Email */}
// // //                             {renderField(BUSINESS_FIELDS[6])} {/* Phone No */}
// // //                             {renderField(BUSINESS_FIELDS[7])} {/* Viber No */}
// // //                         </div>
// // //                     </div>

// // //                     {/* 2. Social & Location Links */}
// // //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-6">
// // //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// // //                             2. Online Presence (Optional)
// // //                         </h3>
// // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// // //                             {renderField(BUSINESS_FIELDS[8])}  {/* Website Link */}
// // //                             {renderField(BUSINESS_FIELDS[9])}  {/* FB Link */}
// // //                             {renderField(BUSINESS_FIELDS[10])} {/* TikTok Link */}
// // //                             {renderField(BUSINESS_FIELDS[11])} {/* Google Map Link */}
// // //                         </div>
// // //                     </div>

// // //                     {/* Submit Button */}
// // //                     <div className="pt-6 border-t mt-6">
// // //                         <button
// // //                             type="submit"
// // //                             className="w-full flex justify-center py-4 px-4 border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500/50 transition duration-200 transform hover:scale-[1.01]"
// // //                         >
// // //                             Submit & Complete Registration
// // //                         </button>
// // //                     </div>
// // //                 </form>
// // //             </div>
// // //         </div>
// // //     );
// // // }
// // // export default BusinessRegister;
// // // src/pages/Admin/BusinessRegister.jsx
// // import React, { useState } from 'react';

// // // Define the required input fields for easy mapping
// // const BUSINESS_FIELDS = [
// //     { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
// //     { name: 'ownerName', label: 'Owner Name', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
// //     // Index 2: Industry Type
// //     { name: 'type', label: 'Industry Type', type: 'select', required: true, options: ['IT', 'Food', 'Industry', 'General'] },
// //     // Index 3: Logo URL
// //     { name: 'logo', label: 'Logo URL', type: 'url', required: false, placeholder: 'Link to your logo image' },
// //     // Index 4: Physical Address
// //     { name: 'address', label: 'Physical Address', type: 'text', required: true, placeholder: 'Street address, floor, etc.' },
// //     // Index 5: Email Address
// //     { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'contact@business.com' },
// //     // Index 6: Phone Number
// //     { name: 'phNo', label: 'Phone Number', type: 'tel', required: true, placeholder: 'e.g., 09 123 456 789' },
// //     // Index 7: Viber Number
// //     { name: 'viberNo', label: 'Viber Number', type: 'tel', required: false, placeholder: 'Viber contact number (optional)' },
// //     // Index 8: Website Link
// //     { name: 'websiteLink', label: 'Website Link', type: 'url', required: false, placeholder: 'https://yourwebsite.com' },
// //     // Index 9: Facebook Link
// //     { name: 'fbLink', label: 'Facebook Link', type: 'url', required: false, placeholder: 'https://facebook.com/yourpage' },
// //     // Index 10: TikTok Link
// //     { name: 'tiktokLink', label: 'TikTok Link', type: 'url', required: false, placeholder: 'https://tiktok.com/@yourprofile' },
// //     // Index 11: Google Map Link
// //     { name: 'googleMapLink', label: 'Google Map Link', type: 'url', required: false, placeholder: 'Link to Google Maps location' },
// // ];


// // function BusinessRegister({ setCurrentView, views , addBusiness}) {
// //     // Initial state setup
// //     const initialFormState = BUSINESS_FIELDS.reduce((acc, field) => {
// //         acc[field.name] = field.type === 'select' ? field.options[0] : '';
// //         return acc;
// //     }, {});
    
// //     const [formData, setFormData] = useState(initialFormState);
// //     const [isSubmitted, setIsSubmitted] = useState(false);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
        
// //         // ⭐️ CALL addBusiness: This function (passed from App.jsx) handles state update and localStorage saving.
// //         addBusiness(formData);

// //         // We no longer set isSubmitted=true here because addBusiness navigates to HOME
// //         // We can optionally keep isSubmitted for the success screen, but your App.jsx
// //         // logic should handle the navigation back to HOME. Let's assume App.jsx handles navigation.
// //         setIsSubmitted(true);
// //         // Note: If addBusiness doesn't navigate, the success screen logic below will run.
// //     };


// //     if (isSubmitted) {
// //         // ⚠️ If App.jsx handles navigation (setCurrentView(VIEWS.HOME)), this screen is skipped.
// //         // I will keep this success screen here as a fallback/confirmation step.
// //         return (
// //             <div className="min-h-screen flex items-center justify-center bg-green-50 p-4 text-center">
// //                 <div className="bg-white p-8 rounded-xl shadow-2xl border border-green-300 max-w-lg">
// //                     <h2 className="text-3xl font-bold text-green-700 mb-4">Submission Successful! 🎉</h2>
// //                     <p className="text-gray-600 mb-6">
// //                         Thank you for registering your business, **{formData.businessName}**. Your listing is now pending review by our TBT Admin team.
// //                     </p>
// //                     <button
// //                         onClick={() => setCurrentView(views.HOME)}
// //                         className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
// //                     >
// //                         Return to TBT Website
// //                     </button>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     // --- Component for a Field Group (Same) ---
// //     const renderField = (field) => (
// //         <div key={field.name} className={field.name === 'address' ? 'md:col-span-2' : ''}>
// //             <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
// //                 {field.label} {field.required && <span className="text-red-500">*</span>}
// //             </label>
            
// //             {field.type === 'select' ? (
// //                 <select
// //                     id={field.name}
// //                     name={field.name}
// //                     value={formData[field.name]}
// //                     onChange={handleChange}
// //                     required={field.required}
// //                     className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
// //                 >
// //                     <option value="" disabled>Select {field.label}</option> 
// //                     {field.options.map(option => (
// //                         <option key={option} value={option}>{option}</option>
// //                     ))}
// //                 </select>
// //             ) : (
// //                 <input
// //                     id={field.name}
// //                     type={field.type}
// //                     name={field.name}
// //                     required={field.required}
// //                     value={formData[field.name]}
// //                     onChange={handleChange}
// //                     placeholder={field.placeholder}
// //                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
// //                 />
// //             )}
// //         </div>
// //     );

// //     return (
// //         <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
// //             <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
                
// //                 {/* Header Section (Same) */}
// //                 <div className="bg-yellow-600 text-white p-6 flex justify-between items-center">
// //                     <h2 className="text-3xl font-extrabold">
// //                         Business Registration
// //                     </h2>
// //                     <button
// //                         onClick={() => setCurrentView(views.HOME)}
// //                         className="text-md  px-3 py-1 border border-white/50 rounded-full cursor-pointer hover:bg-white hover:text-blue-600 transition duration-200"
// //                     >
// //                         ← Back to Home
// //                     </button>
// //                 </div>

// //                 {/* Form Body */}
// //                 <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
// //                     <p className="text-gray-600 text-lg">
// //                         Welcome! Please fill in the details below to list your business on the TBT Directory.
// //                     </p>
                    
// //                     {/* 1. Primary Contact & Identity */}
// //                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-6">
// //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// //                             1. Core Information
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// //                             {renderField(BUSINESS_FIELDS[0])} {/* Business Name */}
// //                             {renderField(BUSINESS_FIELDS[1])} {/* Owner Name */}
// //                             {renderField(BUSINESS_FIELDS[2])} {/* ⭐️ Industry Type (Index 2) - Corrected */}
// //                             {renderField(BUSINESS_FIELDS[3])} {/* ⭐️ Logo URL (Index 3) - Corrected */}
// //                             {renderField(BUSINESS_FIELDS[4])} {/* Address (Span 2 columns) */}
// //                             {renderField(BUSINESS_FIELDS[5])} {/* Email */}
// //                             {renderField(BUSINESS_FIELDS[6])} {/* Phone No */}
// //                             {renderField(BUSINESS_FIELDS[7])} {/* Viber No */}
// //                         </div>
// //                     </div>

// //                     {/* 2. Social & Location Links */}
// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-6">
// //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// //                             2. Online Presence (Optional)
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// //                             {renderField(BUSINESS_FIELDS[8])}  {/* Website Link */}
// //                             {renderField(BUSINESS_FIELDS[9])}  {/* FB Link */}
// //                             {renderField(BUSINESS_FIELDS[10])} {/* TikTok Link */}
// //                             {renderField(BUSINESS_FIELDS[11])} {/* Google Map Link */}
// //                         </div>
// //                     </div>

// //                     {/* Submit Button */}
// //                     <div className="pt-6 border-t mt-6">
// //                         <button
// //                             type="submit"
// //                             className="w-full flex justify-center py-4 px-4 border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500/50 transition duration-200 transform hover:scale-[1.01]"
// //                         >
// //                             Submit & Complete Registration
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }
// // export default BusinessRegister;
// // src/pages/Admin/BusinessRegister.jsx
// // import React, { useState } from 'react';

// // // Define the required input fields for easy mapping
// // const BUSINESS_FIELDS = [
// //     { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
// //     { name: 'ownerName', label: 'Owner Name', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
// //     // Index 2: Industry Type
// //     { name: 'type', label: 'Industry Type', type: 'select', required: true, options: ['IT', 'Food', 'Industry', 'General'] },
// //     // Index 3: Logo URL
// //     { name: 'logo', label: 'Logo URL', type: 'url', required: false, placeholder: 'Link to your logo image (e.g., https://example.com/logo.jpg)' },
// //     // Index 4: Physical Address
// //     { name: 'address', label: 'Physical Address', type: 'text', required: true, placeholder: 'Street address, floor, etc.' },
// //     // Index 5: Email Address
// //     { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'contact@business.com' },
// //     // Index 6: Phone Number
// //     { name: 'phNo', label: 'Phone Number', type: 'tel', required: true, placeholder: 'e.g., 09 123 456 789' },
// //     // Index 7: Viber Number
// //     { name: 'viberNo', label: 'Viber Number', type: 'tel', required: false, placeholder: 'Viber contact number (optional)' },
// //     // Index 8: Website Link
// //     { name: 'websiteLink', label: 'Website Link', type: 'url', required: false, placeholder: 'https://yourwebsite.com' },
// //     // Index 9: Facebook Link
// //     { name: 'fbLink', label: 'Facebook Link', type: 'url', required: false, placeholder: 'https://facebook.com/yourpage' },
// //     // Index 10: TikTok Link
// //     { name: 'tiktokLink', label: 'TikTok Link', type: 'url', required: false, placeholder: 'https://tiktok.com/@yourprofile' },
// //     // Index 11: Google Map Link
// //     { name: 'googleMapLink', label: 'Google Map Link', type: 'url', required: false, placeholder: 'Link to Google Maps location' },
// // ];



// // function BusinessRegister({ setCurrentView, views , addBusiness}) {
// //     // Initial state setup
// //     const initialFormState = BUSINESS_FIELDS.reduce((acc, field) => {
// //         // Initialize select fields to the first option, others to empty string
// //         acc[field.name] = field.type === 'select' ? field.options[0] : '';
// //         return acc;
// //     }, {});
    
// //     const [formData, setFormData] = useState(initialFormState);
// //     const [isSubmitted, setIsSubmitted] = useState(false);


    
// //     // Generate Input Change Handler
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
        
// //         // Final business object for logo
// //         const finalBusinessData = { 
// //             ...formData, 
// //             'Logo URL': formData.logo, // ⭐️ USE COMPRESSED DATA HERE ⭐️
// //             Status: 'Pending Review', // Set initial status
// //             id: Date.now() // Simple unique ID
// //         };
// //         // Add business data and set the submission flag
// //         addBusiness(finalBusinessData);

// //         // We set isSubmitted to true to trigger the custom success screen below
// //         setIsSubmitted(true);
// //     };


// //     // ⭐️ CUSTOM SUCCESS SCREEN/MODAL REPLACEMENT ⭐️
// //     if (isSubmitted) {
// //         return (
// //             <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 text-center">
// //                 {/* Custom Modal Box */}
// //                 <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-green-600 max-w-lg w-full text-white">
// //                     <div className="text-6xl text-green-500 mb-6">
// //                         <span role="img" aria-label="Success">✅</span>
// //                     </div>
// //                     <h2 className="text-3xl font-bold text-green-400 mb-4">Submission Complete!</h2>
// //                     <p className="text-gray-300 mb-8 text-lg">
// //                         Thank you for registering **{formData.businessName || 'your business'}**.
// //                         <br/>Your listing is **pending review** by the TBT Admin team and will be visible shortly.
// //                     </p>
// //                     <button
// //                         onClick={() => setCurrentView(views.HOME)}
// //                         className="w-full px-6 py-3 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg mt-4"
// //                     >
// //                         Return to TBT Website
// //                     </button>
// //                 </div>
// //             </div>
// //         );
// //     }



// //     // --- Component for a Field Group (Same) ---
// //     const renderField = (field) => (
// //         <div key={field.name} className={field.name === 'address' ? 'md:col-span-2' : ''}>
// //             <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
// //                 {field.label} {field.required && <span className="text-red-500">*</span>}
// //             </label>
            
// //             {field.type === 'select' ? (
// //                 <select
// //                     id={field.name}
// //                     name={field.name}
// //                     value={formData[field.name]}
// //                     onChange={handleChange}
// //                     required={field.required}
// //                     className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
// //                 >
// //                     <option value="" disabled>Select {field.label}</option> 
// //                     {field.options.map(option => (
// //                         <option key={option} value={option}>{option}</option>
// //                     ))}
// //                 </select>
// //             ) : (
// //                 <input
// //                     id={field.name}
// //                     type={field.type}
// //                     name={field.name}
// //                     required={field.required}
// //                     value={formData[field.name]}
// //                     onChange={handleChange}
// //                     placeholder={field.placeholder}
// //                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
// //                 />
// //             )}
// //         </div>
// //     );

// //     return (
// //         <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
// //             <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
                
// //                 {/* Header Section (Same) */}
// //                 <div className="bg-yellow-600 text-white p-6 flex justify-between items-center">
// //                     <h2 className="text-3xl font-extrabold">
// //                         Business Registration
// //                     </h2>
// //                     <button
// //                         onClick={() => setCurrentView(views.HOME)}
// //                         className="text-md  px-3 py-1 border border-white/50 rounded-full cursor-pointer hover:bg-white hover:text-blue-600 transition duration-200"
// //                     >
// //                         ← Back to Home
// //                     </button>
// //                 </div>

// //                 {/* Form Body */}
// //                 <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
// //                     <p className="text-gray-600 text-lg">
// //                         Welcome! Please fill in the details below to list your business on the TBT Directory.
// //                     </p>
                    
// //                     {/* 1. Primary Contact & Identity */}
// //                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-6">
// //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// //                             1. Core Information
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// //                             {renderField(BUSINESS_FIELDS[0])} {/* Business Name */}
// //                             {renderField(BUSINESS_FIELDS[1])} {/* Owner Name */}
// //                             {renderField(BUSINESS_FIELDS[2])} {/* Industry Type */}
// //                             {renderField(BUSINESS_FIELDS[3])} {/* Logo URL */}
// //                             {renderField(BUSINESS_FIELDS[4])} {/* Address (Span 2 columns) */}
// //                             {renderField(BUSINESS_FIELDS[5])} {/* Email */}
// //                             {renderField(BUSINESS_FIELDS[6])} {/* Phone No */}
// //                             {renderField(BUSINESS_FIELDS[7])} {/* Viber No */}
// //                         </div>
// //                     </div>

// //                     {/* 2. Social & Location Links */}
// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-6">
// //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// //                             2. Online Presence (Optional)
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// //                             {renderField(BUSINESS_FIELDS[8])}  {/* Website Link */}
// //                             {renderField(BUSINESS_FIELDS[9])}  {/* FB Link */}
// //                             {renderField(BUSINESS_FIELDS[10])} {/* TikTok Link */}
// //                             {renderField(BUSINESS_FIELDS[11])} {/* Google Map Link */}
// //                         </div>
// //                     </div>

// //                     {/* Submit Button */}
// //                     <div className="pt-6 border-t mt-6">
// //                         <button
// //                             type="submit"
// //                             className="w-full flex justify-center py-4 px-4 border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500/50 transition duration-200 transform hover:scale-[1.01]"
// //                         >
// //                             Submit & Complete Registration
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }
// // export default BusinessRegister;

// // new
// // src/pages/Admin/BusinessRegister.jsx

// // import React, { useState, useMemo } from 'react'; // ⭐️ Import useMemo

// // // Define the required input fields, but leave options blank for the select field
// // const BUSINESS_FIELDS_BASE = [
// //     { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
// //     { name: 'ownerName', label: 'Owner Name', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
// //     // ⭐️ Leave options blank here; they will be filled dynamically below
// //     { name: 'type', label: 'Industry Type', type: 'select', required: true, options: [] }, 
// //     { name: 'logo', label: 'Logo URL', type: 'url', required: false, placeholder: 'Link to your logo image' },
// //     { name: 'address', label: 'Physical Address', type: 'text', required: true, placeholder: 'Street address, floor, etc.' },
// //     { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'contact@business.com' },
// //     { name: 'phNo', label: 'Phone Number', type: 'tel', required: true, placeholder: 'e.g., 09 123 456 789' },
// //     { name: 'viberNo', label: 'Viber Number', type: 'tel', required: false, placeholder: 'Viber contact number (optional)' },
// //     { name: 'websiteLink', label: 'Website Link', type: 'url', required: false, placeholder: 'https://yourwebsite.com' },
// //     { name: 'fbLink', label: 'Facebook Link', type: 'url', required: false, placeholder: 'https://facebook.com/yourpage' },
// //     { name: 'tiktokLink', label: 'TikTok Link', type: 'url', required: false, placeholder: 'https://tiktok.com/@yourprofile' },
// //     { name: 'googleMapLink', label: 'Google Map Link', type: 'url', required: false, placeholder: 'Link to Google Maps location' },
// // ];


// // // ⭐️ RECEIVE industryOptions as a prop
// // function BusinessRegister({ setCurrentView, views , addBusiness, industryOptions = [] }) {
    
// //     // ⭐️ 1. USE useMemo to dynamically inject the options into the field definition
// //     const BUSINESS_FIELDS = useMemo(() => {
// //         return BUSINESS_FIELDS_BASE.map(field => {
// //             if (field.name === 'type') {
// //                 return { ...field, options: industryOptions };
// //             }
// //             return field;
// //         });
// //     }, [industryOptions]); // Recalculate if industryOptions changes

// //     // 2. Initial state setup now uses the dynamic list
// //     const initialFormState = useMemo(() => {
// //         return BUSINESS_FIELDS.reduce((acc, field) => {
// //             // Set the default selection to the first available option, or empty string if none exist
// //             acc[field.name] = (field.type === 'select' && field.options.length > 0) 
// //                 ? field.options[0] 
// //                 : '';
// //             return acc;
// //         }, {});
// //     }, [BUSINESS_FIELDS]); // Recalculate if BUSINESS_FIELDS (and thus options) changes
    
// //     const [formData, setFormData] = useState(initialFormState);
// //     const [isSubmitted, setIsSubmitted] = useState(false);

// //     // ⭐️ 3. Use an effect to reset formData when initialFormState changes (i.e., when options load/change)
// //     // This ensures the form's default selected value updates when industryOptions load.
// //     React.useEffect(() => {
// //         setFormData(initialFormState);
// //     }, [initialFormState]);


// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
        
// //         addBusiness(formData);
// //         setIsSubmitted(true);
// //     };


// //     if (isSubmitted) {
// //         // ... (Success screen component remains the same)
// //         return (
// //             <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 text-center">
// //                 <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-green-600 max-w-lg w-full text-white">
// //                     <div className="text-6xl text-green-500 mb-6">
// //                         <span role="img" aria-label="Success">✅</span>
// //                     </div>
// //                     <h2 className="text-3xl font-bold text-green-400 mb-4">Submission Complete!</h2>
// //                     <p className="text-gray-300 mb-8 text-lg">
// //                         Thank you for registering **{formData.businessName || 'your business'}**.
// //                         <br/>Your listing is **pending review** by the TBT Admin team and will be visible shortly.
// //                     </p>
// //                     <button
// //                         onClick={() => setCurrentView(views.HOME)}
// //                         className="w-full px-6 py-3 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg mt-4"
// //                     >
// //                         Return to TBT Website
// //                     </button>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     // --- Component for a Field Group ---
// //     const renderField = (field) => {
// //         // Find the corresponding field definition in the dynamic array
// //         const currentField = BUSINESS_FIELDS.find(f => f.name === field.name) || field;

// //         return (
// //             <div key={currentField.name} className={currentField.name === 'address' ? 'md:col-span-2' : ''}>
// //                 <label htmlFor={currentField.name} className="block text-sm font-semibold text-gray-700 mb-1">
// //                     {currentField.label} {currentField.required && <span className="text-red-500">*</span>}
// //                 </label>
                
// //                 {currentField.type === 'select' ? (
// //                     <select
// //                         id={currentField.name}
// //                         name={currentField.name}
// //                         value={formData[currentField.name]}
// //                         onChange={handleChange}
// //                         required={currentField.required}
// //                         className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
// //                     >
// //                         <option value="" disabled={formData[currentField.name] !== ""}>Select {currentField.label}</option> 
// //                         {/* ⭐️ Use the dynamically injected options */}
// //                         {currentField.options.map(option => (
// //                             <option key={option} value={option}>{option}</option>
// //                         ))}
// //                     </select>
// //                 ) : (
// //                     // ... (rest of input logic remains the same)
// //                     <input
// //                         id={currentField.name}
// //                         type={currentField.type}
// //                         name={currentField.name}
// //                         required={currentField.required}
// //                         value={formData[currentField.name]}
// //                         onChange={handleChange}
// //                         placeholder={currentField.placeholder}
// //                         className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
// //                     />
// //                 )}
// //             </div>
// //         );
// //     };

// //     // ... (rest of the component JSX remains the same)
// //     return (
// //         <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
// //             <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
                
// //                 {/* Header Section */}
// //                 <div className="bg-yellow-600 text-white p-6 flex justify-between items-center">
// //                     <h2 className="text-3xl font-extrabold">
// //                         Business Registration
// //                     </h2>
// //                     <button
// //                         onClick={() => setCurrentView(views.HOME)}
// //                         className="text-md  px-3 py-1 border border-white/50 rounded-full cursor-pointer hover:bg-white hover:text-blue-600 transition duration-200"
// //                     >
// //                         ← Back to Home
// //                     </button>
// //                 </div>

// //                 {/* Form Body */}
// //                 <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
// //                     <p className="text-gray-600 text-lg">
// //                         Welcome! Please fill in the details below to list your business on the TBT Directory.
// //                     </p>
                    
// //                     {/* 1. Primary Contact & Identity */}
// //                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-6">
// //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// //                             1. Core Information
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// //                             {renderField(BUSINESS_FIELDS_BASE[0])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[1])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[2])} {/* Industry Type (now dynamic) */}
// //                             {renderField(BUSINESS_FIELDS_BASE[3])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[4])} {/* Address (Span 2 columns) */}
// //                             {renderField(BUSINESS_FIELDS_BASE[5])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[6])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[7])} 
// //                         </div>
// //                     </div>

// //                     {/* 2. Social & Location Links */}
// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-6">
// //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// //                             2. Online Presence (Optional)
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// //                             {renderField(BUSINESS_FIELDS_BASE[8])}  
// //                             {renderField(BUSINESS_FIELDS_BASE[9])}  
// //                             {renderField(BUSINESS_FIELDS_BASE[10])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[11])} 
// //                         </div>
// //                     </div>

// //                     {/* Submit Button */}
// //                     <div className="pt-6 border-t mt-6">
// //                         <button
// //                             type="submit"
// //                             className="w-full flex justify-center py-4 px-4 border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500/50 transition duration-200 transform hover:scale-[1.01]"
// //                         >
// //                             Submit & Complete Registration
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }
// // export default BusinessRegister;

// // import React, { useState, useMemo, useEffect } from 'react'; // ⭐️ ADDED: useEffect
// // // ⭐️ NEW IMPORTS for Firebase/Firestore ⭐️
// // import { db } from '../../firebase'; // Assuming this path
// // import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'; 

// // // Define the required input fields, but leave options blank for the select field
// // const BUSINESS_FIELDS_BASE = [
// //     { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
// //     { name: 'ownerName', label: 'Owner Name', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
// //     // ⭐️ Leave options blank here; they will be filled dynamically below
// //     { name: 'type', label: 'Industry Type', type: 'select', required: true, options: [] }, 
// //     { name: 'logo', label: 'Logo URL', type: 'url', required: false, placeholder: 'Link to your logo image' },
// //     { name: 'address', label: 'Physical Address', type: 'text', required: true, placeholder: 'Street address, floor, etc.' },
// //     { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'contact@business.com' },
// //     { name: 'phNo', label: 'Phone Number', type: 'tel', required: true, placeholder: 'e.g., 09 123 456 789' },
// //     { name: 'viberNo', label: 'Viber Number', type: 'tel', required: false, placeholder: 'Viber contact number (optional)' },
// //     { name: 'websiteLink', label: 'Website Link', type: 'url', required: false, placeholder: 'https://yourwebsite.com' },
// //     { name: 'fbLink', label: 'Facebook Link', type: 'url', required: false, placeholder: 'https://facebook.com/yourpage' },
// //     { name: 'tiktokLink', label: 'TikTok Link', type: 'url', required: false, placeholder: 'https://tiktok.com/@yourprofile' },
// //     { name: 'googleMapLink', label: 'Google Map Link', type: 'url', required: false, placeholder: 'Link to Google Maps location' },
// // ];


// // // ⭐️ MODIFIED: Removed addBusiness and industryOptions props ⭐️
// // function BusinessRegister({ setCurrentView, views }) {
    
// //     // ⭐️ NEW STATE: For dynamic fetching of options
// //     const [industryOptions, setIndustryOptions] = useState([]);
// //     const [isOptionsLoading, setIsOptionsLoading] = useState(true);

// //     // ⭐️ NEW EFFECT: Fetch industry options from Firestore ⭐️
// //     useEffect(() => {
// //         // ASSUMPTION: Options are stored in a 'settings/global' document
// //         const settingsDocRef = doc(db, 'settings', 'global');
        
// //         const unsubscribe = onSnapshot(settingsDocRef, (docSnap) => {
// //             if (docSnap.exists() && Array.isArray(docSnap.data().industryOptions)) {
// //                 // Use fetched options, ensure they are unique and sorted
// //                 const fetchedOptions = [...new Set(docSnap.data().industryOptions)].sort();
// //                 setIndustryOptions(fetchedOptions);
// //             } else {
// //                 // Fallback options if document/field is missing
// //                 setIndustryOptions(['IT', 'General', 'Unspecified Industry']);
// //             }
// //             setIsOptionsLoading(false);
// //         }, (error) => {
// //             console.error("Error fetching industry options:", error);
// //             setIndustryOptions(['IT', 'General', 'Unspecified Industry']); // Use a safe fallback
// //             setIsOptionsLoading(false);
// //         });

// //         return () => unsubscribe(); // Cleanup listener
// //     }, []);


// //     // 1. USE useMemo to dynamically inject the options into the field definition
// //     const BUSINESS_FIELDS = useMemo(() => {
// //         return BUSINESS_FIELDS_BASE.map(field => {
// //             if (field.name === 'type') {
// //                 return { ...field, options: industryOptions };
// //             }
// //             return field;
// //         });
// //     }, [industryOptions]); // Recalculate if industryOptions changes

// //     // 2. Initial state setup now uses the dynamic list
// //     const initialFormState = useMemo(() => {
// //         return BUSINESS_FIELDS.reduce((acc, field) => {
// //             // Set the default selection to the first available option, or empty string if none exist
// //             acc[field.name] = (field.type === 'select' && field.options.length > 0) 
// //                 ? field.options[0] // Set default to the first option
// //                 : '';
// //             return acc;
// //         }, {});
// //     }, [BUSINESS_FIELDS]);
    
// //     const [formData, setFormData] = useState(initialFormState);
// //     const [isSubmitted, setIsSubmitted] = useState(false);

// //     // 3. Use an effect to reset formData when initialFormState changes
// //     React.useEffect(() => {
// //         // Only reset if we've moved from empty state to a populated state
// //         if (industryOptions.length > 0 && formData.type === '') {
// //              setFormData(initialFormState);
// //         }
// //     }, [initialFormState, industryOptions.length, formData.type]);


// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     // ⭐️ UPDATED: Submit handler now handles Firestore logic ⭐️
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
        
// //         try {
// //             // Data mapping and cleanup for Firestore keys
// //             const submissionData = {
// //                 'Business Name': formData.businessName,
// //                 'Owner Name': formData.ownerName,
// //                 'Industry Type': formData.type,
// //                 'Logo URL': formData.logo,
// //                 'Physical Address': formData.address,
// //                 'Email Address': formData.email,
// //                 'Phone Number': formData.phNo,
// //                 'Viber Number': formData.viberNo,
// //                 'Website Link': formData.websiteLink,
// //                 'Facebook Link': formData.fbLink,
// //                 'Tiktok Link': formData.tiktokLink,
// //                 'Google Map Link': formData.googleMapLink,
                
// //                 // Admin fields - ⭐️ Set default Status and Creation Date ⭐️
// //                 'Status': 'Pending', 
// //                 'Created Date': new Date().toISOString(),
// //             };

// //             await addDoc(collection(db, 'businesses'), submissionData);
            
// //             setIsSubmitted(true);
// //         } catch (error) {
// //             console.error("Error adding business registration: ", error);
// //             alert("Registration failed. Please check your network and try again.");
// //         }
// //     };


// //     // ⭐️ NEW: Loading state for options ⭐️
// //     if (isOptionsLoading) {
// //         return (
// //             <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center">
// //                 <h2 className="text-xl text-gray-700">Loading registration form...</h2>
// //             </div>
// //         );
// //     }

// //     if (isSubmitted) {
// //         // ... (Success screen component remains the same)
// //         return (
// //             <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 text-center">
// //                 <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-green-600 max-w-lg w-full text-white">
// //                     <div className="text-6xl text-green-500 mb-6">
// //                         <span role="img" aria-label="Success">✅</span>
// //                     </div>
// //                     <h2 className="text-3xl font-bold text-green-400 mb-4">Submission Complete!</h2>
// //                     <p className="text-gray-300 mb-8 text-lg">
// //                         Thank you for registering **{formData.businessName || 'your business'}**.
// //                         <br/>Your listing is **pending review** by the TBT Admin team and will be visible shortly.
// //                     </p>
// //                     <button
// //                         onClick={() => setCurrentView(views.HOME)}
// //                         className="w-full px-6 py-3 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg mt-4"
// //                     >
// //                         Return to TBT Website
// //                     </button>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     // --- Component for a Field Group ---
// //     const renderField = (field) => {
// //         // Find the corresponding field definition in the dynamic array
// //         const currentField = BUSINESS_FIELDS.find(f => f.name === field.name) || field;

// //         return (
// //             <div key={currentField.name} className={currentField.name === 'address' ? 'md:col-span-2' : ''}>
// //                 <label htmlFor={currentField.name} className="block text-sm font-semibold text-gray-700 mb-1">
// //                     {currentField.label} {currentField.required && <span className="text-red-500">*</span>}
// //                 </label>
                
// //                 {currentField.type === 'select' ? (
// //                     <select
// //                         id={currentField.name}
// //                         name={currentField.name}
// //                         value={formData[currentField.name]}
// //                         onChange={handleChange}
// //                         required={currentField.required}
// //                         className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
// //                     >
// //                         <option value="" disabled={formData[currentField.name] !== ""}>Select {currentField.label}</option> 
// //                         {/* ⭐️ Use the dynamically injected options */}
// //                         {currentField.options.map(option => (
// //                             <option key={option} value={option}>{option}</option>
// //                         ))}
// //                     </select>
// //                 ) : (
// //                     // ... (rest of input logic remains the same)
// //                     <input
// //                         id={currentField.name}
// //                         type={currentField.type}
// //                         name={currentField.name}
// //                         required={currentField.required}
// //                         value={formData[currentField.name]}
// //                         onChange={handleChange}
// //                         placeholder={currentField.placeholder}
// //                         className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
// //                     />
// //                 )}
// //             </div>
// //         );
// //     };

// //     // ... (rest of the component JSX remains the same)
// //     return (
// //         <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
// //             <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
                
// //                 {/* Header Section */}
// //                 <div className="bg-yellow-600 text-white p-6 flex justify-between items-center">
// //                     <h2 className="text-3xl font-extrabold">
// //                         Business Registration
// //                     </h2>
// //                     <button
// //                         onClick={() => setCurrentView(views.HOME)}
// //                         className="text-md  px-3 py-1 border border-white/50 rounded-full cursor-pointer hover:bg-white hover:text-blue-600 transition duration-200"
// //                     >
// //                         ← Back to Home
// //                     </button>
// //                 </div>

// //                 {/* Form Body */}
// //                 <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
// //                     <p className="text-gray-600 text-lg">
// //                         Welcome! Please fill in the details below to list your business on the TBT Directory.
// //                     </p>
                    
// //                     {/* 1. Primary Contact & Identity */}
// //                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-6">
// //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// //                             1. Core Information
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// //                             {renderField(BUSINESS_FIELDS_BASE[0])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[1])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[2])} {/* Industry Type (now dynamic) */}
// //                             {renderField(BUSINESS_FIELDS_BASE[3])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[4])} {/* Address (Span 2 columns) */}
// //                             {renderField(BUSINESS_FIELDS_BASE[5])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[6])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[7])} 
// //                         </div>
// //                     </div>

// //                     {/* 2. Social & Location Links */}
// //                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-6">
// //                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
// //                             2. Online Presence (Optional)
// //                         </h3>
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
// //                             {renderField(BUSINESS_FIELDS_BASE[8])}  
// //                             {renderField(BUSINESS_FIELDS_BASE[9])}  
// //                             {renderField(BUSINESS_FIELDS_BASE[10])} 
// //                             {renderField(BUSINESS_FIELDS_BASE[11])} 
// //                         </div>
// //                     </div>

// //                     {/* Submit Button */}
// //                     <div className="pt-6 border-t mt-6">
// //                         <button
// //                             type="submit"
// //                             className="w-full flex justify-center py-4 px-4 border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500/50 transition duration-200 transform hover:scale-[1.01]"
// //                         >
// //                             Submit & Complete Registration
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }
// // export default BusinessRegister;


// import React, { useState, useMemo, useEffect } from 'react';
// import { db } from '../../firebase'; // Assuming this path
// import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'; 

// // Define the required input fields, but leave options blank for the select field
// const BUSINESS_FIELDS_BASE = [
//     { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
//     { name: 'ownerName', label: 'Owner Name', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
//     // Options will be filled dynamically below
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


// function BusinessRegister({ setCurrentView, views }) {
    
//     // State for dynamic options and form status
//     const [industryOptions, setIndustryOptions] = useState([]);
//     const [isOptionsLoading, setIsOptionsLoading] = useState(true);
//     const [formData, setFormData] = useState({}); // Initialize empty
//     const [isSubmitted, setIsSubmitted] = useState(false);
    
//     // --- 1. Fetch industry options from Firestore ---
//     useEffect(() => {
//         const settingsDocRef = doc(db, 'settings', 'global');
        
//         const unsubscribe = onSnapshot(settingsDocRef, (docSnap) => {
//             if (docSnap.exists() && Array.isArray(docSnap.data().industryOptions)) {
//                 const fetchedOptions = [...new Set(docSnap.data().industryOptions)].sort();
                
//                 // ⭐️ VERIFICATION LOG ⭐️
//                 console.log("Fetched Industry Options from Firestore:", fetchedOptions);

//                 setIndustryOptions(fetchedOptions);
//             } else {
//                 // If not found, use a fallback including the 'IT' and 'Test' you mentioned
//                 const fallback = ['IT', 'Test', 'General', 'Unspecified Industry'];
//                 console.warn("Could not find industry options in settings/global.industryOptions. Using fallback:", fallback);
//                 setIndustryOptions(fallback); 
//             }
//             setIsOptionsLoading(false);
//         }, (error) => {
//             const fallback = ['IT', 'Test', 'General', 'Unspecified Industry'];
//             console.error("Error fetching industry options, using fallback:", error);
//             setIndustryOptions(fallback); 
//             setIsOptionsLoading(false);
//         });

//         return () => unsubscribe(); // Cleanup listener
//     }, []);


//     // --- 2. Dynamically inject options into field definition ---
//     const BUSINESS_FIELDS = useMemo(() => {
//         return BUSINESS_FIELDS_BASE.map(field => {
//             if (field.name === 'type') {
//                 return { ...field, options: industryOptions };
//             }
//             return field;
//         });
//     }, [industryOptions]);


//     // --- 3. Initialize formData once options are loaded (The Fix) ---
//     useEffect(() => {
//         if (industryOptions.length > 0 && Object.keys(formData).length === 0) {
            
//             const initial = BUSINESS_FIELDS.reduce((acc, field) => {
//                 acc[field.name] = (field.type === 'select' && field.options.length > 0) 
//                     ? field.options[0] 
//                     : '';
//                 return acc;
//             }, {});
            
//             setFormData(initial);
//         }
//     }, [industryOptions, BUSINESS_FIELDS, formData]);


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     // --- 4. Submit handler now handles Firestore logic ---
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
                
//                 'Status': 'Pending', 
//                 'Created Date': new Date().toISOString(),
//             };

//             await addDoc(collection(db, 'businesses'), submissionData);
            
//             setIsSubmitted(true);
//         } catch (error) {
//             console.error("Error adding business registration: ", error);
//             alert("Registration failed. Please check your network and try again.");
//         }
//     };


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
//                     <div className="text-6xl text-green-500 mb-6">
//                         <span role="img" aria-label="Success">✅</span>
//                     </div>
//                     <h2 className="text-3xl font-bold text-green-400 mb-4">Submission Complete!</h2>
//                     <p className="text-gray-300 mb-8 text-lg">
//                         Thank you for registering **{formData.businessName || 'your business'}**.
//                         <br/>Your listing is **pending review** by the TBT Admin team and will be visible shortly.
//                     </p>
//                     <button
//                         onClick={() => setCurrentView(views.HOME)}
//                         className="w-full px-6 py-3 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg mt-4"
//                     >
//                         Return to TBT Website
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
//                     {currentField.label} {currentField.required && <span className="text-red-500">*</span>}
//                 </label>
                
//                 {currentField.type === 'select' ? (
//                     <select
//                         id={currentField.name}
//                         name={currentField.name}
//                         value={fieldValue}
//                         onChange={handleChange}
//                         required={currentField.required}
//                         className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
//                     >
//                         {currentField.options.map(option => (
//                             <option key={option} value={option}>{option}</option>
//                         ))}
//                     </select>
//                 ) : (
//                     <input
//                         id={currentField.name}
//                         type={currentField.type}
//                         name={currentField.name}
//                         required={currentField.required}
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
                
//                 {/* Header Section */}
//                 <div className="bg-yellow-600 text-white p-6 flex justify-between items-center">
//                     <h2 className="text-3xl font-extrabold">
//                         Business Registration
//                     </h2>
//                     <button
//                         onClick={() => setCurrentView(views.HOME)}
//                         className="text-md  px-3 py-1 border border-white/50 rounded-full cursor-pointer hover:bg-white hover:text-blue-600 transition duration-200"
//                     >
//                         ← Back to Home
//                     </button>
//                 </div>

//                 {/* Form Body */}
//                 <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
//                     <p className="text-gray-600 text-lg">
//                         Welcome! Please fill in the details below to list your business on the TBT Directory.
//                     </p>
                    
//                     {/* 1. Primary Contact & Identity */}
//                     <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-6">
//                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
//                             1. Core Information
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                             {renderField(BUSINESS_FIELDS_BASE[0])} 
//                             {renderField(BUSINESS_FIELDS_BASE[1])} 
//                             {renderField(BUSINESS_FIELDS_BASE[2])} {/* Industry Type (now dynamic) */}
//                             {renderField(BUSINESS_FIELDS_BASE[3])} 
//                             {renderField(BUSINESS_FIELDS_BASE[4])} {/* Address (Span 2 columns) */}
//                             {renderField(BUSINESS_FIELDS_BASE[5])} 
//                             {renderField(BUSINESS_FIELDS_BASE[6])} 
//                             {renderField(BUSINESS_FIELDS_BASE[7])} 
//                         </div>
//                     </div>

//                     {/* 2. Social & Location Links */}
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-6">
//                         <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
//                             2. Online Presence (Optional)
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                             {renderField(BUSINESS_FIELDS_BASE[8])}  
//                             {renderField(BUSINESS_FIELDS_BASE[9])}  
//                             {renderField(BUSINESS_FIELDS_BASE[10])} 
//                             {renderField(BUSINESS_FIELDS_BASE[11])} 
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="pt-6 border-t mt-6">
//                         <button
//                             type="submit"
//                             className="w-full flex justify-center py-4 px-4 border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500/50 transition duration-200 transform hover:scale-[1.01]"
//                         >
//                             Submit & Complete Registration
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
// export default BusinessRegister;

import React, { useState, useMemo, useEffect } from 'react'; 
import { db } from '../../firebase'; // Assuming this path
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'; 

// Define the required input fields
const BUSINESS_FIELDS_BASE = [
    { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
    { name: 'ownerName', label: 'Owner Name', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
    // Options will be filled dynamically below
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


function BusinessRegister({ setCurrentView, views }) {
    
    const [industryOptions, setIndustryOptions] = useState([]);
    const [isOptionsLoading, setIsOptionsLoading] = useState(true);
    const [formData, setFormData] = useState({}); 
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // --- 1. Fetch industry options from Firestore (The Fix is in here) ---
    useEffect(() => {
        const settingsDocRef = doc(db, 'settings', 'global');
        
        const unsubscribe = onSnapshot(settingsDocRef, (docSnap) => {
            let fetchedOptions = [];
            
            if (docSnap.exists() && docSnap.data().industryOptions) {
                const rawOptions = docSnap.data().industryOptions;
                
                // ⭐️ FIX: Handle both array (Admin standard) and string (User specified data type) ⭐️
                if (Array.isArray(rawOptions)) {
                    fetchedOptions = rawOptions;
                } else if (typeof rawOptions === 'string') {
                    // Split by comma, trim whitespace, and filter out empty strings
                    fetchedOptions = rawOptions
                        .split(',')
                        .map(item => item.trim())
                        .filter(item => item.length > 0);
                }
            } 
            
            if (fetchedOptions.length > 0) {
                // Remove duplicates and sort
                setIndustryOptions([...new Set(fetchedOptions)].sort());
            } else {
                // Fallback if the document is empty or field is still missing
                setIndustryOptions(['IT', 'Test', 'General', 'Unspecified Industry']); 
            }
            setIsOptionsLoading(false);
            
        }, (error) => {
            // Fallback on error (e.g., severe network issue or permissions failure)
            console.error("Error fetching industry options (Check Security Rules):", error);
            setIndustryOptions(['IT', 'Test', 'General', 'Unspecified Industry']); 
            setIsOptionsLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);


    // --- 2. Dynamically Inject Options into Field Definitions ---
    const BUSINESS_FIELDS = useMemo(() => {
        return BUSINESS_FIELDS_BASE.map(field => {
            if (field.name === 'type') {
                return { ...field, options: industryOptions };
            }
            return field;
        });
    }, [industryOptions]);


    // --- 3. Initialize formData once options are loaded ---
    useEffect(() => {
        // Only initialize if options are available and formData is empty
        if (industryOptions.length > 0 && Object.keys(formData).length === 0) {
            const initial = BUSINESS_FIELDS.reduce((acc, field) => {
                // Set default for select field to the first available option
                acc[field.name] = (field.type === 'select' && field.options.length > 0) 
                    ? field.options[0] 
                    : '';
                return acc;
            }, {});
            
            setFormData(initial);
        }
    }, [industryOptions, BUSINESS_FIELDS, formData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsLoading(true);
        
        try {
            const submissionData = {
                'Business Name': formData.businessName,
                'Owner Name': formData.ownerName,
                'Industry Type': formData.type, // This is the field that was missing initially
                'Logo URL': formData.logo,
                'Physical Address': formData.address,
                'Email Address': formData.email,
                'Phone Number': formData.phNo,
                'Viber Number': formData.viberNo,
                'Website Link': formData.websiteLink,
                'Facebook Link': formData.fbLink,
                'Tiktok Link': formData.tiktokLink,
                'Google Map Link': formData.googleMapLink,
                
                'Status': 'Pending Review', 
                'Created Date': new Date().toISOString(),
            };

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

    // --- Conditional Render: Success State ---
    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 text-center">
                <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-green-600 max-w-lg w-full text-white">
                    <div className="text-6xl text-green-500 mb-6">✅</div>
                    <h2 className="text-3xl font-bold text-green-400 mb-4">Submission Complete!</h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        Thank you for registering. Your listing is **pending review**.
                    </p>
                    <button
                        onClick={() => setCurrentView(views.HOME)}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition duration-150 shadow-lg mt-4"
                    >
                        Return to Website
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
                    {currentField.label} {currentField.required && <span className="text-red-500">*</span>}
                </label>
                
                {currentField.type === 'select' ? (
                    <select
                        id={currentField.name}
                        name={currentField.name}
                        value={fieldValue}
                        onChange={handleChange}
                        required={currentField.required}
                        className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer"
                    >
                        {currentField.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={currentField.name}
                        type={currentField.type}
                        name={currentField.name}
                        required={currentField.required}
                        value={fieldValue}
                        onChange={handleChange}
                        placeholder={currentField.placeholder}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                    />
                )}
            </div>
        );
    };

    // --- Main Form Render ---
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
            <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
                
                <div className="bg-yellow-600 text-white p-6 flex justify-between items-center">
                    <h2 className="text-xl font-extrabold">Business Registration</h2>
                    <button
                        onClick={() => setCurrentView(views.HOME)}
                        className="text-md px-3 py-1 border border-black/50 text-white-500 rounded-full cursor-pointer hover:bg-black hover:text-white-600 transition duration-200"
                    >
                        ← Back to Home
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
                    <p className="text-gray-600 text-lg">
                        Welcome! Please fill in the details below to list your business on the TBT Directory.
                    </p>
                    
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">1. Core Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {BUSINESS_FIELDS_BASE.slice(0, 8).map(renderField)}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">2. Online Presence (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {BUSINESS_FIELDS_BASE.slice(8).map(renderField)}
                        </div>
                    </div>

                    <div className="pt-6 border-t mt-6">
                        <button
                            type="submit"
                            className="w-full sm:w-1/2 mx-auto p-3 flex justify-center  border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500/50 transition duration-200 transform hover:scale-[1.01]"
                        >
                            Submit  Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default BusinessRegister;