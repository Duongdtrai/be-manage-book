const express = require("express")
const router = express.Router();
const categoryService = require("./category.service");
const multer = require('../../core/middlewares/multer');


/**
 * @openapi
 * /cms/category/list-category:
 *   get:
 *     tags:
 *      - "Category"
 *     summary: Danh sách category
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
router.get('/list-category', categoryService.getAllCategory)

/**
 * @openapi
 * /cms/category/{categoryId}:
 *   get:
 *     tags:
 *      - "Category"
 *     summary: Thông tin chi tiết category
 *     parameters:
 *      - in: "path"
 *        name: "categoryId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/:categoryId', categoryService.getCategoryById)


/**
 * @openapi
 * /cms/category/create-category:
 *   post:
 *     tags:
 *      - "Category"
 *     summary: tạo mới category
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm category"
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
 *              description: "Tên người dùng"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/create-category', categoryService.createCategory)
/**
 * @openapi
 * /cms/category/upImage:
 *   post:
 *     tags:
 *      - "Category"
 *     summary: upload image category
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
router.post("/upImage", multer.single('files'), categoryService.uploadImageCms)

/**
 * @openapi
 * /cms/category/edit-category/{categoryId}:
 *   put:
 *     tags:
 *      - "Category"
 *     summary: tạo mới category
 *     parameters:
 *      - in: "path"
 *        name: "categoryId"
 *        type: "number"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm category"
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
 *              description: "Tên người dùng"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.put('/edit-category/:categoryId', categoryService.editCategory)

/**
 * @openapi
 * /cms/category/delete-category/{categoryId}:
 *   delete:
 *     tags:
 *      - "Category"
 *     summary: xóa category
 *     parameters:
 *      - in: "path"
 *        name: "categoryId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete("/delete-category/:categoryId", categoryService.deleteCategory)

/**
 * Landing-page
 */

/**
 * @openapi
 * /landing-page/category/user/list-category-user:
 *   get:
 *     tags:
 *      - "Category"
 *     summary: Danh sách category
 *     parameters:
 *      - in: "query"
 *        name: "freeWord"
 *        type: "string"
 *        description: "tìm kiếm theo tên danh mục"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/user/list-category-user', categoryService.getAllCategoryForLP)

/**
 * @openapi
 * /landing-page/category/user/{categoryId}:
 *   get:
 *     tags:
 *      - "Category"
 *     summary: Thông tin chi tiết category
 *     parameters:
 *      - in: "path"
 *        name: "categoryId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/user/:categoryId', categoryService.getCategoryForLPById)

module.exports = router;