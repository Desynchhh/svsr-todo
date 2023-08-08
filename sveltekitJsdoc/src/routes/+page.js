// @ts-ignore
import * as Types from "$lib/types.js";

export async function load({ fetch }) {
    async function getTodos() {
        /**@type {Types.Todo[]} */
        let todos = [];
        const res = await fetch(
            "http://127.0.0.1:8090/api/collections/todos/records"
        );
        /**@type {Types.PbResponse<Types.Todo>} */
        const data = await res.json();
        if (data) {
            todos = data.items;
        }
        return todos;
    }

    return {
        todos: getTodos(),
    }
}