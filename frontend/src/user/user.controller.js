class UserController {
    constructor(service) {
        this.service = service;
    }

    getSignup(req, res, next) {
        try {
            res.render("user/signup.html");
        } catch (e) {
            next(e);
        }
    }
    async postSignup(req, res, next) {
        try {
            res.send("post signup");
        } catch (e) {
            next(e);
        }
    }

    async getLogin(req, res, next) {
        try {
            res.send("getLogin");
        } catch (e) {
            next(e);
        }
    }

    getLogout(req, res, next) {
        try {
            res.send("logout");
        } catch (e) {
            next(e);
        }
    }

    getProfile(req, res, next) {
        try {
            res.render("user/profile.html");
        } catch (e) {
            next(e);
        }
    }

    async postProfile(req, res, next) {
        try {
            res.send("post profile");
        } catch (e) {
            next(e);
        }
    }
}

module.exports = UserController;
