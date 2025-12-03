/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { injectEndpoints } from "../../api/api";

export const {
   useCreateTransectionMutation,
   useGetTransectionQuery   // Query for GET request
} = injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createTransection: mutation<Object, any>({
      // Change this to a POST request
      query: (trxData) => ({
        url: "/transection/create", 
        method: "POST",
        body: trxData,   
        credentials: "include" as const,  
      }),
      transformResponse: (response: any) => response.data,  
      transformErrorResponse: (response: any) => response.data, 
    }),

    getTransection: query<object, void>({
      
      query: () => ({
        url: "/transection",  
        credentials: "include" as const,  
      }),
      transformResponse: (response: any) => response.data,  
      transformErrorResponse: (response: any) => response.data,  
    }),
  }),
});