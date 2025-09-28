import Image from "next/image";
import Link from "next/link";
import { Entry } from "@/lib/types";

export default function GalleryEntry({ entry }: {entry : Entry}) {
    return (
        <Link href={`/entry/${entry.id}`} className="aspect-square">
            <Image src={entry.image_url} 
                alt={entry.title} 
                width={100} 
                height={100}
                className="object-cover w-full h-full rounded-md hover:scale-105 transition-transform duration-200 ease-in-out"
             />
        </Link>
    )
}