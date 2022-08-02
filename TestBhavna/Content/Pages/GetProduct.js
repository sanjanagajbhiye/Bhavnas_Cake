$(document).ready(function () {
    getProductDetails();
});

var getProductDetails = function () {
    var id = $("#hdnpid").val();
    var model = { ID : id };
    $.ajax({
        url: "/Product/GetProductDetails",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        datatype: "JSON",
        success: function (response) {
            var html = "";
            $('#tblProduct').empty();
          /*  html += "<body style='background-color: #FFF5EE !important; '>"*/
            html += "<div class='col s12' style='padding-left: 10px; padding-right: 100px; '>";
            html += "<div class='col s12 breadcrumb-wrapper' style='padding-top: 2px;padding-bottom: 9px;'>";
            html += "<a href = '~/Home/Index' class='breadcrumb'>Home</a>";
            html += "<svg width = '16' height = '27' viewBox = '0 0 16 27' class='breadcrumb-delim'>";
            html += "<path d = 'M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z'></path>";
            html += "</svg >";
            html += "<a class='breadcrumb' href = '~/Product/AllCakes'>All Cakes</a >";
            html += "<svg width='17' height='27' viewBox='0 0 16 27' xmlns='http://www.w3.org/2000/svg' class='breadcrumb-delim'>";
            html += "<path d='M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z'></path>";
            html += "</svg >";
            html += " <a class='breadcrumb' href='javascript:;'>" + response.ProductName + "</a > ";
            html += "</div>";
            html += " </div>";
            html += "<div class='row container' style='padding-left:50px;'>";
            html += " <div class='col-sm-6' style='align-content:center;'>";
            html += "<br />";
            html += " <div class='center-align zoom-gallery-slide active' data-slide-id='zoom' style=' margin-bottom: 18px;'>";
            html += " <div class='product-image-div' style='box-shadow: 0px 3px 6px #00000029; width: 280px; height: 280px; '>";
            html += "<a class='MagicZoom' id='zoom-v' data-options='autostart:false; expand: fullscreen; expandZoomMode: zoom; variableZoom : true; selectorTrigger: hover; zoomWidth:120%;zoomHeight:100%' href='../../../assets..in/product/primary/2014/6/31204213a.jpeg?dpr=1&amp;w=1000'>";
            html += "<img id='prod-big-image' class='bg-img delay-image lazyload' style='aspect-ratio:1/1' src='../Content/img/" + response.ProductPhoto + "' height='340px' width='340px' data-src='../../../assetsin/product/primary/2014/6/312043784.jpeg?dpr=1&amp;w=400'alt = 'Buy Chocolate  Truffle' title = 'Chocolate  Truffle'/></a > ";
            html += " </div>";
            html += " </div>";
            html += "</div>";
            html += " <div class='col-sm-6'>";
            html += "<br />";
            html += " <h3>" + response.ProductName + "</h3>";
            html += "<div class='pdPriceWrapper col l12' style='margin-bottom:10px; position: relative;margin-top: 2%;padding-left: 0;'>";
            html += "<span class='prdDesc-price' style='font-size:20px; color: #333; font-weight: normal;'> <i class='fa fa-inr' aria-hidden='true'></i> </span>";
            html += " <div class='row' style='margin-top: -10px;margin-bottom: 0px'>";
            html += "<div class='col-7' style='display: inline-block'>";
            html += " <div style='padding-right: 0;'>";
            html += " <span style='font-size:35px; padding-right:5px;' class='moneySymbol'>₹</span>";
            html += "<span class='product-price moneyCal' data-inr='549' style='color: #222; font-size:48px; font-weight: 600;' id='productPrice'>" + response.Price + "</span > ";
            html += "</div >";
            html += "</div>";
            html += "</div>";
            html += "<div class='row' style = 'margin-bottom: 0px'>";
            html += "<div class='actual-list col l12' style='color: #636466;padding-left: 0;min-height: 80px;overflow:hidden;max-height: 116px;padding-left: 11px;'>";
            html += "<ul>";
            html += "<li>Manufacturing Date:" + response.MDateString + "</li>";
            html += "<li>Expiry Date:" + response.EDateString + "</li>";
            html += "<li>" + response.Unit + "</li>";
            html += "</ul>";
            html += "</div>";
            html += "</div>";
            html += "<br />";
  
            html += "<input type='hidden' name='_csrf' value='0a66b9c5-fec4-4117-8462-9a5b1b74e98b' />";
            html += "<div id='prdut-attr-html' style='text-align:left;'>";
            html += "<div class='row' style='margin-top:0;margin-bottom:0 !important;'>";
            html += "<div class='' style='padding-left:0; position: relative;margin-bottom: 10px'>";
            html += "<label>";
            html += "<input data-name='500 gm' id='attval_5437671' class='with-gap prod-att-radio' name='att_629188' type='radio' data-priceadj='0.0000' value='5437671' checked>";
            html += "<span for='attval_5437671' style='margin-left:8px; padding-left:25px;padding-right: 15px'>500 gm</span>";
            html += "</label>";
            html += "<label>";
            html += "<input data-name='1 kg' id='attval_5437672' class='with-gap prod-att-radio' name='att_629188' type='radio' data-priceadj='500.0000' value='5437672'>";
            html += "<span for='attval_5437672' style='margin-left:8px; padding-left:25px;padding-right: 15px'>1 kg</span>";
            html += "</label>";
            html += "<label>";
            html += "<input data-name='1.5 kg' id='attval_5437673' class='with-gap prod-att-radio' name='att_629188' type='radio' data-priceadj='1000.0000' value='5437673'>";
            html += "<span for='attval_5437673' style='margin-left:8px; padding-left:25px;padding-right: 15px'>1.5 kg</span>";
            html += "</label>";
            html += "<label>";
            html += "<input data-name='2 kg' id='attval_5437674' class='with-gap prod-att-radio' name='att_629188' type='radio' data-priceadj='1500.0000' value='5437674'>";
            html += "<span for='attval_5437674' style='margin-left:8px; padding-left:25px;padding-right: 15px'>2 kg</span>";
            html += "</label>";
            html += "<label>";
            html += "<input data-name='3 kg' id='attval_5437675' class='with-gap prod-att-radio' name='att_629188' type='radio' data-priceadj='2500.0000' value='5437675'>";
            html += "<span for='attval_5437675' style='margin-left:8px; padding-left:25px;padding-right: 15px'>3 kg</span>";
            html += "</label>";
            html += "<label>";
            html += "<input data-name='4 kg' id='attval_5437676' class='with-gap prod-att-radio' name='att_629188' type='radio' data-priceadj='3500.0000' value='5437676'>";
            html += "<span for='attval_5437676' style='margin-left:8px; padding-left:25px;padding-right: 15px'>4 kg</span>";
            html += "</label>";
            html += "</div>";
            //html += "<div class='col-3' style='padding-top:20px;padding-bottom: 15px;'>";
            //html += "<label>";
            //html += "<input data-priceadj='100.0000' class='prod-att-checkbox prod-eg-check' type='checkbox' id='att_154790' name='att_154790' value='257640'>";
            //html += "<span for='att_154790' style='padding-left:25px;'>Eggless</span>";
            //html += "</label>";
            //html += "</div>";
            //html += "<div class='col-3' style='padding-top:20px;padding-bottom: 15px;padding-left:40px'>";
            //html += "<label>";
            //html += "<input data-priceadj='150.0000' class='prod-att-checkbox prod-hs-check' type='checkbox' id='att_154794' name='att_154794' value='258630'>";
            //html += "<span for='att_154794' style='padding-left:35px;'>Heart Shape</span>";
            //html += "</label>";
            //html += "</div>";
            html += "<div class='col s12 l12' style='padding-left: 0; margin-bottom: 10px;'>";
            html += "<div class='input-field col l3' style='margin-top: 10px;'>";
            html += "<input style='border: 1px solid #DFDFDF; box-shadow: 0px 1px 2px #00000029; padding: 0 10px; min-width: 250px; margin-bottom: 0; height: 43px; background-color: white !important' data-length='30' maxlength='30' id='msgOnCakeAtt' value='' required data-id='155164' type='text' name='att_155164'>";
            html += "<label style='margin-left:3%;height: unset;margin-top: 3px;' id='labelForMsgOnCake' for='msgOnCakeAtt'><strong>Message</strong></label>";
            html += "</div>";
            html += "</div>";
            html += "<input style=' margin: 0 0 15px;' type='hidden' name='att_154790' value='257145'><input style=' margin: 0 0 15px;' type='hidden' name='att_154794' value='258135'>";
            html += "</div>";
            html += "</div>";
            html += "<div class='prdu-bunw-div' style='margin-bottom: 15px;'>";
            html += " <div class='col l12' style='margin-bottom: 10px;padding-left: 0;max-width: 360px'>";
            html += "<button value='AddtoCart' type='submit' class='btn prdDesc-buynow buy-now-mobile buyNowAdon cartUrl addToCart addons-ajax' onclick='goToOrder(" + response.ProductId + ")' style='background: #FF9F00; width: 100%; font-size: 16px; height: 45px; line-height: 45px; color: white !important; border-radius: 5px; background-color: #FFC000 !important;'>";
            html += "<span style='color:springgreen !important'>";
            html += "</span> <strong>Buy Now</strong>";
            html += "</button>";
            html += "</div>";
         //   html += "<div class='col l6' style='margin-bottom: 10px !important;padding-left: 0;max-width: 360px'>";
         //   html += "<button value='AddtoCart' type='submit' class='btn prdDesc-buynow buy-now-mobile buyNowAdon cartUrl addToCart addons-ajax' style='color: white !important; width: 100%; font-size: 16px; height: 45px; line-height: 45px; background-color: limegreen !important; border-radius: 5px; padding-bottom: 10px;s'>";
         //   html += "<span style='padding-right: 5px; padding-bottom:10px;vertical-align: middle;background-repeat: no-repeat;width: 14px;height: 14px;display: inline-block;'>";
         //   html += "</span><strong>Buy now</strong>";
          //  html += "</button>";
            html += "</div>";
            html += "</div>";
            html += "</div>";
            html += "</div>";
            html += "</div>";
            //html += "</body>";
           
            $("#tblProduct").append(html);
        }
    });
}


goToOrder = function (id) {
    window.location.href = "../Booking/UserBooking?pid=" + id;
}