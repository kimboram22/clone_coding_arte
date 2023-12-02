const db = require("../lib/db");
const { UserListResDTO } = require("./dto/admin.dto");

class AdminService {
    constructor(User) {
        this.userRepository = User;
    }

    async allUserInfo() {
        try {
            const userList = await this.userRepository.findAll({
                order: [["Users_created_at", "DESC"]],
                where: {
                    Role_authority: "user",
                },
            });
            console.log(`ADMIN service allUserInfo : `, userList);

            const result = userList.map((user) => {
                return new UserListResDTO(user);
            });
            console.log(`ADMIN service allUserInfo : `, result);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async updateUser(userUid) {
        try {
            const result = await this.userRepository.update({
                where: { Users_uid: userUid },
            });
            console.log(`ADMIN service updateUser : `, result);

            return result;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = AdminService;
