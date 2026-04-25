<script setup lang="ts">
    import { ref } from "vue";
    import axios from "axios";
    import { Field, Form, ErrorMessage, defineRule } from "vee-validate";
    import { required, email, min } from "@vee-validate/rules";
    import { storeToRefs } from "pinia";

    import { useUserStore } from "@/stores/user.store";
    import { API_BASE } from "@/utils/constants";
    import type { UserLogin } from "@/types/user-login.type";
    import type { User } from "@/types/user.type";
        
    import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
    import AlertBox from "@/components/ui/AlertBox.vue";
    import FormFieldset from "@/components/forms/FormFieldset.vue";
    import FormLegend from "@/components/forms/FormLegend.vue";
    import FormLabel from "@/components/forms/FormLabel.vue";

    defineRule('required', required);
    defineRule('email', email);
    defineRule('min', min);

    const errorMsg = ref("");
    const isLoading = ref(false);
    const isSuccess = ref(false);
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const handleSubmit = async (formData: UserLogin) => {
        try {
            errorMsg.value = "";
            isLoading.value = true;

            const { data } = await axios.post<{ user: User }>(`${API_BASE}/login`, formData);
            user.value = data.user;

            isSuccess.value = true;
        } catch (error) {
            if (!axios.isAxiosError(error)) {
                errorMsg.value = "Something went wrong. Please try again later.";
                return;
            }

            const apiError = error.response?.data?.error;

            if (error.response?.status) {
                const messages = Array.isArray(apiError)
                    ? apiError.map((e) => e?.message).filter(Boolean)
                    : [apiError];

                errorMsg.value = messages.join("\n");
            } else {
                errorMsg.value = "No connection. Please check your internet and try again.";
            }
        } finally {
            isLoading.value = false;
        }
    }
</script>

<template>
    <Form @submit="handleSubmit as any">
        <FormFieldset class="p-4">
            <FormLegend>Login Form</FormLegend>

            <LoadingSpinner v-if="isLoading" />

            <AlertBox v-else-if="errorMsg" type="error">
                {{ errorMsg }}
            </AlertBox>

            <AlertBox v-else-if="isSuccess" type="success">
                Login was successful!
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