import axios from 'axios';

export default axios.create({
    baseURL: 'https://awsome-burger-builder.firebaseio.com/'
});
