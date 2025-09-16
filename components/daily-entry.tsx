import Image from "next/image";

interface Entry {
    id: string;
    text: string;
    title: string;
    image_url: string;
    tags: {
        id: string;
        name: string;
    }[];
}

export default function DailyEntry({ entry }: {entry : Entry}) {
    return (
        <div>
            
        </div>
    )
}
   