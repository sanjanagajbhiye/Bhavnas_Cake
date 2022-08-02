$(document).ready(function () {
    
    Contactlist();
});


var SaveCon = function () {

    var name = $("#txtName").val();
    var mobile = $("#txtMobileNo").val();
    var mail = $("#txtEmail").val();
    var msg1 = $("#txtMessage").val();

    var model = { Name: name, MobileNo: mobile, Email: mail, Message: msg1 };
    $.ajax({
        url: "/Home/SaveContact",
        method: "Post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("Successfull");
        }
    })
};

var Contactlist = function () {
    {
        $.ajax({
            url: "/Home/ContactList",
            method: "post",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                var html = "";
                $.each(response.model, function (index, elementValue) {
                    html += "<tr><td>" + elementValue.ContactId + "</td><td>" + elementValue.Name + "</td><td>" + elementValue.MobileNo + "</td><td>" + elementValue.Email + "</td><td>" + elementValue.Message
                    "</td></tr>";
                });
                $("#tblcontact tbody").append(html);
            }
        });
    }
};