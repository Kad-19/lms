import { Router } from 'express'
import { 
    addLecturesToCourse, 
    createCourse, 
    deleteCourse, 
    deleteLectures, 
    getAllCourses, 
    getLectures, 
    updateCourse, 
    updateLectures,
    block_course,
    unblock_course,
    getAllCoursesForChild,
    getBlockedCoursesForChild
} from '../controller/courseController.js'
import { authorizedRole, isLoggedIn, verifySubscription } from "../middleware/authMiddleware.js";
import upload from '../middleware/multer.js'
const router = Router()

router.post('/block-course', isLoggedIn, authorizedRole('PARENT'), block_course)
router.post('/unblock-course', isLoggedIn, authorizedRole('PARENT'), unblock_course)
router.post('/coursesforchild', isLoggedIn, getAllCoursesForChild)
router.post('/coursesblockedforchild', isLoggedIn, authorizedRole('PARENT'), getBlockedCoursesForChild)
router.get('/', getAllCourses)
router.post('/newcourse', isLoggedIn, authorizedRole('ADMIN'), upload.single("thumbnail"), createCourse)
router.put('/:id', isLoggedIn, authorizedRole('ADMIN'), upload.single("thumbnail"), updateCourse)
router.delete('/:id', isLoggedIn, authorizedRole('ADMIN'), deleteCourse)
router.get("/:id", isLoggedIn, verifySubscription, getLectures)
router.post('/:id', isLoggedIn, authorizedRole('ADMIN'), upload.single("lecture"), addLecturesToCourse)
router.put('/lectures/:id/:lectureId', isLoggedIn, authorizedRole('ADMIN'), upload.single("lecture"), updateLectures)
router.delete('/lectures/:id/:lectureId', isLoggedIn, authorizedRole('ADMIN'), deleteLectures)

// Restriction-related routes

export default router