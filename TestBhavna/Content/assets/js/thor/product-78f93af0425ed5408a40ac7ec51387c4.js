var dragWithoutZoom = false;
var iframeHeight;

function addZoom(elm) {
    $('.prod-modal-images').slick('slickSetOption', 'swipe', true);
    var hammertime = new Hammer(elm, {});
    hammertime.get('pinch').set({
        enable: true
    });
    hammertime.get('pan').set({
        enable: true
    });
    hammertime.get('doubletap').set({
        enable: true
    });
    var posX = 0,
            posY = 0,
            scale = 1,
            last_scale = 1,
            last_posX = 0,
            last_posY = 0,
            max_pos_x = 0,
            max_pos_y = 0,
            transform = "",
            el = elm;
    doubletap = false;
    test = false;
    hammertime.on('doubletap pan panend pinch pinchend', function (ev) {
        if (ev.type == "doubletap") {
            if (dragWithoutZoom) {
                dragWithoutZoom = false;
            }
            transform =
                    "translate3d(0, 0, 0) " +
                    "scale3d(2, 2, 1) ";
            scale = 2;
            last_scale = 2;
            try {
                if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "matrix(1, 0, 0, 1, 0, 0)" &&
                        window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "none") {
                    transform =
                            "translate3d(0, 0, 0) " +
                            "scale3d(1, 1, 1) ";
                    scale = 1;
                    last_scale = 1;
                }
            } catch (err) {
            }
            el.style.webkitTransform = transform;
            posX = 0;
            posY = 0;
            last_posX = 0;
            last_posY = 0;
            $('.prod-modal-images').slick('slickSetOption', 'swipe', true);
            return;
        } else {
            if (ev.type == "pinch") {
                if (dragWithoutZoom) {
                    dragWithoutZoom = false;
                    scale = 1;
                    last_scale = 1;
                } else {
                    scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
                }
            }
            if (ev.type === "pan") {
                if (scale < 1.0 || dragWithoutZoom) {
                    $('.prod-modal-images').slick('slickSetOption', 'swipe', true);
                } else if (scale > 1.0) {
                    $('.prod-modal-images').slick('slickSetOption', 'swipe', false);
                }
                if (scale != 1 && !dragWithoutZoom) {
                    posX = last_posX + ev.deltaX;
                    posY = last_posY + ev.deltaY;
                    max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
                    max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
                    if (posX > max_pos_x) {
                        posX = max_pos_x;
                    }
                    if (posX < -max_pos_x) {
                        posX = -max_pos_x;
                    }
                    if (posY > max_pos_y) {
                        posY = max_pos_y;
                    }
                    if (posY < -max_pos_y) {
                        posY = -max_pos_y;
                    }
                }
            }
            if (ev.type == "pinchend") {
                last_scale = scale;
                if (scale != 1) {
                    posX = last_posX + ev.deltaX;
                    posY = last_posY + ev.deltaY;
                    max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
                    max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
                    if (posX > max_pos_x) {
                        posX = max_pos_x;
                    }
                    if (posX < -max_pos_x) {
                        posX = -max_pos_x;
                    }
                    if (posY > max_pos_y) {
                        posY = max_pos_y;
                    }
                    if (posY < -max_pos_y) {
                        posY = -max_pos_y;
                    }
                }

            }
            if (ev.type == "panend") {
                last_posX = posX < max_pos_x ? posX : max_pos_x;
                last_posY = posY < max_pos_y ? posY : max_pos_y;
            }

            if (scale != 1) {
                transform =
                        "translate3d(" + posX + "px," + posY + "px, 0) " +
                        "scale3d(" + scale + ", " + scale + ", 1)";
            }

            if (transform && !dragWithoutZoom) {
                el.style.webkitTransform = transform;
            }
        }
    });
}

$(function () {
    $(".productVideoButton").click(function () {
        $(".video-slide-desk").show();
        $(".productVideoStopButton").show();
        $(".productVideoButton").hide();
        $(".slick-slide picture").hide();
        $(".video-slide-desk").height(window.innerWidth + 20);
    });
    $('.productVideoStopButton,.slick-dots li').click(function () {
        $(".video-slide-desk iframe").each(function () {
            var src = $(this).attr('src');
            $(this).attr('src', src + '?rel=0');
        });
    });
    $(".slick-dots li").click(function () {
        $(".video-slide-desk").hide();
        $("picture").show();
        $(".productVideoButton").show();
        $(".productVideoStopButton").hide();
    });
    $(".pdPriceWrapper").removeClass("variation");
    setTimeout(function () {
        if ($('.prod-images').length > 0) {
            $('.prod-images').slick(
                    {
                        dots: true,
                        prevArrow: false,
                        nextArrow: false,
                        fade: true,
                        autoplaySpeed: 3000,
                        touchThreshold: 100
                    }
            );
            $("#initial_prd_img").hide();
            $("#prd_images_mbl").show();
            $('.prod-modal-images').slick(
                    {
                        infinite: true,
                        dots: false,
                        arrows: false,
//                        lazyLoad: "ondemand",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        fade: true,
                        autoplaySpeed: 3000,
                        touchThreshold: 100
                    }
            );
        }
    }, 2000);
    $(".product-img-section .productVideoStopButton").click(function () {
        $(".video-slide-desk").hide();
        $("picture").show();
        $(".productVideoButton").show();
        $(".productVideoStopButton").hide();
    });
    $(".zoom-gallery .selectors a").hover(function (e) {
        $(".video-slide-desk iframe").each(function () {
            var src = $(this).attr('src');
            $(this).attr('src', src);
        });
    });
    $(".zoom-gallery .selectors a").hover(function (e) {
        $('.zoom-gallery .zoom-gallery-slide').removeClass('active').addClass('nonactive');
        $('.zoom-gallery .selectors a').removeClass('active');

        var videoSrc = "";
//    console.log($(this).attr('data-slide-id'));
//    $(this).addClass('active');
        videoSrc = $('.zoom-gallery-slide[data-slide-id="' + $(this).attr('data-slide-id') + '"] iframe').attr("src");
        if (videoSrc == "" || videoSrc == undefined) {
            $(".videoPlaying").removeClass("videoPlaying");
        }
        if (!$('.video-slide-desk[data-slide-id="' + $(this).attr('data-slide-id') + '"]').hasClass("videoPlaying") && videoSrc) {
            $('.zoom-gallery-slide[data-slide-id="' + $(this).attr('data-slide-id') + '"] iframe').remove();
            $('.video-slide-desk[data-slide-id="' + $(this).attr('data-slide-id') + '"]').html("<iframe  style='width: 100%;height:" + iframeHeight + 'px' + "' name='frame' rel='0' src=\" " + videoSrc + "\" allowFullScreen></iframe>");
            $('.video-slide-desk[data-slide-id="' + $(this).attr('data-slide-id') + '"]').addClass("videoPlaying");
        }
        $('.zoom-gallery .zoom-gallery-slide[data-slide-id="' + $(this).attr('data-slide-id') + '"]').addClass('active').removeClass('nonactive');
        e.preventDefault();
    });
});

function DoCheckUncheckDisplay(d, addonsRemove, addAddons, addedAddons)
{
    if (d.checked === true)
    {
        document.getElementById(addonsRemove).style.display = "block";
        document.getElementById(addAddons).style.display = "none";
        document.getElementById(addedAddons).style.display = "block";
    } else
    {
        document.getElementById(addonsRemove).style.display = "none";
        document.getElementById(addAddons).style.display = "block";
        document.getElementById(addedAddons).style.display = "none";
    }
}

(function (yourcode) {

// The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);
}(function ($, window, document) {

// The $ is now locally scoped 

// Listen for the jQuery ready event on the document
    $(function () {
        document.sezzleConfig = {
            targetXPath: '#productPrice',
            renderToPath: '..'
        }
        if ($("#prod-big-image").length) {
            var length;
            var modalImg = "";
            var modal = document.getElementById("imageModal");
            var gotIt = true;
            var modalData = false;
            $(".prod-images").on("click", "#prod-big-image", function () {
                modalImg = "";
                $('.prod-modal-images').slick('slickSetOption', 'swipe', true);
                var initialIndex = $(this).parent().index();
                if (gotIt === true) {
                    $(".overlayZoom").show();
                }
                $(".overlayGotIt").click(function () {
                    gotIt = false;
                    $(".overlayZoom").hide();
                });
                modal.style.display = "block";
                length = $('#imagesLengthValue').attr('name');
                $('.prod-modal-images').slick('slickSetOption', 'swipe', true);
                for (var i = 0; i < length; i++) {
                    var imageElement = document.getElementById("modal-large-image" + i);
                    var srcImage = "";
                    if (imageElement != null && imageElement != undefined) {
                        srcImage = imageElement.src;
                    }
                    modalImg = modalImg + "<div><img class=\"zoomImage\" id=\"srcImage" + i + "\" src=\" " + srcImage + "\"></div>";
                }

                $(".prod-modal-images").slick("slickAdd", modalImg);
                for (var i = 0; i < length; i++) {
                    var image = document.getElementById("srcImage" + i);
                    addZoom(image);
                }
                var initialSlideIndex = $(this).parent().index();
                $('.prod-modal-images').slick('slickGoTo', parseInt(initialSlideIndex));
                $('.item_selected').removeClass('item_selected');
                $('.gallery-images .gallery-image').eq(initialSlideIndex).addClass('item_selected');
                $(".gallery-images").on("click", ".gallery-image", function () {
                    $('.item_selected').removeClass('item_selected');
                    $(this).closest('.gallery-image').addClass('item_selected');
                    var initialIndex = $(this).parent().index() - 1;
                    $('.prod-modal-images').slick('slickGoTo', initialIndex);
                });
                $('.prod-modal-images').on('afterChange', function (slick, slide, currentSlide) {
                    $('.item_selected').removeClass('item_selected');
                    $('#modal-image' + currentSlide).addClass('item_selected');
                });
                $('.prod-modal-images').on('beforeChange', function (slick, slide, currentSlide) {
                    document.getElementById("srcImage" + currentSlide).style.webkitTransform = "";
                    dragWithoutZoom = true;
                });
                var closeModal = document.getElementById("close-modal");
                closeModal.onclick = function () {
                    modal.style.display = "none";
                    for (var i = 0; i < length; i++) {
                        document.getElementById("srcImage" + i).style.webkitTransform = "";
                    }
                    dragWithoutZoom = true;
                    for (var i = length - 1; i >= 0; i--) {
                        $('.prod-modal-images').slick('slickRemove', i);
                    }
                }
            });
        }
        if ($(".zoom-gallery-slide").length) {
            iframeHeight = $(".zoom-gallery-slide").height();
        }
        $(".prdu-bunw-div .addons-ajax").removeClass("disabled");
        $("#addonCountNumber").text("0");
        $('#addonsModal').on('click', '.clckEventAddon', function () {
            var currency = localStorage.getItem('userCurrency');
            if (currency != "INR") {
                $(".currency-font-size").addClass("reduce-font");
            }
            if ($(this).is(':checked')) {
                var id = $(this).attr("id");
                var price = $("." + id).text();
                if (price.indexOf(',') > -1) {
                    price = price.replace(/,/g, '');
                }
                addonChcekedPrice = parseFloat(addonChcekedPrice) + parseFloat(price);
            } else {
                var id = $(this).attr("id");
                var price = $("." + id).text();
                if (price.indexOf(',') > -1) {
                    price = price.replace(/,/g, '');
                }
                addonChcekedPrice = parseFloat(addonChcekedPrice) - parseFloat(price);
            }
            $(".selected-addons-price").html(addonChcekedPrice);
            var actualPrice = parseFloat($(".product-price").text());
            var totalPrice = parseFloat(addonChcekedPrice) + parseFloat(actualPrice);
            if (currency == "INR" || currency == null) {
                totalPrice = totalPrice.toFixed(0);
                addonChcekedPrice = addonChcekedPrice.toFixed(0);
            } else {
                totalPrice = totalPrice.toFixed(2);
                addonChcekedPrice = addonChcekedPrice.toFixed(2);
            }
            if (addonChcekedPrice === 0) {
                $("#addonPrice").html(addonChcekedPrice);
                $(".total-product-price").html("");
                $(".total-product-price").html(parseFloat($("#productPrice").text()));
            } else {
                $("#addonPrice").html(addonChcekedPrice);
                $(".total-product-price").html(parseFloat(totalPrice));
            }
            $('.clckEventAddon').change(function () {
                var count = 0;
                $(".clckEventAddon").each(function () {
                    if ($(this).is(':checked')) {
                        count++;
                    }
                });
                if (count > 0) {
                    $("#addonCountNumber").text(count);
                    $("#addonCount").text('WITH ' + count);
                } else {
                    $("#addonCountNumber").text("0");
                    $("#addonCount").text("WITHOUT");
                }
            });
        });
        $(".prod-att-radio").change(dynPdPriceUpdate);
        $(".prod-attr").click(function () {
            var prodPriceValueId = $(this).attr('value');
            $('.prod-attr-shape').attr('proPriceId', prodPriceValueId);
            $('.disabled-weight-attr').attr('disabled', true);
            $('.disabled-weight-attr' + $(this).attr('value')).attr('disabled', false);
            dynamicPriceUpdate($(this).attr('value'));
        });
        $(".prod-attr-coc").click(function () {
            var prodPriceValueId = $(this).attr('value');
//            $('.prod-attr-shape').attr('proPriceId', prodPriceValueId);
            $('.disabled-coc-attr').attr('disabled', true);
            $('.disabled-coc-attr' + $(this).attr('value')).attr('disabled', false);
            dynamicPriceUpdateByCupOfCake($(this).attr('value'));
        });
        $(".prod-attr-shape").click(function () {
            var value = $(this).attr('value');
            var proPriceId = $(this).attr('proPriceId');
            var shapeName = $(this).attr('shape-name');
            $('.disabled-egg-heart-attr' + value).attr('disabled', false);
            dynamicPriceUpdateByShape(value, proPriceId, shapeName);
        });
        $("#proFlavorTypeMobile").change(function () {
            var value = $('.prod-attr.selected-weight').attr('value');
            dynamicPriceUpdate(value);
        });
        $(".prod-att-checkbox").click(dynPdPriceUpdate);
        $(".prod-att-cupOfCake").click(dynPdPriceUpdate);
        $("#proFlavorType").change(dynPdPriceUpdate);
        $("#addProductInCartForm").submit(addproductToCart);
        if ($('body').hasClass("page-product")) {
            dynPdPriceUpdate();
            if ($("#prod-attr-already-eggless").length) {
                dynamicPriceUpdateByShape("", $(".weight-attr0").attr('value'), "");
            }
        }
        function dynPdPriceUpdate() {
            var oPrice = parseInt($('#originalProdPrice').val(), 10);
            if (isNaN(oPrice)) {
                return false;
            }
            var adj = 0;
            var weightName = "";
            /*var selectAtts = $(".prod-att-select")    //For making use of select option dropdown
             if (selectAtts.length !== 0) {
             var wAdj = $(selectAtts).find("option:selected").data('priceadj');
             weightName = $(selectAtts).find("option:selected").text();
             if (typeof wAdj !== "undefined") {
             wAdj = parseInt(wAdj, 10);
             adj = wAdj;
             }
             }*/
            var selectAtts = $(".prod-att-radio");
            if (selectAtts.length !== 0) {
                var wAdj = $(selectAtts).filter(":checked").data('priceadj');
                weightName = $(selectAtts).filter(":checked").data('name');
                if (typeof wAdj !== "undefined") {
                    wAdj = parseInt(wAdj, 10);
                    adj = wAdj;
                }
            }
            var selectAtts = $(".prod-att-cupOfCake"); // desktop
            if (selectAtts.length !== 0) {
                var cupAdj = $(selectAtts).filter(":checked").data('priceadj');
                if (typeof cupAdj !== "undefined") {
                    cupAdj = parseInt(cupAdj, 10);
                    adj += cupAdj;
                }
            }

            var selectedCocAvail = $(".prod-attr-coc");
            if (selectedCocAvail.length > 0) {
                if ($(".prod-attr-coc").hasClass('selected-coc')) {
                    var cocAdje = $(".selected-coc").data('priceadj');
                    if (typeof cocAdje !== "undefined") {
                        cocAdje = parseInt(cocAdje, 10);
                        adj += cocAdje;
                    }
                }
            }
            var selectedMobileWeight = $(".prod-attr");
            if (selectedMobileWeight.length > 0) {
                if ($(".prod-attr").hasClass('selected-weight')) {
                    var weigAdje = $(".selected-weight").data('priceadj');
                    if (typeof weigAdje !== "undefined") {
                        weigAdje = parseInt(weigAdje, 10);
                        adj += weigAdje;
                    }
                }
            }

            var heartAtts = $(".prod-hs-check");
            if (heartAtts.length !== 0) {
                if ($(heartAtts).prop('checked') === true) {
                    var hAdj = $(heartAtts).data('priceadj');
                    if (typeof hAdj !== "undefined") {
                        hAdj = parseInt(hAdj, 10);
                        adj += hAdj;
                    }
                }

            }

            var eggAtts = $('.prod-eg-check');
            if (eggAtts.length !== 0) {
                if ($(eggAtts).prop('checked') === true) {
                    var eAdj = $(eggAtts).data('priceadj');
                    if (typeof eAdj !== "undefined") {
                        eAdj = parseInt($('.prod-eg-check').data('priceadj'), 10);
                        adj += eAdj;
                    }
                }
            }
            if ($('#proFlavorType').length != 0) { // flavor desktop
                var flavourValue = $('#proFlavorType').find(':selected').data('adjamount');
                adj += parseInt(flavourValue, 10);
            }
            if ($('#proFlavorTypeMobile').length != 0) { // flavor mobile
                var flavourValueMobile = $('#proFlavorTypeMobile').find(':selected').data('adjamount');
                adj += parseInt(flavourValueMobile, 10);
            }
            oPrice = oPrice + adj;
            //100rs off 
            var increasePrice = oPrice + 200;
            var increaseHundredPrice = oPrice + 100;
            $('#increasePrice').text("Rs." + increasePrice);
            //end 100rs off
            $('#increaseHundredPrice').text("Rs." + increaseHundredPrice);
            $('#productPrice').text(oPrice);
            $('#productPrice').data('inr', oPrice);
            /*if($("#valChange").length > 0){
             var valAdj = parseInt($("#valChange").data("valadjustment"));
             var valFinal = oPrice + valAdj;
             $("#valAdjPrice").text(valFinal);
             }*/
            var disc = $('#DiscountProductPrice').data('discount');
            $('#DiscountProductPrice').text(oPrice + parseInt(disc));
            $('#DiscountProductPrice').data('inr', oPrice + parseInt(disc));
            var discPercentage = (((oPrice + parseInt(disc)) - oPrice) / (oPrice + parseInt(disc))) * 100;
            if ($(".page-new-product").length) {
                $('#DiscountProductPercentage').text(discPercentage.toFixed(0) + "% off");
            } else {
                $('#DiscountProductPercentage').text("(" + discPercentage.toFixed(0) + "% off)");
            }
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        }
        function dynamicPriceUpdate(id) {
            $('.selected-weight').removeClass('selected-weight');
            $('.weight' + id).addClass('selected-weight');
            var oPrice = parseInt($('#originalProdPrice').val(), 10);
            if (isNaN(oPrice)) {
                return false;
            }
            var adj = 0;
            var weightName = "";
            var selectWeightAtts = $(".weight" + id);
            if (selectWeightAtts.length !== 0) {
                var wAdj = $(selectWeightAtts).data('priceadj');
                weightName = $(selectWeightAtts).data('name');
                if (typeof wAdj !== "undefined") {
                    wAdj = parseInt(wAdj, 10);
                    adj = wAdj;
                }
            }
            var selectAtts = $(".prod-att-cupOfCake"); //desktop
            if (selectAtts.length !== 0) {
                var cupAdj = $(selectAtts).filter(":checked").data('priceadj');
                if (typeof cupAdj !== "undefined") {
                    cupAdj = parseInt(cupAdj, 10);
                    adj += cupAdj;
                }
            }
            var selectMobileCoc = $(".selected-coc"); //mobile
            if (selectMobileCoc.length !== 0) {
                var cocAdjM = $(selectMobileCoc).data('priceadj');
                if (typeof cocAdjM !== "undefined") {
                    cocAdjM = parseInt(cocAdjM, 10);
                    adj += cocAdjM;
                }
            }

            var heartAtts = $(".prod-hs-check");
            if (heartAtts.length !== 0) {
                if ($(".prod-hs-check").hasClass("selected-shape")) {
                    var hAdj = $(heartAtts).data('priceadj');
                    if (typeof hAdj !== "undefined") {
                        hAdj = parseInt(hAdj, 10);
                        adj += hAdj;
                    }
                }

            }

            var eggAtts = $('.prod-eg-check');
            if (eggAtts.length !== 0) {
                if ($(".prod-eg-check").hasClass("selected-shape")) {
                    var eAdj = $(eggAtts).data('priceadj');
                    if (typeof eAdj !== "undefined") {
                        eAdj = parseInt($('.prod-eg-check').data('priceadj'), 10);
                        adj += eAdj;
                    }
                }
            }
            if ($('#proFlavorTypeMobile').length != 0) {
                var flavourValue = $('#proFlavorTypeMobile').find(':selected').data('adjamount');
                adj += parseInt(flavourValue, 10);
            }
            oPrice = oPrice + adj;
            //100rs off 
            var increasePrice = oPrice + 200;
            var increaseHundredPrice = oPrice + 100;
            $('#increasePrice').text("Rs." + increasePrice);
            //end 100rs off
            $('#increaseHundredPrice').text("Rs." + increaseHundredPrice);
            $('#productPrice').text(oPrice);
            $('#productPrice').data('inr', oPrice);
            var disc = $('#DiscountProductPrice').data('discount');
            $('#DiscountProductPrice').text(oPrice + parseInt(disc));
            $('#DiscountProductPrice').data('inr', oPrice + parseInt(disc));
            var discPercentage = (((oPrice + parseInt(disc)) - oPrice) / (oPrice + parseInt(disc))) * 100;
            if ($(".page-new-product").length) {
                $('#DiscountProductPercentage').text(discPercentage.toFixed(0) + "% off");
            } else {
                $('#DiscountProductPercentage').text("(" + discPercentage.toFixed(0) + "% off)");
            }
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        }
        function dynamicPriceUpdateByShape(id, productPriceValueId, shapeName) {
            if (shapeName === "Eggless") {
                var src = $("#egglessWhite").attr('value');
                $('.eggless').attr("src", src);
            } else if (shapeName === "Heart Shape") {
                var src = $("#heartWhite").attr('value');
                $('.heart-shape').attr("src", src);
            }
            if ($(".shape" + id).hasClass('selected-shape')) {
                var value = $('.selected-shape').attr('value');
                $(".disabled-eggless-heart-attr" + value).attr('disabled', true);
                $(".disabled-egg-heart-attr" + value).attr('disabled', true);
                $('.shape' + id).removeClass('selected-shape');
                var shapeName = $(".shape" + id).attr('shape-name');
                if (shapeName === "Eggless") {
                    var src = $("#egglessGreen").attr('value');
                    $('.eggless').attr("src", src);
                } else if (shapeName === "Heart Shape") {
                    var src = $("#heartPink").attr('value');
                    $('.heart-shape').attr("src", src);
                }
            } else {
                $('.shape' + id).addClass('selected-shape');
                var value = $('.selected-shape').attr('value');
                $(".disabled-eggless-heart-attr" + value).attr('disabled', false);
                $(".disabled-egg-heart-attr" + value).attr('disabled', false);
            }
            var oPrice = parseInt($('#originalProdPrice').val(), 10);
            if (isNaN(oPrice)) {
                return false;
            }
            var adj = 0;
            var weightName = "";
            var selectWeightAtts = $(".weight" + productPriceValueId);
            if (selectWeightAtts.length !== 0) {
                var wAdj = $(selectWeightAtts).data('priceadj');
                weightName = $(selectWeightAtts).data('name');
                if (typeof wAdj !== "undefined") {
                    wAdj = parseInt(wAdj, 10);
                    adj = wAdj;
                }
            }
            // check for cop of cake
            var selectedCocAvail = $(".prod-attr-coc");
            if (selectedCocAvail.length > 0) {
                if ($(".prod-attr-coc").hasClass('selected-coc')) {
                    var cocAdje = $(".selected-coc").data('priceadj');
                    if (typeof cocAdje !== "undefined") {
                        cocAdje = parseInt(cocAdje, 10);
                        adj += cocAdje;
                    }
                }
            }

            var heartAtts = $(".prod-hs-check");
            if (heartAtts.length !== 0) {
                if ($(".prod-hs-check").hasClass("selected-shape")) {
                    var hAdj = $(heartAtts).data('priceadj');
                    if (typeof hAdj !== "undefined") {
                        hAdj = parseInt(hAdj, 10);
                        adj += hAdj;
                    }
                }

            }

            var eggAtts = $('.prod-eg-check');
            if (eggAtts.length !== 0) {
                if ($(".prod-eg-check").hasClass("selected-shape")) {
                    var eAdj = $(eggAtts).data('priceadj');
                    if (typeof eAdj !== "undefined") {
                        eAdj = parseInt($('.prod-eg-check').data('priceadj'), 10);
                        adj += eAdj;
                    }
                }
            }

            if ($('#proFlavorTypeMobile').length != 0) {
                var flavourValue = $('#proFlavorTypeMobile').find(':selected').data('adjamount');
                adj += parseInt(flavourValue, 10);
            }
            oPrice = oPrice + adj;
            //100rs off 
            var increasePrice = oPrice + 200;
            var increaseHundredPrice = oPrice + 100;
            $('#increasePrice').text("Rs." + increasePrice);
            //end 100rs off
            $('#increaseHundredPrice').text("Rs." + increaseHundredPrice);
            $('#productPrice').text(oPrice);
            $('#productPrice').data('inr', oPrice);
            var disc = $('#DiscountProductPrice').data('discount');
            $('#DiscountProductPrice').text(oPrice + parseInt(disc));
            $('#DiscountProductPrice').data('inr', oPrice + parseInt(disc));
            var discPercentage = (((oPrice + parseInt(disc)) - oPrice) / (oPrice + parseInt(disc))) * 100;
            if ($(".page-new-product").length) {
                $('#DiscountProductPercentage').text(discPercentage.toFixed(0) + "% off");
            } else {
                $('#DiscountProductPercentage').text("(" + discPercentage.toFixed(0) + "% off)");
            }
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        }
        function dynamicPriceUpdateByCupOfCake(id) {
            $('.selected-coc').removeClass('selected-coc');
            $('.coc' + id).addClass('selected-coc');
            var oPrice = parseInt($('#originalProdPrice').val(), 10);
            if (isNaN(oPrice)) {
                return false;
            }
            var adj = 0;
            var weightName = "";
            var selectCoCAtts = $(".coc" + id);
            if (selectCoCAtts.length !== 0) {
                var wAdj = $(selectCoCAtts).data('priceadj');
                if (typeof wAdj !== "undefined") {
                    wAdj = parseInt(wAdj, 10);
                    adj = wAdj;
                }
            }


            var heartAtts = $(".prod-hs-check");
            if (heartAtts.length !== 0) {
                if ($(".prod-hs-check").hasClass("selected-shape")) {
                    var hAdj = $(heartAtts).data('priceadj');
                    if (typeof hAdj !== "undefined") {
                        hAdj = parseInt(hAdj, 10);
                        adj += hAdj;
                    }
                }

            }
// add radio price
            var selectAtts = $(".selected-weight");
            if (selectAtts.length !== 0) {
                var wAdjr = $(selectAtts).data('priceadj');
                if (typeof wAdjr !== "undefined") {
                    wAdjr = parseInt(wAdjr, 10);
                    adj += wAdjr;
                }
            }

            var eggAtts = $('.prod-eg-check');
            if (eggAtts.length !== 0) {
                if ($(".prod-eg-check").hasClass("selected-shape")) {
                    var eAdj = $(eggAtts).data('priceadj');
                    if (typeof eAdj !== "undefined") {
                        eAdj = parseInt($('.prod-eg-check').data('priceadj'), 10);
                        adj += eAdj;
                    }
                }
            }
            if ($('#proFlavorTypeMobile').length != 0) {
                var flavourValue = $('#proFlavorTypeMobile').find(':selected').data('adjamount');
                adj += parseInt(flavourValue, 10);
            }
            oPrice = oPrice + adj;
            //100rs off 
            var increasePrice = oPrice + 200;
            var increaseHundredPrice = oPrice + 100;
            $('#increasePrice').text("Rs." + increasePrice);
            //end 100rs off
            $('#increaseHundredPrice').text("Rs." + increaseHundredPrice);
            $('#productPrice').text(oPrice);
            $('#productPrice').data('inr', oPrice);
            var disc = $('#DiscountProductPrice').data('discount');
            $('#DiscountProductPrice').text(oPrice + parseInt(disc));
            $('#DiscountProductPrice').data('inr', oPrice + parseInt(disc));
            var discPercentage = (((oPrice + parseInt(disc)) - oPrice) / (oPrice + parseInt(disc))) * 100;
            if ($(".page-new-product").length) {
                $('#DiscountProductPercentage').text(discPercentage.toFixed(0) + "% off");
            } else {
                $('#DiscountProductPercentage').text("(" + discPercentage.toFixed(0) + "% off)");
            }
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        }
        $(document).ready(function () {
            if ($('body').hasClass("page-product") && $('.includeAddon').length > 0) {
                loadAddon();
            }

        });
        $(".addons-ajax").click(loadAddon);
        function loadAddon() {
            addonChcekedPrice = 0;
            $("#addonCountNumber").text("0");
            $("#addonCount").text("WITHOUT");
            $.ajax({
                type: "get",
                url: addonsUri,
                success: function (response) {
                    if (response.success === "true") {
                        $(".includeAddon").html(response.html);
                        var currency = localStorage.getItem('userCurrency');
                        changeCurrecies(currency);
                    } else {
                        alert(response.message);
                    }
                },
                complete: function (response) {
                    // $('#fullPageLoader').addClass('hide');
                },
                error: function (response) {
                }
            });
        }
        $("#Xbutton").bind({click: function () {
                var catUrl = $('#giftBoxUrlId').val();
                var checkUrl = $('#checkUrlId').val();
                if (actionValue === 'AddtoCart') {
                    location.href = catUrl;
                } else {
                    location.href = checkUrl;
                }
            }});

        $("#msgOnCakeAtt").click(function () {
            document.getElementById("labelForMsgOnCake").style.marginTop = "-5px";
        });
        $("#msgOnCakeAtt").blur(function () {
            var inputValue = $("#msgOnCakeAtt").val();
            if (inputValue !== "") {
                document.getElementById("labelForMsgOnCake").style.marginTop = "-5px";
            } else {
                document.getElementById("labelForMsgOnCake").style.marginTop = "0px";
            }
        });

        function addproductToCart(e) {
            e.preventDefault();
            actionValue = $(document.activeElement).val();
            var addonsPresent = $('#forAddonProduct').val();
            var showAddonsPopup = $('#showAddonsPopup').val();
            var data = $('#addProductInCartForm').serialize();
            if (document.getElementById('imageURL') !== null) {
                if (document.getElementById('imageURL').value === '') {
                    $('#imageURLError').show();
                    $("#imageURLErrorMessage").text("");
                    $('#imageURLErrorMessage').text("Please select image to upload.");
                    if ($(window).width() < 767) {
                        $('html, body').animate({
                            scrollTop: $('#imageURLErrorMessage').offset().top - 250,
                        }, 250);
                    }
                    return;
                } else {
                    $('#imageURLError').hide();
                }
            }
            var checkUrl = $('#checkUrlId').val();
            var uri = $('#buyNowUrl').val();
//            var uri = $('.cartUrl').data('value');
            $('.loader').show('hide');
            var cartUrl = $('#giftBoxUrlId').val();

            $.ajax({
                type: 'post',
                url: uri,
                data: data,
                dataType: "json",
                statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                    502: handler502
                },
                success: function (response) {
                    if (response.success === 'false' && response.msg === 'PocNotFound') {
                        alert(response.message);
                        location.href = '/';
                    } else {
                        var finalCartUrl = "";
                        if (actionValue === 'AddtoCart') {
                            if (cartUrl === '') {
                                finalCartUrl = response.cartUrl;
                            } else {
                                finalCartUrl = cartUrl;
                            }
                            if ($("#addProductToCartInMobile").length) {
                                vibrateOnClickAddToCartInMobile();
                            }
                        } else {
                            finalCartUrl = checkUrl;
                        }

                        /*DL code*/
                        /*Following code is probably not in use
                         dataLayer.push({
                         'event': 'addedToCart',
                         'ecommerce': {
                         'detail': {
                         'products': [{
                         'name': productViewDL.name,
                         'id': productViewDL.id,
                         'price': productViewDL.price,
                         'quantity': 1,
                         'currency': 'INR',
                         'categoryName': productViewDL.categoryName,
                         'productImageUrl': {
                         "bigImageUrl": productViewDL.bigImageUrl,
                         "mediumImageUrl": productViewDL.mediumImageUrl,
                         "smallImageUrl": productViewDL.smallImageUrl
                         },
                         'productUrl': productViewDL.productUrl,
                         }]
                         }
                         }
                         });*/

                        dataLayer.push({ecommerce: null});  // Clear the previous ecommerce object.
                        dataLayer.push({
                            event: "add_to_cart",
                            ecommerce: {
                                items: [
                                    {
                                        item_id: productViewDL.id,
                                        item_name: productViewDL.name,
                                        //affiliation: "Google Merchandise Store",
                                        //coupon: "SUMMER_FUN",
                                        currency: "INR",
                                        //discount: 2.22,
                                        index: 0,
                                        //item_brand: "Google",
                                        item_category: productViewDL.categoryName,
                                        /*item_category2: "Adult",
                                         item_category3: "Shirts",
                                         item_category4: "Crew",
                                         item_category5: "Short sleeve",
                                         item_list_id: "related_products",
                                         item_list_name: "Related Products",
                                         item_variant: "green",
                                         location_id: "L_12345",*/
                                        price: productViewDL.price,
                                        quantity: 1
                                    }
                                ]
                            }
                        });
                        /*DL code ends*/

                        if (addonsPresent === 'true' && showAddonsPopup === 'true') {
                            $('.loader').hide();
                            $('#addonsModal').modal({
                                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                                startingTop: '4%', // Starting top style attribute
                                endingTop: '10%', // Ending top style attribute
                                ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                                },
                                complete: function () {
                                    location.href = finalCartUrl;
                                } // Callback for Modal close
                            });
                            $('#addonsModal').modal('open');
                            //Set addonCategoryButton width
                           $(document).ready(function () {
                             var lengths = $(".mobile-category-buttons").map(function (i, el) {
                                return $(el).text().trim().length;
                            }).get();
                            var maxLength = Math.max.apply(this, lengths);
                            var setWidth = (maxLength) * 2.5;                          
                                $(".width").css('width', +setWidth + '%');
                         });
                            $(".actual-product-price").html(parseInt($("#ntProductPrice").val()));
                            var currency = localStorage.getItem('userCurrency');
                            if (currency == "INR" || currency == null) {
                                $("#addonPrice").text("0");
                                $(".total-product-price").html(parseInt($("#productPrice").text()));
                                $("#basePrice").text(parseInt($("#productPrice").text()));
                            } else {
                                $("#addonPrice").text("0.0");
                                $(".total-product-price").html(parseFloat($("#productPrice").text()));
                                $("#basePrice").text(parseFloat($("#productPrice").text()));
                            }
                            var pdId = $("#ntProductId").val();
                            var pdName = $("#ntProductName").val();
                            var pdPrice = $("#ntProductPrice").val();
                            var pdImg = $("#prod-big-image").attr("src");
                            var toPushToDatalayer = ({
                                "event": "AddToCart",
                                "ecommerce": {
                                    "detail": {
                                        "products": [{
                                                "name": pdName,
                                                "id": pdId,
                                                "price": pdPrice,
                                                "image": pdImg,
                                                "qty": "1",
                                                "currency": "₹"
                                            }]
                                    }
                                }
                            });
                            dataLayer.push(toPushToDatalayer);
                            dataLayer.push({
                                'event': 'addToCart',
                                'ecommerce': {
                                    'currencyCode': 'INR',
                                    'add': {
                                        'products': [{//  adding a product to a shopping cart.
                                                'name': pdName,
                                                'id': pdId,
                                                'price': pdPrice,
                                                'quantity': 1
                                            }]
                                    }
                                }
                            });
                        } else {
                            location.href = finalCartUrl;
                        }
                    }
                },
                complete: function () {
                },
                error: function () {
                    // alert("error");
                }
            });
        }
        function vibrateOnClickAddToCartInMobile() {
            // vibration API supported
            if ("vibrate" in navigator) {
                // enable vibration support
                navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
                if (navigator.vibrate) {
                    // vibration API supported
                    navigator.vibrate(200);
                }
            }
            M.toast({html: "Product added to cart"});
        }

        if ($('body').hasClass("page-product")) {
            dataLayer.push({
                'event': 'productView',
                'ecommerce': {
                    'detail': {
                        'products': [{
                                'name': productViewDL.name,
                                'id': productViewDL.id,
                                'price': productViewDL.price,
                                'quantity': 1,
                                'currency': 'INR',
                                'primaryCategoryId': productViewDL.primaryCategoryId,
                                'primaryCategoryName': productViewDL.primaryCategoryName,
                                'productImageUrl': {
                                    "bigImageUrl": productViewDL.bigImageUrl,
                                    "mediumImageUrl": productViewDL.mediumImageUrl,
                                    "smallImageUrl": productViewDL.smallImageUrl
                                },
                                'productUrl': productViewDL.productUrl
                            }]
                    }
                }
            });
        }
        if ($(".prod-attr").length) {
//            $(".weight-attr0").addClass("selected-weight");
            $('.prod-attr-shape').attr('proPriceId', $(".weight-attr0").attr('value'));
            if ($(".prod-attr-shape").hasClass("selected-shape")) {
                var value = $(".selected-shape").attr('value');
                $(".disabled-eggless-heart-attr" + value).attr('disabled', false);
            }
//            var value = $(".weight-attr0").attr('value');
//            $(".disabled-weight-attr" + value).attr('disabled', false);
        }
        if ($('body').hasClass("page-product")) {
            if ($(".recCombos").length)
                getRecommendedCombos();
            if ($(".questionAndAnswers").length)
                +getQuestionAndAnswers();
        }
        function getRecommendedCombos() {
            $.ajax({
                type: "get",
                url: recommendedCombosUri,
                success: function (response) {
                    if (response.success === "true") {
                        $(".recCombos").html(response.html);
                        var currency = localStorage.getItem('userCurrency');
                        changeCurrecies(currency);
                    } else {
                        alert(response.message);
                    }
                },
                complete: function (response) {
                    // $('#fullPageLoader').addClass('hide');
                },
                error: function (response) {
                }
            });
        }
        ;

    });
}
));
$(window).on('load', function () {
    if ($(".MagicZoom").length) {
        MagicZoom.start();
    }
    var money_symbol = "<span class='money_Symbol'>₹</span>";
    $(".sezzle-checkout-button-wrapper .sezzle-payment-amount").prepend(money_symbol);
});

function loadDropzone() {
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("#imageContainer", {// Make the whole body a dropzone
        url: photoCakeUrl, // Set the url
        uploadMultiple: false,
        maxFilesize: 20,
        minFilesize: 50,
        timeout: 3000000000,
        maxThumbnailFilesize: 50,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        maxFiles: 1,
        clickable: true,
        acceptedFiles: "image/jpeg,image/png,image/jpg",
        addRemoveLinks: true,
        forceFallback: false,
        dictDefaultMessage: "Drop/select files here to upload",
        dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
        dictFileTooSmall: "File is too small ({{filesize}}MiB). Min filesize: {{minFilesize}}KB.",
        dictInvalidFileType: "Only image files are allowed (jpg, jpeg, png)",
        dictRemoveFile: "Remove",
        dictRemoveFileConfirmation: "Are you sure you want to remove this image",
        dictFileSizeUnits: {tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b"},
        headers: {
            'X-XSRF-TOKEN': $("meta[name='_csrf']").attr("content")
        },
        success: function (file, response) {
            if (response.success === "true") {
                $("#imageURL").val(response.value);
                $("#imageURLError").hide();
                this.removeEventListeners();
            } else {
                if (file.previewElement !== null && file.previewElement.parentNode !== null) {
                    file.previewElement.parentNode.removeChild(file.previewElement);
                    var divset = document.getElementsByClassName("dz-default dz-message");
                    for (var i = 0; i < divset.length; i++) {
                        divset[i].style.display = "block";
                    }
                    ;
                }
                this.enable();
                this.removeAllFiles(true);
                $("#imageURLError").show();
                $("#imageURL").val("");
                $("#imageURLErrorMessage").text(response.errorMessage);
            }
        },
        removedfile: function (file) {
            this.enable();
            $("#imageURL").val("");
            $("#imageURLError").hide();
            if (file.previewElement != null && file.previewElement.parentNode != null) {
                file.previewElement.parentNode.removeChild(file.previewElement);
            }
            return this._updateMaxFilesReachedClass();
        },
        error: function (file, message) {
            $("#imageURLError").show();
            $("#imageURLErrorMessage").text("");
            $("#imageURLErrorMessage").text(message);
        }
    });
}
if ($('body').hasClass("page-product") && $('.dropzone').length > 0) {
    loadDropzone();
}
function addAdonByModalPrd() {
    var pocId = '';
    $(".clckEventAddon").each(function () {
        if ($(this).is(':checked')) {
            pocId += $(this).val() + ',';
        }
    });
    var catUrl = $('#giftBoxUrlId').val();
    var adonUrl = $('#addAddonUrl').val();
    var checkUrl = $('#checkUrlId').val();
    var uhstknValue = $('.uhstknValue').val();
    if (actionValue === 'AddtoCart') {
        if (pocId === '') {
            location.href = catUrl;
        } else {
            $.ajax({
                type: 'POST',
                url: adonUrl,
                data: {pocId: pocId.toString()},
                success: function (response) {
                    if (response.success) {
                        location.href = catUrl;
                    }
                }, error: function () {
                }
            });
        }
    } else {
        if (pocId === '') {
            location.href = checkUrl;
        } else {
            $.ajax({
                type: 'POST',
                url: adonUrl,
                data: {pocId: pocId.toString()},
                success: function (response) {
                    if (response.success) {
                        location.href = checkUrl;
                    }
                }, error: function () {
                }
            });
        }
    }
}
function getQuestionAndAnswers() {
    $.ajax({
        type: "get",
        url: questionAnswerUrl,
        success: function (response) {
            if (response.success === "true") {
                $(".questionAndAnswers").html(response.html);
            } else {
                alert(response.message);
            }
        }
    });
}
$('body').on('click', "#askTheQuestion", function () {
    $('.questionFormMessage').html("");
    $('#question').val("");
    $("#AskQuestionForm").modal('open');
});

$('body').on('click', "#savePrdCustomerQuestion", function () {
    if ($('#question').val().length > 200) {
        $('.questionFormMessage').html("Question is too long!");
        return;
    }
    if ($('#question').val().length < 10) {
        $('.questionFormMessage').html("Question is too short!");
        return;
    }
    saveCustomerQuestion();
});

function saveCustomerQuestion() {
    var url = $("#savePrdCustomerQuestion").parent("div").parent("form").attr("action");
    var data = $("#savePrdCustomerQuestion").parent("div").parent("form").serialize();
    $.ajax({
        type: "post",
        url: url,
        data: data,
        success: function (response) {
            if (response.success === "true") {
                $('#successMessage').html(response.message);
                $('#successMessage').show();
                $('.questionFormMessage').html("");
                $('#AskQuestionForm Form').trigger("reset");
                $('#AskQuestionForm').modal("close");
                setTimeout(function () {
                    $('#successMessage').delay(0).hide(1000);
                }, 5000);

            } else {
                $('.questionFormMessage').html(response.message);
            }
        }
    });
}

