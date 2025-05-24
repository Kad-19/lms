import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HomeLayout from '../../layouts/HomeLayout'
import { getCoursesForChild } from '../../redux/slices/CourseSlice'
import CourseCard from './CourseCard';

function CourseList() {
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth?.data);
    const [availableCourses, setAvailableCourses] = useState([]);
    const child_email = userData?.email;

    async function loadCourses() {
        // await dispatch(getAllCourse())
        const response = await dispatch(getCoursesForChild({ child_email }));
            if (response?.payload) {
              setAvailableCourses(response.payload);
              console.log("Available courses:", response.payload);
            }
    }
    useEffect(() => {
        loadCourses()
    }, [])

    return (
        <HomeLayout>
            <div className='flex flex-col lg:h-screen lg:pt-10 md:pt-10 pt-20 lg:px-20 px-4 gap-14'>
                <h1 className='font-bold lg:text-4xl md:text-4xl text-2xl font-serif text-white text-center'>Explore all courses made by <span className='text-yellow-400'>Industry Experts</span></h1>
                <div className='flex flex-wrap mb-10 gap-14 w-full px-8 justify-center'>
                    {
                        availableCourses?.map((course) => (
                            <CourseCard key={course._id} data={course} />
                        ))
                    }
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseList
