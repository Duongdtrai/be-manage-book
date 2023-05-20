const express = require('express');
const router = express.Router();
const userService = require('./user.service')
const passport = require('passport');
require('../../core/middlewares/passport')
const { ROLE } = require('../../utilities/errorMap')
const multer = require('../../core/middlewares/multer');
const checkIsInRole = require("../../core/middlewares/role")

/**
 * @return cms
 */

/**
 * @openapi
 * /cms/user/login:
 *   post:
 *     tags:
 *      - "User"
 *     summary: Đăng nhập
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
 *        schema:
 *          type: "object"
 *          properties:
 *            email:
 *              type: "string"
 *              description: "email"
 *              example: "ptd@gmail.com"
 *            password:
 *              type: "string"
 *              description: "password"
 *              example: "123456"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/login', userService.loginForCms)


/**
 * @openapi
 * /cms/user/get-all:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Chi tiết all user
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
 *        description: "tìm kiếm theo tên user"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/get-all', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), userService.getAllUser)

/**
 * @openapi
 * /cms/user/detail:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Chi tiết user
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/detail', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), userService.getUserDetailsCMS)

/**
 * @openapi
 * /cms/user/edit-user:
 *   put:
 *     tags:
 *      - "User"
 *     summary: Chỉnh sửa thông tin user
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
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
 *            userName:
 *              type: "string"
 *              example: "tungduong"
 *              description: "userName"
 *            gender:
 *              type: string
 *              example: null
 *              description: "email"
 *            age:
 *              type: number
 *              example: 20
 *              description: "password"
 *            address:
 *              type: string
 *              example: null
 *              description: "password"
 *            numberPhone:
 *              type: string
 *              example: null
 *              description: "password"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.put('/edit-user', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), userService.editUser);

/**
 * @openapi
 * /cms/user/change-password:
 *   put:
 *     tags:
 *      - "User"
 *     summary: Thay đổi password
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin email và password"
 *        schema:
 *          type: "object"
 *          properties:
 *            password:
 *              type: "string"
 *              description: "password"
 *            newPassword:
 *              type: "string"
 *              description: "newPassword"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.put('/change-password', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), userService.changePasswordCms);


/**
 * @openapi
 * /cms/user/logout:
 *   post:
 *     tags:
 *      - "User"
 *     summary: Đăng xuất
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/logout', passport.authenticate('jwt', { session: false }), userService.logout)

/**
 * @openapi
 * /cms/user/upImageAdmin:
 *   post:
 *     tags:
 *      - "User"
 *     summary: upload image user for CMS
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
router.post("/upImageAdmin", passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), multer.single('files'), userService.uploadImageCms)

/**
 * @openapi
 * /cms/user/refresh-token:
 *   post:
 *     tags:
 *      - "User"
 *     summary: refresh token user
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/refresh-token', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), userService.refreshToken);

/**
 * @return landing-page
 */


/**
 * @openapi
 * /landing-page/user/loginLP:
 *   post:
 *     tags:
 *      - "User"
 *     summary: Đăng nhập
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
 *        schema:
 *          type: "object"
 *          properties:
 *            email:
 *              type: "string"
 *              description: "email"
 *              example: "ptd_lp@gmail.com"
 *            password:
 *              type: "string"
 *              description: "password"
 *              example: "123456"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/loginLP', userService.loginForLP)
/**
 * @openapi
 * /landing-page/user/register:
 *   post:
 *     tags:
 *      - "User"
 *     summary: Đăng ký
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
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
 *            userName:
 *              type: "string"
 *              example: "PhamTungDuong"
 *              description: "userName"
 *            email:
 *              type: "string"
 *              example: "ptd@gmail.com"
 *              description: "email"
 *            password:
 *              type: "string"
 *              example: "123456"
 *              description: "password"
 *            gender:
 *              type: string
 *              example: null
 *              description: "email"
 *            age:
 *              type: number
 *              example: 20
 *              description: "password"
 *            address:
 *              type: string
 *              example: null
 *              description: "password"
 *            numberPhone:
 *              type: string
 *              example: null
 *              description: "password"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/register', userService.register)

/**
 * @openapi
 * /landing-page/user/details:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Chi tiết user
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/details', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), userService.getUserDetailsForLP)

/**
 * @openapi
 * /landing-page/user/edit-user-lp:
 *   put:
 *     tags:
 *      - "User"
 *     summary: Chỉnh sửa thông tin user
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
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
 *            userName:
 *              type: "string"
 *              example: "tungduong"
 *              description: "userName"
 *            gender:
 *              type: string
 *              example: null
 *              description: "email"
 *            age:
 *              type: number
 *              example: 20
 *              description: "password"
 *            address:
 *              type: string
 *              example: null
 *              description: "password"
 *            numberPhone:
 *              type: string
 *              example: null
 *              description: "password"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.put('/edit-user-lp', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), userService.editUser);

/**
 * @openapi
 * /landing-page/user/change-password-user:
 *   put:
 *     tags:
 *      - "User"
 *     summary: Thay đổi password
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin email và password"
 *        schema:
 *          type: "object"
 *          properties:
 *            password:
 *              type: "string"
 *              description: "password"
 *            newPassword:
 *              type: "string"
 *              description: "newPassword"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.put('/change-password-user', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), userService.changePasswordLP);

/**
 * @openapi
 * /landing-page/user/refresh-token-user:
 *   post:
 *     tags:
 *      - "User"
 *     summary: refresh token user
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/refresh-token-user', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), userService.refreshToken);

/**
 * @openapi
 * /landing-page/user/logout:
 *   post:
 *     tags:
 *      - "User"
 *     summary: Đăng xuất
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/logout', passport.authenticate('jwt', { session: false }), userService.logout)

/**
 * @openapi
 * /landing-page/user/upImageUser:
 *   post:
 *     tags:
 *      - "User"
 *     summary: upload image user for LP
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
router.post("/upImageUser", multer.single('files'), userService.uploadImageLP)
module.exports = router;
