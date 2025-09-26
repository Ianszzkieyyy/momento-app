import { Camera } from "lucide-react";
import { Sun } from "lucide-react";
import { Calendar } from "lucide-react";
import { LayoutList } from "lucide-react";
import { Images } from "lucide-react";
import { JSX } from "react";
import Link from "next/link";

interface View {
    href: string;
    icon: JSX.Element;
}

const views: View[] = [
    {
        href: "/",
        icon: <Sun />
    },
    {
        href: "/calendar",
        icon: <Calendar />
    },
    {
        href: "?view=camera",
        icon: <div className="bg-primary p-4 rounded-full">
            <Camera className="text-primary-foreground"/>
        </div>
    },
    {
        href: "/list",
        icon: <LayoutList />
    },
    {
        href: "/gallery",
        icon: <Images />
    },
]

export default function BottomNav() {
    return (
        <div className="flex justify-between items-center py-4 px-8">
            {views.map((view, index) => {
                return (
                    <Link 
                        key={index} 
                        href={view.href} 
                        className={`flex flex-col items-center justify-center text-sm`}
                    >
                        {view.icon}
                    </Link>
                )
            })}
        </div>
    );
}