const express = require("express")
const router = express.Router();
const commentService = require("./comment.service");

/**
 * @returns Cms
 */
/**
 * @openapi
 * /cms/comment/delete-comment/{commentId}:
 *   delete:
 *     tags:
 *      - "Comment"
 *     summary: xóa comment
 *     parameters:
 *      - in: "path"
 *        name: "commentId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete("/delete-comment/:commentId", commentService.deleteCommentForCms)

/**
 * @returns Landing-page
 */

/**
 * @openapi
 * /landing-page/comment/create-comment-user:
 *   post:
 *     tags:
 *      - "Comment"
 *     summary: comment book
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm comment"
 *        schema:
 *          type: "object"
 *          properties:
 *            bookId:
 *              type: "number"
 *              description: "id sách"
 *              example: 1
 *            comment:
 *              type: "string"
 *              description: "đánh giá người dùng"
 *              example: hay
 *            star:
 *              type: "number"
 *              description: "đanh giá sao"
 *              example: 5            
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/create-comment-user', commentService.createCommentForLP)


/**
 * @openapi
 * /landing-page/comment/delete-comment-user/{commentId}:
 *   delete:
 *     tags:
 *      - "Comment"
 *     summary: Thông tin chi tiết comment
 *     parameters:
 *      - in: "path"
 *        name: "commentId"
 *        type: "number"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete('/delete-comment-user/:commentId', commentService.deleteCommentForLP)

module.exports = router;