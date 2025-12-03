/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectEndpoints } from "../../api/api";
import { setAuthData, setLoading } from "./authSlice";

export const {
  useLoginUserMutation,
  useRefreshQuery,
  useGetUserQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useVerifyOtpMutation,
  useGetAllUserQuery,
  useCreateAdminUserMutation,
  endpoints: authEndpoints,
} = injectEndpoints({
  // Define your endpoints here
  overrideExisting: true,
  endpoints: ({ mutation, query }) => ({
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

    loginUser: mutation<object, any>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data, // adjust for data if error
    }),

    forgetPassword: mutation<object, any>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data, // adjust for data if error
    }),

    createUser: mutation<object, any>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
     transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data,   
    }
    ),
        createAdminUser: mutation<object, any>({
      query: (data) => ({
        url: "/auth/create",
        method: "POST",
        body: data,
      }),
     transformResponse: (response: any) => response, // directly return response
      transformErrorResponse: (response: any) => response?.data,   
    }
    ),
   getAllUser: query<{
      result: any[],
      meta: {
        page: number,
        limit: number,
        total: number,
        totalPage: number,
      }
    }, { page?: number, limit?: number, [key: string]: any }>({
      query: (params:any) => {
        const queryParams = new URLSearchParams();
        
        // Add pagination params
        if (params.page) {
          queryParams.append('page', params.page.toString());
        }
        if (params.limit) {
          queryParams.append('limit', params.limit.toString());
        }
        
        // Add other query params if needed
        Object.keys(params).forEach(key => {
          if (key !== 'page' && key !== 'limit' && params[key] !== undefined) {
            queryParams.append(key, params[key].toString());
          }
        });
        
        return {
          url: `/user?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      // Optional: transform the response if needed
      transformResponse: (response: {
        result: any[],
        meta: {
          page: number,
          limit: number,
          total: number,
          totalPage: number,
        }
      }) => response,
      // Optional: transform error response
      transformErrorResponse: (response: { status: string | number, data?: any }) => {
        return response.data || { message: 'An error occurred' };
      },
    }),

    resetPassword: mutation<object, { token: string; data: object }>({
      query: ({ token, data }) => ({
        url: `/auth/reset-password?token=${token}`,
        method: "PATCH",
        body: data, // The updated transaction data
      }),
      transformResponse: (response: any) => {
        return response;
      },
      transformErrorResponse: (response: any) => {
        return response?.data;
      },
    }),

    changePassword: mutation<object, { data: object }>({
      query: ({ data }) => ({
        url: `/auth/change-password`,
        method: "PATCH",
        body: data, // The updated transaction data
      }),
      transformResponse: (response: any) => {
        return response;
      },
      transformErrorResponse: (response: any) => {
        return response?.data;
      },
    }),

    verifyOtp: mutation<object, any>({
      query: (data) => {
        console.log("Sending Data:", data); // Log data before returning

        return {
          url: `/auth/activate`,
          method: "POST",
          body: data, // Ensure correct payload
        };
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response?.data,
    }),

    logout: mutation<object, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "GET",
        credentials: "include" as const,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data = {} } = await queryFulfilled;
        localStorage.removeItem("access_token");
        dispatch(
          setAuthData({
            token: "",
            data: data,
          })
        );
      },
      transformResponse: (response: any) => {
        return response;
      },
      transformErrorResponse: (response: any) => {
        return response;
      },
    }),
  }),
});
