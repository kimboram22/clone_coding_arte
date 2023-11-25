class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
    }

    getCreate(req, res) {
        res.render("board/create");
    }
    async postCreate(req, res, next) {}
    async getMain(req, res, next) {
        try {
            // const error = req.error ? req.error : undefined;
            // const user = req.user ? req.user : undefined;

            res.render("index");
        } catch (e) {
            next(e);
        }
    }
    async getOnePost(req, res, next) {
        try {
            res.render("board/view");
        } catch (e) {
            next(e);
        }
    }
    async getModify(req, res, next) {
        try {
            res.render("board/modify");
        } catch (e) {
            next(e);
        }
    }
    async postDelete(req, res, next) {}
    async postLike(req, res, next) {}
}

module.exports = BoardController;
