const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const appError = require('../utils/appError');
const jwt = require('jsonwebtoken');


class userService {
    async createUser(name, email, password) {
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedpassword });
        return user;
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            // return res.status(404).json({ message: "User not found" });
            throw new appError(404, 'User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // return res.status(401).json({ message: "Invalid password" });
            throw new appError(404, 'Invalid password');

        }
        const token = jwt.sign({ id: user.id }, 'secretkey');
        return token;
    }

    async updateUser(id, name, email, password) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new appError(404, 'User not found');
        }

        user.name = name;
        user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        const users = await user.save();
        return users;

    }

    async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new appError(404, 'User not found');
        }

        return await user.destroy();
    }
}


module.exports = userService;