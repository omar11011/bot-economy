const megadb = require('megadb')

const Cooldown = async (message, cmdFile) => {
    const cooldown = new megadb.crearDB(cmdFile.name, 'cooldown/')
    const data = await cooldown.obtener(message.author.id)
    const time = Math.round((new Date()).getTime() / 1000)

    if(data) {
        const cd = cmdFile.cooldown || 3
        const elapsed = time - data.time

        if(elapsed < cd) {
            const falta = cd - elapsed
            message.reply(`aún debes esperar ${falta} segundos.`)
            return false
        }
    }

    cooldown.establecer(message.author.id, {
        time: time,
    })

    return true
}

module.exports = Cooldown