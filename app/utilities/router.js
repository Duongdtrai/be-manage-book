const express = require('express')
const router = express.Router()
const passport = require('passport')
const { ROLE } = require('./errorMap.js')
const checkIsInRole = require('../core/middlewares/role');
require('../core/middlewares/passport')
// api
const userRouter = require('../api/user/user.router')
const bookRouter = require('../api/book/book.router')
const cartRouter = require('../api/cart/cart.router')
const authorRouter = require('../api/author/author.router')
const categoryRouter = require('../api/category/category.router')
const commentRouter = require('../api/comment/comment.router')
// cms
router.use('/cms/user', userRouter)
router.use('/cms/book', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), bookRouter)
router.use('/cms/cart', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), cartRouter)
router.use('/cms/author', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), authorRouter)
router.use('/cms/category', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), categoryRouter)
router.use('/cms/comment', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), commentRouter)
// passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN),


// landing-page
router.use('/landing-page/user', userRouter)
router.use('/landing-page/book', bookRouter)
router.use('/landing-page/cart', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), cartRouter)
router.use('/landing-page/author', authorRouter)
router.use('/landing-page/category', categoryRouter)
router.use('/landing-page/comment', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), commentRouter)

// , passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER),
module.exports = router