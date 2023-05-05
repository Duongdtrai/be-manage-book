
const status = require("./cart.response-status");
const Sequelize = require("sequelize");
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
                    "quantity"
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
            const { userId } = req.params;
            const operator = {
                distinct: true,
                attributes: [
                    "id",
                    "status",
                    "quantity"
                ],
                where: {
                    userId
                },
            	order: [["createdAt", "DESC"]],
            }
            const cartExits = await appman.db.Carts.findOne(operator)
            if (cartExits) {
                return appman.response.apiSuccess(res, cartExits);
            } else {
                return appman.response.resApiError(res, 403, status[400]);
            }
          
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    getCartsDetails: async (req, res) => {
        try {
            const { cartId } = req.params;
            const operator = {
                attributes: [
                    "id",
                    "status",
                    "quantity"
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
            const { userId, bookId, status, quantity } = req.body
            const userExists = await appman.db.Users.findAll({
                where: {
                    id: userId,
                }
            })
            if (userExists.length === 0) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const bookExists = await appman.db.Users.findAll({
                where: {
                    id: bookId,
                }
            })
            if (bookExists.length === 0) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const newCart = await appman.db.Carts.create({
                userId,
                bookId,
                status,
                quantity
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
            if (cartExits && cartExits.length > 0) {
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
            const { status } = req.query
            const cartExits = await appman.db.Carts.findAll({
                where: {
                    id: cartId,
                }
            })
            if (cartExits && cartExits.length > 0) {
                const cartUpdate = await appman.db.Carts.update({
                    status
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
        try {
            const { cartId } = req.params
            const { quantity } = req.query
            const cartExits = await appman.db.Carts.findAll({
                where: {
                    id: cartId,
                }
            })
            if (cartExits && cartExits.length > 0) {
                const cartUpdate = await appman.db.Carts.update({
                    quantity
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
    deleteCartForLP: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { cartId } = req.params
            const cartExits = await appman.db.Carts.findAll({
                where: {
                    id: cartId,
                }
            })
            if (cartExits && cartExits.length > 0) {
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