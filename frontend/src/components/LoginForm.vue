<script setup lang="ts">
    import { useRouter } from "vue-router";
    import { Field, Form, ErrorMessage, defineRule } from "vee-validate";
    import { required, email, min } from "@vee-validate/rules";
    import { storeToRefs } from "pinia";

    import { useUserStore } from "@/stores/user.store";
    import { useApi } from "@/composables/useApi.composable";
    import { httpClient } from "@/utils/http"; 
    import { UI_MESSAGE_DURATION_MS } from "@/utils/constants";
    import type { UserLogin } from "@shared/types/user-login.type";
    import type { User } from "@shared/types/user.type";
        
    import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
    import AlertBox from "@/components/ui/AlertBox.vue";
    import FormFieldset from "@/components/forms/FormFieldset.vue";
    import FormLegend from "@/components/forms/FormLegend.vue";
    import FormLabel from "@/components/forms/FormLabel.vue";

    const router = useRouter();

    defineRule('required', required);
    defineRule('email', email);
    defineRule('min', min);

    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const { isLoading, errorMsg, request } = useApi();

    const handleSubmit = async (formData: UserLogin) => {
        const result = await request(() => 
            httpClient.post<{ user: User }>(
                `/login`, formData
            )
        );

        if (!result) return;

        user.value = result.data.user;
        
        setTimeout(() => {
            router.push({ name: "device.list" });
        }, UI_MESSAGE_DURATION_MS);
    };
</script>

<template>
    <h1 class="text-xl">Login Form</h1>

    <Form @submit="handleSubmit as any">
        <FormFieldset class="p-4">
            <FormLegend>Login Form</FormLegend>

            <LoadingSpinner v-if="isLoading" />

            <AlertBox v-else-if="errorMsg" type="error">
                {{ errorMsg }}
            </AlertBox>
          
            <div class="py-2">
                <FormLabel html-for="email" :is-required="true">
                    E-Mail
                </FormLabel>
                <Field
                    id="email"
                    name="email"
                    type="email"
                    rules="required|email"
                    class="input"
                />
                <ErrorMessage
                    name="email"
                    as="span"
                    class="text-error px-4"
                />
            </div>

            <div class="py-2">
                <FormLabel html-for="password" :is-required="true">
                    Password
                </FormLabel>
                <Field
                    id="password"
                    name="password"
                    type="password"
                    rules="required|min:8"
                    class="input"
                />
                <ErrorMessage
                    name="password"
                    as="span"
                    class="text-error px-4"
                />
            </div>

            <button type="submit" class="btn btn-primary mt-4">
                Login
            </button>
        </FormFieldset>
    </Form>
</template>