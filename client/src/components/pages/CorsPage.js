import React from 'react'
import auth0 from 'auth0-js'

export default function CorsPage() {
    var auth0Client = new auth0.WebAuth({
        clientID: 'YOUR_CLIENT_ID',
        domain: 'YOUR_DOMAIN'
      });
      auth0Client.crossOriginVerification();

    return (
        <div>
            
        </div>
    )
}
