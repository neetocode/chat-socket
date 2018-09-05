const dgram = require('dgram');
client = dgram.createSocket('udp4');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let isEscutando, myIp, myPort

client.on('message', (msg, rinfo) => {
    msg = msg.toString();
    if (isEscutando) {
        isEscutando = false
    }
    if (msg == "exit") {
        console.log('chat encerrado');
        process.exit()
        return null;
    }
    if (/%%/.test(msg)) {
        msg = msg.replace(/%%/, '')
        console.log(msg);
    } else {
        readline.cursorTo(process.stdout, 0);
        console.log(`${rinfo.address}:${rinfo.port} disse: ${msg}`);

    }
    conversation(rinfo.address, rinfo.port)
});

client.on('listening', () => {
    var address = client.address();
    console.log(`SEU IP: ${address.address} PORTA: ${address.port}`);
    myIp = address.address;
    myPort = address.port;
    startInterface()
});

client.bind(getPort())

function getPort() {
    return Math.floor(Math.random() * 10000) + 50000
}





function startInterface() {

    rl.question('Digite o ip do parceiro (Digite 0 para somente escutar): ', (ip) => {
        if (ip == '0') {
            isEscutando = true
        } else {
            rl.question('Digite a porta do parceiro: ', (porta) => {
                portaParceiro = porta
                client.send(`%%${myIp}:${myPort} conectou.`, porta, ip)
                conversation(ip, porta)

            });
        }
    });
}

function conversation(ip, porta) {
    rl.question('', (msg) => {
        if (msg == 'exit') {
            client.send(msg, porta, ip)
            console.log('chat encerrado');
            setTimeout(() => process.exit(), 300)
        } else {
            client.send(msg, porta, ip)
            conversation(ip, porta)
        }

    });
}