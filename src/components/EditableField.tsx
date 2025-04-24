'use client';

import {cn} from '@/lib/utils';
import {useState} from 'react';

interface Props {
    value: string;
    onChangeAction: (newVal: string) => void;
    className?: string;
}

export default function EditableField({value, onChangeAction, className}: Props) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);

    function handleBlur() {
        setEditing(false);
        if (draft !== value) onChangeAction(draft);
    }

    return editing ? (
        <input
            className={cn("border rounded px-1", className)} value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={handleBlur}
            autoFocus
        />
    ) : (
        <span onClick={() => setEditing(true)} className={`cursor-pointer ${className}`}>
      {value}
    </span>
    );
}