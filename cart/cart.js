$(document).ready(function () {
let log_in_status = localStorage.getItem('logged-in')
if(log_in_status!='true'){
location.href='../myaccount.html'
}


  let items_in_cart = localStorage.getItem("cart");
  let arr_of_cart_items = JSON.parse(items_in_cart);
  let totalPrice = 0;
  let eachItem;

  for (let i = 0; i < arr_of_cart_items.length; i++) {
    eachItem = arr_of_cart_items[i];
    totalPrice += eachItem.price;

    // $('.your-bag').prepend(renderCart(eachItem))
    $(".ajaxFeeder").append(renderCart(eachItem));
    $(".cart-count").html(arr_of_cart_items.length);

    if (arr_of_cart_items.length >= 2 || arr_of_cart_items.length == 0) {
      $(".plural").show();
    }
    if (arr_of_cart_items.length >= 1) {
      $(".further-interest").show();
    } else {
      $(".further-interest").hide();
    }
  }
  console.log(totalPrice);

  $(".total-price-to-checkout").html("£" + totalPrice);

  // $('.quantity-input').val(4)
}); //document.ready closure

$(document).on("click", ".remove-item", function () {
  let index = $(this).parent().parent().index();

  let cartArr = [];
  let cart = localStorage.getItem("cart");
  if (cart) {
    cartArr = JSON.parse(cart);
    cartArr.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartArr));
    $(this).parent().parent().remove();
    location.reload();
  }
});

function renderCart(x) {
  return `
    <div class="new-container flex holdIndex='">
    <div class="item">
     
        <div class="cart-item-image">
            <img src=http://159.65.21.42:9000${x.image} alt="">
        </div>
    </div>

    <div class="description">
       

        <div class="item-name-price">
            <h4>${x.name}</h4>
            <h3>SIZE 36</h3>
        </div>

        <button class="remove-item">[ REMOVE ]</button>
    </div>

    <div>
        
        <select name="quantity" class="quantity-input" id="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>

    <div class="price">
        <h3>PRICE</h3>
        <P>£${x.price}
        </P>
    </div>
</div>
    `;
}
