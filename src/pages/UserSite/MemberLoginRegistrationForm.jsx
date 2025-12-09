// // File: src/pages/UserSite/MemberLoginRegistrationForm.jsx

// import React, { useState } from 'react';
// import { db } from '../../firebase';
// import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

// const ButtonSpinner = () => (
//     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//     </svg>
// );

// function MemberLoginRegistrationForm({ onMemberLoginSuccess }) {
//     const [isRegistering, setIsRegistering] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [successMsg, setSuccessMsg] = useState('');

//     const [ownerName, setOwnerName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [memberCode, setMemberCode] = useState('');

//     const handleClearForm = (newIsRegisteringValue) => {
//         setOwnerName(''); setPhoneNumber(''); setMemberCode('');
//         setIsRegistering(newIsRegisteringValue); setError(''); setSuccessMsg('');
//     };
    
//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setError(''); setSuccessMsg('');
//         if (memberCode.length !== 6) { setError("Member code must be exactly 6 digits."); return; }
//         setIsLoading(true);
//         try {
//             const qCheck = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber));
//             const querySnapshotCheck = await getDocs(qCheck);
//             if (!querySnapshotCheck.empty) {
//                 setError("ထိုဖုန်းနံပါတ်ဖြင့်registerပြုလုပါပီးဖြစ်ပါသည်။");
//                 setIsLoading(false); return;
//             }
//             const newMemberBaseData = { 'Owner Name': ownerName, 'Phone Number': phoneNumber, 'Pin': memberCode, createdAt: new Date().toISOString(), role: 'member' };
//             await addDoc(collection(db, 'members'), newMemberBaseData);
//             setOwnerName(''); setPhoneNumber(''); setMemberCode(''); 
//             setSuccessMsg("Registerလုပ်ခြင်းအောင်မြင်ပါသည်။Loginပြန်၀င်ပါ။");
//             setIsRegistering(false); 
//         } catch (err) {
//             console.error("Registration Error:", err);
//             setError("Failed to register. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(''); setSuccessMsg(''); setIsLoading(true);
//         if (memberCode.length !== 6) { setError("The Member Code must be exactly 6 digits."); setIsLoading(false); return; }

//         try {
//             const q = query( collection(db, 'members'), where('Phone Number', '==', phoneNumber), where('Pin', '==', memberCode) );
//             const querySnapshot = await getDocs(q);

//             if (!querySnapshot.empty) {
//                 const memberDoc = querySnapshot.docs[0];
//                 const memberData = memberDoc.data();
//                 const loggedInMemberData = { ...memberData, uid: memberDoc.id };
                
//                 // ⭐️ CRITICAL: Call the success handler from App.jsx
//                 onMemberLoginSuccess(loggedInMemberData); 
                
//                 setPhoneNumber('');
//                 setMemberCode('');
//             } else {
//                 setError("Phone numberနဲ့Member codeအားပြန်ရိုက်ထည့်ပါ");
//             }
//         } catch (err) {
//             console.error("Login Error:", err);
//             setError("Login failed. Check console for errors.");
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
//     return (
//         <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 p-4 overflow-hidden">
//             <div className="w-full max-w-md p-8 rounded-xl border-4 border-gray-200 bg-white shadow-2xl">
//                 <h2 className="text-3xl font-bold text-center text-black mb-2">
//                     {isRegistering ? 'Member Accountသစ်ဖန်တီးရန်' : 'Member Login ၀င်ရန်'}
//                 </h2>
//                 <p className="text-center text-gray-800 mb-8 font-light">
//                     {isRegistering ? 'Join TBT to view the business directory.' : 'Login to access the business directory.'}
//                 </p>

//                 {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>}
//                 {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">{successMsg}</div>}

//                 <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
//                     {isRegistering && ( <div><label className="block text-sm font-medium text-gray-700">Owner Name ဖြည့်ရနိ</label><input type="text" required value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" autoComplete="name" data-lpignore="true"/></div> )}
//                     <div><label className="block text-md font-medium text-gray-700">Phone Number ဖြည့်ရနိ</label><input type="text" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="e.g., 09xxxxxxxxx" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition" autoComplete="off" data-lpignore="true"/></div>
//                     <div><label className="block text-md font-medium text-gray-700">6-Digit Member Code ဖြည့်ရနိ</label><input type="text" required maxLength="6" value={memberCode} onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ''); setMemberCode(val); }} placeholder="123456" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition" autoComplete="off" data-lpignore="true"/></div>
//                     <button type="submit" disabled={isLoading} className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'bg-blue-600 text-white opacity-80 cursor-not-allowed' : 'text-black bg-blue-400 hover:bg-blue-700 hover:text-white cursor-pointer'}`}>
//                         {isLoading ? ( <> <ButtonSpinner /> Processing... </> ) : ( isRegistering ? 'Account registerလုပ်ရန်' : 'Login၀င်ရန်' )}
//                     </button>
//                 </form>

//                 <div className="mt-8 text-center text-sm">
//                     {isRegistering ? (
//                         <p className="text-gray-600">Memberဖြစ်ပါက <button type="button" onClick={() => handleClearForm(false)} className="text-md text-blue-600 font-bold hover:text-blue-800 cursor-pointer transition">Loginပြန်၀င်ပါ</button></p>
//                     ) : (
//                         <p className="text-gray-600 text-md">Memberအသစ်ဖြစ်ပါက <button type="button" onClick={() => handleClearForm(true)} className="text-blue-800 text-lg cursor-pointer font-bold hover:text-blue-700 transition">accountအသစ်ဖန်တီးရန်</button></p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default MemberLoginRegistrationForm;
// File: src/pages/UserSite/MemberLoginRegistrationForm.jsx

import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

const ButtonSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

function MemberLoginRegistrationForm({ onMemberLoginSuccess }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [ownerName, setOwnerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [memberCode, setMemberCode] = useState('');

    const handleClearForm = (newIsRegisteringValue) => {
        setOwnerName(''); setPhoneNumber(''); setMemberCode('');
        setIsRegistering(newIsRegisteringValue); setError(''); setSuccessMsg('');
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); setSuccessMsg('');
        if (memberCode.length !== 6) { setError("Member code must be exactly 6 digits."); return; }
        setIsLoading(true);
        try {
            // Check if phone number is already registered
            const qCheck = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber));
            const querySnapshotCheck = await getDocs(qCheck);
            if (!querySnapshotCheck.empty) {
                setError("ထိုဖုန်းနံပါတ်ဖြင့်registerပြုလုပါပီးဖြစ်ပါသည်။");
                setIsLoading(false); 
                return;
            }
            
            // ⭐️ NEW LOGIC: Generate unique MemberID ⭐️
            // Example: M-251883 (using the last 6 digits of the current timestamp)
            const memberID = `M-${Date.now().toString().slice(-6)}`; 
            
            const newMemberBaseData = { 
                'Owner Name': ownerName, 
                'Phone Number': phoneNumber, 
                'Pin': memberCode, 
                // ⭐️ ADDED: Include the generated MemberID ⭐️
                'MemberID': memberID, 
                createdAt: new Date().toISOString(), 
                role: 'member' 
            };
            
            await addDoc(collection(db, 'members'), newMemberBaseData);
            
            setOwnerName(''); setPhoneNumber(''); setMemberCode(''); 
            setSuccessMsg("Registerလုပ်ခြင်းအောင်မြင်ပါသည်။Loginပြန်၀င်ပါ။");
            setIsRegistering(false); 
            
        } catch (err) {
            console.error("Registration Error:", err);
            setError("Failed to register. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); setSuccessMsg(''); setIsLoading(true);
        if (memberCode.length !== 6) { setError("The Member Code must be exactly 6 digits."); setIsLoading(false); return; }

        try {
            const q = query( collection(db, 'members'), where('Phone Number', '==', phoneNumber), where('Pin', '==', memberCode) );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const memberDoc = querySnapshot.docs[0];
                const memberData = memberDoc.data();
                const loggedInMemberData = { ...memberData, uid: memberDoc.id };
                
                // ⭐️ CRITICAL: Call the success handler from App.jsx
                onMemberLoginSuccess(loggedInMemberData); 
                
                setPhoneNumber('');
                setMemberCode('');
            } else {
                setError("Phone numberနဲ့Member codeအားပြန်ရိုက်ထည့်ပါ");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Login failed. Check console for errors.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 p-4 overflow-hidden">
            <div className="w-full max-w-md p-8 rounded-xl border-4 border-gray-200 bg-white shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-black mb-2">
                    {isRegistering ? 'Member Accountသစ်ဖန်တီးရန်' : 'Member Login ၀င်ရန်'}
                </h2>
                <p className="text-center text-gray-800 mb-8 font-light">
                    {isRegistering ? 'Join TBT to view the business directory.' : 'Login to access the business directory.'}
                </p>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>}
                {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">{successMsg}</div>}

                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
                    {isRegistering && ( <div><label className="block text-sm font-medium text-gray-700">Owner Name ဖြည့်ရနိ</label><input type="text" required value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" autoComplete="name" data-lpignore="true"/></div> )}
                    <div><label className="block text-md font-medium text-gray-700">Phone Number ဖြည့်ရနိ</label><input type="text" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="e.g., 09xxxxxxxxx" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition" autoComplete="off" data-lpignore="true"/></div>
                    <div><label className="block text-md font-medium text-gray-700">6-Digit Member Code ဖြည့်ရနိ</label><input type="text" required maxLength="6" value={memberCode} onChange={(e) => { const val = e.target.value.replace(/[^0-9]/g, ''); setMemberCode(val); }} placeholder="123456" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition" autoComplete="off" data-lpignore="true"/></div>
                    <button type="submit" disabled={isLoading} className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'bg-blue-600 text-white opacity-80 cursor-not-allowed' : 'text-black bg-blue-400 hover:bg-blue-700 hover:text-white cursor-pointer'}`}>
                        {isLoading ? ( <> <ButtonSpinner /> Processing... </> ) : ( isRegistering ? 'Account registerလုပ်ရန်' : 'Login၀င်ရန်' )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm">
                    {isRegistering ? (
                        <p className="text-gray-600">Memberဖြစ်ပါက <button type="button" onClick={() => handleClearForm(false)} className="text-md text-blue-600 font-bold hover:text-blue-800 cursor-pointer transition">Loginပြန်၀င်ပါ</button></p>
                    ) : (
                        <p className="text-gray-600 text-md">Memberအသစ်ဖြစ်ပါက <button type="button" onClick={() => handleClearForm(true)} className="text-blue-800 text-lg cursor-pointer font-bold hover:text-blue-700 transition">accountအသစ်ဖန်တီးရန်</button></p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default MemberLoginRegistrationForm;