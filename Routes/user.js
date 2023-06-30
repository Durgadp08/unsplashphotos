import express from 'express';
import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import joi from '@hapi/joi';
const router = express.Router();

const registerSchema = joi.object({
    email: joi.string().min(6).email(),
    username: joi.string().min(3).required(),
    password: joi.string().min(6).required()
})

router.post('/register', async (req, res) => {
    const { email,username, password } = req.body;
    console.log(req.body);
    const user = await userModel.findOne({ username });
    // console.log(user);
    if (user) {
        return res.json({ message: "User Already Registered", status:301 });
    }
    try {
        const { error } = await registerSchema.validateAsync(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({ email,username, password: hashedPassword });
            await newUser.save();
            return res.json({ message: "Registeration Succesfull" ,status:200});
        }
    } catch (error) {
       return res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) {
        return res.json({ message: "User Not Found!!", num: "1" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: " Username or Password is Incorrect!!", num: "2" });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userId: user._id, num: "3"});
})
export { router as userRouter };