
$(document).ready(function(){
    let jewelery=[]
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
      if (one.category == "voo") {
        // console.log(one)
        jewelery.push(one);
      }
    }

    for (let i = 0; i < jewelery.length; i++) {
      let eachProduct = renderProduct(jewelery[i]);
      // let fashionProducts= renderFashionProducts(jewelery[i])
      $(".catalogue").append(eachProduct);
      // $('.fp').append(fashionProducts)
    }
  },
  error: function (error) {
    $(".loader").hide();
    console.log(error);
  },
});
})









function renderProduct(data) {
    return `
      <div class="each-catalogue">
      <div class="catalogue-list-image">
        <img src= http://159.65.21.42:9000${data.image} alt="">
      </div>
     <div class="product-list-text">
     <p class="name">Name: ${data.name} </p>
     <p class="description-cut-widt">Description: ${data.description}</p>
     <p>Quantity: ${data.quantity}</p>
     <p>Price: ${data.price}</p>
     <p>Category: ${data.category}</p>
     </div>
    </div>
      `;
  }