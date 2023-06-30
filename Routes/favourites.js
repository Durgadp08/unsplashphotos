import express from 'express';
import { userModel } from '../models/userModel.js';


const router = express.Router();
router.get('/ids/:userId', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId);
        res.json({ favourites: user.favourite });
    } catch (err) {
        console.error(err)
    }
})
router.post('/add', async (req, resp) => {
    const { photourl, userId } = req.body;
    await userModel.findByIdAndUpdate(userId, { $addToSet: { favourite: photourl } }, { new: true })
        .then(res =>
            resp.json({ favourites: res.favourite, message: "added successfully" })
        )
        .catch(err => {
            console.error(err);
        })
})
router.post('/delete', async (req, resp) => {
    const { photourl, userId } = req.body;
    await userModel.findByIdAndUpdate(userId, { $pull: { favourite: photourl } }, { new: true })
        .then(res =>
            resp.json({ favourites: res.favourite, message: "added successfully" })
        )
        .catch(err => {
            console.error(err);
        })
})
export { router as favouriteRouter }