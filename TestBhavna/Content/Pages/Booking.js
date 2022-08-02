$(document).ready(function () {
    getlisT();
    listget();
    
    GetProductDetails();

});
var saveorder = function () {

    var proid = $("#txtProductId1").val();
    var size = $("#ddlsize").val();
    var price = $("#txtprice").val();
    var totalprice = $("#txttlp").val();
    var name = $("#txtname").val();
    var mobileno = $("#txtnum").val();
    var city = $("#ddlscity").val();
    var address = $("#txtaddress").val();
    var note = $("#txtnote").val();
    var deliverydate = $("#txtddate").val();
    var model = { ProductId: proid, Size: size, Price: price, TotalPrice: totalprice, Name: name, MobileNo: mobileno, City: city, Address: address, Note: note, Deliverydate: deliverydate }

    $.ajax({
        
        url: "/Booking/SaveBooking",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("submit successfully");
        }
    });
}
var getlisT = function () {
    $.ajax({
        url: "/Booking/SPList",
        method: "post",
        contentType: "application/json.charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "";
                $("#tblBooking tbody").empty(),
                $.each(response.model, function (index, elementValue) {
                    html += "<tr><td>" + elementValue.ProductId + "</td><td>" + elementValue.ProductName + "</td><td>" + elementValue.Name + "</td><td>" + elementValue.Address +"</td></tr>";
                });
            $("#tblBooking tbody").append(html);
        }
    });
}

var listget = function () {
    
    $.ajax({
        
        url: "/Booking/GetList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "";
           $("#tblBookinggfdg tbody").empty();
            $.each(response.model, function (index, elementValue) {
                html += "<tr><td>" + elementValue.OrderId + "</td><td>" + elementValue.ProductId +
                    "</td><td>" + elementValue.Size + "</td><td>" + elementValue.Price + "</td><td>"
                    + elementValue.TotalPrice + "</td><td>" + elementValue.Name + "</td><td>"
                    + elementValue.MobileNo + "</td><td>" + elementValue.City + "</td><td>"
                    + elementValue.Address + "</td><td>" + elementValue.Note + "</td><td>"
                    + elementValue.DeliveryDateString + "</td></tr>";
            });
            $("#tblBookingdgrg tbody").append(html);
        }

    });
}

var listget = function () {

    $.ajax({

        url: "/Booking/Linqlist",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "";
            $("#tblBook tbody").empty();
            $.each(response.model, function (index, elementValue) {
                html += "<tr><td>" + elementValue.ProductId +
                    "</td><td>" + elementValue.ProductName + "</td><td>" + elementValue.Name + "</td><td>"
                    + elementValue.Address + "</td></tr>";
            });
            $("#tblBook tbody").append(html);
        }

    });
}

var deleteItem = function (Oid) {
    var model = { OrderId: Oid };
    $.ajax({
        url: "/Booking/Dlt",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            alert("Item Deleted Successfully ....");
        }
    });
}

var GetProductDetails = function () {
    var id = $("#hdnpid").val();
    var model = { ID: id };
    $.ajax({
        url: "/Product/GetProductDetails",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        datatype: "JSON",
        success: function (response) {
            
            $("#lblproductname").text(response.ProductName);
            $("#imgproduct").attr('src','../Content/img/' + response.ProductPhoto);
            $("#lblMdate").text(response.MDateString);
            $("#lblEdate").text(response.EDateString);
            $("#lblUnit").text(response.Unit);
            $("#lblsize").text(response.Size);
            $("#txtprice").val(response.Price);
            $("#txttlp").val(response.TotalPrice);
            $("#lblprice").text(response.Price);
        }
    });
}

