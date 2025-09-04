"use client"

import { Camera } from "lucide-react";
import { Sun } from "lucide-react";
import { Calendar } from "lucide-react";
import { LayoutList } from "lucide-react";
import { Images } from "lucide-react";
import { JSX } from "react";

interface View {
    title: string;
    href: string;
    icon: JSX.Element;
}

const views: View[] = [
    {
        title: "Daily",
        href: "?view=daily",
        icon: <Sun />
    },
    {
        title: "Calendar",
        href: "?view=calendar",
        icon: <Calendar />
    },
    {
        title: "",
        href: "?view=camera",
        icon: <div className="bg-primary p-4 rounded-full"><Camera className="text-primary-foreground"/></div>
    },
    {
        title: "List",
        href: "?view=list",
        icon: <LayoutList />
    },
    {
        title: "Gallery",
        href: "?view=gallery",
        icon: <Images />
    },
]

export default function BottomNav() {
    return (
        <div className="flex justify-between items-center p-4">
            {views.map((view) => (
                <button key={view.title} onClick={() => history.pushState(null, '', view.href)} className="flex flex-col flex-1 min-w-0 items-center text-sm text-muted-foreground hover:text-foreground">
                    {view.icon}
                </button>
            ))}
        </div>
    );
}