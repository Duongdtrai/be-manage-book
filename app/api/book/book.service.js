const status = require("./book.response-status");
const cloudinaryV2 = require("../../core/cloudinary/cloudinary.service")
module.exports = {
    getAllBooksLP: async (req, res) => {
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
                    "title",
                    "description",
                    "price",
                    "author",
                    "numberPage",
                    "category",
                    "releaseDate",
                    "createdAt",
                    "updatedAt"
                ],
                include: [
                    {
                        model: appman.db.BookAvatars,
                        as: 'avatar',
                        attributes: ["image"],
                    },
                    {
                        model: appman.db.BookComments,
                        as: 'comment',
                        attributes: ["id", "comment"],
                    }
                ],
                order: [["createdAt", "DESC"]],
            }
            const listBooks = await appman.db.Books.findAndCountAll(operator)
            return appman.response.apiSuccess(res, listBooks);
        } catch (error) {
            return appman.response.systemError(res, error)
        }
    },

    getAllBooks: async (req, res) => {
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
                    "title",
                    "description",
                    "price",
                    "author",
                    "numberPage",
                    "category",
                    "releaseDate",
                    "createdAt",
                    "updatedAt"
                ],
                include: [
                    {
                        model: appman.db.BookAvatars,
                        as: 'avatar',
                        attributes: ["image"],
                    },
                    {
                        model: appman.db.BookComments,
                        as: 'comment',
                        attributes: ["id", "comment"],
                    },
                    {
                        model: appman.db.Users,
                        as: 'starsUsers',
                        attributes: ["id"],
                        through: {
                            model: appman.db.Stars,
                            attributes: []
                        }
                    }
                ],
                order: [["createdAt", "DESC"]],
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
            console.log("bookId", req.params.bookId);
            const bookExist = await appman.db.Books.findOne({
                attributes: [
                    "id",
                    "title",
                    "description",
                    "price",
                    "author",
                    "numberPage",
                    "category",
                    "releaseDate",
                    "createdAt",
                    "updatedAt"
                ],
                where: {
                    id: bookId
                },
                include: [
                    {
                        model: appman.db.BookAvatars,
                        as: 'avatar',
                        attributes: ["id", "avatar"],
                    },
                    {
                        model: appman.db.BookComments,
                        as: 'comment',
                        attributes: ["id", "comment"],
                    },
                    {
                        model: appman.db.Users,
                        as: 'starsUsers',
                        attributes: ["id"],
                        through: {
                            model: appman.db.Stars,
                            attributes: []
                        }
                    }
                ]
            })
            if (!bookExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            return appman.response.apiSuccess(res, book);
        } catch (error) {
            return appman.response.systemError(res, error)
        }

    },
    getBookDetailsForLP: async (req, res) => {
        try {
            const { bookId } = req.params;

            console.log("bookId", req.params.bookId);
            const bookExist = await appman.db.Books.findOne({
                attributes: [
                    "id",
                    "title",
                    "description",
                    "price",
                    "author",
                    "numberPage",
                    "category",
                    "releaseDate",
                    "createdAt",
                    "updatedAt"
                ],
                where: {
                    id: bookId
                },
                include: [
                    {
                        model: appman.db.BookAvatars,
                        as: 'avatar',
                        attributes: ["id", "avatar"],
                    },
                    {
                        model: appman.db.BookComments,
                        as: 'comment',
                        attributes: ["id", "comment"],
                    },
                    {
                        model: appman.db.Users,
                        as: 'starsUsers',
                        attributes: ["id"],
                        through: {
                            model: appman.db.Stars,
                            attributes: []
                        }
                    }
                ]
            })
            if (!bookExist) {
                return appman.response.resApiError(res, 403, status[400]);
            }
            return appman.response.apiSuccess(res, book);
        } catch (error) {
            return appman.response.systemError(res, error)
        }

    },
    createNewBook: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction()
        try {
            const {
                avatar,
                title,
                description,
                price,
                author,
                numberPage,
                category,
                releaseDate
            } = req.body
            console.log("1");
            const book = await appman.db.Books.create({
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
            console.log("2");
            if (avatar && avatar.length > 0) {
                for (let i = 0; i < avatar.length; i++) {
                    await appman.db.BookAvatars.create({
                        bookId: book.id,
                        image: avatar[i].image,
                        cloudId: avatar[i].cloudId
                    }, {
                        transaction
                    })
                }
            }
            await transaction.commit();
            return appman.response.apiSuccess(res, book);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }
    },
    editBookCms: async (req, res) => {
        const transaction = await appman.db.sequelize.transaction()
        try {
            const {
                avatar,
                title,
                description,
                price,
                author,
                numberPage,
                category,
                releaseDate
            } = req.body
            const { bookId } = req.params
            // console.log("req", req);
            // console.log("bookId", bookId);
            const bookExist = await appman.db.Books.findOne({
                where: { id: bookId}
            })
            if (bookExist) {
                const book = await appman.db.Books.update({
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
                console.log("book", book);
                if (avatar && avatar.length > 0) {
                    for (let i = 0; i < avatar.length; i++) {
                        const avatarExist = await appman.db.BookAvatars.findOne({
                            where: {
                                bookId
                            }
                        })
                        if (!avatarExist) {
                            await cloudinaryV2.uploader.destroy(avatarExist.cloudId)
                            await appman.db.BookAvatars.update({
                                image: avatar[i].image,
                                cloudId: avatar[i].cloudId
                            }, {
                                where: {
                                    bookId
                                },
                                transaction
                            })
                        }
                        else {
                            await appman.db.BookAvatars.create({
                                bookId: bookId,
                                image: avatar[i].image,
                                cloudId: avatar[i].cloudId
                            })
                        }
                    }
                }
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
            const avatarExist = await appman.db.BookAvatars.findAll({
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
            if (avatarExist && avatarExist.length > 0) {
                for (let i = 0; i < avatarExist.length; i++) {
                    await appman.db.BookAvatars.destroy({
                        where: {
                            id: avatarExist[i].id
                        }
                    })
                    await cloudinaryV2.uploader.destroy(avatarExist[i].cloudId)
                }
            }
            // delete comment
            await transaction.commit();
            return appman.response.apiSuccess(res, deleteBook);
        } catch (error) {
            await transaction.rollback();
            return appman.response.systemError(res, error)
        }

    },
    uploadImageCms: async (req, res) => {
        try {
            console.log("req.file.path", req.file.path);
            const dataCloud = await cloudinaryV2.uploader.upload(req.file.path, {folder: 'ImageBookWeb'})
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