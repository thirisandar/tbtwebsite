// // src/components/PopupModal.jsx
// import React from 'react';

// // This component receives two props: 
// // 1. onClose (a function to close the modal)
// // 2. data (the business object to display)

// const PopupModal = ({ onClose, data }) => {
//   if (!data) return null; // Safety check

//   // Helper function to render links if they exist
//   const renderLink = (label, url) => {
//     if (!url || url.length < 5) return <span className="text-gray-500">N/A</span>; // Renders N/A if link is missing
//     return (
//       <a 
//         href={url.startsWith('http') ? url : `https://${url}`} // Ensure link works
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="text-blue-600 hover:text-blue-800 underline transition duration-150"
//       >
//         {label}
//       </a>
//     );
//   };
  
//   // ⭐️ UPDATED DESTRUCTURING ⭐️ 
//   // Added Phone Number, Email, Address, Website, and Logo URL
//   const { 
//     'Business Name': name, 
//     'Industry Type': type, 
//     'Facebook Link': facebook, 
//     'Viber Number': viber,         // Changed key from 'Viber No' to match your form/data
//     'TikTok Link': tiktok, 
//     'Google Map Link': map,
//     'Phone Number': phone,         // ⭐️ NEW ⭐️
//     'Email Address': email,        // ⭐️ NEW ⭐️
//     'Physical Address': address,   // ⭐️ NEW ⭐️
//     'Website Link': website,       // ⭐️ NEW ⭐️
//     'Logo URL': logoUrl            // ⭐️ NEW ⭐️
//   } = data;
  
//   // Helper for displaying contact info (like phone/email)
//   const renderContact = (value) => value ? <span className="font-medium text-gray-800">{value}</span> : <span className="text-gray-500">N/A</span>;


//   return (
//     // Modal Backdrop: Fixed position, dark overlay
//     <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      
//       {/* Modal Content Box: Stops click propagation so clicking inside doesn't close it */}
//       <div 
//         className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
//       >
        
//         {/* Header and Close Button */}
//         <header className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10">
//             <div className="w-full flex justify-center items-center space-x-4">
//                 {logoUrl && <img src={logoUrl} alt={`${name} Logo`} className="w-10 h-10 object-contain" />}
//                 <h2 className="text-2xl font-bold text-gray-800 text-center">{name}</h2>
//             </div>
//             <button 
//                 onClick={onClose}
//                 className="text-gray-500 hover:text-gray-900 text-3xl cursor-pointer"
//             >
//                 &times;
//             </button>
//         </header>

//         {/* Body Content */}
//         <div className="p-6 space-y-6">
            
//             {/* General Info */}
//             <div className="pb-4">
//                 <span className="text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">{type}</span>
//             </div>

//             {/* ⭐️ NEW: Contact Information ⭐️ */}
//             <div className="border-b pb-4">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                     <p><strong>Email:</strong> {renderContact(email)}</p>
//                     <p><strong>Phone:</strong> {renderContact(phone)}</p>
//                     <p className="col-span-1 md:col-span-2">
//                         <strong>Address:</strong> {renderContact(address)}
//                     </p>
//                 </div>
//             </div>

//             {/* About Us */}
//             {/* <div>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">About Us</h3>
//                 <p className="text-gray-600">{about || "Details about the business are not yet available."}</p>
//             </div> */}
            
//             {/* Founding Story */}
//             {/* <div>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Our Story</h3>
//                 <p className="text-gray-600">{story || "The founding story is coming soon!"}</p>
//             </div> */}

//             {/* Connect / Links Section */}
//             <div>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-3">Online Presence & Location</h3>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                     <p><strong>Website:</strong> {renderLink('Visit Website', website)}</p>
//                     <p><strong>Facebook:</strong> {renderLink('Visit Page', facebook)}</p>
//                     <p><strong>TikTok:</strong> {renderLink('View Profile', tiktok)}</p>
//                     <p><strong>Viber Contact:</strong> <span className="text-gray-600">{viber || 'N/A'}</span></p>
//                     <p className="col-span-2"><strong>Google Map:</strong> {renderLink('Open Location on Map', map)}</p>
//                 </div>
//             </div>

//         </div>
        
//         {/* Footer Close Button */}
//         <div className="p-6 border-t text-right bg-gray-50">
//             <button 
//                 onClick={onClose}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 cursor-pointer"
//             >
//                 Close
//             </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopupModal;
// src/components/PopupModal.jsx
import React from 'react';

const PopupModal = ({ onClose, data }) => {
  if (!data) return null; // Safety check

  // Helper function to render links if they exist
  const renderLink = (label, url) => {
    if (!url || url.length < 5) return <span className="text-gray-500 font-normal">N/A</span>; // Renders N/A if link is missing
    return (
      <a 
        href={url.startsWith('http') ? url : `https://${url}`} // Ensure link works
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-700 font-semibold hover:text-blue-900 underline transition duration-150"
      >
        {label}
      </a>
    );
  };
  
  // Destructuring all necessary data points
  const { 
    'Business Name': name, 
    'Industry Type': type, 
    'Facebook Link': facebook, 
    'Viber Number': viber,
    'TikTok Link': tiktok, 
    'Google Map Link': map,
    'Phone Number': phone,
    'Email Address': email,
    'Physical Address': address,
    'Website Link': website,
    'Logo URL': logoUrl
  } = data;
  
  // Helper for displaying contact info (like phone/email)
  const renderContact = (value) => value ? <span className="font-medium text-gray-800 break-words">{value}</span> : <span className="text-gray-500">N/A</span>;


  return (
    // Modal Backdrop: Fixed position, soft blue overlay
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4" onClick={onClose}>
      
      {/* Modal Content Box: bg-blue-200 is used as the frame/background */}
      <div 
        className="bg-blue-200 rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        
        {/* Header and Close Button (Slightly lighter blue background) */}
        <header className="p-6 border-b border-blue-300 flex justify-between items-start bg-blue-100 rounded-t-xl">
            <div className="flex flex-col items-start space-y-2 w-full">
                {/* Business Name and Logo */}
                <div className="flex items-center space-x-3 w-full">
                    {logoUrl && <img src={logoUrl} alt={`${name} Logo`} className="w-10 h-10 object-contain rounded-lg border border-blue-300 p-1" />}
                    <h2 className="text-2xl font-extrabold text-dark-800">Business Name - {name}</h2>
                </div>
                
                {/* Industry Badge */}
                <span className="text-sm font-bold text-gray-900 bg-blue-200 px-4 py-1.5 rounded-full shadow-md tracking-wider">
                    {type}
                </span>
            </div>
            
            <button 
                onClick={onClose}
                className="text-black-500 hover:text-red-900 text-3xl cursor-pointer ml-4"
            >
                &times;
            </button>
        </header>

        {/* Body Content (White Background for Readability) */}
        <div className="bg-white p-6 space-y-6 overflow-y-auto flex-grow rounded-b-xl">
            
            {/* ⭐️ Contact Information ⭐️ */}
            <div className="pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
                    <span className="text-lg mr-2 text-black">Contact Information</span> 
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <p className="flex flex-col">
                        <strong className="text-gray-500">Email Address:</strong> 
                        {renderContact(email)}
                    </p>
                    <p className="flex flex-col">
                        <strong className="text-gray-500">Phone Number:</strong> 
                        {renderContact(phone)}
                    </p>
                    <p className="col-span-1 sm:col-span-2 flex flex-col">
                        <strong className="text-gray-500">Physical Address:</strong> 
                        {renderContact(address)}
                    </p>
                </div>
            </div>
            
            {/* Connect / Links Section */}
            <div>
                <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
                    <span className="mr-2 text-lg text-black">Online Presence & Location</span> 
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p className="flex flex-col">
                        <strong className="text-gray-500">Website:</strong> 
                        {renderLink('Visit Website', website)}
                    </p>
                    <p className="flex flex-col">
                        <strong className="text-gray-500">Facebook:</strong> 
                        {renderLink('Visit Page', facebook)}
                    </p>
                    <p className="flex flex-col">
                        <strong className="text-gray-500">TikTok:</strong> 
                        {renderLink('View Profile', tiktok)}
                    </p>
                    <p className="flex flex-col">
                        <strong className="text-gray-500">Other Ph No and Viber No:</strong> 
                        <span className="text-gray-600 font-medium">{viber || 'N/A'}</span>
                    </p>
                    <p className="col-span-2 flex flex-col">
                        <strong className="text-gray-500">Google Map:</strong> 
                        {renderLink('Open Location on Map', map)}
                    </p>
                </div>
            </div>
        </div>
        
        {/* Footer Close Button */}
        <div className="p-4 border-t border-blue-300 text-right bg-blue-100 rounded-b-xl">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-blue-400 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-150 cursor-pointer"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;