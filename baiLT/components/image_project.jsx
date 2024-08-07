import React from 'react'

const ImageProject = (props) => {
    return (
        <div style={{ textAlign: "center" }}>
            <img src={props.src} alt={props.name} />
        </div>
    )
}

export default ImageProject