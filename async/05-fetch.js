"use strict";

// const url = 'https://api.spotify.com/v1/artists/0k17h0D3J5VfsdmQ1iZtE9'
const url = 'https://banana.republic'

// async function getData() {
//     const response = await fetch(url, {
//         headers: {
//             'Authorization': 'Bearer 123'
//         }
//     }) // Response object with its own prototype
//     const data = await response.json()
//     console.log(data)
// }

const request = new Request(url, {
    headers: {
        'Authorization': 'Bearer 123'
    }
})


// fetch(request)
//     .then(response => response.json())
//     .then(data => console.log('Success', data)) // we Still get success even if token is not valid
//     // because making getting response from api is meaning successful operation, even if we did not get information
//     .catch(err => console.log(`ERROR is: ${err}`))

async function getData() {
    try {
        const response = await fetch(request)
        const data = await response.json()
        if(response.status === 200) {
            const data = await response.json()
            console.log('Success', data)
        } else {
            console.log('Server Error', data.error.message) // problems on the API level
        }
    } catch(error) { // failed to fetch
        console.log('Error ', error)
    }

}

getData()