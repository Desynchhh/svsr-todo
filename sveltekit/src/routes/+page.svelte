<script lang="ts">
    import { CreateForm } from "$lib/CreateTodo";
    import { TodoList } from "$lib/Todo";
    import Toast from "$lib/Toast.svelte";
    import type { ToastStatus, TodoDeleteDispatchParams } from "$lib/types";
    import type { PageData } from "./$types";

    export let data: PageData;
    
    let isModalOpen = false;
    let toastMessage = "";
    let toastStatus: ToastStatus;
    
    $: ({todos} = data);
        
    function openModal() {
        isModalOpen = true;
    }
    
    function closeModal() {
        isModalOpen = false;
    }

    function dispatchToast(event: CustomEvent<TodoDeleteDispatchParams>) {
        const eventParams = event.detail;
        toastMessage = eventParams.toastMessage;
        toastStatus = eventParams.toastStatus;
    }

</script>

<main class="flex flex-col justify-center items-center mx-auto mt-10">
    <div>
        <button class="daisy-btn daisy-btn-lg daisy-btn-success" on:click={openModal}>Add todo +</button>
    </div>
    
    <TodoList {todos} on:delete-todo={dispatchToast} on:toggle-todo={dispatchToast}/>
    <CreateForm
        isOpen={isModalOpen}
        on:add-todo={dispatchToast}
        on:close-create-todo-modal={closeModal}
    />

    {#if toastMessage && toastStatus}
        <Toast bind:message={toastMessage} bind:status={toastStatus} />
    {/if}
</main>
