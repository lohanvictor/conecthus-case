import { callApi } from "@/lib/callApi";

export type User = {
    id: string;
    name: string;
    registration: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateUser = Omit<User, "id" | "createdAt" | "updatedAt">;

export async function getUsers(search?: string): Promise<User[]> {
    const { data, error } = await callApi<User[]>("/api/users", {
        method: "GET",
        params: {
            search: search ?? "",
        },
    });
    if (error) {
        return [];
    }
    return data;
}