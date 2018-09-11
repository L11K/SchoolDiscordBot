const Discord = require('discord.js');
const Translation = require("../Translation");

class Command {

    init(client, settings, commands){
        throw new Error('You have to implement the method init!');
    }

    getName(){
        throw new Error('You have to implement the method getName!');
    }

    getGroup(){
        throw new Error('You have to implement the method getGroup!');
    }

    getAliases(){
        return [];
    }

    getDependencies(){
        return [];
    }

    fetchAliases(){
        return [this.getName()].concat(this.getAliases());
    }

    getRoles(){
        return ["moderator"];
    }

    getUsage(){
        return this.getName() + " " + Translation.translate("commands.usage." + this.getName());
    }

    sendHelp(channel){
        const embed = new Discord.RichEmbed()
            .setTitle("❗ | " + Translation.translate("command.too-few-arguments"))
            .setDescription(Translation.translate("command.usage") + " `" + this.getUsage() + "` - " + Translation.translate("commands.help." + cmdName))
            .setColor(0xf0932b);

        channel.send(embed);
    }

    sendError(channel, reason, additional){
        if(additional == undefined)
            additional = "";


        const embed = new Discord.RichEmbed()
            .setTitle("❗ | " + Translation.translate("command.error"))
            .setDescription(Translation.translate(reason) + " " + additional)
            .setColor(0xeb4d4b);

        channel.send(embed);
    }

    call(args) {
        throw new Error('You have to implement the method call!');
    }

}

module.exports = Command;