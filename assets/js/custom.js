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
        black: '#000000'
    },
    sideBar: {
        scrollColor: 'rgba(0,0,0,0.5)',
        scrollWidth: '4px',
        scrollBorderRadius: '0',
        scrollRailBorderRadius: '0',
        breakpointWidth: 1170,
    },
};

let $leftSideBar = $('#left-side-bar');
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
        let leftHeight = ($(window).height() - $('.legal').outerHeight() - $('.user-info').outerHeight() - $('.navbar').innerHeight());
        let rightHeight = ($(window).height() - $('.right-side-bar .nav-tabs').outerHeight() - $('.navbar').innerHeight() - 20);
        let configs = $Admin.options.sideBar;
        let $menuScroll = $('.list');
        let $skinList = $('.right-side-bar .skins .skin-list');

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
        let $body = $('body');
        let width = $body.width();
        let $openCloseBar = $('.navbar .navbar-header .bars');

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
        let $body = $('body');
        let $openCloseBar = $('.navbar .navbar-header .bars');

        $openCloseBar.click(
            function () {
                $body.toggleClass('ls-opened');
            }
        );
    },
}

$Admin.rightSideBar = {
    active: function () {
        let $_this = this;
        let $rightSideBar = $('#right-side-bar');

        $('.js-right-sidebar').click(
            function () {
                $rightSideBar.toggleClass('open');
            }
        );
        $_this.renderSkinList();
        $_this.changeTheme();

        $('.skin-list li').click(function () {
            $('.skin-list li.active').removeClass('active');
            $(this).addClass("active");
        });
    },
    renderSkinList: function () {
        let $colors = $Admin.options.colors;
        let $skinList = $('.right-side-bar .skins .skin-list');
        let $html = '';

        $.each($colors, function ($key, $value) {
            $html += '<li>';
            $html += '<div class= "' + $key + '"></div>';
            $html += '<span>' + $key + '</span>';
            $html += '<i class="material-icons">check</i>';
            $html += '</li>';
        });

        $skinList.html($html);
    },
    changeTheme: function () {
        let $colors = $Admin.options.colors;
        $.each($colors, function ($key, $value) {
            
            $('.' + $key).parent().click(function () {
                $('body').get(0).style.setProperty('--nav-bg-color', $value);
                $('body').get(0).style.setProperty('--general-bg-color', $value);
                $('body').get(0).style.setProperty('--menu-item-active-color', $value);
                
            });
        });
    }
}

let $searchBar = $('.search-bar');
$Admin.search = {
    active: function () {
        $('.js-search').click(() => {
            $searchBar.addClass('open');
            $searchBar.find('input[type="text"]').focus();
        });
        $('.close-search').click(() => {
            $searchBar.removeClass('open');
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
