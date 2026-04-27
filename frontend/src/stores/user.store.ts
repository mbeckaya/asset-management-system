import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@shared/types/user.type";

export const useUserStore = defineStore("users", () => {
    const user = ref<User | null>(null);

    return {
        user,
    }
});