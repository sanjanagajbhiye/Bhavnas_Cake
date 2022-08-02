$(document).ready(function () {
    getlist();
    $("#txtCatName").focus();

    $("#txtCatName").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/Product/SearchCatagory",
                type: "POST",
                dataType: "json",
                data: { Prefix: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.CategoryName, value: item.CategoryName };
                    }))
                }
            })
        },
        minLength: 2,
        select: function (event, ui) {
            $("#txtCatName").val(ui.item.CategoryName);
        }

    });
});
var saveAddCategory = function () {
    var categoryname = $("#txtCategoryName").val();

    var model = { CategoryName: categoryname,};
    $.ajax({
        url: "/Product/SaveAddCategory",
        method: "Post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("Category Added!");
        }
    })
};

var getlist = function () {
    {
        $.ajax({
            url: "/Product/GetCatagory",
            method: "post",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                var html = "";
                $("#tblCategory tbody").empty();
                $.each(response.model, function (index, elementValue) {
                    html += "<tr><td>" + elementValue.CategoryId + "</td><td>" + elementValue.CategoryName + "</td></tr>"; 
                });
                $("#tblCategory tbody").append(html);
                
            }
        });
    }
}
