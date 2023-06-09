
const { validateInputCreateCart, validateStatus } = require("./cart.validation")
const status = require("./cart.response-status");
const { Op } = require("sequelize");


module.exports = {
    getAllCarts: async (req, res) => {
        let { page, size, freeWord } = req.query
        let offset = 0
        let limit = 10
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
                    "status",
                    "note",
                    "address",
                    "numberPhone",
                    "quantity",
                    "fullName"
                ],
                include: [
                    {
                        model: appman.db.Users,
                        as: "cart",
                        attributes: [
                            "userName",
                            "email",
                            "gender",
                            "age",
                            "address",
                            "numberPhone"
                        ],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: "avatar_user",
                                attributes: [
                                    "image",
                                    "cloudId",
                                ],
                            }

                        ]
                    },
                    {
                        model: appman.db.Books,
                        as: "book",
                        attributes: [
                            "id",
                            "title",
                            "description",
                            "price",
                            "author",
                            "category",
                            "numberPage",
                            "releaseDate",
                        ],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: "avatar_book",
                                attributes: [
                                    "image",
                                    "cloudId",
                                ],
                            }
                        ]
                    }
                ],
                where: {
                    status: {
                        [Op.not]: "in-cart"
                    }
                },
                order: [["createdAt", "DESC"]],
            }
            if (freeWord) {
                operator.where.fullName = {
                    [Op.like]: "%" + freeWord + "%"
                }
            }
            const listCarts = await appman.db.Carts.findAndCountAll(operator)
            return appman.response.apiSuccess(res, listCarts);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    getAllCartsForLP: async (req, res) => {
        try {
            const { statusCart } = req.query;
            const userId = req.user.id
            const operator = {
                attributes: [
                    "id",
                    "status",
                    "note",
                    "address",
                    "numberPhone",
                    "quantity",
                    "fullName",
                    "createdAt"
                ],
                include: [
                    {
                        model: appman.db.Users,
                        as: "cart",
                        attributes: [
                            "userName",
                            "email",
                            "gender",
                            "age",
                            "address",
                            "numberPhone",
                        ],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: "avatar_user",
                                attributes: [
                                    "image",
                                    "cloudId",
                                ],
                            }

                        ]
                    },
                    {
                        model: appman.db.Books,
                        as: "book",
                        attributes: [
                            "id",
                            "title",
                            "description",
                            "price",
                            "author",
                            "category",
                            "numberPage",
                            "releaseDate",
                        ],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: "avatar_book",
                                attributes: [
                                    "image",
                                    "cloudId",
                                ],
                            }
                        ]
                    }
                ],
                where: {
                    userId: userId,
                },
                order: [["createdAt", "DESC"]],
            }
            if (statusCart === "in-cart") {
                operator.where.status = statusCart
            }
            else {
                operator.where.status = {
                    [Op.not]: "in-cart"
                }
            }
            const cartExits = await appman.db.Carts.findAndCountAll(operator)
            return appman.response.apiSuccess(res, cartExits);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    getCartsDetails: async (req, res) => {
        try {
            const { cartId } = req.params;
            const operator = {
                attributes: [
                    "status",
                    "note",
                    "address",
                    "numberPhone",
                    "quantity"
                ],
                include: [
                    {
                        model: appman.db.Users,
                        as: "cart",
                        attributes: [
                            "userName",
                            "email",
                            "gender",
                            "age",
                            "address",
                            "numberPhone",
                        ],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: "avatar_user",
                                attributes: [
                                    "image",
                                    "cloudId",
                                ],
                            }

                        ]
                    },
                    {
                        model: appman.db.Books,
                        as: "book",
                        attributes: [
                            "id",
                            "title",
                            "description",
                            "price",
                            "author",
                            "category",
                            "numberPage",
                            "releaseDate",
                        ],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: "avatar_book",
                                attributes: [
                                    "image",
                                    "cloudId",
                                ],
                            }
                        ]
                    }
                ],
                where: {
                    id: cartId
                }
            }
            const cartDetails = await appman.db.Carts.findOne(operator)
            if (cartDetails) {
                return appman.response.apiSuccess(res, cartDetails);
            } else {
                return appman.response.resApiError(res, 403, status[403]);
            }
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    createNewCartForLP: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const userId = req.user.id;
            const {
                bookId,
                fullName,
                status,
                note,
                address,
                numberPhone,
                quantity
            } = req.body
            await validateInputCreateCart.validateAsync(req.body)
            const userExists = await appman.db.Users.findOne({
                where: {
                    id: userId,
                }
            })
            if (!userExists) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const bookExists = await appman.db.Books.findAll({
                where: {
                    id: bookId,
                }
            })
            if (!bookExists) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const newCart = await appman.db.Carts.create({
                userId,
                bookId,
                fullName,
                status,
                quantity,
                note,
                address,
                numberPhone,
            }, {
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, newCart);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
    deleteCartForCMS: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { cartId } = req.params
            const cartExits = await appman.db.Carts.findAll({
                where: {
                    id: cartId,
                }
            })
            if (cartExits) {
                const deleteCart = await appman.db.Carts.destroy({
                    where: {
                        id: cartId,
                    }
                }, {
                    transaction
                })
                await transaction.commit()
                return appman.response.apiSuccess(res, deleteCart);
            }
            else {
                return appman.response.resApiError(res, 403, status[402]);
            }
        } catch (error) {
            await transaction.rollback()
            return appman.response.systemError(res, error)
        }
    },

    editCart: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { cartId } = req.params
            const {
                status,
            } = req.body
            await validateStatus.validateAsync(status)
            const cartExits = await appman.db.Carts.findOne({
                where: {
                    id: cartId,
                }
            })
            if (cartExits) {
                const cartUpdate = await appman.db.Carts.update({
                    status,
                }, {
                    where: {
                        id: cartId,
                    }, transaction
                })
                await transaction.commit()
                return appman.response.apiSuccess(res, cartUpdate);
            } else {
                return appman.response.resApiError(res, 403, status[402]);
            }
        } catch (error) {
            await transaction.rollback()
            return appman.response.systemError(res, error)
        }
    },
    editCartForLP: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { cartId } = req.params
            const userId = req.user.id
            const {
                bookId,
                status,
                note,
                address,
                fullName,
                numberPhone,
                quantity
            } = req.body
            await validateInputCreateCart.validateAsync(req.body)
            const cartExits = await appman.db.Carts.findOne({
                where: {
                    id: cartId,
                }
            })
            if (cartExits) {
                const cartUpdate = await appman.db.Carts.update({
                    userId,
                    bookId,
                    status,
                    note,
                    fullName,
                    address,
                    numberPhone,
                    quantity
                }, {
                    where: {
                        id: cartId,
                    },
                    transaction
                })
                await transaction.commit()
                return appman.response.apiSuccess(res, cartUpdate);
            } else {
                return appman.response.resApiError(res, 403, status[402]);
            }
        } catch (error) {
            await transaction.rollback()
            return appman.response.systemError(res, error)
        }
    },
    deleteCartForLP: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { cartId } = req.params
            const cartExits = await appman.db.Carts.findOne({
                where: {
                    id: cartId,
                }
            })
            if (cartExits) {
                const deleteCart = await appman.db.Carts.destroy({
                    where: {
                        id: cartId,
                    }
                }, {
                    transaction
                })
                await transaction.commit()
                return appman.response.apiSuccess(res, deleteCart);
            }
            else {
                return appman.response.resApiError(res, 403, status[402]);
            }
        } catch (error) {
            await transaction.rollback()
            return appman.response.systemError(res, error)
        }
    }
}