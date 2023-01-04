let data;

let log_in_status = localStorage.getItem('logged-in')
if(log_in_status!='true'){
$('.viewcart-err').show()
}else{
  $('.viewcart-err').hide()
}


$(".signup-btn").click(function () {
  data = {
    name: `${$("#signup_name").val()}`,
    phone: `${$("#signup_phone").val()}`,
    email: `${$("#signup_email").val()}`,
    password: `${$("#signup_password").val()}`,
  };
  $.ajax({
    type: "get",
    url: "http://159.65.21.42:9000/users",
    success: function (users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === data.email) {
          $(".existing-email-error").show();
        } else {
          createUser();
        }
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
});

$(".login-btn").click(function () {
  $(".processing").show();
  let email = $("#login_email").val();
  let password = $("#login_password").val();

  $.ajax({
    // type:'get',
    // url:'http://159.65.21.42:9000/users',
    // success:function(users){
    //     $('.processing').hide()
    //     for(let i=0; i<users.length; i++){

    //         if(users[i].email===email && users[i].password===password){
    //             alert(`welcome ${users[i].name}`)
    //             $('#login_email').val('')
    //             $('#login_password').val('')
    //             location.href="cart.html"
    //         }else{

    //             $('.wrong-credentials').show()
    //         }
    //     }
    // },
    type: "post",
    data: {
      email: email,
      password: password,
    },
    url: "http://159.65.21.42:9000/login",
    success: function (done) {
      $(".processing").hide();
      $('.viewcart-err').hide()
      localStorage.setItem("logged-in", true);
    //   console.log(done);
    if(done.name !=undefined){
        $(".wrong-credentials").hide()
        $(".login_success").html(
            `Hello ${done.name}, Login Successful. Proceed to <a href='./cart/cart.html' class="cart-link">
            Shopping Bag
            </a> or <a href='./fashionshop/fashionshop.html'>Go Back to Shopping</a>`
          );
    }else{    $(".wrong-credentials").show();}
    },
    error: function (error) {
      $(".processing").hide();
      $(".wrong-credentials").show();
      console.log(error);
    },
  });
});

function createUser() {
  $.ajax({
    type: "post",
    url: "http://159.65.21.42:9000/register",
    data: data,
    success: function () {
      $("#signup_name").val("");
      $("#signup_phone").val("");
      $("#signup_email").val("");
      $("#signup_password").val("");
      // alert('Account created successfully. Proceed to login')
      // location.reload()
    },
    error: function (error) {
      console.log(error);
    },
  });
}
$(".shopping-bag").click(function () {
  location.href = "../cart/cart.html";
  //   let logged_in = localStorage.getItem("logged-in");
  //   if (logged_in) {
  //     location.href = "../cart/cart.html";
  //   } else {
  //     location.href = "../myaccount.html";
  //   }
});

function renderLoginSuccess(a) {
  return `
    
    `;
}
