const SubsCommand = require("./SubsCommand");
const CommandBuilder = require("../CommandBuilder");

class AnnouncementCommand extends SubsCommand {

    getSubCommands() {
        return {
            "create": {
                "arguments": 0,
                "roles": ["admin"]
            },
            "list": {
                "arguments": 0,
                "roles": ["admin"]
            },
            "edit": {
                "arguments": 0,
                "roles": ["admin"]
            },
            "delete": {
                "arguments": 1,
                "roles": ["admin"]
            }
        }
    }

    getName() {
        return "annoucement";
    }

    getGroup() {
        return "manage";
    }

    getAliases() {
        return ["annouce"];
    }

    init(bot) {
        this.annoucementModule = bot.modules["annoucementmodule"];
        this.stopWord = bot.settings.modules.builder.stopWord;
    }

    callList(args, message) {
        this.annoucementModule.listAnnoucements(message.member);

        message.react("✅");
        return false;
    }

    callEdit(args, message) {
        let channel = message.channel;
        const types = ["title", "annoucement"];

        let builder = new CommandBuilder("annoucement.edit", message.author, channel, [
            {
                "name": "name",
                "example": ["2392018", "botchanges"],
                "validate": (content) => {
                    if (!this.annoucementModule.annoucementExist(content)) {
                        return "command.annoucement.dont-exist";
                    } else {
                        return true;
                    }
                }
            },
            {
                "name": "type",
                "example": types,
                "validate": (content) => {
                    if (!types.includes(content)) {
                        return ["command.annoucement.edit-type-not-valid", types.join(", ")];
                    } else
                        return true;
                }
            },
            {
                "name": "value",
                "example": "?",
                "validate": (content, values) => {
                    return true;
                }
            }
        ], (values) => {
            console.log("User " + message.author.username + " edited annoucement with name " + values["name"] + ", edited " + values["type"] + " to " + values["value"] + ".");

            this.annoucementModule.editAnnoucement(message.member, values["name"], values["type"], values["value"]);
        }, this.stopWord);

        builder.start();
        return true;
    }

    callDelete(args, message) {
        let channel = message.channel;
        let name = args[0];

        if (!this.annoucementModule.annoucementExist(name)) {
            this.sendError(channel, "command.annoucement.dont-exist");
            return;
        }

        this.annoucementModule.deleteAnnoucement(channel, name);

        return false;
    }

    callCreate(args, message) {
        let channel = message.channel;

        let builder = new CommandBuilder("annoucement.create", message.author, channel, [
            {
                "name": "name",
                "example": ["2392018", "botchanges"],
                "validate": (content) => {
                    if (this.annoucementModule.annoucementExist(content)) {
                        return "command.annoucement.already-exists";
                    } else {
                        return true;
                    }
                }
            },
            {
                "name": "title",
                "example": ["Bot changes", "23. 9. 2018"],
                "validate": (content) => {
                    return true;
                }
            },
            {
                "name": "annoucement",
                "example": ["Annoucement..."],
                "validate": (content, values) => {
                    return true;
                }
            }
        ], (values) => {
            console.log("User " + message.author.username + " created annoucement with name " + values["name"] + ".");

            this.annoucementModule.addAnnoucement(message.member, values["name"], values["title"], values["annoucement"]);
        }, this.stopWord);

        builder.start();
        return true;
    }

}

module.exports = AnnouncementCommand;