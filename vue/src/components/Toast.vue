<script setup>
const props = defineProps({
    status: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="daisy-toast daisy-toast-right daisy-toast-bottom">
        <div class="daisy-alert" :class="[status]">
            <span>{{ message }}</span>
        </div>
    </div>
</template>

