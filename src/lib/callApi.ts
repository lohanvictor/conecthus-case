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
    method?: "GET" | "POST" | "DELETE" | "PATCH";
    body?: object;
    params?: Record<string, string>;
};

function getBaseUrl(): string {
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    } else {
        return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    }
}

export async function callApi<T = unknown>(
    path: string,
    { body, params, method = "GET" }: ApiRequest = {}
): Promise<ApiResponse<T>> {
    try {
        let url = `${getBaseUrl()}${path}`;
        if (params) url += `?${new URLSearchParams(params).toString()}`;

        console.log("[Calling API] URL: ", url);
        console.log("[Calling API] Method: ", method);
        console.log("[Calling API] Body: ", body);
        console.log("[Calling API] Params: ", params);

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            console.log("[Calling API] Error: ", await response.text());
            return {
                data: null,
                error: {
                    message: await response.text(),
                    code: response.status,
                },
            };
        }

        const data = (await response.json()) as T;
        console.log("[Calling API] Response: ", response);
        return { data, error: null };
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Erro desconhecido";
        return { data: null, error: { message, code: 500 } };
    }
}
