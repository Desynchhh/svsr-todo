<script lang="ts">
    import type { Todo } from "../../types";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    
    export let todo: Todo;

    function toggleComplete(todoId: string) {
        dispatch("toggle-todo", todoId);
    }

    function deleteTodo(todoId: string) {
        dispatch("delete-todo", todoId);
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
            <button class="daisy-btn daisy-btn-sm daisy-btn-primary" on:click={() => toggleComplete(todo.id)}>Toggle complete</button>
            <button class="daisy-btn daisy-btn-sm daisy-btn-error text-1xl" on:click={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    </div>
</div>
