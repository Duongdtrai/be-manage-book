const { validateInputCreateComment } = require("./comment.validation")
const status = require("./comment.response-status");

module.exports = {
    createCommentForLP: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const userId = req.user.id;
            const {
                bookId,
                comment,
                star
            } = req.body
            await validateInputCreateComment.validateAsync(req.body)
            const bookExist = await appman.db.Books.findOne({
                where: {
                    id: bookId,
                }
            })
            if (!bookExist) {
                return appman.response.resApiError(res, 403, status[401]);
            }
            const commentNew = await appman.db.BookComments.create({
                userId,
                bookId,
                comment,
                star
            }, {
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, commentNew);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },

    deleteCommentForCms: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { commentId } = req.params
            const commentExist = await appman.db.BookComments.findOne(
                {
                    where: {
                        id: commentId
                    }
                }
            )
            if (!commentExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const deleteComment = await appman.db.BookComments.destroy({
                where: {
                    id: commentId
                }
            }, {
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, deleteComment);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },


    deleteCommentForLP: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { commentId } = req.params
            const commentExist = await appman.db.BookComments.findOne(
                {
                    where: {
                        id: commentId
                    }
                }
            )
            if (!commentExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const deleteComment = await appman.db.BookComments.destroy({
                where: {
                    id: commentId
                }
            }, {
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, deleteComment);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
}