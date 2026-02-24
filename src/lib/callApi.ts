export type PaginatedResponse<T> = {
    items: T[];
    page: number;
    totalPages: number;
    totalItems: number;
};

type ApiResponse<T> =
    | { data: T; error: null }
    | { data: null; error: { message: string; code: number } };

type ApiRequest = {
    method?: "GET" | "POST" | "DELETE";
    body?: object;
    params?: Record<string, string>;
};

function getBaseUrl(): string {
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    } else {
        return "http://localhost:3000";
    }
}

export async function callApi<T>(
    path: string,
    { body, params, method = "GET" }: ApiRequest = {}
): Promise<ApiResponse<T>> {
    try {
        let url = `${getBaseUrl()}${path}`;
        if (params) url += `?${new URLSearchParams(params).toString()}`;

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            return {
                data: null,
                error: {
                    message: await response.text(),
                    code: response.status,
                },
            };
        }

        const data = (await response.json()) as T;
        return { data, error: null };
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Erro desconhecido";
        return { data: null, error: { message, code: 500 } };
    }
}
