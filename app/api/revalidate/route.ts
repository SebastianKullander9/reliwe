import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret")
    
    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
    }

    try {
        revalidatePath("/vara-projekt")
        return NextResponse.json({ revalidated: true })
    } catch (err) {
        return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
    }
}