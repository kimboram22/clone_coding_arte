const { BadRequest } = require("../lib/customException");
const JWT = require("../lib/jwt");
const jwt = JWT();
const bcrypt = require("bcryptjs");
const db = require("../lib/db");
const { UserSignupResponesDTO } = require("./dto/user.dto");

class UserService {
    constructor(User) {
        this.userRepository = User;
    }

    async signup(requsetDTO) {
        try {
            const [user, isNewRecord] = await this.userRepository.findOrBuild({
                where: { Users_id: requsetDTO.userId },
            });

            if (!isNewRecord)
                throw new BadRequest("이미 존재하는 아이디 입니다!");

            user.User_id = requsetDTO.userId;

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(requsetDTO.userPassword, salt);

            user.Users_password = hash;
            user.Users_name = "name";
            user.Users_nickname = "nickname";
            user.Users_provider = "local";
            user.Users_created_at = Date.now();
            user.Users_email = requsetDTO.userEmail;
            user.Users_profile = "/images/user.png";
            user.Role_authority = "user";

            const response = await user.save();
            console.log(`user service sign up response:`, response);
            const responseDTO = new UserSignupResponesDTO(response.dataValues);
            console.log(`user service sign up responseDTO:`, responseDTO);

            return responseDTO;
        } catch (e) {
            throw e;
        }
    }

    async login(provider, code, state, userLoginRequestDTO) {
        try {
            let userInfo;
            let user;

            if (provider === "login") {
                const result = await this.userRepository.findOne({
                    where: {
                        [Op.and]: [
                            { Users_id: userLoginRequestDTO.userId },
                            { Users_provider: "local" },
                        ],
                    },
                });
                if (result === null)
                    throw new BadRequest(
                        "아이디 혹은 비밀번호를 확인해주세요!"
                    );

                const isPasswordCorrect = await bcrypt.compare(
                    userLoginRequestDTO.userPassword,
                    result.dataValues.Users_password
                );
                if (isPasswordCorrect === false)
                    throw new BadRequest(
                        "아이디 혹은 비밀번호를 확인해주세요!"
                    );

                const { dataValues: user } = result;
                console.log(`user service login 로컬로그인 user:`, user);
                return setJWTToken(user);
            }

            const isUser = await this.userRepository.findOne({
                where: {
                    Users_suid: user.dataValues.Users_suid,
                },
                attributes: {
                    exclude: ["Users_password"],
                },
            });

            if (!isUser !== null) return setJWTToken(isUser.dataValues);

            const response = await user.save().then(() => {
                return user.reload();
            });
            console.log(`user service login response:`, response);

            delete response.dataValues.Users_password;

            return setJWTToken(response.dataValues);
        } catch (e) {
            throw e;
        }
    }

    async profileUpload(requsetDTO) {
        try {
            let domain = `http://localhost:4000`;
            const filePath = domain + requsetDTO.profile.filename;

            const [result] = await this.userRepository.update(
                { Users_profile: filePath },
                {
                    where: {
                        Users_uid: requsetDTO.userUid,
                    },
                }
            );
            console.log(`user service profileUpload result:`, result);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async userInfoUpdate(requsetDTO) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const result = await this.userRepository.update(
                {
                    Users_password: requsetDTO.userPassword
                        ? bcrypt.hashSync(requsetDTO.userPassword, salt)
                        : "password",
                    Users_name: requsetDTO.userName,
                    Users_nickname: requsetDTO.userNickname,
                    Users_email: requsetDTO.userEmail,
                },
                {
                    where: {
                        Users_id: requsetDTO.userUid,
                    },
                }
            );
            console.log(`user service userInfoUpdate result:`, result);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async setJWTToken(data) {
        const jwtPayload = data;
        console.log(`user controller jwt payload :`, jwtPayload);
        const token = jwt.sign(jwtPayload);
        return token;
    }
}

module.exports = UserService;
