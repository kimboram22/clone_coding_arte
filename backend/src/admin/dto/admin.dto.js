const baseDto = require("../../lib/base.dto");

class UserListResDTO extends baseDto {
    userUid;
    userSuid;
    userId;
    userName;
    userNickname;
    userEamil;
    userProfile;
    userProvider;
    userCreateAt;

    constructor(res) {
        super();
        this.userUid = res.Users_uid;
        this.userSuid = res.Users_suid;
        this.userId = res.Users_id;
        this.userName = res.Users_name;
        this.userNickname = res.Users_nickname;
        this.userEamil = res.Users_email;
        this.userProfile = res.Users_profile;
        this.userProvider = res.Users_provider;
        this.userCreateAt =
            res.Users_created_at.toLocaleDateString() +
            "  " +
            response.Users_created_at.toLocaleTimeString();
    }
}

module.exports = UserListResDTO;
