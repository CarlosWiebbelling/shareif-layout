const ws = new WebSocket('ws://localhost:8080');

// Métodos que ENVIAM dados para o backend
const sendCreatePair = seed => {
    ws.send(JSON.stringify({
        type: 'PING_CREATE_PAIR',
        payload: {
            seed
        }
    }));
};

window.sendMessage = (publicKey, msg) => {
    ws.send(JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: {
            publicKey,
            msg
        }
    }));
};

window.sendSignIn = (publicKey, privateKey) => {
    ws.send(JSON.stringify({
        type: 'SIGN_IN',
        payload: {
            publicKey,
            privateKey
        }
    }));
};

// Métodos que RECEBEM dados do backend
const handleCreatePairResponse = (publicKey, privateKey) => {
    console.log(publicKey, privateKey);
};

const handleReceiveMessage = (publicKey, msg) => {
    console.log(publicKey, msg);
}

// Eventos padrões do websockets
ws.onopen = evt => {
    console.log(evt);
};

ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);
    switch (msg.type) {
        case 'PONG_CREATE_PAIR':
            handleCreatePairResponse(msg.payload);
            break;
        case 'RECEIVE_MESSAGES':
            handleReceiveMessage(msg.payload);
            break;
        default:
            break;
    }
};

ws.onerror = evt => {
    console.log('error');
    console.log(evt);
}

ws.onclose = evt => {
    console.log('closed');
    console.log(evt);
}

window.ws = ws;