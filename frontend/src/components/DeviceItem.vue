<script setup lang="ts">
    import { ref, computed } from "vue";
    import { storeToRefs } from "pinia";
    import axios from "axios";
    import dayjs from "dayjs";

    import { useUserStore } from "@/stores/user.store";
    import { useApi } from "@/composables/useApi.composable";
    import { getAuthHeaders } from "@/utils/helper";
    import { API_BASE } from "@/utils/constants";
    import type { Device } from '@shared/types/device.type';

    import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
    import AlertBox from "@/components/ui/AlertBox.vue";

    const { id } = defineProps<{ id: number }>();

    const { user } = storeToRefs(useUserStore());

    const { isLoading, errorMsg, request } = useApi();
    const device = ref<Device | null>(null);

    const fetchDevice = async () => {
        const result = await request(() =>
            axios.get<Device>(
                `${API_BASE}/devices/${id}`,
                { headers: getAuthHeaders(user.value?.accessToken) }
            )
        );

        if (!result) return;

        device.value = result.data;
    };

    fetchDevice();

    const rows = computed(() => {
        if (!device.value) return [];

        return [
            { label: "ID", value: device.value.id },
            { label: "Brand ID", value: device.value.brandId },
            { label: "Device Type ID", value: device.value.deviceTypeId },
            { label: "Reseller ID", value: device.value.resellerId },
            { label: "Device Status ID", value: device.value.deviceStatusId },
            { label: "Model Name", value: device.value.modelName },
            { label: "Serial Number", value: device.value.serialNumber },
            { label: "Price", value: device.value.price },
            {
                label: "Purchased At",
                value: dayjs(device.value.purchasedAt).format("DD.MM.YYYY"),
            },
            { label: "Warranty (Months)", value: device.value.warrantyMonths },
            { label: "Lifespan (Months)", value: device.value.lifespanMonths },
        ];
    });
</script>

<template>
    <h1 class="text-xl mb-4">Device Details</h1>

     <LoadingSpinner v-if="isLoading" />

    <AlertBox v-else-if="errorMsg" type="error">
        {{ errorMsg }}
    </AlertBox>

    <div v-else-if="device" class="space-y-1">
        <div
            v-for="row in rows"
            :key="row.label"
            class="flex items-center gap-2 py-0"
        >
            <span class="font-medium">
                {{ row.label }}:
            </span>
            <span>
                {{ row.value }}
            </span>
        </div>
  </div>
</template>
