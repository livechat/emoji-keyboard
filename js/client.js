const emojis = require('./emojis');
const LiveChat = require('@livechat/agent-app-widget-sdk'),
    $ = require('jquery-browserify'),
    parser = require('ua-parser-js');

window.EmojiKeyboard = {

    emojiDOM: $('.emoji-set').clone(),

    getOS: function(ua) {
        return new parser(ua).getOS().name.toLowerCase().replace(/\W/, '');
    },

    preapreEmojiKeyboard: function() {
        const that = this;
        $.each(emojis, function (category) {

            $emojies = "";
            $.each(this, function () {
                let unified = this.unified;
                unified = unified.split('-');
                let dec = [];
                $.each(unified, function () {
                    dec.push(parseInt(this, 16));
                });
                let emoji = String.fromCodePoint.apply(this, dec);
                $emojies += '<span class="emoji-single" data-emoji-code="' + emoji + '">' + emoji + '</span>';
            });

            $emojies = '<p class="emoji-category" id="' + category.toLowerCase() + '">' + $emojies + '</span>';

            that.emojiDOM.append($emojies);
        });

    },

    init: function () {
        const that = this;
        $(document).ready(function () {
            LiveChat.init({
                authorization: false
            });

            that.emojiDOM.on( "click", ".emoji-single", function() {
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

            that.preapreEmojiKeyboard();

            if(that.emojiDOM.find('.emoji-category').length === 0) {
                const OS = that.getOS(navigator.userAgent);
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
                $('.emoji-set').replaceWith(that.emojiDOM);
                $('.chat-plugin__menu, .emoji-set').show();
            }

            $('#loader').hide();
        });
    }
};

window.EmojiKeyboard.init();