$(document).ready(function(){
   let dividedLocation= location.href.split('=')
   let id = dividedLocation[1]
    let product_details =''    

$.ajax({
    type:'get',
    url: `http://159.65.21.42:9000/product/${id}`,
    success:function (product){
        product_details = product

    $('.product-title').html(product.name)
    $('.product-price').html('£'+product.price)
    $('.product-description').html('Description: '+product.description)
    $('.p-image1').attr('src',`http://159.65.21.42:9000${product.image}`)
    $('.p-image2').attr('src',`http://159.65.21.42:9000${product.image}`)
    $('.p-image3').attr('src',`http://159.65.21.42:9000${product.image}`)
    $('.product-title').html(product.name)
    $('.product-title').html(product.name)

    },
    error:function(error){
        console.log(error)
    }
})


// ADD TO CART BUTTON CONFIGURATION

$('.add-to-cart-btn').click(function(){
    
let cart_content = localStorage.getItem('cart')
let arr_of_cart_content = []

if(cart_content){
    arr_of_cart_content = JSON.parse(cart_content)
    arr_of_cart_content.push(product_details)
    localStorage.setItem('cart', JSON.stringify(arr_of_cart_content))
alert('New Product added to cart')
    
}else{
    arr_of_cart_content.push(product_details)
    localStorage.setItem('cart', JSON.stringify(arr_of_cart_content))

}

})





})

// for(let i=0; i<product.length; i++){
//     let eachProduct = product[i]
// }
