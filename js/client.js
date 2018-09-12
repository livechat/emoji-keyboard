const LiveChat = require('@livechat/agent-app-widget-sdk'),
    $ = require('jquery-browserify'),
    ifemoji = require('if-emoji'),
    parser = require('ua-parser-js');

window.EmojiKeyboard = {

    getOS: function(ua) {
        return new parser(ua).getOS().name.toLowerCase().replace(/\W/, '');
    },

    printEmojiCategory: function(emojisObject, category) {
        let elementID = category.toLowerCase(),
            anyEmojiSupported = 0;
        $('.emoji-set').append('<p class="emoji-category" id="' + elementID + '"><span class="emoji-header">' + category + '</span></p>');
        $.each(emojisObject[category], function () {
            let unified = this.unified;
            unified = unified.split('-');
            let dec = [];
            $.each(unified, function () {
                dec.push(parseInt(this, 16));
            });
            let emoji = String.fromCodePoint.apply(this, dec);
            if (ifemoji(emoji)) {
                $('#' + elementID).append('<span class="emoji-single" data-emoji-code="' + emoji + '">' + emoji + '</span>');
                anyEmojiSupported++;
            }
        });
        if(anyEmojiSupported === 0)
            $("#"+elementID).remove();
    },

    init: function () {
        LiveChat.init({
            authorization: false
        });

        $('.emoji-set').on( "click", ".emoji-single", function() {
            LiveChat.putMessage($(this).data('emoji-code'));
        });

        $.fn.isInViewport = function() {
            let elementTop = $(this).offset().top;
            let elementBottom = elementTop + $(this).outerHeight();

            let viewportTop = $(window).scrollTop();
            let viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;
        };

        $(window).on('resize scroll', function() {
            let stop = false;
            $('.emoji-category').each(function() {
                if (stop === false) {
                    let id = $(this).attr('id').toLowerCase();
                    $('.chat-plugin__menu__item').removeClass('chat-plugin__menu__item--active');
                    if ($(this).isInViewport()) {
                        $('li[data-target-id="'+id+'"]').addClass('chat-plugin__menu__item--active');
                        stop = true;
                    }
                }
            });
        });

        $.each(emojis, function (index) {
            EmojiKeyboard.printEmojiCategory(emojis, index);
        });

        if($('.emoji-category').length === 0) {
            const OS = this.getOS(navigator.userAgent);
            let link;
            switch (OS) {
                case 'windows':
                    link = 'http://caniemoji.com/microsoft-windows/';
                    break;
                case 'macos':
                    link = 'http://caniemoji.com/os-x/';
                    break;
                default:
                    link = 'http://caniemoji.com/';
                    break;
            }

            $('#os-support').attr('href', link);
            $('.emoji-unsupported').show();
            $('.chat-plugin__menu').remove();
        } else {
            $('.chat-plugin__menu, .emoji-set').show();
        }

        $('.app__loading').hide();

    }
};

window.EmojiKeyboard.init();