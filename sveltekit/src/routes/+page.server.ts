import type { Actions } from "@sveltejs/kit";
import type { PostTodo } from "$lib/types";

const TODO_COLLECTION_URL =
    "http://127.0.0.1:8090/api/collections/todos/records" as const;

export const actions: Actions = {
    deleteTodo: async ({ request, fetch }) => {
        try {
            const formData = await request.formData();
            const { todoId } = Object.fromEntries(formData) as {
                todoId: string;
            };
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
            const newTodo: PostTodo = Object.fromEntries(formData) as {
                title: string;
                body?: string;
                completed?: any;
            };

            if (!newTodo.title) {
                return {
                    formErrors: {
                        title: "Title is required!",
                    },
                    status: false,
                };
            }

            if (newTodo.completed) {
                newTodo.completed = true;
            }

            const res = await fetch(TODO_COLLECTION_URL, {
                method: "POST",
                body: JSON.stringify(newTodo),
                headers: {
                    "Content-Type": "application/json",
                },
            });
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
            const {
                todoId,
                newCompletedState,
            }: { todoId: string; newCompletedState: boolean } =
                Object.fromEntries(formData) as {
                    todoId: string;
                    newCompletedState: any;
                };

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

