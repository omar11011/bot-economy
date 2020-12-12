const db = require('../../../backend/models')

module.exports = {
    name: 'balance',
    aliases: ['bal'],
    async execute(message, client, args, prefix) {
        const user = await db.user.findOne({
            where: {
                user: message.author.id
            },
            include: [
                {
                    model: db.balance,
                    as: "balance",
                    attributes: ['credits']
                }
            ],
            raw: true,
        })
        if(!user) return message.reply('debes registrarte primero.')

        return message.reply(`your balance is: ${user['balance.credits']}`)
    }
}