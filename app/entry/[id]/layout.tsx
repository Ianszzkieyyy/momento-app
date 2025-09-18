export default function EntryLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-screen md:w-md py-4 px-8">
            {children}
        </div>
    )
}