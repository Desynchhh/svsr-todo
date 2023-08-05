<script lang="ts">
    import type { Todo } from "$lib/types";
    import TodoItem from "./TodoItem.svelte";
    import { fly, fade, slide } from "svelte/transition";
    import * as easingFns from 'svelte/easing';
    
    export let todos: Todo[];
</script>

{#if todos && todos.length > 0}
    <div class="todos flex flex-row flex-wrap justify-center mt-4 gap-4" in:fly={{y: 500, duration: 500}} out:fade>
        {#each todos as todo (todo.id)}
        <div
            in:fly|global={{
                y: 250,
                duration: 750,
                easing: easingFns.backOut
            }}
            out:fade|global
        >
            <TodoItem {todo} on:toggle-todo on:delete-todo />
        </div>
        {/each}
    </div>
{:else}
    <div class="text-center mt-4" in:slide={{delay: 450}}>
        <h2 class="text-3xl">You have no todos.</h2>
        <h2 class="text-3xl">Why don't you add some?</h2>
    </div>
{/if}