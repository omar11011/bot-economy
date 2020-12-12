const db = require('../../../backend/models')

module.exports = {
    name: 'start',
    aliases: [],
    async execute(message, client, args, prefix) {
        const filter = await db.user.findOne({
            where: {
                user: message.author.id,
            },
            attirbutes: ['id'],
        })

        if(filter) return message.reply('ya estabas registrado')
        
        db.user.create({
            user: message.author.id,
        }).then(user => {
            db.balance.create({
                userId: user.dataValues.id,
                credits: 10000000,
            })
        })
        return message.reply('te has registrado exitosamente!')
    }
}