"use client"

import { useState, useEffect } from "react"
import { Tag } from "@/lib/types"

export function useUserTags() {
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTags = async() => {
            try {
                const response = await fetch('/api/tags')
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`)
                }
                const data = await response.json()
                setTags(data.tags)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchTags()
    }, [])

    const refetch = async() => {
        setLoading(true)
        const response = await fetch('/api/tags')
        const data = await response.json()
        setTags(data.tags)
        setLoading(false)
    }

    return { tags, loading, error, refetch }
}