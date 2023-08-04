<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { PostTodo } from "../../types";
    
    const dispatch = createEventDispatcher();
    export let isOpen = false;

    function onClose() {
        dispatch("close-create-todo-modal");
    }

    async function onSubmit(e:Event & {
        readonly submitter: HTMLElement;
    } & {
    currentTarget: EventTarget & HTMLFormElement;
    }) {
        const formData = new FormData(e.currentTarget);
        
        const title = formData.get("title_input").toString();
        const body = formData.get("body_input").toString();
        const completed = formData.has("completed_input");

        const newTodo: PostTodo = {
            title,
            body,
            completed,
        }
        dispatch("add-todo", newTodo);
    }
</script>


<!-- The button to open modal -->

<!-- Put this part before </body> tag -->
<input type="checkbox" id="createTodoFormModal" class="daisy-modal-toggle" checked={isOpen} />
<div class="daisy-modal">
    <div class="daisy-modal-box">
        <h3 class="font-bold text-lg">Create Todo</h3>
        <div>
            <form class="flex flex-col" on:submit|preventDefault={onSubmit}>
                <legend>Create Todo</legend>
                <div class="daisy-form-control">
                    <label for="title_input" class="daisy-label">Title *</label>
                    <input id="title_input" name="title_input" class="daisy-input daisy-input-bordered daisy-input-primary" type="text" placeholder="Title..." required />
                </div>
                <div class="daisy-form-control">
                    <label for="body_input" class="daisy-label">Details</label>
                    <input id="body_input" name="body_input" class="daisy-input daisy-input-bordered daisy-input-primary" type="text" placeholder="Details..." />
                </div>
                <div class="daisy-form-control flex-row items-center gap-2">
                    <label for="completed_input" class="daisy-label">Completed?</label>
                    <input id="completed_input" name="completed_input" class="daisy-checkbox daisy-checkbox-primary" type="checkbox"/>
                </div>
                <button type="submit" class="daisy-btn daisy-btn-block daisy-btn-primary">Create</button>
            </form>
        </div>
        <div class="daisy-modal-action">
            <button on:click={onClose} class="daisy-btn daisy-btn-secondary">Close</button>
        </div>
    </div>
</div>
