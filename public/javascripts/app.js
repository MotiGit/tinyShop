// add to cart function
var cart = [];
var product = {};


function addToCart(product) {



    cart.push(product);


    cart = cart.filter(function (elem, index, self) {

        return index == self.indexOf(elem);
    });

    
    document.getElementById("cartCnt").innerHTML = "(" + cart.length + ")";

    var sum = 0;
    
    for (var i = 0; i < cart.length; i++) {
         
        sum += cart[i];
      
       
    }
    
     document.getElementById("total").innerHTML = "Cart Total Is: "  + sum.toFixed(2) + "<br>";
     
    document.getElementById("prodInCart").innerHTML = "(" + cart.length + ")" + " Products In cart" + "<br>";
    
}

// color input fields
function myfocus(element) {
    element.style.backgroundColor = '#fff6e1';
    element.style.color = 'black';
}

function myblur(element) {
    element.style.backgroundColor = '#e6e6e6';
    element.style.color = 'black';
}

// forms errors

function checkDeleteProduct() {
    var error = false;

    /**********************/
    /*     CHECK ID     */
    /**********************/

    var id = document.forms["deleteadminProducts"]["id"].value;
    if (id == "") {
        document.getElementById("alertproductID").innerHTML = "Product ID must be filled";
        error = true;
    }

    /*********************************/
    /*    CHECK IF ANY WRONG FIELD   */
    /*********************************/

    if (error) {
        return false;
    }
}


function checkForm() {
    var error = false;

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


    /**********************/
    /*     CHECK USERNAME     */
    /**********************/

    var username = document.forms["myForm"]["username"].value;
    if (username == "") {
        document.getElementById("alertname").innerHTML = "Username must be filled";
        error = true;
    } else if (username.length < 2) {
        document.getElementById("alertname").innerHTML = "Username is to short";
        error = true;
    }
    /****************************/
    /*    CHECK EMAIL ADDRESS   */
    /****************************/
    var email = document.forms["myForm"]["email"].value;
    if (email == "") {
        document.getElementById("alertmail").innerHTML = "Email address must be filled";
        error = true;
    }


    /**********************/
    /*     CHECK PASSWORD     */
    /**********************/

    var password = document.forms["myForm"]["password"].value;
    if (password == "") {
        document.getElementById("alertpassword").innerHTML = "Password must be filled";
        error = true;
    }

    /*********************************/
    /*    CHECK IF ANY WRONG FIELD   */
    /*********************************/

    if (error) {
        return false;
    }
}



/**********************/
/*    LOGIN CHECK     */
/**********************/



function checkmyLogin() {
    var error = false;

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


    /**********************/
    /*     CHECK USERNAME     */
    /**********************/

    var username = document.forms["myLogin"]["username"].value;
    if (username == "") {
        document.getElementById("alertname").innerHTML = "Username must be filled";
        error = true;
    } else if (username.length < 2) {
        document.getElementById("alertname").innerHTML = "Username is to short";
        error = true;
    }


    /**********************/
    /*     CHECK PASSWORD     */
    /**********************/

    var password = document.forms["myLogin"]["password"].value;
    if (password == "") {
        document.getElementById("alertpassword").innerHTML = "Password must be filled";
        error = true;
    }

    /*********************************/
    /*    CHECK IF ANY WRONG FIELD   */
    /*********************************/

    if (error) {
        return false;
    }
}



/**********************/
/* ADMIN ADD USER CHECK  */
/**********************/

function checkUserAdd() {
    var error = false;

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


    /**********************/
    /*     CHECK USERNAME     */
    /**********************/

    var username = document.forms["adminAddUser"]["username"].value;
    if (username == "") {
        document.getElementById("alertname").innerHTML = "Username must be filled";
        error = true;
    } else if (username.length < 2) {
        document.getElementById("alertname").innerHTML = "Username is to short";
        error = true;
    }

    /****************************/
    /*    CHECK EMAIL ADDRESS   */
    /****************************/
    var email = document.forms["adminAddUser"]["email"].value;
    if (email == "") {
        document.getElementById("alertmail").innerHTML = "Email address must be filled";
        error = true;
    }


    /**********************/
    /*     CHECK PASSWORD     */
    /**********************/

    var password = document.forms["adminAddUser"]["password"].value;
    if (password == "") {
        document.getElementById("alertpassword").innerHTML = "Password must be filled";
        error = true;
    }



    /*********************************/
    /*    CHECK IF ANY WRONG FIELD   */
    /*********************************/

    if (error) {
        return false;
    }
}

/**********************/
/* ADMIN ADD Product CHECK  */
/**********************/

function checkProductAdd() {
    var error = false;

    /**********************/
    /*     CHECK category     */
    /**********************/

    var category = document.forms["adminAddProduct"]["categoryAdd"].value;
    if (category == "") {
        document.getElementById("alertcategory").innerHTML = "Category must be filled";
        error = true;
    }

    /****************************/
    /*    CHECK Name   */
    /****************************/
    var productName = document.forms["adminAddProduct"]["productNameAdd"].value;
    if (productName == "") {
        document.getElementById("alertPname").innerHTML = "product Name must be filled";
        error = true;
    }

    /**********************/
    /*     CHECK price     */
    /**********************/

    var price = document.forms["adminAddProduct"]["priceAdd"].value;
    if (price == "") {
        document.getElementById("alertprice").innerHTML = "Price must be filled";
        error = true;
    }

    /**********************/
    /*     CHECK image     */
    /**********************/

    var image = document.forms["adminAddProduct"]["imageAdd"].value;
    if (image == "") {
        document.getElementById("alertimage").innerHTML = "Image link must be filled";
        error = true;
    }


    /**********************/
    /*     CHECK description     */
    /**********************/

    var description = document.forms["adminAddProduct"]["descriptionAdd"].value;
    if (description == "") {
        document.getElementById("alertdescription").innerHTML = "Description must be filled";
        error = true;
    }

    /*********************************/
    /*    CHECK IF ANY WRONG FIELD   */
    /*********************************/

    if (error) {
        return false;
    }
}


/**********************/
/* ADMIN ADD Product CHECK  */
/**********************/

function checkProductEdit() {
    var error = false;


    var id2 = document.forms["adminEditProduct"]["id2"].value;
    if (id2 == "") {
        document.getElementById("alertid2").innerHTML = "ID must be filled";
        error = true;
    }
    /****************************/
    /*    CHECK product Name   */
    /****************************/
    var editName = document.forms["adminEditProduct"]["editName"].value;
    if (editName == "") {
        document.getElementById("alerteditName").innerHTML = "product Name must be filled";
        error = true;
    }

    /**********************/
    /*     CHECK category     */
    /**********************/

    var category = document.forms["adminEditProduct"]["category"].value;
    if (category == "") {
        document.getElementById("alertcategoryEdit").innerHTML = "Category must be filled";
        error = true;
    }



    /**********************/
    /*     CHECK price     */
    /**********************/

    var price = document.forms["adminEditProduct"]["price"].value;
    if (price == "") {
        document.getElementById("alertpriceEdit").innerHTML = "Price must be filled";
        error = true;
    }

    /**********************/
    /*     CHECK image     */
    /**********************/

    var image = document.forms["adminEditProduct"]["image"].value;
    if (image == "") {
        document.getElementById("alertimageEdit").innerHTML = "Image link must be filled";
        error = true;
    }


    /**********************/
    /*     CHECK description     */
    /**********************/

    var description = document.forms["adminEditProduct"]["description"].value;
    if (description == "") {
        document.getElementById("alertdescriptionEdit").innerHTML = "Description must be filled";
        error = true;
    }

    /*********************************/
    /*    CHECK IF ANY WRONG FIELD   */
    /*********************************/

    if (error) {
        return false;
    }
}

function show_send() {
    var agree = document.forms["myForm"]["agree"].checked;
    var x = document.getElementById("sendMe");
    if (!agree) {
        x.disabled = true;
        x.style.opacity = 0.5;
        x.style.cursor = "default";



    } else {
        x.disabled = false;
        x.style.opacity = 1;
        x.style.cursor = "pointer";
    }

}

function show_delete() {
    var agree = document.forms["deleteadminProducts"]["agree"].checked;
    var x = document.getElementById("sendMe");
    if (!agree) {
        x.disabled = true;
        x.style.opacity = 0.5;
        x.style.cursor = "default";



    } else {
        x.disabled = false;
        x.style.opacity = 1;
        x.style.cursor = "pointer";
    }

}

function show_edit() {
    var agree = document.forms["adminEditProduct"]["editSure"].checked;
    var x = document.getElementById("sendMea");
    if (!agree) {
        x.disabled = true;
        x.style.opacity = 0.5;
        x.style.cursor = "default";



    } else {
        x.disabled = false;
        x.style.opacity = 1;
        x.style.cursor = "pointer";
    }

}