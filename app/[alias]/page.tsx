import { redirect } from "next/navigation";
import getCollection, { URLS } from "@/mongoDB";
import Link from "next/link";
interface Props {
    params: Promise<{ alias: string }>;
}

export default async function AliasPage({ params }: Props) {
    const { alias } = await params;

    const collection = await getCollection(URLS);
    const match = await collection.findOne({ alias });

    if (!match) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">404 - Alias not found</h1>
                <Link href="/" className="mt-4 text-blue-500 underline">Go back home</Link>
            </div>
        );
    }

    redirect(match.url);
}