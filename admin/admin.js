
$(document).ready(function () {
  let productCreate = $("#create_product");
let userCreate = $("#create_user");
let productManage = $("#manage_product");
let userManage = $("#manage_user");
let uploadBtn = $(".upload-btn");
let userData;

let product_data;

$('.reload').click(function(){
  location.reload()
})
DashboardSwitch();
function DashboardSwitch() {
  productCreate.click(function createProduct() {
    $(".create-product").show();
    $(".create-user").hide();
    $(".products ").hide();
    $(".users").hide();
  });
  userCreate.click(function () {
    $(".create-product").hide();
    $(".create-user").show();
    $(".products ").hide();
    $(".users").hide();
  });
  productManage.click(function () {
    $(".create-product").hide();
    $(".create-user").hide();
    $(".products ").show();
    $(".users").hide();
  });
  userManage.click(function () {
    $(".create-product").hide();
    $(".create-user").hide();
    $(".products ").hide();
    $(".users").show();
  });
}

  let myProducts = [];
  let jewelery = [];

                      // USER SECTION

// CREATE USER TAB
$("#create_user").click(function(){
 
$('.create-user-btn').click(function(){

 userData = {
    'name':`${$('.user_name').val()}`,
    'phone':`${$('.user_phone').val()}`,
    'email':`${$('.user_email').val()}`,
    'password':`${$('.user_password').val()}`,
}


  $.ajax({
    type:'get',
    url:'http://159.65.21.42:9000/users',
    success:function(users){
        for(let i=0; i<users.length; i++){
            if(users[i].email===userData.email){
                $('.existing-email-error').show()
            }else{
                createUser()
            }
        }
    },
    error:function(error){
        console.log(error)
    }
})
})

})

// MANAGE USER TAB
$("#manage_user").click(function(){
  $(".loader").show();
$.ajax({
  type:'get',
  url:'http://159.65.21.42:9000/users',
  success:function(users){
    $(".loader").hide();
    for(let i=0; i<users.length; i++){
      $('.users').append(renderUser(users[i]))
    }
  },
  error:function(error){
    console.log(error)
  }
})

//EDIT USER DETAILS
$(document).on('click', '.editUser', function(){
  let user_id = $(this).attr('userId')
  let url =`http://159.65.21.42:9000/user/${user_id}`
  let url2 ='http://159.65.21.42:9000/users'
  let u
  
  $.ajax({
    type:'get',
    url:url2,
    success:function(user){
     for(let i=0; i<user.length; i++){
      if(user[i]._id==user_id){
        u= user[i]
      }
      
     }

      $('.user_name').val(u.name)
      $('.user_phone').val(u.phone)
      $('.user_email').val(u.email)
      $('.user_password').val(u.password)

     $('.create-user-btn').hide()
     $('.users').hide()
     $('.update-user-btn').show()
     $('.create-user').show()

      // $('.user_name').val(user.name)
      // $('.user_phone').val(user.phone)
      // $('.user_email').val(user.email)
      // $('.user_password').val(user.password)

    },
    error:function(error){
      console.log(error)
    }
  })

  //UPDATE EDITED USER TO API
  $('.update-user-btn').click(function(){
    
    userData = {
      'name':`${$('.user_name').val()}`,
      'phone':`${$('.user_phone').val()}`,
      'email':`${$('.user_email').val()}`,
      'password':`${$('.user_password').val()}`,
  }

    $.ajax({
      type:'put',
      url:url,
      data:userData,
      success:function(done){
        console.log(done)
        $('.success').show()
        $('.user_name').val('')
        $('.user_phone').val('')
        $('.user_email').val('')
        $('.user_password').val('')
      },
      error:function(error){
        console.log(error)
        $('.failed').show()
      }
    })

  })



})

//DELETE USER
$(document).on('click', '.deleteUser', function(){
  let user_id = $(this).attr('userId')
  let url =`http://159.65.21.42:9000/user/${user_id}`

  $.ajax({
    type:'delete',
    url:url,
    success:function(deleted){
      alert('Delete Operation Successful')
      location.reload()
    },
    error:function(error){
      console.log(error)
    }
  })
})




})



               //PRODUCT SECTION

// CREATE PRODUCT TAB
  $(".upload-btn").click(function () {

    // location.replace('catalogue.html')    
    // product_data = {
    //   'name': `${$("#product-name").val()}`,
    //   'description': `${$("#product-description").val()}`,
    //   'quantity': `${$("#product-quantity").val()}`,
    //   'price': `${$("#product-price").val()}`,
    //   'category':`${ $("#product-category").val()}`,
    //   'image': `${$("#product-image").val()}`,
    // };
    
    
    //     $.ajax({
    //       type: "post",
    //       data:product_data,
    //       url:'http://159.65.21.42:9000/create/product',
    //       success:function(created){
            
    //         // alert(`${created.name} has been created successfully`)
    //       // location.reload()  
    //       location.replace('catalogue.html')          
    //         return created
    //       },
    //       error:function(error){
    //         console.log(error)
    //       }
    //     });

    //     $('.created-product-name').html(created.name)
    //     $('.createdSuccessfully').show()
        location.reload();
      });
    


  //MANAGE PRODUCT TAB
  $("#manage_product").click(function () {
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
          let eachProduct = renderProduct(jewelery[i]);
          // let fashionProducts= renderFashionProducts(jewelery[i])
          $(".products").append(eachProduct);
          // $('.fp').append(fashionProducts)
        }
      },
      error: function (error) {
        $(".loader").hide();
        console.log(error);
      },
    });
  });

  //DELETE PRODUCT
  let id;
  let item_image;
  $(document).on("click", ".deleteButton", function () {
    id = $(this).attr("item-id");

    $.ajax({
      type: "delete",
      url: `http://159.65.21.42:9000/product/${id}`,
      success: function () {
        alert("Product deleted");
        location.href="admin.html"
       
        $(".products ").show();
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  //EDIT PRODUCT (SEND DATA TO INPUT FIELD)
  $(document).on("click", ".editButton", function dataFromEdit() {
    id = $(this).attr("item-id");
   
    $.ajax({
      type: "get",
      url: ` http://159.65.21.42:9000/product/${id}`,
      success: function (item) {
        item_image=item.image
        $("#product-name").val(item.name);
        $("#product-description").val(item.description);
        $("#product-quantity").val(item.quantity);
        $("#product-price").val(item.price);
        $("#product-category").val(item.category);
        // $('#product-image').val(item.image)

        //    createProduct()
        $(".create-product").show();
        $(".edit-heading").show();
        $(".update-btn").show();
        $(".products").hide();
        $(".upload-btn").hide();
      },
      error: function (error) {
        console.log(error);
      },
    });

    return id;
  });

  //UPDATE PRODUCT (SEND FROM INPUT FIELD TO API)
  $(".update-btn").click(function () {
product_data = {
  'name': $("#product-name").val(),
  'description':$("#product-description").val(),
  'quantity': $("#product-quantity").val(),
  'price': $("#product-price").val(),
  'category': $("#product-category").val(),
  'image':item_image

};

console.log(product_data )
    $.ajax({
      type: "put",
      data:product_data,
      url:`http://159.65.21.42:9000/update/product/${id}`,
      success:function(update){
      
        alert(`Product ${update.title} has been updated successfully`)
      },
      error:function(error){
        console.log(error)
      }
    });

    // location.reload();
  });




});

function renderProduct(data) {
  return `
    <div class="each-product">
    <div class="product-list-image">
      <img src= http://159.65.21.42:9000${data.image} alt="">
    </div>
   <div class="product-list-text">
   <p class="name">Name: ${data.name} </p>
   <p class="description-cut-width">Desc: ${data.description}</p>
   <p>Quantity: ${data.quantity}</p>
   <p>Price: ${data.price}</p>
   <p>Category: ${data.category}</p>
       <button class="editButton" item-id=${data._id}>Edit</button> 
       <button class="deleteButton" item-id=${data._id}>Delete</button>
   </div>
  </div>
    `;
}
function renderUser(u){
  return`

  <div class="user-detail flex">
  <div class="detail-width">
    <h1>Name: ${u.name}</h1>
  <h4>Phone: ${u.phone}</h4>
  <h4>Email: ${u.email}</h4>
  <h4>Password: ${u.password}</h4>
  <button class="editUser" userId="${u._id}">Edit</button><button class="deleteUser" userId="${u._id}">Delete</button>
</div>

  `
}
function createUser(){
  $.ajax({
 
      type:'post',
      url:'http://159.65.21.42:9000/register',
      data:userData,
      success:function(){
          $('.user_name').val('')
          $('.user_phone').val('')
          $('.user_email').val('')
          $('.user_password').val('')
          // alert('Account created successfully. Proceed to login')
          // location.reload()
      },
      error:function(error){
          console.log(error)
      }
  })
}

