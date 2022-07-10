
module.exports = io => {

    let usernames = {};
    
    io.on('connection', socket => {
        console.log('new user connected');

        socket.on('new user', (data, cb) => {
            if (data in usernames) {
                cb(false);
            } else {
                cb(true);
                socket.username = data;
                usernames[socket.username] = socket;
                updateNicknames();
            }
        });
        socket.on(
            'send message',
            (data, cb) => {

                var msg = data.trim();

                if (msg.substr(0, 3) === '/w ') {
                    msg = msg.substr(3);
                    const index = msg.indexOf(' ');
                    if (index != -1) {
                        var name = msg.substr(0, index)
                        var msg = msg.substr(index + 1);
                        if (name in usernames) {
                            usernames[name].emit(
                                'whisper',
                                {
                                    msg,
                                    user: socket.username
                                }
                            )
                        } else {
                            cb('ingresa un usuario valido');
                        }
                    } else {
                        cb('Error! ingresa un mensaje');
                    }
                } else {
                    io.sockets.emit(
                        'new message',
                        {
                            msg: data,
                            user: socket.username
                        }
                    );
                }
            }
                
        )
        socket.on(
            'disconnect',
            data => {
                if (!socket.username) return;
                delete usernames[socket.nickname]
                updateNicknames();
            }
        )
        function updateNicknames() {
            io.sockets.emit(
                'usernames',
                Object.keys(usernames)
            )
        }
    })
}
