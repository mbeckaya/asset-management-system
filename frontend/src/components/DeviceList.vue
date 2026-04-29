<script setup lang="ts">
    import { ref } from "vue";
    import { storeToRefs } from "pinia";
    import axios from "axios";
    import dayjs from "dayjs";

    import { useUserStore } from "@/stores/user.store";
    import { useApi } from "@/composables/useApi";
    import { API_BASE } from "@/utils/constants";
    import { getAuthHeaders } from "@/utils/helper";
    import type { Device } from '@shared/types/device.type';
    import type { Pagination } from "@shared/types/pagination.type";

    import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
    import AlertBox from "@/components/ui/AlertBox.vue";
    
    const { user } = storeToRefs(useUserStore());
    const { isLoading, errorMsg, request } = useApi();
    const deviceList = ref<Device[]>([]);
    const currentPage = ref(1);
    const numberOfPages = ref(0);

    const fetchDevices = async (pageNumber: number) => {
        const result = await request(() =>
            axios.get<Pagination<Device>>(
                `${API_BASE}/devices?page=${pageNumber}&limit=5`,
                { headers: getAuthHeaders(user.value?.accessToken) }
            )
        );

        if (!result) return;

        const { page, totalPages, data  } = result.data;
        currentPage.value = page;
        deviceList.value = data;
        numberOfPages.value = totalPages;
    };

    fetchDevices(currentPage.value);

    const handlePaginationClick = (pageNumber: number) => {
        fetchDevices(pageNumber);
    };

</script>

<template>
    <h1 class="text-xl">Device List</h1>

    <LoadingSpinner v-if="isLoading" />

    <AlertBox v-else-if="errorMsg" type="error">
        {{ errorMsg }}
    </AlertBox>

    <div v-else-if="deviceList.length > 0" class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Brand</th>
                    <th>Type</th>
                    <th>Reseller</th>
                    <th>Status</th>
                    <th>Purchased</th>
                    <th>Model</th>
                </tr>
            </thead>

            <tbody>
                <tr 
                    v-for="device in deviceList" 
                    :key="device.id"
                >
                    <td>{{ device.id }}</td>
                    <td>{{ device.brandId }}</td>
                    <td>{{ device.deviceTypeId }}</td>
                    <td>{{ device.resellerId }}</td>
                    <td>{{ device.deviceStatusId }}</td>
                    <td>{{ dayjs(device.purchasedAt).format("DD.MM.YYYY") }}</td>
                    <td>{{ device.modelName }}</td>
                </tr>
            </tbody>
        </table>

        <div class="join">
            <button 
                v-for="(page) in numberOfPages" 
                :key="page"
                @click="handlePaginationClick(page)"
                class="join-item btn"
                :class="{ 'btn-active': page === currentPage }"
            >
                {{ page }}
            </button>
        </div>
    </div>
</template>