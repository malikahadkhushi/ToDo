const jwt = require('jsonwebtoken');

exports.tokenGenerator = (data)=>{

    let token = jwt.sign({id:data._id , userName:data.userName , profession:data.profession , profileImage:data.profileImage}, process.env.SECRET_KEY,{expiresIn:"1h"});
    return token;

}