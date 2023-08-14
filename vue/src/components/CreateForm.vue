<script setup>
import { ref } from "vue";

const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(["add-todo", "close-create-todo-modal"]);

/**@type {import("vue").Ref<HTMLFormElement>} */
const formRef = ref(undefined);

function onClose() {
    emit("close-create-todo-modal");
}

/**
 * @param {SubmitEvent} e
 */
function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(formRef.value);

    const title = formData.get("title_input").toString();
    const body = formData.get("body_input").toString();
    const completed = formData.has("completed_input");

    /**@type {import('../types').PostTodo} */
    const newTodo = {
        title,
        body,
        completed,
    };
    emit("add-todo", newTodo);
    formRef.value.reset();
}
</script>

<template>
    <input
        type="checkbox"
        id="createTodoFormModal"
        class="daisy-modal-toggle"
        :checked="isOpen"
    />
    <div class="daisy-modal">
        <div class="daisy-modal-box">
            <h3 class="font-bold text-lg">Create Todo</h3>
            <div>
                <form
                    ref="formRef"
                    class="flex flex-col"
                    v-on:submit="onSubmit"
                >
                    <legend>Create Todo</legend>
                    <div class="daisy-form-control">
                        <label for="title_input" class="daisy-label"
                            >Title *</label
                        >
                        <input
                            id="title_input"
                            name="title_input"
                            class="daisy-input daisy-input-bordered daisy-input-primary"
                            type="text"
                            placeholder="Title..."
                            required
                        />
                    </div>
                    <div class="daisy-form-control">
                        <label for="body_input" class="daisy-label"
                            >Details</label
                        >
                        <input
                            id="body_input"
                            name="body_input"
                            class="daisy-input daisy-input-bordered daisy-input-primary"
                            type="text"
                            placeholder="Details..."
                        />
                    </div>
                    <div class="daisy-form-control flex-row items-center gap-2">
                        <label for="completed_input" class="daisy-label"
                            >Completed?</label
                        >
                        <input
                            id="completed_input"
                            name="completed_input"
                            class="daisy-checkbox daisy-checkbox-primary"
                            type="checkbox"
                        />
                    </div>
                    <button
                        type="submit"
                        class="daisy-btn daisy-btn-block daisy-btn-primary"
                    >
                        Create
                    </button>
                </form>
            </div>
            <div class="daisy-modal-action">
                <button
                    v-on:click="onClose"
                    class="daisy-btn daisy-btn-secondary"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

