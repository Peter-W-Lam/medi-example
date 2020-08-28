const axios = require('axios')
const {toast} = require('react-toastify')
export const updateUserInfo = async (accessToken, userID, userInfo) => {
    axios({
        method: 'PUT', 
        headers: {'Authorization': `Bearer ${accessToken}`},
        url: `/api/users/${userID}`, 
        data: userInfo
    }).then()
    .catch(e => toast.error(e.message))
}

export const getUserID = async (accessToken, authID, name, email) => {
    try {
        console.log()
        const res = await axios.get(`/api/users/auth/${authID}`, {
            validateStatus: () => true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
        }})
        if (res.status === 404) {
            console.log("Creating new user");
            const r = await axios({ method: 'POST', 
                                    url: '/api/users', 
                                    headers: {
                                        'Authorization': `Bearer ${accessToken}`
                                    }, 
                                    data: { name: name, email: email, authID: authID }
            })
            return r.data
        } else {
            return res.data
        }
    } catch(e) {
        console.log("Error status:", e.status)
        console.log("In error block of getUserID:",e)   
    }
}

export const getAuth0Data = async (domain, getAccessTokenSilently, sub) => {
    try {
        console.log("In getAuth0Data")

        const managementAccessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user edit:coupons"
        });
        console.log("got managementAccessToken:", managementAccessToken)

        // Fetch access tokens first for our database, then for the management API
        // const APIaccessToken = await getAccessTokenSilently({
        //     audience: `https://medi/api`
        // });

        // console.log("got API accessToken:", APIaccessToken)
        
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
                Authorization: `Bearer ${managementAccessToken}`,
            },
        });
        console.log("got metadataResponse", metadataResponse)
        const { app_metadata } = await metadataResponse.json();
        console.log("Got app_metadata,", app_metadata)
        const data = {
            managementAccessToken: managementAccessToken, 
            accessToken: managementAccessToken
        }

        if (app_metadata.role) {
            data.role = app_metadata.role
        }

        return data;
    } catch(e) {
        toast.error(e.message)
        console.log(JSON.stringify(e))
        
    }
}