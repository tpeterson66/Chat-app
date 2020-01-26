import axios from 'axios';

export default (message) => {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('access_token')
        if (token === null) reject('no_token')
        axios.post(`${process.env.REACT_APP_CHAT_API}/incoming`, message,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
            .then((result) => {
                resolve(result.data[0])
            })
            .catch((err) => {
                reject(err)
            })
    })

}