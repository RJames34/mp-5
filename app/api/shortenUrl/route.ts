import { NextRequest, NextResponse } from "next/server";
import getCollection, { URLS } from "@/mongoDB";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { url, alias } = body;

    // make sure the url is actually valid
    try {
        new URL(url);
    } catch {
        return NextResponse.json({ error: "That doesn't look like a valid URL" }, { status: 400 });
    }

    const collection = await getCollection(URLS);

    // don't allow duplicate aliases
    const taken = await collection.findOne({ alias });
    if (taken) {
        return NextResponse.json({ error: "That alias is already taken, try another one" }, { status: 409 });
    }

    await collection.insertOne({ url, alias });
    return NextResponse.json({ success: true }, { status: 201 });
}