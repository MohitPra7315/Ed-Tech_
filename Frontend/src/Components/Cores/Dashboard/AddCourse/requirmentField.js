import { useEffect, useState } from "react"

const RequirmentFields = ({ label, name, register, errors, setValue, getValues }) => {
    const [requirment, setrequirments] = useState("")
    const [allRequirments, setAllRequirements] = useState([])


    useEffect(() => {

        register(name, {
            required: true

        })
    }, [])

    useEffect(() => {
        setValue(name,  allRequirments )
    }, [allRequirments])

  


    function handleAddRequment() {
        console.log("clicked to add handler")
        if (requirment !== null) {
            setAllRequirements([...allRequirments, requirment])
            setrequirments(" ")
        }
    }


    function handleRemoveRequirments(index) {
        const UpdatedrequirmentList = [...allRequirments]
        console.log("Uoadted daat", UpdatedrequirmentList)
        UpdatedrequirmentList.splice(index, 1)
        setAllRequirements(UpdatedrequirmentList)
    }
    return (
        <div className="">
            <div className="flex flex-col justify-start  ">
                <label htmlFor={name}>{label}   </label>
                <input
                    className="text-black"

                    type="text"
                    id={name}
                    required
                    value={requirment}
                    onChange={(e) => setrequirments(e.target.value)}

                />
                <button type="button"
                    className="text-yellow-100 font-bold"
                    onClick={handleAddRequment}
                >
                    Add
                </button>
            </div>





            {
                allRequirments.length > 0 && (
                    <div>
                        {
                            allRequirments.map((requirements, index) => {
                                return (
                                    <div key={index}
                                    >
                                        <span>{requirements}</span>
                                        <button type="button"
                                            className="text-richblack-300"
                                            onClick={(e) => handleRemoveRequirments(index)}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }

            {
                errors[name] && (<span>{label}is  Required</span>)
            }
        </div>
    )
}

export default RequirmentFields