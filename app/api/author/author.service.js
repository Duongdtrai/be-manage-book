
const status = require("./author.response-status");

module.exports = {
    getAllAuthor: async (req, res) => {
        let { page, size } = req.query;
        let offset = 0;
        let limit = 10;
        if (page && size) {
            offset = (Number(page) - 1) * Number(size)
        }
        if (size) {
            limit = Number(size)
        }
        try {
            const operator = {
                limit,
                offset,
                distinct: true,
                attributes: [
                    "id",
                    "fullName",
                    "image",
                    "description",
                    "birthday",
                    "address",
                    "gender",
                    "createdAt",
                    "updatedAt"
                ],
                order: [["createdAt", "DESC"]],
            }
            const listAuthors = await appman.db.Authors.findAndCountAll(operator)
            return appman.response.apiSuccess(res, listAuthors);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    getAuthorById: async (req, res) => {
        try {
            const { authorId } = req.params
            const operator = {
                distinct: true,
                attributes: [
                    "id",
                    "fullName",
                    "image",
                    "description",
                    "birthday",
                    "address",
                    "gender",
                    "createdAt",
                    "updatedAt"
                ],
                where: {
                    id: authorId
                },
            }
            const authorExist = await appman.db.Authors.findOne(operator)
            if (!authorExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            return appman.response.apiSuccess(res, authorExist);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    createAuthor: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const {
                fullName,
                image,
                description,
                birthday,
                address,
                gender,
            } = req.body
            const author = await appman.db.Authors.create({
                fullName,
                image,
                description,
                birthday,
                address,
                gender,
            }, {
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, author);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
    editAuthor: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction()
        try {
            const {
                fullName,
                image,
                description,
                birthday,
                address,
                gender,
            } = req.body
            const { authorId } = req.params
            const authorExist = await appman.db.Authors.findOne({
                where: { id: authorId }
            })

            if (authorExist) {
                const author = await appman.db.Authors.update({
                    fullName,
                    image,
                    description,
                    birthday,
                    address,
                    gender,
                }, {
                    where: {
                        id: authorId
                    },
                    transaction
                })
                await transaction.commit();
                return appman.response.apiSuccess(res, author);
            }
            else {
                return appman.response.resApiError(res, 403, status[400]);
            }

        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
    deleteAuthor: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { authorId } = req.params
            const authorExist = await appman.db.Authors.findOne(
                {
                    where: {
                        id: authorId
                    }
                }
            )
            const authorBookExist = await appman.db.Books.findAll({
                where: {
                    author: authorId
                }
            })
            if (authorBookExist && authorBookExist.length > 0) {
                return appman.response.resApiError(res, 403, status[401]);
            }
            if (!authorExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            // delete book
            const deleteBook = await appman.db.Authors.destroy({
                where: {
                    id: authorId
                }
            }, {
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, deleteBook);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
    getAllAuthorForLP: async (req, res) => {
        let { page, size } = req.query;
        let offset = 0;
        let limit = 10;
        if (page && size) {
            offset = (Number(page) - 1) * Number(size)
        }
        if (size) {
            limit = Number(size)
        }
        try {
            const operator = {
                limit,
                offset,
                distinct: true,
                attributes: [
                    "id",
                    "fullName",
                    "image",
                    "description",
                    "birthday",
                    "address",
                    "gender",
                    "createdAt",
                    "updatedAt"
                ],
                order: [["createdAt", "DESC"]],
            }
            const listAuthors = await appman.db.Authors.findAndCountAll(operator)
            return appman.response.apiSuccess(res, listAuthors);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    getAuthorForLPById: async (req, res) => {
        try {
            const { authorId } = req.params
            const operator = {
                limit,
                offset,
                distinct: true,
                attributes: [
                    "id",
                    "fullName",
                    "description",
                    "birthday",
                    "address",
                    "gender",
                    "createdAt",
                    "updatedAt"
                ],
                where: {
                    id: authorId
                },
            }
            const authorExist = await appman.db.Authors.findOne(operator)
            if (!authorExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            return appman.response.apiSuccess(res, authorExist);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
}