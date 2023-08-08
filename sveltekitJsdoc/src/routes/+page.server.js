// @ts-ignore
import * as Types from "$lib/types";

/**@constant {string} */
const TODO_COLLECTION_URL = "http://127.0.0.1:8090/api/collections/todos/records";

/** @type {import('./$types').Actions} */
export const actions = {
    deleteTodo: async function ({ request, fetch }) {
        try {
            const formData = await request.formData();
            const todoId = formData.get("todoId")?.toString();
            if (!todoId) {
                throw new Error("todoId not provided!");
            }

            await fetch(`${TODO_COLLECTION_URL}/${todoId}`, {
                method: "DELETE",
            });
            return {
                todoId,
            };
        } catch (err) {
            console.error(err);
            return err;
        }
    },
    addTodo: async ({ request, fetch }) => {
        try {
            const formData = await request.formData();
            const title = formData.get("title")?.toString();
            const body = formData.get("body")?.toString();
            const completed = formData.has("completed");
            if (!title) {
                throw new Error("Title not provided!");
            }

            /**@type {Types.PostTodo} */
            const newTodo = {
                title,
                body,
                completed,
            };

            const res = await fetch(TODO_COLLECTION_URL, {
                method: "POST",
                body: JSON.stringify(newTodo),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            /**@type {*} */
            const data = await res.json();

            return {
                status: true,
                result: data,
            };
        } catch (err) {
            console.error(err);
            return {
                status: false,
                error: err,
            };
        }
    },
    toggleTodo: async ({ request, fetch }) => {
        try {
            const formData = await request.formData();

            const todoId = formData.get("todoId")?.toString();
            const newCompletedState = formData.get("newCompletedState")?.toString();

            await fetch(`${TODO_COLLECTION_URL}/${todoId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    completed: newCompletedState,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.error(err);
            return {
                error: err,
            };
        }
    },
};