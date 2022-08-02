$(document).ready(function () {
    var id = $("#hdncid").val();

    getAdProductList(id);
    getlist();

});

var saveaddProduct = function () {
    var message = "";
    $formData = new FormData();

    var productphoto = document.getElementById('File1');;
    if (productphoto.files.length > 0) {
        for (var i = 0; i < productphoto.files.length; i++) {
            $formData.append('file-' + i, productphoto.files[i]);

        }
    }
    
    var pname = $("#txtProductName").val();
    var categoryid = $("#ddlCategoryId").val();
    var price = $("#txtPrice").val();
    var size = $("#txtSize").val();
    var unit = $("#txtUnit").val();
    var mdate = $("#txtManufacturingDate").val();
    var edate = $("#txtExpiryDate").val();
    
    $formData.append('ProductName', pname);
    $formData.append('CategoryId', categoryid);
    $formData.append('Price', price);
    $formData.append('Size', size);
    $formData.append('Unit', unit);
    $formData.append('ManufacturingDate', mdate);
    $formData.append('ExpiryDate', edate);

    $.ajax({
        url: "/Product/SaveAddProduct ",
        method: "Post",
        data: $formData,
        contentType: "application/json;charset=utf-8",

        contentType: false,
        processData: false,
        success: function (response) {
            alert("Product Added Successfully !");


        }
    });
}



var getAdProductList = function (CategoryId) {
    var model = { CategoryId: CategoryId };
        $.ajax({
            url: "/Product/GetAdProductList",
            method: "post",
            data: JSON.stringify(model),
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                var html = "";

                $('#tblProduct').empty();
                $.each(response.model, function (Index, elementValue) {
                   // html += "<tr><td>" + elementValue.ProductId + "</td><td>" + elementValue.ProductName + "</td><td>" + elementValue.CategoryId + "</td><td>" + elementValue.Price + "</td><td>" + elementValue.Size + "</td><td>" + elementValue.Unit + "</td><td><img src='../Content/img/" + elementValue.ProductPhoto + "'</td><td>" + elementValue.MDateString + "</td><td>" + elementValue.EDateString + "</td></tr>";
                    html += "<div class='col l3 s4 '>";
                    html += "<div class='card card_hover'>";
        
                    html += "<div class='zoom_img card-image'>";
                    html += "<img src='../Content/img/" + elementValue.ProductPhoto + "'/>";
                    html += "</div>";
                    html += "<div class='card-content content-under-recent-image' style='padding: 4px 4px 4px 4px;text-align:center'>";
                    html += "<div class='center-align truncate' style='font-size:17px;color:#666666;'>"+ elementValue.ProductName +"</div>";
                    html += "<div style='width:100%'>";
                    html += "<span style='font-weight:700;font-size:17px;color:#333333' class='moneySymbol'>₹</span>";
                    html += "<span style='font-weight:700;font-size:17px;color:#333333' class='moneyCal' >"+ elementValue.Price +"</span>";
                    html += "<span style='text-decoration:line-through;color:#666666; font-size:14px; padding-left: 3px; '>";
                    html += "<span class='moneySymbol'>₹</span >";
                    html += "<span style='color:#666666' class='discountRate' data-inr='1,699'>1, 699</span >";
                    html += "</span>";
                    html += "<span style='color:#DA0E83;font-weight: 700;font-size:12px;padding-left:5px'>41 % off</span >";
                    html += "</div>";
                    //html += "<a href='~/ProdDes/Index' id='Submit1'>";
                    html += "<input id='Submit1' type='submit' value='Order Now' class='btn-success' onclick='goToProduct(" + elementValue.ProductId + ")' width='' />";
                    html += "</a>";
                    html += "</div>";
                    html += "</a>";
                    html += "</div>";
                    html += "</div>";
                });
                $("#tblProduct").append(html);
            }
        });
    
}
var goToProduct = function (id) {
    window.location.href = "../Product/ProductDetails?pid="+id;
};

var getlist = function () {
    {
        $.ajax({
            url: "/Product/GetCatagory",
            method: "get",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                var html = "";
                $("#ddlCategoryId").empty();
                $.each(response.model, function (index, elementValue) {
                    html += "<option value="+ elementValue.CategoryId +">" + elementValue.CategoryName + "</option>";
                });
                $("#ddlCategoryId").append(html);

            }
        });
    }
}