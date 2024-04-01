
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { MdClose } from "react-icons/md"

export const ChipInput = ({ label, name, placeholder, setValue, getValues, register, errors }) => {

    const { watch } = useForm()
    const [newvalue, setNewvalue] = useState("")
    const [allTags, setAllTags] = useState("")
    function handleKeyDown(event) {
        if (event.key == "Enter" || event.key == ",") {
            event.preventDefault()
            const chipValue = event.target.value
            // console.log("Tag single chip", chipValue)
            if (chipValue && !allTags.includes(chipValue)) {
                // Add the chip to the array and clear the input
                const newChips = [...allTags, chipValue]
                setAllTags(newChips)
                event.target.value = ""
            }
        }

    }

    const handleDelete = (index) => {
        // console.log("check Updated tags", index)
        const Updatedtags = [...allTags]
        Updatedtags.splice(index, 1)
        // console.log("check Updated tags", Updatedtags)
        setAllTags(Updatedtags)
    }

    useEffect(() => {
        register(name, {
            required: true
        })
        console.log("monut first render on UI", register(name))
    }, [])

    useEffect(() => {
        setValue(name, allTags)
    }, [allTags])


    return (
        <form className="bg-white w-full text-black">
            {/* theis is for add new tag */}
            <div>
                <label htmlFor="CourseTag"> {label}</label>

                <div>
                    {
                        allTags.length > 0 && (
                            allTags.map((tag, index) => {
                                return (
                                    <div key={index}>
                                        <span >{tag}</span>
                                        <button
                                            type="button"
                                            className="ml-2 focus:outline-none"
                                            onClick={() => { handleDelete(index) }}
                                        >
                                            <MdClose className="text-sm" />
                                        </button>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>

            <div>
                <input
                    name={name}
                    type="text"
                    className="bg-richblack-800 w-full text-white"

                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}

                />{
                    errors.courseTag && (<div>
                        Tag is required
                    </div>)
                }
            </div>

        </form>
    )
}