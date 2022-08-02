$(document).ready(function () {

    Getorders();
});
var saveorder = function () {
    var size = $("ddlsize").val();
    var price = $("#txtprice").val();
    var totalprice = $("#txttlp").val();
    var name = $("#txtname").val();
    var mobileno = $("#txtnum").val();
    var city = $("#ddlscity").val();
    var address = $("#txtaddress").val();
    var note = $("#txtnote").val();
    var deliverydate = $("#txtddate").val();
    var model = { Size: size, Price: price, TotalPrice: totalprice, Name: name, MobileNo: mobileno, City: city, Address: address, Note: note, Deliverydate: deliverydate }

    $.ajax({
        url: "/Order/Saveorder",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("submit successfully");
        }
    });
}
var Getorders = function () {
    $.ajax({
        url: "/Order/GetOrders",
        method: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "";
            $("#tblbooking tbody").empty();
            $.each(response.model, function (index, elementValue) {
                html += "<tr><td>" + elementValue.OrderId + "</td><td>" + elementValue.ProductId +
                    "</td><td>" + elementValue.Size + "</td><td>" + elementValue.Price + "</td><td>"
                    + elementValue.TotalPrice + "</td><td>" + elementValue.Name + "</td><td>"
                    + elementValue.MobileNo + "</td><td>" + elementValue.City + "</td><td>"
                    + elementValue.Address + "</td><td>" + elementValue.Note + "</td><td>"
                    + elementValue.Deliverydate + "</td><td><input type='submit' value='Delete' class='btn-danger btn-lg rounded'  onclick=' deleteOrder(" + elementValue.OrderId + ") '/></td><tr>";
                /*  "</td ></tr>"*/
            });
            $("#tblbooking tbody").append(html);
        }

    });
}
var deleteOrder = function (OrderId) {
    var model = { OrderId: OrderId };
    $.ajax({
        url: "/Order/deleteOrder",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            alert("Record deleted successfully...");
        }
    });
}

var Order = function () {
    var id = $("#hdnpid").val();
    var model = { ID: id };
    $.ajax({
        url: "/Product/GetProductDetails",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        datatype: "JSON",
        success: function (response) {
            var html = "";

            $('#tblProduct').empty();

            html += "<body>";
            html += "<div class='container-fluid py-5'>";
            html += "<div class='containerform'>";
            html += "<div class='row justify-content-center'>";
            html += "<div class='col-lg-4 responsive-responsive' style='align-content: center; padding-left:50px !important; background-color: #e5dce2;border-radius:5px;'>";
            html += "<br />";
            html += "<div class='row img'>";
            html += "<img src='~/Content/images/65.JPG' style='height:250px !important; width:250px !important;' />";
            html += "<p style='align-content:center;font-color:black;font-size:30px;font-family:Playfair Display'>Blackforest Cake</p>";
            html += "</div>";
            html += "<div class='row'>";
            html += "<ul class='product order-details' style='line-break:10px;font-size:24px;font-family:'Century Schoolbook';'>";
            html += "<li>Flaviour: Chocolate</li>";
            html += "<li>Manufacturing date: 12 june</li>";
            html += "<li>Expiry Date: 15 june</li>";
            html += "<li>Unit:3kg</li>";
            html += "<li>Price: 499</li>";
            html += "</ul>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-lg-7 responsive-responsive' style='padding-left:34px;'>";
            html += "<div class='contact-form bg-light rounded p-5'>";
            html += "<div class='row justify-content-center'>";
            html += "<div class='col-lg-6'>";
            html += "<h1 class='section-title position-relative text-center mb-5'> Order Now </h1>";
            html += "</div>";
            html += "</div>";
            html += "<div name='sentMessage' id='contactForm' novalidate='novalidate'>";
            html += "<div class='row'>";
            html += "<div class='col-sm-6'>";
            html += "<div>";
            html += "<input type='text' class='form-control p-4' id='txtname' placeholder='Enter your name:' required='required' data-validation-required-message='Please enter your name' />";
            html += "<p class='help-block text-danger'></p>";
            html += "</div>";
            html += "<div>";
            html += "<input type='text' class='form-control p-4' id='txtnum' placeholder='Enter your number:' required='required' data-validation-required-message='Please enter your Number' />";
            html += "<p class='help-block text-danger'></p>";
            html += "</div>";
            html += "<div>";
            html += "<textarea class='form-control p-1' rows='7' id='txtaddress' placeholder='Enter your address:' data-validation-required-message='Please enter your Address' style='width:108%;'></textarea>";
            html += "<p class='help-block text-danger'></p>";
            html += "<p class='help-block text-danger'></p>";
            html += "</div>";
            html += "<div class='p-6'>";
            html += "<select id='ddlscity' class='form-control p-2 s2' style='width:108%;'>";
            html += "<option value='select city'>Select your city:</option>";
            html += "<option value='Akot'>Akot</option>";
            html += "<option value='Telhar'>Telhar</option>";
            html += "</select>";
            html += "<p class='help-block text-danger'></p>";
            html += "</div>";
            html += "</div>";
            html += "<div class='col-sm-6'>";
            html += "<div>";
            html += "<select id='ddlsize' class='form-control p-2 s1' required='required' data-validation-required-message='please enter your cake size' style='min-height:52px;width:108%;'>";
            html += "<option>Select your cake size:</option>";
            html += "<option>250gm</option>";
            html += "<option>500gm</option>";
            html += "<option>1kg</option>";
            html += "<option>1.5kg</option>";
            html += "<option>2kg</option>";
            html += "<option>2.5kg</option>";
            html += "<option>3kg</option>";
            html += "<option>3.5kg</option>";
            html += "<option>4kg</option>";
            html += "<option>4.5kg</option>";
            html += "<option>5kg</option>";
            html += "<option>5.5kg</option>";
            html += "<option>6kg</option>";
            html += "<option>6.5kg</option>";
            html += "<option>7kg</option>";
            html += "<option>7.5kg</option>";
            html += "<option>8kg</option>";
            html += "</select>";
            html += "<p class='help-block text-danger'></p>";
            html += "</div>";
            html += "<div class='control-group'>";
            html += "<input type='text' class='form-control p-4' id='txtprice' placeholder='Price:' required='required' data-validation-required-message='Please enter your price' />";
            html += "<p class='help-block text-danger'></p>";
            html += "</div>";
            html += "<div class=' control-group'>";
            html += "<input id='txtddate' type='text' placeholder='Delivery Date:' onfocus='(this.type='date')' required='required'class='form-control p-4' data - validation - required - message='Please enter your Delivery date' /> ";
            html += "<p class='help-block text-danger'></p>";
            html += "</div>";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";
            html += "";

        }
    });
}

