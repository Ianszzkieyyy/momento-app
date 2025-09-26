"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function EntryNav({ entryId }: { entryId: string }) {
    const router = useRouter();
    return (
        <nav className="mt-4 mb-8">
            <div className="flex items-center justify-between">
              <Link href={`/`}>
                  <ArrowLeft />
              </Link>
              <Button onClick={() => router.push(`/entry/${entryId}/edit`)}>Edit</Button>
            </div>
        </nav>
    )
}