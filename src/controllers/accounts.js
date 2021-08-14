const AccountsModel = require('../models/accounts');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');

exports.register = async function(
    email,
    password
) {
    try {
        const existingAccount = await AccountsModel.Account.findOne({ email: email });
        if (existingAccount != null) {
            console.info("Please Register With A New Email!");
            return {
                data: null,
                message: "Please Register With A New Email!",
                status: 400
            }
        }

        return bcryptjs.genSalt(12)
        .then(
            async (salt) => {
                const hashedPassword = await bcryptjs.hash(password, salt);

                const account = new AccountsModel.Account({
                    email,
                    password: hashedPassword,
                    salt,
                    createdAt: (new Date()).toUTCString()    
                });

                await account.save();

                console.info("Account Registered!");
                return {
                    data: null,
                    message: "Account Registered!",
                    status: 201
                }
        
        })
        .catch(
            async (error) => {
                console.error(`[AccountsController|register] ` + error.message);
                throw new Error(error.message, { cause: error });
            }
        );
    } catch (err) {
        console.error(err);
        return {
            data: null,
            message: err.message,
            status: 500
        }
    }
}

exports.auth = async function (
    email,
    password
) {
    return AccountsModel.Account.findOne({
        email: email,
    })
    .then(
        async (accounts) => {
            if (accounts == null) {
                console.log("Authentication Failed!");
                return {
                    data: null,
                    message: "Authentication Failed!",
                    status: 400
                }
            }


            if (await bcryptjs.compareSync(password, accounts.password) == false) {
                console.info("Authetication Failed!");
                return {
                    data: null,
                    message: "Authetication Failed!",
                    status: 400
                }
            }

            const token = jwt.sign(accounts.toJSON(), CONFIG.SECRET_KEY, {
                expiresIn: "5m",
                algorithm: "RS256"
            });

            const { issuedAt, expiresIn } = jwt.decode(token);

            return {
                data: {
                    token: token,
                    issuedAt: issuedAt,
                    expiresIn: expiresIn
                },
                message: "Authetication Success!",
                status: 200
            }
        
        }
    )
    .catch(
        async (error) => {
            console.error(`[AccountsControlle|auth] ` + error.message);
            throw new Error(error.message, { cause: error });
        }
    );
}