import CreateForm from "@/components/create-form";

type CreatePageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CreatePage({ searchParams }: CreatePageProps) {
    const signedUrl = searchParams.signedUrl as string | undefined;
    const filePath = searchParams.filePath as string | undefined;

    return <CreateForm signedUrl={signedUrl} filePath={filePath} />
}