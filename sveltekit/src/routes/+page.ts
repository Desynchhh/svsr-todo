import type { PbResponse, Todo } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    const getTodos = async () => {
        let todos: Todo[] = [];
        const res = await fetch(
            "http://127.0.0.1:8090/api/collections/todos/records"
        );
        const data: PbResponse<Todo> = await res.json();
        if (data) {
            todos = data.items;
        }
        return todos;
    };

    return {
        todos: getTodos(),
    };
};

