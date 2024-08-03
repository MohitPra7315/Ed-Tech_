import React from "react";
import { FcGoogle } from "react-icons/fc"
import frameImg from '../../../assets/Images/frame.png'
import { LoginForm } from "./loginform";
import { SignupForm } from "./signUpFrom";

export function Template({ title, desc1, desc2, image, formtype }) {
    return (
        <div className='w-11/12 max-w-[1160px] py-28 mx-auto justify-between gap-y-0 flex '>
            <div className='w-11/12 max-w-[450px]' >
                <h1 className=' text-vistuatBlue-200 font-bold text-[1.875rem] leading-[2.375rem] '>{title}</h1>
                <p className='text-[1.125rem] leading [1.625rem] mt-4 '>
                    <span className='text-newRichblack-50'>{desc1}</span>
                    <br>
                    </br>
                    <span className='text-richgray-300 italic'> {desc2}</span>

                </p>
                {
                    formtype === "Signup" ?
                        (<SignupForm />) :
                        (<LoginForm />)
                }

                <div className='flex flex-row w-full items-center my-4 gap-x-2'>
                    <div className='h-[1px] bg-richblack-700 w-full '></div>
                    <p className='text-richblack-700  font-medium leading-[1.375rem]  '>or</p>
                    <div className='h-[1px] bg-richblack-700 w-full '></div>
                </div>

                <button className='flex  w-full border justify-center items-center rounded-[8px] font-medium text-richblack-100 border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6'>
                    <FcGoogle />
                    <p>Sign up with Google</p>
                </button>
            </div>
            <div className='relative w-11/12 max-w-[450px]'>

                <img src={frameImg}
                    height={504}
                    width={558}
                    loading='lazy' />
                <img src={image}
                    height={404}
                    width={558}
                    loading='lazy'
                    className='absolute -top-4 right-4'
                />

            </div>
        </div>
    )
}