const express = require('express');
const router = express.Router();
const userService = require('./user.service')
const passport = require('passport');
require ('../../core/middlewares/passport')
const {ROLE} = require('../../utilities/errorMap')
const checkIsInRole = require("../../core/middlewares/role")

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
router.post('/logout', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), userService.logout)

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
 * /cms/user/{userId}:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Chi tiết user
 *     parameters:
 *      - in: "path"
 *        name: "userId"
 *        type: "integer"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/:userId', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), userService.getUserDetails)




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
 *            avatar:
 *              type: "string"
 *              example: "image.com"
 *              description: "avatar"
 *            userName:
 *              type: "string"
 *              example: "tungduong"
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
router.post('/logout', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), userService.logout)

/**
 * @openapi
 * /landing-page/user/forgot-password:
 *   post:
 *     tags:
 *      - "User"
 *     summary: Xác thực email password
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
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/forgot-password', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), userService.forgotPassword);

/**
 * @openapi
 * /landing-page/user/change-password:
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
router.put('/change-password', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), userService.changePasswordLP);

/**
 * @openapi
 * /landing-page/user/refresh-token:
 *   post:
 *     tags:
 *      - "User"
 *     summary: refresh token
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "refresh token"
 *        schema:
 *          type: "object"
 *          properties:
 *            accessToken:
 *              type: "string"
 *              description: "accessToken"
 *            refreshToken:
 *              type: "string"
 *              description: "refreshToken"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/refresh-token', userService.refreshToken);

/**
 * @openapi
 * /landing-page/user/details/{userId}:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Chi tiết user
 *     parameters:
 *      - in: "path"
 *        name: "userId"
 *        type: "integer"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/details/:userId', passport.authenticate('jwt', { session: false }),checkIsInRole(ROLE.USER) , userService.getUserDetailsForLP)
module.exports = router;
