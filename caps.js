
PORT=process.env.PORT || 3030;

const caps=require('socket.io')(PORT);



const msgQueue={
    pickup:{},
    delivered:{}
}


caps.on('connection',(socket)=>{

    socket.on('new_pickup',(payload)=>{
        // console.log('payload msg',payload.msg);
        msgQueue.pickup[payload.id]=payload.msg
        socket.emit('pickup_added',payload)

        caps.emit('pickup-queue',{msg:msgQueue.pickup[payload.id],id:payload.id})
    })
    socket.on('in-transit',(payload)=>{
        msgQueue.delivered[payload.id]=payload.msg
        socket.emit('delivery',{deliveryMsg:`delivery ${payload.id} done`})

        caps.emit('delivered',{id:payload.id,msg:msgQueue.delivered[payload.id]})
    })
    socket.on('received-new_pickup',(payload=>{
        delete msgQueue.pickup[payload.id]
    }))
    socket.on('received-delivered',(payload=>{
        delete msgQueue.delivered[payload.id]
    }))
    socket.on('getAll-pickups',(payload=>{
        Object.keys(msgQueue.pickup).forEach(id=>{
            caps.emit('pickup-queue',{id:id,msg:msgQueue.pickup[id]})
            delete msgQueue.pickup[id]
        })
    }))
    socket.on('getAll-deliverys',(payload=>{
        Object.keys(msgQueue.delivered).forEach(id=>{
            caps.emit('delivered',{id:id,msg:msgQueue.delivered[id]})
            delete msgQueue.delivered[id]
        })
    }))
})


// function logger(eventName,payload) {
//     console.log('EVENT',{event:eventName,time: new Date().toISOString(),payload});
// }