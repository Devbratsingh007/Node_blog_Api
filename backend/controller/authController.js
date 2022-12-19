const UserSchema = require('../model/user')
const jwt = require('jsonwebtoken');
const  bcrypt  =  require('bcrypt');



const register = async (req,res,next) => {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ msg: "please add all Fields"});
        }
        const UserExist = await UserSchema.findOne({email})
        if(UserExist){
            return res.status(400).json({ msg: "User already exist"});
        }
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new UserSchema({ name, email, password: hash });
            await newUser.save();

            res.status(200).json({ msg: "User registered seccessfully" });
        }catch(err){
            next(err);
        }
    }


const login = async (req, res, next)  => {
        const { email } = req.body;
        try{
            const isExist = await UserSchema.findOne({ email });
            if(!isExist) {
                return res.status(400).json({ msg: "Wrong password or username!"});
            }

            const isPassCorrect = await bcrypt.compareSync(req.body.password, isExist.password);
            if(!isPassCorrect) {
                return res.status(400).json({ msg: "Wrong password or username!"});
            }
            const token = jwt.sign(
                { id: isExist._id, isAdmin: isExist.isAdmin },
                process.env.JWT_SECRET
              );
          

            const { password, isAdmin, ...otherDetails } = isExist._doc;
            res.cookie("access_token", token, {
                httpOnly: true,
              }).status(200).json({msg: "Login Successfully " ,details: { ...otherDetails }, isAdmin });
            
        }catch(err){
            next(err);
        }
}



const updateUser = async (req,res,next)=>{
    try {
      const updatedUser = await UserSchema.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
const deleteUser = async (req,res,next)=>{
    try {
      await UserSchema.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  }
const getUser = async (req,res,next)=>{
    try {
      const user = await UserSchema.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
const getUsers = async (req,res,next)=>{
    try {
      const users = await UserSchema.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

module.exports = {
    login,
    register,
    updateUser,
    deleteUser,
    getUser,
    getUsers
}

