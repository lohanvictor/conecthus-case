import { callApi, PaginatedResponse } from "@/lib/callApi";

export type User = {
    id: string;
    name: string;
    registration: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateUser = Omit<User, "id" | "createdAt" | "updatedAt">;

export async function getUsers(search?: string, page?: number): Promise<PaginatedResponse<User>> {
    const { data, error } = await callApi<PaginatedResponse<User>>("/api/users", {
        params: {
            search: search ?? "",
            page: page?.toString() ?? "1",
        },
    });
    if (error) {
        return { items: [], page: 1, totalPages: 1, totalItems: 0 };
    }
    return data;
}
