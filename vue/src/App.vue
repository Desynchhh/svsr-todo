<script setup>
import { ref, onBeforeMount } from "vue";
import Toast from "./components/Toast.vue";
import CreateForm from "./components/CreateForm.vue";
import TodoList from "./components/TodoList.vue";

const tailwindClasses =
    "daisy-alert-info daisy-alert-success daisy-alert-warning daisy-alert-error";

const isModalOpen = ref(false);
const toastMessage = ref("");
/**@type {import("vue").Ref<import("./types").ToastStatus>} */
const toastStatus = ref("daisy-alert-success");

/**@type {import("vue").Ref<import("./types").Todo[]>} */
const todos = ref(undefined);
onBeforeMount(async () => {
    const response = await fetch(
        "http://127.0.0.1:8090/api/collections/todos/records"
    );

    /**@type {import("./types").PbResponse<import("./types").Todo>} */
    const data = await response.json();

    todos.value = data.items;
    return data;
});

/**
 * @param {import("./types").PostTodo} newTodo
 */
async function addTodo(newTodo) {
    try {
        const res = await fetch(
            "http://127.0.0.1:8090/api/collections/todos/records",
            {
                method: "POST",
                body: JSON.stringify(newTodo),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        /**@type {import("./types").Todo} */
        const data = await res.json();
        todos.value.push(data);
        closeModal();
        toastMessage.value = "Todo added!";
        toastStatus.value = "daisy-alert-success";
    } catch (err) {
        console.log(err);
        toastMessage.value = "Something went wrong while adding the todo..";
        toastStatus.value = "daisy-alert-error";
    }
    openToast();
    return true;
}
/**@param {string} todoId */
async function deleteTodo(todoId) {
    try {
        const res = await fetch(
            `http://127.0.0.1:8090/api/collections/todos/records/${todoId}`,
            {
                method: "DELETE",
            }
        );
        // /**@type {import("./types").Todo} */
        // const data = await res.json();
        todos.value = todos.value.filter((t) => t.id !== todoId);
        toastMessage.value = "Todo deleted!";
        toastStatus.value = "daisy-alert-success";
    } catch (err) {
        console.log(err);
        toastMessage.value = "Something went wrong while updating the todo..";
        toastStatus.value = "daisy-alert-error";
    }
    openToast();
    return true;
}

/**@param {string} todoId */
async function toggleTodoComplete(todoId) {
    try {
        const [todo] = todos.value.filter((t) => t.id === todoId);
        if (!todo) {
            toastMessage.value = `could not find todo with id ${todoId}`;
            toastStatus.value = "daisy-alert-error";
            return;
        }
        const newCompleted = !todo.completed;

        const res = await fetch(
            `http://127.0.0.1:8090/api/collections/todos/records/${todoId}`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    completed: newCompleted,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        /**@type {import("./types").Todo} */
        const data = await res.json();

        todos.value = todos.value.map((t) => {
            if (t.id === todoId) {
                t.completed = newCompleted;
            }
            return t;
        });

        toastMessage.value = "Todo updated!";
        toastStatus.value = "daisy-alert-success";
    } catch (err) {
        console.error(err);
        toastMessage.value = "Something went wrong while updating the todo..";
        toastStatus.value = "daisy-alert-error";
    }
    openToast();
    return true;
}

function closeModal() {
    isModalOpen.value = false;
}

function openModal() {
    isModalOpen.value = true;
}

function closeToast() {
    toastMessage.value = "";
    toastStatus.value = "daisy-alert-success";
}
function openToast() {
    setTimeout(() => {
        closeToast();
    }, 2500);
}
</script>

<template>
    <main class="flex flex-col justify-center items-center mx-auto mt-10">
        <div>
            <button
                class="daisy-btn daisy-btn-lg daisy-btn-success"
                v-on:click="openModal"
            >
                Add todo +
            </button>
        </div>

        <!-- Open the modal using ID.showModal() method -->
        <TodoList
            v-if="todos"
            :todos="todos"
            v-on:toggle-todo="toggleTodoComplete"
            v-on:delete-todo="deleteTodo"
        />
        <CreateForm
            :isOpen="isModalOpen"
            v-on:close-create-todo-modal="closeModal"
            v-on:add-todo="addTodo"
        />

        <Toast
            v-if="toastMessage && toastStatus"
            v-bind:message="toastMessage"
            v-bind:status="toastStatus"
        />
    </main>
</template>

