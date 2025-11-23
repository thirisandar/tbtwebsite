import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

// NEW COMPONENT: Inline Spinner for Buttons
const ButtonSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

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
            'Status': 'Pending Review', // Set initial status for Admin review
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
        // ⭐️ MODIFIED DESIGN: Changed from dark mode to light mode with blue accent ⭐️
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border-4 border-blue-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Register New Business</h3>
            <p className="text-gray-600 mb-8">Enter the required details for the new business listing.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Owner Selection Dropdown (NEW FIELD) */}
                <div>
                    <label htmlFor="ownerSelect" className="block text-sm font-medium text-gray-700 mb-1">Business Owner <span className="text-red-500">*</span></label>
                    <select
                        id="ownerSelect"
                        value={selectedMember}
                        onChange={handleMemberSelectChange}
                        required
                        // ⭐️ MODIFIED DESIGN: Input styles ⭐️
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition"
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
                    <label htmlFor="Industry Type" className="block text-sm font-medium text-gray-700 mb-1">Industry Type</label>
                    <select
                        name="Industry Type" 
                        value={formData['Industry Type']} 
                        onChange={handleChange}
                         // ⭐️ MODIFIED DESIGN: Input styles ⭐️
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition"
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
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input 
                            type={field.type || 'text'} 
                            name={field.name} 
                            required={field.required}
                            value={formData[field.name]} 
                            onChange={handleChange}
                            // ⭐️ MODIFIED DESIGN: Input styles ⭐️
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition" 
                        />
                    </div>
                ))}
                

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                    <button type="button" onClick={onCancel}
                        // ⭐️ MODIFIED DESIGN: Button styles ⭐️
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        Cancel
                    </button>
                    <button type="submit" 
                        disabled={formData['Business Name'] === '' || submitLoading || availableMembers.length === 0}
                        // ⭐️ MODIFIED DESIGN: Button styles + Spinner logic ⭐️
                        className={`px-6 py-2 font-medium rounded-lg transition shadow-md text-white ${submitLoading || availableMembers.length === 0 
                            ? 'bg-blue-700 opacity-80 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`
                        }
                    >
                        {/* ⭐️ MODIFIED: Replaced text with spinner icon ⭐️ */}
                        {submitLoading ? (
                            <>
                                <ButtonSpinner />
                                Adding...
                            </>
                        ) : (
                            'Add Business'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default AddBusinessForm;