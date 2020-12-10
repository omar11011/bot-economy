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

        try {
            cmdFile.execute(message, client, prefix)
        } catch(err) {
            console.log(err)
        }
    }
}