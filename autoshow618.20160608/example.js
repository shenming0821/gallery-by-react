require([
    "http://cdn01.51autoimg.com/51auto/js/lib/jquery.min.js",
    "http://cdn05.51autoimg.com/apps/2015.51auto.com/js/page.min.js"
], function(jQuery, page) {
    var start = function() {
        /*统计代码*/
        this.statisticsFun();
        //点击事件
        this.eleClick();
        /*转化json对象*/
        this.getFormJson();
        /*提交*/
        this.present();
    };

    //将FORM提交格式化为JSON对象
    start.prototype.getFormJson = function(formName) {
        var json = {},
            key = "";
        $.each($("#" + formName).serializeArray(), function(i, m) {
            key = m.name;
            json[key] = m.value;
        });
        return json;
    };

    //提交
    start.prototype.present = function() {
        var root = this;

        //表单提交检查
        var checkForm = function() {
            //是否提交
            var isSubmit = true;
            //验证正则表达式
            var regularExp = function(name, expression) {
                var value = $("#" + name).val();
                return expression.test(value);
            };
            //表单验证方法
            var formValidationFun = function(option) {
                if (!option.length) {
                    isSubmit = false;
                    return false;
                }
                $.each(option, function(i, m) {
                    if (m.name == 'car-price' || m.name == 'dealer') {
                        var value = $('#' + m.name).val();
                        if (!value) {
                            isSubmit = false;
                            alert(m.msg);
                            return false;
                        }
                    } else {
                        if (!m.fun(m.name, m.value)) {
                            isSubmit = false;
                            alert(m.msg);
                            return false;
                        }
                    }
                });
            }; //验证对象
            var addArray = [{
                //姓名
                name: "name",
                fun: regularExp,
                value: /^[a-zA-Z\u4e00-\u9fa5]{2,25}$/,
                msg: '请输入正确的英文或中文姓名！'
            }, {
                //手机号码
                name: "phone",
                fun: regularExp,
                value: /(^1[3|4|5|7|8][0-9]\d{8}$)/,
                msg: '请输入正确的11位手机号码！'
            }, {
                //车型
                name: "car-price",
                msg: '请选择您的意向车价！'
            }];
            //提交验证
            formValidationFun(addArray);
            return isSubmit;
        };
        $('body').on('click', '#submit_btn', function() {
            var note = '意向车价：' + $('#car-price').val();
            formSubmit("signupForm", note, "note");
        });

        var formSubmit = function(formId, infoText, nodeId) {
            if (!checkForm()) return false;
            var noteVal = "线索:# " + infoText;
            $("#" + nodeId).val(noteVal);
            var json = root.getFormJson(formId);
            $.ajax({
                url: 'http://admin2.51auto.com:8080/cms/signupapi/',
                type: 'GET',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: "callbackparam",
                jsonpCallback: "success",
                timeout: 30000,
                headers: {
                    "Accept": "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: json,
                error: function(e) {
                    // console.log("error");
                },
                success: function(result) {
                    document.getElementById(formId).reset();
                    alert("报名成功!");
                }
            });
        };
    };

    //点击事件
    start.prototype.eleClick = function() {
        $('body').on('click', '.apply-box', function () {
            $('.apply-module').hide();
            $('body').removeClass('cover');
        });

        $('body').on('click', '.apply-btn', function () {
            $('body').addClass('cover');
            $('.apply-module').show();
        });

        $('body').on('click', '.tab-ctl li', function () {
            var self = $(this);
            var idx = self.index() + 1;
            $('.tab-ctl').removeClass('tab-1 tab-2 tab-3 tab-4').addClass('tab-' + idx);

            $('.tab-box').eq(idx-1).addClass('active').siblings().removeClass('active');
        })
    };

    //统计代码
    start.prototype.statisticsFun = function() {
        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
         获取页面参数，进行参数处理
         -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        var location = window.location.toString();
        var locationSection = location.split("?");
        if (locationSection.length > 1) {
            var params = locationSection[1].split("&");
            var output = "";
            for (var p = 0; p < params.length; p++) {
                var keyValue = params[p].split("=");
                if (output != "") output += " ";
                if (keyValue[0] == "utm_source" || keyValue[0] == "utm_medium" || keyValue[0] == "utm_term" || keyValue[0] == "utm_content" || keyValue[0] == "utm_campaign") output += decodeURIComponent(keyValue[1]);
            }
            $("#resource").val(output);
        }

        /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
         统计监测代码
         -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?954c42feaba402a134e4d89ae31cc766";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();

        // GA
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;



            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-254381-1', 'auto');
        ga('send', 'pageview');
    };

    $(function() {
        new start;
    })
});