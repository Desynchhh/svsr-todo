<script lang="ts">
    import { onMount } from "svelte";
    import type { ToastStatus } from "../types";

    export let status: ToastStatus | undefined = "daisy-alert-success";
    export let message: string;
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
