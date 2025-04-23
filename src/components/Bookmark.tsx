'use client';

import {Bookmark} from '@/lib/types';
import EditableField from './EditableField';

interface Props {
    bookmark: Bookmark;
}

export default function BookmarkComponent({bookmark}: Props) {
    return (
        <div className="pl-2 text-sm text-blue-600">
            <EditableField
                value={bookmark.name}
                onChangeAction={(newName) => {
                    // Implement onChange handler at parent level if needed
                }}
                className="font-medium"
            />
            <span className="text-gray-400"> — {bookmark.url}</span>
        </div>
    );
}