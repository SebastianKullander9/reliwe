import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret")
    
    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
    }

    try {
        revalidatePath("/", "page");
        revalidatePath("/om-oss", "page");
        revalidatePath("/kontakt", "page");
        revalidatePath("/vara-projekt", "page");
        revalidatePath("/integritetspolicy", "page");
        
        revalidatePath("/", "layout");
        return NextResponse.json({ revalidated: true })
    } catch (err) {
        return NextResponse.json({ message: "Error revalidating", error: err }, { status: 500 })
    }
}