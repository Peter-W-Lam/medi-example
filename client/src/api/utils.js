const axios = require('axios')


module.exports = {
    setUser = async (accessToken, user, userSub) => {
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
}