const isOnline = require("is-online");

const internetConnection = isOnline().then(online => {
    if(online){
        console.log("Connected.")
    }else{
        console.log("No internet connection.")
    }
});

export { internetConnection }