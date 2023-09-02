// const BASE_URL = 'https://network-marketing-backend.onrender.com'



// const PROJECT = 'DEV'
const PROJECT = 'PROD' 

module.exports = {
    // BASE_URL: 'http://localhost:8090'
    BASE_URL: PROJECT == 'PROD' ? 'http://api.yuvapragati.in' : 'http://localhost:8090'
}

