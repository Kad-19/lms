import { configureStore } from '@reduxjs/toolkit'

import AuthSlice from '../redux/slices/AuthSlice'
import CourseSlice from '../redux/slices/CourseSlice'
import LectureSlice from '../redux/slices/LectureSlice'
import RazorpaySlice from '../redux/slices/RazorpaySlice'
import StatSlice from '../redux/slices/StatSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        course: CourseSlice,
        razorpay: RazorpaySlice,
        lecture: LectureSlice,
        stat: StatSlice
    },
    devTools: true
})


export default store