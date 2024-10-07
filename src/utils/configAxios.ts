import axios from "axios";

// Axios api
const api = axios.create();

// Api interceptor
api.interceptors.request.use((config) => {
  config.headers["Authorization"] = localStorage.getItem("token") || "";
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and the request has not been retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Set retry to 'true' to void infinite loops

      try {
        console.log("Refreshing token...");
        // Try to get a new access token using the refresh token stored in the cookie
        const tokenResponse = await axios.get("/api/login");

        console.log(tokenResponse);

        localStorage.setItem("token", tokenResponse.data.token);

        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`;

        // Retry the original request
        return api(originalRequest);
      } catch (err) {
        console.error("Fail to refresh token:", err);

        // Redirect to the login page
        window.location.href = "/login";
      }
    }

    // Return the error if it's not possible to renew the token
    return Promise.reject(error);
  }
);

export default api;
