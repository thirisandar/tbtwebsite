
// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase';
// import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

// // NOTE: The separate PIN generation helper function is removed.
// // The member's 6-digit code is the 'Pin' used by the Admin.

// function MemberAuth({ setCurrentView, views, onMemberLoginSuccess }) {
//     const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login/Register
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [successMsg, setSuccessMsg] = useState('');

//     // Form Data
//     const [ownerName, setOwnerName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [memberCode, setMemberCode] = useState(''); // 6 digit code

//     // ⭐️ AUTO-FILL LOGIC (Remember Me) ⭐️
//     useEffect(() => {
//         const savedMember = localStorage.getItem('tbt_member_data');
//         if (savedMember) {
//             const { phone, code } = JSON.parse(savedMember);
//             setPhoneNumber(phone);
//             setMemberCode(code);
//         }
//     }, []);

//     // ⭐️ REGISTRATION LOGIC ⭐️
//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccessMsg('');

//         // Validation
//         if (memberCode.length !== 6) {
//             setError("Member code must be exactly 6 digits.");
//             return;
//         }

//         setIsLoading(true);
//         try {
//             // 1. Check if phone number already exists against the ADMIN field name
//             const q = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber));
//             const querySnapshot = await getDocs(q);

//             if (!querySnapshot.empty) {
//                 setError("This phone number is already registered. Please login.");
//                 setIsLoading(false);
//                 return;
//             }

//             // 2. Create new member
//             await addDoc(collection(db, 'members'), {
//                 // ⭐️ CRITICAL FIX: Harmonize fields with AdminDashboard ⭐️
//                 'Owner Name': ownerName,
//                 'Phone Number': phoneNumber,
//                 // ⭐️ FIX: Store the 6-digit memberCode directly as the 'Pin' field ⭐️
//                 'Pin': memberCode, 
                
//                 createdAt: new Date().toISOString(),
//                 role: 'member'
//             });

//             // 3. Remember Me (Save to Local Storage)
//             localStorage.setItem('tbt_member_data', JSON.stringify({
//                 phone: phoneNumber,
//                 code: memberCode
//             }));

//             setSuccessMsg("Registration Successful! You can now login.");
//             setIsRegistering(false); // Switch to login view
            
//         } catch (err) {
//             console.error("Registration Error:", err);
//             setError("Failed to register. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // ⭐️ LOGIN LOGIC ⭐️
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError('');
//         setIsLoading(true);

//         try {
//             // Simple query to match phone and the 6-digit 'Pin' field
//             const q = query(
//                 collection(db, 'members'), 
//                 where('Phone Number', '==', phoneNumber),
//                 where('Pin', '==', memberCode) // Check the 'Pin' field for the 6-digit code
//             );
//             const querySnapshot = await getDocs(q);

//             if (!querySnapshot.empty) {
//                 const memberDoc = querySnapshot.docs[0];
//                 const memberData = memberDoc.data();
                
//                 // Update Local Storage to ensure it's current
//                 localStorage.setItem('tbt_member_data', JSON.stringify({
//                     phone: phoneNumber,
//                     code: memberCode
//                 }));

//                 onMemberLoginSuccess(memberData); 
//             } else {
//                 setError("Invalid Phone Number or Member Code.");
//             }
//         } catch (err) {
//             console.error("Login Error:", err);
//             setError("Login failed. Check connection.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//             <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                
//                 <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//                     {isRegistering ? 'Create Member Account' : 'Member Login'}
//                 </h2>
//                 <p className="text-center text-gray-500 mb-6">
//                     {isRegistering ? 'Join TBT to connect with businesses.' : 'Welcome back! Enter your code.'}
//                 </p>

//                 {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>}
//                 {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">{successMsg}</div>}

//                 <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                    
//                     {/* Owner Name (Only for Registration) */}
//                     {isRegistering && (
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Owner Name</label>
//                             <input 
//                                 type="text" 
//                                 required 
//                                 value={ownerName} 
//                                 onChange={(e) => setOwnerName(e.target.value)} 
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                     )}

//                     {/* Phone Number */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                         <input 
//                             type="tel" 
//                             required 
//                             value={phoneNumber} 
//                             onChange={(e) => setPhoneNumber(e.target.value)} 
//                             placeholder="e.g., 09xxxxxxxxx"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>

//                     {/* 6-Digit Code */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">6-Digit Member Code</label>
//                         <input 
//                             type="text" 
//                             required 
//                             maxLength="6"
//                             value={memberCode} 
//                             onChange={(e) => {
//                                 const val = e.target.value.replace(/[^0-9]/g, '');
//                                 setMemberCode(val);
//                             }} 
//                             placeholder="123456"
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 tracking-widest text-center font-bold text-lg"
//                         />
//                     </div>

//                     <button 
//                         type="submit" 
//                         disabled={isLoading}
//                         className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     >
//                         {isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
//                     </button>
//                 </form>

//                 {/* Toggle Login/Register */}
//                 <div className="mt-6 text-center text-sm">
//                     {isRegistering ? (
//                         <p>Already a member? <button onClick={() => setIsRegistering(false)} className="text-blue-600 font-semibold hover:underline">Login here</button></p>
//                     ) : (
//                         <p>New here? <button onClick={() => setIsRegistering(true)} className="text-blue-600 font-semibold hover:underline">Create Account</button></p>
//                     )}
//                 </div>

//                 <div className="mt-4 text-center">
//                     <button onClick={() => setCurrentView(views.HOME)} className="text-gray-500 text-xs hover:text-gray-700">← Back to Home</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MemberAuth;
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

function MemberAuth({ setCurrentView, views, onMemberLoginSuccess }) {
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login/Register
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Form Data
    const [ownerName, setOwnerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [memberCode, setMemberCode] = useState(''); // 6 digit code

    // ⭐️ AUTO-FILL LOGIC (Remember Me) ⭐️
    useEffect(() => {
        const savedMember = localStorage.getItem('tbt_member_data');
        if (savedMember) {
            const { phone, code } = JSON.parse(savedMember);
            setPhoneNumber(phone);
            setMemberCode(code);
        }
    }, []);

    // ⭐️ REGISTRATION LOGIC ⭐️
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        // Validation
        if (memberCode.length !== 6) {
            setError("Member code must be exactly 6 digits.");
            return;
        }

        setIsLoading(true);
        try {
            // 1. Check if phone number already exists against the ADMIN field name
            const q = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setError("This phone number is already registered. Please login.");
                setIsLoading(false);
                return;
            }

            // 2. Create new member
            await addDoc(collection(db, 'members'), {
                // ⭐️ CRITICAL FIX: Harmonize fields with AdminDashboard ⭐️
                'Owner Name': ownerName,
                'Phone Number': phoneNumber,
                // ⭐️ FIX: Store the 6-digit memberCode directly as the 'Pin' field ⭐️
                'Pin': memberCode, 
                
                createdAt: new Date().toISOString(),
                role: 'member'
            });

            // 3. Remember Me (Save to Local Storage)
            localStorage.setItem('tbt_member_data', JSON.stringify({
                phone: phoneNumber,
                code: memberCode
            }));

            setSuccessMsg("Registration Successful! You can now login.");
            setOwnerName(''); // Clear name field after success
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

        try {
            // Simple query to match phone and the 6-digit 'Pin' field
            const q = query(
                collection(db, 'members'), 
                where('Phone Number', '==', phoneNumber),
                where('Pin', '==', memberCode) // Check the 'Pin' field for the 6-digit code
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const memberDoc = querySnapshot.docs[0];
                const memberData = memberDoc.data();
                
                // Update Local Storage to ensure it's current
                localStorage.setItem('tbt_member_data', JSON.stringify({
                    phone: phoneNumber,
                    code: memberCode
                }));

                onMemberLoginSuccess(memberData); 
            } else {
                setError("Invalid Phone Number or Member Code.");
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
                
                {/* ⭐️ LOGO ⭐️ */}
                <div className="flex justify-center mb-6">
                    <img 
                        src="/tbtlogo.jpg" 
                        alt="TBT Logo" 
                        className="h-16 w-auto" 
                    />
                </div>
                
                <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-2">
                    {isRegistering ? 'Create Member Account' : 'Member Login'}
                </h2>
                <p className="text-center text-gray-500 mb-8 font-light">
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
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" autoComplete="tbt-owner-name-off"
                            />
                        </div>
                    )}

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input 
                            type="text" 
                            required 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            placeholder="e.g., 09xxxxxxxxx"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" autoComplete="tbt-phone-number-off"
                        />
                    </div>

                    {/* 6-Digit Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">6-Digit Member Code</label>
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
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 tracking-widest text-center font-bold text-lg transition" autoComplete="tbt-member-pin-off"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        // ⭐️ BUTTON COLOR: Blue to match Home.jsx ⭐️
                        className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Processing...' : (isRegistering ? 'Register Account' : 'Login to Portal')}
                    </button>
                </form>

                {/* Toggle Login/Register */}
                <div className="mt-8 text-center text-sm">
                    {isRegistering ? (
                        <p className="text-gray-600">Already a member? <button onClick={() => setIsRegistering(false)} className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition">Login here</button></p>
                    ) : (
                        <p className="text-gray-600">New here? <button onClick={() => setIsRegistering(true)} className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition">Create Account</button></p>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <button onClick={() => setCurrentView(views.HOME)} className="text-gray-500 text-sm hover:text-blue-600 transition">← Back to Home Page</button>
                </div>
            </div>
        </div>
    );
}

export default MemberAuth;