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
    sideBar: {
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

        $('.menu .list li a').click(function () {
            $('.menu .list li.active').removeClass('active');
            $(this).parent().addClass("active");
        });

    },
    setMenuHeight: function (firstTime) {
        var leftHeight = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
        var rightHeight = $(window).height() - 70;
        var configs = $Admin.options.sideBar;
        var $menuScroll = $('.list');
        var $skinList = $('.right-side-bar .skins .skin-list');

        if (!firstTime) {
            $menuScroll.slimScroll({
                destroy: true,
            });
            $skinList.slimScroll({
                destroy: true,
            });
        }
        $menuScroll.slimScroll({
            height: leftHeight + "px",
            color: configs.scrollColor,
            size: configs.scrollWidth,
            borderRadius: configs.scrollBorderRadius,
            railBorderRadius: configs.scrollRailBorderRadius
        });
        $skinList.slimScroll({
            height: rightHeight + "px",
            color: configs.scrollColor,
            size: configs.scrollWidth,
            borderRadius: configs.scrollBorderRadius,
            railBorderRadius: configs.scrollRailBorderRadius
        })
        //Set Waves
        Waves.attach('.menu .list a', ['waves-block']);
        Waves.init();
    },

    checkWindowResize: function () {
        var $body = $('body');
        var width = $body.width();
        var $openCloseBar = $('.navbar .navbar-header .bars');
        
        if (width <= $Admin.options.sideBar.breakpointWidth) {
            $body.addClass('ls-closed');
            $openCloseBar.show();
        }
        else {
            $body.removeClass('ls-closed');
            if ($body.hasClass('ls-opened')) $body.removeClass('ls-opened');
            $openCloseBar.hide();
        }
    },
};

$Admin.navbar = {
    active: function () {
        var $body = $('body');
        var $openCloseBar = $('.navbar .navbar-header .bars');

        $openCloseBar.click(
            function () {
                $body.toggleClass('ls-opened');
            }
        );
    },
}

$Admin.rightSideBar = {
    active: function () {
        var $_this = this;
        var $rightSideBar = $('#right-side-bar');

        $('.js-right-sidebar').click(
            function () {
                $rightSideBar.toggleClass('open');
            }
        );
        $_this.renderSkinList();

        $('.skin-list li').click(function () {
            $('.skin-list li.active').removeClass('active');
            $(this).addClass("active");
        });
    },
    renderSkinList: function () {
        var $colors = $Admin.options.colors;
        var $skinList = $('.right-side-bar .skins .skin-list');
        var $html = '';

        $.each($colors, function ($key, $value) {
            $html += '<li class="">';
            $html += '<div class= "' + $key + '" style="background-color:' + $value + '"></div>';
            $html += '<span>' + $key + '</span>';
            $html += '<i class="material-icons">check</i>';
            $html += '</li>';
        });

        $skinList.html($html);
    },
}

var $searchBar = $('.search-bar');
$Admin.search = {
    active: function () {
        $('.js-search').click(() => {
            $searchBar.slideDown(300);
            $searchBar.css('display', 'inline-flex');
            $searchBar.find('input[type="text"]').focus();
        });
        $('.close-search').click(() => {
            $searchBar.slideUp(300);
            $searchBar.find('input[type="text"]').val('');
        });
        $searchBar.find('input[type="text"]').on('keyup', function (e) {
            if (e.keyCode == 27) {
                $searchBar.slideUp(200);
                $searchBar.find('input[type="text"]').val('');
            }
        });
    }
}


$Admin.rightSideBar.active();
$Admin.leftSideBar.active();
$Admin.search.active();
$Admin.navbar.active();