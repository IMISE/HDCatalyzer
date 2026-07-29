<script setup lang="ts">
const props = defineProps(['id', 'type', 'message'])
</script>

<template>
    <div :id="props.id" :class="'toast text-white bg-' + props.type" role="alert" aria-live="assertive"
        aria-atomic="true">
        <div class="d-flex align-items-center">
            <div class="toast-body">
                {{ props.message }}
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
</template>