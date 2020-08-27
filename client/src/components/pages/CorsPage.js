import React from 'react'
import auth0 from 'auth0-js'

export default function CorsPage() {
    var auth0Client = new auth0.WebAuth({
        clientID: process.env.CLIENT_ID,
        domain: process.env.CLIENT_SECRET
      });
      auth0Client.crossOriginVerification();

    return (
        <div>
            <p>Authentication</p>
        </div>
    )
}
