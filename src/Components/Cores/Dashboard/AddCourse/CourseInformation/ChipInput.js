import { set } from "mongoose"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export const ChipInput = ({ label, name, placeholder, setvalue, getvalues, register, errors }) => {

    const { watch } = useForm()
    const [newvalue, setNewvalue] = useState("")
    const [allTags, setAllTags] = useState("")
    function handleKeyDown(event) {
        if (event.key == "Enter" || event.key == ",") {

            event.preventDefault()



            setNewvalue(e.target.value.trim())

            const updatedChips = [...allTags, newvalue]
            setAllTags(updatedChips)


            console.log(" this not a Enter key")
        }

    }

    useEffect(() => {
        register(name, {
            required: true
        })
    }, [register])

    useEffect(() => {
        setvalue(name, allTags)
    }, [allTags])


    return (
        <form className="bg-white w-full text-black">
            {/* theis is for add new tag */}
            <div>
                <label htmlFor="CourseTag"> {label}</label>
                <span></span>

            </div>

            <div>
                <input name={name} type="text" className="bg-richblack-800 text-white"

                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}

                />{
                    errors.courseTag && (<div>
                        Tag i required
                    </div>)
                }
            </div>
            <button className="bg-yellow-100 p-3" type="submit">Click for get data</button>
        </form>
    )
}