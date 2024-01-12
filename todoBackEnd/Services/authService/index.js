const {postUserData} = require('../../collectionSchemas/index')


exports.loginService = (email,password)=>{
    return  postUserData.findOne({$and:[{email:email},{password:password}]});
}

exports.createUserService = (userCredentials)=>{
        return postUserData.insertMany([userCredentials]);
}

