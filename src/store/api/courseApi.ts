// RTK Query API slice for courses
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Course } from "@/types/course";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const API_VERSION = "v1";

export const API_URL = `${API_BASE_URL}/api/${API_VERSION}`;

// Define a service using a base URL and expected endpoints
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Course", "Courses"],
  endpoints: (builder) => ({
    // Get course by slug
    getCourseBySlug: builder.query<Course, string>({
      query: (slug) => `/courses/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Course", id: slug }],
    }),

    // Get course by ID
    getCourseById: builder.query<Course, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    // Get all courses with filters
    getAllCourses: builder.query<
      {
        data: Course[];
        hasNextPage: boolean;
        page: number;
        limit: number;
        total: number;
      },
      {
        page?: number;
        limit?: number;
        category?: string;
        search?: string;
      } | void
    >({
      query: (params) => {
        if (!params) return "/courses";
        const queryString = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return `/courses${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Course" as const,
                id: _id,
              })),
              { type: "Courses" as const, id: "LIST" },
            ]
          : [{ type: "Courses" as const, id: "LIST" }],
    }),

    // Create a new course (if needed)
    createCourse: builder.mutation<Course, Partial<Course>>({
      query: (courseData) => ({
        url: "/courses",
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),

    // Update a course (if needed)
    updateCourse: builder.mutation<
      Course,
      { id: string; data: Partial<Course> }
    >({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Course", id },
        { type: "Courses", id: "LIST" },
      ],
    }),

    // Delete a course (if needed)
    deleteCourse: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Course", id },
        { type: "Courses", id: "LIST" },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCourseBySlugQuery,
  useGetCourseByIdQuery,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
