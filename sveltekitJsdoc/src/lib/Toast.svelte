<script>
    import { onMount } from "svelte";


    /** @type {import("$lib/types").ToastStatus} */
    export let status = "daisy-alert-success";
    /**@type {string}*/
    export let message;
    /**@type {number}*/
    export let autoHide = 2500;


    onMount(() => {
        setTimeout(() => {
            status = "daisy-alert-success";
            message = "";
        }, autoHide);
    });
</script>


{#if status && message}
    <div class="daisy-toast daisy-toast-right daisy-toast-bottom">
        <div class={`daisy-alert daisy-alert-info ${status}`}>
            <span>{message}</span>
        </div>
    </div>
{/if}
