const baseDTO = require("../../lib/base.dto");
const {
    BadRequest,
    InternalServerError,
} = require("../../lib/customException");

class CommentCreateReqDTO extends baseDTO {
    commentContent;
    commentType;
    postUid;
    userUid;

    constructor(req) {
        super();
        this.commentContent = req.body.comment;
        this.commentType = req.body.type;
        this.postUid = req.body.postUid;
        this.userUid = req.user.Users_uid;
        req.body.targetUid ? (this.targetUid = req.body.targetUid) : null;

        this.validate(this, BadRequest);
    }
}

class CommentListResDTO extends baseDTO {
    commentUid;
    commentContent;
    commentCreatedAt;
    commentPostUid;
    commentUserUid;
    commentUserNickname;
    commentUserProfile;
    replies = [];

    constructor(comment) {
        super();
        this.commentUid = comment.Comments_uid;
        this.commentContent = comment.Comments_content;
        this.commentCreatedAt = Comments_created_at;
        this.commentPostUid = comment.Posts_uid;
        this.commentUserUid = comment.Users_uid;
        this.commentUserNickname = comment.User.dataValues.Users_nickname;
        this.commentUserProfile = comment.User.dataValues.Users_profile;

        comment.Replies.forEach((comment) => {
            if (comment) {
                const replies = {
                    commentUid: comment.dataValues.Comments_uid,
                    commentContent: comment.dataValues.Comments_content,
                    commentCreatedAt: comment.dataValues.Comments_created_at,
                    commentPostUid: comment.dataValues.Posts_uid,
                    commentUserUid: comment.dataValues.Users_uid,
                    commentUserNickname: comment.dataValues.Users_nickname,
                    commentUserProfile: comment.User.dataValues.Users_profile,
                };
                this.replies.push(replies);
            }
        });

        this.validate(this, InternalServerError);
    }
}

class CommnetResDTO extends baseDTO {
    commentUid;
    commentContent;
    commentCreatedAt;
    commentPostUid;
    commentUserUid;
    commentUserNickname;
    commentUserProfile;
    commentUid2;

    constructor(comment) {
        this.commentUid = comment.Comments_uid;
        this.commentContent = comment.Comments_content;
        this.commentCreatedAt = comment.Comments_created_at;
        this.commentPostUid = comment.Posts_uid;
        this.commentUserUid = comment.Users_uid;
        this.commentUid2 = comment.Comments_uid2;
        this.commentUserNickname = comment.User.dataValues.Users_nickname;
        this.commentUserProfile = comment.User.dataValues.Users_profile;

        this.validate(this, InternalServerError);
    }
}

module.exports = { CommentCreateReqDTO, CommentListResDTO, CommnetResDTO };
