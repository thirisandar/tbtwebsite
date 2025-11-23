// // src/pages/Admin/AddBusinessForm.jsx

// import React, { useState } from 'react';

// function AddBusinessForm({ onAddBusiness, onCancel, industryOptions }) { 
    
//     const defaultIndustry = (industryOptions && industryOptions.length > 0) 
//         ? industryOptions[0] 
//         : 'Unspecified Industry';
        
//     const [formData, setFormData] = useState({
//         'Business Name': '',
//         'Owner Name' : '',
//         'Industry Type': defaultIndustry, 
        
//         // These fields are correctly initialized as empty strings
//         'Logo URL': '' ,
//         'Physical Address' : '',
//         'Email Address' : '',
//         'Phone Number' : '',
//         'Viber Number' : '',
//         'Website Link' : '',
//         'Facebook Link' : '',
//         'Tiktok Link' : '',
//         'Google Map Link' : '',
//     });
    
//     const [submitLoading, setSubmitLoading] = useState(false);

//     // ⭐️ NEW HELPER FUNCTION: Removes empty strings/nulls ⭐️
//     const cleanData = (data) => {
//         const cleaned = {};
//         for (const key in data) {
//             const value = data[key];
//             // Only include values that are NOT an empty string or null
//             if (value !== '' && value !== null) {
//                 cleaned[key] = value;
//             }
//         }
//         return cleaned;
//     };


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ 
//             ...prev, 
//             [name]: value 
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitLoading(true);

//         // ⭐️ STEP 1: Clean the data to omit empty fields ⭐️
//         const cleanedData = cleanData(formData);

//         try {
//             // ⭐️ STEP 2: Submit only the cleaned data ⭐️
//             await onAddBusiness(cleanedData); 
//         } catch (error) {
//             console.error("Failed to add business in form:", error);
//         }
        
//         setSubmitLoading(false);
//         onCancel(); // Close the form and go back to the list view
//     };

//     // Helper array to define the input fields for clean rendering
//     const textFields = [
//         { label: 'Business Name', name: 'Business Name', required: true },
//         { label: 'Owner Name', name: 'Owner Name', required: false },
//         { label: 'Logo URL', name: 'Logo URL', required: false, type: 'url' },
//         { label: 'Physical Address', name: 'Physical Address', required: false },
//         { label: 'Email Address', name: 'Email Address', required: false, type: 'email' },
//         { label: 'Phone Number', name: 'Phone Number', required: false },
//         { label: 'Viber Number', name: 'Viber Number', required: false },
//         { label: 'Website Link', name: 'Website Link', required: false, type: 'url' },
//         { label: 'Facebook Link', name: 'Facebook Link', required: false, type: 'url' },
//         { label: 'Tiktok Link', name: 'Tiktok Link', required: false, type: 'url' },
//         { label: 'Google Map Link', name: 'Google Map Link', required: false, type: 'url' },
//     ];


//     return (
//         <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
//             <h3 className="text-2xl font-bold text-white mb-6">Register New Business</h3>
//             <p className="text-gray-400 mb-8">Enter the required details for the new business listing.</p>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* Industry Type (Dynamic Dropdown) */}
//                 <div>
//                     <label htmlFor="Industry Type" className="block text-sm font-medium text-gray-400 mb-1">Industry Type</label>
//                     <select
//                         name="Industry Type" 
//                         value={formData['Industry Type']} 
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
//                     >
//                         {industryOptions && industryOptions.length > 0 ? (
//                             industryOptions.map(option => (
//                                 <option key={option} value={option}>{option}</option>
//                             ))
//                         ) : (
//                             <option value="" disabled>Loading Industries...</option>
//                         )}
//                     </select>
//                 </div>
                
//                 {/* Dynamically render all text input fields */}
//                 {textFields.map((field) => (
//                     <div key={field.name}>
//                         <label htmlFor={field.name} className="block text-sm font-medium text-gray-400 mb-1">
//                             {field.label} {field.required && <span className="text-red-400">*</span>}
//                         </label>
//                         <input 
//                             type={field.type || 'text'} 
//                             name={field.name} 
//                             required={field.required}
//                             value={formData[field.name]} 
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500" 
//                         />
//                     </div>
//                 ))}
                

//                 {/* Action Buttons */}
//                 <div className="flex justify-between pt-4 border-t border-gray-700">
//                     <button type="button" onClick={onCancel}
//                         className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition cursor-pointer">
//                         Cancel
//                     </button>
//                     <button type="submit" disabled={formData['Business Name'] === '' || submitLoading}
//                         className={`px-6 py-2 font-medium rounded-lg transition shadow-md ${submitLoading ? 'bg-blue-600 opacity-60' : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'}`}>
//                         {submitLoading ? 'Adding...' : 'Add Business'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
// export default AddBusinessForm;     
// src/pages/Admin/AddBusinessForm.jsx
// src/pages/Admin/AddBusinessForm.jsx
// src/pages/Admin/AddBusinessForm.jsx

// import React, { useState, useEffect } from 'react';

// // NEW HELPER: Formats member data for the dropdown value (Owner Name|Phone Number)
// const getMemberDropdownValue = (member) => {
//     // Safely default to 'N/A' if data is missing, though they should be present.
//     return `${member['Owner Name'] || 'N/A'}|${member['Phone Number'] || 'N/A'}`;
// };

// // UPDATED PROPS: Accepts memberList
// function AddBusinessForm({ onAddBusiness, onCancel, industryOptions, memberList }) { 
    
//     const defaultIndustry = (industryOptions && industryOptions.length > 0) 
//         ? industryOptions[0] 
//         : 'Unspecified Industry';
        
//     const [selectedMember, setSelectedMember] = useState('');

//     const [formData, setFormData] = useState({
//         'Business Name': '',
//         'Industry Type': defaultIndustry, 
        
//         'Logo URL': '' ,
//         'Physical Address' : '',
//         'Email Address' : '',
//         'Viber Number' : '',
//         'Website Link' : '',
//         'Facebook Link' : '',
//         'Tiktok Link' : '',
//         'Google Map Link' : '',
//     });
    
//     const [submitLoading, setSubmitLoading] = useState(false);

//     // ⭐️ FINAL CORRECTION: Filter only requires Owner Name to be present and not empty. ⭐️
//     // This ensures newly created members appear even if other optional fields haven't loaded yet.
//     const availableMembers = Array.isArray(memberList) 
//         ? memberList.filter(member => 
//             member['Owner Name'] && 
//             member['Owner Name'].trim().length > 0
//         )
//         : [];

//     // Automatically select the first member if available
//     useEffect(() => {
//         if (availableMembers.length > 0 && !selectedMember) {
//             setSelectedMember(getMemberDropdownValue(availableMembers[0]));
//         } else if (availableMembers.length === 0) {
//             setSelectedMember('');
//         }
        
//         // Re-run when the available members list changes
//     }, [availableMembers, selectedMember]); 

//     // ORIGINAL HELPER FUNCTION
//     const cleanData = (data) => {
//         const cleaned = {};
//         for (const key in data) {
//             const value = data[key];
//             if (value !== '' && value !== null) {
//                 cleaned[key] = value;
//             }
//         }
//         return cleaned;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ 
//             ...prev, 
//             [name]: value 
//         }));
//     };
    
//     // NEW HANDLER: For the owner dropdown
//     const handleMemberSelectChange = (e) => {
//         setSelectedMember(e.target.value);
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!selectedMember || availableMembers.length === 0) {
//             alert("Please select a Business Owner.");
//             return;
//         }

//         setSubmitLoading(true);

//         // STEP 1: Extract owner data from the selected dropdown value
//         // The value is guaranteed to be in "Name|Phone" format by getMemberDropdownValue
//         const [ownerName, phoneNumber] = selectedMember.split('|');

//         // STEP 2: Clean the business data
//         const cleanedBusinessData = cleanData(formData);
        
//         // STEP 3: Combine with owner data
//         const finalData = {
//             ...cleanedBusinessData,
//             'Owner Name': ownerName,
//             'Phone Number': phoneNumber,
//         };

//         try {
//             await onAddBusiness(finalData); 
//         } catch (error) {
//             console.error("Failed to add business in form:", error);
//         }
        
//         setSubmitLoading(false);
//         onCancel(); 
//     };

//     // UPDATED FIELD LIST: Owner Name and Phone Number removed
//     const textFields = [
//         { label: 'Business Name', name: 'Business Name', required: true },
//         { label: 'Logo URL', name: 'Logo URL', required: false, type: 'url' },
//         { label: 'Physical Address', name: 'Physical Address', required: false },
//         { label: 'Email Address', name: 'Email Address', required: false, type: 'email' },
//         { label: 'Viber Number', name: 'Viber Number', required: false },
//         { label: 'Website Link', name: 'Website Link', required: false, type: 'url' },
//         { label: 'Facebook Link', name: 'Facebook Link', required: false, type: 'url' },
//         { label: 'Tiktok Link', name: 'Tiktok Link', required: false, type: 'url' },
//         { label: 'Google Map Link', name: 'Google Map Link', required: false, type: 'url' },
//     ];


//     return (
//         <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
//             <h3 className="text-2xl font-bold text-white mb-6">Register New Business</h3>
//             <p className="text-gray-400 mb-8">Enter the required details for the new business listing.</p>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
                
//                 {/* 1. Owner Selection Dropdown (NEW FIELD) */}
//                 <div>
//                     <label htmlFor="ownerSelect" className="block text-sm font-medium text-gray-400 mb-1">Business Owner <span className="text-red-400">*</span></label>
//                     <select
//                         id="ownerSelect"
//                         value={selectedMember}
//                         onChange={handleMemberSelectChange}
//                         required
//                         className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
//                         disabled={availableMembers.length === 0}
//                     >
//                         {availableMembers.length === 0 ? (
//                             <option value="">No registered members available. Please add a member first.</option>
//                         ) : (
//                             availableMembers.map(member => (
//                                 <option 
//                                     key={member.id} 
//                                     value={getMemberDropdownValue(member)}
//                                 >
//                                     {member['Owner Name']} ({member['Phone Number'] || 'N/A Phone'})
//                                 </option>
//                             ))
//                         )}
//                     </select>
//                 </div>
                
//                 {/* 2. Industry Type (Dynamic Dropdown) */}
//                 <div>
//                     <label htmlFor="Industry Type" className="block text-sm font-medium text-gray-400 mb-1">Industry Type</label>
//                     <select
//                         name="Industry Type" 
//                         value={formData['Industry Type']} 
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
//                     >
//                         {industryOptions && industryOptions.length > 0 ? (
//                             industryOptions.map(option => (
//                                 <option key={option} value={option}>{option}</option>
//                             ))
//                         ) : (
//                             <option value="" disabled>Loading Industries...</option>
//                         )}
//                     </select>
//                 </div>
                
//                 {/* 3. Dynamically render remaining text input fields */}
//                 {textFields.map((field) => (
//                     <div key={field.name}>
//                         <label htmlFor={field.name} className="block text-sm font-medium text-gray-400 mb-1">
//                             {field.label} {field.required && <span className="text-red-400">*</span>}
//                         </label>
//                         <input 
//                             type={field.type || 'text'} 
//                             name={field.name} 
//                             required={field.required}
//                             value={formData[field.name]} 
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500" 
//                         />
//                     </div>
//                 ))}
                

//                 {/* Action Buttons */}
//                 <div className="flex justify-between pt-4 border-t border-gray-700">
//                     <button type="button" onClick={onCancel}
//                         className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition cursor-pointer">
//                         Cancel
//                     </button>
//                     <button type="submit" 
//                         disabled={formData['Business Name'] === '' || submitLoading || !selectedMember}
//                         className={`px-6 py-2 font-medium rounded-lg transition shadow-md ${submitLoading || !selectedMember ? 'bg-blue-600 opacity-60' : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'}`}>
//                         {submitLoading ? 'Adding...' : 'Add Business'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
// export default AddBusinessForm;
// src/pages/Admin/AddBusinessForm.jsx

import React, { useState, useEffect } from 'react';

// NEW HELPER: Formats member data for the dropdown value (Owner Name|Phone Number)
const getMemberDropdownValue = (member) => {
    // Ensure both owner name and phone number are used, defaulting to 'N/A' if missing
    return `${member['Owner Name'] || 'N/A Owner'}|${member['Phone Number'] || 'N/A Phone'}`;
};

// UPDATED PROPS: Accepts memberList
function AddBusinessForm({ onAddBusiness, onCancel, industryOptions, memberList }) { 
    
    const defaultIndustry = (industryOptions && industryOptions.length > 0) 
        ? industryOptions[0] 
        : 'Unspecified Industry';
        
    const [selectedMember, setSelectedMember] = useState('');

    const [formData, setFormData] = useState({
        'Business Name': '',
        'Industry Type': defaultIndustry, 
        
        'Logo URL': '' ,
        'Physical Address' : '',
        'Email Address' : '',
        'Viber Number' : '',
        'Website Link' : '',
        'Facebook Link' : '',
        'Tiktok Link' : '',
        'Google Map Link' : '',
    });
    
    const [submitLoading, setSubmitLoading] = useState(false);

    // ⭐️ CORRECTION: Filter to ensure Owner Name AND Phone Number are non-empty strings. ⭐️
    // This is the most reliable filter since both are required for a business registration.
    const availableMembers = Array.isArray(memberList) 
        ? memberList.filter(member => 
            member['Owner Name'] && 
            member['Owner Name'].trim().length > 0 &&
            member['Phone Number'] && 
            member['Phone Number'].trim().length > 0
        )
        : [];

    // Automatically select the first member if available, ensuring this runs when availableMembers updates
    useEffect(() => {
        if (availableMembers.length > 0) {
            // Check if the currently selected member is still in the available list
            const isCurrentSelectedValid = availableMembers.some(member => 
                getMemberDropdownValue(member) === selectedMember
            );

            if (!isCurrentSelectedValid) {
                // If no member is selected or the selected one vanished, select the first available one
                setSelectedMember(getMemberDropdownValue(availableMembers[0]));
            }
        } else {
            setSelectedMember('');
        }
        
    }, [availableMembers]); 
    // Removed selectedMember from dependencies to prevent infinite loop/over-triggering,
    // as it's handled within the effect now.

    // ORIGINAL HELPER FUNCTION
    const cleanData = (data) => {
        const cleaned = {};
        for (const key in data) {
            const value = data[key];
            if (value !== '' && value !== null) {
                cleaned[key] = value;
            }
        }
        return cleaned;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
    };
    
    // NEW HANDLER: For the owner dropdown
    const handleMemberSelectChange = (e) => {
        setSelectedMember(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedMember || availableMembers.length === 0) {
            alert("Please select a Business Owner.");
            return;
        }

        setSubmitLoading(true);

        // STEP 1: Extract owner data from the selected dropdown value
        const [ownerName, phoneNumber] = selectedMember.split('|');

        // STEP 2: Clean the business data
        const cleanedBusinessData = cleanData(formData);
        
        // STEP 3: Combine with owner data
        const finalData = {
            ...cleanedBusinessData,
            'Owner Name': ownerName,
            'Phone Number': phoneNumber,
        };

        try {
            await onAddBusiness(finalData); 
        } catch (error) {
            console.error("Failed to add business in form:", error);
        }
        
        setSubmitLoading(false);
        onCancel(); 
    };

    // UPDATED FIELD LIST: Owner Name and Phone Number removed
    const textFields = [
        { label: 'Business Name', name: 'Business Name', required: true },
        { label: 'Logo URL', name: 'Logo URL', required: false, type: 'url' },
        { label: 'Physical Address', name: 'Physical Address', required: false },
        { label: 'Email Address', name: 'Email Address', required: false, type: 'email' },
        { label: 'Viber Number', name: 'Viber Number', required: false },
        { label: 'Website Link', name: 'Website Link', required: false, type: 'url' },
        { label: 'Facebook Link', name: 'Facebook Link', required: false, type: 'url' },
        { label: 'Tiktok Link', name: 'Tiktok Link', required: false, type: 'url' },
        { label: 'Google Map Link', name: 'Google Map Link', required: false, type: 'url' },
    ];


    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Register New Business</h3>
            <p className="text-gray-400 mb-8">Enter the required details for the new business listing.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Owner Selection Dropdown (NEW FIELD) */}
                <div>
                    <label htmlFor="ownerSelect" className="block text-sm font-medium text-gray-400 mb-1">Business Owner <span className="text-red-400">*</span></label>
                    <select
                        id="ownerSelect"
                        value={selectedMember}
                        onChange={handleMemberSelectChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
                        disabled={availableMembers.length === 0}
                    >
                        {availableMembers.length === 0 ? (
                            <option value="">No registered members available. Please add a member first.</option>
                        ) : (
                            availableMembers.map(member => (
                                <option 
                                    key={member.id} 
                                    value={getMemberDropdownValue(member)}
                                >
                                    {member['Owner Name']} ({member['Phone Number'] || 'N/A Phone'})
                                </option>
                            ))
                        )}
                    </select>
                </div>
                
                {/* 2. Industry Type (Dynamic Dropdown) */}
                <div>
                    <label htmlFor="Industry Type" className="block text-sm font-medium text-gray-400 mb-1">Industry Type</label>
                    <select
                        name="Industry Type" 
                        value={formData['Industry Type']} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
                    >
                        {industryOptions && industryOptions.length > 0 ? (
                            industryOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))
                        ) : (
                            <option value="" disabled>Loading Industries...</option>
                        )}
                    </select>
                </div>
                
                {/* 3. Dynamically render remaining text input fields */}
                {textFields.map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-400 mb-1">
                            {field.label} {field.required && <span className="text-red-400">*</span>}
                        </label>
                        <input 
                            type={field.type || 'text'} 
                            name={field.name} 
                            required={field.required}
                            value={formData[field.name]} 
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>
                ))}
                

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-700">
                    <button type="button" onClick={onCancel}
                        className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                        Cancel
                    </button>
                    <button type="submit" 
                        disabled={formData['Business Name'] === '' || submitLoading || availableMembers.length === 0}
                        className={`px-6 py-2 font-medium rounded-lg transition shadow-md ${submitLoading || availableMembers.length === 0 ? 'bg-blue-600 opacity-60' : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'}`}>
                        {submitLoading ? 'Adding...' : 'Add Business'}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default AddBusinessForm;