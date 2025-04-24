'use client';

import { fetchDrive } from '@/lib/api';
import ClientDriveTreeWrapper from '@/components/ClientDriveTreeWrapper';
import { useState } from 'react';
import { Folder, UserDrive } from '@/lib/types';

export default function DrivePage() {
    const [userId, setUserId] = useState('');
    const [drive, setDrive] = useState<UserDrive | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null); // Store the error text for display

    async function handleFetchDrive() {
        if (!userId.trim()) return;

        try {
            setErrorText(null);
            const result = await fetchDrive(userId);

            if (result) {
                setDrive(result);
                setErrorText(null);
            } else {
                setDrive(null);
                setErrorText('An unknown error occurred');
            }
        } catch (err: unknown) {
            setDrive(null);
            setErrorText(err instanceof Error ? err.message : 'Unexpected error occurred'); // Extract error from Error object if it exists
        }
    }

    return (
        <main className="p-4">
            <div className="mb-4">
                <label htmlFor="userId" className="block mb-2 text-sm font-medium">
                    Enter UserId
                </label>
                <input
                    id="userId"
                    type="text"
                    className="border rounded px-2 py-1 w-full mb-2"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter userId"
                />
                <button
                    className="bg-blue-500 text-white rounded px-4 py-2"
                    onClick={handleFetchDrive}
                >
                    Fetch Drive
                </button>
            </div>

            {/* Display Error Text in a Read-Only Field */}
            {errorText && (
                <div className="mb-4">
                    <label htmlFor="errorField" className="block mb-2 text-sm font-medium text-red-500">
                        Error
                    </label>
                    <input
                        id="errorField"
                        type="text"
                        readOnly
                        className="border border-red-500 bg-gray-100 text-red-500 rounded px-2 py-1 w-full"
                        value={errorText}
                    />
                </div>
            )}

            {drive && (
                <>
                    <h1 className="text-xl font-semibold mb-4">{userId} Drive</h1>
                    {drive.data.contents.map((folder: Folder) => (
                        <ClientDriveTreeWrapper key={folder.id} initialRoot={folder} />
                    ))}
                </>
            )}
        </main>
    );
}