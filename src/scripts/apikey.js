export default () => {
    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config()
    }
    return process.env.API_KEY;
}