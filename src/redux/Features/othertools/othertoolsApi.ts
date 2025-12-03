/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectEndpoints } from "../../api/api";

export const {
  useGetToolsQuery,
  useCreateToolMutation,
  useUpdateToolMutation,
  useDeleteToolMutation,
  endpoints: toolsEndpoints,
} = injectEndpoints({
  overrideExisting: true,
  endpoints: ({ query, mutation }) => ({
    // GET /api/v1/othertools
    getTools: query<object, any>({
      query: () => ({
        url: "/othertools",
        credentials: "include" as const,
      }),
      providesTags: ["tools"],
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // POST /api/v1/othertools
    createTool: mutation<object, any>({
      query: (data) => ({
        url: "/othertools",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tools"],
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // PATCH /api/v1/othertools/:id
    updateTool: mutation<object, { id: any; data: any }>({
      query: ({ id, data }) => ({
        url: `/othertools/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["tools"],
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    // DELETE /api/v1/othertools/:id
    deleteTool: mutation<object, string>({
      query: (id) => ({
        url: `/othertools/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tools"],
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),
  }),
});
