$(document).ready(function () {
   
    getlist();
});


var getlist = function () {
    {
        $.ajax({
            url: "/Product/AdProductList",
            method: "post",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                var html = "";
                $.each(response.model, function (index, elementValue) {
                    html += "<tr><td>" + elementValue.ProductId + "</td><td>" + elementValue.ProductName + "</td><td>" + elementValue.CategoryId + "</td><td>" + elementValue.Price + "</td><td>" + elementValue.Size + "</td><td>" + elementValue.Unit + "</td><td>" + elementValue.MDateString + "</td><td>" + elementValue.EDateString + "</td><td><img src='../Content/img/" + elementValue.ProductPhoto + "'/ height='100px',width='100px' >" + "</td><td>" + "</td ><td>  <input type='button' value='delete' class='btn btn-sucess'  onClick='deleteItem (" + elementValue.ProductId + ")' /></td > <td>"
                    "</td></tr>";
                });
                $("#tblProduct tbody").append(html);
                
            }
        });
    }
};
var deleteItem = function (ProductId) {
    var model = { ProductId: ProductId };
    $.ajax({
        url: "/Product/deleteItem",
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