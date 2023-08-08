<script>
    import { CreateForm } from "$lib/CreateTodo";
    import { TodoList } from "$lib/Todo";
    import Toast from "$lib/Toast.svelte";

    export let data;
    
    let isModalOpen = false;
    let toastMessage = "";
    /**@type {import("$lib/types.js").ToastStatus}*/
    let toastStatus;
    
    $: ({todos} = data);
        
    function openModal() {
        isModalOpen = true;
    }
    
    function closeModal() {
        isModalOpen = false;
    }

    /**@param {CustomEvent<import("$lib/types.js").TodoDeleteDispatchParams>} event*/
    function dispatchToast(event) {
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
