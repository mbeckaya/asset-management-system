<script setup lang="ts">
    import { computed } from "vue";

    const props = defineProps<{
        type: 'error' | 'success'
    }>()

    const alertStyle = computed(() => {
        switch (props.type) {
            case 'error':
                return 'alert-error'
            case 'success':
                return 'alert-success'
        }
    })
</script>

<template>
    <p role="alert" :class="['alert p-4', alertStyle]">
        <slot />
    </p>
</template>