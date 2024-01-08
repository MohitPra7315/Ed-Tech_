

export const IconBtn = ({
    text, children,
    onClick, disablded,
    type

}) => {
    return (
        <button
            className="bg-yellow-50 rounded-lg text-black font-bold   flex py-2 px-4 justify-center items-center"
            onClick={onClick}
        >
            {
                children ? (
                    <div className="flex items-center gap-1 justify-center">
                        <span>{text}</span>
                        {children}
                    </div>)
                    : (<div>{text}</div>)
            }

        </button>
    )
}