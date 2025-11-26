import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

// Key for Local Storage (Define it here for clear function)
const MEMBER_DATA_KEY = 'tbt_member_data';

// ⭐️ NEW COMPONENT: Inline Spinner for Buttons ⭐️
const ButtonSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


function MemberAuth({ setCurrentView, views, onMemberLoginSuccess }) {
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login/Register
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Form Data
    const [ownerName, setOwnerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [memberCode, setMemberCode] = useState(''); // 6 digit code

    // ⭐️ MODIFIED: Removed useEffect for Local Storage loading/autofill ⭐️
    // Fields will now start empty every time the component loads.
    
    // ⭐️ MODIFIED: Cleaned up clear handler - Local storage is no longer used ⭐️
    const handleClearFormAndStorage = (newIsRegisteringValue) => {
        // 1. Clear Local Storage (Safety measure, though we no longer write to it)
        localStorage.removeItem(MEMBER_DATA_KEY);
        
        // 2. Clear form state
        setOwnerName('');
        setPhoneNumber('');
        setMemberCode('');
        
        // 3. Switch view
        setIsRegistering(newIsRegisteringValue);
        setError('');
        setSuccessMsg('');
    };


    // ⭐️ REGISTRATION LOGIC ⭐️
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        
        if (memberCode.length !== 6) {
            setError("Member code must be exactly 6 digits.");
            return;
        }

        setIsLoading(true);
        try {
            // 1. Check if phone number already exists
            const q = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setError("This phone number is already registered. Please login.");
                setIsLoading(false);
                return;
            }

            // 2. Create new member
            await addDoc(collection(db, 'members'), {
                'Owner Name': ownerName,
                'Phone Number': phoneNumber,
                'Pin': memberCode, 
                createdAt: new Date().toISOString(),
                role: 'member'
            });

            setSuccessMsg("Registration Successful! Please log in again with your ph num and pin code");
            setOwnerName(''); 
            setPhoneNumber(''); 
            setMemberCode(''); 
            setIsRegistering(false); // Switch to login view
            
        } catch (err) {
            console.error("Registration Error:", err);
            setError("Failed to register. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // ⭐️ LOGIN LOGIC ⭐️
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (memberCode.length !== 6) {
            setError("The Member Code must be exactly 6 digits.");
            setIsLoading(false);
            return;
        }


        try {
            const q = query(
                collection(db, 'members'), 
                where('Phone Number', '==', phoneNumber),
                where('Pin', '==', memberCode) 
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const memberDoc = querySnapshot.docs[0];
                const memberData = memberDoc.data();
                
                // ⭐️ MODIFIED: NO LOCAL STORAGE SAVE ⭐️

                onMemberLoginSuccess(memberData); 
                
                // Clear the form state after successful login before navigating
                setPhoneNumber('');
                setMemberCode('');
                
            } else {
                setError("Invalid Login Details. Please check your Phone Number and 6-Digit Member Code.");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Login failed. Check connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border-4 border-gray-200">
                
                {/* LOGO */}
                <div className="flex justify-center mb-6">
                    <img 
                        src="/tbtlogo.jpg" 
                        alt="TBT Logo" 
                        className="h-16 w-auto rounded-full" 
                    />
                </div>
                
                <h2 className="text-3xl font-extrabold text-center text-black mb-2">
                    {isRegistering ? 'Create Member Account' : 'Member Login'}
                </h2>
                <p className="text-center text-gray-800 mb-8 font-light">
                    {isRegistering ? 'Join TBT to connect with businesses.' : 'Securely access your member portal.'}
                </p>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>}
                {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">{successMsg}</div>}

                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
                    
                    {/* Owner Name (Only for Registration) */}
                    {isRegistering && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                            <input 
                                type="text" 
                                required 
                                value={ownerName} 
                                onChange={(e) => setOwnerName(e.target.value)} 
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" 
                                autoComplete="name" 
                                data-lpignore="true"
                            />
                        </div>
                    )}

                    {/* Phone Number */}
                    <div>
                        <label className="block text-md font-medium text-gray-700">Phone Number</label>
                        <input 
                            type="text" 
                            required 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            placeholder="e.g., 09xxxxxxxxx"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition" 
                            autoComplete="off" // Ensures no browser autofill
                            data-lpignore="true"
                        />
                    </div>

                    {/* 6-Digit Code */}
                    <div>
                        <label className="block text-md font-medium text-gray-700">6-Digit Member Code</label>
                        <input 
                            type="text" 
                            required 
                            maxLength="6"
                            value={memberCode} 
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, '');
                                setMemberCode(val);
                            }} 
                            placeholder="123456"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition" 
                            autoComplete="off" // Ensures no browser autofill
                            data-lpignore="true"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        // ⭐️ MODIFIED: Changed styles for loading state visibility ⭐️
                        className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                            ${isLoading 
                                ? 'bg-blue-600 text-white opacity-80 cursor-not-allowed' 
                                : 'text-black bg-blue-400 hover:bg-blue-700 hover:text-white cursor-pointer'
                            }`
                        }
                    >
                        {/* ⭐️ MODIFIED: Replaced text with spinner icon ⭐️ */}
                        {isLoading ? (
                            <>
                                <ButtonSpinner />
                                Processing...
                            </>
                        ) : (
                            isRegistering ? 'Register Account' : 'Login '
                        )}
                    </button>
                </form>

                {/* Toggle Login/Register */}
                <div className="mt-8 text-center text-sm">
                    {isRegistering ? (
                        <p className="text-gray-600">Already a member? <button onClick={() => handleClearFormAndStorage(false)} className="text-md text-blue-600 font-bold hover:text-blue-800 cursor-pointer transition">Login here</button></p>
                    ) : (
                        <p className="text-gray-600 text-md">New here? <button onClick={() => handleClearFormAndStorage(true)} className="text-blue-800 text-lg cursor-pointer font-bold hover:text-blue-700  transition">Create Account</button></p>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <button onClick={() => setCurrentView(views.HOME)} className="text-gray-700 text-md font-semibold hover:text-blue-600 transition cursor-pointer">← Back to Home</button>
                </div>
            </div>
        </div>
    );
}

export default MemberAuth;