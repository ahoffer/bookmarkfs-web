import {UserDrive} from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function fetchDrive(userId: string): Promise<UserDrive> {
    const url = `${BASE_URL}/drive/${userId}`;
    console.log(`Fetching ${url}`);

    const res = await fetch(url);

    if (res.status === 404) {
        throw new Error('User does not exist');
    }

    if (!res.ok) {
        throw new Error(`Unexpected error occurred: ${res.status} - ${res.statusText}`);
    }

    try {
        return await res.json();
    } catch {
        throw new Error('Failed to parse response as JSON');
    }
}

export async function updateDrive(userDrive: UserDrive): Promise<UserDrive> {
    const res = await fetch(`${BASE_URL}/drive/${userDrive.userId}`, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json', 'If-Match': userDrive.currentHash,
        }, body: JSON.stringify(userDrive.data),
    });

    if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
    return await res.json();
}