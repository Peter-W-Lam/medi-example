import React, {useState} from 'react'
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/ClipLoader";
import './Loading.css'

function Loading() {

    const [loading, setLoading] = useState(true)


    return (
        <div className="Loading">
            <PuffLoader
                color="#FFF"
                loading={loading}
                size={100}
            />
        </div>
    )
}

export default Loading
