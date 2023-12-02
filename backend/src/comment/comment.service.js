const db = require("../lib/db");
const {
    CommentListResDTO,
    CommnetResDTO,
} = require("./dto/comment.create.request.dto");

class CommentService {
    constructor(comment) {
        this.commentRepository = Comment;
    }

    async commentList(postUid, page) {
        try {
            const pageSize = 10;
            const offset = (page - 1) * pageSize;

            const commentList = await this.commentRepository.findAll({
                include: [
                    {
                        model: db.Users,
                        attributes: ["Users_nickname", "Users_profile"],
                    },
                    {
                        model: db.Commnet,
                        as: "Replies",
                        include: [
                            {
                                model: db.Users,
                                attributes: ["Users_nickname", "Users_profile"],
                            },
                        ],
                    },
                ],
                offset: offset,
                limit: pageSize,
                where: {
                    Posts_uid: postUid,
                    Comment_uid2: null,
                },
                order: [["Comments_created_at", "DESC"]],
            });

            console.log(`comment service commentList :`, commentList);

            return commentList.map((comment) => {
                return new CommentListResDTO(comment.dataValues);
            });
        } catch (e) {
            throw e;
        }
    }

    async createComment(req) {
        try {
            const { dataValues: result } = await this.commentRepository.create({
                Posts_uid: requestDTO.postUid,
                Users_uid: requestDTO.userUid,
                Comments_content: requestDTO.commentContent,
                Comments_uid2: requestDTO.targetUid,
            });
            console.log(`comment service create result :`, dataValues);

            const { dataValues } = await this.commentRepository.findOne({
                include: {
                    model: db.Users,
                    attributes: ["Users_nickname", "Users_profile"],
                },
                where: {
                    Comments_uid: result.Comments_uid,
                },
            });
            console.log(`comment service create :`, dataValues);

            const comment = new CommnetResDTO(dataValues);
            console.log(`comment service comment :`, comment);
            return comment;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = CommentService;
