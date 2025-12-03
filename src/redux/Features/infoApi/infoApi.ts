/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectEndpoints } from "../../api/api";

export const {
  useGetInformationQuery,
  useGetInformationByIdQuery,
  endpoints: informationEndpoints,
} = injectEndpoints({
  // Define your endpoints here
  overrideExisting: true,
  endpoints: ({ query }) => ({
    getInformation: query<object, any>({
      query: ({ page, searchTerm }) => {
        const queryParams = new URLSearchParams();

        if (page) {
          queryParams.append("page", page.toString());
        }
        if (searchTerm) {
          queryParams.append("searchTerm", searchTerm);
        }

        return {
          url: `/information?${queryParams.toString()}`,
          credentials: "include" as const,
        };
      },
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
      providesTags: ["information"],
    }),
    getInformationById: query<any, string | unknown>({
      query: (id) => {
        return {
          url: `/information/${id}`,
          credentials: "include" as const,
        };
      },
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
      providesTags: (_result, _error, id: any) => [{ type: "information", id }],
    }),
  }),
});
