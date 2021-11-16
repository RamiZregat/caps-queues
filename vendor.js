const io =require('socket.io-client');

let host='http://localhost:3030';

const capsSocket=io.connect(host);
const Client=require('./model/client');
const client=new Client;

let id=client.orderID;

capsSocket.emit('new_pickup',{msg:`New pickup ${id}`,id:id})

capsSocket.on('pickup_added',(payload)=>{
    console.log(`The ${payload.msg} added to queue`);
})

capsSocket.emit('getAll-deliverys')

capsSocket.on('delivered',(payload=>{
    console.log(payload.msg);
    capsSocket.emit('received-delivered',payload)
}))