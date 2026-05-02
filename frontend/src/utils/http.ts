import axios from "axios";
import { useUserStore } from "@/stores/user.store";
import { API_BASE } from "@/utils/constants";

export const httpClient = axios.create({
  baseURL: API_BASE,
});

httpClient.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const token = userStore.user?.accessToken;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});