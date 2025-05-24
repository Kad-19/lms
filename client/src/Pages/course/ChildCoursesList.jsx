import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";
import {
  blockCourse,
  getBlockedCoursesForChild,
  getCoursesForChild,
  unblockCourse,
} from "../../redux/slices/CourseSlice";
import CourseCard from "./CourseCard";

function ChildCoursesList() {
  const dispatch = useDispatch();
  const { child_email } = useParams();
  const [blockedCourses, setBlockedCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshCourses = async () => {
    const response = await dispatch(getCoursesForChild({ child_email }));
    if (response?.payload) {
      setAvailableCourses(response.payload);
      console.log("Available courses:", response.payload);
    }
    const res = await dispatch(getBlockedCoursesForChild({ child_email }));
    if (res?.payload) setBlockedCourses(res.payload);
  };

  useEffect(() => {
    if (child_email) {
      refreshCourses();
    }
    console.log("Child email:", child_email);
    // eslint-disable-next-line
  }, [child_email, dispatch]);

  const handleBlock = async (course_id) => {
    setLoading(true);
    await dispatch(blockCourse({ child_email, course_id }));
    await refreshCourses();
    setLoading(false);
  };

  const handleUnblock = async (course_id) => {
    setLoading(true);
    await dispatch(unblockCourse({ child_email, course_id }));
    await refreshCourses();
    setLoading(false);
  };

  return (
    <HomeLayout>
      <div className="flex flex-col lg:h-screen lg:pt-10 md:pt-10 pt-20 lg:px-20 px-4 gap-14">
        <h1 className="font-bold lg:text-4xl md:text-4xl text-2xl font-serif text-white text-center">
          Courses available for{" "}
          <span className="text-yellow-400">{child_email}</span>
        </h1>
        <div className="flex flex-wrap mb-10 gap-14 w-full px-8 justify-center">
          {availableCourses?.length > 0 ? (
            availableCourses.map((course) => (
              <div key={course._id} className="flex flex-col items-center">
                <CourseCard data={course} />
                <button
                  className="btn btn-error mt-2"
                  disabled={loading}
                  onClick={() => handleBlock(course._id)}
                >
                  Block
                </button>
              </div>
            ))
          ) : (
            <div className="text-white text-lg">No courses available.</div>
          )}
        </div>
        <h2 className="font-bold text-2xl text-red-400 text-center mt-8">
          Blocked Courses
        </h2>
        <div className="flex flex-wrap mb-10 gap-14 w-full px-8 justify-center">
          {blockedCourses?.length > 0 ? (
            blockedCourses.map((course) => (
              <div key={course._id} className="flex flex-col items-center">
                <CourseCard data={course} />
                <button
                  className="btn btn-success mt-2"
                  disabled={loading}
                  onClick={() => handleUnblock(course._id)}
                >
                  Unblock
                </button>
              </div>
            ))
          ) : (
            <div className="text-white text-lg">No blocked courses.</div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default ChildCoursesList;
