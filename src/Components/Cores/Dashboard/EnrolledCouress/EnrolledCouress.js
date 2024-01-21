import { useState } from "react"
import { apiConnector } from "../../../../services/apiConnection"
import { categories } from "../../../../services/apis"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { showAllCategories } from "../../../../services/operations/Profile"
import ProgressBar from "@ramonak/react-progress-bar";
const EnrolledCouress = () => {
    const { ALL_CATEGORIES_API } = categories
    const [allcoures, setAllcoures] = useState(null)
    const { token } = useSelector((state) => state.auth)

    const showAllCategory = async () => {
        try {
            const response = await showAllCategories(token)

            setAllcoures(response)
            console.log("response for Enrolled Couress", response)
        } catch (error) {
            console.error(error.message)
            toast.error("Failed to fetch Enrolled Couress")
        }


    }


    useEffect(() => {
        showAllCategory()
    }, [])



    return (
        <div className="w-11/12  text-3xl text-white">
            <p className="text-white">Enrolled Couress</p>
            {
                !allcoures ?
                    (<div className="text-white ">Loading...</div>) :
                    (allcoures.length == 0 ?
                        (<div>You haven't enrolled any coures</div>) :
                        (<div>
                            <div>
                                <p>Course Name</p>
                                <p>Durations</p>
                                <p>Progress</p>
                            </div>
                            {/* course */}

                            {
                                allcoures.map((course, index) => {
                                    return (
                                        <div>
                                            <div>
                                                <img src={allcoures?.thumbnail} />
                                                <div>
                                                    <h1>{allcoures?.courseName}</h1>
                                                    <p>{allcoures?.courseDescription}</p>
                                                </div>
                                            </div>
                                            <p>
                                                {allcoures?.duration}?
                                            </p>
                                            <div>
                                                <p>
                                                    Progress:{allcoures?.progressPercentage || 0}%    </p>
                                                <ProgressBar completed={50}></ProgressBar>

                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>)
                    )

            }

        </div>
    )
}
export default EnrolledCouress