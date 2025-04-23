import { fetchDrive } from '@/lib/api';
import ClientDriveTreeWrapper from '@/components/ClientDriveTreeWrapper';

export default async function DrivePage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    const drive = await fetchDrive(userId);
    const root = drive.data;

    return (
        <main>
            <h1 className="text-xl font-semibold p-4">{userId} Drive</h1>
            {root.contents.map((folder) => (
                <ClientDriveTreeWrapper key={folder.id} initialRoot={folder} />
            ))}
        </main>
    );
}
