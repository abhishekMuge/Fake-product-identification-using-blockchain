const User = require("../backend/user")
const mongoose = require('mongoose');

exports.registerUser = async (req, res, next) => {
    try {
        const { name, type_of, phone_number, account_address, password } = req.body

        const userExist = await User.findOne({ account_address: account_address });

        if (userExist) {
            res.status(200).send({ status: 400, message: "User already exist!!!" });
            return;
        }

        const createNewUser = new User({
            name: name,
            type_of: type_of,
            phone_number: phone_number,
            account_address: account_address,
            password: password,
        })
        const user = await createNewUser.save();
        res.status(200).send({ status: 200, message: "User Registered Successfully" });
        return;
    } catch (error) {
        next(error)
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const { account_address, password } = req.body

        const user = await User.findOne({ account_address: account_address });

        if ( user == null ) {
            res.status(200).send({ status: 400, message: "Invalid Account" });
            return;
        }
        else{
            if( account_address == user.account_address && user.password == password ){
                res.status(200).json({
                    status: 200,
                    message: "User Login Successfully",
                    data: {
                        user: user
                    }
                })
            }
        }        
    } catch (error) {
        next(error)
    }
}