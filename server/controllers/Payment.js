const instance = require("../confiq/razorpay")
const User = require("../Models/User");
const Course = require("../Models/Course");
const mailSender = require("../Utils/NodeAmiler");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail");
const passwordUpdate = require("../mail/templates/passwordUpdate");
const { default: mongoose } = require("mongoose");


exports.capturePayment = async (req, res) => {
    // fetch CourseId  from req body
    const { Courses } = req.body
    // fetch user if User is logged in
    const { userId } = req.user.id
    //  valide the data 
    if (!Courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Data is Missing"
        })
    }

    let TotalAmount = 0;
    let course;
    for (const course_id of Courses) {
        try {
            // find the Course inside the database
            course = await Course.findById(course_id)

            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: "Course didn't get now"
                })
            }
            //   check user is already enrolled this course or Not
            let UID = new mongoose.Types.ObjectId(userId)
            if (course.studentsEnrolled.includes(UID)) {
                return res.status(400).json({
                    success: false,
                    message: "you are already enrolled in this course"
                })
            }


            TotalAmount += course?.price

        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error.message })
        }

    }

    const options = {
        amount: TotalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: course._id,
            userId: userId
        }
    }

    // create instience of order 
    try {
        const response = await instance.orders.create(options)
        console.log("Response....", response)
        res.status(200).json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            message: "Could not initiate order.",
        })
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




exports.verifySignature = async () => {
    try {

        //-=>1 server  screat key for matching
        const webhookScreatKey = "123456"
        //-==>2 second from razorpay account req headers
        const signature = req.headers["x-razorpay-signature"];
        //--==>3  hash the webhookscreat key 
        const shasum = await crypto.createHmac("sha256", webhookScreatKey);
        hmac.update(JSON.stringify(req.body));
        const digest = hmac.digest('hex');

        //--=>4 check both are matching or not 
        if (digest === signature) {
            console.log("payment has been authorised")


            // -==>5 fetch  userID and CourseID from payment req body

            const { UserId, CourseId } = req.body.payload.payment.entity.notes
            try {
                // --=>6 update the course inside user Detail 

                const updateduserCourse = await User.findByIdAndUpdate({ _id: UserId },
                    {
                        $push:
                        {
                            course: CourseId._id
                        }
                    },
                    { new: true })
                // -==>6 Course inside the Enrolled user

                const UpdatedcourseEnrolled = await Course.findByIdAndUpdate({ _id: CourseId },
                    {
                        $push:
                        {
                            studentEnrolled: UserId._id
                        }
                    }, {
                    new: true
                })

                if (!UpdatedcourseEnrolled) {
                    return res.status(400).json({
                        success: false,
                        message: "course Not found"
                    })
                }
                const mailresponse = mailSender(updateduserCourse.email,
                    "confirmation mail for corse",
                    "suessfully send a feedback to you course added in your portfolio")

                return res.status(200).json({
                    success: true,
                    message: "succesfully verified and course Updated "
                })
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "error while update inside the user for updated course and Enrolled data inside the Course"
                    , error: error.message
                })
            }
        } else {
            console.log("sigature and WebhookScreteKey does't match payment not authorised")

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Code fatt gya h bhai",
            error: error.message

        })

    }
}