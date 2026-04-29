import { ref } from "vue";
import axios from "axios";

export const useApi = () => {
  const isLoading = ref(false);
  const errorMsg = ref("");

  async function request<T>(apiCall: () => Promise<T>): Promise<T | null> {
      try {
        errorMsg.value = "";
        isLoading.value = true;

        const result = await apiCall();
        return result;

      } catch (error) {
        if (!axios.isAxiosError(error)) {
          errorMsg.value = "Something went wrong. Please try again later.";
          return null;
        }

        const apiError = error.response?.data?.error;

        if (error.response?.status) {
          const messages = Array.isArray(apiError)
            ? apiError.map((e: any) => e?.message).filter(Boolean)
            : [apiError];

          errorMsg.value = messages.join("\n");
        } else {
          errorMsg.value = "No connection. Please check your internet and try again.";
        }

        return null;

      } finally {
          isLoading.value = false;
      }
  }

  return {
    isLoading,
    errorMsg,
    request,
  };
}