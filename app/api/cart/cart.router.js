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
 * /cms/cart/edit-cart/{cartId}:
 *   put:
 *     tags:
 *      - "Cart"
 *     summary: Thông tin sửa cart for cms
 *     parameters:
 *      - in: "path"
 *        name: "cartId"
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm cart"
 *        schema:
 *          type: "object"
 *          properties:
 *            status:
 *              type: "string"
 *              description: "status"
 *              example: done   
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
 * /cms/cart/delete-cart/{cardId}:
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
 * /landing-page/cart/user/list-cart-user:
 *   get:
 *     tags:
 *      - "Cart"
 *     summary: Thông tin chi tiết cart của user
 *     parameters:
 *      - in: "query"
 *        name: "statusCart"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/user/list-cart-user', cartService.getAllCartsForLP)


/**
 * @openapi
 * /landing-page/cart/user/create-new-cart:
 *   post:
 *     tags:
 *      - "Cart"
 *     summary: Thêm mới cart LP
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm cart"
 *        schema:
 *          type: "object"
 *          properties:
 *            bookId:
 *              type: "number"
 *              description: "bookId"
 *            status:
 *              type: "string"
 *              description: "status"
 *              example: in-cart 
 *            fullName:
 *              type: "string"
 *              description: "fullName"
 *              example: "DuongPT"   
 *            note:
 *              type: "string"
 *              description: "note" 
 *              example: good  
 *            address:
 *              type: "string"
 *              description: "address" 
 *              example: ThanhHoa 
 *            numberPhone:
 *              type: "string"
 *              description: "quantity" 
 *              example: 0123456789  
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
router.post('/user/create-new-cart', cartService.createNewCartForLP) 


/**
 * @openapi
 * /landing-page/cart/user/edit-cart/{cartId}:
 *   put:
 *     tags:
 *      - "Cart"
 *     summary: Thông tin sửa cart for cms
 *     parameters:
 *      - in: "path"
 *        name: "cartId"
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm cart"
 *        schema:
 *          type: "object"
 *          properties:
 *            bookId:
 *              type: "number"
 *              description: "bookId"
 *            status:
 *              type: "string"
 *              description: "status"
 *              example: in-cart
 *            fullName:
 *              type: "string"
 *              description: "fullName"
 *              example: DuongPT  
 *            note:
 *              type: "string"
 *              description: "note" 
 *              example: good2  
 *            address:
 *              type: "string"
 *              description: "address" 
 *              example: ThanhHoa 
 *            numberPhone:
 *              type: "string"
 *              description: "quantity" 
 *              example: 0123456789  
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
router.put("/user/edit-cart/:cartId", cartService.editCartForLP) // admin

/**
 * @openapi
 * /landing-page/cart/user/delete-cart/{cartId}:
 *   delete:
 *     tags:
 *      - "Cart"
 *     summary: xóa cart user
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
router.delete("/user/delete-cart/:cartId", cartService.deleteCartForLP) 


module.exports = router;