const express = require('express');
const router = express.Router();
const bookService = require('./book.service')
const multer = require('../../core/middlewares/multer');
require('../../core/middlewares/passport')

/**
 * @openapi
 * /cms/book/list-book:
 *   get:
 *     tags:
 *      - "Book"
 *     summary: Danh sách book
 *     parameters:
 *      - in: query
 *        name: "page"
 *        description: "page"
 *        type: "number"
 *      - in: query
 *        name: "size"
 *        description: "size"
 *        type: "number"
 *      - in: "query"
 *        name: "freeWord"
 *        type: "string"
 *        description: "tìm kiếm theo tên sách"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/list-book', bookService.getAllBooks)



/**
 * @openapi
 * /cms/book/{bookId}:
 *   get:
 *     tags:
 *      - "Book"
 *     summary: Thông tin chi tiết book
 *     parameters:
 *      - in: "path"
 *        name: "bookId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/:bookId',  bookService.getBookDetails)

/**
 * @openapi
 * /cms/book/create-new-book:
 *   post:
 *     tags:
 *      - "Book"
 *     summary: Thêm mới book
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm book"
 *        schema:
 *          type: "object"
 *          properties:
 *            image:
 *              type: "object"
 *              properties:
 *                  image:
 *                      type: "string"
 *                      description: "image"
 *                      example: "https://res.cloudinary.com/ptd/image/upload/v1683907573/ImageUserWeb/qkgmfxmo6yzmloma97we.png"
 *                  cloudId:
 *                      type: "string"
 *                      description: "cloudId"
 *                      example: "ImageUserWeb/qkgmfxmo6yzmloma97we"
 *            title:
 *              type: "string"
 *              description: "Email người dùng"
 *            description:
 *              type: "string"
 *              description: "mô tả book"
 *            price:
 *              type: "number"
 *              description: "giá của sách"
 *            author:
 *              type: "number"
 *              description: "author"
 *            numberPage:
 *              type: "number"
 *              description: "số lượng của sách"
 *            category:
 *              type: "number"
 *              description: "thể loại"
 *            releaseDate:
 *              type: "string"
 *              description: "ngày phát hành"
 *              example: "2023-04-19"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/create-new-book', bookService.createNewBook) //admin

/**
 * @openapi
 * /cms/book/edit-book/{bookId}:
 *   put:
 *     tags:
 *      - "Book"
 *     summary: Thông tin của book
 *     parameters:
 *      - in: "path"
 *        name: "bookId"
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin sửa book"
 *        schema:
 *          type: "object"
 *          properties:
 *            image:
 *              type: "object"
 *              properties:
 *                  image:
 *                      type: "string"
 *                      description: "image"
 *                      example: "https://res.cloudinary.com/ptd/image/upload/v1683907573/ImageUserWeb/qkgmfxmo6yzmloma97we.png"
 *                  cloudId:
 *                      type: "string"
 *                      description: "cloudId"
 *                      example: "ImageUserWeb/qkgmfxmo6yzmloma97we"
 *            title:
 *              type: "string"
 *              description: "Email người dùng"
 *            description:
 *              type: "string"
 *              description: "mô tả book"
 *            price:
 *              type: "number"
 *              description: "giá của sách"
 *            author:
 *              type: "number"
 *              description: "author"
 *            numberPage:
 *              type: "number"
 *              description: "số lượng của sách"
 *            category:
 *              type: "number"
 *              description: "thể loại"
 *            releaseDate:
 *              type: "string"
 *              description: "ngày phát hành"
 *              example: "2023-04-19"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.put("/edit-book/:bookId",  bookService.editBookCms) // admin

/**
 * @openapi
 * /cms/book/delete-book/{bookId}:
 *   delete:
 *     tags:
 *      - "Book"
 *     summary: xóa book
 *     parameters:
 *      - in: "path"
 *        name: "bookId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete("/delete-book/:bookId", bookService.deleteBook)

/**
 * @openapi
 * /cms/book/upImage:
 *   post:
 *     tags:
 *      - "Book"
 *     summary: upload image book
 *     consumes:
 *      - "multipart/form-data"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "formData"
 *        name: "files"
 *        description: "files"
 *        required: false
 *        allowMultiple: false
 *        type: "file"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post("/upImage",  multer.single('files'), bookService.uploadImageCms)


/**
 * @type {landing page}
 */

/**
 * @openapi
 * /landing-page/book/user/list-book:
 *   get:
 *     tags:
 *      - "Book"
 *     summary: Danh sách book
 *     parameters:
 *      - in: query
 *        name: "page"
 *        description: "page"
 *        type: "number"
 *      - in: query
 *        name: "size"
 *        description: "size"
 *        type: "number"
 *      - in: "query"
 *        name: "freeWord"
 *        type: "string"
 *        description: "tìm kiếm theo tên sách"
 *      - in: "query"
 *        name: "category"
 *        type: "string"
 *        description: "tìm kiếm theo tên danh mục"
 *      - in: "query"
 *        name: "author"
 *        type: "string"
 *        description: "tìm kiếm theo tên tác giả"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/user/list-book',  bookService.getAllBooksLP)


/**
 * @openapi
 * /landing-page/book/user/{bookId}:
 *   get:
 *     tags:
 *      - "Book"
 *     summary: Thông tin chi tiết book
 *     parameters:
 *      - in: "path"
 *        name: "bookId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/user/:bookId', bookService.getBookDetailsForLP)
module.exports = router;