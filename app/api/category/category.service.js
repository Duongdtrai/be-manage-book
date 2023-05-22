const { validateInputCreateCategory } = require("./category.validation")
const status = require("./category.response-status");
const cloudinaryV2 = require("../../core/cloudinary/cloudinary.service")
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

module.exports = {
    getAllCategory: async (req, res) => {
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
                attributes: [
                    "id",
                    "title",
                    "createdAt",
                    "updatedAt"
                ],
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_category',
                        attributes: ["id", "image", "cloudId"],
                    },
                ],
                where: {},
                order: [["createdAt", "DESC"]],
            }
            if (freeWord) {
                operator.where = {
                    title: {
                        [Op.like]: "%" + freeWord + "%",
                    }
                }
            }
            const listCategories = await appman.db.Categories.findAndCountAll(operator)
            return appman.response.apiSuccess(res, listCategories);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const { categoryId } = req.params
            const operator = {
                attributes: [
                    "id",
                    "title",
                    "createdAt",
                    "updatedAt"
                ],
                where: {
                    id: categoryId
                },
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_category',
                        attributes: ["id", "image", "cloudId"],
                    },
                ]
            }
            const authorExist = await appman.db.Categories.findOne(operator)
            if (!authorExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            return appman.response.apiSuccess(res, authorExist);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    createCategory: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const {
                title,
                image,
            } = req.body
            await validateInputCreateCategory.validateAsync(req.body)
            let imageCreate = null
            if (image && image?.image && image?.cloudId) {
                imageCreate = await appman.db.Avatars.create({
                    image: image.image,
                    cloudId: image.cloudId
                }, {
                    transaction
                })
            }
            const category = await appman.db.Categories.create({
                title,
                imageId: imageCreate?.id || null,
            }, {
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, category);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
    editCategory: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction()
        try {
            const { categoryId } = req.params
            const {
                title,
                image,
            } = req.body
            await validateInputCreateCategory.validateAsync(req.body)
            const categoryExist = await appman.db.Categories.findOne({
                where: { id: categoryId }
            })

            if (categoryExist) {
                let newImage = null
                if (image && image.image && image.cloudId) {
                    if (categoryExist.imageId) {
                        await appman.db.Avatars.update({
                            image: image.image,
                            cloudId: image.cloudId
                        }, {
                            where: { id: categoryExist.imageId },
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
                const category = await appman.db.Categories.update({
                    title,
                    imageId: categoryExist?.imageId || newImage?.id
                }, {
                    where: {
                        id: categoryId
                    },
                    transaction
                })
                await transaction.commit();
                return appman.response.apiSuccess(res, category);
            } else {
                return appman.response.resApiError(res, 403, status[400]);
            }
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
    deleteCategory: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { categoryId } = req.params
            const categoryExist = await appman.db.Categories.findOne(
                {
                    where: {
                        id: categoryId
                    }
                }
            )
            if (!categoryExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const categoryBookExist = await appman.db.Books.findOne({
                where: {
                    category: categoryId
                }
            })
            if (categoryBookExist) {
                return appman.response.resApiError(res, 403, status[401]);
            }
            const avatarCategoryExist = await appman.db.Avatars.findOne({
                where: {
                    id: categoryExist.imageId
                }
            })
            // delete image
            if (avatarCategoryExist) {
                await avatarCategoryExist.destroy({
                    where: {
                        id: avatarCategoryExist.imageId
                    }
                })
                await cloudinaryV2.uploader.destroy(avatarCategoryExist.cloudId)
            }
            // delete category
            const deleteCategory = await appman.db.Categories.destroy({
                where: {
                    id: categoryId
                }
            }, {
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, deleteCategory);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },

    getAllCategoryForLP: async (req, res) => {
        try {
            const operator = {
                attributes: [
                    "id",
                    "title",
                ],
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_category',
                        attributes: ['image']
                    }
                ],
                order: [["createdAt", "DESC"]],
            }
            const listCategories = await appman.db.Categories.findAndCountAll(operator)
            return appman.response.apiSuccess(res, listCategories);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    getCategoryForLPById: async (req, res) => {
        try {
            const { categoryId } = req.params
            const operator = {
                attributes: [
                    "id",
                    "title",
                ],
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_category',
                        attributes: ['image']
                    }
                ],
                where: {
                    id: categoryId
                },
            }
            const categoryExist = await appman.db.Categories.findOne(operator)
            if (!categoryExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            return appman.response.apiSuccess(res, categoryExist);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    uploadImageCms: async (req, res) => {
        try {
            const dataCloud = await cloudinaryV2.uploader.upload(req.file.path, { folder: 'ImageCategoryWeb' })
            return appman.response.apiSuccess(res, {
                image: dataCloud.secure_url,
                cloudId: dataCloud.public_id,
            });
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
}