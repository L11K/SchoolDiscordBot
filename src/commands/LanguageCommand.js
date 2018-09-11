
const SubsCommand = require("./SubsCommand");
const Discord = require('discord.js');
const Translation = require("../Translation");

class LanguageCommand extends SubsCommand {
    
    getSubCommands(){
        return {
            "change": {
                "arguments": 1,
                "help": "<language>"
            },
            "list": {
                "arguments": 0,
                "help": ""
            }
        }
    }

    getName() {
        return "language";
    }

    getGroup() {
        return "manage";
    }
    
    getAliases() {
        return ["lan"];
    }

    init(bot) {

    }

    callList(args, channel, author){
        let languages = Translation.languageList();
        
        let list = "";

        languages.forEach(language => {
            list += "\n**" + language + "**";
        });

        list += "\n";
            
        const embed = new Discord.RichEmbed()
            .setTitle("🗣️ | " + Translation.translate("command.language.language-list"))
            .setDescription(list)
            .setColor(0xbadc58)
        
        author.createDM().then(dm => dm.send(embed)).catch(error => {});
    }

    callChange(args, channel) {
        let language = args[0];

        if(!Translation.languageExists(language)){
            this.sendError(channel, "command.language.language-not-found");
            return;
        }

        Translation.setLanguage(language);
        const embed = new Discord.RichEmbed()
            .setTitle("🗣️ | " + Translation.translate("command.language.language-changed.title"))
            .setDescription(Translation.translate("command.language.language-changed"))
            .setColor(0xbadc58);

        channel.send(embed);
        return false;
    }

}

module.exports = LanguageCommand;