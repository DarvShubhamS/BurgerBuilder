import axios from 'axios';

const Instance = axios.create({
    baseURL: 'https://react-learn-5eadf.firebaseio.com/'
})



export default Instance;