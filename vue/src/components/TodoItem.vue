<script setup>
const props = defineProps({
    todo: {
        /**@type {import("vue").PropType<import('../types').Todo>} */
        type: Object,
        required: true,
    },
});
const emit = defineEmits(["toggle-todo", "delete-todo"]);

/**@param {string} todoId */
function toggleComplete(todoId) {
    emit("toggle-todo", todoId);
}

/**@param {string} todoId */
function deleteTodo(todoId) {
    emit("delete-todo", todoId);
}
</script>

<template>
    <div class="daisy-card w-96 bg-base-100 shadow-xl">
        <div class="daisy-card-body">
            <div class="title flex flex-row justify-between">
                <h2 class="daisy-card-title flex flex-row justify-between">
                    {{ todo.title }}
                </h2>
                <div
                    v-bind:class="`daisy-badge font-bold ${
                        todo.completed
                            ? 'daisy-badge-success'
                            : 'daisy-badge-warning'
                    }`"
                >
                    {{ todo.completed ? "COMPLETED!" : "INCOMPLETE" }}
                </div>
            </div>
            <p>{{ todo.body }}</p>
            <div class="daisy-card-actions justify-end">
                <button
                    class="daisy-btn daisy-btn-sm daisy-btn-primary"
                    v-on:click="() => toggleComplete(todo.id)"
                >
                    Toggle complete
                </button>
                <button
                    class="daisy-btn daisy-btn-sm daisy-btn-error text-1xl"
                    v-on:click="() => deleteTodo(todo.id)"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

