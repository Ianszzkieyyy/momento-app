import Image from "next/image";

interface Entry {
    id: string;
    text: string;
    title: string;
    image_url: string;
}

export default function DailyEntry({ entry }: {entry : Entry}) {
    return (
        <div>
            <p>{entry.text}</p>
            {entry.image_url && (
                <div className="mt-2">
                    <Image 
                        src={entry.image_url} 
                        alt="Entry Image" 
                        width={300} 
                        height={300} 
                        className="rounded-lg"
                    />
                </div>
            )}
        </div>
    )
}
   