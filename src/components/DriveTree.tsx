'use client'

import FolderComponent from "@/components/Folder";
import {Folder} from "@/lib/types";

interface DriveTreeProps {
    root: Folder;
    onChangeAction: (updated: Folder) => void;
}

export default function DriveTree({root, onChangeAction}: DriveTreeProps) {
    return (
        <div className="p-4">
            <FolderComponent folder={root} onChangeAction={onChangeAction}/>
        </div>
    );
}
