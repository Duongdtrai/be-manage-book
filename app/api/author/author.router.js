const express = require("express")
const router = express.Router();
const authorService = require("./author.service")


/**
 * @openapi
 * /cms/author/list-author:
 *   get:
 *     tags:
 *      - "Author"
 *     summary: Danh sách author
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
 *        description: "tìm kiếm theo tên tác giả"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/list-author', authorService.getAllAuthor)

/**
 * @openapi
 * /cms/author/{authorId}:
 *   get:
 *     tags:
 *      - "Author"
 *     summary: Thông tin chi tiết author
 *     parameters:
 *      - in: "path"
 *        name: "authorId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/:authorId',  authorService.getAuthorById)


/**
 * @openapi
 * /cms/author/create-author:
 *   post:
 *     tags:
 *      - "Author"
 *     summary: tạo mới author
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm Author"
 *        schema:
 *          type: "object"
 *          properties:
 *            fullName:
 *              type: "string"
 *              description: "Tên người dùng"
 *            image:
 *              type: "string"
 *              description: "ảnh"
 *            description:
 *              type: "string"
 *              description: "giá của sách"
 *            birthday:
 *              type: "string"
 *              description: "ngày sinh nhật"
 *            address:
 *              type: "string"
 *              description: "địa chỉ"
 *            gender:
 *              type: "string"
 *              description: "giới tính"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/create-author', authorService.createAuthor)

/**
 * @openapi
 * /cms/author/edit-author/{authorId}:
 *   put:
 *     tags:
 *      - "Author"
 *     summary: tạo mới author
 *     parameters:
 *      - in: "path"
 *        name: "authorId"
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin sửa tác giả"
 *        schema:
 *          type: "object"
 *          properties:
 *            fullName:
 *              type: "string"
 *              description: "Tên người dùng"
 *            image:
 *              type: "string"
 *              description: "ảnh"
 *            description:
 *              type: "string"
 *              description: "giá của sách"
 *            birthday:
 *              type: "string"
 *              description: "ngày sinh nhật"
 *            address:
 *              type: "string"
 *              description: "địa chỉ"
 *            gender:
 *              type: "string"
 *              description: "giới tính"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.put('/edit-author/:authorId', authorService.editAuthor)

/**
 * @openapi
 * /cms/author/delete-author/{authorId}:
 *   delete:
 *     tags:
 *      - "Author"
 *     summary: xóa author
 *     parameters:
 *      - in: "path"
 *        name: "authorId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete("/delete-author/:authorId", authorService.deleteAuthor)

/**
 * Landing-page
 */

/**
 * @openapi
 * /landing-page/author/list-author:
 *   get:
 *     tags:
 *      - "Author"
 *     summary: Danh sách author
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
 *        description: "tìm kiếm theo tên tác giả"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/list-author', authorService.getAllAuthorForLP)
/**
 * @openapi
 * /landing-page/author/{authorId}:
 *   get:
 *     tags:
 *      - "Author"
 *     summary: Thông tin chi tiết author
 *     parameters:
 *      - in: "path"
 *        name: "authorId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/:authorId',  authorService.getAuthorForLPById)
module.exports = router;