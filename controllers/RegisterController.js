const User = require('../models/User');
const {createToken}=require('../middlewares/CreateToken');


module.exports.signup = async (req, res) => {
    const { Name, Email, Password } = req.body
    try {
        const user = await User.create({ Name, Email, Password })
        const token = createToken(user._id);
        res.status(201).json({ success: true, user, token })

    } catch (error) {
        console.log(error);
    }
}

module.exports.login = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const userAndToken = await User.login(Email, Password);
        res.status(200).json(userAndToken);
    } catch (error) {
        res.status(400).json({ "error": error })
    }


}