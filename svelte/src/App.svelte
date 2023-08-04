<script lang="ts">
    // import "./app.css";
    import { fetchData } from "./lib/index";
    import { CreateForm } from "./lib/CreateTodo";
    import { TodoList } from "./lib/Todo";
    import Toast from "./lib/Toast.svelte";
    import type { PbResponse, PostTodo, ToastStatus, Todo } from "./types";
    
    let isModalOpen = false;
    let toastMessage = "";
    let toastStatus: ToastStatus;
    
    let todos: Todo[];
    fetchData<PbResponse<Todo>>("http://127.0.0.1:8090/api/collections/todos/records")
        .then((data) => {
        todos = data.items;
        return data;
    });
        
        function openModal() {
            isModalOpen = true;
        }
        
        function closeModal() {
            isModalOpen = false;
        }
        
        async function deleteTodo(event: CustomEvent<string>) {
            try {
                const todoId = event.detail;
                await fetchData<Todo>(`http://127.0.0.1:8090/api/collections/todos/records/${todoId}`, {
                    method: "DELETE",
                });
                todos = todos.filter(t => t.id !== todoId);
                toastMessage = "Todo deleted!";
                toastStatus = "daisy-alert-success";
            } catch (err) {
                console.log(err);
                toastMessage = "Something went wrong while updating the todo..";
                toastStatus = "daisy-alert-error";
            }
        }

        async function addTodo(event: CustomEvent<PostTodo>) {
            try {
                const todo = event.detail;
                
                const data = await fetchData<Todo>("http://127.0.0.1:8090/api/collections/todos/records", {
                    method: "POST",
                    body: JSON.stringify(todo),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                todos = [...todos, data];
                closeModal();
                toastMessage = "Todo added!";
                toastStatus = "daisy-alert-success";
            } catch (err) {
                console.log(err);
                toastMessage = "Something went wrong while adding the todo..";
                toastStatus = "daisy-alert-error";
            }
        }
        
        async function toggleTodoComplete(event: CustomEvent<string>) {
            try {
                const todoId = event.detail;
                const todo = todos.find(t => t.id === todoId);
                if(!todo) {
                    toastMessage = `could not find todo with id ${todoId}`;
                    toastStatus = "daisy-alert-error";
                    return;
                }
                const newCompleted = !todo.completed;
                
                await fetchData<Todo>(`http://127.0.0.1:8090/api/collections/todos/records/${todoId}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        completed: newCompleted,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                todos = todos.map((t) => {
                    if(t.id === todoId) {
                        t.completed = newCompleted;
                    }
                    return t;
                });
                
                toastMessage = "Todo updated!";
                toastStatus = "daisy-alert-success";
            } catch (err) {
                console.error(err);
                toastMessage = "Something went wrong while updating the todo..";
                toastStatus = "daisy-alert-error";
            }
        }
    </script>
    
    <main class="flex flex-col justify-center items-center mx-auto mt-10">
        <div>
            <button class="daisy-btn daisy-btn-lg daisy-btn-success" on:click={openModal}>Add todo +</button>
        </div>
        
        
        <!-- Open the modal using ID.showModal() method -->
        <TodoList {todos} on:toggle-todo={toggleTodoComplete} on:delete-todo={deleteTodo}/>
        <CreateForm
            isOpen={isModalOpen}
            on:close-create-todo-modal={closeModal}
            on:add-todo={addTodo}
        />

        {#if toastMessage && toastStatus}
            <Toast bind:message={toastMessage} bind:status={toastStatus} />
        {/if}
    </main>
