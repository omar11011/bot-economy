const Cooldown = require('../functions/cooldown')

module.exports = async (client, message) => {
    const prefix = process.env.PREFIX

    if(message.author.bot) return

    if(message.content.startsWith(prefix)) {
        let args = message.content.toLowerCase().slice(prefix.length).split(" ")
        let command = args.shift()
        let cmdFile

        if(message.client.commands.has(command)) cmdFile = message.client.commands.get(command)
        else if(message.client.aliases.has(command)) cmdFile = message.client.aliases.get(command)
        else return

        const cooldown = await Cooldown(message, cmdFile)
        if(!cooldown) return

        try {
            cmdFile.execute(message, client, args, prefix)
        } catch(err) {
            console.log(err)
        }
    }
}