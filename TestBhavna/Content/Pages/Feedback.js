$(document).ready(function () {
    getlist();
});
var save = function () {
    var name = $("#txtName").val();
    var city = $("#txtCity").val();
    var address = $("#txtAddress").val();
    var feed = $("#txtFeedback").val();

    var model = { Name: name, City: city, Address: address, Feedback: feed };
    $.ajax({
        url: "/Feedback/SaveFeedback",
        method: "Post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("Feedback Sent!");
        }
    });
};
var getlist = function () {
    {
        $.ajax({
            url: "/Feedback/GetList",
            method: "post",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                var html = "";
                $.each(response.model, function (index, elementValue) {
                    html += "<tr><td>" + elementValue.CustomerId + "</td><td>" + elementValue.Name + "</td><td>" + elementValue.City + "</td><td>" + elementValue.Address + "</td><td>" + elementValue.Feedback +
                        "</td></tr>"
                });
                $("#tblFeedback tbody").append(html);
            }
        });
    }
}