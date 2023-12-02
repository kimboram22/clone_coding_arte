const { Ok } = require("../lib/customMessage");

class adminController {
    constructor(service) {
        this.service = service;
    }

    async getAdmin(req, res, next) {
        try {
            const UserListResDTOList = await this.service.allUserInfo(1);
            console.log(`ADMIN controller : `, UserListResDTOList);
            res.status(200).json(new Ok(UserListResDTOList));
        } catch (e) {
            next(e);
        }
    }

    async patchAdmin(req, res, next) {
        try {
            const [data] = await this.service.updateUser(
                parseInt(req.body.userUid)
            );
            console.log(`ADMIN controller : `, data);

            res.status(200).json(new Ok(data));
        } catch (e) {
            next(e);
        }
    }
}

module.exports = adminController;
