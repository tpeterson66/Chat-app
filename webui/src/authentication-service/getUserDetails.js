var jwtDecode = require('jwt-decode');

export default () => {
    if (localStorage.getItem('access_token') === null) {
        return null
    } else {
        let userDetails = jwtDecode(localStorage.getItem('access_token'))
        return userDetails
    
    }
}