$(document).ready(function () {
    getlist();
});


//var SaveCustEvent = function () {

//    var customerName = $("#txtCustName").val();
//    var mobileNo = $("#txtMobileNo").val();
//    var whatsappNo = $("#txtWhatsappNo").val();
//    var eventType = $("#ddlEventType").val();
//    var eventDate = $("#txtEventDate").val();

//    var model = { CustomerName: customerName, MobileNo: mobileNo, WhatsappNo: whatsappNo, EventType: eventType, EventDate: eventDate };
//    $.ajax({
//        url: "/Customer/SaveCustEvent",
//        method: "Post",
//        data: JSON.stringify(model),
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//            alert("Successfull");
//        }
//    })
//};


//var GetEventList = function () {
//    $.ajax({
//        url: "/Customer/GetEventList",
//        method: "Post",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        async: false,
//        success: function (response) {
//            var html = "";
//            debugger
//           /* $("#tblCustomerEvent tbody").empty();*/
//            $.each(response.model, function (index, elementValue) {
//                html += "<tr><td>" + elementValue.EventId + "</td><td>" + elementValue.CustomerName +
//                    "</td><td>" + elementValue.MobileNo + "</td><td>" + elementValue.WhatsAppNo + "</td><td>"
//                    + elementValue.EventType + "</td><td>" + elementValue.EveDate + "</td></tr>";
//            });
//            $("#tblCustomerEvent tbody").append(html);
//        }

//    });
//}

var saveCustEvent = function () {
    var msg;
    $formData = new FormData();
    var photo = document.getElementById('File1');;
    if (photo.files.length > 0) {
        for (var i = 0; i < photo.files.length; i++) {
            $formData.append('file-' + i, photo.files[i]);
        }
    }

    var customerName = $("#txtCustName").val();
    var mobileNo = $("#txtMobileNo").val();
    var whatsappNo = $("#txtWhatsappNo").val();
    var eventType = $("#ddlEventType").val();
    var eventDate = $("#txtEventDate").val();

    $formData.append('CustomerName', customerName);
    $formData.append('MobileNo', mobileNo);
    $formData.append('WhatsappNo', whatsappNo);
    $formData.append('EventType', eventType);
    $formData.append('EventDate', eventDate);


    if (customerName == "") {
        alert("Please Enter Customer Name");
    }

    else if (mobileNo == "") {
        alert("Please Enter MobileNo");
    }

    else if (whatsappNo == "") {
        alert("Please Enter whatsappNo");
    }

    else if (eventType == "") {
        alert("Please Enter EventType");
    }
    else if (eventDate == "") {
        alert("Please Enter EventDate");
    }
    else if (photo == "") {
        alert("Please Upload Photo");
    }

    $.ajax({
        url: "/Customer/SaveCustEvent",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",

        contentType: false,
        processData: false,
        success: function (response) {
            alert("Success");
        }

    });
}




var getlist = function () {
    {
        $.ajax({
            url: "/Customer/AllEvent",
            method: "post",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                var html = "";
                $.each(response.model, function (index, elementValue) {
                    html += "<tr><td>" + elementValue.EventId + "</td><td>" + elementValue.CustomerName + "</td><td>" + elementValue.MobileNo + "</td><td>" + elementValue.WhatsAppNo + "</td><td>" + elementValue.EventType + "</td><td>" + elementValue.EveDate + "</td><td><img src='../Content/img/" + elementValue.photo + "'/height='100px',width'100px' ></td></tr>";
                
                });
                $("#tblCustomerEvent tbody").append(html);
                
            }
        });
    }
}

var deleteItem = function (EId) {
    var model = { EventId: EId };
    $.ajax({
        url: "/Customer/DltEvent",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            alert("Event Deleted Successfully ....");
        }
    });
}
