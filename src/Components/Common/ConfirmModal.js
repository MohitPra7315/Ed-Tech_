import { IconBtn } from "./IconBtn"



const ConfirmationModal = ({ ModalData }) => {
    console.log("modal data inside modal", ModalData)
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-opacity-10 flex justify-center items-center ">

            <div className="bg-richblack-700 border-richblack-100 border-2 p-6 rounded-lg  flex flex-col gap-3">
                <h1 className="text-3xl text-white">{ModalData.heading}</h1>
                <p className="text-richblack-300">{ModalData.subHeading}</p>
                <div className="flex gap-10 ">
                    <IconBtn
                        onclick={ModalData?.btnHandler1}
                        text={ModalData?.btn1}

                    ></IconBtn>

                    <button
                        className="bg-richblack-500  text-black font-bold px-6 py-3 rounded-lg"
                        onClick={ModalData?.btnHandler2}>
                        {ModalData?.btn2}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal