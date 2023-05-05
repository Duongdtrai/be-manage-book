const express = require('express');
const router = express.Router();
const cartService = require('./cart.service')

/**
 * @openapi
 * /cms/cart/list-cart:
 *   get:
 *     tags:
 *      - "Cart"
 *     summary: Danh sách cart
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
router.get('/list-cart', cartService.getAllCarts)


/**
 * @openapi
 * /cms/cart/{cartId}:
 *   get:
 *     tags:
 *      - "Cart"
 *     summary: Thông tin chi tiết cart
 *     parameters:
 *      - in: "path"
 *        name: "cartId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/:cartId', cartService.getCartsDetails)

/**
 * @openapi
 * /cms/edit-cart/{cartId}:
 *   put:
 *     tags:
 *      - "Cart"
 *     summary: Thông tin sửa cart for cms
 *     parameters:
 *      - in: "path"
 *        name: "cartId"
 *        type: "string"
 *      - in: "query"
 *        name: "status"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.put("/edit-cart/:cartId", cartService.editCart) // admin

/**
 * @openapi
 * /cms/delete-cart/{cardId}:
 *   delete:
 *     tags:
 *      - "Cart"
 *     summary: xóa cart
 *     parameters:
 *      - in: "path"
 *        name: "cartId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete("/delete-cart/:bookId", cartService.deleteCartForCMS) 



/**
 * @Role {{landing-page}}
 */

/**
 * @openapi
 * /landing-page/cart/list-cart-user:
 *   get:
 *     tags:
 *      - "Cart"
 *     summary: Thông tin chi tiết cart của user
 *     parameters:
 *      - in: "query"
 *        name: "userId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/list-cart-user', cartService.getAllCartsForLP)


/**
 * @openapi
 * /landing-page/cart/create-new-card:
 *   post:
 *     tags:
 *      - "Cart"
 *     summary: Thêm mới cart
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm cart"
 *        schema:
 *          type: "object"
 *          properties:
 *            userId:
 *              type: "number"
 *              description: "userId"
 *            bookId:
 *              type: "number"
 *              description: "bookId"
 *            status:
 *              type: "string"
 *              description: "status"
 *            quantity:
 *              type: "number"
 *              description: "quantity" 
 *              example: 1          
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/create-new-cart', cartService.createNewCartForLP) 


/**
 * @openapi
 * /landing-page/edit-cart-user/{cartId}:
 *   put:
 *     tags:
 *      - "Cart"
 *     summary: Thông tin sửa cart for cms
 *     parameters:
 *      - in: "path"
 *        name: "cartId"
 *        type: "string"
 *      - in: "query"
 *        name: "quantity"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.put("/edit-cart-user/:cartId", cartService.editCartForLP) // admin

/**
 * @openapi
 * /landing-page/delete-cart-user/{cardId}:
 *   delete:
 *     tags:
 *      - "Cart"
 *     summary: xóa cart user
 *     parameters:
 *      - in: "path"
 *        name: "cartId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete("/delete-cart-user/:cartId", cartService.deleteCartForLP) 
module.exports = router;