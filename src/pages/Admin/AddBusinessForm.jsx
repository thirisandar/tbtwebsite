// src/pages/Admin/AddBusinessForm.jsx

import React, { useState } from 'react';

function AddBusinessForm({ onAddBusiness, onCancel, industryOptions }) { 
    
    const defaultIndustry = (industryOptions && industryOptions.length > 0) 
        ? industryOptions[0] 
        : 'Unspecified Industry';
        
    const [formData, setFormData] = useState({
        'Business Name': '',
        'Owner Name' : '',
        'Industry Type': defaultIndustry, 
        
        // These fields are correctly initialized as empty strings
        'Logo URL': '' ,
        'Physical Address' : '',
        'Email Address' : '',
        'Phone Number' : '',
        'Viber Number' : '',
        'Website Link' : '',
        'Facebook Link' : '',
        'Tiktok Link' : '',
        'Google Map Link' : '',
    });
    
    const [submitLoading, setSubmitLoading] = useState(false);

    // ⭐️ NEW HELPER FUNCTION: Removes empty strings/nulls ⭐️
    const cleanData = (data) => {
        const cleaned = {};
        for (const key in data) {
            const value = data[key];
            // Only include values that are NOT an empty string or null
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        // ⭐️ STEP 1: Clean the data to omit empty fields ⭐️
        const cleanedData = cleanData(formData);

        try {
            // ⭐️ STEP 2: Submit only the cleaned data ⭐️
            await onAddBusiness(cleanedData); 
        } catch (error) {
            console.error("Failed to add business in form:", error);
        }
        
        setSubmitLoading(false);
        onCancel(); // Close the form and go back to the list view
    };

    // Helper array to define the input fields for clean rendering
    const textFields = [
        { label: 'Business Name', name: 'Business Name', required: true },
        { label: 'Owner Name', name: 'Owner Name', required: false },
        { label: 'Logo URL', name: 'Logo URL', required: false, type: 'url' },
        { label: 'Physical Address', name: 'Physical Address', required: false },
        { label: 'Email Address', name: 'Email Address', required: false, type: 'email' },
        { label: 'Phone Number', name: 'Phone Number', required: false },
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
                
                {/* Industry Type (Dynamic Dropdown) */}
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
                
                {/* Dynamically render all text input fields */}
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
                        className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition">
                        Cancel
                    </button>
                    <button type="submit" disabled={formData['Business Name'] === '' || submitLoading}
                        className={`px-6 py-2 font-medium rounded-lg transition shadow-md ${submitLoading ? 'bg-blue-600 opacity-60' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                        {submitLoading ? 'Adding...' : 'Add Business'}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default AddBusinessForm;     