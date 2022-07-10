
$(
    () => {


        

        $('.user__input').focus(
            ()=>{
                $('#line_b').animate({
                    width: "100%"
                }, 500)
            }
        )
        $('.user__input').focusout(
            ()=>{
                $('#line_b').animate({
                    width: "0"
                },1000)
            }
        )
        
        
        $('#chat__section').slideUp()
        $('#comment__btn').click(
            ()=>{
                setTimeout(() => {
                    $('#chat__section').slideDown(900)
                }, 500);
                $('.graphic__v').animate({
                    width: "80%"
                },500);
            }
        )
        $('.box__hidden').hide()
        $('#minim').click(
            ()=>{
                $('#chat__section').animate({
                    bottom: "-1000"
                }, 500);
                setTimeout(() => {
                    $('#chat__section').hide()
                }, 500);
                $('.box__hidden').show()
            }
        )
        $('#close').click(
            ()=>{
                setTimeout(() => {
                    $('.graphic__v').animate({
                        width: "100%"
                    },500)
                }, 900);
                $('#chat__section').fadeOut(900)
            }
        )

        $('#maxim__alt').click(
            ()=>{
                $('#chat__section').animate({
                    bottom: "0"
                }, 500);
                setTimeout(() => {
                    $('#chat__section').fadeIn()
                }, 500);
                $('.box__hidden').hide()
            }
        )
        $('#close__alt').click(
            ()=>{
                setTimeout(() => {
                    $('.graphic__v').animate({
                        width: "100%"
                    },500)
                }, 900);
                $('.box__hidden').fadeOut(900)
            }
        )
        
        if ($(window).width() < 700) {
            $('#list__people').hide()
            $('.btn__mn').show();
            $('.btn__mn').click(
                ()=>{
                    $('#list__people').toggle(1000)
                }
            );
        }
    }
);
