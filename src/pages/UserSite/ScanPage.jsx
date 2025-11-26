import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; 

// Use the same key defined in App.jsx
const SCANNED_MEMBER_KEY = 'tbt_scanned_member'; 

const ScanPage = () => {
    const [status, setStatus] = useState('Scanning QR Code...');

    useEffect(() => {
        // 1. Get the 'data' query parameter
        const params = new URLSearchParams(window.location.search);
        const rawData = params.get('data'); 

        if (!rawData) {
            setStatus('Error: No QR code data found in the URL.');
            return;
        }

        const [phoneNum, pin] = rawData.split('-');

        if (!phoneNum || !pin) {
            setStatus('Error: Invalid QR code format.');
            return;
        }
        
        setStatus('Verifying account credentials...');

        const fetchMemberAndLogin = async (phoneNum, pin) => {
            try {
                // Find member record and verify both Phone Number and Pin
                const memberQuery = query(
                    collection(db, 'members'),
                    where('Phone Number', '==', phoneNum),
                    where('Pin', '==', pin)
                );
                const memberSnap = await getDocs(memberQuery);

                if (memberSnap.empty) {
                    setStatus('Access Denied: Invalid Phone Number or PIN.');
                    return;
                }

                const memberDoc = memberSnap.docs[0];
                const member = { 
                    id: memberDoc.id, 
                    ...memberDoc.data() 
                };
                
                // ⭐️ STEP 1: Save verified member data to Session Storage ⭐️
                sessionStorage.setItem(SCANNED_MEMBER_KEY, JSON.stringify(member));
                
                setStatus('Login successful! Redirecting to Member Dashboard...');

                // ⭐️ STEP 2: Redirect to the app root to activate App.jsx login logic ⭐️
                setTimeout(() => {
                    // This forces a full refresh which re-mounts App.jsx and checks Session Storage
                    window.location.replace('/member-dashboard');                }, 1000); 

            } catch (error) {
                console.error("Error during QR login:", error);
                setStatus('An unexpected error occurred during login. Please try again.');
            }
        };

        fetchMemberAndLogin(phoneNum, pin);
    }, []); 

    // ⭐️ Only display the status message ⭐️
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-12 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-extrabold mb-4">QR Code Login</h1>
                <p className={`text-xl font-semibold ${status.includes('Error') ? 'text-red-400' : 'text-blue-400'}`}>
                    {status}
                </p>
                {(status.includes('successful') || status.includes('Redirecting')) && (
                    <p className="mt-4 text-gray-500">Please wait, logging you in...</p>
                )}
            </div>
        </div>
    );
};

export default ScanPage;