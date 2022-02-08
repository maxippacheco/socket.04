const Marcadores = require("./marcadores");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.marcadores = new Marcadores();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            socket.emit( 'marcadores-activos', this.marcadores.activos );
            
            socket.on( 'marcador-nuevo', ( marcador ) => {
                this.marcadores.agregarMarcador( marcador );

                // broadcast envias un mensaje a todos los clientes conectados, excepto al cliente que lo emitio!
                
                socket.broadcast.emit('marcador-nuevo', marcador);
            });

            socket.on('marcador-actualizado', (marcador) => {
                this.marcadores.actualizarMarcador( marcador );
                
                socket.broadcast.emit('marcador-actualizado', marcador);
            });
    
        });
    }


}

/*
    io.sockets.emit will send to all the clients

    socket.broadcast.emit will send the message to all the other clients except the newly created connection

*/



module.exports = Sockets;