import { CreateUser, User } from "@/services/UserService";

export function nextId() {
    return crypto.randomUUID()
}

const users: User[] = [
    {
        id: "1",
        name: "Raimundo Neto",
        registration: "1234567890",
        email: "raimundo.neto@example.com",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "João da Silva",
        registration: "1234567891",
        email: "joao.silva@example.com",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export function getAll(): User[] {
    return users;
}

export function remove(id: string): boolean {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
}

export function create(data: CreateUser): User {
    const now = new Date().toISOString();
    const user: User = {
        ...data,
        id: nextId(),
        createdAt: now,
        updatedAt: now,
    };
    users.push(user);
    return user;
}
