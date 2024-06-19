const { instance } = require("../confiq/razorpay")
const User = require("../Models/User");
const Course = require("../Models/Course");
const mailSender = require("../Utils/NodeAmiler");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose")
const { paymentSuccessEmail } = require("../mail/templates/PaymentSuccessEmail");
// const courseProgress = require("../Models/CourseProgress")

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
            console.log(typeof (userId))
            const uid = new mongoose.Types.ObjectId(userId)
            console.log(typeof (uid))

            if (course.studentsEnrolled.includes(uid)) {
                console.log("Student is already Enrolled")
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

        console.log("CREATED Options,,.....",  instance)
        const paymentResponse = await instance.orders.create(options);

        console.log("Response....", paymentResponse)
        res.status(200).json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {

        console.log(error.message)
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Could not initiate order.",
        })
    }

}



module.exports.verifyPayment = async (req, res) => {


    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.Courses
    const userId = req.user





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
    return res.status(500).json({ success: false, message: "Payment Failed" })




}




const enrolledCourses = async (Courses, userId, res) => {
    console.log("enrolledCourse Controller")
    if (!Courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Data is required for Enrolled User in Courses"
        })
    }
    console.log("CASTING OBJECTID>>>>>>>.....", new mongoose.Types.ObjectId(userId))
    const useerID = new mongoose.Types.ObjectId(userId)
    for (const course_id of Courses) {
        try {
            // Step-1 Find Corese and the add the student inside the studentsEnrolled List
            const enrolledCourse = await Course.findByIdAndUpdate({ _id: course_id.id }, {
                $push: { studentsEnrolled: useerID }
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

            // 
            // const courseProgress = await courseProgress.create({
            //     courseID: course_id.id,
            //     userId: userId,
            //     completedVideos: [],
            // })
            // step-2 Find the student and add the course to their list of enrolled courses




            const enrolledStudent = await User.findOneAndUpdate({ _id: userId.id },
                {
                    $push:
                    {
                        courses: course_id.id,
                        // courseProgress: courseProgress._id,
                    }
                },
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




exports.sendPaymentSuccesfullyMail_C = async function (req, res) {
    console.log("SEND SUCCESFUL MAIL BACKEND Controller CALL......")


    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount) {
        return res.status(400).json({
            success: false,
            message: "provide the data for send Payment Success mail"
        })
    }
    console.log("send Mail for  payment success: ", orderId)
    console.log("send Mail for  payment success: paymet_ID: ", paymentId)
    console.log("send Mail for  payment success:amount: ", amount)
    console.log("send Mail for  payment success user: ", userId)


    const userData = await User.findById(userId)
    if (!userData) {
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        }
        )
    }

    try {
        await mailSender('mohitprajapati7315@gmail.com',
            "Payment Succesfully ",
            paymentSuccessEmail(
                userData.firstName,
                amount,
                orderId,
                paymentId)
        )
        console.log("SEND SUCCESFUL MAIL BACKEND sent..... debugg ho gya   CALL......")
    } catch (error) {
        console.log("ERROR WHILE SENDiNg mail bt node mailer", error.message)
    }




    console.log("SEND SUCCESFUL MAIL BACKEND sent..... hura  CALL......")




}
