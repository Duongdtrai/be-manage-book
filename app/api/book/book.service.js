const { validateInputCreateBook } = require("./book.validation")
const status = require("./book.response-status");
const cloudinaryV2 = require("../../core/cloudinary/cloudinary.service")
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

module.exports = {
    getAllBooksLP: async (req, res) => {
        let { page, size, category, author, freeWord } = req.query;
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
                    "description",
                    "price",
                    "numberPage",
                    "releaseDate",
                    "createdAt",
                    "updatedAt"
                ],
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_book',
                        attributes: ["image"],
                    },
                    {
                        model: appman.db.BookComments,
                        as: 'commentUser',
                        attributes: [
                            "id",
                            "comment",
                            "star",
                        ],
                        include: [
                            {
                                model: appman.db.Users,
                                as: 'user',
                                attributes: [
                                    "userName",
                                    "email",
                                ],
                                include: [{
                                    model: appman.db.Avatars,
                                    as: 'avatar_user',
                                    attributes: ["image"]
                                }]

                            }
                        ],
                        order: [["createdAt", "DESC"]],
                    },
                    {
                        model: appman.db.Authors,
                        as: "author_book",
                    },
                    {
                        model: appman.db.Categories,
                        as: "category_book",
                    }
                ],
                where: {},
                order: [["createdAt", "DESC"]],
            }
            if (category) {
                operator.where.category = category
            }
            if (author) {
                operator.where.author = author
            }
            if (freeWord) {
                operator.where.freeWord = {
                    [Op.like]: "%" + freeWord + "%",
                }
            }
            const listBooks = await appman.db.Books.findAndCountAll(operator)
            const listAll = [];

            for (let index = 0; index < listBooks.rows.length; index++) {
                const book = listBooks.rows[index]['dataValues'];
                const haveBuy = await appman.db.Carts.count({
                    where: {
                        bookId: book.id,
                    },
                });
                book.haveBuy = haveBuy;
                listAll.push(book);
            }
            return appman.response.apiSuccess(res, listAll);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },

    getAllBooks: async (req, res) => {
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
                    "description",
                    "price",
                    "numberPage",
                    "releaseDate",
                    "createdAt",
                    "updatedAt"
                ],
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_book',
                        attributes: ["image"],
                    },
                    {
                        model: appman.db.BookComments,
                        as: 'commentUser',
                        attributes: [
                            "id",
                            "comment",
                            "star",
                        ],
                        include: [
                            {
                                model: appman.db.Users,
                                as: 'user',
                                attributes: [
                                    "userName",
                                    "email",
                                ],
                                include: [{
                                    model: appman.db.Avatars,
                                    as: 'avatar_user',
                                    attributes: ["image"]
                                }]

                            }
                        ],
                        order: [["createdAt", "DESC"]],
                    },
                    {
                        model: appman.db.Authors,
                        as: "author_book",
                        attributes: [
                            "id",
                            "fullName",
                            "description",
                            "birthday",
                            "address",
                            "gender"
                        ],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: 'avatar',
                                attributes: ["image"],
                            }
                        ]
                    },
                    {
                        model: appman.db.Categories,
                        as: "category_book",
                        attributes: ["title"],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: 'avatar_category',
                                attributes: ["image"],
                            }
                        ]
                    }
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
            const listBooks = await appman.db.Books.findAndCountAll(operator)
            return appman.response.apiSuccess(res, listBooks);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },
    getBookDetails: async (req, res) => {
        try {
            const { bookId } = req.params;
            const bookExist = await appman.db.Books.findOne({
                attributes: [
                    "id",
                    "title",
                    "description",
                    "price",
                    "numberPage",
                    "releaseDate",
                    "createdAt",
                    "updatedAt"
                ],
                where: {
                    id: bookId
                },
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_book',
                        attributes: ["image", "cloudId"],
                    },
                    {
                        model: appman.db.BookComments,
                        as: 'commentUser',
                        attributes: [
                            "id",
                            "comment",
                            "star",
                        ],
                        include: [
                            {
                                model: appman.db.Users,
                                as: 'user',
                                attributes: [
                                    "userName",
                                    "email",
                                ],
                                include: [{
                                    model: appman.db.Avatars,
                                    as: 'avatar_user',
                                    attributes: ["image"]
                                }]

                            }
                        ],
                        order: [["createdAt", "DESC"]],
                    },
                    {
                        model: appman.db.Authors,
                        as: "author_book",
                        attributes: [
                            "id",
                            "fullName",
                            "description",
                            "birthday",
                            "address",
                            "gender"
                        ],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: 'avatar',
                                attributes: ["image"],
                            }
                        ]
                    },
                    {
                        model: appman.db.Categories,
                        as: "category_book",
                        attributes: ["id", "title"],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: 'avatar_category',
                                attributes: ["image"],
                            }
                        ]
                    }
                ],
            })
            if (!bookExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            return appman.response.apiSuccess(res, bookExist);
        } catch (error) {
            return appman.response.systemError(res, error)
        }

    },
    getBookDetailsForLP: async (req, res) => {
        try {
            const { bookId } = req.params;
            const bookExist = await appman.db.Books.findOne({
                attributes: [
                    "id",
                    "title",
                    "description",
                    "price",
                    "numberPage",
                    "releaseDate",
                    "createdAt",
                    "updatedAt"
                ],
                where: {
                    id: bookId
                },
                include: [
                    {
                        model: appman.db.Avatars,
                        as: 'avatar_book',
                        attributes: ["image"],
                    },
                    {
                        model: appman.db.BookComments,
                        as: 'commentUser',
                        attributes: [
                            "id",
                            "comment",
                            "star",
                        ],
                        include: [
                            {
                                model: appman.db.Users,
                                as: 'user',
                                attributes: [
                                    "userName",
                                    "email",
                                ],
                                include: [{
                                    model: appman.db.Avatars,
                                    as: 'avatar_user',
                                    attributes: ["image"]
                                }]

                            }
                        ],
                        order: [["createdAt", "DESC"]],
                    },
                    {
                        model: appman.db.Authors,
                        as: "author_book",
                        attributes: [
                            "id",
                            "fullName",
                            "description",
                            "birthday",
                            "address",
                            "gender"
                        ],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: 'avatar',
                                attributes: ["image"],
                            }
                        ]
                    },
                    {
                        model: appman.db.Categories,
                        as: "category_book",
                        attributes: ["title"],
                        include: [
                            {
                                model: appman.db.Avatars,
                                as: 'avatar_category',
                                attributes: ["image"],
                            }
                        ]
                    }
                ],
            })
            if (!bookExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            return appman.response.apiSuccess(res, bookExist);
        } catch (error) {
            return appman.response.systemError(res, error)
        }

    },
    createNewBook: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction()
        try {
            const {
                image,
                title,
                description,
                price,
                author,
                numberPage,
                category,
                releaseDate
            } = req.body
            await validateInputCreateBook.validateAsync(req.body)
            let imageCreate = null
            if (image && image.image && image.cloudId) {
                imageCreate = await appman.db.Avatars.create({
                    image: image.image,
                    cloudId: image.cloudId
                }, {
                    transaction
                })
            }
            const authorExist = await appman.db.Authors.findOne({
                where: {
                    id: author
                }
            })
            const categoryExist = await appman.db.Categories.findOne({
                where: {
                    id: category
                }
            })
            if (!authorExist) {
                return appman.response.apiError(res, {
                    message: "Không tìm thấy author"
                })
            }
            if (!categoryExist) {
                return appman.response.apiError(res, {
                    message: "Không tìm thấy category"
                })
            }
            const book = await appman.db.Books.create({
                imageId: imageCreate?.id || null,
                title,
                description,
                price,
                author,
                numberPage,
                category,
                releaseDate
            }, {
                transaction
            })
            await transaction.commit();
            return appman.response.apiSuccess(res, book);
        } catch (error) {
            console.log("")
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
    editBookCms: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction()
        try {
            const {
                image,
                title,
                description,
                price,
                author,
                numberPage,
                category,
                releaseDate
            } = req.body
            await validateInputCreateBook.validateAsync(req.body)
            const { bookId } = req.params
            const bookExist = await appman.db.Books.findOne({
                where: { id: bookId }
            })
            if (bookExist) {
                let newImage = null
                if (image && image.image && image.cloudId) {
                    if (bookExist.imageId) {
                        await appman.db.Avatars.update({
                            image: image.image,
                            cloudId: image.cloudId
                        }, {
                            where: { id: bookExist.imageId },
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
                const authorExist = await appman.db.Authors.findOne({
                    where: {
                        id: author
                    }
                })
                const categoryExist = await appman.db.Categories.findOne({
                    where: {
                        id: category
                    }
                })
                if (!authorExist) {
                    return appman.response.apiError(res, {
                        message: "Không tìm thấy author"
                    })
                }
                if (!categoryExist) {
                    return appman.response.apiError(res, {
                        message: "Không tìm thấy category"
                    })
                }
                const book = await appman.db.Books.update({
                    imageId: bookExist?.imageId || newImage?.id,
                    title,
                    description,
                    price,
                    author,
                    numberPage,
                    category,
                    releaseDate
                }, {
                    where: {
                        id: bookId
                    },
                    transaction
                })
                await transaction.commit();
                return appman.response.apiSuccess(res, book);
            }
            else {
                return appman.response.resApiError(res, 403, status[400]);
            }
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
    deleteBook: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction()
        try {
            const { bookId } = req.params
            const bookExist = await appman.db.Books.findOne(
                {
                    where: {
                        id: bookId
                    }
                }
            )
            if (!bookExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            const avatarExist = await appman.db.Avatars.findOne({
                where: {
                    bookId
                }
            })
            // delete book
            const deleteBook = await appman.db.Books.destroy({
                where: {
                    id: bookId
                }
            }, {
                transaction
            })
            // delete avatar of book và xóa avatar ra khỏi cloudinary
            if (avatarExist) {
                await appman.db.Avatars.destroy({
                    where: {
                        id: bookExist.imageId
                    }
                })
                await cloudinaryV2.uploader.destroy(avatarExist.cloudId)
            }
            // delete comment
            const commentExist = await appman.db.BookComments.findAll({
                where: {
                    bookId: bookId
                }
            })
            if (commentExist && commentExist.length > 0) {
                await appman.db.BookComments.destroy({
                    where: {
                        bookId
                    }
                })
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, deleteBook);
        } catch (error) {
            await transaction.rollback();
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
    // removeImage: async (req, res) => {
    //     try {
    //         const destroyImage = await cloudinaryV2.uploader.destroy('1')
    //         return appman.response.apiSuccess(res, destroyImage);
    //     } catch (error) {
    //         return appman.response.systemError(res, error)
    //     }
    // }
} 