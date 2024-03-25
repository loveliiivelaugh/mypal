// Need to use the React-specific entry point to import createApi
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '../db';


// Define a service using a base URL and expected endpoints
const supabaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // Database Methods exposed to the UI
    // GET a single item by id
    get: builder.query({
      queryFn: async (params) => {
        console.log("inside queryFn(): ", params)
        const {table, id, columns, selector} = params;
        const {data, error} = await supabase
          .from(table)
          .select(columns.join(','))
          .eq(selector, id);

        return [data, error];
        // return params;
      },
      
    }),
    // GET all items/rows from a table
    getAll: builder.query({
      queryFn: async (table) => await supabase
        .from(table)
        .select(),
    }),
    // GET the current user session
    getSession: builder.query({
      queryFn: async () => await supabase
        .auth
        .getSession()
    }),
    // CREATE a new item/row in a table
    add: builder.mutation({
      queryFn: async (table, payload) => await supabase
        .from(table)
        .insert(payload)
        .select(),
    }),
    // UPDATE an item/row in a table
    update: builder.mutation({
      queryFn: async (table, id, payload) => await supabase
        .from(table)
        .update(payload)
        .eq('id', id),
    }),
    // DELETE an item/row in a table
    delete: builder.mutation({
      queryFn: async (table, id) => await supabase
        .from(table)
        .delete()
        .eq('id', id),
    }),

    // Auth Methods exposed to the UI
    signup: builder.mutation({
      queryFn: async (payload) => await supabase
        .auth
        .signUp(payload),
    }),

    // login: builder.mutation({
    //   queryFn: async (payload) => {
    //     console.log("inside login.payload: ", payload)
    //     const response = await supabase
    //       .auth
    //       .signInWithPassword(payload)

    //     console.log("inside login.response: ", response)
    //     return response;
    //   },
      
    // }),

    logout: builder.mutation({
      queryFn: async () => await supabase
        .auth
        .signOut(),
    }),

    resetPassword: builder.mutation({
      queryFn: async (payload) => await supabase
        .auth
        .api
        .resetPasswordForEmail(payload),
    }),
    // Phone number login
    loginWithOtp: builder.mutation({
      queryFn: async (payload) => await supabase
        .auth
        .api
        .signInWithOtp(payload),
    }),

  }),

})

export const { 
  useGetSessionQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useLoginWithOtpMutation,
  useGetQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
  useGetAllQuery,
} = supabaseApi
export { supabaseApi }


export const dbApi = {
  
  add: async (table, payload) => await supabase
    .from(table)
    .insert(payload)
    .select(),

  get: async (table, id) => await supabase
    .from(table)
    .select()
    .eq('id', id),

  getAll: async (table) => await supabase
    .from(table)
    .select(),

  update: async (table, id, payload) => await supabase
    .from(table)
    .update(payload)
    .eq('id', id),

  delete: async (table, id) => await supabase
    .from(table)
    .delete()
    .eq('id', id),

}