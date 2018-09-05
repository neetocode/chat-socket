const net = require('net');

const portDefault = 2000;


const ipToConnect = process.argv[2]
const portToConnect = process.argv[3]


if (ipToConnect && portToConnect) {
    console.log('modo cliente')

    startCliente(ipToConnect, portToConnect);
} else {
    console.log('modo servidor')

    startServidor();
}

const clientes = []

function startServidor() {
    const server = net.createServer((socket) => {
        // 'connection' listener

        console.log('client connected');

        socket.on('end', () => {
            console.log('client disconnected');
        });

        socket.write('hello\r\n');

        // socket.pipe(c);
    });
    server.on('error', (err) => {
        throw err;
    });
    server.listen(portDefault, () => {
        console.log(`SERVER ON | PORT ${portDefault}`);
    });
}

function startCliente(ip, port) {
    const client = net.connect(port, (socket) => {
        // console.log(socket)
    })

    // console.log(client)

    client.on('data', (data) => {
        console.log(data.toString())
    })
}



// const server = net.createServer(socket => {


// })


// server.listen(() => {
//     const address = server.address()
//     console.log(`Servidor rodando no endereço ${address.address == "::" ? 'localhost': address.address}:${address.port}`);
// });