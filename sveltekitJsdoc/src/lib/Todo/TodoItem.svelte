<script>
    import { enhance } from "$app/forms";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    
    /**@type {import("$lib/types").Todo}*/
    export let todo;

    /**@type {import("@sveltejs/kit").SubmitFunction}*/
    const toggleTodoEnhance = ({ formElement, formData, action, cancel }) => {
        const newCompletedState = formData.get("newCompletedState")?.toString();
        const stateText = newCompletedState === "true" ? "COMPLETED!" : "INCOMPLETE";
        return async function({result, update}) {
            /**@type {import("$lib/types").DispatchParams}*/
            let dispatchParams;
            switch(result.type) {
                case "success":
                    dispatchParams = {
                        toastStatus: "daisy-alert-success",
                        toastMessage: `Todo set to ${stateText}`,
                    };
                    dispatch("toggle-todo", dispatchParams);
                    break;
                case "error":
                    dispatchParams = { 
                        toastStatus: "daisy-alert-error",
                        toastMessage: "Could not delete Todo",
                    };
                    dispatch("toggle-todo", dispatchParams);
                    break;
                default:
                    break;
            }
            await update({ reset: false });
        }
    }

    /**@type {import("@sveltejs/kit").SubmitFunction}*/
    const deleteTodoEnhance = ({ formElement, formData, action, cancel }) => {
        return async function({result, update}) {
            /**@type {import("$lib/types").DispatchParams}*/
            let dispatchParams;
            switch(result.type) {
                case "success":
                    dispatchParams = { 
                        toastStatus: "daisy-alert-success",
                        toastMessage: "Todo deleted successfully",
                    };
                    dispatch("delete-todo", dispatchParams);
                    break;
                case "error":
                    dispatchParams = { 
                        toastStatus: "daisy-alert-error",
                        toastMessage: "Could not delete Todo",
                    };
                    dispatch("delete-todo", dispatchParams);
                    break;
                default:
                    break;
            }
            await update({ reset: false });
        }
    }
</script>

<div class="daisy-card w-96 bg-base-100 shadow-xl">
    <div class="daisy-card-body">
        <div class="title flex flex-row justify-between">
            <h2 class="daisy-card-title flex flex-row justify-between">
                {todo.title}
            </h2>
            <div class={`daisy-badge ${todo.completed ? "daisy-badge-success" : "daisy-badge-warning"} font-bold`}>
                {todo.completed ? "COMPLETED!" : "INCOMPLETE"}
            </div>
        </div>
        <p>{todo.body}</p>
        <div class="daisy-card-actions justify-end">
            <form action="?/toggleTodo" method="post" use:enhance={toggleTodoEnhance}>
                <input type="hidden" name="todoId" hidden required value={todo.id}>
                <input type="hidden" name="newCompletedState" hidden required value={!todo.completed}>
                <button class="daisy-btn daisy-btn-sm daisy-btn-primary" type="submit">Toggle complete</button>
            </form>
            <form action="?/deleteTodo" method="post" use:enhance={deleteTodoEnhance}>
                <input type="hidden" name="todoId" hidden required value={todo.id}>
                <button class="daisy-btn daisy-btn-sm daisy-btn-error text-1xl" type="submit">Delete</button>
            </form>
        </div>
    </div>
</div>
