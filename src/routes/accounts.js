const AccountsController = require('../controllers/accounts');

exports.register = async function(req, res, next) {
    try {
        const accounts = await AccountsController.register( req.body.email, req.body.password );
        
        res.contentType = 'json';
        res.send(
            accounts.status,
            {
                message: accounts.message,
                content: accounts.data
            }
        )

        return next();

    } catch (e) {
        console.error(e.message);
        res.contentType = 'json';
        res.send(
            500,
            {
                message: e.message,
                content: null
            }
        )
        return next();
    }
}

exports.auth = async function(req, res, next) {
    return await AccountsController.auth(
        req.body.email,
        req.body.password
    )
    .then(
        async (accounts) => {
            res.contentType = 'json';
            res.send(
                accounts.status,
                {
                    message: accounts.message,
                    content: accounts.data
                }
            );
            return next();
        }
    )
    .catch(
        async (err) => {
            console.error(`[AccountsRoutes|auth] ` + err.message);
            res.contentType = 'json';
            res.send(
                500,
                {
                    message: err.message,
                    content: null
                }
            );
            return next();
        }
    )
}