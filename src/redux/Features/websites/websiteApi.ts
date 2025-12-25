/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectEndpoints } from "../../api/api";

export const {
  useGetWebsiteQuery,
  useCreateWebsiteMutation,

  useDeleteWebsiteMutation,
  useDeleteUserMutation,
  useUpdateWebsiteMutation,
  endpoints: websiteEndpoints,
} = injectEndpoints({
  // Define your endpoints here
  overrideExisting: true,
  endpoints: ({ mutation, query }) => ({
    getWebsite: query<object, any>({
      query: (params) => {
        // Build query string only if params exist
        const queryParams = new URLSearchParams();
        if (params?.type) {
          queryParams.append("type", params.type);
        }
        if (params?.category) {
          queryParams.append("category", params.category);
        }
        if (params?.searchTerm) {
          queryParams.append("searchTerm", params.searchTerm);
        }
        return {
          url: `/websites${queryParams.toString() ? `?${queryParams}` : ""}`,
          credentials: "include" as const,
        };
      },
      providesTags: ["website"],
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    createWebsite: mutation<object, any>({
      query: (data) => ({
        url: "/websites",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["website"],
      transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data, // adjust for data if error
    }),
    updateWebsite: mutation<object, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/websites/${id}`,
        method: "PATCH", // or "PUT" depending on your API
        body: data,
      }),
      invalidatesTags: ["website"],
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),
    deleteWebsite: mutation<object, any>({
      query: (id) => ({
        url: `/websites/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data, // adjust for data if error
    }),
    deleteUser: mutation<object, any>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data, // adjust for data if error
    }),
  }),
});
