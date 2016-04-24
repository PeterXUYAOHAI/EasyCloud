/**
 * Created by Ibrahim on 4/14/2016.
 */
var App = (function () {

    function init(){
        RegisterListeners();
    }

    function RegisterListeners() {
        // $('.serviceProvider').click(function (event) {
        //     var service = $(this);
        //     var parent_div = service.parent();
        //     $("#service_selector div").removeClass("selected");
        //     parent_div.addClass("selected");
        //     console.log("clicked", parent_div);
        //     if (parent_div.attr("id") == "aws") {
        //         if(AWS.config.credentials == null){
        //             $("#keyForm").html(
        //                 "<div class=\"form-group\">"+
        //                 "<label id=\"publicKeyLabel\">AWS Public Key</label>"+
        //                 "<input id=\"awsPublicKey\" type=\"email\" class=\"form-control required\" placeholder=\"Public Key\" />"+
        //                 "</div>"+
        //                 "<div class=\"form-group\">"+
        //                 "<label for=\"publicKeyLabel\">AWS Secret Key</label>"+
        //                 "<input id=\"awsSecretKey\" type=\"password\" class=\"form-control required\" placeholder=\"Secret Key\" />"+
        //                 "</div>");
        //             $('#myModalNorm').modal('show');
        //         }
        //     }
        // });
        //
        // //  Reset the error messages in the modal on close
        // $('#myModalNorm').on('hidden.bs.modal', function () {
        //     $("#error-message").html("");
        // })
    }

    // wrapper function to  block element(indicate loading)
    function blockUI(options) {
        options = $.extend(true, {}, options);
        var html = '';
        if (options.animate) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
        } else if (options.iconOnly) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="/img/loading-spinner-grey.gif" align=""></div>';
        } else if (options.textOnly) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
        } else {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="/img/loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
        }

        if (options.target) { // element blocking
            var el = $(options.target);
            if (el.height() <= ($(window).height())) {
                options.cenrerY = true;
            }
            el.block({
                message: html,
                baseZ: options.zIndex ? options.zIndex : 1000,
                centerY: options.cenrerY !== undefined ? options.cenrerY : false,
                css: {
                    top: '10%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                    opacity: options.boxed ? 0.05 : 0.1,
                    cursor: 'wait'
                }
            });
        } else { // page blocking
            $.blockUI({
                message: html,
                baseZ: options.zIndex ? options.zIndex : 1000,
                css: {
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                    opacity: options.boxed ? 0.05 : 0.1,
                    cursor: 'wait'
                }
            });
        }
    }

    // Wrapper function to un-block element(finish loading)
    function unblockUI(target) {
        if (target) {
            $(target).unblock({
                onUnblock: function() {
                    $(target).css('position', '');
                    $(target).css('zoom', '');
                }
            });
        } else {
            $.unblockUI();
        }
    }

    function startPageLoading(options) {
        if (options && options.animate) {
            $('.page-spinner-bar').remove();
            $('body').append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
        } else {
            $('.page-loading').remove();
            $('body').append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (options && options.message ? options.message : 'Loading...') + '</span></div>');
        }
    }

    function stopPageLoading() {
        $('.page-loading, .page-spinner-bar').remove();
    }

    return{
        init: init,
        blockUI: blockUI,
        unblockUI: unblockUI
    }
});