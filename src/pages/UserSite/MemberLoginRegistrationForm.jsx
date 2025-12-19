// import React, { useState } from 'react';
// import { db } from '../../firebase';
// import { 
//     collection, 
//     addDoc, 
//     query, 
//     where, 
//     getDocs, 
//     updateDoc, 
//     increment 
// } from 'firebase/firestore'; 

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

//     // --- RESET LOGIC STATES ---
//     const [showResetOption, setShowResetOption] = useState(false);
//     const [newPasscode, setNewPasscode] = useState('');
//     const [dbResetCount, setDbResetCount] = useState(0);

//     const handleClearForm = (newIsRegisteringValue) => {
//         setOwnerName(''); setPhoneNumber(''); setMemberCode('');
//         setIsRegistering(newIsRegisteringValue); setError(''); setSuccessMsg('');
//         setShowResetOption(false);
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
//                 setError("ထိုဖုန်းနံပါတ်ဖြင့် register ပြုလုပ်ပြီးဖြစ်ပါသည်။");
//                 setIsLoading(false); 
//                 return;
//             }
            
//             const memberID = `M-${Date.now().toString().slice(-6)}`; 
//             const newMemberBaseData = { 
//                 'Owner Name': ownerName, 
//                 'Phone Number': phoneNumber, 
//                 'Pin': memberCode, 
//                 'MemberID': memberID, 
//                 'passcodeResetCount': 0, 
//                 createdAt: new Date().toISOString(), 
//                 role: 'member' 
//             };
            
//             await addDoc(collection(db, 'members'), newMemberBaseData);
    
//             setOwnerName(''); setPhoneNumber(''); setMemberCode(''); 
//             setSuccessMsg("စာရင်းသွင်းခြင်း အောင်မြင်ပါသည်။ Login ပြန်၀င်ပါ။");
//             setIsRegistering(false); 
            
//         } catch (err) {
//             setError("စာရင်းသွင်းခြင်း မအောင်မြင်ပါ။ ထပ်မံကြိုးစားပါ");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(''); setSuccessMsg(''); setIsLoading(true);

//         try {
//             const q = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber));
//             const querySnapshot = await getDocs(q);

//             if (!querySnapshot.empty) {
//                 const memberDoc = querySnapshot.docs[0];
//                 const memberData = memberDoc.data();
//                 setDbResetCount(memberData.passcodeResetCount || 0);

//                 if (memberData.Pin === memberCode) {
//                     onMemberLoginSuccess({ ...memberData, uid: memberDoc.id });
//                     setPhoneNumber(''); setMemberCode('');
//                 } else {
//                     setError("လှိူ့ဝှက်နံပါတိမှားနေပါသည်။");
//                 }
//             } else {
//                 setError("ဤဖုန်းနံပါတ်နှင့် စာရင်းသွင်းထားခြင်း မရှိပါ။");
//             }
//         } catch (err) {
//             setError("Login failed.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleResetPasscode = async () => {
//         if (!ownerName || !phoneNumber) { setError("အချက်အလက်များကို အပြည့်အစုံ ဖြည့်ပါ။"); return; }
//         if (newPasscode.length !== 6) { setError("လှိူ့ဝှက်နံပါတိ အသစ်သည် ၆ လုံးဖြစ်ရပါမည်။"); return; }
        
//         setIsLoading(true);
//         try {
//             const q = query(collection(db, 'members'), 
//                 where('Phone Number', '==', phoneNumber),
//                 where('Owner Name', '==', ownerName)
//             );
//             const querySnapshot = await getDocs(q);
    
//             if (!querySnapshot.empty) {
//                 const memberDoc = querySnapshot.docs[0];
//                 const currentCount = memberDoc.data().passcodeResetCount || 0;

//                 if (currentCount >= 3) {
//                     setError("သင့်တွင် လှိူ့ဝှက်နံပါတ်ပြောင်းလဲခွင့် ပြည့်သွားပါပီ။ ထပ်မဲပြောင်းလဲမည်ဆိုပါက adminကို ဆက်သွယ်ပါ။");
//                     setIsLoading(false);
//                     return;
//                 }

//                 await updateDoc(memberDoc.ref, { 
//                     Pin: newPasscode,
//                     passcodeResetCount: increment(1) 
//                 });
                
//                 setSuccessMsg(`လှိူ့ဝှက်နံပါတိ လဲလှယ်မှုအောင်မြင်ပါသည်။ လဲလှယ်ထားသောလှိူ့ဝှက်နံပါတိနှင့် loginပြန်၀င်ပါ။`);
//                 setShowResetOption(false);
//                 setMemberCode(''); setNewPasscode('');
//             } else {
//                 setError("ဖြည့်သွင်းထားသောပိုင်ရှငိနာမည်(သို့မဟုတ်)ဖုန်းနံပါတိမမှန်ကန်ပါ။");
//             }
//         } catch (err) {
//             setError("Update လုပ်ရန် အခက်အခဲရှိပါသည်။");
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
//                 <p className="text-center text-gray-800 mb-8 font-light text-sm">
//                     {isRegistering ? 'အောက်ပါတို့ကိုဖြည့်ပီး member အကောင့်သစ်ဖန်တီးပါ' : 'သင့်၏ဖုနိးနံပါတ်နှင့်လှိူ့ဝှက်နံပါတ်အားရိုက်ပီး login ၀င်ပါ။'}
//                 </p>

//                 {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-xs font-bold">{error}</div>}
//                 {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-xs font-bold">{successMsg}</div>}

//                 <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
//                     {isRegistering && ( 
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">ပိုင်ရှင်နာမည် ဖြည့်ရန်</label>
//                             <input type="text" required value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 transition outline-none" autoComplete="off" />
//                         </div> 
//                     )}
                    
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">မိမိဖုန်းနံပါတ် ဖြည့်ရန်</label>
//                         <input type="text" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="09xxxxxxxxx" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-gray-800 transition outline-none" autoComplete="off" />
//                     </div>

//                     {!showResetOption && (
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 {isRegistering ? 'မိမိနှစ်သက်ရာ လှိူ့ဝှက်နံပါတ်6လုံး ဖြည့်ရနိ' : 'သတိမှတိထားသော လှိူ့ဝှက်နံပါတ်6လုံး ရိုက်ထညိ့ရန်'}
//                             </label>
//                             <input type="text" required maxLength="6" value={memberCode} onChange={(e) => setMemberCode(e.target.value.replace(/[^0-9]/g, ''))} placeholder="123456" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:border-gray-800 transition outline-none" autoComplete="off" />
//                         </div>
//                     )}

//                     {showResetOption && (
//                         <div className={`p-4 rounded-lg border bg-orange-50 border-orange-200`}>
//                             <p className="text-xs font-bold uppercase text-center mb-3 text-orange-800">လှိူ့ဝှက်နံပါတ်အသစ် ပြုလုပ်ခြင်း</p>
//                             <div className="space-y-3">
//                                 <input type="text" placeholder="ပိုင်ရှင်နာမည် ပြန်ရိုက်ထည့်ပါ" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500" />
//                                 <input type="text" maxLength="6" placeholder="လှိူ့ဝှက်နံပါတ် အသစ် ရိုက်ထည့်ပါ" value={newPasscode} onChange={(e) => setNewPasscode(e.target.value.replace(/[^0-9]/g, ''))} className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500" />
//                                 <button type="button" onClick={handleResetPasscode} className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition cursor-pointer">လှိူ့ဝှက်နံပါတ်ပြောင်းရန်</button>
//                                 <button type="button" onClick={() => setShowResetOption(false)} className="w-full text-blue-700 text-lg font-bold mt-4 hover:underline cursor-pointer">Login ပြန်ဝင်ရန်</button>
//                             </div>
//                         </div>
//                     )}

//                     {!showResetOption && (
//                         <div className="text-center space-y-3">
//                             <button type="submit" disabled={isLoading} className={`w-full mb-4 py-3 px-4 rounded-lg shadow-md text-base font-medium transition cursor-pointer ${isLoading ? 'bg-blue-600 text-white opacity-80' : 'text-black bg-blue-400 hover:bg-blue-700 hover:text-white'}`}>
//                                 {isLoading ? ( <> <ButtonSpinner /> လုပ်ဆောင်နေပါသည်။ </> ) : ( isRegistering ? 'Account registerလုပ်ရန်' : 'Login၀င်ရန်' )}
//                             </button>
                            
//                             {/* ⭐️ Forget Passcode Moved Here ⭐️ */}
//                             {!isRegistering && (
//                                 <button type="button"  onClick={() => { setShowResetOption(true); setError(''); }}className="text-[16px] text-md text-red-600 font-bold hover:underline cursor-pointer block mx-auto mt-2">
//                                     လှိူ့ဝှက်နံပါတ်အား မေ့နေပါသလား။
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </form>

//                 <div className="mt-5 text-center text-sm">
//                     {isRegistering ? (
//                         <p className="text-gray-600">Memberဖြစ်ပါက <button type="button" onClick={() => handleClearForm(false)} className="text-blue-600 text-lg font-bold hover:underline transition cursor-pointer">Loginပြန်၀င်ပါ</button></p>
//                     ) : (
//                         <p className="text-gray-600">Memberအသစ်ဖြစ်ပါက <button type="button" onClick={() => handleClearForm(true)} className="text-blue-800 text-lg font-bold hover:underline transition cursor-pointer">accountအသစ်ဖန်တီးရန်</button></p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MemberLoginRegistrationForm;
import React, { useState, useEffect } from 'react'; // Added useEffect
import { db } from '../../firebase';
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    getDocs, 
    updateDoc, 
    increment 
} from 'firebase/firestore'; 

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

    const [showResetOption, setShowResetOption] = useState(false);
    const [newPasscode, setNewPasscode] = useState('');
    const [dbResetCount, setDbResetCount] = useState(0);

    // --- AUTO-HIDE MESSAGES LOGIC ---
    useEffect(() => {
        if (error || successMsg) {
            const timer = setTimeout(() => {
                setError('');
                setSuccessMsg('');
            }, 1500); // 1.5 seconds gives the user just enough time to read it
            return () => clearTimeout(timer);
        }
    }, [error, successMsg]);

    const handleClearForm = (newIsRegisteringValue) => {
        setOwnerName(''); setPhoneNumber(''); setMemberCode('');
        setIsRegistering(newIsRegisteringValue); setError(''); setSuccessMsg('');
        setShowResetOption(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); setSuccessMsg('');
        if (memberCode.length !== 6) { setError("Member code must be exactly 6 digits."); return; }
        
        setIsLoading(true);
        try {
            const qCheck = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber));
            const querySnapshotCheck = await getDocs(qCheck);
            
            if (!querySnapshotCheck.empty) {
                setError("ထိုဖုန်းနံပါတ်ဖြင့် register ပြုလုပ်ပြီးဖြစ်ပါသည်။");
                return;
            }
            
            const memberID = `M-${Date.now().toString().slice(-6)}`; 
            const newMemberBaseData = { 
                'Owner Name': ownerName, 
                'Phone Number': phoneNumber, 
                'Pin': memberCode, 
                'MemberID': memberID, 
                'passcodeResetCount': 0, 
                createdAt: new Date().toISOString(), 
                role: 'member' 
            };
            
            await addDoc(collection(db, 'members'), newMemberBaseData);
            setOwnerName(''); setPhoneNumber(''); setMemberCode(''); 
            setSuccessMsg("စာရင်းသွင်းခြင်း အောင်မြင်ပါသည်။ Login ပြန်၀င်ပါ။");
            setIsRegistering(false); 
        } catch (err) {
            setError("စာရင်းသွင်းခြင်း မအောင်မြင်ပါ။ ထပ်မံကြိုးစားပါ");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); setSuccessMsg(''); setIsLoading(true);
        try {
            const q = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const memberDoc = querySnapshot.docs[0];
                const memberData = memberDoc.data();
                setDbResetCount(memberData.passcodeResetCount || 0);
                if (memberData.Pin === memberCode) {
                    onMemberLoginSuccess({ ...memberData, uid: memberDoc.id });
                    setPhoneNumber(''); setMemberCode('');
                } else {
                    setError("လှိူ့ဝှက်နံပါတိမှားနေပါသည်။");
                }
            } else {
                setError("ဤဖုန်းနံပါတ်နှင့် စာရင်းသွင်းထားခြင်း မရှိပါ။");
            }
        } catch (err) {
            setError("Login failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPasscode = async () => {
        if (!ownerName || !phoneNumber) { setError("အချက်အလက်များကို အပြည့်အစုံ ဖြည့်ပါ။"); return; }
        if (newPasscode.length !== 6) { setError("လှိူ့ဝှက်နံပါတိ အသစ်သည် ၆ လုံးဖြစ်ရပါမည်။"); return; }
        setIsLoading(true);
        try {
            const q = query(collection(db, 'members'), where('Phone Number', '==', phoneNumber), where('Owner Name', '==', ownerName));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const memberDoc = querySnapshot.docs[0];
                const currentCount = memberDoc.data().passcodeResetCount || 0;
                if (currentCount >= 3) {
                    setError("သင့်တွင် လှိူ့ဝှက်နံပါတ်ပြောင်းလဲခွင့် ပြည့်သွားပါပီ။ adminကို ဆက်သွယ်ပါ။");
                    return;
                }
                await updateDoc(memberDoc.ref, { Pin: newPasscode, passcodeResetCount: increment(1) });
                setSuccessMsg(`လှိူ့ဝှက်နံပါတိ လဲလှယ်မှုအောင်မြင်ပါသည်။ loginပြန်၀င်ပါ။`);
                setShowResetOption(false);
                setMemberCode(''); setNewPasscode('');
            } else {
                setError("ဖြည့်သွင်းထားသောပိုင်ရှငိနာမည်(သို့မဟုတ်)ဖုန်းနံပါတိမမှန်ကန်ပါ။");
            }
        } catch (err) {
            setError("Update လုပ်ရန် အခက်အခဲရှိပါသည်။");
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
                <p className="text-center text-gray-800 mb-8 font-light text-sm">
                    {isRegistering ? 'အောက်ပါတို့ကိုဖြည့်ပီး member အကောင့်သစ်ဖန်တီးပါ' : 'သင့်၏ဖုနိးနံပါတ်နှင့်လှိူ့ဝှက်နံပါတ်အားရိုက်ပီး login ၀င်ပါ။'}
                </p>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-xs font-bold transition-opacity duration-500">{error}</div>}
                {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-xs font-bold transition-opacity duration-500">{successMsg}</div>}

                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
                    {isRegistering && ( 
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ပိုင်ရှင်နာမည် ဖြည့်ရန်</label>
                            <input type="text" required value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg outline-none" autoComplete="off" />
                        </div> 
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">မိမိဖုန်းနံပါတ် ဖြည့်ရန်</label>
                        <input type="text" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="09xxxxxxxxx" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg outline-none" autoComplete="off" />
                    </div>

                    {!showResetOption && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {isRegistering ? 'မိမိနှစ်သက်ရာ လှိူ့ဝှက်နံပါတ်6လုံး ဖြည့်ရနိ' : 'သတိမှတိထားသော လှိူ့ဝှက်နံပါတ်6လုံး ရိုက်ထညိ့ရန်'}
                            </label>
                            <input type="text" required maxLength="6" value={memberCode} onChange={(e) => setMemberCode(e.target.value.replace(/[^0-9]/g, ''))} placeholder="123456" className="mt-1 block w-full p-3 border border-gray-300 rounded-lg outline-none" autoComplete="off" />
                        </div>
                    )}

                    {showResetOption && (
                        <div className={`p-4 rounded-lg border bg-orange-50 border-orange-200`}>
                            <p className="text-xs font-bold uppercase text-center mb-3 text-orange-800">လှိူ့ဝှက်နံပါတ်အသစ် ပြုလုပ်ခြင်း</p>
                            <div className="space-y-3">
                                <input type="text" placeholder="ပိုင်ရှင်နာမည် ပြန်ရိုက်ထည့်ပါ" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none" />
                                <input type="text" maxLength="6" placeholder="လှိူ့ဝှက်နံပါတ် အသစ် ရိုက်ထည့်ပါ" value={newPasscode} onChange={(e) => setNewPasscode(e.target.value.replace(/[^0-9]/g, ''))} className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none" />
                                <button type="button" onClick={handleResetPasscode} className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition cursor-pointer">လှိူ့ဝှက်နံပါတ်ပြောင်းရန်</button>
                                <button type="button" onClick={() => setShowResetOption(false)} className="w-full text-blue-700 text-lg font-bold mt-4 hover:underline cursor-pointer">Login ပြန်ဝင်ရန်</button>
                            </div>
                        </div>
                    )}

                    {!showResetOption && (
                        <div className="text-center space-y-3">
                            <button type="submit" disabled={isLoading} className={`w-full mb-4 py-3 px-4 rounded-lg shadow-md text-base font-medium transition cursor-pointer ${isLoading ? 'bg-blue-600 text-white opacity-80' : 'text-black bg-blue-400 hover:bg-blue-700 hover:text-white'}`}>
                                {isLoading ? ( <> <ButtonSpinner /> လုပ်ဆောင်နေပါသည်။ </> ) : ( isRegistering ? 'Account registerလုပ်ရန်' : 'Login၀င်ရန်' )}
                            </button>
                            {!isRegistering && (
                                <button type="button" onClick={() => { setShowResetOption(true); setError(''); }} className="text-[16px] text-red-600 font-bold hover:underline cursor-pointer block mx-auto mt-2">
                                    လှိူ့ဝှက်နံပါတ်အား မေ့နေပါသလား။
                                </button>
                            )}
                        </div>
                    )}
                </form>

                <div className="mt-5 text-center text-sm">
                    {isRegistering ? (
                        <p className="text-gray-600">Memberဖြစ်ပါက <button type="button" onClick={() => handleClearForm(false)} className="text-blue-600 text-lg font-bold hover:underline cursor-pointer">Loginပြန်၀င်ပါ</button></p>
                    ) : (
                        <p className="text-gray-600">Memberအသစ်ဖြစ်ပါက <button type="button" onClick={() => handleClearForm(true)} className="text-blue-800 text-lg font-bold hover:underline cursor-pointer">accountအသစ်ဖန်တီးရန်</button></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MemberLoginRegistrationForm;