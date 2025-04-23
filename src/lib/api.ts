import {UserDrive} from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function fetchDrive(userId: string): Promise<UserDrive> {
    const res = await fetch(`${BASE_URL}/drive/${userId}`);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return await res.json();
}

export async function updateDrive(userDrive: UserDrive): Promise<UserDrive> {
    const res = await fetch(`${BASE_URL}/drive/${userDrive.userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'If-Match': userDrive.currentHash,
        },
        body: JSON.stringify(userDrive.data),
    });

    if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
    return await res.json();
}