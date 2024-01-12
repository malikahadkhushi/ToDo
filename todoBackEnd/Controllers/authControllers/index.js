const {loginService, createUserService} = require('../../Services/authService/index')
const {tokenGenerator} = require('../../tokenGenerator/index');
/**
 * @description Login Api to check either user exist on not
 * @param {*} req 
 * @param {*} resp 
 */

exports.login =async (req , resp)=>{

    try {
       
       let {email , password} = req.body;
        let user = await loginService(email,password).select('-password');   //Login Service for the user
        
        if(user){

            let token = tokenGenerator(user)
            resp.status(200).json({token:token, user:user});
        }
        else
        {
            resp.status(404).json({message:"User Not Exist"});
        }

    } catch (error) {
        console.log("Server Error")
    }

}

/**
 * @description Api to create user
 */

exports.createUser =async (req , resp)=>{

    try {
        let userCredentials = req.body;

        let ack =await createUserService(userCredentials);
        if(ack){
            resp.status(201).json({message:"User Successfully Created!"});
        }
        else
        {
            resp.status(400).json({message:"User Not Created"})
        }

    } catch (error) {
        console.log("Server Error",error)
    }
}