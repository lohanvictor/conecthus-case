import { NextResponse } from "next/server";
import { remove } from "@/lib/usersStore";

type Params = { params: Promise<{ id: string }> };

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
