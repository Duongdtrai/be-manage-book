const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { USER_STATUS, SYSTEM_ADMIN, USER_ENABLED, ADMIN_DEFAULT_USER_ID } = require('../../core/database/constant/user')


module.exports = {
	genPassword: async (password) => {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	},
	checkPassword: async (password, userPassword) => {
		return bcrypt.compareSync(String(password), userPassword);
	},

	loginCms: async (user) => {
		const transaction = await appman.db.sequelize.transaction()
		const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_OR_KEY, { expiresIn: '15m' })
		await appman.db.Tokens.update({
			token: token,
			refreshToken: token
		}, {
			where: {
				id: user.id,
			},
			transaction
		})
		await transaction.commit();
		return token
	},

	loginLP: async (user) => {
		const transaction = await appman.db.sequelize.transaction()
		const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_OR_KEY, { expiresIn: '15m' })
		const refreshToken = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
		await appman.db.Tokens.update({
			token: token,
			refreshToken: token
		}, {
			where: {
				id: user.id,
			},
			transaction
		})
		await transaction.commit();
		return {token, refreshToken}
	},


	register: async ({
		avatar,
		email,
		passSecurity,
		gender,
		age,
		address,
		numberPhone,
		userName
	}, transaction) => {
		console.log(passSecurity);
		const newUser = await appman.db.Users.create({
			avatar,
			email,
			gender,
			password: passSecurity,
			role: SYSTEM_ADMIN.USER,
			userName,
			age,
			address,
			numberPhone,
			deletedAt: null
		}, {
			transaction
		});
		return newUser
	}
}