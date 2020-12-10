require('dotenv').config()

const fs = require('fs')
const discord = require('discord.js')
const db = require('./backend/models')

const client = new discord.Client({ autorReconnect: true })
client.commands = new discord.Collection()
client.aliases = new discord.Collection()

const dirs = ['register', 'economy']
dirs.forEach(c => {
    fs.readdir(`./bot/commands/${c}`, (err, files) => {
        if(err) return console.log(err)
        console.log(`Cargando ${files.length} comandos del módulo ${c}.`)

        files.forEach(f => {
            const command = require(`./bot/commands/${c}/${f}`)
            client.commands.set(command.name, command)
            for(let alias of command.aliases) client.aliases.set(alias, command)
        })
    })
})

fs.readdir(`./bot/events/`, (err, files) => {
    if(err) return console.log(err)

    files.forEach(f => {
        const event = require(`./bot/events/${f}`)
        const eventName = f.split(".")[0]

        client.on(eventName, event.bind(null, client))
    })
})

client.login(process.env.TOKEN)

db.sequelize.sync({ force: false })
.then(async () => {
    console.log('Bases de datos sincronizadas.')
})
.catch(err => console.log(err))