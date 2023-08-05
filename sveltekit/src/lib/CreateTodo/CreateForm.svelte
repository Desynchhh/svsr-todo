<script lang="ts">
    import { enhance } from "$app/forms";
    import type { DispatchParams, PostTodo } from "$lib/types";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { createEventDispatcher } from "svelte";

    
    const dispatch = createEventDispatcher();
    export let isOpen = false;

    let formErrors: { title?: string; } = {};

    function onClose() {
        dispatch("close-create-todo-modal");
    }

    const submitCreateTodo: SubmitFunction = ({ formElement, formData, action, cancel}) => {
        formErrors.title = "";
        const { title, body, completed }: PostTodo = Object.fromEntries(formData) as {
            title: string;
            body?: string;
            completed?: any;
        };

        if(title.length < 1) {
            formErrors.title = "Title is required!";
            cancel();
        }
        
        // OPTIONAL
        return async({ result, update }) => {
            let dispatchParams: DispatchParams;
            switch(result.type) {
                case "success":
                    dispatchParams = {
                        toastStatus: "daisy-alert-success",
                        toastMessage: "Todo added",
                    };
                    dispatch("add-todo", dispatchParams);
                    onClose();
                    break;
                case "failure": 
                case "error":
                    dispatchParams = {
                        toastStatus: "daisy-alert-error",
                        toastMessage: "Could not add Todo",
                    };
                    dispatch("add-todo", dispatchParams);
                    console.log("todo not created");
                    break;
                default:
                    break;
            }
            await update();
        }
    }
</script>


<!-- The button to open modal -->

<!-- Put this part before </body> tag -->
<input type="checkbox" id="createTodoFormModal" class="daisy-modal-toggle" checked={isOpen} />
<div class="daisy-modal">
    <div class="daisy-modal-box">
        <h3 class="font-bold text-lg">Create Todo</h3>
        <div>
            <form class="flex flex-col" method="post" action="?/addTodo" use:enhance={submitCreateTodo}>
                <legend>Create Todo</legend>
                <div class="daisy-form-control">
                    <label for="title" class="daisy-label">
                        <span class="daisy-label-text">Title *</span>
                    </label>
                    <input id="title" name="title" class={`daisy-input daisy-input-bordered ${formErrors.title ? "daisy-input-error" : "daisy-input-primary"}`} type="text" placeholder="Title..." />
                    {#if formErrors.title}
                        <label for="title" class="daisy-label">
                            <span class="daisy-label-text-alt text-red-400">{formErrors.title}</span>
                        </label>
                        
                    {/if}
                </div>
                <div class="daisy-form-control">
                    <label for="body" class="daisy-label">Details</label>
                    <input id="body" name="body" class="daisy-input daisy-input-bordered daisy-input-primary" type="text" placeholder="Details..." />
                </div>
                <div class="daisy-form-control flex-row items-center gap-2">
                    <label for="completed" class="daisy-label">Completed?</label>
                    <input id="completed" name="completed" class="daisy-checkbox daisy-checkbox-primary" type="checkbox"/>
                </div>
                <button type="submit" class="daisy-btn daisy-btn-block daisy-btn-primary">Create</button>
            </form>
        </div>
        <div class="daisy-modal-action">
            <button on:click={onClose} class="daisy-btn daisy-btn-secondary">Close</button>
        </div>
    </div>
</div>
