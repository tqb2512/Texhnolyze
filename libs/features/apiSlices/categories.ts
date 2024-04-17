import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { category, product } from "@prisma/client";

export const categoriesAPI = createApi({
    reducerPath: "categories",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCategories: builder.query<category[], void>({
            query: () => "categories",
        }),
        getCategory: builder.query<category, string>({
            query: (id) => `categories/${id}`,
        }),
        getProducts: builder.query<product[], string>({
            query: (id) => `products/?category_id=${id}`,
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery, useGetProductsQuery} = categoriesAPI;