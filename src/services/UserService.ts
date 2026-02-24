export type User = {
    id: string;
    name: string;
    registration: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export function getUsers(): Promise<User[]> {
    const mockUsers: User[] = [
        {
            id: "1",
            name: "Raimundo Neto",
            registration: "1234567890",
            email: "raimundo.neto@example.com",
            createdAt: "2021-01-01",
            updatedAt: "2021-01-01",
        },
        {
            id: "2",
            name: "João da Silva",
            registration: "1234567891",
            email: "joao.silva@example.com",
            createdAt: "2021-01-01",
            updatedAt: "2021-01-01",
        },
    ];
    return Promise.resolve(mockUsers);
}