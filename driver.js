const io =require('socket.io-client');

let host='http://localhost:3030';

const capsSocket=io.connect(host);


capsSocket.on('pickup-queue',(payload)=>{
    console.log(payload.msg);
    capsSocket.emit('in-transit',{msg:`${payload.id} delivered`,id:payload.id})
    capsSocket.emit('received-new_pickup',payload)
})

capsSocket.emit('getAll-pickups')

capsSocket.on('delivery',(payload=>{
    console.log(payload.deliveryMsg);
}))



