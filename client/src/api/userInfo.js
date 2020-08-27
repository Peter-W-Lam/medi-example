const axios = require('axios')
const {toast} = require('react-toastify')
module.exports = { 
    updateUserInfo: async (accessToken, userID, userInfo) => {
        axios({
            method: 'PUT', 
            headers: {'Authorization': `Bearer ${accessToken}`},
            url: `/api/users/${userID}`, 
            data: userInfo
        }).then()
        .catch(e => toast.error(e.message))
    }
}