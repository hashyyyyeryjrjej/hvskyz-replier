const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const { Client } = require("discord.js-selfbot-v13");

const client = new Client({ checkUpdate: false });
let text = 'https://media.discordapp.net/attachments/956941437277192192/976717145268445264/image0-3-1.gif'
let responses = {};

client.once('ready', () => {
    readline.question('What message should I send? (Leave empty for default): ', message => {
        if (message && message != '') {
            text = message
        }
        // Script's actually been active before this! Hahahah!
        console.log('Script is now active, enjoy!');
    });
});

client.on('messageCreate', message => {
    if (message.author.id != '588947015489159169') {
        return;
    }

    message.channel.send(text)
    .then(sentMessage => {
        responses[message.id] = sentMessage;
    })
    .catch(reason => {
        console.log(`Failed to send message: ${reason}`)
    });
});

// Delete the message if they delete it
client.on('messageDelete', message => {
    const response = responses[message.id];
    if (response) {
        response.delete()
        .catch(reason => {
            console.log(`Failed to remove message: ${reason}`)
        });
    }
});

// Ask for token
readline.question('Input token: ', token => {
    console.clear();
    console.log('Cleared console for security reasons');

    client.login(token)
    .catch(reason => {
        console.log(`Failed to log in: ${reason}`);
        console.log('Are you sure you input the correct Discord token?');

        setTimeout(() => {process.exit()}, 3000);
    });
})
