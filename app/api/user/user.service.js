


const { Op } = require("sequelize");
const sequelize = require("sequelize");
const userFunc = require("./user.func");
const jwt = require('jsonwebtoken');
module.exports = {
    loginForCms: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { email, password } = req.body;
            const userExist = await appman.db.Users.findOne({
                where: {
                    email
                }
            });
            if (userExist && await userFunc.checkPassword(password, userExist.password)) {
                const token = await userFunc.loginCms(userExist)
                await transaction.commit();
                return appman.response.apiSuccess(res, {
                    token: token,
                    userId: userExist.id,
                    role: userExist.role
                });
            } else {
                throw new Error("Không có account này hoặc sai mật khẩu")
            }
        } catch (error) {
            await transaction.rollback()
            return appman.response.systemError(res, error);
        }
    },
    loginForLP: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { email, password } = req.body;
            const userExist = await appman.db.Users.findOne({
                where: {
                    email,
                    role: 1
                }
            });
            if (userExist && await userFunc.checkPassword(password, userExist.password)) {
                const {token, refreshToken} = await userFunc.loginLP(userExist)
                console.log("token", token);
                console.log("refreshToken", refreshToken);

                return appman.response.apiSuccess(res, {
                    token: token,
                    refreshToken: refreshToken,
                    userId: userExist.id,
                    role: userExist.role
                });
            } else {
                throw new Error("Không có account này hoặc sai mật khẩu")
            }
        } catch (error) {
            await transaction.rollback()
            return appman.response.systemError(res, error);
        }
    },
    register: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const {
                avatar,
                email,
                password,
                gender,
                age,
                address,
                numberPhone
            } = req.body;
            const userExist = await appman.db.Users.findOne({
                where: {
                    email: email,
                }
            });
            var newUser = null
            if (userExist) {
                throw new Error("Trùng email")
            } else {
                const passSecurity = await userFunc.genPassword(password)
                newUser = await userFunc.register({ avatar, email, passSecurity, gender, age, address, numberPhone }, transaction)
                const token = jwt.sign({ userId: newUser.id, role: 1 }, process.env.SECRET_OR_KEY, { expiresIn: '15m' })
                const refreshToken = jwt.sign({ userId: newUser.id, role: 1 }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
                await appman.db.Tokens.create({
                    token,
                    refreshToken,
                    userId: newUser.id
                }, {
                    transaction
                })
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, newUser);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },

    logout: (req, res) => {

    },

    forgotPassword: (req, res) => {

    },
    refreshToken: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { userId } = req.query
            const userExist = appman.db.Users.findOne({
                where: {
                    id: userId,
                    role: 1
                }
            })
            if (userExist) {
                const token = jwt.sign({ userId: userId, role: 1 }, process.env.SECRET_OR_KEY, { expiresIn: '15m' })
                const refreshToken = jwt.sign({ userId: userId, role: 1 }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
                const tokenData = await appman.db.Tokens.update({
                    token,
                    refreshToken
                }, {
                    where: { id: userId },
                    transaction
                })
                await transaction.commit();
                return appman.response.apiSuccess(res, tokenData);
            }
            else {
                throw new Error("không tìm thấy user")
            }

        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },
    changePasswordCms: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { password, newPassword } = req.body;
            let checkPass = await userFunc.checkPassword(password, req.user['dataValues'].password)
            if (checkPass) {
                var user = await appman.db.Users.update(
                    {
                        password: await userFunc.genPassword(newPassword) 
                    },
                    {
                        where: {
                            id: req.user['dataValues'].id,
                            role: 2
                        },
                        transaction
                    }
                )
          
            }
            else {
                throw new Error("Password không đúng")
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, user);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }

    },
    changePasswordLP:  async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { password, newPassword } = req.body;
            const checkPass = await userFunc.checkPassword(password, req.user['dataValues'].password)
            if (checkPass) {
                var user = await appman.db.Users.update(
                    {
                        password: await userFunc.genPassword(newPassword)
                    },
                    {
                        where: {
                            id: req.user['dataValues'].id,
                            role: 1
                        },
                        transaction
                    }
                )
          
            }
            else {
                throw new Error("Password không đúng")
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, user);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },
    getUserDetails: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const userId = req.params.userId;
            const userExist = await appman.db.Users.findOne({
                where: {
                    id: userId,
                }
            });
            if (!userExist) {
                throw new Error("Không tìm thấy user nào")
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, userExist);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },
    getUserDetailsForLP:  async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const userId = req.params.userId;
            const userExist = await appman.db.Users.findOne({
                where: {
                    id: userId,
                }
            });
            if (!userExist) {
                throw new Error("Không tìm thấy user nào")
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, userExist);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },
}