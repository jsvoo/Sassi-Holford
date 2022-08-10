// function animations(){
//     $('#silk_image').hover(function(){
//         $(this).hide()
//         $('#silk_video').show()
    
//         $('#silk_video').mouseout(function(){
//             $(this).hide()
//             $('#silk_image').show()

//         })



//     })
   
    






//     $('#chiswick_image').hover(function(){
//         $(this).hide()
//         $('#chiswick_video').show()
    
//         $('#chiswick_video').mouseout(function(){
//             $(this).hide()
//             $('#chiswick_image').show()

//         })
//     })
//  $('#amesbury-image').hover(function(){
//         $(this).hide()
//         $('#amesbury-video').show()
    
//         $('#amesbury-video').mouseout(function(){
//             $(this).hide()
//             $('#amesbury-image').show()

//         })
//     })







// }
// animations()
let jewelery = [];

$(document).ready(function(){
    $(".loader").show();

    $.ajax({
      type: "get",
      url: "http://159.65.21.42:9000/products",
      success: function (products) {
        $(".loader").hide();
        for (let i = 0; i < products.length; i++) {
          //    let eachProduct = renderProduct(products[i])
          //     $('.products').append(eachProduct)
          let one = products[i];
          // console.log(one)
          if (one.category == "fashion") {
            // console.log(one)
            jewelery.push(one);
          }
        }

        for (let i = 0; i < jewelery.length; i++) {
          let fashionProducts= renderFashionProducts(jewelery[i])
          $('.fashion-products-section').append(fashionProducts)
        }
      },
      error: function (error) {
        $(".loader").hide();
        console.log(error);
      },
    });

$(document).on('click', '.fp-image', '.fp-link', function(){
 let id = $(this).attr('product_id')
 location.href=`../product.html?id=${id}`
})


})









function renderFashionProducts(product){
    return`
    <div class="fp">
    <div class="fp-image" id="silk_image" product_id="${product._id}">
      <img src=http://159.65.21.42:9000${product.image} alt="" class="one" />
      
    </div>
    <div>
      <a class="fp-link">${product.name}</a>
      <p>£${product.price}</p>
    </div>
  </div>`
  }
