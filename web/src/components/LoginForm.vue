<script setup lang="ts">
    import { Field, Form, ErrorMessage, defineRule } from "vee-validate";
    import { required, email, min } from "@vee-validate/rules";
    import type { UserLogin } from "@/types/user-login.type";
    import FormLabel from "@/components/FormLabel.vue";

    defineRule('required', required);
    defineRule('email', email);
    defineRule('min', min);

    const handleSubmit = async (data: UserLogin) => {
        console.log(data);
    }
</script>

<template>
    <Form @submit="handleSubmit as any" class="p-4">
        <fieldset>
            <legend class="sr-only">Login Form</legend>

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
        </fieldset>
    </Form>
</template>