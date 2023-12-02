const {
    UserSignupRequestDTO,
    UserLoginRequestDTO,
    UserProfileFormRequestDTO,
    UserProfileImgRequestDTO,
} = require("./dto/user.dto");
const { Created, Ok } = require("../lib/customMessage");
const JWT = require("../lib/jwt");
const jwt = new JWT();

class UserController {
    constructor(service) {
        this.service = service;
    }

    async postSignup(req, res, next) {
        try {
            if (req.body.userPassword[0] !== req.body.userPassword[1])
                throw new BadRequest("비밀번호가 일치하지 않습니다.");

            const userSignupRequestDTO = new UserSignupRequestDTO(req.body);
            console.log(`User controller post signup :`, userSignupRequestDTO);
            const userSignupResponesDTO =
                await this.service.signup(userSignupRequestDTO);

            console.log(`User controller post signup :`, userSignupResponesDTO);
            res.status(201).json(new Created(userSignupResponesDTO));
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            let code;
            let state;
            let userLoginRequestDTO;
            const provider = req.params.provider;

            // if (provider === "kakao") code = req.query.code;
            // if (provider === "google") code = req.query.code;
            // if (provider === "github") code = req.query.code;
            // if (provider === "naver") {
            //     code = req.query.code;
            //     state = req.query.state;
            // }

            if (provider === "login") {
                userLoginRequestDTO = new UserLoginRequestDTO(req.body);
            }

            const token = await this.service.login(
                provider,
                code,
                state,
                userLoginRequestDTO
            );

            console.log(`User controller token:`, token);

            res.cookie("authorization", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                domain: localhost,
                path: "/",
                sameSite: "none",
                secure: true,
            });

            return res.redirect(`http://localhost:3000?token=${token}`);
        } catch (e) {
            next(e);
        }
    }

    async postProfile(req, res, next) {
        try {
            const userProfileImgRequestDTO = new UserProfileImgRequestDTO(req);
            console.log(`User controller token:`, token);
            const result = await this.service.profileUpload(
                userProfileImgRequestDTO
            );
            req.user.Users_profile = result;
            const token = setJWTToken(req.user);

            res.cookie("authorization", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                domain: localhost,
                path: "/",
                sameSite: "none",
                secure: true,
            });

            console.log(`user controller post profile result :`, result);
            res.status(201).json(new Created(result));
        } catch (e) {
            next(e);
        }
    }

    async putProfile(req, res, next) {
        try {
            const userProfileFormRequestDTO = new UserProfileFormRequestDTO(
                req
            );
            const result = await this.service.userInfoUpdate(
                userProfileFormRequestDTO
            );
            console.log(`user controller put profile result :`, result);

            req.user.Users_nickname = userProfileFormRequestDTO.userNickname;
            req.user.Users_name = userProfileFormRequestDTO.userName;
            req.user.Users_email = userProfileFormRequestDTO.userEmail;

            const token = this.setJWTToken(req.user);
            res.status(201).json(new Created(token));
        } catch (e) {
            next(e);
        }
    }

    async setJWTToken(data) {
        const jwtPayload = data;
        console.log(`user controller jwt payload :`, jwtPayload);
        const token = jwt.sign(jwtPayload);
        return token;
    }
}

module.exports = UserController;
