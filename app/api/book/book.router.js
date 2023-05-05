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
 *            avatar:
 *              type: "array"
 *              description: "Danh sách các ảnh đại diện của người dùng."
 *              items:
 *                type: "object"
 *                properties:
 *                  cloudId:
 *                    type: "string"
 *                    description: "ID của ảnh trong đám mây."
 *                  image:
 *                    type: "string"
 *                    description: "Đường dẫn tới ảnh đại diện."	
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
 *              type: "string"
 *              description: "ptd"
 *            numberPage:
 *              type: "number"
 *              description: "số lượng của sách"
 *            category:
 *              type: "string"
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
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm phòng"
 *        schema:
 *          type: "object"
 *          properties:
 *            avatar:
 *              type: "array"
 *              items:
 *                  type: string
 *              description: "Tên người dùng"
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
 *              type: "string"
 *              description: "ptd"
 *            numberPage:
 *              type: "number"
 *              description: "số lượng của sách"
 *            category:
 *              type: "string"
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
 * /landing-page/book/list-book:
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
router.get('/list-book',  bookService.getAllBooksLP)


/**
 * @openapi
 * /landing-page/book/{bookId}:
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
router.get('/:bookId', bookService.getBookDetailsForLP)
module.exports = router;