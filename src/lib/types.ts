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
    contents?: TreeNode[];
}

export type TreeNode = Bookmark | Folder;

export interface Root {
    contents: Folder[];
}

export interface UserDrive {
    userId: string;
    currentHash: string;
    data: Root;
}