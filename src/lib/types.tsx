// lib/types.ts
export interface Bookmark {
    id: string;
    type: 'bookmark';
    url: string;
    name: string;
}

export interface Folder {
    id: string;
    type: 'folder';
    name: string;
    contents: TreeNode[];
}

export type TreeNode = Bookmark | Folder;

export interface Root {
    contents: Folder[]; // [my-folder, inbox, trash]
}

export interface UserDrive {
    userId: string;
    currentHash: string;
    data: Root;
}

// lib/api.ts
import { Root, UserDrive } from './types';

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

// components/DriveTree.tsx
'use client';

import { Folder as FolderType, TreeNode } from '../lib/types';
import FolderComponent from './Folder';

interface DriveTreeProps {
    root: Folder;
    onChange: (updated: Folder) => void;
}

export default function DriveTree({ root, onChange }: DriveTreeProps) {
    return (
        <div className="p-4">
        <FolderComponent folder={root} onChange={onChange} />
    </div>
);
}

// components/Folder.tsx
'use client';

import { Folder, TreeNode } from '../lib/types';
import BookmarkComponent from './Bookmark';

interface Props {
    folder: FolderType;
    onChange: (updated: FolderType) => void;
}

export default function FolderComponent({ folder, onChange }: Props) {
    return (
        <div className="ml-4 border-l pl-4">
        <div className="font-bold mb-1">{folder.name}</div>
            <ul className="space-y-1">
        {folder.contents.map((node) => (
                <li key={node.id}>
                    {node.type === 'folder' ? (
                            <FolderComponent folder={node} onChange={() => {}} />
) : (
        <BookmarkComponent bookmark={node} />
)}
    </li>
))}
    </ul>
    </div>
);
}

// components/Bookmark.tsx
'use client';

import { Bookmark } from '../lib/types';

interface Props {
    bookmark: Bookmark;
}

export default function BookmarkComponent({ bookmark }: Props) {
    return (
        <div className="pl-2 text-sm text-blue-600 hover:underline cursor-pointer">
            {bookmark.name} — <span className="text-gray-500">{bookmark.url}</span>
        </div>
);
}
