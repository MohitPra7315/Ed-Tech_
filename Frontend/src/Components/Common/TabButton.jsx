

export function TabButton({ tabData, currenttab, setCurrenttab }) {
   
    return (
        <div
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="text-richblack-500 flex p-1 gap-x-1 my-6 rounded-full text-xl bg-richblack-50 max-w-max">
            {
                tabData.map((btn) => {
                    return (
                        <button key={btn.id}
                            onClick={() => setCurrenttab(btn.type)}
                            className={`${currenttab === btn.tabName
                                ? "bg-richblack-5 text-richgray-300"
                                : "bg-transparent text-richblack-200"}
                                py-2 px-5 rounded-full transition-all duration-200`}
                        >{btn?.tabName}</button>
                    )
                })
            }

        </div>
    )
}