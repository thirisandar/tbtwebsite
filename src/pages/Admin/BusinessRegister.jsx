
import React, { useState, useMemo, useEffect } from 'react'; 
import { db } from '../../firebase'; 
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'; 

// ⭐️ NEW: Reusable Logo Spinner Component ⭐️
const LogoSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
        {/* Using the logo image with the Tailwind 'animate-spin' utility */}
        <img 
            src="/tbtlogo.jpg" 
            alt="Loading" 
            className="w-16 h-16 object-contain rounded-full animate-spin" 
        />
        <p className="mt-4 text-xl font-semibold text-blue-600">Loading Form...</p>
    </div>
);

// Define the required input fields (Burmese translations)
const BUSINESS_FIELDS_BASE = [
    { name: 'businessName', label: 'လုပ်ငန်းနာမည်', type: 'text', required: true, placeholder: 'e.g., Yangon IT Solutions' },
    { name: 'ownerName', label: 'ပိုင်ရှင်နာမည်', type: 'text', required: true, placeholder: 'e.g., Khin Myo Sett' },
    { name: 'type', label: 'လုပ်ငန်းအမျိုးအစား', type: 'select', required: true, options: [] }, 
    { name: 'address', label: 'လိပ်စာ အတိအကျ', type: 'text', required: true, placeholder: 'Street address, floor, etc.' },
    { name: 'email', label: 'အီးမေးလ် လိပ်စာ', type: 'email', required: true, placeholder: 'contact@business.com' },
    { name: 'phNo', label: 'ဆက်သွယ်ရန်ဖုန်းနံပါတ်', type: 'tel', required: true, placeholder: 'e.g., 09 123 456 789' },
    { name: 'viberNo', label: 'တခြားဖုန်းနံပါတ်နှင့်viberနံပါတ်များ', type: 'tel', required: false, placeholder: 'Ph num and viber no(optional)' },
    // Link fields remain type 'text' for protocol auto-fill
    { name: 'websiteLink', label: 'Website လိပ်စာ', type: 'text', required: false, placeholder: 'e.g., yourwebsite.com' },
    { name: 'fbLink', label: 'Facebook လိပ်စာ', type: 'text', required: false, placeholder: 'e.g., facebook.com/yourpage' },
    { name: 'tiktokLink', label: 'TikTok လိပ်စာ', type: 'text', required: false, placeholder: 'e.g., tiktok.com/@yourprofile' },
    { name: 'googleMapLink', label: 'Google Map လိပ်စာ', type: 'text', required: false, placeholder: 'Link to Google Maps location' },
];


function BusinessRegister({ setCurrentView, views, currentUser }) { 
    
    const [industryOptions, setIndustryOptions] = useState([]);
    const [isOptionsLoading, setIsOptionsLoading] = useState(true);
    const [formData, setFormData] = useState({}); 
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // SIMPLIFIED STATE
    const [logoUrlInput, setLogoUrlInput] = useState(''); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Normalizes URL input to include 'https://' if missing
    const normalizeUrl = (url) => {
        if (!url || url.trim() === '') return '';
        const trimmedUrl = url.trim();

        if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
            return trimmedUrl;
        }

        return 'https://' + trimmedUrl;
    };
    
    // MODIFIED FIELD DEFS to make ALL fields optional 
    const MODIFIED_FIELDS_BASE = useMemo(() => {
        return BUSINESS_FIELDS_BASE.map(field => {
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


    // --- Dynamically Inject Options & Create Final Field List ---
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
                acc[field.name] = ''; 
                return acc;
            }, {});
            
            if (industryOptions.length > 1) {
                initial.type = industryOptions[1]; 
            }

            if (currentUser) {
                initial.ownerName = currentUser['Owner Name'] || currentUser.ownerName || '';
                initial.phNo = currentUser['Phone Number'] || currentUser.phoneNumber || '';
            }

            setFormData(initial);
        }
    }, [industryOptions, BUSINESS_FIELDS, currentUser]);


    // Handles text/select inputs and the Logo URL input 
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // ⭐️ FIX 1: Block changes if the field is ownerName or phNo ⭐️
        if (name === 'ownerName' || name === 'phNo') {
            return;
        }

        if (name === 'logoUrlInput') {
            setLogoUrlInput(value);
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        
        try {
            
            let logoData = {};
            
            // LOGIC SIMPLIFIED: Only uses URL input
            if (logoUrlInput) {
                logoData = {
                    'Logo URL': normalizeUrl(logoUrlInput), 
                };
            }
            
            const submissionData = {
                'Business Name': formData.businessName,
                'Owner Name': formData.ownerName,
                'Industry Type': formData.type, 
                
                ...logoData, 
                
                'Physical Address': formData.address,
                'Email Address': formData.email,
                
                'Phone Number': formData.phNo, 
                'Viber Number': formData.viberNo,
                
                // Normalizing URLs
                'Website Link': normalizeUrl(formData.websiteLink),
                'Facebook Link': normalizeUrl(formData.fbLink),
                'Tiktok Link': normalizeUrl(formData.tiktokLink),
                'Google Map Link': normalizeUrl(formData.googleMapLink),
                
                'Status': 'Pending Review', 
                'Created Date': new Date().toISOString(),
            };
            
            // Remove fields that are empty strings before submission
            Object.keys(submissionData).forEach(key => {
                if (submissionData[key] === '' || submissionData[key] === null) {
                    delete submissionData[key];
                }
            });

            if (Object.keys(submissionData).length <= 2) { 
                 alert("Please fill in at least one business-specific detail (like Business Name or Address) before submitting.");
                 return;
            }

            await addDoc(collection(db, 'businesses'), submissionData);
            
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error adding business registration: ", error);
            alert("Registration failed. Please check your network and try again.");
        } finally {
            setIsSubmitting(false);
        }

    }

    // --- Conditional Render: Loading State ⭐️ FIXED ⭐️ ---
    if (isOptionsLoading || Object.keys(formData).length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center">
                <div className="bg-white p-12 rounded-xl shadow-xl border border-gray-200">
                    <LogoSpinner /> {/* <--- USING THE NEW SPINNER */}
                </div>
            </div>
        );
    }
    // ----------------------------------------------------

    // --- Conditional Render: Success State ---
    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-center">
                <div className="bg-white p-10 rounded-2xl shadow-2xl border-4 border-blue-200 max-w-lg w-full text-gray-800">
                    <div className="text-6xl text-green-500 mb-6">✅</div>
                    <h2 className="text-2xl font-extrabold text-blue-700 mb-4">စာရင်းပေးသွင်းမှုအောင်မြင်ပါသည်</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        စာရင်းပေးသွင်းခြင်းအတွက်ကျေးဇူးတင်ပါသည်။Adminဘက်မှ အတည်ပြုခြင်းကို စောင့်ပေးပါ။
                    </p>
                    <button
                        onClick={() => setCurrentView(views.MEMBER_DASHBOARD)} 
                        className="w-full px-6 py-3 bg-blue-600 text-white font-extrabold rounded-lg hover:bg-blue-700 transition duration-150 shadow-lg mt-4 text-lg"
                    >
                        Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // --- Component for a Field Group ---
    const renderField = (field) => {
        const currentField = BUSINESS_FIELDS.find(f => f.name === field.name) || field;
        const fieldValue = formData[currentField.name] || ''; 
        
        // ⭐️ FIX 2: Determine if the field should be read-only ⭐️
        const isReadOnly = currentField.name === 'ownerName' || currentField.name === 'phNo';
        
        // Apply different styling for read-only fields
        const inputClasses = `block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${isReadOnly ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`;
        
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
                            <option key={option || index} value={option}>{option || "--- လုပ်ငန်းအမျိုးအစား ရွေးရန် (Optional) ---"}</option>
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
                        // ⭐️ APPLY readOnly and dynamic styling ⭐️
                        readOnly={isReadOnly}
                        className={inputClasses}
                    />
                )}
            </div>
        );
    };

    // --- Main Form Render ---
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
            <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8 border-4 border-gray-200">
                
                <div className="bg-blue-200 text-black p-6 flex justify-between items-center shadow-lg">
                    <h2 className="text-2xl font-extrabold tracking-wide">လုပ်ငန်းစာရင်းသွင်းရန်</h2>
                    <button
                        onClick={() => setCurrentView(views.MEMBER_DASHBOARD)}
                        className="text-md px-4 py-2 border bg-gray-600 text-white rounded-lg cursor-pointer hover:bg-gray-900 transition duration-200 font-semibold shadow-md"
                    >
                        ← Dashboard
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    
                    <p className="text-gray-600 text-lg">
                        ကြိုဆိုပါတယ်။ လုပ်ငန်းအချက်အလက်များကို ဖြည့်သွင်းပေးပါ။
                        <br />
                        <span className="font-semibold text-gray-700">အချို့အချက်အလက်များကို အဖွဲ့ဝင်အကောင့်မှ ကြိုတင်ဖြည့်သွင်းထားပါသည်။ အားလုံးမဖြစ်မနေ ဖြည့်စရာမလိုပါ။</span>
                    </p>
                    
                    {/* CORE INFO SECTION */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-2">
                        <h3 className="text-xl font-bold text-black pb-2 mb-4">1. အဓိက အချက်အလက်များ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            
                            {/* Render Business Name, Owner Name, Industry Type */}
                            {BUSINESS_FIELDS.slice(0, 3).map(renderField)} 

                            {/* Logo URL Input */}
                            <div className='md:col-span-2'> 
                                <label htmlFor="logoUrlInput" className="block text-sm font-semibold text-gray-700 mb-1">
                                    လုပ်ငန်း Logo ၏ လင့်ခ် (URL) 
                                    <span className="text-xs font-normal text-gray-500 ml-2">(Google Drive, social media, သို့မဟုတ် အခြား public လင့်ခ်)</span>
                                </label>
                                <input
                                    id="logoUrlInput"
                                    type="text" 
                                    name="logoUrlInput"
                                    value={logoUrlInput}
                                    onChange={handleChange}
                                    placeholder="e.g., https://drive.google.com/..."
                                    className={`block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-white`}
                                />
                                {logoUrlInput && <p className="mt-1 text-sm text-green-600">Logo လင့်ခ် လက်ခံပါပြီ။</p>}
                            </div>

                            {/* Render Address, Email, Phone, Viber */}
                            {BUSINESS_FIELDS.slice(3, 7).map(renderField)} 
                        </div>
                    </div>

                    {/* ONLINE PRESENCE SECTION */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-2">
                        <h3 className="text-xl font-bold text-black pb-2 mb-4">2. Online တွင်ရှိနေမှု</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Starts at index 7 (websiteLink) */}
                            {BUSINESS_FIELDS.slice(7).map(renderField)} 
                        </div>
                    </div>

                    <div className="pt-6 mt-3">
                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-auto sm:w-1/2 mx-auto p-3 flex justify-center border border-transparent cursor-pointer rounded-lg shadow-lg text-xl font-extrabold text-black transition duration-200 transform hover:scale-[1.01] ${isSubmitting 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500/50'}`
                            }
                        >
                            {isSubmitting ? 'ပေးပို့နေပါသည်...' : 'စာရင်းပေးသွင်းရန်'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default BusinessRegister;