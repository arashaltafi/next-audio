import React from 'react'

interface PropsType {
    isVerticaly?: boolean,
    className?: string
}

const Divider = (props: PropsType) => {
    return (
        <>
            {
                props.isVerticaly ? (
                    <span className={`w-px h-full bg-slate-600 ${props.className}`} style={{ padding: 0 }} />
                ) : (
                    <span className={`w-full h-px bg-slate-600 ${props.className}`} style={{ padding: 0 }} />
                )
            }
        </>
    )
}

export default Divider