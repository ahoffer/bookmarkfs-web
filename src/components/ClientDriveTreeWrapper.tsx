'use client';

import { useState } from 'react';
import DriveTree from './DriveTree';
import type { Folder } from '@/lib/types';

interface Props {
    initialRoot: Folder;
}

export default function ClientDriveTreeWrapper({ initialRoot }: Props) {
    const [root, setRoot] = useState<Folder>(initialRoot);

    return (
        <DriveTree
            root={root}
            onChangeAction={(updatedRoot) => {
                setRoot(updatedRoot);
                // TODO: optional autosave or debounce-save here
            }}
        />
    );
}
