const axios = require('axios')



export const setUser = async (accessToken, user, userSub) => {
    if (!user || !userSub) {
        console.log("Error: no user or userSub exists")
        return;
    }

    axios.get(`/api/users/auth/${userSub}`, {validateStatus: () => true})
            .then(res => {
            // If user does not exist, create user
            if (res.status === 404) {
                axios.post('/api/users', {
                    name: user.name, 
                    email: user.email, 
                    authID: userSub
                })
                    .then(r => {
                        localStorage.setItem("id", r.data._id)
                    })
            } else {
                localStorage.setItem("id", res.data._id)
            }
            })

        // If no user exists, create user 
            .catch(e => {
            console.log("catch",e)   

            })
}

// Create new object with original value, along with specified time to live 
// in milliseconds
export const setWithExpiry = (key, value, ttl) => {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
    }
    
	localStorage.setItem(key, JSON.stringify(item))
}


export const getWithExpiry = key => {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
        console.log("returning null")
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        console.log("removing item")
		return null
    }
    
	return item.value
}
