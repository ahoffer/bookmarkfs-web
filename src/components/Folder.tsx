'use client';

import { Folder, TreeNode } from '@/lib/types';
import BookmarkComponent from '@/components/Bookmark';
import EditableField from '@/components/EditableField';

interface Props {
    folder: Folder;
    onChangeAction: (updated: Folder) => void;
}

import { v4 as uuidv4 } from 'uuid';

export default function FolderComponent({ folder, onChangeAction }: Props) {
    function handleRename(newName: string) {
        onChangeAction({ ...folder, name: newName });
    }

    function handleAddBookmark() {
        const newBookmark : TreeNode = {
            id: uuidv4(),
            type: 'bookmark',
            name: 'New Bookmark',
            url: 'https://example.com'
        };
        folder.contents.push(newBookmark);
        onChangeAction(folder);
    }

    return (
        <div className="ml-4 border-l pl-4">
            <EditableField
                value={folder.name}
                onChangeAction={handleRename}
                className="font-bold mb-1"
            />
            <ul className="space-y-1">
                {folder.contents.map((node: TreeNode) => (
                    <li key={node.id}>
                        {node.type === 'folder' ? (
                            <FolderComponent folder={node} onChangeAction={(updated) => {
                                const newContents = folder.contents.map((item) =>
                                    item.id === updated.id ? updated : item
                                );
                                onChangeAction({ ...folder, contents: newContents });
                            }} />
                        ) : (
                            <BookmarkComponent bookmark={node} />
                        )}
                    </li>
                ))}
            </ul>
            {folder.name === 'my-folder' && (
                <button
                    onClick={handleAddBookmark}
                    className="mt-2 text-sm text-blue-500 hover:underline"
                >
                    + Add Bookmark
                </button>
            )}
        </div>
    );
}