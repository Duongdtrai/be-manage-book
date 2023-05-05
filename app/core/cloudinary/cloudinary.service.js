require('dotenv').config()
const cloudinary = require("cloudinary")
const V2 = cloudinary.v2;
V2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET, 
})
module.exports = V2;