<script setup lang="ts">
  import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <header class="navbar bg-base-100 shadow-sm">
    <RouterLink :to="{ name: 'user.login' }" class="btn btn-ghost text-xl">
      Asset Management System
    </RouterLink>
  </header>

  <main class="p-4">
    <RouterView />
  </main>
</template>
