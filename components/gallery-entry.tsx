import Image from "next/image";
import { Entry } from "@/lib/types";

export default function GalleryEntry({ entry }: {entry : Entry}) {
    return (
        
        <Image src={entry.image_url} 
            alt={entry.title} 
            width={100} 
            height={100}
            className="object-cover w-full h-full"
            quality={30}
         />
    )
}