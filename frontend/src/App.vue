<script setup lang="ts">
  import { RouterView, RouterLink } from "vue-router";

  const year = new Date().getFullYear();
</script>

<template>
  <header class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <RouterLink :to="{ name: 'device.list' }" class="btn btn-ghost text-xl">
        Asset Management System
      </RouterLink>
    </div>
    
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <RouterLink :to="{ name: 'device.list' }">
            Device List
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>

  <main class="p-4">
    <RouterView />
  </main>

   <footer class="footer footer-center p-4 bg-base-200 text-base-content border-t">
    <aside>
      <p>
        © {{ year }} Asset Management System — All rights reserved
      </p>
       <p class="text-sm opacity-70">
        Built with
        Express.js · TypeScript · MariaDB · JWT · Docker · Vue · Tailwind (DaisyUI)
      </p>
    </aside>
  </footer>
</template>
