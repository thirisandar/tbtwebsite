import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
// ⭐️ IMPORTANT: Adjust path to your firebase config ⭐️
import { db } from '../../firebase'; 

const ScanPage = () => {
    // ⭐️ FIX: Use window.location directly instead of useLocation() ⭐️
    const [businesses, setBusinesses] = useState([]);
    const [status, setStatus] = useState('Scanning QR Code...');
    const [memberData, setMemberData] = useState(null);

    useEffect(() => {
        // 1. Get the 'data' query parameter from the URL using native browser API
        const params = new URLSearchParams(window.location.search);
        const rawData = params.get('data'); 

        if (!rawData) {
            setStatus('Error: No QR code data found in the URL.');
            return;
        }

        // The format is [phoneNum]-[pin]
        const [phoneNum, pin] = rawData.split('-');

        if (!phoneNum || !pin) {
            setStatus('Error: Invalid QR code format.');
            return;
        }
        
        setMemberData({ phoneNum, pin });
        setStatus('Checking accounts...');

        const fetchBusinesses = async () => {
            try {
                // 1. Find member record first to verify PIN
                const memberQuery = query(
                    collection(db, 'members'),
                    where('Phone Number', '==', phoneNum),
                    where('Pin', '==', pin)
                );
                const memberSnap = await getDocs(memberQuery);

                if (memberSnap.empty) {
                    setStatus('Access Denied: Phone Number or PIN is incorrect.');
                    setBusinesses([]);
                    return;
                }

                const member = memberSnap.docs[0].data(); 

                // 2. If member is verified, look for their businesses
                const businessQuery = query(
                    collection(db, 'businesses'),
                    where('Phone Number', '==', phoneNum)
                );
                const businessSnap = await getDocs(businessQuery);

                if (businessSnap.empty) {
                    setStatus(`Welcome, ${member['Owner Name']}! No businesses registered yet.`);
                    setBusinesses([]);
                    return;
                }

                const fetchedBusinesses = businessSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                
                setBusinesses(fetchedBusinesses);
                setStatus('Scan successful! Displaying business data.');

            } catch (error) {
                console.error("Error fetching data:", error);
                setStatus('An unexpected error occurred while fetching business data.');
            }
        };

        fetchBusinesses();
    }, []); // Empty dependency array means it runs once on mount


    const renderBusinessCard = (business) => (
        <div key={business.id} className="bg-gray-700 p-5 rounded-xl shadow-lg border border-gray-600 space-y-3">
            <h3 className="text-xl font-bold text-white">{business['Business Name']}</h3>
            
            {business['Logo URL'] && business['Logo URL'].trim().length > 0 && (
                <img src={business['Logo URL']} alt={`${business['Business Name']} Logo`} className="h-16 w-16 object-contain rounded-full" />
            )}
            
            <p className="text-gray-300">
                <span className="font-semibold text-gray-200">{business['Industry Type']}</span>
            </p>
            <p className="text-sm text-green-400 font-semibold">Status: {business.Status}</p>
            <p className="text-sm text-gray-400">Owner: {business['Owner Name']}</p>
            
            {business['Website Link'] && (
                <a href={business['Website Link']} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm block">
                    Visit Website →
                </a>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-12">
            <h1 className="text-3xl font-extrabold mb-8 border-b border-gray-700 pb-3">QR Code Scan Results</h1>
            
            <p className={`text-lg font-semibold mb-6 ${status.includes('Error') ? 'text-red-400' : 'text-blue-400'}`}>
                {status}
            </p>

            {businesses.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold mb-4">
                        Business{businesses.length > 1 ? 'es' : ''} Found:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {businesses.map(renderBusinessCard)}
                    </div>
                </>
            )}

            {memberData && businesses.length === 0 && !status.includes('Error') && (
                <div className="text-gray-400 italic mt-8">
                    The member account is valid, but no business submission form was found linked to phone number: **{memberData.phoneNum}**.
                </div>
            )}
        </div>
    );
};

export default ScanPage;