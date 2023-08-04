export async function fetchData<T>(url: string, init?: RequestInit) {
    const response = await fetch(url, init);
    if (init?.method === "DELETE") {
        return;
    }
    const data: T = await response.json();
    return data;
}

