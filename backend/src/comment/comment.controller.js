const { Ok, Created } = require("../lib/customMessage");
const { CommentCreateReqDTO } = require("./dto/comment.create.request.dto");

class CommentController {
    constructor(service) {
        this.service = service;
    }

    async getComments(req, res, next) {
        try {
            const commentListResDTO = await this.service.commentList(
                req.query.post,
                req.query.page
            );
            console.log(
                `comment controller get comment list :`,
                commentListResDTO
            );
            res.status(200).json(new Ok(commentListResDTO));
        } catch (e) {
            next(e);
        }
    }

    async postComments(req, res, next) {
        try {
            const commentCreatDTO = new CommentCreateReqDTO(req);
            const result = await this.service.createComment(commentCreatDTO);
            console.log(`comment controller post comment result :`, result);

            return res.status(201).json(new Created(result));
        } catch (e) {
            next(e);
        }
    }
}

module.exports = CommentController;
