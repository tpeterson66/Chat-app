import axios from 'axios';
import SetSession from './setSession'

export default (user) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_AUTH_API}/login`, user)
            .then((result) => {
                SetSession(result.data)
                resolve(result.data)
            })
            .catch((err) => {
                reject(err)
            })
    })

}
