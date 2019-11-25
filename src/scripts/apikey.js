export default () => {
    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config()
    }
    const API_KEY = process.env.API_KEY;
    return API_KEY;
}