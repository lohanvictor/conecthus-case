import { CreateUser, User } from "@/services/UserService";

function nextId() {
    return crypto.randomUUID()
}

const users: User[] = [
    {
        id: "1",
        name: "Raimundo Neto",
        registration: "1234567890",
        email: "raimundo.neto@example.com",
        password: "abc123",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "João da Silva",
        registration: "1234567891",
        email: "joao.silva@example.com",
        password: "abc123",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export function getAll(search?: string): User[] {
    if (!search) return users;
    const term = search.toLowerCase();
    return users.filter(
        (u) =>
            u.name.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term) ||
            u.registration.includes(term)
    );
}

export function getById(id: string): User | undefined {
    return users.find((u) => u.id === id);
}

export function update(id: string, data: Partial<CreateUser>): User | null {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    const user = users[index];
    users[index] = {
        ...user,
        ...data,
        updatedAt: new Date().toISOString(),
    };
    return user;
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
