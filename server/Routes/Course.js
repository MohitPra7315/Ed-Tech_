const express = require("express")

const router = express.Router();

// console.log(route, "course routes")

// Authantigation and authorization controllers
const { Auth, isAdmin, isInstructor, isStudent } = require("../Middleware/AuthN_AothZ")

// course controllers
const {
    GetAllCourse,
    CreateCourse,
    getCourseDetails
} = require("../controllers/Course")



// category controllers
const {
    CategoryCreate,
    showAllCategory,
    CategoryPageCourse
} = require("../controllers/Category")


// section create Update deleted controllers
const { createSection,
    UpdateSection,
    DeleteSection } = require("../controllers/Section")

// Sub-section crud 

const {
    createSubsection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/sub-Section")

// rating and Review 
const {
    CreateRating,
    GetAllRating,
    GetAverageRating
} = require("../controllers/RatingReview")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

console.log(router, "course routes")
router.get("/", async () => {
})
router.post('/createCourse', Auth, isInstructor, CreateCourse)
// add new section inside courese
router.post('/addSection', Auth, isInstructor, createSection)
// router for update section

router.post('/updateSection', Auth, isInstructor, UpdateSection)

// deleta section
router.post('/deleteSection', Auth, isInstructor, DeleteSection)

// add new sub section
router.post('/addSubSection', Auth, isInstructor, createSubsection)

// Update sub section
router.post('/updateSubSection', Auth, isInstructor, updateSubSection)
// Deleted sub section

router.post('/deleteSubSection', Auth, isInstructor, deleteSubSection)

router.get('/getAllCourse', GetAllCourse)


router.post('/getCourseDetails', getCourseDetails)




// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

router.post('/createCategory', Auth, isAdmin, CategoryCreate)
router.get('/showAllCategories', showAllCategory)
router.post('/getCategoryPageDetails', CategoryPageCourse)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post('/createRating', Auth, isStudent, CreateRating)
router.get('/getAverageRating', GetAverageRating)
router.get('/getReviews', GetAllRating)


module.exports = router