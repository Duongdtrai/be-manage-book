const { validateInputCreateAuthor } = require("./author.validation")
const status = require("./author.response-status");
const cloudinaryV2 = require("../../core/cloudinary/cloudinary.service")
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

module.exports = {
    getAllAuthor: async (req, res) => {
        let { page, size, freeWord } = req.query;
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
                    "description",
                    "birthday",
                    "address",
                    "gender",
                    "imageId",
                    "createdAt",
                    "updatedAt"
                ],
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar',
                        attributes: ["id", "image", "cloudId"],
                    },
                ],
                where: {},
                order: [["createdAt", "DESC"]],
            }
            if (freeWord) {
                operator.where = {
                    fullName: {
                        [Op.like]: "%" + freeWord + "%",
                    }
                }
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
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar',
                        attributes: ["id", "image", "cloudId"],
                    }
                ]
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
            await validateInputCreateAuthor.validateAsync(req.body)
            let imageCreate = null
            if (image && image.image && image.cloudId) {
                imageCreate = await appman.db.Avatars.create({
                    image: image.image,
                    cloudId: image.cloudId
                }, {
                    transaction
                })
            }
            const author = await appman.db.Authors.create({
                fullName,
                imageId: imageCreate.id || null,
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
            await validateInputCreateAuthor.validateAsync(req.body)
            const { authorId } = req.params
            const authorExist = await appman.db.Authors.findOne({
                where: { id: authorId }
            })

            if (authorExist) {
                let newImage = null
                if (image && image.image && image.cloudId) {
                    if (authorExist.imageId) {
                        await appman.db.Avatars.update({
                            image: image.image,
                            cloudId: image.cloudId
                        }, {
                            where: { id: authorExist.imageId },
                            transaction
                        })
                    } else {
                        newImage = await appman.db.Avatars.create({
                            image: image.image,
                            cloudId: image.cloudId
                        }, {
                            transaction
                        })
                    }
                }
                const author = await appman.db.Authors.update({
                    imageId: authorExist.imageId || newImage.id,
                    fullName,
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
            if (!authorExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const authorBookExist = await appman.db.Books.findOne({
                where: {
                    id: authorId
                }
            })
            if (authorBookExist && authorBookExist.length > 0) {
                return appman.response.resApiError(res, 403, status[401]);
            }
            const avatarAuthorExist = await appman.db.Avatars.findOne({
                where: {
                    id: authorExist.imageId
                }
            })
            // delete image
            if (avatarAuthorExist) {
                await avatarAuthorExist.destroy({
                    where: {
                        id: avatarAuthorExist.imageId
                    }
                })
                await cloudinaryV2.uploader.destroy(avatarAuthorExist.cloudId)
            }
            // delete author
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
    uploadImageCms: async (req, res) => {
        try {
            const dataCloud = await cloudinaryV2.uploader.upload(req.file.path, { folder: 'ImageBookWeb' })
            return appman.response.apiSuccess(res, {
                image: dataCloud.secure_url,
                cloudId: dataCloud.public_id,
            });
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
}