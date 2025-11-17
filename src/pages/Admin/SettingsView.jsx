// // src/pages/Admin/SettingsView.jsx

// import React, { useState } from 'react';

// // This component is now complete with Add and Delete functionality
// function SettingsView({ 
//     industryOptions, 
//     onAddIndustry,   // Handler for adding a new industry
//     onDeleteIndustry, // Handler for deleting an existing industry
//     setSuccessMessage // To display success feedback
// }) {
//     const [newIndustry, setNewIndustry] = useState('');
//     const [addLoading, setAddLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const industryToClean = newIndustry.trim();
//         if (!industryToClean) return;

//         setAddLoading(true);
//         try {
//             await onAddIndustry(industryToClean);
//             setSuccessMessage(`Industry '${industryToClean}' added successfully.`);
//             setNewIndustry(''); // Clear the input field
//         } catch (error) {
//             console.error("Error adding industry:", error);
//             // This is where the FirebaseError was caught previously.
//             alert(`Error adding industry: ${error.message}`);
//         } finally {
//             setAddLoading(false);
//         }
//     };

//     // ⭐️ NEW: Handler for the delete button click ⭐️
//     const handleDeleteClick = (industryName) => {
//         // CALL THE PROP DIRECTLY to set the state in AdminDashboard and display the modal
//         onDeleteIndustry(industryName); 
//     };


//     return (
//         <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
//             <h3 className="text-2xl font-bold text-white mb-6">⚙️ Settings Management</h3>
            
//             {/* Add New Industry Form */}
//             <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-700 rounded-lg shadow-inner">
//                 <label htmlFor="new-industry" className="block text-sm font-medium text-gray-400 mb-2">
//                     Add New Industry Type
//                 </label>
//                 <div className="flex space-x-3">
//                     <input 
//                         id="new-industry"
//                         type="text"
//                         value={newIndustry}
//                         onChange={(e) => setNewIndustry(e.target.value)}
//                         placeholder="e.g., Finance, Tourism"
//                         required
//                         className="flex-grow px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     <button 
//                         type="submit" 
//                         disabled={addLoading || newIndustry.trim() === ''}
//                         className={`px-6 py-2 font-medium rounded-lg transition shadow-md ${addLoading ? 'bg-blue-600 opacity-60' : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'}`}
//                     >
//                         {addLoading ? 'Adding...' : 'Add'}
//                     </button>
//                 </div>
//             </form>

//             {/* Current Industry Options List */}
//             <div>
//                 <h4 className="text-lg font-semibold text-gray-300 mb-3">
//                     Current Industry Options ({industryOptions.length})
//                 </h4>
//                 <div className="flex flex-wrap gap-3">
//                     {industryOptions
//                         .filter(opt => opt !== 'Unspecified Industry') // Filter out the fixed default option
//                         .sort()
//                         .map((industry) => (
//                             <div 
//                                 key={industry} 
//                                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-full text-white shadow-md"
//                             >
//                                 <span>{industry}</span>
                                
//                                 {/* ⭐️ DELETE BUTTON IMPLEMENTATION ⭐️ */}
//                                 <button 
//                                     type="button" 
//                                     onClick={() => handleDeleteClick(industry)}
//                                     className="text-white hover:text-red-300 transition-colors duration-150 p-1 rounded-full bg-blue-700 hover:bg-red-700 cursor-pointer"
//                                     aria-label={`Remove ${industry}`}
//                                 >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//                                 </button>
//                             </div>
//                         ))}
//                     {/* Display the default option without a delete button */}
//                     {industryOptions.includes('Unspecified Industry') && (
//                         <div className="flex items-center px-4 py-2 bg-gray-500 rounded-full text-white shadow-md">
//                             Unspecified Industry (Default)
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SettingsView;
// src/pages/Admin/SettingsView.jsx

import React, { useState } from 'react';

// This component is now complete with Add and Delete functionality
function SettingsView({ 
    industryOptions, 
    onAddIndustry,   // Handler for adding a new industry
    onDeleteIndustry, // Handler for deleting an existing industry
    setSuccessMessage // To display success feedback
}) {
    const [newIndustry, setNewIndustry] = useState('');
    const [addLoading, setAddLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const industryToClean = newIndustry.trim();
        if (!industryToClean) return;

        setAddLoading(true);
        try {
            await onAddIndustry(industryToClean);
            setSuccessMessage(`Industry '${industryToClean}' added successfully.`);
            setNewIndustry(''); // Clear the input field
        } catch (error) {
            console.error("Error adding industry:", error);
            // This is where the FirebaseError was caught previously.
            alert(`Error adding industry: ${error.message}`);
        } finally {
            setAddLoading(false);
        }
    };

    // ⭐️ NEW: Handler for the delete button click ⭐️
    const handleDeleteClick = (industryName) => {
        // CALL THE PROP DIRECTLY to set the state in AdminDashboard and display the modal
        onDeleteIndustry(industryName); 
    };


    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">⚙️ Settings Management</h3>
            
            {/* Add New Industry Form */}
            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-700 rounded-lg shadow-inner">
                <label htmlFor="new-industry" className="block text-sm font-medium text-gray-400 mb-2">
                    Add New Industry Type
                </label>
                
                {/* ⭐️ UPDATED CODE STARTS HERE ⭐️ */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <input 
                        id="new-industry"
                        type="text"
                        value={newIndustry}
                        onChange={(e) => setNewIndustry(e.target.value)}
                        placeholder="e.g., Finance, Tourism"
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button 
                        type="submit" 
                        disabled={addLoading || newIndustry.trim() === ''}
                        className={`w-full sm:w-auto px-4 py-2 font-medium rounded-lg transition shadow-md whitespace-nowrap text-sm ${addLoading ? 'bg-blue-600 opacity-60' : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'}`}
                    >
                        {addLoading ? 'Adding...' : 'Add'}
                    </button>
                </div>
                {/* ⭐️ UPDATED CODE ENDS HERE ⭐️ */}
            </form>

            {/* Current Industry Options List */}
            <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-3">
                    Current Industry Options ({industryOptions.length})
                </h4>
                <div className="flex flex-wrap gap-3">
                    {industryOptions
                        .filter(opt => opt !== 'Unspecified Industry') // Filter out the fixed default option
                        .sort()
                        .map((industry) => (
                            <div 
                                key={industry} 
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-full text-white shadow-md"
                            >
                                <span>{industry}</span>
                                
                                {/* ⭐️ DELETE BUTTON IMPLEMENTATION ⭐️ */}
                                <button 
                                    type="button" 
                                    onClick={() => handleDeleteClick(industry)}
                                    className="text-white hover:text-red-300 transition-colors duration-150 p-1 rounded-full bg-blue-700 hover:bg-red-700 cursor-pointer"
                                    aria-label={`Remove ${industry}`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                        ))}
                    {/* Display the default option without a delete button */}
                    {industryOptions.includes('Unspecified Industry') && (
                        <div className="flex items-center px-4 py-2 bg-gray-500 rounded-full text-white shadow-md">
                            Unspecified Industry (Default)
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SettingsView;    