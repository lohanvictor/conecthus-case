import { create, getAll } from "@/services/usersRepository";
import { NextResponse } from "next/server";

const PAGE_SIZE = 5;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? undefined;
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));

    const all = getAll(search);
    const totalItems = all.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    const items = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return NextResponse.json({ items, page, totalPages, totalItems });
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

    const user = create({ name, registration, email, password });

    return NextResponse.json(user, { status: 201 });
}
