"use client"

import React, { useState } from 'react'
import handleUploadImage from "@/utils/upload"

export function useImageUpload(onUpload?: (url: string, filePath: string) => void) {
    const [uploading, setUploading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUploadImage(
            e,
            setUploading,
            (url: string | null, filePath: string | null) => {
                if (url && filePath && onUpload) {
                    onUpload(url, filePath)
                }
            }
        )
    }

    const triggerUpload = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (e) => {
            const target = e.target as HTMLInputElement
            if (target.files) {
                const mockEvent = {
                    target,
                    currentTarget: target
                } as React.ChangeEvent<HTMLInputElement>

                handleUploadImage(
                    mockEvent,
                    setUploading,
                    (url: string | null, filePath: string | null) => {
                        if (url && filePath && onUpload) {
                            onUpload(url, filePath)
                        }
                    }
                )
            }
        }
        input.click()
    }

    return {
        uploading,
        handleFileChange,
        triggerUpload
    }
}