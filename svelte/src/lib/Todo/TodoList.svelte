<script lang="ts">
    import type { Todo } from "../../types";
    import TodoItem from "./TodoItem.svelte";
    
    export let todos: Todo[];
</script>

{#if todos}
<div class="todos flex flex-row flex-wrap justify-center mt-4 gap-4">
    {#each todos as todo}
        <TodoItem {todo} on:toggle-todo on:delete-todo/>
    {/each}
</div>
{/if}