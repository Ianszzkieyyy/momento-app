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
    created_at: string;
}

export default function DailyEntry({ entry }: {entry : Entry}) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex">
                        {(entry.tags ?? []).slice(0, 2).map(tag => (
                            <div key={tag.id} className="bg-primary text-white font-medium rounded-md px-3 py-1 text-xs tracking-widest mr-2 flex items-center justify-center">
                                {(tag.name).toUpperCase()}
                            </div>
                        ))}
                        {entry.tags && entry.tags.length > 2 && (
                            <div className="text-gray-700 text-sm py-1">
                                +{entry.tags.length - 2} more
                            </div>
                        )}
                    </div>
                    <h2 className="text-2xl mt-2 mb-1">{entry.title}</h2>
                    <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase">{new Date(entry.created_at).toLocaleTimeString([], { weekday: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div>
                    {entry.image_url && (
                        <div className="relative w-24 h-24">
                            <Image 
                                src={entry.image_url} 
                                alt={entry.title} 
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
   