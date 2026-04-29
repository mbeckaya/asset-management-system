export const getAuthHeaders = (token?: string | null) => {
  return token
    ? {
        Authorization: `Bearer ${token}`
      }
    : {}
}