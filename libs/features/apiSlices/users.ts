import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { user } from "@prisma/client";

export const usersApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getUser: builder.query<user, string>({
            query: (id) => `users?user_id=${id}`,
        }),
    }),
});

export const { useGetUserQuery } = usersApi;