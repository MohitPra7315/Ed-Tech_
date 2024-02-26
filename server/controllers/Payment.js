const { instance } = require("../confiq/razorpay")
const User = require("../Models/User");
const Course = require("../Models/Course");
const mailSender = require("../Utils/NodeAmiler");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail");
const passwordUpdate = require("../mail/templates/passwordUpdate");
const mongoose = require("mongoose")
const { paymentSuccessEmail } = require("../mail/templates/PaymentSuccessEmail");
const { default: toast } = require("react-hot-toast");
const crypto = require("crypto")

exports.capturePayment = async (req, res) => {
    // fetch CourseId  from req body
    const { Courses } = req.body

    // fetch user if User is logged in
    const userId = req.user.id
    console.log("data check inBackend ", Courses, "id :", userId)

    //  valide the data 
    if (Courses.length === 0) {
        return res.json({ success: false, message: "Please Provide Course ID" })
    }

    let TotalAmount = 0;
    let course;

    for (const course_id of Courses) {
        try {
            // find the Course inside the database
            console.log("find COURSES FORM occoured Coursess...... ", course_id)
            course = await Course.findById(course_id.id)

            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: "Course didn't get now"
                })
            }


            //   check user is already enrolled this course or Not
            const uid = new mongoose.Types.ObjectId(userId)
            if (course.studentsEnrolled.includes(uid)) {
                return res
                    .status(200)
                    .json({ success: false, message: "Student is already Enrolled" })

            }



            TotalAmount += course?.price
            console.log("FIND userId in string ,,.....", TotalAmount)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error.message })
        }

    }

    const options = {
        amount: TotalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),

    }


    // create instience of order 
    try {

        console.log("CREATED Options,,.....",)
        const paymentResponse = await instance.orders.create(options)

        console.log("Response....", paymentResponse)
        res.status(200).json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {

        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "Could not initiate order.",
        })
    }

}







const enrolledCourses = async (Courses, userId, res) => {
    console.log("enrolledCourse Controller")
    if (!Courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Data is required for Enrolled User in Courses"
        })
    }

    for (const course_id of Courses) {
        try {
            // Step-1 Find Corese and the add the student inside the studentsEnrolled List
            const enrolledCourse = await Course.findByIdAndUpdate(course_id, {
                $push: { studentsEnrolled: userId }
            },
                { new: true }
            )

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course Not Found"

                })
            }
            console.log("Updated course: ", enrolledCourse)

            // step-2 Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate({ _id: userId },
                { $push: { courses: course_id } },
                { new: true })

            if (!enrolledStudent) {
                return res.status(500).json({
                    success: false,
                    message: "User Not Found"
                })
            }
            console.log("Updated User course: ", enrolledStudent)

            // Step-3 Send Mail for Confirmation verification enrolled Course  
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `SuccesFully enrolled in ${enrolledCourse?.courseName}`,
                courseEnrollmentEmail(
                    `${enrolledCourse?.courseName}`,
                    `${enrolledStudent?.firstName} ${enrolledStudent?.lastName}`
                )
            )
            console.log("Email sent successfully: ", emailResponse)


        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })
        }

    }

}



exports.sendPaymentSuccesfullyMail = async (req, res) => {
    console.log("SEND SUCCESFUL MAIL BACKEND API CALL......")

    try {
        const { orderId, paymentId, amount } = req.body;
        const { userId } = req.user.id;

        if (!orderId || !paymentId || !amount) {
            return res.status(400).json({
                success: false,
                message: "provide the data for send Payment Success mail"
            })
        }
        const userData = await User.findone(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            }
            )
        }
        await mailSender(userData.email,
            "Payment Succesfully ",
            paymentSuccessEmail(
                userData.name,
                amount,
                orderId,
                paymentId)
        )

        return res.status(200).json({
            success: true,
            message: "Succes Fully sent mail for Succesfully  Payment "
        })

    } catch (error) {
        return
        console.error(error.message)
        toast.error(error.message)

    }
}
// exports.capturePayment = async (req, res) => {
//     try {
//         // fetch the data from body
//         const { course_id } = req.body;
//         const userID = req.User.id

//         // validate the data 
//         if (!userID || !course_id) {
//             return res.status(404).json({
//                 success: false,
//                 message: "data not found"
//             })
//         }
//         // check  courseDetails


//         let courseDetail;
//         try {
//             courseDetail = await Course.findById(course_id);

//             if (!courseDetail) {
//                 return res.status.json({
//                     success: false,
//                     message: "course could not found"
//                 })
//             }
//             // check user already pay for that course
//             // change the string to object 
//             const uid = new mongoose.Types.ObjectId(userID);
//             if (Course.studentEnrolled.includes(uid)) {
//                 return res.status(200).json({
//                     success: false,
//                     message: "student is already enrolled"
//                 })
//             }


//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: "gadbad h ",
//                 error: error.message
//             })
//         }

//         // create order for payment response

//         const options = {
//             amount: courseDetail.price * 100,
//             currency: "INR",
//             receipt: Math.random(Date.now()).toString(),
//             // headers: { "X-Razorpay-Account": "acc_Ef7ArAsdU5t0XL" },
//             notes: {
//                 CourseId: course_id,
//                 UserId: userID
//             }
//         }
//         try {
//             const paymentResponse = await instance.orders.create(options)
//             return res.status(200).json({
//                 success: true,
//                 courseName: courseDetail.courseName,
//                 courseDescription: courseDetail.courseDescription,
//                 thumbnail: courseDetail.thumbnail,
//                 coursePrice: paymentResponse.amount,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency


//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: "error while create order",
//                 error: error.message
//             })
//         }


//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "could not initiate order  "
//         })
//     }
// }




exports.verifyPayment = async (req, res) => {


    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.Courses
    const userId = req.user.id

    console.log("Verified payment Data: ", razorpay_order_id)
    console.log("Verified payment paymet_ID: ", razorpay_payment_id)
    console.log("Verified payment Signature: ", razorpay_signature)
    console.log("Verified payment Courses: ", courses)
    console.log("Verified payment userID: ", userId)



    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(200).json({ success: false, message: "Payment Failed" })
    }

    //   create a
    let body = razorpay_order_id + "|" + razorpay_payment_id

    //--==>3  hash the webhookscreat key 
    const expectedSignature = crypto
        .createHmac("sha256", 'tLy7WiXrjC8gW900FrCBpsx1')
        .update(body.toString())
        .digest("hex")



    //--=>4 check both are matching or not 
    if (razorpay_signature === expectedSignature) {
               await enrolledCourses(courses, userId, res)

        return res.status(200).json({ success: true, message: "Payment Verified" })
    }

    // -==>5 fetch  userID and CourseID from payment req body





}