import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { product } from "@prisma/client";

export const productsAPI = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getProduct: builder.query<product, string>({
            query: (id) => `products/?product_id=${id}`,
            transformResponse: (response: product[]) => response[0],
        }),
        getProducts: builder.query<product[], void>({
            query: () => "products",
        }),
    }),
});

export const { useGetProductQuery, useGetProductsQuery } = productsAPI;