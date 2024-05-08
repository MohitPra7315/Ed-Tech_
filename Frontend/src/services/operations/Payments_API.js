import { apiConnector } from "../apiConnection";
import { toast } from "react-hot-toast";
import { PaymentEndPoint } from "../apis"
import { setPaymentLoading } from "../../Slices/coursesSlice";
import { useDispatch } from "react-redux"
import { Await } from "react-router-dom/dist";

const { CREATEORDER_PAYMENT_API, VERIFY_PAYMENT_API, SENDPAYMENT_SUCCES_MAIL_API } = PaymentEndPoint
const loadScript = (src) => {
    // we use this for load Script for Raxorpay 
    return new Promise(resolve => {
        const script = document.createElement("script")
        script.src = src;

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}




export const BuyCourse = async (Courses, token, user_details, navigate, dispatch) => {
    const toastId = toast.loading("Loading....")
    try {
        // step-1 load the Script File 
        const Script = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!Script) {
            toast.error("Razorpay SDK failed to load. Check your Internet Connection.")
        }
        //   step-2 call to create the Order using Courses data
        console.log("Load Script is............",)

        const orderResponse = await apiConnector(
            "POST",
            CREATEORDER_PAYMENT_API,
            {
                Courses
            },
            {
                Authorization: `Bearer ${token}`
            })

        if (!orderResponse.data.success) {
            throw new Error("Failed to create Order")
        }
        console.log("PAYMENT RESPONSE FRO-.M BACKEND............")

        // step 3 go for razorPay Model options

        const options = {
            key: 'rzp_test_yBMmOy4vxKIjQp',
            order_id: orderResponse.data.data.id,
            amount: `${orderResponse.data.data.amount}`,
            currency: orderResponse.data.data.currency,
            name: "Virtual Classes",
            description: "thanks For select this course",
            prefill: {
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: `mohitprajapati7315@gmail.com`,
                contact: "8398058545"
            },
            handler: function (response) {
                // send succcesfully mail

                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
                verifyPayment({ ...response, Courses }, token, navigate, dispatch)
                console.log("verify Payment has been sent")
                //   console.log("sendPAYMent succesfully mail has been sent", response)



            }

        }

        const paymentWindow = new window.Razorpay(options)
        console.log("PAYMNNT WINDOW is OPEN.....")

        paymentWindow.open();
        paymentWindow.on("Payment Failed", (response) => {
            toast.error("Oops! Payment Failed.")
            console.log(response.error)
        })



    } catch (error) {
        console.log("PAYMENT API ERROR............", error.message)
        toast.error("Could Not make Payment.")
    }
    toast.dismiss(toastId)
}

// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector(
            "POST",
            SENDPAYMENT_SUCCES_MAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", VERIFY_PAYMENT_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Payment Successful. You are Added to the course ")
        navigate("/dashboard/enrolled-courses")
        //   dispatch(resetCart())
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR............", error.message)
        toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}

