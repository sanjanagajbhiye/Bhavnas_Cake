// IIFE - Immediately Invoked Function Expression
(function (yourcode) {

    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

}(function ($, window, document) {
    // code for landscape view
    function doOnOrientationChange() {
        switch (window.orientation) {
            case - 90:
            case 90:
                $("body").addClass('landscape');
                break;
            default:
                $('body').removeClass('landscape');
                break;
        }
    }
    window.addEventListener('orientationchange', doOnOrientationChange);
    // Initial execution if needed
    doOnOrientationChange();

    var relativeProceedBtnTop;
    var windowHeight = $(window).height();
    // The $ is now locally scoped 

    // Listen for the jQuery ready event on the document
    $(function () {
        $('.modal').modal();
        // The DOM is ready
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        $(document).ajaxSend(function (e, xhr, options) {
            if (options.type == "POST") {
                xhr.setRequestHeader(header, token);
            }
        });
        $(document).ajaxComplete(function (event, xhr, settings) {
            if (xhr.status == 401 || xhr.status == 403) {
                window.location.reload();
            }
        });
        var width = $(window).width();
        if (width < 767) {
            $(".giftingBtn").insertAfter(".productCard");
        }

        if ($.fn.slick) {
            $('.carousel-slider').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                dots: false,
                focusOnSelect: true
            });
        }

        loadCheckoutView();

        $("#ckDynContentWrapper").on("keyup", "#newAddrPinCode", showCityOfPincode);

        $("#ckDynContentWrapper").on("keyup", mailcheckjs);

        $("#ckDynContentWrapper").on("submit", "#ckLoginForm", loginFromCheckout);

        $("#ckDynContentWrapper").on("click", "#changeEmailLink", changeEmail);
        $("#ckDynContentWrapper").on("change", "input[name='loginWhatsappNotify']", whatsappNotify);
        $("#ckDynContentWrapper").on("click", "#changePhoneNum", changeMobile);
        $("#ckDynContentWrapper").on("click", "#loginWithOtp", loginWithOtp);
        $("#ckDynContentWrapper").on("click", "#verifyLoginWithOtp", verifyLoginWithOtp);
        $("#ckDynContentWrapper").on("click", ".address-container", selectAddress);

        $("#ckDynContentWrapper").on("submit", "#addNewAddressForm", addNewAddress);

        $("#ckDynContentWrapper").on("click", ".address-proceed-btn", proceedAfterAddress);

        $("#ckDynContentWrapper").on("click", ".personalize-proceed-btn", proceedAfterPersonalize);

        $("#ckDynContentWrapper").on("change", "#captureMomentChk", personalizeChange); //Capture Moment checkbox changed

        $("#ckDynContentWrapper").on("change", "#deliveryTimePicker", personalizeChange);   //Delivery time selected/changed

        $("#ckDynContentWrapper").on("click", "#wltUsedBtn", useWalletMoney);

        $("#ckDynContentWrapper").on("click", ".pay-main-action-btn", proceedAfterPayment);

        $("#ckDynContentWrapper").on("click", ".pay-main-action-winni-corporate-wallet-btn", checkCorporateBalance);

        $("#ckDynContentWrapper").on("click", "#toggleAddCoupon", toggleAddCoupon);

        $("#ckDynContentWrapper").on("click", ".add-coupon-btn", applyCoupon);

        $("#ckDynContentWrapper").on("click", ".add-coupon-btn-pop", applyCouponPop);

        $("#ckDynContentWrapper").on("click", ".deliveryTimeSlot", deliveryTimeSlotSelect);

        $("#ckDynContentWrapper").on("click", ".timeSlotNavWrapper a", deliveryTimeSlotBackButton);

        $("#ckDynContentWrapper").on("click", ".subTimeSlot", subTimeSlotSelect);

        $("#ckDynContentWrapper").on("click", "#validateOtpbtn", validateOtp);

        $("#ckDynContentWrapper").on("click", "#generateOtpbtn", generateOtp);

        $("#ckDynContentWrapper").on("click", ".resend-button", resendButtonClick);

        /*** FOr PG*****/
        $("#ckDynContentWrapper").on("click", ".init-payment-btn", initPayment);
        /*For PG END**/
        $("#ckDynContentWrapper").on("click", ".currencyRadio", radioBtnOfCurrency);

        $("#ckDynContentWrapper").on("click", '.search-by-pincode-cart', loadCartViewWithPincode);

        $("#ckDynContentWrapper").on("change", "#nbdropdown", updateNBBankCode);

        $("#ckDynContentWrapper").on("change", ".wallet-dropdown", clearOutageMessage);

        $("#ckDynContentWrapper").on("click", ".tabs", clearOutageMessage);

        $("#ckDynContentWrapper").on("click", ".collection", clearOutageMessage);

        $("#ckDynContentWrapper").on("click", ".collapsible li", clearOutageMessage);

        $(window).scroll(scrolled);

        bindAjaxLoadingEvents();

        if ($('body').hasClass("checkoutCompleted")) {
            dataLayer.push({
                'ecommerce': {
                    'purchase': {
                        'actionField': {
                            'id': orderCompleteDL.orderId,
                            'revenue': orderCompleteDL.orderTotal
                        },
                        'products': orderCompleteDL.orderItems
                    }
                },
                'event': 'transaction'
            });
            dataLayer.push({
                'event': 'purchase_enhanced_conversion',
                'order_value': orderCompleteDL.orderTotal,
                'order_id': orderCompleteDL.orderId,
                'currencyCode': 'INR',
                'enhanced_conversion_data': {
                    "email": orderCompleteDL.customerEmail,
                    "phone_number": orderCompleteDL.senderMobile,
                    "first_name": orderCompleteDL.senderName,
                    "last_name": orderCompleteDL.senderName,
                    "home_address": {
                        "street": '',
                        "city": orderCompleteDL.recipientCity,
                        "region": '',
                        "postal_code": orderCompleteDL.recipientPostalCode,
                        "country": orderCompleteDL.recipientCountry
                    },
                }
            });
        }
        $('.picker-modal').modal();
        if ($('body').hasClass("checkout-adv")) {
            var isSocialExst = $("#isSocial").val();
            if (isSocialExst !== "undefined" && isSocialExst === "true") {
                loadLoginViewLogin();
            }
        }
    });

    if ($('#chkDeliveryTimeLeft').length > 0) {
        startProductTimeLeftCountdownChk();
    }
    var deliverySlotData;
    var oldIndex;
    function deliveryTimeSlotSelect(e) {
        var collectionIndex = $(this).attr('data-slotid');
        e.preventDefault();
        var target = $($(this).data('target'));
        if ($(".deliveryTimeSlot").not(target)) {
            $(".time-slot").remove();
        }
        $(".back-button-picker-modal").show();
        deliverySlotData = $("#deliverySlotsContainer_" + globleIndex).html();
        var subSlotNames = $(this).attr("data-timeSlotNames").split(',');
        var slotMappingIds = $(this).attr("data-timeSlotMappingId").split(',');
        var deliveryTypeName = $(this).attr("data-slotName");
        var imageSrc = $("#circle-img").attr("src");
        var slot = "<a href='javascript:;' style='padding: 20px;font-size: 17px' class='collection-item subTimeSlot' data-timeSlotMappingId='{timeSlotMappingId}' data-deliveryTypeName='{deliveryTypeNameVal}'><img class='circle-img' src='" + imageSrc + "'> {subSlotName}</a>"
        var newContent = "";
        for (var i = 0; i < subSlotNames.length; i++) {
            newContent = newContent + slot.replace("{subSlotName}", subSlotNames[i]).replace("{timeSlotMappingId}", slotMappingIds[i])
                .replace("{deliveryTypeNameVal}", deliveryTypeName);
        }
        newContent = '<div class="time-slot" style="margin: 10px 0 0 10px;transition: 300ms ease 0s;font-size: 17px">' + newContent + '</div>';
        if (oldIndex !== collectionIndex) {
            $(".collection-item_" + collectionIndex).append(newContent);
            oldIndex = collectionIndex;
        } else {
            oldIndex = -1;
        }
        $("#timeSlotNavWrapper_" + globleIndex).removeClass("hide");
        $("#startTitle_" + globleIndex).hide();
        $("#timeSlotNavWrapper_" + globleIndex + " #slotTypeTitle_" + globleIndex).text("Choose from " + deliveryTypeName + " Slots");
    }


    function deliveryTimeSlotBackButton() {
        $("#timeSlotNavWrapper_" + globleIndex).addClass("hide");
        $("#deliverySlotsContainer_" + globleIndex).html(deliverySlotData);
        $("#startTitle_" + globleIndex).show();
    }

    function subTimeSlotSelect(e) {
        var deliveryTypeName = $(this).attr("data-deliveryTypeName");
        var slotName = $(this).text();
        var date = $("#dateInputDiv_" + globleIndex).attr("value");
        $("#deliverySlotMappingIdInput_" + globleIndex).val($(this).attr("data-timeSlotMappingId"));
        $("#deliverySlotInput_" + globleIndex).val(deliveryTypeName + " [" + slotName + "]");
        $("#dateInputDiv_" + globleIndex).html('<span style="font-size:15px;color: #666;">' + date + '</span>' + '<br>' + "<span class='slot-timings' style='color: #666;font-size:13px;'>" + deliveryTypeName + " [" + slotName + "]" + "</span>");
        $(".delivery-edit-button_" + globleIndex).show();
        var input = $('#deliveryDatePicker_' + globleIndex).datepicker();
        var picker = M.Datepicker.getInstance(input);
        picker.close();
        $('.picker-modal').modal('close');
        $('body').css({
            overflow: 'visible'
        });
        personalizeChange();
    }
    // The rest of the code goes here!

    function bindAjaxLoadingEvents() {
        $(document).ajaxStart(function () {
            $('#fullPageLoader').removeClass('hide');
        });

        $(document).ajaxStop(function () {
            $('#fullPageLoader').addClass('hide');
        });
    }

    function jpPaymentSubmit() {
        setTimeout(function () {
            $('#fullPageLoader').removeClass('hide');
            //e.preventDefault();
            $("#payment_form").submit();
        }, 10);
    }

    function showCardError(error) {
        $(".card-error").text(error);
        $(".card-error").show();
    }

    function showNBError(error) {
        $(".nb-error").text(error);
        $(".nb-error").show();
    }

    function showGooglePayError(error) {
        $(".gpay-error").text(error);
        $(".gpay-error").show();
    }

    function showUpiPayError(error) {
        $(".upi-error").text(error);
        $(".upi-error").show();
    }
    function showWalletPayError(error) {
        $(".wallet-error").text(error);
        $(".wallet-error").show();
    }
    function hideCardError() {
        $(".card-error").hide();
    }

    function clearPaymentForm() {
        $("#payment_form")[0].reset();
    }

    function formatCardFields() {
        $('input#cardNumber').payment('formatCardNumber');
        $('input#cardExpiry').payment('formatCardExpiry');
        $('input#cardCVV').payment('formatCardCVC');
        $('[data-numeric]').payment('restrictNumeric');
    }

    /**
     * Validate and sets proper value for credit/debit card processing in payment form
     * 
     * @returns {Boolean}
     */
    function processCardPaymentMethod() {
        hideCardError();    //Remove any existing error message before proceeding

        /*Fetch card details*/
        var number = $("#cardNumber").val().trim();
        var nameOnCard = $("#nameOnCard").val().trim();
        var expiry = $("#cardExpiry").val().trim();
        var cvv = $("#cardCVV").val().trim();
        var saveCard = $("#saveCard").is(':checked');

        if (number === "") {    //Card number is required - name on card could be left blank
            showCardError("Credit/Debit card number required");
            return false;
        }

        var cardValid = $.payment.validateCardNumber(number);
        if (cardValid == false) {
            showCardError("Invalid card number entered");
            return false;
        }
        var regName = /^[a-zA-Z ]+$/;
        if (!regName.test(nameOnCard)) {
            showCardError("Invalid name entered! Only alphabetic characters allowed.");
            return false;
        }
        if (nameOnCard.length > 60) {
            showCardError("Name is too long!");
            return false;
        }
        if (nameOnCard.length < 3) {
            showCardError("Name is too short!");
            return false;
        }
        var cardBrand = $.payment.cardType(number);
        var expiryValid = true;
        var cvvValid = true;
        var expiryMonth = "";   //For maestro cards keep month, year and cvv clear
        var expiryYear = "";
        if (cardBrand != 'maestro') {
            if (expiry === "" || (expiry.split("/")).length != 2) {
                showCardError("Enter a valid card expiry date");
                return false;
            }
            if (cvv === "") {
                showCardError("CVV number is required");
                return false;
            }

            var exp = $.payment.cardExpiryVal(expiry);
            expiryMonth = exp.month;
            expiryYear = exp.year;

            expiryValid = $.payment.validateCardExpiry(expiryMonth, expiryYear);
            cvvValid = $.payment.validateCardCVC(cvv, cardBrand);

            if (expiryValid == false) {
                showCardError("Enter a valid expiry date");
                return;
            }
            if (cvvValid == false) {
                showCardError("Enter a valid CVV number");
                return;
            }
        }

        if (cardValid == true && expiryValid == true && cvvValid == true) {
            $(".card_number").val(number);
            $(".name_on_card").val(nameOnCard);
            $(".card_exp_month").val(expiryMonth);
            $(".card_exp_year").val(expiryYear);
            $(".security_code").val(cvv);
            $(".payment_method_type").val("CARD");
            $(".payment_method").val("");
            $(".winni_payment_method").val(cardBrand);
            $(".juspay_locker_save").val(saveCard);
            return true;
        } else {
            showCardError("Enter details of a valid credit or debit card");
            return false;
        }
    }

    /**
     * 
     * @returns {Boolean}
     */
    function processNetbankingPaymentMethod() {
        var selectedBank = $(".nb-dropdown option:selected").val();
        if (selectedBank === "") {
            showNBError("Please select any bank for netbaking");
            return false;
        }

        if (selectedBank.length > 3) {
            var initials = selectedBank.substring(0, 2);

            if (initials !== "NB") {
                showNBError("Please select a valid bank");
                return false;
            } else {
                $(".payment_method_type").val("NB");
                $(".payment_method").val(selectedBank);
                $(".winni_payment_method").val(selectedBank);
                return true;
            }
        }

        return false;
    }

    /**
     * Validates and assigns proper data for initiating processing through any wallet mechanism
     * 
     * @param {type} paymentMethod
     * @returns {Boolean}
     */
    function processWalletPaymentMethod(paymentMethod) {
        $(".payment_method_type").val("WALLET");
        var method = "";
        var bankcode = "";
        if (paymentMethod === "paytm") {
            method = "PAYTM";
            bankcode = "JP_PAYTM";
        } else if (paymentMethod === "mobikwik") {
            method = "MOBIKWIK";
            bankcode = "JP_MOBIKWIK";
        } else if (paymentMethod === "payumoney") {
            method = "PAYUMONEY";
        } else if (paymentMethod === "phonepe") {
            method = "PHONEPE";
            bankcode = "JP_PHONEPE";
        } else if (paymentMethod === "amazonpay") {
            method = "AMAZONPAY";
            bankcode = "JP_AMAZONPAY";
        } else if (paymentMethod === "olamoney") {
            method = "OLAMONEY";
            bankcode = "JP_OLAM";
        } else if (paymentMethod === "freecharge") {
            method = "FREECHARGE";
            bankcode = "JP_FREECHARGE";
        } else if (paymentMethod === "payzapp") {
            method = "PAYZAPP";
            bankcode = "JP_PAYZAPP";
        } else if (paymentMethod === "oxigen") {
            method = "OXIGEN";
            bankcode = "JP_OXIGEN";
        } else if (paymentMethod === "jiomoney") {
            method = "JIOMONEY";
            bankcode = "JP_JIOMONEY";
        } else if (paymentMethod === "airtelmoney") {
            method = "AIRTELMONEY";
            bankcode = "JP_AIRTEL";
        } else if (paymentMethod === "upi" || paymentMethod === "gpay") {
            method = "UPI";
        } else if (paymentMethod === "paypal") {
            method = "PAYPAL";
        }

        $(".payment_method").val(method);
        $(".juspay_bank_code").val(bankcode);
        $(".winni_payment_method").val(method);
        return true;
    }
    function processSezzlePaymentMethod(paymentMethod) {
        $(".payment_method_type").val("CONSUMER_FINANCE");
        var method = "";
        if (paymentMethod === "sezzle") {
            method = "SEZZLE";
        } else if (paymentMethod === "lazypay") {
            method = "LAZYPAY";
            $(".payment_method_type").val("WALLET");
        } else if (paymentMethod === "zestmoney") {
            method = "ZESTMONEY";
        }

        $(".payment_method").val(method);
        $(".winni_payment_method").val(method);
        return true;
    }

    /**
     * Initializes payment process by validating choosen payment mechanism, getting reference id and proceeding further to PG
     * 
     * @param {type} e
     * @returns {undefined}
     */
    function initPayment(e) {
        var payMethod = $(this).data("pay-method");

        //Disable pay button
        clearPaymentForm(); //Clear form before processing
        var valid = false;
        var ot_check = false;
        if (payMethod === "card") {
            valid = processCardPaymentMethod();
            ot_check = true;
        } else if (payMethod === "nb") {
            valid = processNetbankingPaymentMethod();
            ot_check = true;
        } else if (payMethod === "paytm" || payMethod === "mobikwik" || payMethod === "payumoney" || payMethod === "phonepe") {
            valid = processWalletPaymentMethod(payMethod);
            ot_check = true;
        } else if (payMethod === "wallet") {
            var walletCode = $(".wallet-dropdown").val();
            if (!walletCode || walletCode === "-1") {
                showWalletPayError("Please select a wallet");
                return;
            }
            valid = processWalletPaymentMethod(walletCode);
            ot_check = true;
        } else if (payMethod === "upi") {
            valid = processUPIPaymentMethod();
            ot_check = true;
        } else if (payMethod === "gpay") {
            valid = processGooglePayPaymentMethod();
            ot_check = true;
        } else if (payMethod === "paypal") {
            valid = processWalletPaymentMethod(payMethod);
            ot_check = true;
        } else if (payMethod === "paylater") {
            var paylaterCode = $(".paylater-dropdown").val();
            if (!paylaterCode || paylaterCode === "-1") {
                showWalletPayError("Please select a paylater option");
                return;
            }
            valid = processSezzlePaymentMethod(paylaterCode);
            ot_check = true;
        } else if (payMethod === "winni-wallet") {
            valid = true;
        } else if (payMethod === "winni-corporate-wallet") {
            $(".payment_method_type").val("WINNI-CORPORATE-WALLET");
            valid = true;
        }

        if (ot_check && valid) {
            outage();
        } else if (!ot_check && valid) {
            initTransaction();
        }
    }
    $('body').on('click', '.forgotPwdM,.changeFpwd', function (event) {
        $('#isVrfdFrgt').val(false);
        $('.password-hide-part,.otp-hide-part-email,.otp-hide-part-mobile,.alert,.changeFpwd').hide();
        $('.caption-hide-part').show();
        $("#loginTabf").removeClass("hide");
        $(".forgot-title").text("Send OTP");
        $(".otp-content-box input").val("");
        $("#forgotEmail,#forgotMobile").removeAttr("readonly");
        $("#forgotCountryCode").removeAttr('disabled');
        $('.custom-select').css({ "pointer-events": "auto", "cursor": "pointer" });
    });
    $('body').on('click', '#fgtPwdSndMailBut', function (event) {
        event.preventDefault();
        var otpfElment = document.getElementsByClassName("forgotLoginOtp");
        if (otpfElment !== null && otpfElment !== "undefined") {
            var fotp = '';
            for (var i = 0; i < otpfElment.length; i++) {
                fotp += otpfElment[i].value;
            }
            $("#forgotLoginOtp").val(fotp);
        }
        var uri = $(this).closest('form').attr('action');
        var data = $(this).closest('form').serialize();
        $('#forgotPwdModal .alert-success').addClass('hidden');
        $('#forgotPwdModal .alert-danger').addClass('hidden');
        $(this).addClass("disabled btn_loader");
        $.ajax({
            cache: false,
            url: uri,
            data: data,
            type: 'post',
            success: function (response) {
                if (response.success === "true") {
                    $('#forgotPwdModal .alert-success').removeClass('hide');
                    $('#forgotPwdModal .alert-danger').addClass('hide');
                    $('#forgotPwdModal .alert-success').text(response.message);
                    $('.alert-success').show();
                    $('#fgtPwdSndMailBut').removeClass('disabled btn_loader');
                    $("#isVrfdFrgt").val(response.isVrfdFrgt);
                    $("#isVrfdFrgtOtp").val(response.isVrfdFrgtOtp);
                    $("#isVrfdFrgtPss").val(response.isVrfdFrgtPss);
                    $(".forgot-title").text("Send OTP");
                    $('.caption-hide-part').show();
                    if (response.isVrfdFrgt === "true" && response.isVrfdFrgtOtp === "false" && response.isVrfdFrgtPss === "false") {
                        $("#requestUuid").val(response.requestUuid);
                        $("#identifierType").val(response.identifierType);
                        if (response.email !== "") {
                            $('.email-hide-part').show();
                            $('.mobile-hide-part,#emailhint1').hide();
                            $('.otp-hide-part-email,.changeFpwd').show();
                            $("#forgotEmail").attr("readonly", "true");
                        } else {
                            $('.email-hide-part').hide();
                            $('.mobile-hide-part').show();
                            $('.otp-hide-part-mobile,.changeFpwd').show();
                            $("#forgotMobile").attr("readonly", "true");
                            $("#forgotCountryCode").attr('disabled', 'disabled');
                            $('.custom-select').css({ "pointer-events": "none", "cursor": "none" });
                        }
                        $("#loginTabf").addClass("hide");
                        //                        $('.otp-hide-part').show();
                        $('.password-hide-part').hide();
                        $("#forgotLoginOtp").val("");
                        $("#resetPassword").val("");
                        $("#resetPasswordConfirm").val("");
                        $(".forgot-title").text("Verify OTP");
                        $('.caption-hide-part').hide();
                    } else if (response.isVrfdFrgt === "true" && response.isVrfdFrgtOtp === "true" && response.isVrfdFrgtPss === "false") {
                        $('.otp-hide-part-email').hide();
                        $('.otp-hide-part-mobile,.changeFpwd').hide();
                        $('.password-hide-part').show();
                        $("#forgotLoginOtp").val("");
                        $("#resetPassword").val("");
                        $("#resetPasswordConfirm").val("");
                        $(".forgot-title").text("Save and Login");
                        $('.caption-hide-part').hide();
                    } else if (response.isVrfdFrgt === "true" && response.isVrfdFrgtOtp === "true" && response.isVrfdFrgtPss === "true" && response.isPssCng === "true") {
                        $('.otp-hide-part-email').hide();
                        $('.otp-hide-part-mobile').hide();
                        $('.password-hide-part').hide();
                        $('.caption-hide-part').hide();
                        $(".forgot-title").hide();
                    } else if (response.isVrfdFrgt === "true" && response.isVrfdFrgtOtp === "true" && response.isVrfdFrgtPss === "true" && response.isPssCng === "false") {
                        $('.otp-hide-part-email').hide();
                        $('.otp-hide-part-mobile').hide();
                        $('.password-hide-part').hide();
                        $('.caption-hide-part').hide();
                        $('#forgotPwdModal').modal('close');
                        window.location.reload();
                    }
                } else {
                    if (response.message !== '') {
                        $('#forgotPwdModal .alert-danger').text(response.message);
                    } else {
                        $('#forgotPwdModal .alert-danger').text("Invalid Request");
                    }
                    $('#forgotPwdModal .alert-danger').removeClass('hide');
                    $('#forgotPwdModal .alert-success').addClass('hide');
                    $('.alert-danger').show();
                }
            },
            complete: function (response) {
                //$('#plzw').modal('hide');
                $('#fgtPwdSndMailBut').removeClass('disabled btn_loader');
            },
            error: function (response) {
                alert("something went wrong");
            }
        });
    });

    /**
     * Validates and assigns proper data for initiating processing through UPI
     * 
     * @returns {Boolean}
     */
    function processUPIPaymentMethod() {
        $(".payment_method_type").val("UPI");
        var method = "UPI";
        var upiVPA = $("#upiVPA").val().trim();
        if (upiVPA === "") {
            showUpiPayError("VPA/UPI ID is required");
            return false;
        }
        $(".upi_vpa").val(upiVPA);
        $(".txn_type").val("UPI_COLLECT");

        $(".payment_method").val(method);
        $(".winni_payment_method").val(method);
        return true;
    }

    /**
     * Validates and assigns proper data for initiating processing through Google Pay
     * 
     * @returns {Boolean}
     */
    function processGooglePayPaymentMethod() {
        $(".payment_method_type").val("UPI");
        var method = "UPI";

        var gpayId = $("#gpayId").val().trim().toLowerCase();
        if (gpayId === "") {
            showGooglePayError("Google pay UPI ID is required");
            return;
        }
        var gpayBank = $("#gpayBank").val();
        if (!gpayBank || gpayBank === "-1") {
            showGooglePayError("Please select a Bank");
            return;
        }

        gpayBank = gpayBank.trim();
        var upiVPA = gpayId + "@" + gpayBank;

        $(".upi_vpa").val(upiVPA);
        $(".txn_type").val("UPI_COLLECT");

        $(".payment_method").val(method);
        $(".winni_payment_method").val(method);
        return true;
    }

    function prepareDataForTransaction() {
        var cardNumber = $(".card_number").val();
        if (cardNumber.length > 7) {
            paymentParams.cardInitials = cardNumber.substring(0, 7);
        } else {
            paymentParams.cardInitials = "";
        }
        paymentParams.nameOnCard = $(".name_on_card").val();
        paymentParams.expMonth = $(".card_exp_month").val();
        paymentParams.expYear = $(".card_exp_year").val();
        paymentParams.paymentMethodType = $(".payment_method_type").val();
        paymentParams.paymentMethod = $(".winni_payment_method").val();
        paymentParams.currency = $('#paypalCurrency').val();
        paymentParams.upiVPA = $(".upi_vpa").val();
        paymentParams.upiTxType = $(".txn_type").val();
        //paymentParams.oid = webApp.oid;
    }
    function outage() {
        $(".outage-error").html();
        $(".outage-error").addClass('hide');
        var pm = $("#payment_method").val();
        var pmt = $(".payment_method_type").val();
        var jpbkc = $(".juspay_bank_code").val();
        var cn = "";
        if (pmt === "CARD") {
            cn = $(".card_number").val();
        }
        $(".juspay_bank_code").val("");
        var data = { "payment_method": pm, "payment_method_type": pmt, "juspay_bank_code": jpbkc, "card_number": cn };
        $.ajax({
            url: webApp.outagelink,
            data: data,
            type: 'POST',
            success: function (response) {
                if (response.status === true) {
                    $(".outage-error").html(response.message);
                    $(".outage-error").css('display', 'block');
                    $(".outage-error").addClass("errorShow");
                    $(".outage-error").removeClass("hide");
                    if ($(window).width() <= 767) {
                        window.location.hash = '.outage-error';
                        $(".errorShow").slideDown('slow').delay(5000).slideUp('slow');
                    }
                } else {
                    initTransaction();
                }
            },
            error: function (response) {
                initTransaction();
            }
        });
    }
    function updateNBBankCode() {
        $(".outage-error").html();
        $(".outage-error").addClass("hide");
        $(".outage-error").removeClass("errorShow");
        var jpbkc = $('#nbdropdown option:selected').attr('data-bankcode');
        if (jpbkc !== "") {
            $(".juspay_bank_code").val(jpbkc);
        }
    }
    function clearOutageMessage() {
        $(".outage-error").html();
        $(".outage-error").addClass("hide");
        $(".outage-error").removeClass("errorShow");
    }
    function initTransaction() {
        //$('#fullPageLoader').removeClass('hide');
        prepareDataForTransaction();

        var $payBtn = $(".init-payment-btn");
        $payBtn.attr("disabled", "");
        $payBtn.addClass("disabled");

        var jqxhr = $.ajax({
            url: webApp.initTransactionUri,
            type: "POST",
            cache: false,
            dataType: "json",
            data: paymentParams,
            statusCode: {
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                $("#orderTxId").val(data.transactionId);
                if (data.instrument === "paypal") {
                    location.href = data.redirectUrl;
                } else if (data.instrument === "winniwallet") {
                    location.href = data.redirectUrl;
                } else if (data.instrument === "winnicorporatewallet") {
                    location.href = data.redirectUrl;
                } else {
                    jpPaymentSubmit();
                }

                //loadPaymentView();
            } else {
                if (data.message === "session expired") {
                    showSessionExpired();
                } else {
                    alert(data.message);
                }
                $payBtn.removeClass("disabled");
                $payBtn.removeAttr("disabled");
            }
        });
        jqxhr.fail(function (data) {
            $payBtn.removeClass("disabled");
            $payBtn.removeAttr("disabled");
        });
        jqxhr.always(function (data) {
            //$('#fullPageLoader').addClass('hide');
        });
    }

    function gaTrack(url) {
        //ga("send", "pageview", url);
        if (typeof ga !== 'undefined') {
            ga('send', {
                hitType: 'pageview',
                page: "'" + url + "'"
            });
        }
    }

    function toggleAddCoupon() {
        $("#couponContainer").slideToggle("slow");
        $("#toggleAddCoupon").toggleClass("disable");
    }
    function whatsappNotify(e) {
        if (this.checked) {
            $(this).prop('checked', true);
            $(this).val('true');
        } else {
            $(this).prop('checked', false);
            $(this).val('false');
        }
    }
    function changeSocialMobile(e) {
        loadLoginViewLogin();
    }
    function changeMobile(e) {
        clearInterval(interval);
        $(".login-title").text("Login");
        $(".ck-login-password-wrapper input[type='password']").val("");
        var $submitBtn = $("#ckLoginFormL").find(':submit');
        $submitBtn.text("Continue");
        $("#loginMobile").removeAttr("readonly");
        $("#loginEmail").removeAttr("readonly");
        $("#loginCountryCode").removeAttr('disabled', 'disabled');
        $('.custom-select').css({ "pointer-events": "auto", "cursor": "pointer" });
        $('.ck-login-password-wrapper').addClass('hide');
        $('.signup-field').addClass('hide');
        $("#emailVerified,#isLoginWithOtp").val("false");
        $("#isRegistered").val("");
        $("#isVerifiedOtp").val("");
        $(this).addClass("hide");
        $("#wrongAttemptPassword").hide();
        $("#loginEmail").attr('type', 'text');
        $('.ck-login-mobile-wrapper').removeClass('hide');
        $('.ck-login-email-wrapper').removeClass('show');
        $('.ck-login-otp-wrapper').addClass('hide');
        $("#otpMobileMsg").hide();
        $('#phoneNumberTab').show();
        $("#loginWithOtp,.verify-email-otp-field,#otpEmailMsg").addClass("hide");
        $("#phoneNumberTab").removeClass('hide');
        $("#phoneNumberTab").removeClass('showNum showMobile');
        //when loginwith otp
        $(".waves-light").removeClass('hide');
        //        $('#loginWithOtp').show();
        $("#loginEmail").val("");
        $("#loginMobile").val("");
        //when show tab
        $("#loginTab").removeClass('hide');
        $("#loginTab").addClass('showTab');
        $("#loginEmail").removeClass('hide');
        $(".whatsapp_subscription,.existingUser ").hide();
        //redirect from mail verify otp
        $("#deactivateTab").click(function () {
            $(".numberTab").removeClass('active');
            $('#phoneNumberTab').hide();
        });

    }
    function changeEmail(e) {
        $(".login-title").text("Login");
        $(".ck-login-password-wrapper input[type='password']").val("");
        var $submitBtn = $("#ckLoginFormL").find(':submit');
        $submitBtn.text("Continue");
        $("#loginMobile").removeAttr("readonly");
        $("#loginEmail").removeAttr("readonly");
        $("#loginCountryCode").removeAttr('disabled', 'disabled');
        $('.custom-select').css({ "pointer-events": "auto", "cursor": "pointer" });
        $('.ck-login-password-wrapper').addClass('hide');
        $('.signup-field').addClass('hide');
        $("#emailVerified").val("false");
        $("#isRegistered").val("");
        $("#isVerifiedOtp").val("");
        $(this).addClass("hide");
        $("#loginMobile").attr('type', 'tel');
        $("#wrongAttemptPassword").hide();
        $('.ck-login-mobile-wrapper').removeClass('hide');
        $('.ck-login-email-wrapper').removeClass('show');
        $('.ck-login-otp-wrapper').addClass('hide');
        $("#otpMobileMsg,#phoneNumberTab").hide();
        $("#loginWithOtp,#phoneNumberTab").addClass("hide");
        $("#phoneNumberTab").removeClass('hide showMobile');
        //when loginwith otp
        $(".waves-light").removeClass('hide');
        //        $('#loginWithOtp').show();
        $("#loginEmail").val("");
        $("#loginMobile").val("");
        //when show email and phonre number tab
        $("#loginTab").removeClass('hide');
        $("#loginTab").addClass('showTab');
        $("#loginEmail").removeClass('hide');
        $('.showMobile').css('display', 'none');
        $(".whatsapp_subscription ,.existingUser").hide();

    }

    function proceedAfterPayment(e) {
        e.preventDefault();
        alert($(this).data('method'));
        var method = $(this).data('method');
        if (method === 'cod') {
            var cf = confirm("By clicking OK your order will be placed with payment option as COD\nYour order will be confirmed only after a confirmation call from our executive on Sender's phone number (within 24 hours of delivery of order)");
            if (cf === false) {
                return;
            }
        }

        //$('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.paymentSubmitUri,
            type: "POST",
            cache: false,
            data: {
                method: method
            },
            dataType: "json",
            statusCode: {
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                if (data.redirect === "true") {
                    if (method === 'pal') {
                        document.location.href = webApp.payByPgUri + "?paypal=true";
                    } else if (data.mobPayU === "true") {
                        document.location.href = webApp.payByPgUri + "?mobpayu=true";
                    } else {
                        document.location.href = webApp.payByPgUri;
                    }
                } else {
                    document.location.href = webApp.checkoutCompletedUri + "?orderId=" + data.orderId;
                }
            } else {
                if (data.message === "session expired") {
                    showSessionExpired();
                } else {
                    alert("error");
                }
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            // $('#fullPageLoader').addClass('hide');
        });
    }
    function winniCorporateWalletPayment(e) {
        var jqxhr = $.ajax({
            url: webApp.paymentSubmitWinniCorporateWalletUri,
            type: "POST",
            cache: false,
            dataType: "json",
            statusCode: {
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                if (data.redirect === "true") {
                    document.location.href = webApp.paymentSubmitWinniCorporateWalletReturnUri + data.transactionId;
                    ;
                } else {
                    document.location.href = webApp.checkoutCompletedUri + "?orderId=" + data.orderId;
                }
            } else {
                if (data.message === "session expired") {
                    showSessionExpired();
                } else {
                    alert("error");
                }
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            // $('#fullPageLoader').addClass('hide');
        });
    }
    function checkCorporateBalance(e) {
        e.preventDefault();
        var jqxhr = $.ajax({
            url: webApp.corporatewalletUsedUri,
            type: "POST",
            cache: false,
            dataType: "json",
            statusCode: {
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === true) {
                winniCorporateWalletPayment(e);
            } else {
                if (data.message === "session expired") {
                    showSessionExpired();
                } else {
                    alert(data.message);
                }
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            // $('#fullPageLoader').addClass('hide');
        });
    }


    function useWalletMoney(e) {
        var isUseWinniWallet = $('#useWinniWalletPartial').prop("checked");
        if (isUseWinniWallet === 'false' || isNaN(isUseWinniWallet)) {
            isUseWinniWallet = $('#useWinniWallet').prop("checked");
        }

        //$('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.walletUsedUri,
            type: "POST",
            cache: false,
            dataType: "json",
            //data: {amount: amount},
            data: { isUseWinniWallet: isUseWinniWallet },
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success) {
                loadPaymentView();
                M.updateTextFields();
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                alert(data.message);
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //    $('#fullPageLoader').addClass('hide');
        });
    }

    function validateCodOrder(e) {
        var jqxhr = $.ajax({
            url: webApp.validateCodOrder,
            type: "GET",
            cache: false,
            dataType: "json",
            data: {},
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success) {
                //    	    	  $('#digitPassword').modal({
                //    	    		    dismissible: false,
                //    	    		});
                //    	    	  $('#digitPassword').modal('open');
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                alert(data.message);
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //    $('#fullPageLoader').addClass('hide');
        });
    }

    function validateOtp(e) {
        var otp = "";
        $("#digit-group input").each(function () {
            var input = $(this);
            otp = otp + input.val(); //<-- Should return all input elements in that specific form.
        });
        var jqxhr = $.ajax({
            url: webApp.validateOtp,
            type: "POST",
            cache: false,
            dataType: "json",
            data: { otp: otp },
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (dataInput) {
            $('#digit-1').focus();
            if (dataInput.success) {
                $(".invalid-otp").html('');
                proceedCodPayment(e, dataInput.ctknck);
            } else if (dataInput.message === "session expired") {
                showSessionExpired();
            } else {
                //    		          alert(dataInput.message);
                $(".invalid-otp").html("Invalid OTP. Please try again");
                if ($(".generateOtpDesk").length) {
                    $(".generateOtpDesk").removeClass("resend-button-link");
                    $(".generateOtpDesk").addClass("show-resend-link");
                } else if ($(".generateOtpMob").length) {
                    $(".generateOtpMob").removeClass("resend-button-link");
                    $(".generateOtpMob").addClass("show-resend-link");
                }
            }
        });
        jqxhr.fail(function (dataInput) {

        });
        jqxhr.always(function (dataInput) {
            //    $('#fullPageLoader').addClass('hide');
        });
    }

    function generateOtp(e) {
        emptyOtpFields();
        if ($(".generateOtpDesk").length) {
            $(".generateOtpDesk").addClass("resend-button-link");
            $(".generateOtpDesk").removeClass("show-resend-link");
        } else if ($(".generateOtpMob").length) {
            $(".generateOtpMob").addClass("resend-button-link");
            $(".generateOtpMob").removeClass("show-resend-link");
        }
        $(".invalid-otp").html("");
        if ($(".generateOtpDesk").length) {
            $("#cod-container").html($("#digitPassword").html());
        } else {
            $(".m-payment-wrapper .payment-detail").html($("#digitPassword").html());
        }
        var method = $(this).data('method');
        var jqxhr = $.ajax({
            url: webApp.generateOtp,
            type: "GET",
            cache: false,
            dataType: "json",
            data: {},
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success) {
                $(".invalid-otp").html('');
                if (method === 'cod') {
                    $("#generateOtpbtn").show();
                    timer(180);
                    $(".otp-sent-text").show();
                    $("#otpExpire").hide();
                    $("#timer").show();
                    $("#validateOtpbtn").show();
                    $(".password-input").show();
                }
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                //alert(data.message);
                if (data.message != null && data.message != '') {
                    $(".invalid-otp").html(data.message);
                    $(".otp-sent-text").hide();
                    $("#otpExpire").hide();
                    $("#timer").hide();
                    $("#validateOtpbtn").hide();
                    $(".password-input").hide();
                }
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //    $('#fullPageLoader').addClass('hide');
        });
    }

    function proceedCodPayment(e, ctknck) {
        e.preventDefault();

        var ua = navigator.userAgent;
        if (ua === "WinniApp - iOS") {

        } else {
            var cf = window.confirm("By clicking OK your order will be placed with payment option as COD\nYour order will be confirmed only after a confirmation call from our executive on Sender's phone number (within 24 hours of delivery of order)");
            if (cf === false) {
                return;
            }
        }

        //$('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.paymentSubmitUri,
            type: "POST",
            cache: false,
            data: {
                method: 'cod',
                ctknck: ctknck
            },
            dataType: "json",
            statusCode: {
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                document.location.href = webApp.checkoutCompletedUri + "?orderId=" + data.orderId;
            } else {
                if (data.message === "session expired") {
                    showSessionExpired();
                } else if (data.message === "Invalid Request") {
                    alert("Invalid Request");
                } else {
                    alert("error");
                }
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            // $('#fullPageLoader').addClass('hide');
        });
    }


    function showCityOfPincode(e) {

        var pincode = $(this).val();
        var countryId = $("#newAddrCountryId").val();
        if ($.isNumeric(pincode) && pincode.length === 6) {
            var uri = webApp.checkCityOfPincodeUri.replace("{pincode}", pincode);
            uri = uri.replace("{countryId}", countryId);
            //     $('#fullPageLoader').removeClass('hide');
            var jqxhr = $.ajax({
                url: uri,
                type: "GET",
                cache: false,
                dataType: "json",
                statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                    404: handler404,
                    500: handler500
                }
            });
            jqxhr.done(function (data) {
                if (data.result.success) {
                    $("#newAddrCity").val(data.result.city);
                    M.updateTextFields();
                } else if (data.message === "session expired") {
                    showSessionExpired();
                } else {
                    $("#newAddrCity").val("");
                    M.toast({ html: "Delivery not available at this location" });
                }
            });
            jqxhr.fail(function (data) {

            });
            jqxhr.always(function (data) {
                //      $('#fullPageLoader').addClass('hide');
            });
        } else if (countryId === "41" && $.isNumeric(pincode) && pincode.length > 6) {
            $("#newAddrCity").val("");
            M.toast({ html: "Delivery not available at this location" });
        } else {
            $("#newAddrCity").val("");
        }
    }
    function logEvent(name, params) {
        if (!name) {
            return;
        }

        if (window.AnalyticsWebInterface) {
            // Call Android interface
            window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
        } else if (window.webkit
            && window.webkit.messageHandlers
            && window.webkit.messageHandlers.firebase) {
            // Call iOS interface
            var message = {
                command: 'logEvent',
                name: name,
                parameters: params
            };
            window.webkit.messageHandlers.firebase.postMessage(message);
        } else {
            // No Android or iOS interface found
            // console.log("No native APIs found.");
        }
    }

    function addNewAddress(e) {
        e.preventDefault();
        var data = $('#addNewAddressForm').serialize();

        //  $('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.addNewAddressUri,
            type: "POST",
            cache: false,
            data: data,
            dataType: "json",
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {

            if (data.success === "true") {
                $('#addAddressModal').modal();
                $('#addAddressModal').modal('close');
                loadAddressView();
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                M.toast({ html: data.message });
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //    $('#fullPageLoader').addClass('hide');
        });
    }

    function personalizeChange(e) {
        var $delTimePicker = $('#deliveryTimePicker_' + globleIndex + ' option:selected');
        var $displayTime = $('#displayTime_' + globleIndex);
        var captureMoment = $('#captureMomentChk_' + globleIndex).is(":checked");

        var deliveryTime = 0;
        if ($delTimePicker.val() !== null) {
            if ($delTimePicker.length > 0) {
                deliveryTime = $delTimePicker.val();
            }
            $displayTime.val($delTimePicker.text());
        } else {
            $displayTime.val("");
        }

        var deliverySlotMappingId = $("#deliverySlotMappingIdInput_" + globleIndex).val();
        //  $('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.personalizePriceChangesUri,
            type: "POST",
            cache: false,
            data: {
                deliveryTime: deliveryTime,
                captureMoment: captureMoment,
                deliveryTimeSlotMappingId: deliverySlotMappingId
            },
            dataType: "json",
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                $("#dynOrderPriceSummary").html(data.html);
                //replace html prices
                var currency = localStorage.getItem('userCurrency');
                changeCurrecies(currency);
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                alert(data.message);
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //   $('#fullPageLoader').addClass('hide');
        });
    }

    function proceedAfterAddress() {
        if ($(".address-proceed-btn").hasClass("disabled-btn")) {
            return;
        }
        var selAddrId = $("#selAddressId").val();
        if (selAddrId === "") {
            M.toast({ html: "Please select an address to proceed" });
            return;
        }

        loadPersonalizeView();
    }

    function proceedAfterPersonalize() {
        if ($('.output1 span').length > 0) {
            M.toast({ html: 'Please enter valid mobile number' });
            return false;
        }
        var tC = $('#term-condion-id').is(':checked');
        if (tC.toString() == 'true') {
            var data = $('#personalizeForm').serialize();
            // $('#fullPageLoader').removeClass('hide');
            var jqxhr = $.ajax({
                url: webApp.personalizeSubmitUri,
                type: "POST",
                cache: false,
                data: data,
                dataType: "json",
                statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                    404: handler404,
                    500: handler500
                }
            });
            jqxhr.done(function (data) {
                if (data.success === "true") {
                    loadPaymentView();
                } else if (data.message === "session expired") {
                    showSessionExpired();
                } else {
                    scrollToTop();
                    M.toast({ html: data.message });
                }
            });
            jqxhr.fail(function (data) {

            });
            jqxhr.always(function (data) {
                // $('#fullPageLoader').addClass('hide');
            });
        } else {
            scrollToTop();
            M.toast({ html: "Please select terms & conditions" });
        }
    }

    function scrolled() {
        var scroll = $(window).scrollTop();
        var possiblePos = parseInt(windowHeight) + parseInt(scroll);

        if (possiblePos >= parseInt(relativeProceedBtnTop) + 66) {
            $(".st-go-to-payment").addClass("hide");
        } else {
            $(".st-go-to-payment").removeClass("hide");
        }
        //console.log("TT\t" + scroll + "\t" + windowHeight + "\t" + relativeProceedBtnTop + "\t" + );

        /* if()
         var fixedProceedBtnTop = $('.st-continue-payment').offset().top;
         if(fixedProceedBtnTop < )*/
    }

    function selectAddress(e) {
        // $('#fullPageLoader').removeClass('hide');
        var addressId = $(this).data("id");
        var jqxhr = $.ajax({
            url: webApp.selectAddressUri,
            type: "POST",
            cache: false,
            data: {
                addressId: addressId
            },
            dataType: "json",
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                //                loadAddressView();
                loadAddressViewNew();
                //markAddressSelected($baseContainer);
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                alert(data.message);
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //  $('#fullPageLoader').addClass('hide');
        });
        $(".address_wrap").addClass("hide");
        $(".delivery-options.summary").removeClass("hide");
    }

    function loadLoginViewLogin() {


        var isSocial = $("#isSocial").val();
        var isSocialSuccess = $("#isSocialSuccess").val();
        var isVerifiedMobileSocial = "";
        var isVerifiedOtpSocial = "";
        var attmptUuidSocial = "";
        var tempUuidSocial = "";
        var emailSocial = "";
        var nameSocial = "";
        var idSocial = "";
        if (isSocial !== "undefined" && isSocialSuccess !== "undefined" && isSocial === "true" && isSocialSuccess === "true") {
            isVerifiedMobileSocial = $("#isVerifiedMobileSocial").val();
            isVerifiedOtpSocial = $("#isVerifiedOtpSocial").val();
            attmptUuidSocial = $("#attmptUuidSocial").val();
            tempUuidSocial = $("#tempUuidSocial").val();
            emailSocial = $("#emailSocial").val();
            nameSocial = $("#nameSocial").val();
            idSocial = $("#idSocial").val();
        }
        var jqxhr = $.ajax({
            //url: webApp.loginViewUri,
            url: webApp.loginViewUri,
            type: "GET",
            cache: false,
            data: {},
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            $("#ckDynContentWrapper").html(data.html);
            $("#fullPageLoader").addClass("hide");
            $("#loginEmail").val("");
            $("#loginMobile").val("");
            //    	            $('.modal-trigger').leanModal();
            if (isSocial !== "undefined" && isSocialSuccess !== "undefined" && isSocial === "true" && isSocialSuccess === "true") {
                $('.ck-login-email-wrapper').removeClass('hide');
                $('.ck-login-mobile-wrapper').removeClass('hide');
                $('.ck-login-name-wrapper').removeClass('hide');
                $('#phoneNumberTab').addClass("displayNumberSc");
                $("#loginTab").addClass('hide');
                //                    $("#loginTab").style.display = "none";
                $('#loginWithOtp').addClass("hide");
                $(".login-title").text("Verify mobile");
                $("#isRegistered").val("true");
                $("#isSocialCheck").val("true");
                $("#emailVerified").val("true");
                $("#loginEmail").val(emailSocial);
                $("#loginEmail").attr("readonly", "true");
                $('label[for=loginEmail]').hide();
                if (nameSocial !== null && nameSocial !== '') {
                    $("#loginName").val(nameSocial);
                    $('label[for=loginName]').hide();
                }
                $("#isVerifiedMobile").val(isVerifiedMobileSocial);
                $("#attmptUuid").val(attmptUuidSocial);
                $("#tempUuid").val(tempUuidSocial);
                $(".waves-light").text("CONTINUE");
            }
        });
        jqxhr.fail(function (data) {

        });
    }
    function loginFromCheckout(e) {
        e.preventDefault();
        if ($('#phoneNumberTab').hasClass('active') || $('#phoneNumberTab').hasClass('showMobile')) {
            if ($('.output1 span').length > 0) {
                M.toast({ html: 'Please enter valid mobile number' });
                $(".fl-remove button").removeClass("disabled btn_loader");
                return false;
            }
        }
        var email = $(this).find("#loginEmail").val();
        //        var countryCode = $(this).find("#loginCountryCode").val();
        var countryCode = $('#loginCountryCode').val();
        var mobile = $(this).find("#loginMobile").val();
        if ($(this).find("#emailVerified").val() === "false") {
            checkEmailForLogin(this, email, mobile, countryCode);   //Verify whether email is registered on not
        } else {
            var password = $(this).find("#loginPassword").val();
            var name = $(this).find("#loginName").val();

            var whatsappNotify = $(this).find("#loginWhatsappNotify").val();
            var tempUuid = $(this).find("#tempUuid").val();
            var attmptUuid = $(this).find("#attmptUuid").val();
            //            var otp = $(this).find("#loginOtp").val();
            var otpElment = document.getElementsByClassName("loginOtp");
            var userTitle = $(this).find("#userTitle option:selected").val();
            var otp = '';
            for (var i = 0; i < otpElment.length; i++) {
                otp += otpElment[i].value;
            }
            if ($(this).find("#isSocialCheck").val() === "true") {
                doSocialMobile(this, otp, tempUuid, attmptUuid, name, mobile, countryCode, userTitle);
            } else if ($(this).find("#isRegistered").val() === "false") {
                doSignup(this, email, password, name, mobile, countryCode, userTitle);
            } else if ($(this).find("#isVerifiedOtp").val() === "false") {
                doVerifyOtp(otp, tempUuid, attmptUuid, whatsappNotify);
            } else {
                doLogin(this, email, password, mobile, countryCode);
            }
        }
        $(".fl-remove button").click(function () {
            $(this).addClass("disabled btn_loader");
        });
    }

    function doLogin(form, email, password, mobile, countryCode) {
        var scrval = $('#scrval').val();
        var isvlexst = $("#isvlexst").val();
        $(".fl-remove button").addClass("disabled btn_loader");
        // $('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.loginUri,
            type: "POST",
            cache: false,
            data: {
                email: email,
                password: password,
                mobile: mobile,
                countryCode: countryCode,
                scrval: scrval,
                isvlexst: isvlexst
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                $("#ckDynViewPart").val(2);

                dataLayer.push({
                    'event': 'userLogin',
                    'userDetail': {
                        'email': email
                    }
                });
                if (data.isVerifiedOtp === "false") {
                    var seconds = data.leftTime;
                    startTimer(seconds);
                    var $submitBtn = $(form).find(':submit');
                    $('.ck-login-otp-wrapper').addClass('hide');
                    $(form).find(".signup-field").addClass('hide');
                    $(".login-title").text("Verify OTP");
                    $(form).find("#isRegistered").val("true");
                    $(form).find("#isVerifiedOtp").val("false");
                    $(form).find("#attmptUuid").val(data.attmptUuid);
                    $(form).find("#tempUuid").val(data.tempUuid);
                    $(form).find(".verify-otp-field").removeClass('hide');
                    $(form).find("#changeEmailLink").addClass('hide');
                    $(form).find("#changePhoneNum").removeClass('hide');
                    $(form).find("#loginEmail,.existingUser").addClass('hide');
                    $(form).find("#otpMobileMsg").removeClass('hide');
                    $(form).find("#otpMobileMask").text(data.mobile);
                    $(form).find("#emailhint").addClass('hide');
                    $(form).find("#loginMobile").attr("readonly", "true");
                    $("#loginCountryCode").attr('disabled', 'disabled');
                    $('.custom-select').css({ "pointer-events": "none", "cursor": "none" });
                    $("#loginTab .emailTab").removeClass('active');
                    $("#loginTab .numberTab").addClass('active');
                    $("#emailTab").hide();
                    $('#otc-1').focus();
                    M.toast({ html: 'Mobile OTP has been sent' });
                    $submitBtn.text("Continue");
                } else {
                    loadCheckoutView();
                }
            } else {
                if (data.resetPassword === "true") {
                    $("#wrongAttemptPassword").show();
                } else {
                    $("#wrongAttemptPassword").hide();
                }
                M.toast({ html: data.message });
                $(".ck-login-password-wrapper input[type='password']").val("");
            }
            checkScore();
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //  $('#fullPageLoader').addClass('hide');
        });
    }

    function doSignup(form, email, password, name, mobile, countryCode, userTitle) {
        var scrval = $('#scrval').val();
        var isvlexst = $("#isvlexst").val();
        $(".fl-remove button").addClass("disabled btn_loader");
        //$('#fullPageLoader').removeClass('hide');      
        var jqxhr = $.ajax({
            url: webApp.signupUri,
            type: "POST",
            cache: false,
            data: {
                email: email,
                password: password,
                name: name,
                mobile: mobile,
                countryCode: countryCode,
                scrval: scrval,
                isvlexst: isvlexst,
                userTitle: userTitle
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                var $submitBtn = $(form).find(':submit');
                //var mobile = $(form).find("#loginMobile").val(data.mobile);
                //var countryCode = $(form).find("#countryCode").val(data.countryCode);
                if (data.isVerifiedOtp === "false" && data.message === '') {
                    var seconds = data.leftTime;
                    startTimer(seconds);
                    var tempUuid = $(form).find("#tempUuid").val(data.tempUuid);
                    var attmptUuid = $(form).find("#attmptUuid").val(data.attmptUuid);
                    $(form).find("#emailVerified").val("true");
                    $(form).find("#loginEmail").attr("readonly", "true");
                    $(form).find("#loginMobile").attr("readonly", "true");
                    $('.custom-select').css({ "pointer-events": "none", "cursor": "none" });
                    if (data.email !== "") {
                        $("#loginTab .emailTab").removeClass('active');
                        $("#loginTab .numberTab").addClass('active');
                    }
                    $('.ck-login-otp-wrapper').addClass('hide');
                    $(form).find(".signup-field").addClass('hide');
                    $(".login-title").text("Verify OTP");
                    $(form).find("#isRegistered").val("true");
                    $(form).find("#isVerifiedOtp").val("false");
                    $(form).find("#attmptUuid").val(data.attmptUuid);
                    $(form).find("#tempUuid").val(data.tempUuid);
                    $(form).find(".verify-otp-field").removeClass('hide');
                    $(form).find("#changeEmailLink,.existingUser").addClass('hide');
                    $(form).find("#loginEmail").addClass('hide');
                    $(form).find("#otpMobileMsg").removeClass('hide');
                    $(form).find("#otpMobileMask").text(data.mobile);
                    $(form).find("#emailhint").addClass('hide');
                    $(form).find("#changePhoneNum").removeClass('hide');
                    $(form).find("#changePhoneNum").show();
                    $("#phoneNumberTab").show();
                    $("#emailTab").hide();
                    $("#otpMobileMsg").css('display', 'block');
                    M.toast({ html: 'Mobile OTP has been sent' });
                    $('.ck-login-email-wrapper').removeClass('show');
                    $submitBtn.text("Continue");
                } else if (data.isRegistered === "true" && data.isVerifiedOtp === "false" && data.message !== '') {
                    $('.ck-login-password-wrapper').removeClass('hide');
                    $(form).find("#emailVerified").val("true");
                    if (data.email !== '') {
                        $(form).find("#loginEmail").attr("readonly", "true");
                        $(form).find("#changeEmailLink").removeClass('hide');
                    }
                    if (data.mobile !== '') {
                        $(form).find("#loginMobile").attr("readonly", "true");
                        $(form).find("#changePhoneNum").removeClass('hide');
                        $('.custom-select').css({ "pointer-events": "none", "cursor": "none" });
                    }
                    $(form).find("#loginEmail").val(data.email);
                    $(form).find("#loginMobile").val(data.mobile);
                    $('.custom-select').val(data.countryCode);
                    if (data.email !== "") {
                        $('.ck-login-email-wrapper').removeClass('hide');
                        $('.ck-login-mobile-wrapper,.existingUser').addClass('hide');
                        $('#phoneNumberTab').addClass('showMobile');
                    }
                    if (data.mobile !== "") {
                        $('.ck-login-mobile-wrapper').removeClass('hide');
                        $('.ck-login-email-wrapper,.whatsapp_subscription,.existingUser').addClass('hide');
                        $("#phoneNumberTab").addClass('showNum');
                        $("#changePhoneNum").removeClass('hide');
                        $("#loginWithOtp").removeClass('hide');
                        $("#emailTab").removeClass('hide');
                    }
                    if (data.email !== "" && data.mobile !== "") {
                        $('#loginWithOtp,.ck-login-name-wrapper,#changeEmailLink').addClass('hide');
                    }
                    $("#loginTab").hide();
                    $(".login-title").text("Login");
                    $(form).find("#isRegistered").val("true");
                    $('.ck-login-password-wrapper label').text("Winni Password");
                    $('.ck-login-password-wrapper').removeClass('hide');
                    $("#loginTab").removeClass("showTab");
                    $submitBtn.text("Login");
                    M.toast({ html: data.message });
                }
                checkScore();
            } else {
                M.toast({ html: data.message });
                $(".ck-login-password-wrapper input[type='password']").val("");
            }
            checkScore();
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            // $('#fullPageLoader').addClass('hide');
        });
    }

    function checkEmailForLogin(form, email, mobile, countryCode) {
        var scrval = $('#scrval').val();
        var isvlexst = $("#isvlexst").val();
        $(".fl-remove button").addClass("disabled btn_loader");
        //$('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.loginEmailVerifyUri,
            type: "POST",
            cache: false,
            data: {
                email: email,
                mobile: mobile,
                countryCode: countryCode,
                scrval: scrval,
                isvlexst: isvlexst
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                var $submitBtn = $(form).find(':submit');
                $('.ck-login-password-wrapper').removeClass('hide');
                $(form).find("#emailVerified").val("true");
                if (data.email !== '') {
                    $(form).find("#loginEmail").attr("readonly", "true");
                    $(form).find("#changeEmailLink").removeClass('hide');
                }
                if (data.mobile !== '') {
                    $(form).find("#loginMobile").attr("readonly", "true");
                    $(form).find("#changePhoneNum").removeClass('hide');
                    $("#loginCountryCode").attr('disabled', 'disabled');
                    $('.custom-select').css({ "pointer-events": "none", "cursor": "none" });
                }
                $(form).find("#loginEmail").val(data.email);
                $(form).find("#loginMobile").val(data.mobile);
                $('.custom-select').val(data.countryCode);
                //                $(form).find("#loginCountryCode").val(data.countryCode);
                if (data.isRegistered === "false") {
                    if (data.email === '') {
                        $("#loginEmail").removeAttr("readonly");
                    }
                    if (data.email !== "") {
                        $('#phoneNumberTab').addClass('showMobile');
                        $('select.CountryCodeList').val('+91');
                    }
                    $(".login-title").html("<span style='font-size:37px;'>Continue as guest</span>");
                    $(form).find("#isRegistered").val("false");
                    $(form).find(".signup-field").removeClass('hide');
                    //$('.ck-login-conf-password-wrapper').removeClass('hide');
                    $('.ck-login-password-wrapper label').text("New Password");
                    //start chekout signup without password
                    $('.ck-login-password-wrapper').addClass('hide');
                    $(form).find("#loginPassword").val("");
                    $("#loginTab").addClass("hide");
                    //hide tab when redirest from change email or numeber
                    $("#loginTab").removeClass("showTab");
                    $("#loginEmail,.existingUser").removeClass("hide");
                    $('.ck-login-email-wrapper').addClass('show');
                    $(".whatsapp_subscription,.existingUser").show();
                    //end chekout signup without password
                    //Coming here after email check
                    $submitBtn.text("Continue");
                } else if (data.isVerifiedMobile === "false") {
                    if (data.email !== "") {
                        $('.ck-login-email-wrapper').removeClass('hide');
                        $('#phoneNumberTab').addClass('showMobile');
                        $('#phoneNumberTab').show();
                    }
                    if (data.mobile !== "") {
                        $("#loginWithOtp").removeClass('hide');
                    }
                    $('#loginTab').removeClass('showTab');
                    $("#loginTab,.existingUser").addClass("hide");
                    $('.ck-login-password-wrapper').removeClass('hide');
                    $('.ck-login-mobile-wrapper').removeClass('hide');
                    $(".login-title").text("Login");
                    $(form).find("#isRegistered").val("true");
                    $('.ck-login-password-wrapper label').text("Winni Password");
                    $submitBtn.text("Login");
                } else {
                    if (data.email !== "") {
                        $("#loginMobile").attr('type', 'hidden');
                        $('.ck-login-email-wrapper').removeClass('hide');
                        $('.ck-login-mobile-wrapper').addClass('hide');
                        $('#phoneNumberTab').addClass('showMobile');
                    }
                    if (data.mobile !== "") {
                        $("#loginEmail").attr('type', 'hidden');
                        $('.ck-login-mobile-wrapper').removeClass('hide');
                        $('.ck-login-email-wrapper,.whatsapp_subscription').addClass('hide');
                        $("#phoneNumberTab").addClass('showNum');
                        $("#changePhoneNum").removeClass('hide');
                        $("#loginWithOtp").removeClass('hide');
                        $("#emailTab").removeClass('hide');
                    }
                    $("#loginTab").hide();
                    $(".login-title").text("Login");
                    $('#phoneNumberTab').removeClass('showMobile');
                    $(form).find("#isRegistered").val("true");
                    $('.ck-login-password-wrapper label').text("Winni Password");
                    $('.ck-login-password-wrapper').removeClass('hide');
                    $("#loginTab").removeClass("showTab");
                    $(".existingUser").addClass("hide");
                    $submitBtn.text("Login");
                }
                checkScore();
            } else {
                M.toast({ html: data.message });
                $(".ck-login-password-wrapper input[type='password']").val("");
            }
            checkScore();
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //  $('#fullPageLoader').addClass('hide');
        });
    }

    function doVerifyOtp(otp, tempUuid, attmptUuid, whatsappNotify) {
        var scrval = $('#scrval').val();
        var isvlexst = $("#isvlexst").val();
        $(".fl-remove button").addClass("disabled btn_loader");
        // $('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.verifyOtpUri,
            type: "POST",
            cache: false,
            data: {
                otp: otp,
                tempUuid: tempUuid,
                attmptUuid: attmptUuid,
                scrval: scrval,
                isvlexst: isvlexst,
                whatsappNotify: whatsappNotify
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                $("#ckDynViewPart").val(2);

                //                dataLayer.push({
                //                    'event': 'userLogin',
                //                    'userDetail': {
                //                        'email': email
                //                    }
                //                });

                loadCheckoutView();
            } else {
                if (data.resetPassword === "true") {
                    $("#wrongAttemptPassword").show();
                } else {
                    $("#wrongAttemptPassword").hide();
                }
                M.toast({ html: data.message });
            }
            checkScore();
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //  $('#fullPageLoader').addClass('hide');
        });
    }

    function doSocialMobile(form, otp, tempUuid, attmptUuid, name, mobile, countryCode, userTitle) {
        var scrval = $("#scrval").val();
        var isvlexst = $("#isvlexst").val();
        $(".fl-remove button").addClass("disabled btn_loader");
        //$('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.socialMblUri,
            type: "POST",
            cache: false,
            data: {
                otp: otp,
                name: name,
                mobile: mobile,
                countryCode: countryCode,
                attmptUuid: attmptUuid,
                tempUuid: tempUuid,
                userTitle: userTitle
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                var $submitBtn = $(form).find(':submit');
                //var mobile = $(form).find("#loginMobile").val(data.mobile);
                var tempUuid = $(form).find("#tempUuid").val(data.tempUuid);
                var attmptUuid = $(form).find("#attmptUuid").val(data.attmptUuid);
                //var countryCode = $(form).find("#countryCode").val(data.countryCode);
                $(form).find("#emailVerified").val("true");
                $(form).find("#loginEmail").attr("readonly", "true");
                $(form).find("#loginMobile").attr("readonly", "true");
                $("#loginCountryCode").attr('disabled', 'disabled');
                $('.custom-select').css({ "pointer-events": "none", "cursor": "none" });
                if (data.isVerifiedOtp === "false") {
                    $('.ck-login-otp-wrapper').addClass('hide');
                    $(form).find(".signup-field").addClass('hide');
                    $(".login-title").text("Verify OTP");
                    $(form).find("#isRegistered").val("true");
                    $(form).find("#isVerifiedOtp").val("false");
                    $(form).find("#attmptUuid").val(data.attmptUuid);
                    $(form).find("#tempUuid").val(data.tempUuid);
                    $(form).find(".verify-otp-field").removeClass('hide');
                    $(form).find("#changeEmailLink").addClass('hide');
                    $(form).find("#loginEmail").addClass('hide');
                    $(form).find("#otpMobileMsg").removeClass('hide');
                    $(form).find("#otpMobileMask").text(data.mobile);
                    $(form).find("#emailhint").addClass('hide');
                    $(form).find("#isSocialCheck").val("false");
                    $(form).find("#changePhoneNum").removeClass('hide');
                    $(form).find("#changePhoneNum").show();
                    $("#changeSocialPhoneNum").removeClass("hide");
                    $("#changePhoneNum,.existingUser").addClass("hide");
                    $submitBtn.text("Continue");
                }
            } else {
                M.toast({ html: data.message });
            }
            checkScore();
        });
        jqxhr.fail(function (data) {

        });
        //            jqxhr.complete(function (data) {
        //                // $('#fullPageLoader').addClass('hide');
        //            });
    }

    function loadCheckoutView() {
        var viewPartNo = $("#ckDynViewPart").val();
        if (parseInt(viewPartNo) === 5) {
            loadCartView();
        } else if (parseInt(viewPartNo) === 1) {
            var isSocialExst = $("#isSocial").val();
            if (isSocialExst === null || isSocialExst === "" || isSocialExst === undefined || isSocialExst === 'undefined') {
                loadLoginView();
            }
        } else if (parseInt(viewPartNo) === 2) {
            loadAddressView();
        } else if (parseInt(viewPartNo) === 3) {
            loadPersonalizeView();
        } else if (parseInt(viewPartNo) === 4) {
            loadPaymentView();
        }
    }

    function loadPaymentView() {
        gaTrack(webApp.paymentViewUri);
        //$('#fullPageLoader').removeClass('hide');
        var txId = webApp.txId;
        webApp.txId = "";

        var jqxhr = $.ajax({
            url: webApp.paymentViewUri,
            type: "GET",
            cache: false,
            data: {
                txId: txId
            },
            dataType: "json",
            statusCode: {
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                if (txId !== "") {
                    window.history.pushState("object or string", "Title", webApp.cityHomeUri);
                    window.history.pushState("object or string", "Title", webApp.cartUri);
                    window.history.pushState("object or string", "Title", webApp.addressPageUri);
                    window.history.pushState("object or string", "Title", webApp.personalizePageUri);
                }

                if (window.location.pathname !== webApp.paymentPageUri) {
                    window.history.pushState("object or string", "Title", webApp.paymentPageUri);
                }

                $("#ckDynContentWrapper").html(data.html);
                highlightNavigation(4);
                $("#ckDynViewPart").val(4);
                zippyHeader();
                //                $('.modal-trigger').leanModal();
                //M.updateTextFields();
                scrollToTop();
                formatCardFields();
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                alert(data.message);
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //$('#fullPageLoader').addClass('hide');
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        });
    }

    function loadPersonalizeView() {
        gaTrack(webApp.personalizeViewUri);
        // $('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webApp.personalizeViewUri,
            type: "GET",
            cache: false,
            data: {},
            dataType: "json",
            statusCode: {
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                zippyHeader();
                if (data.zippyDelivery === "true") {
                    highlightNavigation(4);
                    $("#ckDynViewPart").val(4);
                    location.href = webApp.paymentPageUri;
                }
                if (window.location.pathname !== webApp.personalizePageUri) {
                    window.history.pushState("object or string", "Title", webApp.personalizePageUri);
                }

                $("#ckDynContentWrapper").html(data.html);
                highlightNavigation(3);
                $("#ckDynViewPart").val(3);
                //                $('.modal-trigger').leanModal();
                scrollToTop();
                //                initDatePicker(data.zoneSize);
                //                updateDeliveryTime(0);

                $("#specialRequestToggle").click(function () {
                    $("#specialRequest").slideToggle("medium");
                });
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                alert(data.message);
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //   $('#fullPageLoader').addClass('hide');
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        });
    }

    function loadAddressView() {
        gaTrack(webApp.addressViewUri);
        //$('#fullPageLoader').removeClass('hide');

        var jqxhr = $.ajax({
            //url: webApp.loginViewUri,
            url: webApp.addressViewUri,
            type: "GET",
            cache: false,
            data: {},
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                if (window.location.pathname !== webApp.addressPageUri) {
                    window.history.pushState("object or string", "Title", webApp.addressPageUri);
                }

                $("#ckDynContentWrapper").html(data.html);
                highlightNavigation(2);
                zippyHeader();
                //Fix this to right way
                var savedCount = $("#savedAddressCount").val();
                if (!(savedCount > 0)) {
                    showNewAddressForm();
                }
                ///

                scrollToTop();
                if ($(".relative-proceed-btn").length) {
                    relativeProceedBtnTop = $(".relative-proceed-btn").offset().top;
                }
                //                $('.modal-trigger').leanModal();
                $("#ckDynViewPart").val(2);
                try {
                    showCheckoutAddonProducts();
                } catch (e) {

                }
                scrolled();
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else if (data.redirectToPart === "2") {
                location.href = webApp.addressPageUri;
            } else {
                alert(data.message)
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            var paramsData = {
                'CITY_ID': document.getElementById("currentCityId").value,
                'CITY_NAME': document.getElementById("currentCityName").value
            };
            logEvent("save", paramsData);
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
            //  $('#fullPageLoader').addClass('hide');
        });
    }
    function loadAddressViewNew() {
        gaTrack(webApp.addressViewUri);
        //$('#fullPageLoader').removeClass('hide');
        var url = webApp.addressViewUri;
        var url1 = url.split("?");
        url = url1[0];
        var jqxhr = $.ajax({
            //url: webApp.loginViewUri,

            url: url,
            type: "GET",
            cache: false,
            data: {},
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                if (window.location.pathname !== webApp.addressPageUri) {
                    window.history.pushState("object or string", "Title", webApp.addressPageUri);
                }

                $("#ckDynContentWrapper").html(data.html);
                highlightNavigation(2);
                //Fix this to right way
                var savedCount = $("#savedAddressCount").val();
                if (!(savedCount > 0)) {
                    showNewAddressForm();
                }
                ///

                scrollToTop();
                if ($(".relative-proceed-btn").length) {
                    relativeProceedBtnTop = $(".relative-proceed-btn").offset().top;
                }
                //                $('.modal-trigger').leanModal();
                $("#ckDynViewPart").val(2);
                try {
                    showCheckoutAddonProducts();
                } catch (e) {

                }
                scrolled();
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else if (data.redirectToPart === "2") {
                location.href = webApp.addressPageUri;
            } else {
                alert(data.message)
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            var paramsData = {
                'CITY_ID': document.getElementById("currentCityId").value,
                'CITY_NAME': document.getElementById("currentCityName").value
            };
            logEvent("save", paramsData);
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
            //  $('#fullPageLoader').addClass('hide');
        });
    }
    function loadCartView() {
        gaTrack(webApp.cartViewUri);
        //$('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            //url: webApp.loginViewUri,
            url: webApp.cartViewUri,
            type: "GET",
            cache: false,
            data: {},
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                $("#ckDynContentWrapper").html(data.html);
                highlightNavigation(5);
                scrollToTop();
                zippyHeader();
                if ($(".relative-proceed-btn").length) {
                    relativeProceedBtnTop = $(".relative-proceed-btn").offset().top;
                }
                $("#ckDynViewPart").val(5);
                try {
                    showCartAddonProducts();
                } catch (e) {

                }
                scrolled();
            } else if (data.message === "session expired") {
                showSessionExpired();
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
            $('#fullPageLoader').addClass('hide');
        });
    }
    function zippyHeader() {
        var zippyValue = $('#onlyZippyDeliveries').val();
        if (zippyValue === 'true') {
            $(".onlyZippyDelivery").css('display', 'inline-block');
            $(".nonZippyDelivery").hide();
            $('.checkout-status-wrapper').addClass('checkout-status-zippy');
        } else {
            $(".onlyZippyDelivery").hide();
            $(".nonZippyDelivery").css('display', 'inline-block');
            $('.checkout-status-wrapper').removeClass('checkout-status-zippy');
        }
    }
    function loadCartViewWithPincode() {
        var pincode = $('#cartPincodeSearch').val();
        if (pincode == '') {
            alert("Please enter pincode to search");
            return;
        }
        //$('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            //url: webApp.loginViewUri,
            url: webApp.cartViewUri,
            type: "GET",
            cache: false,
            data: { pincode: pincode },
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                $("#ckDynContentWrapper").html(data.html);
                $(".pinCodeResult").show();
                $(".enterPinCode").hide();
                highlightNavigation(5);
                scrollToTop();
                if ($(".relative-proceed-btn").length) {
                    relativeProceedBtnTop = $(".relative-proceed-btn").offset().top;
                }
                $("#ckDynViewPart").val(5);
                try {
                    showCartAddonProducts();
                } catch (e) {

                }
                scrolled();
            } else if (data.message === "session expired") {
                showSessionExpired();
            }
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
            $('#fullPageLoader').addClass('hide');
        });
    }
    function loadPriceView() {
        var jqxhr = $.ajax({
            url: webApp.priceSummaryViewUri,
            type: "GET",
            cache: false,
            data: {},
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                $("#dynOrderPriceSummary").html(data.html);
                var currency = localStorage.getItem('userCurrency');
                changeCurrecies(currency);
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                alert(data.message)
            }
        });
        jqxhr.fail(function (data) {
        });
        jqxhr.always(function (data) {
            //  $('#fullPageLoader').addClass('hide');
        });
    }
    function loadCouponStatus() {
        var jqxhr = $.ajax({
            url: webApp.couponStatusViewUri,
            type: "GET",
            cache: false,
            data: {},
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {

                $("#dynCouponStatus").html(data.html);
                $('.loader').hide();
                $('#couponConfirmation').modal({
                    dismissible: true, // Modal can be dismissed by clicking outside of the modal
                    startingTop: '4%', // Starting top style attribute
                    endingTop: '10%', // Ending top style attribute
                    ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    },
                    onOpenStart: function () {
                        $('#dynCartAddonsProduct .slick-prev , .slick-next').css("z-index", "0");
                    },
                    onOpenEnd: function () {
                        $('#dynCartAddonsProduct .slick-prev , .slick-next').css("z-index", "0");
                    },
                    onCloseEnd: function () {
                        $('#dynCartAddonsProduct .slick-prev , .slick-next').css("z-index", "9");
                    },
                    complete: function () {
                        location.href = cartViewUri;
                    } // Callback for Modal close
                });
                $('#couponConfirmation').modal('open');


                var currency = localStorage.getItem('userCurrency');
                changeCurrecies(currency);
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                alert(data.message);
            }
        });
        jqxhr.fail(function (data) {
            //            $('#couponConfirmation').modal('close');
        });
        jqxhr.always(function (data) {
            //  $('#fullPageLoader').addClass('hide');
        });
    }





    function loadLoginView() {
        //  window.history.pushState("object or string", "Title", "/sf/checkout/adv/login");
        //$('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            //url: webApp.loginViewUri,
            url: webApp.loginViewUri,
            type: "GET",
            cache: false,
            data: {},
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {
            $("#ckDynContentWrapper").html(data.html);
            //            $('.modal-trigger').leanModal();
        });
        jqxhr.fail(function (data) {

        });
        jqxhr.always(function (data) {
            //  $('#fullPageLoader').addClass('hide');
        });
    }

    function handler404(data) {

    }
    function handler500(data) {

    }
    function handler502() {
        M.toast({ html: 'Something went wrong, please try after some time' });
    }

    //    function initDatePicker(size) {
    //        var disableDay = $('#disableDay').val();
    //        for (i = 0; i < parseInt(size); i++) {
    //            var min = $('#deliveryDatePicker_' + i).data('min').split(',');
    //        function initDatePicker    var max = $('#deliveryDatePicker_' + i).data('max').split(',');
    //            var days = [];
    //            if (disableDay == 1) {
    //                days = [1];
    //            } else if (disableDay == 2) {
    //                days = [7];
    //            } else if (disableDay == 3) {
    //                days = [1, 7];
    //            }
    //            $('#deliveryDatePicker_' + i).pickadate({
    //                min: new Date(min[0], min[1] - 1, min[2]),
    //                max: new Date(max[0], max[1] - 1, max[2]),
    //                formatSubmit: 'dd/mm/yyyy',
    //                hideName: true,
    //                closeText: 'Clear',
    //                closeOnSelect: true,
    //                disable: [new Date(2014, 5, 26)],
    //                disable: days
    ////            onSet: updateDeliveryTime(i)
    //            });
    //        }
    //    }

    //    function updateDeliveryTime(index) {
    //        alert(index);
    //        if ($('#deliveryDatePicker_'+index).val() === '') {
    //            return;
    //        }
    //        if ($('#deliveryDatePicker_'+index).select) {
    //            this.close();
    //        }
    //        var date = $('#deliveryDatePicker_'+index).val();
    //        alert(date);
    //        window.changeDate = date;
    //        $('#deliveryTimeWrapper_0').html("");
    //        $.ajax({
    //            cache: false,
    //            url: webApp.deliveryTimeUri,
    //            data: {
    //                date: date
    //            },
    //            type: 'post',
    //            success: function (response) {
    //                if (response.success === "true") {
    //
    //                    $('#deliveryTimeWrapper_0').html(response.html);
    //                    $('#deliveryTimeWrapper_1').html(response.html);
    //                    //deliveryTimeChange();
    //                    $('select').material_select();
    //                } else if (response.message === "session expired") {
    //                    showSessionExpired();
    //                } else {
    //                    alert(response.message);
    //                }
    //            },
    //            complete: function (response) {
    //
    //            },
    //            error: function (response) {
    //                alert("error");
    //            }
    //        });
    //    }

    function applyCoupon() {
        $('coupon-help').hide();
        var code = $('#proCouponCode').val().trim();
        if (code === "") {
            M.toast({ html: "Please enter a valid coupon" });
            return;
        }
        var partNumber = 0;
        var pNumber = $('#ckDynViewPart').val().trim();
        if (pNumber !== null && pNumber !== 'undefined') {
            partNumber = pNumber;
        }

        $.ajax({
            url: webApp.applyCouponUri,
            data: { couponCode: code },
            type: 'post',
            success: function (data) {
                if (data.success) {
                    //                    loadCheckoutView();
                    if (parseInt(partNumber) === 4) {
                        location.reload();
                    } else {
                        loadCouponStatus();
                        loadPriceView();
                    }
                } else if (data.message === "session expired") {
                    showSessionExpired();
                } else {
                    M.toast({ html: data.message });
                    $('.coupon-help').show();
                }
            }, error: function (data) {
            }, complete: function (data) {
            }
        });
    }
    function applyCouponPop() {
        $('coupon-help').hide();
        var code;
        if (document.querySelectorAll('input[type="radio"][name=Selectedcode]:checked').length !== 0) {
            var code = $('input[type=radio][name=Selectedcode]:checked').attr('value').trim();
        } else {
            code = $('#proCouponCodePop').val().trim();
        }
        var isLoggedIn = $('#isLoggedIn').val();
        if (isLoggedIn == '0') {
            return;
        }
        if (code === "") {
            //            $('.checkForModal').removeClass("modal-trigger");
            M.toast({ html: "Please enter a valid coupon" });
            return;
        }
        $.ajax({
            url: webApp.applyCouponUri,
            data: { couponCode: code },
            type: 'post',
            success: function (data) {
                if (data.success) {
                    //                    loadCheckoutView();
                    loadCouponStatus();
                    loadPriceView();
                } else if (data.message === "session expired") {
                    showSessionExpired();
                } else {
                    $("input[type=radio][name=Selectedcode]").prop('checked', false);
                    M.toast({ html: data.message });
                    $('.coupon-help').show();
                }
            }, error: function (data) {
            }, complete: function (data) {
            }
        });
    }

    function highlightNavigation(activePartNumber) {
        var navElements = $('.checkout-status-wrapper').find("span");
        var elem;
        navElements.each(function (idx) {
            var el = navElements.get(idx);
            $(el).removeClass("active");
        });
        if (parseInt(activePartNumber) === 2) {
            elem = $(navElements).get(1);//.addClass("active");
            $(".step").text("2/4");
            $("#cart").addClass("check");
            $("#header_cart,#header_address").addClass("active_url");
            zippyHeader();
        } else if (parseInt(activePartNumber) === 3) {
            elem = $(navElements).get(2);
            $(".step").text("3/4");
            $("#cart").addClass("check");
            $("#address").addClass("check");
            $(".personalize").addClass("active");
            $("#header_cart,#header_address,#header_personalize").addClass("active_url");
            zippyHeader();
        } else if (parseInt(activePartNumber) === 4) {
            elem = $(navElements).get(3);
            $(".step").text("4/4");
            $("#cart").addClass("check");
            $(".personalize").addClass("check");
            $("#address").addClass("check");
            $(".payment").addClass("active");
            $("#header_cart,#header_address,#header_personalize,#header_payment").addClass("active_url");
            zippyHeader();
        } else if (parseInt(activePartNumber) === 5) {
            elem = $(navElements).get(0);
            $(".step").text("1/4");
        }
        $(elem).addClass("active");
    }

    function scrollToTop() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    }

    function showSessionExpired() {
        $('#sessionExpiredOverlay').show();
        setTimeout(function () {
            location.href = webApp.addressPageUri;
        }, 4000);
    }

    window.addEventListener('popstate', function (event) {
        var urlParts = String(document.location).split("/");
        var lastPart = urlParts[urlParts.length - 1].toLowerCase();
        if (lastPart === "address") {
            loadAddressView();
        } else if (lastPart === "personalize") {
            loadPersonalizeView();
        }
        //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    });

    function showNewAddressForm() {
        var width = $(window).width();
        if (width < 994) {
            $(".addOrEditAddress").removeClass("hide");
            $(".go-to-payment,.nonav-Prd,.delivery-options").addClass("hide");
            $("#addNewAddressForm .title").text("Add  New Delivery Address");
        } else {
            $(".main").addClass("hide");
            $(".address_wrap").removeClass("hide");
            $(".addOrEditAddress").removeClass("hide");
            $(".go-to-payment,.delivery-options,.order_section").addClass("hide");
        }
        clearAllFields();
        var countryType = $('#newAddrCountryId option:selected').text();
        if (countryType == "India") {
            $('#newAddrPinCode').attr('type', 'number');
        } else {
            $('#newAddrPinCode').attr('type', 'text');
        }
        $('select#newAddrCountryId').on('change', function () {
            var countryType = $('#newAddrCountryId option:selected').text();
            if (countryType == "India") {
                $('#newAddrPinCode').attr('type', 'number');
            } else {
                $('#newAddrPinCode').attr('type', 'text');
            }
        });
    }
    function editAddressForm(e) {
        var index = e.target.id;
        var width = $(window).width();
        if (width < 994) {
            $(".addOrEditAddress").removeClass("hide");
            $(".go-to-payment,.nonav-Prd,.delivery-options").addClass("hide");
            $("#addNewAddressForm .title").text("Edit Delivery Address");
        } else {
            $(".main").addClass("hide");
            $(".addOrEditAddress").removeClass("hide");

            $(".go-to-payment,.order_section,.delivery-options,.nonav-Prd").addClass("hide");
            $("#addNewAddressForm .title").text("Edit Delivery Address");
        }
        var addressType = document.getElementById('addressType' + index).innerHTML;
        document.getElementById('newAddrName').value = document.getElementById('name' + index).innerHTML;
        document.getElementById('newAddrAddress').value = document.getElementById('address' + index).innerHTML;
        document.getElementById('newAddrLandmark').value = document.getElementById('landmark' + index).innerHTML;
        document.getElementById('newAddrPinCode').value = document.getElementById('postalCode' + index).innerHTML;
        document.getElementById('newAddrCity').value = document.getElementById('cityName' + index).innerHTML;
        document.getElementById('newModalAddrMobile').value = document.getElementById('phoneNumber' + index).innerHTML;
        document.getElementById('control-label').value = document.getElementById('alternatePhoneNumber' + index).innerHTML;
        document.getElementById('addressId').value = document.getElementById('addressId' + index).innerHTML;
        var myList = [];
        $('#newAddrCountryId option').each(function () {
            myList.push($(this).text());
        });
        const countryName = document.getElementById('state' + index).innerHTML;
        var match = myList.filter(function (item) {
            return (item === countryName) ? true : false;
        });
        var countryselect = match.toString();
        if (countryselect === countryName) {
            $("#newAddrCountryId option[selected]").removeAttr("selected");
            $("#newAddrCountryId  option:contains(" + countryselect + ")").attr('selected', true);
        } else {
            $("#newAddrCountryId option[selected]").removeAttr("selected");
            $('select#newAddrCountryId option[value="41"]').attr('selected', true);
        }
        var countryType = $('#newAddrCountryId option:selected').text();
        if (countryType == "India") {
            $('#newAddrPinCode').attr('type', 'number');
        } else {
            $('#newAddrPinCode').attr('type', 'text');
        }
        $('select#newAddrCountryId').on('change', function () {
            var countryType = $('#newAddrCountryId option:selected').text();
            if (countryType == "India") {
                $('#newAddrPinCode').attr('type', 'number');
            } else {
                $('#newAddrPinCode').attr('type', 'text');
            }
        });
        var addressTypeHomeField = document.getElementById('addressTypeHome');
        var addressTypeOfficeField = document.getElementById('addressTypeOffice');
        var addressTypeOtherField = document.getElementById('addressTypeOther');

        if (addressType === 'home') {
            addressTypeHomeField.checked = true;
        } else if (addressType === 'office') {
            addressTypeOfficeField.checked = true;
        } else {
            addressTypeOtherField.checked = true;
        }
    }

    function deleteAddress(e) {
        //        var result = confirm("Want to delete?");
        var url = $(this).data('uri');
        //            var add_id = $(".deleteAddress").data("id");
        var add_id = $(".delAddressId").val();
        //            e.preventDefault();
        $.ajax({
            cache: false,

            url: url,
            type: 'post',
            data: {
                add_id: add_id
            },
            dataType: "json",
            success: function (data) {
                if (data.success === "true") {
                    location.reload();
                }

            },
            complete: function (data) {

            },
            error: function (data) {
                alert("some error occured");
            }
        });
    }


    $(function () {
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        $(document).ajaxSend(function (e, xhr, options) {
            if (options.type == "POST") {
                xhr.setRequestHeader(header, token);
            }
        });
        $("#ckDynContentWrapper").on("click", ".add-new-address-action", showNewAddressForm);

        $("#ckDynContentWrapper").on("click", ".edit-address-action", editAddressForm);

        $("#ckDynContentWrapper").on("click", "#featuredOccasionValue", showOccasionQuotes);

        $("#ckDynContentWrapper").on("click", ".deleteAddress", deleteAddress);

        $("#ckDynContentWrapper").on("click", ".change-address", function () {
            $(".main").addClass("hide");
            $(".address_wrap").removeClass("hide");
            $(".delivery-options.summary").addClass("hide");
            //            $("#ckDynRightContentWrapper").addClass("hide");
            $(".addresses").removeClass("hide-on-med-and-down");
        });
        $("#ckDynContentWrapper").on("click", ".showAllAdress", function () {
            $(".address_items").toggleClass("showhideAdd");
        });
        $("#ckDynContentWrapper").on("click", ".close-address-form", function () {
            //           $(".delivery-options.summary").addClass("hide");
            //           if (width < 994) {
            //               $(".delivery-options.summary").removeClass("hide");
            //           }

            var savedCount = $("#savedAddressCount").val();
            if (!(savedCount > 0)) {

                location.href = webApp.newCartUri;
            } else {
                $(".addresses").removeClass("hide-on-med-and-down");
                $("#ckDynRightContentWrapper").removeClass("hide");
                $(".main").removeClass("hide");
                $(".addOrEditAddress,.shopTitle").addClass("hide");
                $(".addresses,.addressTitle").removeClass("hide");
                $(".go-to-payment").removeClass("hide");
                $(".section.order_section").removeClass("hide");
            }
            scrollToTop();
            clearAllFields();
        });

        $("#ckDynContentWrapper").on("click", ".payment-methods li", function (e) {
            var type = $(this).data("method-type");
            var html = "";

            switch (type) {
                case "card":
                    html = $("#card-container").html();
                    break;
                case "nb":
                    html = $("#nb-container").html();
                    break;
                case "upi":
                    html = $("#upi-container").html();
                    break;
                case "phonepe":
                    html = $("#phonepe-container").html();
                    break;
                case "mobikwik":
                    html = $("#mobikwik-container").html();
                    break;
                case "paytm":
                    html = $("#paytm-container").html();
                    break;
                case "googlepay":
                    html = $("#googlepay-container").html();
                    break;
                case "payumoney":
                    html = $("#payumoney-container").html();
                    break;
                case "paypal":
                    html = $("#paypal-container").html();
                    break;
                case "wallet":
                    html = $("#wallet-container").html();
                    break;
                case "winniwallet":
                    html = $("#winniwallet-container").html();
                    break;
                case "cod":
                    html = $("#cod-container").html();
                    break;
            }

            //            $(".m-payment-wrapper .collection").hide();
            $(".m-payment-wrapper .payment-detail").html(html);
            $('input#cardNumber').payment('formatCardNumber');
            $('input#cardExpiry').payment('formatCardExpiry');
            $('input#cardCVV').payment('formatCardCVC');
            $('[data-numeric]').payment('restrictNumeric');
            $(".m-payment-wrapper .payment-detail").show();
            $("#changePayMethod").show();
            $("h5.title").hide();
            //            $('.modal-trigger').leanModal();
            scrollToTop();
        });

        $("#ckDynContentWrapper").on("click", "#changePayMethod", function () {
            $("#changePayMethod").hide();
            $(".m-payment-wrapper .payment-detail").hide();
            $(".m-payment-wrapper .collection").show();
            $("h5.title").show();
            $(".m-payment-wrapper .payment-detail").html("");
        });

    });
}));

/*loadLoginView().done(function (data) {
 // Updates the UI based the ajax result
 $("#ckDynContentWrapper").html(data.html);
 });*/

/*var list = $("#longlist");
 
 list.on("mouseenter", "li", function () {
 
 $(this).text("Click me!");
 
 });
 
 list.on("click", "li", function () {
 
 $(this).text("Why did you click me?!");
 
 });*/



////
/*function getName(personid) {
 var dynamicData = {};
 dynamicData["id"] = personID;
 return $.ajax({
 url: "getName.php",
 type: "get",
 data: dynamicData
 });
 }
 
 getName("2342342").done(function (data) {
 // Updates the UI based the ajax result
 $(".person-name").text(data.name);
 })*/
function clearAllFields() {
    document.getElementById('newAddrName').value = "";
    document.getElementById('newAddrAddress').value = "";
    document.getElementById('newAddrLandmark').value = "";
    document.getElementById('newAddrPinCode').value = "";
    document.getElementById('newAddrCity').value = "";
    document.getElementById('newModalAddrMobile').value = "";
    document.getElementById('control-label').value = "";
    document.getElementById('addressId').value = "";

    //    $(".addresses").addClass("hide-on-med-and-down");
}
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
/*
 var s_ajaxListener = new Object();
 s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
 s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
 s_ajaxListener.callback = function () {
 alert("came here buddy");
 // this.method :the ajax method used
 // this.url    :the url of the requested script (including query string, if any) (urlencoded) 
 // this.data   :the data sent, if any ex: foo=bar&a=b (urlencoded)
 }
 
 XMLHttpRequest.prototype.open = function (a, b) {
 if (!a)
 var a = '';
 if (!b)
 var b = '';
 s_ajaxListener.tempOpen.apply(this, arguments);
 s_ajaxListener.method = a;
 s_ajaxListener.url = b;
 if (a.toLowerCase() == 'get') {
 s_ajaxListener.data = b.split('?');
 s_ajaxListener.data = s_ajaxListener.data[1];
 }
 alert("first here");
 }
 
 XMLHttpRequest.prototype.send = function (a, b) {
 if (!a)
 var a = '';
 if (!b)
 var b = '';
 s_ajaxListener.tempSend.apply(this, arguments);
 if (s_ajaxListener.method.toLowerCase() == 'post')
 s_ajaxListener.data = a;
 s_ajaxListener.callback();
 }*/
function nonWorkingDates(date) {
    var day = date.getDay(), Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6;
    var closedDates = [[7, 29, 2009], [8, 25, 2010]];
    var closedDays = [[Monday], [Tuesday]];
    for (var i = 0; i < closedDays.length; i++) {
        if (day == closedDays[i][0]) {
            return [false];
        }

    }
    for (i = 0; i < closedDates.length; i++) {
        if (date.getMonth() == closedDates[i][0] - 1 &&
            date.getDate() == closedDates[i][1] &&
            date.getFullYear() == closedDates[i][2]) {
            return [false];
        }
    }

    return [true];
}

function radioBtnOfCurrency() {
    var id = $(this).attr('value');
    if ($("input[name='currency']:checked")) {
        $('.paypalCurr').removeClass('changeBackground');
        $(this).parent().addClass('changeBackground');
        $(this).find('input[id=' + id + ']').prop('checked', true);
        $('#paypalCurrency').val(id);
    }
}

function showAll() {
    $('.hide-part').show();
    $('.alert-success').hide();
    $('.alert-danger').hide();
    $('#forgotPwdModal').modal();
    $('#forgotPwdModal').modal("open");
}

$('.dropdown-trigger').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    //            gutter: 0, // Spacing from edge
    coverTrigger: false, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
});

function backToPrevious(i, device) {
    var buttonIndex = $(".backButtonIndex").attr("value");
    if (buttonIndex === '1') {
        $('.collection').remove();
        $('.no-delivery').remove();
        $(".picker__holder").show();
        var min = $('#deliveryDatePicker_' + i).data('min').split(',');
        var max = $('#deliveryDatePicker_' + i).data('max').split(',');
        var input = $('#deliveryDatePicker_' + i).datepicker({
            minDate: new Date(min[0], min[1] - 1, min[2]),
            maxDate: new Date(max[0], max[1] - 1, max[2]),
            format: 'dd mmm, yyyy',
            hideName: true,
            closeText: 'Clear',
            closeOnSelect: true,
            autoClose: true,
        });
        var picker = M.Datepicker.getInstance(input);
        picker.open();
        $(".backButtonIndex").attr("value", '0');
        if (device === "desktop") {
            $(".back-button-picker-modal").hide();
        }
        $("#picker-modal .picker-modal-header-text").html("Select Delivery Date");
    } else if (buttonIndex === '0') {
        $('.no-delivery').remove();
        var input = $('#deliveryDatePicker_' + i).datepicker({ autoClose: true });
        var picker = M.Datepicker.getInstance(input);
        picker.destroy();
        $(".picker-modal").modal('close');
        $('body').css({
            overflow: 'visible'
        });
    }
}


function stopCarret(e, nextId, previousId) {
    //    var parent = $($(this).parent());
    if (e.keyCode === 8 || e.keyCode === 37) {
        if (previousId !== "") {
            var prev = "#" + previousId;
            if (prev.length) {
                $(prev).select();
            }
        }

        //    } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
    } else {
        if (nextId !== "") {
            var next = "#" + nextId;
            if (next.length) {
                $(next).select();
            }
        }
    }
    if ($("#digit-1").val() !== "" && $("#digit-2").val() !== "" && $("#digit-3").val() !== "" && $("#digit-4").val() !== "") {
        $("#validateOtpbtn").attr("disabled", false);
    } else if ($("#digit-1").val() !== "" || $("#digit-2").val() !== "" || $("#digit-3").val() !== "" || $("#digit-4").val() !== "") {
        $("#validateOtpbtn").attr("disabled", true);
    }
}


function emptyOtpFields() {
    $("#digit-1").val("");
    $("#digit-2").val("");
    $("#digit-3").val("");
    $("#digit-4").val("");
}

var countdown;
function timer(remaining) {
    clearInterval(countdown);
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    //  document.getElementById('timer').innerHTML = m + ':' + s;
    document.getElementById('timer').innerHTML = "<div class='time-in-seconds' style='text-align: center'>OTP expires in: " + m + ':' + s + "</div>";
    remaining -= 1;

    if (remaining >= 0) {
        countdown = setInterval(function () {
            timer(remaining);
        }, 1000);
        return;
    } else {
        $("#timer").hide();
        $("#otpExpire").show();
    }
    //    alert('Timeout for otp');
    if ($(".generateOtpDesk").length) {
        $(".generateOtpDesk").removeClass("resend-button-link");
        $(".generateOtpDesk").addClass("show-resend-link");
    } else if ($(".generateOtpMob").length) {
        $(".generateOtpMob").removeClass("resend-button-link");
        $(".generateOtpMob").addClass("show-resend-link");
    }
}

function resendButtonClick() {
    $('.time-in-seconds').remove();
    //    $("#timer").hide();
    $("#otpExpire").hide();
    clearInterval(countdown);
    timer(180);
}

function showOccasionQuotes() {
    var ocassionId = $('#occasion').val();
    var Id = parseInt(ocassionId);
    var content = [];
    var headerContent = "";
    var uri = webApp.occasionQuotesUri.replace("{occasionId}", Id);
    $.ajax({
        cache: false,
        url: uri,
        type: 'get',
        success: function (response) {
            if (response.quotes.length !== 0) {
                $("#viewOccasionQuotes").show();
            } else {
                $("#viewOccasionQuotes").hide();
            }
            var quotes = response.quotes;
            headerContent = response.occasion.name;
            var quotesLength = response.quotes.length;
            var str = "";
            for (var i = 0; i < quotesLength; i++) {
                content[i] = quotes[i];
                str += "<div class='quote' id ='quoteItem" + i + "' onclick='clickedOnQuote(" + i + ")'>" + quotes[i] + "</div>";
            }
            $('#text').html(str);

            $('#modal-quotes-personalise .modal-header').html(headerContent + " Quotes");

            if (response.success === "true") {
                location.reload();
            }
        },
        complete: function (response) {

        },
        error: function (response) {
            alert("some error occured");
        }
    });
}

function clickedOnQuote(i) {
    var recipientName = localStorage.getItem("recipiemtName");
    recipientName = recipientName.substring(0, 1).toUpperCase() + recipientName.substring(1);
    $(this).val(recipientName);
    $("label[for=personalMessage]").addClass('active');
    var nameStr = "Dear " + recipientName + ", " + "\n\n";
    document.getElementById("personalMessage").value = nameStr + document.getElementById("quoteItem" + i).innerHTML;
    $("#modal-quotes-personalise").modal();
    $("#modal-quotes-personalise").modal('close');
    $('body').css({
        overflow: 'visible'
    });
}

function showCheckoutAddonProducts() {
    var pincode = "560037";
    var jqxhr = $.ajax({
        url: webAppAdd.checkoutAdonsProductsUri,
        type: "POST",
        cache: false,
        dataType: "json",
        statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
            $("#dynAdonsProduct").html(data.html);
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        } else if (data.message === "session expired") {
            showSessionExpired();
        } else {
            alert(data.message);
        }
    });
    jqxhr.fail(function (data) {

    });
    jqxhr.always(function (data) {
        //   $('#fullPageLoader').addClass('hide');
    });
}
function addAdonFromCheckout(pocId) {
    $.ajax({
        type: 'POST',
        url: webAppAdd.addProductFromCheckoutUrl,
        data: { pocId: pocId.toString() },
        success: function (response) {
            if (response.success) {
                location.reload();
            }
        }, error: function () {
        }
    });
}
function startProductTimeLeftCountdownChk() {
    var counter = 0;
    var timeInSeconds = $('#chkDeliveryTimeLeft').val();
    $('#chkCountdownTimer').text(convertSeconds(timeInSeconds - counter));
    setInterval(function () {
        counter++;
        if (counter <= timeInSeconds) {
            $('#chkCountdownTimer').text(convertSeconds(timeInSeconds - counter));
        } else {
            $('#chkCountdownTimer').text("Earliest can be delivered tomorrow");
        }
    }, 1000);
}
//Mailcheck Jquery
function mailcheckjs() {
    var email = $("#loginEmail");
    var email1 = $("#forgotEmail");
    var hint = $("#emailhint");
    var hint1 = $("#emailhint1");
    var typingTimer;
    var doneTypingInterval = 200;

    $("#loginEmail").keyup(function () {
        hint.css("display", "none").empty();
        clearTimeout(typingTimer);
        $(this).mailcheck({
            suggested: function (element, suggestion) {
                if (!hint.html()) {
                    // First error - fill in/show entire hint element
                    var suggestion =
                        "<span class='suggestion'>Did you mean: </span>" +
                        "<span class='address'><a href='#' class='domain'>" +
                        suggestion.address +
                        "@" +
                        suggestion.domain +
                        "</a></span>" +
                        "?";
                    typingTimer = setTimeout(function () {
                        hint.html(suggestion).fadeIn(150);
                    }, doneTypingInterval);
                } else {
                    $(".domain").html(suggestion.domain);
                }
            }
        });
    });
    hint.on("click", ".domain", function () {
        email.val($(".domain").text());
        hint.fadeOut(200, function () {
            $(this).empty();
        });
        return false;
    });
    $("#forgotEmail").keyup(function () {
        hint1.css("display", "none").empty();
        clearTimeout(typingTimer);
        $(this).mailcheck({
            suggested: function (element, suggestion) {
                if (!hint1.html()) {
                    // First error - fill in/show entire hint element
                    var suggestion =
                        "<span class='suggestion'>Did you mean: </span>" +
                        "<span class='address'><a href='#' class='domain'>" +
                        suggestion.address +
                        "@" +
                        suggestion.domain +
                        "</a></span>" +
                        "?";
                    typingTimer = setTimeout(function () {
                        hint1.html(suggestion).fadeIn(150);
                    }, doneTypingInterval);
                } else {
                    $(".domain").html(suggestion.domain);
                }
            }
        });
    });
    hint1.on("click", ".domain", function () {
        email1.val($(".domain").text());
        hint1.fadeOut(200, function () {
            $(this).empty();
        });
        return false;
    });

}
function payLater() {
    if ($("#paylater_container").length > 0 || $(".paylater-container").length > 0) {
        var sezzle_amount = $(".sezzle_amount_value").text();
        var sezzle_amounts = parseInt(sezzle_amount.replace(/[,]/g, ''));
        var divideAmount = sezzle_amounts / 4;
        divideAmount = divideAmount.toFixed(2);
        $('#paylater_container select,.paylater-container select').change(function () {
            $('.paymentText .offterText').removeClass('visible');
            $('#' + $(this).val()).addClass('visible');
            var sezzleSelction = $("#paylater_container select option:selected,.paylater-container select option:selected").val();
            if (sezzleSelction == "sezzle") {
                $(".sezzle_amount_value").html(divideAmount);
            } else {
                $(".sezzle_amount_value").html(sezzle_amount);
            }
        });
        $('#paylater_container .wallet-logo-holder,.paylater-container .wallet-logo-holder').click(function () {
            var imgAtt = $(this).attr("data-wallet");
            $('.paymentText .offterText').removeClass('visible');
            $('#' + imgAtt).addClass('visible');
            if (imgAtt == "sezzle") {
                $(".sezzle_amount_value").html(divideAmount);
            } else {
                $(".sezzle_amount_value").html(sezzle_amount);
            }
        });
    }
}

function resndVerifyOtp() {
    $('#OtpcountdownTimer').addClass('pointerNone');
    var tempUuid = $("#tempUuid").val();
    var attmptUuid = $("#attmptUuid").val();
    $(".loginOtp").val("");
    $(".verify-otp-field .otp-container, #otpMobileMsg").removeClass('hide');
    $(".verify-email-otp-field,#otpEmailMsg").addClass('hide');
    //    $('#OtpcountdownTimer').addClass('pointerNone');
    var jqxhr = $.ajax({
        url: webApp.rsendOtpUri,
        type: "POST",
        cache: false,
        data: {
            tempUuid: tempUuid,
            attmptUuid: attmptUuid
        },
        dataType: "json",
        /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
        statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
            var timeInSeconds = data.leftTime;
            var timerId = setInterval(countdown, 1000);
            function countdown() {
                if (timeInSeconds === -1) {
                    clearTimeout(timerId);
                    $('#OtpcountdownTimer').css({ "font-size": "14px", "border": "1px solid #FF236E", "padding": "3px 10px 3px", "border-radius": "12px", "color": "#FF236E" });
                    $('#OtpcountdownTimer').text('Resend OTP on Mobile');
                    $('#OtpcountdownTimer').removeClass('pointerNone');
                    var tcnt = data.tcnt;
                    var intrlUr = data.intrlUr;
                    var varMbl = $("#isLoginWithOtp").val();
                    if (tcnt >= 3 && intrlUr === true && varMbl !== "true") {
                        $('#OtpcountdownTimer2').removeClass('pointerNone');
                        $("#OtpcountdownTimer2").removeClass('hide');
                    }
                } else {
                    $('#OtpcountdownTimer').css({ "background-color": "transparent", "color": "#EA4335", "border-radius": "unset", "font-size": "14px", "border": "none" });
                    $('#OtpcountdownTimer').text('Resend OTP on Mobile in ' + timeInSeconds + ' Sec');
                    $('#OtpcountdownTimer').addClass('pointerNone');
                    timeInSeconds--;
                }
            }
            M.toast({ html: data.message });
        } else {
            M.toast({ html: data.message });
            $('#OtpcountdownTimer').removeClass('pointerNone');
        }

    });
    jqxhr.fail(function (data) {

    });
}



function loginWithOtp(e) {
    e.preventDefault();
    $('.loginOtp').val('');
    var mobile = $("#loginMobile").val();
    var countryCode = $('#loginCountryCode').val();
    $(".fl-remove button").addClass("disabled btn_loader");
    var jqxhr = $.ajax({
        url: webApp.otpLoginUri,
        type: "POST",
        cache: false,
        data: {
            mobile: mobile,
            countryCode: countryCode
        },
        success: function () {
            $(".fl-remove button").removeClass("disabled btn_loader");
        },
        complete: function () {
            $(".fl-remove button").removeClass("disabled btn_loader");
        },
        dataType: "json",
        /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
        statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
            var seconds = data.leftTime;
            startTimer(seconds);
            $('form').find("#isLoginWithOtp").val("true");
            $('.ck-login-otp-wrapper').removeClass('hide');
            $(".signup-field").addClass('hide');
            $(".login-title").text("Verify OTP");
            $("#isRegistered").val("true");
            $("#isVerifiedOtp").val("false");
            $("#attmptUuid").val(data.attemptUuid);
            $("#tempUuid").val(data.userUid);
            $(".verify-otp-field").removeClass('hide');
            $("#changeEmailLink").addClass('hide');
            $("#loginEmail").addClass('hide');
            $("#otpMobileMsg").removeClass('hide');
            $("#login-link-container").removeClass('hide');
            $("#otpMobileMask").text(data.mobile);
            $("#emailhint").addClass('hide');
            $("#isSocialCheck").val("false");
            $("#verifyLoginWithOtp").removeClass('hide');
            $("#loginWithOtp").addClass('hide');
            $(".waves-light,.existingUser").addClass('hide');
            $("#loginTab").addClass("hide");
            $("#otpMobileMsg").css('display', 'block');
            $('#otc-1').focus();
            M.toast({ html: 'Mobile OTP has been sent' });
        } else {
            M.toast({ html: data.message });
        }
    });
    jqxhr.fail(function (data) {

    });
}

function verifyLoginWithOtp(e) {
    e.preventDefault();
    var userUid = $("#tempUuid").val();
    var attmptUuid = $("#attmptUuid").val();
    var otpElment = document.getElementsByClassName("loginOtp");
    $("#verifyLoginWithOtp").addClass("disabled btn_loader");
    var otp = '';
    for (var i = 0; i < otpElment.length; i++) {
        otp += otpElment[i].value;
    }
    var jqxhr = $.ajax({
        url: webApp.verifyOtpLoginUri,
        type: "POST",
        cache: false,
        data: {
            otp: otp,
            userUid: userUid,
            attmptUuid: attmptUuid
        },
        dataType: "json",
        /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
        statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
            if (data.redirectUrl != null && data.redirectUrl != '') {
                window.location.href = data.redirectUrl;
            } else {
                window.location.reload();
            }
        } else {
            if (data.resetPassword === "true") {
                $("#wrongAttemptPassword").show();
            } else {
                $("#wrongAttemptPassword").hide();
            }
            M.toast({ html: data.message });
            $("#verifyLoginWithOtp").removeClass("disabled btn_loader");
        }
        checkScore();
    });
    jqxhr.fail(function (data) {
        $("#verifyLoginWithOtp").removeClass("disabled btn_loader");
    });
}
function forgotResndOtp() {
    $('#forgotResndOtp').addClass('pointerNone');
    var requestUuid = $("#requestUuid").val();
    var identifierType = $("#identifierType").val();
    var email = $("#forgotEmail").val();
    var mobile = $("#forgotMobile").val();
    var countryCode = $('#forgotCountryCode option:selected').text();
    $(".forgotLoginOtp").val("");
    //    $('.forgotResndOtp').addClass('pointerNone');
    $(".fl-remove button").addClass("disabled btn_loader");
    $('#forgotPwdModal .alert-success').addClass('hidden');
    $('#forgotPwdModal .alert-danger').addClass('hidden');
    var jqxhr = $.ajax({
        url: webApp.rsendForgotOtpUri,
        type: "POST",
        cache: false,
        data: {
            email: email,
            mobile: mobile,
            countryCode: countryCode,
            requestUuid: requestUuid,
            identifierType: identifierType
        },
        dataType: "json",
        /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
        statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
            var timeInSeconds = data.leftTime;
            var timerId = setInterval(countdown, 1000);
            function countdown() {
                if (timeInSeconds === -1) {
                    clearTimeout(timerId);
                    $('.forgotResndOtp').css({ "font-size": "11px", "background-color": "lightgray", "padding": "3px 10px 3px", "border-radius": "12px", "color": "#333333" });
                    $('.forgotResndOtp').text('Resend OTP');
                    $('.forgotResndOtp').removeClass('pointerNone');
                } else {
                    $('.forgotResndOtp').css({ "background-color": "transparent", "color": "#EA4335", "border-radius": "unset", });
                    $('.forgotResndOtp').text('Resend OTP in ' + timeInSeconds + ' Sec');
                    $('.forgotResndOtp').addClass('pointerNone');
                    timeInSeconds--;
                }
            }
            $('#forgotPwdModal .alert-success').removeClass('hide');
            $('#forgotPwdModal .alert-danger').addClass('hide');
            $('#forgotPwdModal .alert-success').text(data.message);
            $('.alert-success').show();
        } else {
            if (data.message !== '') {
                $('#forgotPwdModal .alert-danger').text(data.message);
            } else {
                $('#forgotPwdModal .alert-danger').text("Invalid Request");
            }
            $('#forgotPwdModal .alert-danger').removeClass('hide');
            $('#forgotPwdModal .alert-success').addClass('hide');
            $('.alert-danger').show();
        }

    });
    jqxhr.fail(function (data) {

    });
}
//Automatically Move Cursor to Next Field When Textbox Full
function movetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}
//login sign up tabs
$(document).ready(function () {
    if ($("#loginTab").length > 0) {
        $('#loginTab').tabs();
        $('#loginTab .numberTab').click(function () {
            document.getElementById("loginEmail").value = "";
        });
        $('#loginTab .emailTab').click(function () {
            document.getElementById("loginMobile").value = "";
        });
    }
    if ($("#loginTabf").length > 0) {
        $('#loginTabf').tabs();
        $('#loginTabf .numberTab').click(function () {
            document.getElementById("forgotEmail").value = "";
        });
        $('#loginTabf .emailTab').click(function () {
            document.getElementById("forgotMobile").value = "";
        });
    }
});
function checkScore() {
    if ($("#loginTab").length > 0) {
        $('#loginTab').tabs();
        $('#loginTab .numberTab').click(function () {
            document.getElementById("loginEmail").value = "";
        });
        $('#loginTab  .emailTab').click(function () {
            document.getElementById("loginMobile").value = "";
        });
    }
    if ($("#loginTabf").length > 0) {
        $('#loginTabf').tabs();
        $('#loginTabf .numberTab').click(function () {
            document.getElementById("forgotEmail").value = "";
        });
        $('#loginTabf .emailTab').click(function () {
            document.getElementById("forgotMobile").value = "";
        });
    }
    $(".loginOtp").on('keyup', function () {
        if (this.value.length > this.maxLength)
            this.value = this.value.slice(0, this.maxLength);
    });

    $('#loginMobile,#forgotMobile').on('input', function (e) {
        $(this).val($(this).val().replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'));
    });
    //Email OTP Paste
    const $inp = $(".eforgotLoginOtp");
    $inp.on({
        paste(ev) { // Handle Pasting

            const clip = ev.originalEvent.clipboardData.getData('text').trim();
            if (!/\d{6}/.test(clip))
                return ev.preventDefault();
            const s = [...clip];
            $inp.val(i => s[i]).eq(5).focus();
        },
        input(ev) {

            const i = $inp.index(this);
            if (this.value)
                $inp.eq(i + 1).focus();
        },
        keydown(ev) {
            const i = $inp.index(this);
            if (!this.value && ev.key === "Backspace" && i)
                $inp.eq(i - 1).focus();
        }
    });

    //Mobile OTP
    let in1 = document.getElementById('otc-1'),
        in2 = document.getElementById('fotc-1'),
        ins = document.querySelectorAll('input[type="number"]');
    ins.forEach(function (input) {
        input.addEventListener('keyup', function (e) {
            if (e.keyCode === 16 || e.keyCode == 9 || e.keyCode == 224 || e.keyCode == 18 || e.keyCode == 17) {
                return;
            }
            if ((e.keyCode === 8 || e.keyCode === 37) && this.previousElementSibling && this.previousElementSibling.tagName === "INPUT") {
                this.previousElementSibling.select();
            } else if (e.keyCode !== 8 && this.nextElementSibling) {
                this.nextElementSibling.select();
            }
        });
        input.addEventListener('focus', function (e) {
            if (this === in1)
                return;
            if (this === in2)
                return;
            if (in1.value == '') {
                in1.focus();
            }
            if (in2.value == '') {
                in2.focus();
            }
            if (this.previousElementSibling.value == '') {
                this.previousElementSibling.focus();
            }
        });
    });
    in1.addEventListener('input', function (e) {
        let data = e.data || this.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
        if (!data)
            return; // Shouldn't happen, just in case.
        if (data.length === 1)
            return; // Here is a normal behavior, not a paste action.
        var ins = document.querySelectorAll('input[class="loginOtp"]');
        for (i = 0; i < data.length; i++) {
            ins[i].value = data[i];
        }
    });
    in2.addEventListener('input', function (e) {
        let data = e.data || this.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
        if (!data)
            return; // Shouldn't happen, just in case.
        if (data.length === 1)
            return; // Here is a normal behavior, not a paste action.
        var ins2 = document.querySelectorAll('input[class="forgotLoginOtp"]');
        for (i = 0; i < data.length; i++) {
            ins2[i].value = data[i];
        }
    });

    if ($(window).width() < 767 && $(".login-container").length > 0) {
        if ('OTPCredential' in window) {
            const input = document.querySelector('input[autocomplete="one-time-code"]');
            if (!input)
                return;
            const signal = new AbortController();
            setTimeout(() => {
                signal.abort();
            }, 1 * 40 * 1000);
            const ac = new AbortController();
            navigator.credentials.get({
                otp: { transport: ['sms'] },
                signal: ac.signal
            }).then(otp => {
                var pasteData = otp.code;
                var arrayOfText = pasteData.toString().split('');
                for (var i = 0; i < arrayOfText.length; i++) {
                    if (i >= 0) {
                        if (document.getElementById("loginEmail").value.length !== 0 || document.getElementById("loginMobile").value.length !== 0) {
                            document.getElementById('otc-' + (i + 1)).value = arrayOfText[i];
                        }
                        document.getElementById('fotc-' + (i + 1)).value = arrayOfText[i];
                    } else {
                        alert("Invalid OTP");
                        $(".fl-remove button,#verifyLoginWithOtp").removeClass('disabled btn_loader');
                        $(".otp-content-box input,.otp-container input").val("");
                    }
                }
                if (document.getElementById("loginEmail").value.length !== 0 || document.getElementById("loginMobile").value.length !== 0) {
                    if ($("button").is(".submitBtn.hide")) {
                        $("#verifyLoginWithOtp").trigger('click');
                        $("#verifyLoginWithOtp").addClass('disabled btn_loader');
                    }
                    if ($("#verifyLoginWithOtp").is(".hide")) {
                        $("#ckLoginForm").submit();
                        $(".fl-remove button").addClass('disabled btn_loader');
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}

function resndEmailOtp() {
    $('#OtpcountdownTimer2').addClass('pointerNone');
    var tempUuid = $("#tempUuid").val();
    var attmptUuid = $("#attmptUuid").val();
    $(".loginOtp").val("");
    $(".verify-otp-field .otp-container, #otpMobileMsg").addClass('hide');
    $(".verify-email-otp-field,#otpEmailMsg").removeClass('hide');
    var jqxhr = $.ajax({
        url: webApp.rsendEmailOtpUri,
        type: "POST",
        cache: false,
        data: {
            tempUuid: tempUuid,
            attmptUuid: attmptUuid
        },
        dataType: "json",
        /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
        statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
            var timeInSeconds = data.leftTime;
            var timerId = setInterval(countdown, 1000);
            function countdown() {
                if (timeInSeconds === -1) {
                    clearTimeout(timerId);
                    $('#OtpcountdownTimer2').css({ "font-size": "14px", "border": "1px solid #FF236E", "padding": "3px 10px 3px", "border-radius": "12px", "color": "#FF236E" });
                    $('#OtpcountdownTimer2').text('Resend OTP');
                    $('#OtpcountdownTimer2').removeClass('pointerNone');
                } else {
                    $('#OtpcountdownTimer2').css({ "background-color": "transparent", "color": "#EA4335", "border-radius": "unset", "font-size": "14px", "border": "none" });
                    $('#OtpcountdownTimer2').text('Resend OTP on Email in ' + timeInSeconds + ' Sec');
                    $('#OtpcountdownTimer2').addClass('pointerNone');
                    timeInSeconds--;
                }
            }
            M.toast({ html: data.message });
        } else {
            M.toast({ html: data.message });
            $('#OtpcountdownTimer2').removeClass('pointerNone');
        }

    });
    jqxhr.fail(function (data) {

    });
}
function showCartAddonProducts() {
    var jqxhr = $.ajax({
        url: webAppAdd.cartAddonsProductsUri,
        type: "GET",
        cache: false,
        dataType: "json"
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
            $(".cartAddons").html(data.html);
            $(".cartAddons").removeClass("hide");
            $(".cartAddons").css("display", "block");
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
            loadCartAddonsSlider();
        } else {
            $(".cartAddons").addClass("hide");
        }
    });
}
function loadCartAddonsSlider() {
    $('.carousel-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        swipe: false
    });
}
var interval;
function startTimer(duration) {
    let timers = duration;
    interval = setInterval(function () {
        if (timers !== 0) {
            $('#OtpcountdownTimer').css({ "background-color": "transparent", "color": "#EA4335", "border-radius": "unset" });
            $('#OtpcountdownTimer').text('Resend OTP on Mobile in ' + --timers + ' Sec');
            $('#OtpcountdownTimer').addClass('pointerNone');
        } else if (timers === 0) {
            $('#OtpcountdownTimer').css({ "font-size": "11px", "background-color": "lightgray", "padding": "3px 10px 3px", "border-radius": "12px", "color": "#333333" });
            $('#OtpcountdownTimer').text('Resend OTP on Mobile');
            $('#OtpcountdownTimer').removeClass('pointerNone');
            clearInterval(interval);
        }
    }, 1000);
}
