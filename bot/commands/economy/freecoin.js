const db = require('../../../backend/models')

module.exports = {
    name: 'freecoin',
    aliases: [],
    cooldown: 30,
    async execute(message, client, args, prefix) {
        const user = await db.user.findOne({
            where: {
                user: message.author.id,
            },
            attributes: ['id'],
        })
        if(!user) return message.reply('regístrate primero.')

        const update = await db.balance.increment({
            credits: +100,
        }, {
            where: {
                userId: user.id,
            }
        })

        return message.reply('listo, ganaste 100 dolares.')
    }
}