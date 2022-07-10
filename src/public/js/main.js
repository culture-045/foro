
$(
    () => {
        const socket = io();

        $('main').hide()

        /* get var */
        const chatContainer = $('#chat__container');
        const messageForm = $('#message__form');
        const msg = $('#message');

        /* get form */
        const userForm = $('#username__Form');
        const errorUser = $('#error__username');
        const username = $('#username');
        const users = $('#users');

        userForm.submit(e => {
            e.preventDefault();
            socket.emit(
                'new user',
                username.val(),
                data => {
                    if (data) {
                        $('.login__display').hide();
                        $('main').show()
                    } else {
                        errorUser.css('display', 'flex');
                        errorUser.html(`
                        <i class="fa-solid fa-triangle-exclamation"></i>&nbsp;Usuario Invalido!
                        `)
                    }
                    username.val('');
                }
            )
        })
        
        /* submit */
        messageForm.submit(e => {
            e.preventDefault();
            socket.emit(
                'send message',
                msg.val(),
                data => {
                    chatContainer.append('<p class="error">' + data +'</p>');
                });
            /* reset val for var */
            msg.val('');
        })
        /* receiv message and show */
        socket.on(
            'new message',
            data => {
                chatContainer.append('<p class="user__bg">' + data.user + '</p>' + '<p class="msg">&nbsp;' + data.msg + '</p> <br>');
            }
        )
        socket.on(
            'usernames',
            data => {
                let html = '';
                for (let i = 0; i < data.length; i++) {
                    html += `<p><i class="fa-solid fa-circle-user"></i> ${data[i]}</p>`
                }
                users.html(html);
            }
        )
        socket.on(
            'whisper',
            data => {
                chatContainer.append(`<p class="whisper">${data.user}:<b>${data.msg}</b>`)
            }
        )

    }
);

