$(document).ready(function() {
    fx.base = "INR";
    fx.settings = {
        from: "INR"
    };
    fx.rates = window.exchangemoney;
    fx.base = {
        "INR": 1
    };
    $('.currency').on('click', function() {
        var currency = $(this).data('value');
        localStorage.setItem('userCurrency', currency);
        $('.showUserCurrency').text(currency);
        if (currency != "INR") {
            changeCurrecies(currency);
        } else {
            INRRateGet();
        }

    });

    if ($('body').hasClass("page-product")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("page-cart")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("mobile-cart")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("page-category")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("page-product")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("search-list-bc")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("search-mobile")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("personalised-gifts-desktop")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("rcpd_page")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }

});

function changeCurrecies(currency) {
    var currencySymbol = "₹";
    if (currency == null) {
        currency = "INR";
    }
    switch (currency) {
        case "INR":
            currencySymbol = "₹";
            break;
        case "USD":
            currencySymbol = "$";
            break;
        case "EUR":
            currencySymbol = "€";
            break;
        case "GBP":
            currencySymbol = "£";
            break;
        case "AUD":
            currencySymbol = "AUD";
            break;
        case "THB":
            currencySymbol = "THB";
            break;
        case "SGD":
            currencySymbol = "SGD";
            break;
        case "QAR":
            currencySymbol = "QAR";
            break;
        case "NZD":
            currencySymbol = "$";
            break;
        case "MYR":
            currencySymbol = "MYR";
            break;
        case "CAD":
            currencySymbol = "CAD";
            break;
        case "AED":
            currencySymbol = "AED";
    }
    if (currency == "INR") {
        INRRateGet();
    } else {
        $(".moneyCal").each(function() {
            var amount = $(this).data('inr');
            amount = accounting.unformat(amount);
            var changeAmount = fx.convert(amount, {
                to: currency
            });

            $(this).text(
                accounting.toFixed(changeAmount, 2)
            );
        });
        $(".discountRate").each(function() {
            var discountAmount = $(this).data('inr');
            discountAmount = accounting.unformat(discountAmount);
            var changeAmount = fx.convert(discountAmount, {
                to: currency
            });

            $(this).text(
                accounting.toFixed(changeAmount, 2)
            );
        });
        $(".moneySymbol").each(function() {
            $(this).text(currencySymbol);
        });
        if ($(".line-through-price").length || $(".card-content-mobile").length || $(".line-through-price-other").length || $(".line-through-price-desktop").length) {
            if ($(window).width() < 500) {
                $(".new-line-recently-viewed").show();
            }
            $(".new-line").show();
            $(".card-content-mobile").addClass("currency-card-content-height");
            $(".card-content-desktop").addClass("currency-card-content-height");
            $('.gifts-discount-price').css('display', 'inline-block');
            $('.gifts-discount-price-desktop').css('display', 'inline-block');
            $('.discount-price-margin').css('top', "-4px");
            $(".line-through-price").css('font-size', "13px");
            $(".line-through-price-other").css('font-size', "11px");
            $(".line-through-price-desktop").css('font-size', "14px");
        }
    }

    if ($('.currencyRadio').length > 0) {
        //        change paypal currencies
        //usa
        var usaCurr = $('.paypalUSAAmount').data('inr');
        usaCurr = accounting.unformat(usaCurr);
        var amount1 = fx.convert(usaCurr, {
            to: 'USD'
        });
        $('.paypalUSAAmount').text(accounting.toFixed(amount1, 2));
        //gbp
        var gbpCurr = $('.paypalGBPAmount').data('inr');
        gbpCurr = accounting.unformat(usaCurr);
        var amount2 = fx.convert(gbpCurr, {
            to: 'GBP'
        });
        $('.paypalGBPAmount').text(accounting.toFixed(amount2, 2));
        //cad
        var cadCurr = $('.paypalCADAmount').data('inr');
        cadCurr = accounting.unformat(cadCurr);
        var amount3 = fx.convert(cadCurr, {
            to: 'CAD'
        });
        $('.paypalCADAmount').text(accounting.toFixed(amount3, 2));
        //THB
        var thbCurr = $('.paypalTHBAmount').data('inr');
        thbCurr = accounting.unformat(thbCurr);
        var amount4 = fx.convert(thbCurr, {
            to: 'THB'
        });
        $('.paypalTHBAmount').text(accounting.toFixed(amount4, 2));
        //aud
        var audCurr = $('.paypalAUDAmount').data('inr');
        audCurr = accounting.unformat(audCurr);
        var amount4 = fx.convert(audCurr, {
            to: 'AUD'
        });
        $('.paypalAUDAmount').text(accounting.toFixed(amount4, 2));
        //sgd
        var sgdCurr = $('.paypalSGDAmount').data('inr');
        sgdCurr = accounting.unformat(sgdCurr);
        var amount3 = fx.convert(sgdCurr, {
            to: 'SGD'
        });
        $('.paypalSGDAmount').text(accounting.toFixed(amount3, 2));
        //eur
        var eurCurr = $('.paypalEURAmount').data('inr');
        eurCurr = accounting.unformat(eurCurr);
        var amount7 = fx.convert(eurCurr, {
            to: 'EUR'
        });
        $('.paypalEURAmount').text(accounting.toFixed(amount7, 2));
    }
}

function INRRateGet() {
    $(".moneyCal").each(function() {
        var amount = $(this).data('inr');
        $(this).text(
            amount
        );
    });
    $(".discountRate").each(function() {
        var discountAmount = $(this).data('inr');
        $(this).text(
            discountAmount
        );
    });
    $(".moneySymbol").each(function() {
        $(this).text("₹");
    });
    if ($(".line-through-price").length || $(".card-content-mobile").length || $(".line-through-price-other").length || $(".line-through-price-desktop").length) {
        if ($(window).width() < 500) {
            $(".new-line-recently-viewed").hide();
        }
        $(".new-line").hide();
        $('.gifts-discount-price').css('display', 'block');
        $('.gifts-discount-price-desktop').css('display', 'inline-block');
        $('.discount-price-margin').css('top', "0px");
        $(".line-through-price").css('font-size', "14px");
        $(".line-through-price-other").css('font-size', "14px");
        if ($(".currency-card-content-height").length) {
            $(".card-content").removeClass("currency-card-content-height");
        }
    }
}