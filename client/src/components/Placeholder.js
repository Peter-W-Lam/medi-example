import React from 'react'
import Button from './Button'
import {useAuth0} from "@auth0/auth0-react"

function Placeholder() {
    
    const { logout } = useAuth0();
    return (
        <div style={{margin: "10vh 10vw"}}>
            <h1>Placeholder content</h1>
            
            <Button onClick={() => logout()} title="Log out"/>
        </div>
    )
}

export default Placeholder
