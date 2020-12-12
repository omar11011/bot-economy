const db = require('../../../backend/models')

module.exports = {
    name: 'dice',
    aliases: [],
    cooldown: 5,
    async execute(message, client, args, prefix) {
        if(!args[0] || isNaN(args[0]) || args[0] < 1) return message.reply('el uso de este comando es: `' + prefix + 'dice <amount>`')

        let amount = parseInt(args[0])
        let baseAmount = parseInt(args[0])
        let status = 'ganado'
        const user = await db.user.findOne({
            where: {
                user: message.author.id,
            },
            include: [
                {
                    model: db.balance,
                    as: "balance",
                    attributes: ['credits'],
                }
            ],
            attributes: ['id'],
            raw: true,
        })

        if(!user) return message.reply('regístrate primero.')
        if(amount > user['balance.credits']) return message.reply('no cuentas con este monto.')

        user['balance.credits'] -= amount
        const bet = await db.balance.update({
            credits: user['balance.credits']
        }, {
            where: {
                userId: user.id,
            },
        })
        if(bet < 1) return message.reply('hubo un error al tratar de apostar.')
        
        const prob = Math.ceil(Math.random() * 100)
        if(prob <= 75) {
            status = 'perdido'
            if(prob <= 25) amount = 0 // Saca 1
            else if(prob > 25 && prob <= 50) amount *= 0.5 // Saca 2
            else amount *= 0.75 // Saca 3
        } else {
            if(prob <= 85) amount *= 1.25
            else if(prob > 85 && prob <= 95) amount *= 1.5
            else amount *= 2
        }

        user['balance.credits'] += amount
        const newAmount = Math.abs(baseAmount - amount)
        const update = await db.balance.update({
            credits: user['balance.credits'],
        }, {
            where: {
                userId: user.id,
            }
        })

        if(update < 1) return message.reply('ocurrió un problema mientras apostabas.')

        setTimeout(() => {
            return message.reply(`has ${status} ${newAmount} dólares.`)
        }, 3000)
    }
}