import { NextResponse } from "next/server";
import { getById, update, remove } from "@/services/userRepository";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
    const { id } = await params;
    const user = getById(id);

    if (!user) {
        return NextResponse.json(
            { message: "Usuário não encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json(user);
}

export async function PATCH(request: Request, { params }: Params) {
    const { id } = await params;
    const body = await request.json();

    const user = update(id, body);

    if (!user) {
        return NextResponse.json(
            { message: "Usuário não encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json(user);
}

export async function DELETE(_request: Request, { params }: Params) {
    const { id } = await params;

    const deleted = remove(id);

    if (!deleted) {
        return NextResponse.json(
            { message: "Usuário não encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json({ message: "Usuário excluído" });
}
