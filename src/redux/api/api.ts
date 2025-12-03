/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setAuthData, setLoading } from "../Features/auth/authSlice";
import { apiUrl } from "../../config/constants";
// import { RootState } from "../store";
// import { setCookie } from "../../utils/setCookies";

// Define the base API
const baseQuery = fetchBaseQuery({
  baseUrl: "https://megatools-8920.onrender.com/api/v1",
  credentials: "include" as const,
  prepareHeaders: (headers) => {
    // const accessToken = (getState() as RootState).auth.token;
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn = async (args, api, options) => {
  let result: any = await baseQuery(args, api, options);

  if (result.error) {
    if (result.error.status === 401 || result.error.status === 500) {
      try {
        const response = await fetch(`${apiUrl}/auth/refresh`, {
          method: "GET",
          credentials: "include" as const,
        });

        const data = await response.json();

        if (data?.token) {
          //   setCookie("accessToken", data.token);

          // Retry the original query with the new token
          result = await baseQuery(args, api, options);
        } else {
          console.error("No token found in response data");
        }
      } catch (err) {
        console.error("Error during token refresh:", err);
      }
    }
  }

  return result;
};

export const {
  reducerPath,
  reducer,
  injectEndpoints,
  middleware: authMiddleware,
  endpoints,
  useRefreshQuery,
  useGetUserQuery,
  util,
} = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["info", "overview", "information", "website", "tools"],
  endpoints: ({ query }) => ({
    getUser: query<object, void>({
      query: () => ({
        url: "/user/me",
        credentials: "include" as const,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        dispatch(setLoading(true));

        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthData({ data }));
        } catch (error: any) {
          dispatch(setLoading(false));
          console.error(error);
        } finally {
          dispatch(setLoading(false));
        }
      },
      transformResponse: (response: any) => response?.data,
      transformErrorResponse: (response: any) => response?.data,
    }),

    refresh: query<object, void>({
      query: () => ({
        url: "/auth/refresh",
        credentials: "include" as const,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setAuthData(data));
      },
      transformResponse: (response: any) => {
        return response.data;
      },
      transformErrorResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});
