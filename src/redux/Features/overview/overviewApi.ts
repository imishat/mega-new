/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectEndpoints } from "../../api/api";

export const {
    useGetOverviewQuery,
    endpoints: overviewEndpoints,
} = injectEndpoints({
  overrideExisting: true,
  endpoints: ({ query }) => ({
    getOverview: query<object, any>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.type) {
          queryParams.append("type", params.type);
        }

        return {
          url: `/overview`,
          credentials: "include" as const,
        };
      },
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
      providesTags: ['overview'],
    }),
  }),
});
