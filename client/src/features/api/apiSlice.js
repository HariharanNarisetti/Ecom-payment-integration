import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL || '/api';
const baseQuery = fetchBaseQuery({ baseUrl });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Cart', 'Category'],
    endpoints: (builder) => ({})
});
