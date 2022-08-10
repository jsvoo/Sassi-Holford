function animationStyles(){
    $('.select-bridal').hover(function(){
        $('.fashion').hide()
        $('.bridal').show()
        $(this).css('color','#9D9FA3')
    })
    $('.select-bridal').mouseout(function(){
        $(this).css('color','#000')

    })

    $('.select-fashion').hover(function(){
        $('.bridal').hide()
        $('.fashion').show()
        $(this).css('color','#9D9FA3')
    })

    $('.select-fashion').mouseout(function(){
        $(this).css('color','#000')

    })

    // $('.img1').hover(function(){
    //     $(this).hide()
    //     $('.text1').show()
        // $(this).css('color','#9D9FA3')
    // })



    
// $('.nav-bridal').hover(function(){
//     $('.mega-menu').show().css('display', 'flex')
// })
// $('.nav-bridal').mouseout(function(){
//     $('.mega-menu').hide()
// })

    
}

animationStyles()