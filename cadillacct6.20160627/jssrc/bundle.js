"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require(["http://cdn01.51autoimg.com/51auto/js/lib/jquery.min.js", "http://cdn01.51autoimg.com/apps/zhuanti.51auto.com/citroen.20160608/js/idangerous.swiper.js"], function () {
    var Cadillac = function () {
        function Cadillac() {
            _classCallCheck(this, Cadillac);

            // 点击事件
            this.eleClick();
            // 加载联动select
            this.selects();
            // 统计监测
            this.statisticsFun();
            // 轮播图
            this.swiper();
            // 提交表单
            this.present();
        }

        // 点击事件


        _createClass(Cadillac, [{
            key: "eleClick",
            value: function eleClick() {
                // 5系、非5系tab切换
                $(".tabs").on('click', 'div', function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    if ($(this).index() == 0) {
                        $(".tit1").show();
                        $(".tit2").hide();
                        $(".sub-btn").removeClass('sub-btn2');
                    } else {
                        $(".tit1").hide();
                        $(".tit2").show();
                        $(".sub-btn").addClass('sub-btn2');
                    }
                });
            }

            // 加载联动select

        }, {
            key: "selects",
            value: function selects() {
                require(["http://cdn01.51autoimg.com/apps/zhuanti.51auto.com/cadillacct6.20160627/js/selects.min.js"]);
            }

            //将FORM提交格式化为JSON对象

        }, {
            key: "getFormJson",
            value: function getFormJson(formName) {
                var json = {},
                    key = "";
                $.each($("#" + formName).serializeArray(), function (i, m) {
                    key = m.name;
                    json[key] = m.value;
                });
                return json;
            }
        }, {
            key: "present",


            // 提交
            value: function present() {
                var _this = this;

                // 表单提交检查
                var checkForm = function checkForm() {
                    // 是否提交
                    var isSubmit = true;
                    // 验证正则表达式
                    var regularExp = function regularExp(name, expression) {
                        var value = $("#" + name).val().replace(/\s/g, '');
                        return expression.test(value);
                    };
                    // 去除空格
                    var getText = function getText(name) {
                        return $("#" + name).val();
                    };
                    var nameArr = ["province", "citys", "dealer"];
                    //验证表单方法
                    var formValidate = function formValidate(option) {
                        //验证5系车况选项
                        if ($(".tab-left").hasClass('active') && $(".cell input[type='radio']:checked").length < 5) {
                            isSubmit = false;
                            alert("请完整勾选您的车况！");
                            return false;
                        }
                        if (!option.length) {
                            isSubmit = false;
                            return false;
                        }
                        $.each(option, function (i, m) {
                            if (!m.fun(m.name, m.reg)) {
                                isSubmit = false;
                                alert(m.msg);
                                return false;
                            } else if (nameArr.includes(m.name)) {
                                if (m.fun(m.name) == -1) {
                                    isSubmit = false;
                                    alert(m.msg);
                                    return false;
                                }
                            }
                        });
                    };
                    // 验证对象
                    var validateArr = [{
                        // 姓名
                        name: "name",
                        fun: regularExp,
                        reg: /^[a-zA-Z\u4e00-\u9fa5]{2,25}$/,
                        msg: '请输英文或中文姓名，必须大于2个字符，小于25个字符！'
                    }, {
                        // 手机号码
                        name: "tel",
                        fun: regularExp,
                        reg: /(^1[3|4|5|7|8][0-9]\d{8}$)/,
                        msg: '请输入正确的11位手机号码！'
                    }, {
                        // 省份
                        name: "province",
                        fun: getText,
                        msg: '请选择您所需报名省份！'
                    }, {
                        // 城市
                        name: "citys",
                        fun: getText,
                        msg: '请选择您所需报名城市！'
                    }, {
                        // 经销商
                        name: "dealer",
                        fun: getText,
                        msg: '请选择您所需报名经销商！'
                    }];
                    // 提交验证
                    formValidate(validateArr);
                    return isSubmit;
                };

                // 赋值字段
                var AssignmentField = function AssignmentField() {
                    // 拼接note字段
                    var isFive = "[5系] ";
                    // 车况选项
                    var radiosStr = "";
                    if ($(".tab-right").hasClass('active')) {
                        isFive = "[非5系] ";
                    } else {
                        for (var i = 0, len = $(".cell input[type='radio']:checked").length; i < len; i++) {
                            radiosStr += $(".cell input[type='radio']:checked").eq(i).next().html();
                        }
                        radiosStr = "[" + radiosStr + "] ";
                    }
                    var noteStr = isFive + radiosStr + "地区:" + $("#province").val() + $("#citys").val() + " 经销商:" + $("#dealer").val();
                    // 赋值隐藏域
                    $("#sa-name").val($("#name").val());
                    $("#sa-telephone").val($("#tel").val());
                    $("#sa-note").val(noteStr);
                };

                // 表单重置
                var formReset = function formReset() {
                    var hiddenId = ["name", "sa-name", "tel", "sa-telephone", "sa-note"];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = hiddenId[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var eleId = _step.value;

                            $("#" + eleId).val("");
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    $(".cell input[type='radio']:checked").attr("checked", false);
                    var nameArr = ["province", "citys", "dealer"];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = nameArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _eleId = _step2.value;

                            $("#" + _eleId).val(-1);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    $("#dealer").html("<option value=\"-1\">请选择经销商</option>");
                };

                // 提交表单
                var formSubmit = function formSubmit(formId) {
                    if (checkForm()) {
                        AssignmentField();
                    } else {
                        return false;
                    }
                    var json = _this.getFormJson(formId);
                    $.ajax({
                        url: 'http://admin2.51auto.com:8080/cms/signupapi/',
                        type: 'GET',
                        dataType: 'jsonp',
                        crossDomain: true,
                        jsonp: "callbackparam",
                        jsonpCallback: "success",
                        headers: {
                            "Accept": "application/json; charset=utf-8",
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        data: json,
                        error: function error(e) {},
                        success: function success(result) {
                            alert("报名" + result.msg + "！");
                            formReset();
                        }
                    });
                };

                // 确认按钮
                $("body").on('click', '.sub-btn', function () {
                    formSubmit("form-info");
                });
            }

            // 轮播图

        }, {
            key: "swiper",
            value: function swiper() {
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: 3000,
                    direction: 'horizontalspeed',
                    loop: true,
                    autoplayDisableOnInteraction: false
                });
                $('.swiper-button-prev').on('click', function (e) {
                    e.preventDefault();
                    mySwiper.swipePrev();
                });
                $('.swiper-button-next').on('click', function (e) {
                    e.preventDefault();
                    mySwiper.swipeNext();
                });
            }

            // 统计代码

        }, {
            key: "statisticsFun",
            value: function statisticsFun() {
                // 获取页面参数，进行参数处理
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

                // 统计监测代码
                var _hmt = _hmt || [];
                (function () {
                    var hm = document.createElement("script");
                    hm.src = "//hm.baidu.com/hm.js?954c42feaba402a134e4d89ae31cc766";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                })();

                // GA
                (function (i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r;
                    i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments);
                    }, i[r].l = 1 * new Date();
                    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m);
                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
                ga('create', 'UA-254381-1', 'auto');
                ga('send', 'pageview');
            }
        }]);

        return Cadillac;
    }();

    ;
    $(function () {
        return new Cadillac();
    });
});
