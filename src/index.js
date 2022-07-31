const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const { Client } = require("discord.js-selfbot-v13");

const client = new Client({ checkUpdate: false });
let responses = {};

client.once('ready', () => {
    console.log('Script is active, enjoy!');
});

client.on('messageCreate', message => {
    if (message.author.id != '639668653306150932') {
        return;
    }

    message.channel.send('https://media.discordapp.net/attachments/956941437277192192/976717145268445264/image0-3-1.gif')
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
