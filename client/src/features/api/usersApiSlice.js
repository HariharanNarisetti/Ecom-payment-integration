import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            })
        }),
        getProfile: builder.query({
            query: () => '/users/profile',
            keepUnusedDataFor: 5
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/users/profile',
                method: 'PUT',
                body: data
            })
        }),
        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 5
        }),
        googleDemoLogin: builder.mutation({
            query: () => ({
                url: '/auth/google-demo',
                method: 'POST'
            })
        })
    })
});

export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation, 
    useGetProfileQuery, 
    useUpdateProfileMutation,
    useGetUsersQuery,
    useGoogleDemoLoginMutation
} = usersApiSlice;
