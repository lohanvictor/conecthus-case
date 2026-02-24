import { NextResponse } from "next/server";
import { create, getAll } from "@/lib/usersStore";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? undefined;
    return NextResponse.json(getAll(search));
}

export async function POST(request: Request) {
    const body = await request.json();

    const { name, registration, email, password } = body;

    if (!name || !registration || !email || !password) {
        return NextResponse.json(
            { message: "Todos os campos são obrigatórios" },
            { status: 400 }
        );
    }

    const user = create({ name, registration, email });

    return NextResponse.json(user, { status: 201 });
}
