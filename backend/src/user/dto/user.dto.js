const baseDTO = require("../../lib/base.dto");
const { BadRequest } = require("../../lib/customException");

class UserLoginRequestDTO extends baseDTO {
    userId;
    userPassword;

    constructor(body) {
        super();
        this.userId = body.userId;
        this.userPassword = body.userPassword;

        this.validate(this, BadRequest);
    }
}

class UserSignupRequestDTO extends baseDTO {
    userId;
    userPassword;
    userEmail;

    constructor(body) {
        super();
        this.userId = body.userId;
        this.userPassword = body.userPassword[0];
        this.userEmail = body.userEmail;

        this.validate(this, BadRequest);
    }
}

class UserSignupResponesDTO extends baseDTO {
    userUid;
    userId;
    userEmail;
    userProvider;
    userCreatedAt;
    roleAuthority;

    constructor(res) {
        super();
        this.userUid = res.Users_uid;
        this.userId = res.Users_id;
        this.userEmail = res.Users_email;
        this.userProvider = res.Users_provider;
        this.userCreatedAt = res.Users_created_at;
        this.roleAuthority = res.Role_authority;

        this.validate(this, InternalServerError);
    }
}

class UserProfileFormRequestDTO extends baseDTO {
    userUid;
    userNickname;
    userName;
    userEmail;
    constructor(req) {
        super();
        this.userUid = req.user.Users_uid;
        this.userNickname = req.body.userNickname;
        this.userName = req.body.userName;
        this.userEmail = req.body.userEmail;
        if (req.user.Users_provider === "local") {
            if (req.body.userPassword[0] !== req.body.userPassword[1])
                throw new BadRequest("비밀번호가 일치하지 않습니다.");
            this.userPassword = req.body.userPassword[0];
        }

        this.validate(this, BadRequest);
    }
}

class UserProfileImgRequestDTO extends baseDTO {
    profile;
    userUid;

    constructor(req) {
        super();
        this.profile = req.file;
        this.userUid = req.user.Users_uid;

        this.validate(this, BadRequest);
    }
}

module.exports = {
    UserLoginRequestDTO,
    UserSignupRequestDTO,
    UserSignupResponesDTO,
    UserProfileFormRequestDTO,
    UserProfileImgRequestDTO,
};
