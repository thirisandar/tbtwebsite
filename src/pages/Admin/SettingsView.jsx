// // // src/pages/Admin/SettingsView.jsx

// // import React, { useState } from 'react';

// // // This component is now complete with Add and Delete functionality
// // function SettingsView({ 
// //     industryOptions, 
// //     onAddIndustry,   // Handler for adding a new industry
// //     onDeleteIndustry, // Handler for deleting an existing industry
// //     setSuccessMessage // To display success feedback
// // }) {
// //     const [newIndustry, setNewIndustry] = useState('');
// //     const [addLoading, setAddLoading] = useState(false);

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         const industryToClean = newIndustry.trim();
// //         if (!industryToClean) return;

// //         setAddLoading(true);
// //         try {
// //             await onAddIndustry(industryToClean);
// //             setSuccessMessage(`Industry '${industryToClean}' added successfully.`);
// //             setNewIndustry(''); // Clear the input field
// //         } catch (error) {
// //             console.error("Error adding industry:", error);
// //             // This is where the FirebaseError was caught previously.
// //             alert(`Error adding industry: ${error.message}`);
// //         } finally {
// //             setAddLoading(false);
// //         }
// //     };

// //     // ⭐️ NEW: Handler for the delete button click ⭐️
// //     const handleDeleteClick = (industryName) => {
// //         // CALL THE PROP DIRECTLY to set the state in AdminDashboard and display the modal
// //         onDeleteIndustry(industryName); 
// //     };


// //     return (
// //         <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
// //             <h3 className="text-2xl font-bold text-white mb-6">⚙️ Settings Management</h3>
            
// //             {/* Add New Industry Form */}
// //             <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-700 rounded-lg shadow-inner">
// //                 <label htmlFor="new-industry" className="block text-sm font-medium text-gray-400 mb-2">
// //                     Add New Industry Type
// //                 </label>
// //                 <div className="flex space-x-3">
// //                     <input 
// //                         id="new-industry"
// //                         type="text"
// //                         value={newIndustry}
// //                         onChange={(e) => setNewIndustry(e.target.value)}
// //                         placeholder="e.g., Finance, Tourism"
// //                         required
// //                         className="flex-grow px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
// //                     />
// //                     <button 
// //                         type="submit" 
// //                         disabled={addLoading || newIndustry.trim() === ''}
// //                         className={`px-6 py-2 font-medium rounded-lg transition shadow-md ${addLoading ? 'bg-blue-600 opacity-60' : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'}`}
// //                     >
// //                         {addLoading ? 'Adding...' : 'Add'}
// //                     </button>
// //                 </div>
// //             </form>

// //             {/* Current Industry Options List */}
// //             <div>
// //                 <h4 className="text-lg font-semibold text-gray-300 mb-3">
// //                     Current Industry Options ({industryOptions.length})
// //                 </h4>
// //                 <div className="flex flex-wrap gap-3">
// //                     {industryOptions
// //                         .filter(opt => opt !== 'Unspecified Industry') // Filter out the fixed default option
// //                         .sort()
// //                         .map((industry) => (
// //                             <div 
// //                                 key={industry} 
// //                                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-full text-white shadow-md"
// //                             >
// //                                 <span>{industry}</span>
                                
// //                                 {/* ⭐️ DELETE BUTTON IMPLEMENTATION ⭐️ */}
// //                                 <button 
// //                                     type="button" 
// //                                     onClick={() => handleDeleteClick(industry)}
// //                                     className="text-white hover:text-red-300 transition-colors duration-150 p-1 rounded-full bg-blue-700 hover:bg-red-700 cursor-pointer"
// //                                     aria-label={`Remove ${industry}`}
// //                                 >
// //                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
// //                                 </button>
// //                             </div>
// //                         ))}
// //                     {/* Display the default option without a delete button */}
// //                     {industryOptions.includes('Unspecified Industry') && (
// //                         <div className="flex items-center px-4 py-2 bg-gray-500 rounded-full text-white shadow-md">
// //                             Unspecified Industry (Default)
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default SettingsView;
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
                
//                 {/* ⭐️ UPDATED CODE STARTS HERE ⭐️ */}
//                 <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
//                     <input 
//                         id="new-industry"
//                         type="text"
//                         value={newIndustry}
//                         onChange={(e) => setNewIndustry(e.target.value)}
//                         placeholder="e.g., Finance, Tourism"
//                         required
//                         className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     <button 
//                         type="submit" 
//                         disabled={addLoading || newIndustry.trim() === ''}
//                         className={`w-full sm:w-auto px-4 py-2 font-medium rounded-lg transition shadow-md whitespace-nowrap text-sm ${addLoading ? 'bg-blue-600 opacity-60' : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'}`}
//                     >
//                         {addLoading ? 'Adding...' : 'Add'}
//                     </button>
//                 </div>
//                 {/* ⭐️ UPDATED CODE ENDS HERE ⭐️ */}
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
import React, { useState } from 'react';

// This component manages the list of industry options
function SettingsView({ industryOptions, onAddIndustry, onDeleteIndustry, setSuccessMessage }) {
    const [newIndustry, setNewIndustry] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        const trimmed = newIndustry.trim();
        if (!trimmed) return;

        setIsSaving(true);
        try {
            await onAddIndustry(trimmed);
            setSuccessMessage(`Industry '${trimmed}' added successfully!`);
            setNewIndustry('');
        } catch (error) {
            setSuccessMessage(`Failed to add industry: ${trimmed}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = (industry) => {
        // This function in the AdminDashboard triggers the ConfirmModal for deletion
        onDeleteIndustry(industry); 
    };

    return (
        <div className="space-y-8">
            {/* ⭐️ DESIGN CHANGE ⭐️ Updated container to light theme (white card on gray background) */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Industry Management</h2>

                {/* Add New Industry Form */}
                <form onSubmit={handleAdd} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                    <input
                        type="text"
                        placeholder="New Industry Name"
                        value={newIndustry}
                        onChange={(e) => setNewIndustry(e.target.value)}
                        // ⭐️ DESIGN CHANGE ⭐️ Updated input style to match dashboard inputs
                        className="flex-grow px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isSaving || newIndustry.trim() === ''}
                        // ⭐️ DESIGN CHANGE ⭐️ Updated button style (using blue as primary add action)
                        className={`px-6 py-2 font-medium rounded-lg transition duration-150 shadow-md whitespace-nowrap text-white cursor-pointer ${
                            isSaving || newIndustry.trim() === '' 
                                ? 'bg-blue-400 opacity-60 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isSaving ? 'Adding...' : 'Add Industry'}
                    </button>
                </form>

                {/* Current Industries List */}
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Current Industries ({industryOptions.length})</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {industryOptions.length > 0 ? (
                        industryOptions.map(industry => (
                            // ⭐️ DESIGN CHANGE ⭐️ Updated list item style to light gray background
                            <div key={industry} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition duration-100">
                                <span className="text-gray-700 font-medium">{industry}</span>
                                <button
                                    onClick={() => handleDelete(industry)}
                                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 p-3 bg-gray-50 rounded-lg">No industries defined. Add a new one above.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SettingsView;