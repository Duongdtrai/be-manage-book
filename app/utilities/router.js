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
// cms
router.use('/cms/user', userRouter)
router.use('/cms/book', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), bookRouter)
router.use('/cms/cart', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN), cartRouter)
router.use('/cms/author',  authorRouter)
// passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.ADMIN),


// landing-page
router.use('/landing-page/user', userRouter)
router.use('/landing-page/book', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), bookRouter)
router.use('/landing-page/cart', passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER), cartRouter)
router.use('/landing-page/author', authorRouter)

// , passport.authenticate('jwt', { session: false }), checkIsInRole(ROLE.USER),
module.exports = router