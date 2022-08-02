$(document).ready(function () {
    getEvent();
});
var getEvent = function () {
    {
        $.ajax({
            url: "/Customer/GetList",
            method: "post",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (response) {
                var html = "";
                $("#tblCustomerEvent").empty();
                $.each(response.model, function (index, elementValue) {
                    //html += "<tr><td>" + elementValue.EventId + "</td><td>" + elementValue.CustomerName + "</td><td>" + elementValue.MobileNo + "</td><td>" + elementValue.WhatsAppNo + "</td><td>" + elementValue.EventType + "</td><td>" + elementValue.EventDate + "</td><td><img src='../Content/img/" + elementValue.photo + "'/height='100px',width'100px' >"
                    //"</tr></td>"
                    //html += "<div class='MultiCarousel' data-items='1,3,5,6' data-slide='1' id='MultiCarousel' data-interval='1000'>"
                    //html += " <div class='MultiCarousel-inner'>"
                    html += "<div class='item'>"
                    html += "<div class='pad15'>"
                    html += "<div class='cust-event' style='height:200px;width:300px;background-color:white;box-shadow: 0px 7px 13px #00000029;'>"
                    html += "<div class='row'>"
                    html += "<br />"
                    html += "<br />"
                    html += "<div class='col-sm-3'>"
                    html += "<a href='#'>"
                    html += "<img style='height:60px;width:80px;padding-left:25px;border-radius: 50%;' src='../Content/img/" + elementValue.photo + "'/>";
                   // html += "<img style='height:60px;width:80px;padding-left:25px;' src='../Content/img/"+elementValue.photo +"'/>"
                    html += "</a>"
                    html += "</div>"
                    html += "<div class='col-sm-6'>"
                    html += "<p><strong> " + elementValue.CustomerName + " </strong></p>"
                    html += "</div></div>"
                    html += "<div class='row' style='width: 80%; padding-left: 30px; padding-top: -2px; line-height: 1.5'>"
                    html += "<p style='text-align: justify; font-family: script MT; color: #ff2c5e;'> Happy " + elementValue.EventType + " "+ elementValue.CustomerName+ " </p>"
                    html += "<p style='text-align: justify; line-height: 1.2;'>Wishes From Bhavnas Cake Team!</p>"
                    html += "</div>"
                    html += "</div>"
                    html += "</div>"
                    html += "</div>"
                    ///*  html += "</div>"*/
                    //  html += "<button class='btn btn - primary leftLst'><</button>"
                    //  html += "<button class='btn btn-primary rightLst' >></button >"
                    //  /html += "</div>"/

                });
                $("#tblCustomerEvent").append(html);
            }
        });
    }
}
var deleteItem = function (ProductId) {
    var model = { ProductId: ProductId };
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