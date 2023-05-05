
const status = require("./cart.response-status");
const sequelize = require("sequelize");


module.exports = {
    getAllCarts: async (req, res) => {
        let { page, size } = req.query
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
                distinct: true,
                attributes: [
                    "id",
                    "status",
                    "note",
                    "address",
                    "numberPhone",
                    "quantity"
                ],
                include: [
                    {
                        model: appman.db.Users,
                        as: "user",
                        attributes: [
                            "username",
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
                order: [["createdAt", "DESC"]],
            }
            const listCarts = await appman.db.Carts.findAndCountAll(operator)
            return appman.response.apiSuccess(res, listCarts);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    getAllCartsForLP: async (req, res) => {
        try {
            const { statusCart } = req.body;
            const userId = req.user.id
            const operator = {
                distinct: true,
                attributes: [
                    "id",
                    "status",
                    "note",
                    "address",
                    "numberPhone",
                    "quantity"
                ],
                include: [
                    {
                        model: appman.db.Users,
                        as: "user",
                        attributes: [
                            "username",
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
            if (statusCart) {
                operator.where.status = statusCart
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
                        as: "user",
                        attributes: [
                            "username",
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
            const {
                userId,
                bookId,
                status,
                note,
                address,
                numberPhone,
                quantity
            } = req.body
            const userExists = await appman.db.Users.findOne({
                where: {
                    id: userId,
                }
            })
            if (!userExists) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const bookExists = await appman.db.Users.findAll({
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
                userId,
                bookId,
                status,
                note,
                address,
                numberPhone,
                quantity
            } = req.body
            const cartExits = await appman.db.Carts.findOne({
                where: {
                    id: cartId,
                }
            })
            if (cartExits) {
                const cartUpdate = await appman.db.Carts.update({
                    status,
                    note,
                    address,
                    numberPhone,
                    quantity,
                    userId,
                    bookId,
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
            const {
                userId,
                bookId,
                status,
                note,
                address,
                numberPhone,
                quantity
            } = req.body
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