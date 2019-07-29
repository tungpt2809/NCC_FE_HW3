$Admin = {};
$Admin.options = {
    colors: {
        red: '#F44336',
        pink: '#E91E63',
        purple: '#9C27B0',
        deepPurple: '#673AB7',
        indigo: '#3F51B5',
        blue: '#2196F3',
        lightBlue: '#03A9F4',
        cyan: '#00BCD4',
        teal: '#009688',
        green: '#4CAF50',
        lightGreen: '#8BC34A',
        lime: '#CDDC39',
        yellow: '#ffe821',
        amber: '#FFC107',
        orange: '#FF9800',
        deepOrange: '#FF5722',
        brown: '#795548',
        grey: '#9E9E9E',
        blueGrey: '#607D8B',
        black: '#000000',
        white: '#ffffff'
    },
    leftSideBar: {
        scrollColor: 'rgba(0,0,0,0.5)',
        scrollWidth: '4px',
        scrollBorderRadius: '0',
        scrollRailBorderRadius: '0',
        breakpointWidth: 1170,
    },
};

var $leftSideBar = $('#left-side-bar');
$Admin.leftSideBar = {
    active: function () {
        $_this = this;
        $_this.checkWindowResize();
        $_this.setMenuHeight(true);

        $(window).resize(function () {
            $_this.checkWindowResize();
            $_this.setMenuHeight(false);
        });
    },
    setMenuHeight: function (firstTime) {
        var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
        var configs = $Admin.options.leftSideBar;
        var $menuScroll = $('#slimScrollOfMenu');

        if (!firstTime) {
            $menuScroll.slimscroll({
                destroy: true
            });
        }

        $menuScroll.slimscroll({
            height: height + "px",
            color: configs.scrollColor,
            size: configs.scrollWidth,
            borderRadius: configs.scrollBorderRadius,
            railBorderRadius: configs.scrollRailBorderRadius
        });
    },

    closeSideBar: function () {
        $leftSideBar.addClass('sidebar-closed');
        $leftSideBar.css('left', '-999px');
    },
    openSideBar: function () {
        $leftSideBar.removeClass('sidebar-closed');
        $leftSideBar.css('left', '0');
    },
    checkWindowResize: function () {
        var $body = $('body');
        var width = $body.width();
        var $openCloseBar = $('.navbar .navbar-header .bars');
        if (width <= $Admin.options.leftSideBar.breakpointWidth) {

            if (!$leftSideBar.hasClass('sidebar-closed')) {
                // $leftSideBar.addClass('sidebar-closed');
                // $leftSideBar.css('left', '-300px');
                $(this).closeSideBar();
            }
            $openCloseBar.show();
        }
        else {
            // $leftSideBar.removeClass('sidebar-closed');
            // $leftSideBar.css('left', '0');
            $(this).openSideBar();
            $openCloseBar.hide();
        }        
        $openCloseBar.click(
            function () {
                if ($leftSideBar.hasClass('sidebar-closed')) {
                    $leftSideBar.removeClass('sidebar-closed');
                    $leftSideBar.css('left', '0');
                }
                else {
                    $leftSideBar.addClass('sidebar-closed');
                    $leftSideBar.css('left', '-300px');
                }
            }
        );
    },
};


var $searchBar = $('.search-bar');
$Admin.search = {
    active: function () {
        $('.js-search').click(() => {
            $searchBar.slideDown(200);
            $searchBar.css('display', 'inline-flex');
            $searchBar.find('input[type="text"]').focus();
        });

        $('.close-search').click(() => {
            $searchBar.slideUp(200);
            $searchBar.find('input[type="text"]').val('');
        });
    }
}

$Admin.leftSideBar.active();
$Admin.search.active();
