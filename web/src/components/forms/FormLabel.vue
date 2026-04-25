<script setup lang="ts">
    const { htmlFor, isRequired } = defineProps<{
        htmlFor: string,
        isRequired?: boolean,
    }>()
</script>

<template>
    <label :for="htmlFor">
        <slot />

        <span v-if="isRequired" class="sr-only">required</span>
        <span v-if="isRequired" aria-hidden="true">*</span>:
    </label>
</template>