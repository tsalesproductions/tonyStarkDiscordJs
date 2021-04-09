// require the discord.js module
const app = require('express')();
const cors = require('cors');
const Discord = require('discord.js');
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
  }));

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
    client.user.setPresence({ activity: { name: 'Monitorando formulários' }, status: 'online' });
});

app.listen(3000, () => {
    console.log("Express server is listening on port 3000")
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sc/contato', (req, res) => {
    res.send(JSON.stringify({status: 200}));

    const channel = client.channels.cache.find(channel => channel.name === "contato")
    if(channel){
        let data = req.body;

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(data.name)
            .setURL(data.url)
            .setAuthor('Nova Mensagem')
            .setDescription(data.message)
            .setThumbnail('https://salescode.dev/assets/images/featured-item-01.png')
            .addFields(
                { name: 'Email', value: data.email, inline: true  },
                { name: 'Telefone', value: data.telphone, inline: true },
            )
            .setTimestamp()
        channel.send(exampleEmbed);
    }
})

// login to Discord with your app's token
client.login('ODI5ODI4MjAyNTQ0MzY1NjE4.YG9zvA.5BYb0Wi_AnSs-eYksL8ebAwvphQ');