<script setup>
import TodoItem from "./TodoItem.vue";
defineProps({
    todos: {
        /**@type {import('vue').PropType<import('../types').Todo[]>} */
        type: Array,
        required: true,
    },
});
</script>

<template v-if="todos.length > 0">
    <div class="todos flex flex-row flex-wrap justify-center mt-4 gap-4">
        <TodoItem
            v-for="todo in todos"
            :todo="todo"
            v-on:toggle-todo="$emit('toggle-todo', $event)"
            v-on:delete-todo="$emit('delete-todo', $event)"
        />
    </div>
</template>

