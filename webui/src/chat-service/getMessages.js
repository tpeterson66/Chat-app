import axios from 'axios';

export default (ch) => {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('access_token')
        if (token === null) reject('no_token')
        axios.post(`${process.env.REACT_APP_CHAT_API}/messages`, { channel: ch },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
            .then((result) => {
                resolve(result.data)
            })
            .catch((err) => {
                reject(err)
            })
    })

}