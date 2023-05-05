const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SYSTEM_ADMIN } = require('../../core/database/constant/user')


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
		const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
		const tokenExist = await appman.db.Tokens.findOne({
			where: {
				userId: user.id
			}
		})
		if (!tokenExist) {
			await appman.db.Tokens.create({
				token,
				refreshToken: token,
				userId: user.id
			}, {
				transaction
			})
		} else {
			await appman.db.Tokens.update({
				token: token,
				refreshToken: token
			}, {
				where: {
					id: user.id,
				},
				transaction
			})
		}
		await transaction.commit();
		return token
	},

	loginLP: async (user) => {
		const transaction = await appman.db.sequelize.transaction()
		const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
		const refreshToken = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_OR_KEY, { expiresIn: '7d' })
		const tokenExist = await appman.db.Tokens.findOne({
			where: {
				userId: user.id
			}
		})
		if (!tokenExist) {
			await appman.db.Tokens.create({
				token,
				refreshToken: refreshToken,
				userId: user.id
			}, {
				transaction
			})
		} else {
			await appman.db.Tokens.update({
				token: token,
				refreshToken: refreshToken
			}, {
				where: {
					id: user.id,
				},
				transaction
			})
		}
		await transaction.commit();
		return { token, refreshToken }
	},


	register: async ({
		imageId,
		email,
		passSecurity,
		gender,
		age,
		address,
		numberPhone,
		username
	}, transaction) => {
		const newUser = await appman.db.Users.create({
			imageId,
			email,
			gender,
			password: passSecurity,
			role: email === 'ptd@gmail.com' ? SYSTEM_ADMIN.ADMIN : SYSTEM_ADMIN.USER,
			username,
			age,
			address,
			numberPhone,
			deletedAt: null
		}, {
			transaction
		});
		return newUser;
	}
}