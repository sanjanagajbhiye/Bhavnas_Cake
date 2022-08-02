function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


// IIFE - Immediately Invoked Function Expression
(function(yourcode) {

    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);
}(function($, window, document) {
    $('.tabs').tabs();
    // code for landscape view
    function doOnOrientationChange() {
        switch (window.orientation) {
            case -90:
            case 90:
                $("body").addClass('landscape');
                break;
            default:
                $('body').removeClass('landscape');
                break;
        }
    }
    setTimeout(function() {
        if ($(".desk_banners").length > 0) {
            $(".desktopBanner_initial").hide();
            $(".desk_banners").show();
            $('.desk_banners').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dots: true,
                lazyLoad: true,
                autoplay: true,
                autoplaySpeed: 3000,
                swipe: true
            });
        }
        if ($(".mbl_banner").length > 0) {
            $(".initial_banner").hide();
            $(".mbl_banner").show();
            $('.mbl_banner').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                autoplay: true,
                lazyLoad: 'ondemand',
                autoplaySpeed: 3000
            });
        }
    }, 2000);
    window.addEventListener('orientationchange', doOnOrientationChange);
    // Initial execution if needed
    doOnOrientationChange(); // The $ is now locally scoped 

    //Add for gift finder
    var relationlist = $('.choose_relation');
    var arr = $('#relationId option').map(function() {
        return {
            text: $(this).text(),
            value: $(this).val()
        };
    });
    $.each(arr, function(i) {
        $('<li>', {
            text: arr[i].text
        }).data('val', arr[i].value).appendTo(relationlist);
    });

    $('.choose_relation li').click(function() {
        $('#relationId').val($(this).data('val'));
    });
    //choose occassion
    $(".select_occasn").click(function() {
        $('.choose_occassion li').remove();
        var occassionList = $('.choose_occassion');
        var arr = $('#occasionId option').map(function() {
            return {
                text: $(this).text(),
                value: $(this).val()
            };
        });
        $.each(arr, function(i) {
            $('<li>', {
                text: arr[i].text
            }).data('val', arr[i].value).appendTo(occassionList);
        });
        $('.choose_occassion li').click(function() {
            $('#select_occasn').modal('close');
            $('#occasionId').val($(this).data('val'));
            var occasionTxt = $("#occasionId option:selected").text();
            $(".select_occasn span").text(occasionTxt).addClass('selected');
        });
    });
    var occasionTxt = $("#occasionId option:selected").text();
    $(".select_occasn span").text(occasionTxt).addClass('selected');
    var relationTxt = $("#relationId option:selected").text();
    $(".select_relation span").text(relationTxt).addClass('selected');
    $(".choose_relation li").click(function() {
        $('#select_relation').modal('close');
        var relationTxt = $("#relationId option:selected").text();
        $(".select_relation span").text(relationTxt).addClass('selected');
    });
    var occName = $('#occasionId :selected').text();
    if (occName == "Birthday, Anniversary, Diwali etc") {
        $(".select_occasn span").removeClass('selected');
    }
    var relName = $('#relationId :selected').text();
    if (relName == "Father, Mother, Sister etc") {
        $(".select_relation span").removeClass('selected');
    }
    $(function() {
        if ($("main").find("gfscroll") && $(".gfscroll").length > 0 && $(".gift_finter_catg").length > 0) {
            $('html, body').stop().animate({
                'scrollTop': $('.gfscroll').offset().top - 50
            }, 900);
        }
    });

    // Listen for the jQuery ready event on the document
    $(function() {
        adVtrInt();
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        $(document).ajaxSend(function(e, xhr, options) {
            if (options.type == "POST") {
                xhr.setRequestHeader(header, token);
            }
        });
        $(document).ajaxComplete(function(event, xhr, settings) {
            if (xhr.status == 401 || xhr.status == 403) {
                window.location.reload();
            }
        });
        // The DOM is ready!
        if ($("#clockdiv").length > 0) {
            initializeClock('clockdiv', deadline);
        }
        //$('select').material_select();
        if ($("#homeCarousel").length > 0) {
            $("#homeCarousel").carousel({
                fullWidth: true,
                indicators: false,
                duration: 200
            });
            // move next carousel
            $('.moveNextCarousel').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('#homeCarousel').carousel('next');
            });
            // move prev carousel
            $('.movePrevCarousel').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('#homeCarousel').carousel('prev');
            });
            setInterval(function() {
                $('.carousel').carousel('next');
            }, 4500); // every 2 seconds
        }


        //   Franchise Crousel
        if ($("#franchiseCarousel").length > 0) {
            $("#franchiseCarousel").carousel({
                fullWidth: true,
                indicators: false,
                duration: 200

            });
            // move next carousel
            $('.moveNextCarousel').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('#franchiseCarousel').carousel('next');
            });
            // move prev carousel
            $('.movePrevCarousel').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('#franchiseCarousel').carousel('prev');
            });
            setInterval(function() {
                $('.carousel').carousel('next');
            }, 4500); // every 2 seconds
        }
        //   Franchise Crousel mobile
        if ($("#franchiseMobileCarousel").length > 0) {
            $("#franchiseMobileCarousel").carousel({
                fullWidth: true,
                indicators: false,
                duration: 200

            });
            // move next carousel
            $('.moveNextCarousel').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('#franchiseMobileCarousel').carousel('next');
            });
            // move prev carousel
            $('.movePrevCarousel').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('#franchiseMobileCarousel').carousel('prev');
            });
            setInterval(function() {
                $('.carousel').carousel('next');
            }, 4500); // every 2 seconds
        }



        if ($("#mLoginOverlay").length > 0) {
            setTimeout(function() {
                triggerLoginOverlay();
            }, 1000);
        }

        if ($("#fuserModal").length > 0) {
            setTimeout(function() {
                triggerfuserOverlay();
            }, 10000);
        }
        if ($("#fuserMobileModal").length > 0) {
            setTimeout(function() {
                triggerfuserMobileOverlay();
            }, 10000);
        }
        //        if ($("#userWalletModal").length > 0) {
        //            setTimeout(function () {
        //                userWalletModalOverlay();
        //            }, 3000);
        //        }else{
        //            localStorage.removeItem('_plog');
        //        }
        var counterNetCore = 0;
        var looper = setInterval(function() {
            counterNetCore++;
            WriteCookie();
            if (counterNetCore >= 8) {
                clearInterval(looper);
            }

        }, 10000);

        $("#mLoginOverlay").click(closeMobileLoginOverlay);
        $("#mLoginOverlayCloseBtn").click(closeMobileLoginOverlay);
        $(".mLoginOverlayActionableContent").click(function() {
            location.href = "/customer/signup";
        });
        if ($('#mobileHomeCarousel').length > 0) {
            $('#mobileHomeCarousel').slick({
                dots: false,
                prevArrow: false,
                nextArrow: false,
                autoplay: true,
                autoplaySpeed: 3000
            });
        }

        generateRatingStars();

        if ($(".pagination__next").length) {
            $('.cat-products-wrapper').infiniteScroll({
                // options
                path: '.pagination__next',
                append: '.post',
                history: false
            });
            $('.search-products-wrapper').infiniteScroll({
                // options
                path: '.pagination__next',
                append: '.post',
                history: false
            });
        }
        $('.cat-products-wrapper').on('append.infiniteScroll', function(event, response, path, items) {
            generateRatingStars();
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        });
        $('.search-products-wrapper').on('append.infiniteScroll', function(event, response, path, items) {
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        });
        $('#doLogout').click(function() {
            dataLayer.push({
                'event': 'userLogout'
            });
            var uri = $(this).data('uri');
            var data = {
                '_csrf': token
            };
            postIt("lgOutFrm", uri, data);
        });
        $("#logoutFromProfile").click(function() {
            dataLayer.push({
                'event': 'userLogout'
            });
            var uri = $("#logoutFromProfile").data('uri');
            var data = {
                '_csrf': token
            }
            postIt("lgOutFrm", uri, data);
        });
        $('body').on('click', '#goTop', function(e) {
            $("html, body").animate({
                scrollTop: $("#top").offset().top
            }, 5500);
        });

        //Winni Order Detail
        $(".shpimentDetails .shpimentDtlInfo .prdAttr a[target='_BLANK']").text("View Img");

        $('#filterOrder').change(function() {
            $('#filter_order').submit();
        });
        $(".orderTabs .tabs .orderTab").click(function() {
            $("#filter_order").show();
        });
        $(".orderTabs .tabs .paymentTab,.orderTabs .tabs .cancelTab").click(function() {
            $("#filter_order").hide();
        });
        $('.sidenav').sidenav({
            //            menuWidth: 270, // Default is 300
            edge: 'left',
            closeOnClick: true,
            draggable: false
        });
        if ($('#navigation').length > 0) {
            var elementPosition = $("#navigation").offset();
            var pc = $(".product-canvas").offset();
            var ra = $('.product-canvas').height();
            var eh = $("#navigation").height();
            var htd = ((pc.top + ra) - 30);
            var width = $("#navigation").width() + 22.5;
            var rightOffset = $('.product-left').offset().left + $('.product-left').width();
            var leftOffsetForRightPane = rightOffset + 23;
            $(window).scroll(function() {
                var topScroll = $(window).scrollTop() + eh;
                if ($(window).scrollTop() > elementPosition.top) {
                    if (topScroll > htd) {
                        $('#navigation').css('position', 'sticky');
                    } else {
                        $('#navigation').css('position', 'fixed').css('top', '0').css('left', leftOffsetForRightPane).css('width', width);
                    }
                } else {
                    $('#navigation').css('position', 'static');
                }
            });
        }
        if ($(".personalised-gifts-desktop").length > 0 && $(".pagination__next").length) {
            var elem = document.querySelector('.cat-products-wrapper');
            var infScroll = new InfiniteScroll(elem, {
                // options
                path: '.pagination__next',
                append: '.product',
                status: '.page-load-status',
                history: false,
                prefill: false
            });
            infScroll.on('last', function(response, path) {
                $(".infinite-scroll-request").hide();
                $(".infinite-scroll-last").show();
            });
        }
        if ($(".page-category").length > 0 && $(".pagination__next").length) {
            var elem = document.querySelector('.cat-products-wrapper');
            var infScroll = new InfiniteScroll(elem, {
                // options
                path: '.pagination__next',
                append: '.product',
                status: '.page-load-status',
                history: false,
                prefill: false
            });
            infScroll.on('load', function() {
                var shown = localStorage.getItem('feedbackModalShown');
                if (!shown) {
                    var totalPages = $("#totalPages").val();
                    if (Math.floor(totalPages / 2) >= 2 && Math.floor(totalPages / 2) === infScroll.pageIndex) {
                        $('#userfeedback').modal({
                            dismissible: false
                        });
                        $('#userfeedback').modal("open");
                        localStorage.setItem('feedbackModalShown', 1);
                    }
                }
            });
            infScroll.on('last', function(response, path) {
                $(".infinite-scroll-request").hide();
                $(".infinite-scroll-last").show();
            });
        }
        if ($(".search-mobile").length > 0 && $(".pagination__next").length) {
            var elem = document.querySelector('.cat-products-wrapper');
            var infScroll = new InfiniteScroll(elem, {
                // options
                path: '.pagination__next',
                append: '.product',
                status: '.page-load-status',
                history: false,
                prefill: false
            });
            infScroll.on('last', function(response, path) {
                $(".infinite-scroll-request").hide();
                $(".infinite-scroll-last").show();
            });
        }

        if ($(".search-list-bc").length > 0 && $(".pagination__next").length) {
            var elem = document.querySelector('.search-products-wrapper');
            var infScroll = new InfiniteScroll(elem, {
                // options
                path: '.pagination__next',
                append: '.product',
                status: '.page-load-status',
                history: false,
                prefill: false
            });
            infScroll.on('last', function(response, path) {
                $(".infinite-scroll-request").hide();
                $(".infinite-scroll-last").show();
            });
        }
        $("#hiddenAttsToggle").click(function() {
            if ($("#hiddenAtts").is(":visible")) {
                $("#hiddenAtts").hide();
                $("#hiddenAttsToggle").text("+ More")
            } else {
                $("#hiddenAtts").show();
                $("#hiddenAttsToggle").text("- Less")
            }
        });

        $('#searchDelCity').keyup(function() {
            if ($(this).val().length > 0) {
                $('#popularDelCities').addClass("hide");
            } else {
                $('#popularDelCities').removeClass("hide");
            }
        });
        $('.category-sort select').change(function() {
            window.location.href = $(".category-sort select option:selected").data("uri");
        });

        if ($('body').hasClass("page-new-product")) {
            rcpdCookie();
        }
        if ($('body').hasClass("city-home")) {
            getRecentViewProduct();
        }

        if ($('body').hasClass("choose-city-mobile")) {
            getAllCitiesName();
        }

        if ($("#mobileSearchInput").length > 0 && $(".moneyCal").length < 1) {
            $(window).on('load', function() {
                $("#mobileSearchInput").focus();
                $("#mobileSearchInput").trigger("click");
            });
            $("#clearSearch").click(function() {
                $(this).hide();
                $("#mobileSearchInput").val("");
            });
            $("#mobileSearchInput").keyup(function() {
                $(".search-dropdown-by-category-mobile").hide();
                var query = $(this).val();
                if (query !== "") {
                    $("#clearSearch").show();
                } else {
                    $("#clearSearch").hide();
                }
            });
            $("#mobileSearchInput").keydown(function(e) {
                if (e.keyCode === 13) {
                    var query = $(this).val();
                    if (query !== "") {
                        $('.mobile-search').submit();
                    }
                }
            });
            var query = $('#mobileSearchInput').val();
            if (query !== "") {
                $("#clearSearch").show();
            } else {
                $("#clearSearch").hide();
            }


            // constructs the suggestion engine
            var productCategoriesMobile = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: searchQueryUrl,
                    wildcard: '%QUERY'
                }
            });
            $('#mobileSearchInput').typeahead({
                hint: true,
                highlight: true,
                minLength: 3
            }, {
                name: 'productCategoriesMobile',
                source: productCategoriesMobile,
                autocomplete: "off",
                limit: 10,
                display: function(item) {
                    return item.name
                },
                'updater': function(item) {
                    return item;
                },
                templates: {
                    suggestion: Handlebars.compile('<div><a href="{{uri}}">{{name}}</a></div>')
                }
            });
        }

        if ($("#deliveryLocationSearchInput").length > 0) {
            $("#clearSearch").click(function() {
                $(this).hide();
                $("#mobileSearchInput").val("");
            });
            $("#deliveryLocationSearchInput").keyup(function() {
                var query = $(this).val();
                if (query !== "") {
                    $("#clearSearch").show();
                } else {
                    $("#clearSearch").hide();
                }
            });
            $("#deliveryLocationSearchInput").keydown(function(e) {
                if (e.keyCode === 13) {
                    $('.mobile-search').submit();
                }
            });
            var query = $('#deliveryLocationSearchInput').val();
            if (query !== "") {
                $("#clearSearch").show();
            } else {
                $("#clearSearch").hide();
            }


            // constructs the suggestion engine
            var states = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/search/location/queries/%QUERY',
                    wildcard: '%QUERY'
                }
            });
            $('#deliveryLocationSearchInput').typeahead({
                hint: true,
                highlight: true,
                minLength: 3
            }, {
                name: 'states',
                source: states,
                autocomplete: "off",
                limit: 10,
                display: function(item) {
                    return item.name
                },
                'updater': function(item) {
                    return item;
                },
                templates: {
                    empty: [
                        '<div class="empty-message">',
                        'Sorry, we do not have this location covered',
                        '</div>'
                    ].join('\n'),
                    suggestion: Handlebars.compile('<div><a href="{{uri}}">{{name}}</a></div>')
                }
            }).on('typeahead:selected', function(e) {
                //e.target.form.submit();
            });
        }

        if ($("#search-input-in-desktop").length > 0) {
            $("#search-input-in-desktop").keyup(function(e) {
                $(".search-dropdown-by-category").hide();
            });
            $("#search-input-in-desktop").keydown(function(e) {
                if (e.keyCode === 13) {
                    var query = $(this).val();
                    if (query !== "") {
                        $('.category-search').submit();
                    }
                }
            });
            $(".search-icon-image").click(function() {
                var searchInputValue = $("#search-input-in-desktop").val();
                if (searchInputValue !== "") {
                    $('.category-search').submit();
                }
            })

            // constructs the suggestion engine
            var categories = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: searchQueryUrl,
                    wildcard: '%QUERY'
                }
            });
            $('#search-input-in-desktop').typeahead({
                hint: true,
                highlight: true,
                minLength: 3
            }, {
                name: 'categories',
                source: categories,
                autocomplete: "off",
                limit: 10,
                display: function(item) {
                    return item.name
                },
                'updater': function(item) {
                    return item;
                },
                templates: {
                    suggestion: Handlebars.compile('<div class="dropdown-suggestion-text" style="padding-left: 35px" ><a href="{{uri}}">{{name}}</a></div>')
                }
            }).on('typeahead:selected', function(e) {
                e.target.form.submit();
            });
        }

        $('.modal').modal();

        if ($('#deliveryTimeLeft').length > 0) {
            startProductTimeLeftCountdown();
        }



        if ($('body').hasClass("search-list-bc") || $('body').hasClass("search-mobile")) {
            dataLayer.push({
                'event': 'productSearch',
                'data': {
                    'searchKeyword': searchDL.keyword,
                    'itemCount': searchDL.count
                }
            });
        }

        if ($('body').hasClass("page-category") && typeof categoryDL !== 'undefined') {
            dataLayer.push({
                'event': 'categoryView',
                'data': {
                    'categoryId': categoryDL.id,
                    'categoryName': categoryDL.name,
                    'categoryItemCount': categoryDL.itemCount
                }
            });
        }
        if ($('body').hasClass("search-list-bc") && typeof categoryDL !== 'undefined') {
            dataLayer.push({
                'event': 'categoryView',
                'data': {
                    'categoryId': categoryDL.id,
                    'categoryName': categoryDL.name,
                    'categoryItemCount': categoryDL.itemCount
                }
            });
        }

        if ($('body').hasClass("page-cart")) {
            dataLayer.push({
                'event': 'cartView',
                'data': {
                    'cartItemCount': cartViewDL.cartItemCount,
                    'cartTotal': cartViewDL.cartTotal,
                    'cartItems': cartViewDL.cartItems
                }
            });
        }

        $(".search-field-mobile").on('click', function() {
            var searchInputValue = document.getElementById("mobileSearchInput").value;
            if (searchInputValue.length === 0 || searchInputValue.length === undefined) {
                $(".search-dropdown-by-category-mobile").show();
            }
        });
        $(".search-field").on('click', function() {
            var searchInputValue = document.getElementById("search-input-in-desktop").value;
            if (searchInputValue.length === 0 || searchInputValue.length === undefined) {
                $(".search-dropdown-by-category").show();
            }
        });

        window.onclick = function(event) {
            if ($(".search-input-desktop").length) {
                if (!event.target.matches('.search-input-desktop')) {
                    $(".search-dropdown-by-category").hide();
                }
            } else if ($(".search-field-mobile").length) {
                if (!event.target.matches('.search-field-mobile')) {
                    $(".search-dropdown-by-category-mobile").hide();
                }
            }
        }

        $(window).blur(function() {
            if ($(".search-dropdown-by-category").length) {
                $(".search-dropdown-by-category").hide();
            } else if ($(".search-dropdown-by-category-mobile").length) {
                $(".search-dropdown-by-category-mobile").hide();
            }
        });

        var sortId = localStorage.getItem("sortId");
        var filterId = localStorage.getItem("filterId");
        if (sortId !== null) {
            $('.selected-sort-category').removeClass('selected-sort-category');
            $("#" + sortId).addClass('selected-sort-category');
        }
        if (filterId !== null) {
            $('.selected-filter-category').removeClass('selected-filter-category');
            $("#" + filterId).addClass('selected-filter-category');
        } else {
            $(".circle-dot-filter").hide();
        }

        if ($(".sort-category").hasClass("selected-sort-category")) {
            $(".circle-dot-sort").show();
        } else {
            $(".circle-dot-sort").hide();
        }
        if ($(".price-range-category").hasClass("selected-filter-category")) {
            $(".circle-dot-filter").show();
        } else {
            $(".circle-dot-filter").hide();
        }

        if ($(".price-range-category").length < 1 && $(".prod-images").length < 1) {
            localStorage.removeItem("sortId");
            localStorage.removeItem("filterId");
            $(".price-range-category").removeClass("selected-filter-category");
            $(".sort-category").removeClass("selected-sort-category");
        }

        if ($(".sort-category").length) {
            var lastScrollTop = 0;
            $(window).scroll(function(e) {
                var st = $(this).scrollTop();
                if (st > lastScrollTop) {
                    // downscroll code
                    $(".slideUp").slideUp(500);
                } else {
                    // upscroll code
                    $(".slideUp").slideDown(500);
                }
                lastScrollTop = st;
            });
        }

        setTimeout(initSupportChat(), 5000);
    });
    // The rest of the code goes here!

    $(".banner-img-bg").click(function() {
        var targetUri = $(this).data("targeturi");
        if (targetUri == undefined || targetUri.trim().length == 0) {
            window.location.href = "/cake";
        } else {
            window.location.href = targetUri;
        }
    });

    $(".sort-category").click(function() {
        var id = $(this).attr("id");
        localStorage.setItem("sortId", id);
    });

    $(".price-range-category").click(function() {
        var id = $(this).attr("id");
        localStorage.setItem("filterId", id);
    });

    $(".clear-filter-price").click(function() {
        localStorage.removeItem("filterId");
    });

    $(".clear-filter-sort").click(function() {
        localStorage.removeItem("sortId");
    });

    $(".corporate-page-banner").click(function() {
        var formPosition = $("#corporate-form").position();
        window.scrollTo({
            top: formPosition.top - 105,
            behavior: 'smooth'
        });
    });

    $(".corporate-page-banner-mobile").click(function() {
        var formPosition = $("#corporate-form").position();
        window.scrollTo({
            top: formPosition.top - 50,
            behavior: 'smooth'
        });
    });

    $(".explore-more-cakes").click(function() {
        $(this).hide();
        $(".hidden-cake-img").show();
    });

    $(".kids-cake-bg-img").click(function() {
        window.location.href = "/cake/kids-cakes";
    });

    $(".flower-by-type-img").click(function() {
        window.location.href = "/flowers";
    });

    function logEvent(name, params) {
        if (!name) {
            return;
        }

        if (window.AnalyticsWebInterface) {
            // Call Android interface
            window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
        } else if (window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.firebase) {
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

    function triggerLoginOverlay() {
        var show = true;
        if (typeof(Storage) !== "undefined") {
            var closed = sessionStorage.getItem('loShown');
            if (closed === '1') {
                show = false;
            }
        } else {
            show = false;
        }

        if (show === true) {
            $("#mLoginOverlay").show();
            $("#mLoginOverlayContent").show("slow");
            if (typeof(Storage) !== "undefined") {
                sessionStorage.setItem('loShown', '1');
            }
        }
    }

    function triggerfuserOverlay() {
        var show = true;
        if (typeof(Storage) !== "undefined") {
            var closed = localStorage.getItem('popShown');
            if (closed === '1') {
                show = false;
            }
        } else {
            show = false;
        }

        if (show === true) {
            $('#fuserModal').modal("open");
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('popShown', '1');
            }
        }
    }

    function triggerfuserMobileOverlay() {
        var show = true;
        if (typeof(Storage) !== "undefined") {
            var closed = sessionStorage.getItem('Shown');
            if (closed === '1') {

                show = false;
            }
        } else {
            show = false;
        }

        if (show === true) {
            $('#fuserMobileModal').modal("open");
            if (typeof(Storage) !== "undefined") {
                sessionStorage.setItem('Shown', '1');
            }
        }
    }

    function userWalletModalOverlay() {
        var plog = localStorage.getItem('_plog');
        var custID = $('#ntCustId').val();
        if (custID > 0) {
            var now = new Date().getTime();
            var walletSetupTime = localStorage.getItem('_wstime');
            if (walletSetupTime === null) {
                localStorage.setItem('_wstime', now);
                localStorage.setItem('_plog', true);
                loadCustomerGiftcard(custID);
            } else {
                if (plog === null && now - walletSetupTime > 24 * 60 * 60 * 1000) {
                    localStorage.removeItem('_wstime');
                    localStorage.setItem('_wstime', now);
                    loadCustomerGiftcard(custID);
                } else {
                    localStorage.removeItem('_wstime');
                    localStorage.setItem('_wstime', now);
                }
            }
        } else {
            localStorage.removeItem('_plog');
        }
    }

    function closeMobileLoginOverlay(e) {
        $("#mLoginOverlay").hide();
        $("#mLoginOverlayContent").hide();
    }

    function startProductTimeLeftCountdown() {
        var counter = 0;
        var timeInSeconds = $('#deliveryTimeLeft').val();
        $('#countdownTimer').text(convertSeconds(timeInSeconds - counter));
        setInterval(function() {
            counter++;
            if (counter <= timeInSeconds) {
                $('#countdownTimer').text(convertSeconds(timeInSeconds - counter));
            } else {
                $('#countdownTimer').text("Earliest can be delivered tomorrow");
            }
        }, 1000);
    }

    function pad2(number) {
        return (number < 10 ? '0' : '') + number;
    }

    function convertSeconds(s) {
        var hour = pad2(Math.floor(s / (60 * 60)));
        s = s % (60 * 60);
        var min = pad2(Math.floor(s / 60));
        var sec = pad2(s % 60);
        if (hour === '00') {
            return min + ':' + sec + " minutes left for today's delivery. HURRY!";
        } else {
            return hour + ':' + min + ':' + sec + " hours left for today's delivery";
        }
    }

    function generateRatingStars() {
        $.fn.stars = function() {
            return $(this).each(function() {
                var rating = parseFloat($(this).data("rating"));
                var percent = Math.round(rating * 2) * 10;
                var span = $("<span class='stars-container'>")
                    .addClass("stars-" + percent)
                    .text("★★★★★");
                $(this).html(span);
            });
        };
        $('span.stars').stars();
    }

    /*Utility Function start*/
    function postIt(formId, url, data) {
        $('body').append($('<form/>', {
            id: formId,
            method: 'POST',
            action: url
        }));
        for (var i in data) {
            $('#' + formId).append($('<input/>', {
                type: 'hidden',
                name: i,
                value: data[i]
            }));
        }
        $('#' + formId).submit();
        $('#' + formId).remove();
    }

    if ($('.showUserCurrency').length > 0) {
        var currency = localStorage.getItem('userCurrency');
        if (currency == null) {
            currency = "INR";
        }
        $('.showUserCurrency').text(currency);
    }
}));
$("#initInvoicePayForm").submit(function(e) {
    var $btn = $('#initInvoicePayForm').find("button");
    $btn.attr("disabled", "");
    $btn.addClass("disabled");
    e.preventDefault();
    var uri = $('#initInvoicePayForm').data("uri");
    $.ajax({
        url: uri,
        type: 'post',
        success: function(response) {
            if (response.success === "true") {
                $(".dyn-invoice-payment").html(response.html);
                $(".invoice-breakup").hide();
            } else {
                alert(response.message);
            }
        },
        complete: function(response) {

        },
        error: function(response) {}
    });
});

function initSupportChat() {
    let showChat = true;
    if ("localhost" === window.location.host || $('body').hasClass('aapp') || $('body').hasClass('checkout-adv')) {
        /*$(window).width() > 1200 ||*/
        showChat = false;
    }

    if (showChat === true && $(window).width() > 300) {
        window.ymConfig = {
            bot: 'x1599120792185'
        };
        (function() {
            var w = window,
                ic = w.YellowMessenger;
            if ("function" === typeof ic)
                ic("reattach_activator"), ic("update", ymConfig);
            else {
                var d = document,
                    i = function() {
                        i.c(arguments)
                    };

                function l() {
                    var e = d.createElement("script");
                    e.type = "text/javascript", e.async = !0,
                        e.src = "https://app.yellowmessenger.com/widget/main.js";
                    var t = d.getElementsByTagName("script")[0];
                    t.parentNode.insertBefore(e, t)
                }
                i.q = [], i.c = function(e) {
                        i.q.push(e)
                    }, w.YellowMessenger = i,
                    w.attachEvent ? w.attachEvent("onload", l) : w.addEventListener("load", l, !1)
            }
        })();
    }
}


$('#productDeliverySearchForm').submit(function(e) {
    e.preventDefault();
    var uri = $(this).attr('action');
    var data = $(this).serialize();
    $.ajax({
        url: uri,
        type: 'POST',
        data: data,
        success: function(response) {
            if (response.success === "true") {
                $("#respPincode").html(response.message);
            } else {
                $("#respPincode").html(response.message);
            }
        },
        complete: function(response) {
            // $('#fullPageLoader').addClass('hide');
        },
        error: function(response) {}
    });
});
//$('#deleteAddress').click(function (e) {
$('#ckDynContentWrapper').on('click', '.deleteAddress', function(e) {
    var result = confirm("Want to delete?");
    if (result) {
        var url = $(this).data('uri');
        e.preventDefault();
        $.ajax({
            cache: false,
            url: url,
            type: 'post',
            success: function(response) {
                if (response.success === "true") {
                    location.reload();
                }

            },
            complete: function(response) {

            },
            error: function(response) {
                alert("some error occured");
            }
        });
    }
});
$('.editUpdateAddressForm').click(function(e) {
    var url = $(this).data('uri');
    var addId = $(this).data('cid');
    $('#currentAddressId').val(addId);
    $.ajax({
        cache: false,
        url: url,
        type: 'get',
        success: function(response) {
            if (response.success === "true") {
                $('#addressUpdateForm').attr('data-id', response.address.id);
                $('#addressUpdateForm [name="name"]').val(response.address.name);
                $('#addressUpdateForm [name="address"]').val(response.address.address);
                $('#addressUpdateForm [name="landmark"]').val(response.address.landmark);
                $('#addressUpdateForm [name="phoneNumber"]').val(response.address.phoneNumber);
                $('#addressUpdateForm [name="alternatePhoneNumber"]').val(response.address.alternateNumber);
                $('#addressUpdateForm [name="postalCode"]').val(response.address.postalCode);
                $('#addressUpdateForm [name="cityId"]').val(response.address.city.name);
            } else {
                $('.message').text(response.message);
            }
        },
        complete: function(response) {

        },
        error: function(response) {
            alert("some error occured");
        }
    });
});
$('#addressPin').keyup(function(e) {

    var pincode = $(this).val();
    if ($.isNumeric(pincode) && pincode.length === 6) {

        var uri = webApp.checkCityOfPincodeUri.replace("{pincode}", pincode);
        //     $('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: uri,
            type: "GET",
            cache: false,
            dataType: "json",
        });
        jqxhr.done(function(data) {
            if (data.result.success) {
                $("#newAddrCity").val(data.result.city);
                M.updateTextFields();
            } else if (data.message === "session expired") {
                showSessionExpired();
            } else {
                $("#newAddrCity").val("");
                M.toast({
                    html: "Delivery not available at this location"
                });
            }
        });
        jqxhr.fail(function(data) {

        });
    }
});
$('#addressUpdateForm').submit(function(e) {
    e.preventDefault();
    var action = $(this).attr('action');
    action = action + "/" + $('#currentAddressId').val();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: action, //Defined in HTML body
        data: data,
        success: function(response) {
            if (response.success === "true") {
                location.reload();
            } else {
                console.log("failed" + response.message);
                M.toast({
                    html: response.message
                });
            }
        },
        error: function(response) {}
    });
});
(function($) {
    $(function() {
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        $(document).ajaxSend(function(e, xhr, options) {
            if (options.type == "POST") {
                xhr.setRequestHeader(header, token);
            }
        });
        $('#sub-rating-form').click(function() {
            var reviewData = $('.review-rating-form');
            var uri = $('#reviewPageRatingUrl').val();
            submitCustomerReview(reviewData, uri);
        });

        function submitCustomerReview(reviewData, uri) {
            var finalData = "";
            if (reviewData) {
                finalData = $(reviewData).serialize();
            }
            $.ajax({
                url: uri,
                data: finalData,
                type: 'post',
                success: function(response) {
                    if (response.success === true) {
                        alert(response.message);
                        location.href = $('#prductPageUrl').val();
                    } else if (response.reviewText === false) {
                        if (response.reviewTextAlertMsg !== undefined) {
                            $('#review-alert').text(response.reviewTextAlertMsg);
                            $('#review-box').addClass('box-review');
                        } else {
                            $('#review-alert').text('');
                        }
                    } else {
                        alert(response.message);
                    }
                },
                complete: function(response) {},
                error: function(response) {}
            });
        }

    });
})(jQuery);
$("#Xbutton").bind({
    click: function() {
        var catUrl = $('#giftBoxUrlId').val();

        var checkUrl = $('#checkUrlId').val();
        if (actionValue === 'AddtoCart') {
            location.href = catUrl;
        } else {
            location.href = checkUrl;
        }
    }
});


//function checkForCustomerLogin() {
//    var uri = $('#prdctReviewUrl').val();
//    var auth = $('.writeReviwShow').data('auth');
//    if (auth === false) {
//        $('#loginModal').openModal();
//    } else {
//        location.href = uri;
//    }
//}
$(document).ready(function() {
    if ($('.modal').hasClass('open')) {
        $('.CountryCodeList li').show();
    }
    $('.CountryCodeList li').click(function() {
        $(".searchTheKey").val('');
        var countryCode = $(this).attr('data-id');
        $('#loginCountryCode').val(countryCode);
        $('.countrySelect').text(countryCode);
        $('.countryListModal').modal('close');
    });
    $('.modal-close1').click(function() {
        $('.countryListModal').modal('close');
    });
    $('.forgotPwdM').click(function() {
        $('#countryModalf').modal('close');
    })
    $(".searchTheKey").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".CountryCodeList > li,.CountryCodeList > li span").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function() {
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e) {
            if (e < onStar) {
                $(this).addClass('hover');
            } else {
                $(this).removeClass('hover');
            }
        });
    }).on('mouseout', function() {
        $(this).parent().children('li.star').each(function(e) {
            $(this).removeClass('hover');
        });
    });
    /* 2. Action to perform on click */
    $('#stars li').on('click', function() {
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');
        for (let i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (let i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        sendData(ratingValue);
    });
    $("#customerFeedbackForNo").hide();
    $("#ecustomerFeedbackForNo").hide();
    $("#customerFeedBackYes").click(customerFeedBackYes);
    $("#showCustomerFeedBackForNo").click(showCustomerFeedbackForNo);
    $("#saveCustomerFeedbackNo").click(saveCustomerFeedback);
    $(".mobileFeedback").click(showCustomerFeedbackForNo);
    $("#ecustomerFeedBackYes").click(eCustomerFeedBackYes);
    $("#eshowCustomerFeedBackForNo").click(eshowCustomerFeedbackForNo);
    $("#esaveCustomerFeedbackNo").click(saveCustomerFeedback);
    $("#recipientFeedback").click(saveRecipientFeedback);
});

function sendData(ratingValue) {
    //document.getElementById("rating").value = ratingValue;
    document.getElementById("rating").setAttribute('value', ratingValue);
}

$('#corporateQueryForm').submit(function(e) {
    e.preventDefault();
    var urlEdit = $('#url').val();
    var data = $('#corporateQueryForm').serialize();
    $.ajax({
        type: 'POST',
        url: urlEdit,
        data: data,
        success: function(response) {
            if (response.success === "true") {
                $('#message').html('<div style="background-color:#e6f7d2;padding:8px;font-size:15px">' + response.message + '</div>');
                document.getElementById("company").value = "";
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("query").value = "";
                document.getElementById("mobileNumber").value = "";
                $(".submit_corporate_form").trigger("click");
            } else {
                $('#message').html('<div style="background-color:#ffb3b3;padding:8px;font-size:15px">' + response.message + '</div>');
            }
        }
    });
});
$(document).ready(function() {
    var maxLength = 300;
    $(".show-read-more").each(function() {
        var myStr = $(this).text();
        if ($.trim(myStr).length > maxLength) {
            var newStr = myStr.substring(0, maxLength);
            var removedStr = myStr.substring(maxLength, (myStr).length);
            $(this).empty().html(newStr);
            $(this).append(' <a href="javascript:void(0);" class="read-more">read more...</a>');
            $(this).append('<span class="more-text">' + removedStr + '</span>');
        }
    });
    $(".read-more").click(function() {
        $(this).siblings(".more-text").contents().unwrap();
        $(this).remove();
    });
});
$(document).ready(function() {
    if ($(".thumbnail").length) {
        $('.myDIV img:first').addClass("small-img");
    }
    $(".thumbnail").hover(function() {
        var pId = $(this).data("bigurl");
        //        $(".bg-img").attr("src", pId);
        if ($(".myDIV img").hasClass("small-img")) {
            $(".myDIV img").removeClass("small-img");
        }
        $(this).addClass("small-img");
    });
});

function handler404() {
    alert("404 Error");
}

function handler500() {
    alert("500 Error");
}

function handler502() {
    M.toast({
        html: 'Something went wrong, please try after some time'
    });
}

function loadDropzone() {
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("#imageContainer", { // Make the whole body a dropzone
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
        dictFileSizeUnits: {
            tb: "TB",
            gb: "GB",
            mb: "MB",
            kb: "KB",
            b: "b"
        },
        headers: {
            'X-XSRF-TOKEN': $("meta[name='_csrf']").attr("content")
        },
        success: function(file, response) {
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

                }
                this.enable();
                this.removeAllFiles(true);
                $("#imageURLError").show();
                $("#imageURL").val("");
                $("#imageURLErrorMessage").text(response.errorMessage);
            }
        },
        removedfile: function(file) {
            this.enable();
            $("#imageURL").val("");
            $("#imageURLError").hide();
            if (file.previewElement != null && file.previewElement.parentNode != null) {
                file.previewElement.parentNode.removeChild(file.previewElement);
            }
            return this._updateMaxFilesReachedClass();
        },
        error: function(file, message) {
            $("#imageURLError").show();
            $("#imageURLErrorMessage").text("");
            $("#imageURLErrorMessage").text(message);
        }
    });
}

$(document).ready(function() {
    if ($(".header-secondary").length) {
        var lastScrollTop = 0;
        window.addEventListener('scroll', function(event) {
            var updateLastScrollTop = (window.pageYOffset || document.documentElement.scrollTop) - 50;
            if (updateLastScrollTop > lastScrollTop) {
                // downscroll code
                $(".header-secondary").hide(300);
            } else {
                // upscroll code
                $(".header-secondary").show(200);
            }
            lastScrollTop = updateLastScrollTop <= 0 ? 0 : updateLastScrollTop;
        }, false);
    }

    $("#same-day-content").show();
    var currentActive = sessionStorage.getItem('currentActiveNavigation');
    if (currentActive && currentActive !== null) {
        if ($(".homepage-content").length) {
            $(".mobile-navbar-bottom-link[name= home-navbar-bottom-link]").addClass("active");
            $(".home-outline").hide();
            $(".home-selected").show();
        } else if ($(".shop-content").length) {
            $(".mobile-navbar-bottom-link[name= shop-navbar-bottom-link]").addClass("active");
            $(".shop-outline").hide();
            $(".shop-selected").show();
            $(".back-menu-button").show();
            $(".header-menu-button").hide();
        } else if ($(".city-content-mobile").length) {
            $(".mobile-navbar-bottom-link[name= city-navbar-bottom-link]").addClass("active");
            $(".city-outline").hide();
            $(".city-selected").show();
        } else if ($(".profile-content").length) {
            $(".mobile-navbar-bottom-link[name= account-navbar-bottom-link]").addClass("active");
            $(".account-outline").hide();
            $(".account-selected").show();
        }
    } else {
        $(".mobile-navbar-bottom-link[name= home-navbar-bottom-link]").addClass("active");
        $(".home-outline").hide();
        $(".home-selected").show();
    }
    if ($("#tabs-category-menu").length) {
        $('#tabs-category-menu').tabs();
    }
});
$(document).ready(function() {
    var navbarHeight = ($(".white").height());
    if ($("#moreBelowButton").length) {
        $("#moreBelowButton").hide();
        var isScrolling;
        var scroll = false;
        var scrollPositionTop = 0;
        $("#moreBelowButton").hide();
        var bounding;
        var scrollHeight = window.innerHeight - navbarHeight;
        var testDiv = document.getElementById("hiddenDiv");
        setTimeout(function() {
            if (!scroll) {
                $("#moreBelowButton").show();
            }
        }, 3000);
        window.addEventListener('scroll', function(event) {
            scroll = true;
            $("#moreBelowButton").hide();
            scrollPositionTop = parseInt(document.documentElement.scrollTop);
            scrollHeight = window.innerHeight - navbarHeight;
            var element = document.getElementById('element');
            bounding = element.getBoundingClientRect();
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                scroll = false;
                $("#moreBelowButton").hide();
            } else {
                window.clearTimeout(isScrolling);
                isScrolling = setTimeout(function() {
                    if (((window.innerHeight + window.scrollY) < document.body.offsetHeight) && bounding.bottom > window.innerHeight + 1) {
                        $("#moreBelowButton").show();
                    }
                }, 3000);
            }

            if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight + 600 || document.documentElement.clientHeight + 600)) {
                scrollHeight = bounding.bottom - window.innerHeight;
            }
        }, false);
        $("#scrollToNextFrame").click(function() {
            window.scrollTo({
                top: scrollPositionTop + scrollHeight,
                behavior: 'smooth'
            });
        });
    }
});
$(document).ready(function() {
    var popupHeightFromTop;
    var temporaryBlock = false;
    if ($("#callMePopUp").length) {
        $(window).on('load', function() {
            var pageHeight = $('body').height();
            var totalPages = $("#totalPagesInput").attr('value');
            totalPages = totalPages - 1;
            pageHeight = pageHeight * totalPages;
            popupHeightFromTop = pageHeight / totalPages;
            localStorage.setItem("closeCallUsPopup", "true");
        });
    }
    if ($(".corporate-product-card").length || $("#totalPagesInput").length) {
        window.addEventListener('scroll', function(event) {
            if (popupHeightFromTop && temporaryBlock) {
                var y = $(this).scrollTop();
                var openCallUsPopup = localStorage.getItem("closeCallUsPopup");
                if ((y > popupHeightFromTop) && openCallUsPopup === "true") {
                    $('#callMePopUp').show();
                }
            }
            $(".corporate-product-card").click(function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
    }
});

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse('2020-02-13T23:59:59'));
//initializeClock('clockdiv', deadline);

$(document).ready(function() {
    var email = $("#ntCustEmail").val();
    var loggedIn;
    if (email === "") {
        loggedIn = false;
    } else {
        loggedIn = true;
    }
    var date = new Date();
    var dateWithoutTime = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    if (dateWithoutTime !== localStorage.getItem('date') && !loggedIn) {
        if (window.PasswordCredential || window.FederatedCredential) {
            navigator.credentials.get({
                password: true,
                //                federated: {
                //                    providers: [
                //                        'https://accounts.google.com'
                //                    ]
                //                },
                mediation: 'optional'
            }).then(c => {
                localStorage.setItem('date', dateWithoutTime);
                if (c) {
                    switch (c.type) {
                        case 'password':
                            return doLogin(c.id, c.password);
                            //                            break;
                            //                        case 'federated':
                            //                            return gSignIn(c);
                            //                            break;
                    }
                } else {
                    return Promise.resolve();
                }
            })
        }
    }
});

$("#read-more").click(function() {
    var productDescriptionPosition = $("#productDescriptionHeading").position();
    window.scrollTo({
        top: productDescriptionPosition.top - 50,
    });
});

if ($("#search-mobile-input-home").length) {
    showHideSearchIcon("without-scroll");
    window.addEventListener('scroll', function(event) {
        showHideSearchIcon("with-scroll");
    });
}

function showHideSearchIcon(scroll) {
    var searchInput = document.getElementById("search-icon-mobile");
    var viewport = isAnyPartOfElementInViewport(searchInput);
    if (viewport) {
        if (scroll === "without-scroll") {
            $(".bg-mobile-search-icon").hide();
        } else {
            $(".bg-mobile-search-icon").hide(500);
        }
    } else {
        if (scroll === "without-scroll") {
            $(".bg-mobile-search-icon").show();
        } else {
            $(".bg-mobile-search-icon").show(500);
        }
    }
}

function isAnyPartOfElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    var rectTop = rect.top - 20;
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rectTop <= windowHeight) && ((rectTop + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    return (vertInView && horInView);
}

function loadCartItems() {
    var jqxhr = $.ajax({
        url: cartItemsByAjax,
        type: "GET",
        cache: false,
        dataType: "json",
    });
    jqxhr.done(function(data) {
        if (data.success === "true") {
            $('body').find('#cartItemsAjaxWrapper').html(data.html);
            var currency = localStorage.getItem('userCurrency');
            changeCurrecies(currency);
        } else {
            alert(data.message);
        }
    });
    jqxhr.fail(function(data) {

    });
    jqxhr.always(function(data) {});
}

//recntlyViewesProduct
function rcpdCookie() {
    $.ajax({
        type: "get",
        url: cookieUri,
        success: function(response) {
            if (response.success === "true") {
                getRecentViewProduct();
            } else {}
        },
        complete: function(response) {},
        error: function(response) {}
    });
}

function getRecentViewProduct() {
    $.ajax({
        type: "get",
        url: recentViewedproductUri,
        success: function(response) {
            if (response.success === "true") {
                $("#recentViewedProduct").html(response.html);
                var currency = localStorage.getItem('userCurrency');
                changeCurrecies(currency);
            } else {
                alert(response.message);
            }
        },
        complete: function(response) {
            // $('#fullPageLoader').addClass('hide');
        },
        error: function(response) {}
    });
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

$(document).ready(function() {
    $('.collapsible').collapsible();
    $("#msgOnCakeAtt").characterCounter();
    $('select').formSelect();
});

function getAllCitiesName() {
    $.ajax({
        type: "get",
        url: allCitiesUrl,
        success: function(response) {

            if (response) {
                var cityResponseLength = response.length;
                var cities = "";
                for (var i = 0; i < cityResponseLength; i++) {
                    var name = response[i].cityName;
                    var url = changeCityUrl + response[i].cityName;
                    cities = cities + '<a href="' + url + '"><div class="col s12 city-name" style="background: white">' + name + '</div></a>'
                }
                $(".cityName").html(cities);
            } else {
                alert(response.message);
            }
        },
        complete: function(response) {

        },
        error: function(response) {}
    });
}

$('#deliveryLocationSearch').keyup(function() {
    var query = $(this).val();
    $('.city-name').each(function() {
        if ($(this).text().search(new RegExp(query, "i")) < 0) {
            $(".detect-col").hide();
            $(".popular-cities").hide();
            $(this).hide();
            $(".other-cities").hide();
            $(this).removeClass("show-it");
        } else {
            $(".detect-col").show();
            $(".popular-cities").show();
            $(this).show();
            $(".other-cities").show();
            $(this).addClass("show-it");
            $('.nocityName').html("");
            var city = $(this).text().toLowerCase();
            city = city.replace(query, '<span class="search-found" style="font-weight: 600">' + query + '</span>');
            $(this).html("<span style='text-transform: capitalize'>" + city + "<span>");
        }
    });
    if ($(".show-it").length === 0) {
        $('.nocityName').html("<div class='col s12 no-city-name' style='background: white'>No Result Found</div>")
    }
});

function showAll() {
    $('.hide-part').show();
    $('.alert-successL').hide();
    $('.alert-dangerL').hide();
}

function outletReviewLink(uri) {
    $.ajax({
        type: "GET",
        url: uri,
        success: function(response) {
            $('#outletReviewLink').html(response.html);
        },
        eroor: function(response) {},
        complete: function(response) {}
    });
}

function storeReviewBy(index) {
    var url1 = webAppWOR.storeReviewByUri;
    var reviewLinkValue = $("#wstorevalue_" + index).val();
    var reviewLinkType = $("#wstorekey_" + index).val();
    var winniStoreReviewId = $("#winniStoreReviewId").val();
    url1 = url1.replace("{reviewLinkType}", reviewLinkType);
    url1 = url1.replace("{winniStoreReviewId}", winniStoreReviewId);
    url1 = url1.replace(" ", "-");
    $.ajax({
        type: "GET",
        url: url1,
        success: function(response) {
            if (response.success === true) {
                window.location.href = reviewLinkValue;
            }
        },
        eroor: function(response) {},
        complete: function(response) {}
    });
}


$(".mobile-navbar-bottom-link").click(function(e) {
    var currentActive = $(this).attr('name');
    sessionStorage.setItem("currentActiveNavigation", currentActive);
    if ($(".header-menu-button").hasClass("active-navbar-navigation")) {
        window.location = $(this).attr("href");
    }
})

$(".mobile-category-navbar-side-div").click(function() {
    $('.selected-div').removeClass('selected-div');
    $(this).closest('.mobile-category-navbar-side-div').addClass('selected-div');
    var showContentId = $(this).attr('name');
    $(".category-menu-list").hide();
    $("#" + showContentId).show();
})

$(".mobile-menu-expand-list").click(function() {
    var otherDivs = $(this).parent().siblings().find(".mobile-menu-expand-list").next();
    otherDivs.hide();
    $(this).parent().siblings().children().css("font-weight", "400");
    $(this).parent().siblings().children().find(".expand-icon-plus").addClass("show-content");
    $(this).parent().siblings().children().find(".expand-icon-plus").removeClass("hide-content");
    $(this).parent().siblings().children().find(".expand-icon-minus").removeClass("show-content");
    $(this).parent().siblings().children().find(".expand-icon-minus").addClass("hide-content");
    var header = $(this);
    var content = header.next();
    content.slideToggle(500, function() {
        header.text(function() {
            if (content.is(":visible")) {
                $(this).css("font-weight", "600");
                $(this).find(".expand-icon-plus").addClass("hide-content");
                $(this).find(".expand-icon-plus").removeClass("show-content");
                $(this).find(".expand-icon-minus").addClass("show-content");
                $(this).find(".expand-icon-minus").removeClass("hide-content");
            } else {
                $(this).css("font-weight", "400");
                $(this).find(".expand-icon-plus").addClass("show-content");
                $(this).find(".expand-icon-plus").removeClass("hide-content");
                $(this).find(".expand-icon-minus").removeClass("show-content");
                $(this).find(".expand-icon-minus").addClass("hide-content");
            }
        });
    });

});

/*function checkScore() {
 grecaptcha.ready(function () {
 grecaptcha.execute('6LcOppMUAAAAADBY9a75avCRRIGe2d5LLbBpkD31', {action: 'submit'}).then(function (token) {
 $("#scrval").val(token);
 });
 });
 }*/

$(".header-menu-button").click(function() {
    $(this).addClass("active-navbar-navigation")
    $("#shop-navbar-bottom-link").trigger("click");
})

$("#close-callus-modal").click(function() {
    $("#callMePopUp").hide();
    localStorage.setItem("closeCallUsPopup", "false");
});

$(".callmepopupcontent").click(function() {
    $(".callus-popup-input-fields").show();
});
$(".callUsSubmit").click(function(e) {
    addCustomerCallBack(e)
});
$(".continue-browsing").click(function() {
    $(".post-form-submit").hide();
    $(".callmepopupcontent").css("padding", "0");
});

function addCustomerCallBack(e) {
    e.preventDefault();
    $('#categoryPageUrl').val(window.location.href);
    var data = $('#contactUsForm').serialize();
    var jqxhr = $.ajax({
        url: webAppC.addCustomerCallBackUri,
        type: "POST",
        cache: false,
        data: data,
        dataType: "json",
        statusCode: { // if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function(data) {
        if (data.success === "true") {
            $(".initialize-text").hide();
            $("#close-callus-modal").hide();
            $(".post-form-submit").show();
            $(".callus-popup-input-fields").hide();
        } else {
            Materialize.toast(data.message, 5000);
        }
    });
    jqxhr.fail(function(data) {});
}
$('input[name="gstCheckbox"]').click(function() {
    if ($('input[name="gstCheckbox"]:checked').length > 0) {
        $(".gst-registration-selectbox").show();
        $(".gstin-number").show();
    } else if ($('input[name="gstCheckbox"]:checked').length === 0) {
        $(".gst-registration-selectbox").hide();
        $(".gstin-number").hide();
    }
});
$("#gstInformationForm").submit(function(e) {
    e.preventDefault();
    var form = $(this);
    var uri = form.attr('action');
    $.ajax({
        url: uri,
        type: 'post',
        data: form.serialize(), // serializes the form's elements.
        success: function(response) {
            if (response.success === "true") {
                $('#errorMessage').hide();
                $('#gstInformationForm').hide();
                $('#successGstMessage').show();
                $('#successMessageText').html(response.message);

            } else {
                $('#errorMessage').show();
                $('#errorMessageText').text(response.message);
            }
        },

        complete: function(response) {

        },
        error: function(response) {

        }
    });
});

function WriteCookie() {
    if ($(".tm-pseudo").length > 0) {
        document.cookie = "asdfsnetdjjkdcore=1;max-age=" + (60 * 60 * 24 * 15) + ";path=/";
    }
}

function adVtrInt() {
    $.ajax({
        type: "GET",
        url: advstit,
        success: function(response) {
            if (response.status === true) {
                $("#cart_item").html(response.cartItemCount);
                if (response.currentCity !== null && response.currentCity !== 'undefined') {
                    $("#current_city").html(response.currentCity.currentCityName);
                }
                var item_carts = response.cartItemCount;
                if (item_carts > 0 && $('#cartItemsAjaxWrapper') !== null && $('#cartItemsAjaxWrapper').length) {
                    loadCartItems();
                    $("#cartItemsAjaxWrapper").show();
                }
            }
        },
        error: function(response) {},
        complete: function(response) {}
    });
}

$(document).ready(function() {
    if ($('.scrollspy').length > 0) {
        $('.scrollspy').scrollSpy({
            scrollOffset: 250,
            addClass: "active"
        });
        // Add scroll view on error/success message
        $(function() {
            $(window).scrollTop($('.card-panel').offset().top - 250);
        });

        //Add class on body on scrolling
        var lastScrollTop = 0;
        $(window).scroll(function(event) {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                $('body').addClass('scrolling_down');
                $('body').removeClass('scrolling_up');
            } else {
                $('body').addClass('scrolling_up');
                $('body').removeClass('scrolling_down');
            }
            lastScrollTop = st;
        });
    }
});

$('.saved-address-box').on('click', '.deleteAddress', function(e) {
    var result = confirm("Want to delete?");
    if (result) {
        var url = $(this).data('uri');
        e.preventDefault();
        $.ajax({
            cache: false,
            url: url,
            type: 'post',
            success: function(response) {
                if (response.success === "true") {
                    location.reload();
                }

            },
            complete: function(response) {

            },
            error: function(response) {
                alert("some error occured");
            }
        });
    }
});

function customerFeedBackYes() {
    $('#userfeedback').modal('close');
}

function showCustomerFeedbackForNo() {
    $("#customerFeedbackForNo").show();
    $("#cfb").hide();
}

function eCustomerFeedBackYes() {
    $("#feedbackDiv").hide();
}

function eshowCustomerFeedbackForNo() {
    $("#ecustomerFeedbackForNo").show();
    $("#ecfb").hide();
}

function saveCustomerFeedback(e) {
    e.preventDefault();
    var form = $(this).parent("div").parent("form");
    var url = form.attr('action');
    var data = $(this).parent("div").parent("form").serializeArray();
    var jsonData = {}
    //iterate over form elements   
    $.each(data, function(i, v) {
        if (v.value !== "") {
            jsonData[v.name] = v.value;
        }
        delete jsonData["undefined"];
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        url: url,
        type: "POST",
        cache: false,
        data: JSON.stringify(jsonData),
        dataType: "json",
        headers: {
            'pageUrl': window.location.href
        },
        success: function(response) {
            if (response.success === "true") {
                resetCustomerCategoryFeedbackForm();
                var toastHTML = "<div>Thank you for the valuable feedback.</div>";
                M.toast({
                    html: toastHTML
                });
            } else {
                toastHTML = "<div>" + response.message + "</div>";
                M.toast({
                    html: toastHTML
                });
            }
        },
        complete: function(response) {},
        error: function(response) {
            alert("something went wrong");
        }
    });
}

function resetCustomerCategoryFeedbackForm() {
    $('#userfeedback').modal('close');
    $("#customerFeedbackForNo").hide();
    $('#customerFeedbackNo').trigger("reset");
    $("#ecustomerFeedbackForNo").hide();
    $('#ecustomerFeedbackNo').trigger("reset");
    $("#feedbackDiv").hide();
}

//addons  category product hide and display
function categoryShowHide(index, size) {
    for (var i = 1; i <= parseInt(size); i++) {
        if (i === parseInt(index)) {
            $("#button_" + i).addClass("bg-color");
            $("#category_" + i).show();
        } else {
            $("#button_" + i).removeClass("bg-color");

            $("#category_" + i).hide();
        }
    }
}
$('.choose_relation li').click(function() {
    var spec = $('#relationId').find(":selected").val();
    var uri = $('#relationId').data('uri');
    uri = uri + spec;
    $.ajax({
        type: 'GET',
        url: uri,
        success: function(response) {
            if (response.success === "true") {
                $('#occasionId').html(response.html);
            }
        },
        error: function(response) {
            alert("Server error encountered");
        },
        complete: function(response) {

        }
    });
});
$('#relationId').change(function() {
    var spec = $('#relationId').find(":selected").val();
    var uri = $('#relationId').data('uri');
    uri = uri + spec;
    $.ajax({
        type: 'GET',
        url: uri,
        success: function(response) {
            if (response.success === "true") {
                $('#occasionId').html(response.html);
            }
        },
        error: function(response) {
            alert("Server error encountered");
        },
        complete: function(response) {

        }
    });
});
//Automatically Move Cursor to Next Field When Textbox Full
function movetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}

function saveRecipientFeedback() {
    var url = $('#feedbackResponseUrl').val();
    var data = $('.recipient-feedback-rating-form').serializeArray();
    var jsonData = {}
    //iterate over form elements   
    $.each(data, function(i, v) {
        if (v.value !== "") {
            jsonData[v.name] = v.value;
        }
        delete jsonData["undefined"];
    });
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        url: url,
        data: JSON.stringify(jsonData),
        success: function(response) {
            if (response.success === "true") {
                $(".feedbackDiv").remove();
                $(".feedbackSuccessDiv").html(response.html)
                $(".feedbackSuccessDiv").show();

            } else {
                $('.error-message').html(response.message);
            }
        }
    });
}

function loadCustomerGiftcard(custID) {
    $.ajax({
        url: customerGiftcard,
        type: 'get',
        data: {
            custID: custID
        },
        success: function(response) {
            if (typeof(response.data.status) !== 'undefined' && response.data.status === true) {
                $('#amountLabel').html(response.data.giftcardValue);
                $('#amountSpan').html(response.data.giftcardValue);
                $('#expiryDate').html(response.data.expiryDate);
                $('#userWalletModal').modal('open');
            }
        }
    });
}