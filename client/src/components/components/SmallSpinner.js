import React from 'react'
import GridLoader from 'react-spinners/GridLoader'

export default function SmallSpinner(props) {
    return (
        <div className="SmallSpinner">
            <GridLoader 
                size={35}
                color={"#004B89"}
                loading={props.loading}
            />
        </div>
    )
}
