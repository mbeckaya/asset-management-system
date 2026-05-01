<script setup lang="ts">
    import { useRoute } from "vue-router";
    import DeviceItem from "@/components/DeviceItem.vue";

    const route = useRoute();
    const id = Number(route.params.id);
</script>

<template>
    <DeviceItem :id="id" />
</template>