'use client'

import { supabase } from "@/lib/supabaseClient"

export default function Login() {
    const signIn = async () => {
        await supabase.auth.signInWithOAuth({ provider: "google" })
    }

    return (
        <button onClick={signIn}>Sign in with Google</button>
    )
}