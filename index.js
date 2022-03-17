const qrcode = require('qrcode-terminal');

const { Client, GroupChat } = require('whatsapp-web.js');
const client = new Client();

let spam = "";
let spamcount = "";

let gdcuba, gdcubaGrupo;

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.question("Inserte la id de GD Cuba", gdcubaa => {
        gdcuba = gdcubaa
        client.getChatById(gdcuba).then(chat => {
            gdcubaGrupo = chat;
        })
        readline.close();

    })
});

client.on('message', message => {
	console.log(message.body, message.from, message.author);
});

client.on('message', message => {
	if(message.body === '!hola') {
		client.sendMessage(message.from, 'buenas');
        console.log(message.from);
	}

    if (message.from == gdcuba) {
        // spam
        if (message.body === spam) {
            spamcount++;
            if (spamcount >= 7) {
                // funao
                console.log("botao");
                gdcubaGrupo.removeParticipants([message.author]);

            } else if (spamcount >= 5) {
                // message.author
                client.sendMessage(message.from, 'Alerta de SPAM, Callate la boca o te mandamos pa la pinga');
            }
        } else {
            spam = message.body;
            spamcount = 1;
        }

    }
});

client.initialize();