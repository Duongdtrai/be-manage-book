


const userFunc = require("./user.func");
const {validateInputCreateUser, validateInputLoginUser, validateInputEditUser} = require("./user.validation");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SYSTEM_ADMIN } = require('../../core/database/constant/user')
const cloudinaryV2 = require("../../core/cloudinary/cloudinary.service")
const status = require('./user.response-status');
const { Op, literal } = require("sequelize");

module.exports = {
    loginForCms: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const { email, password } = req.body;
            await validateInputLoginUser.validateAsync(req.body)
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
                return appman.response.apiError(res, {
                    message: "Không có account này hoặc sai mật khẩu"
                })
            }
        } catch (error) {
            await transaction.rollback()
            return appman.response.systemError(res, error);
        }
    },

    loginForLP: async (req, res) => {
        try {
            const { email, password } = req.body;
            await validateInputLoginUser.validateAsync(req.body)
            const userExist = await appman.db.Users.findOne({
                where: {
                    email,
                    role: SYSTEM_ADMIN.USER
                }
            });
            if (userExist && await userFunc.checkPassword(password, userExist.password)) {
                const { token, refreshToken } = await userFunc.loginLP(userExist)
                return appman.response.apiSuccess(res, {
                    token: token,
                    refreshToken: refreshToken,
                    userId: userExist.id,
                    role: userExist.role
                });
            } else {
                return appman.response.apiError(res, {
                    message: "Không có account này hoặc sai mật khẩu"
                })
            }
        } catch (error) {
            return appman.response.systemError(res, error);
        }
    },

    logout: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const userId = req.user.id;
            const tokenExists = await appman.db.Tokens.findOne({
                where: {
                    userId
                }
            })
            if (tokenExists) {
                const tokenDelete = await appman.db.Tokens.destroy({
                    where: {
                        userId
                    }
                },
                    transaction
                )
                await transaction.commit();
                return appman.response.apiSuccess(res, tokenDelete);
            }
            else {
                return appman.response.resApiError(res, 403, status[400]);
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
                image,
                email,
                password,
                gender,
                age,
                address,
                numberPhone,
                userName
            } = req.body;
            await validateInputCreateUser.validateAsync(req.body);
            const userExist = await appman.db.Users.findOne({
                where: {
                    email: email,
                }
            });
            var newUser = null
            if (userExist) {
                return appman.response.apiError(res, {
                    message: "Trùng email"
                })
            } else {
                let imageCreate = null
                if (image && image.image && image.cloudId) {
                    imageCreate = await appman.db.Avatars.create({
                        image: image.image,
                        cloudId: image.cloudId
                    }, {
                        transaction
                    })
                }
                const imageId = imageCreate?.id || null
                const passSecurity = await userFunc.genPassword(password)
                newUser = await userFunc.register({ imageId, email, passSecurity, gender, age, address, numberPhone, userName }, transaction)
                const token = jwt.sign({ userId: newUser.id, role: 1 }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
                const refreshToken = jwt.sign({ userId: newUser.id, role: 1 }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
                await appman.db.Tokens.create({
                    token,
                    refreshToken,
                    userId: newUser.id
                }, {
                    transaction
                })
                await transaction.commit();
                return appman.response.apiSuccess(res, {
                    email: newUser.email,
                    role: newUser.role,
                    token,
                    refreshToken,
                });
            }

        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },

    editUser: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const userId = req.user.id
            const {
                userName,
                gender,
                age,
                address,
                numberPhone,
                image
            } = req.body;
            await validateInputEditUser.validateAsync(req.body);
            let newImage = null
            if (image && image.image && image.cloudId) {
                if (req.user.imageId) {
                    await appman.db.Avatars.update({
                        image: image.image,
                        cloudId: image.cloudId
                    }, {
                        where: {
                            id: req.user.imageId
                        },
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
            const dataEdit = await appman.db.Users.update({
                imageId: req.user.imageId || newImage.id,
                username: userName,
                gender,
                age,
                address,
                numberPhone,
            }, {
                where: {
                    id: userId
                }, transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, dataEdit);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },

    refreshToken: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const userId = req.user.id;
            const role = req.user.role;
            const token = jwt.sign({ userId: userId, role: role }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
            const refreshToken = jwt.sign({ userId: userId, role: role }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
            const tokenData = await appman.db.Tokens.update({
                token,
                refreshToken: role === SYSTEM_ADMIN.ADMIN ? token : refreshToken
            }, {
                where: { id: userId },
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, tokenData);
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
                return appman.response.apiError(res, {
                    message: "Password không đúng"
                })
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, user);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }

    },

    changePasswordLP: async (req, res) => {
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
                await transaction.commit();
                return appman.response.apiSuccess(res, user);
            }
            else {
                return appman.response.apiError(res, {
                    message: "Password không đúng"
                })
            }
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },
    getAllUser: async (req, res) => {
        try {
            const { page, size, freeWord } = req.query
            let offset = 0
            let limit = 10
            if (page && size) {
                offset = (Number(page) - 1) * Number(size)
            }
            if (size) {
                limit = Number(size)
            }
            const operator = {
                offset,
                limit,
                distinct: true,
                attributes: ['email', 'userName', 'gender', 'age', 'address', 'numberPhone'],
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_user',
                        attributes: ["image", "cloudId"]
                    }
                ],
                where: {
                    role: SYSTEM_ADMIN.USER
                }
            }

            if (freeWord) {
                operator.where = {
                    userName: {
                        [Op.like]: "%" + freeWord + "%"
                    }
                }
            }
            const userExist = await appman.db.Users.findAndCountAll(operator);
            return appman.response.apiSuccess(res, userExist);
        } catch (error) {
            return appman.response.systemError(res, error);
        }
    },

    getUserDetailsCMS: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const userId = req.user['dataValues'].id
            const userExist = await appman.db.Users.findOne({
                attributes: ['email', 'userName', 'gender', 'age', 'address', 'numberPhone'],
                include: [
                    // {
                    //     model: appman.db.Books,
                    //     as: "bookCart",
                    //     attributes: ["title", "description", "price", "numberPage", "releaseDate"],
                    //     include: [
                    //         {
                    //             model: appman.db.Avatars,
                    //             as: 'avatar_book',
                    //             attributes: ['image', 'cloudId']
                    //         },
                    //         {
                    //             model: appman.db.Categories,
                    //             as: 'category_book',
                    //             attributes: ['title'],
                    //             include: [
                    //                 {
                    //                     model: appman.db.Avatars,
                    //                     as: 'avatar_category',
                    //                     attributes: ['image', 'cloudId']
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             model: appman.db.Authors,
                    //             as: 'author_book',
                    //             attributes: ['fullName', 'description', 'birthday', 'address', 'gender'],
                    //             include: [
                    //                 {
                    //                     model: appman.db.Avatars,
                    //                     as: 'avatar',
                    //                     attributes: ['image', 'cloudId']
                    //                 }
                    //             ]
                    //         }
                    //     ],
                    //     through: {
                    //         model: appman.db.Carts,
                    //         attributes: ["status", "note", "address", "numberPhone"],
                    //     }
                    // },
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_user',
                        attributes: ["image", "cloudId"]
                    }
                ],
                where: {
                    id: userId,
                    role: SYSTEM_ADMIN.ADMIN
                }
            });
            if (!userExist) {
                return appman.response.apiError(res, {
                    message: "Không tìm thấy user nào"
                })
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, userExist);
        } catch (error) {
            // await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },
    getUserDetailsForLP: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction();
        try {
            const userId = req.user.id;
            const userExist = await appman.db.Users.findOne({
                attributes: [
                    'email',
                    'userName',
                    'gender',
                    'age',
                    'address',
                    'numberPhone',
                    [literal('(SELECT COUNT(*) FROM Carts WHERE Carts.userId = Users.id AND Carts.status LIKE "%in-cart%")'), 'countCart']
                ],
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_user',
                        attributes: ["image", "cloudId"]
                    },
                    {
                        model: appman.db.Carts,
                        as: "cart",
                        attributes: [
                            "id",
                            "status",
                            "address",
                            "quantity",
                            "createdAt"
                        ],
                        where: {
                            status: {
                                [Op.like]: "%" + "in-cart" + "%"
                            }
                        },
                        required: false // không ảnh hưởng đến quá trình ở ngoài
                    }
                ],
                where: {
                    id: userId,
                    role: SYSTEM_ADMIN.USER
                }
            });
            if (!userExist) {
                return appman.response.apiError(res, {
                    message: "Không tìm thấy user"
                })
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, userExist);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error);
        }
    },

    uploadImageCms: async (req, res) => {
        try {
            const dataCloud = await cloudinaryV2.uploader.upload(req.file.path, { folder: 'ImageUserWeb' })
            return appman.response.apiSuccess(res, {
                image: dataCloud.secure_url,
                cloudId: dataCloud.public_id,
            });
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },

    uploadImageLP: async (req, res) => {
        try {
            const dataCloud = await cloudinaryV2.uploader.upload(req.file.path, { folder: 'ImageUserWeb' })
            return appman.response.apiSuccess(res, {
                image: dataCloud.secure_url,
                cloudId: dataCloud.public_id,
            });
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
}