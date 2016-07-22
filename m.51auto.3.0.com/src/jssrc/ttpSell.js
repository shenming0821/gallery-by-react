require([
    "http://cdn01.51autoimg.com/51auto/js/lib/jquery.min.js",
    "http://192.168.2.181/apps/zhuanti.51auto.com/xuetielong.20160518/js/swiper-3.3.1.min.js"
], function () {
    class SellPage {
        constructor() {
            //点击事件
            this.eleClick();
            //轮播图
            this.swiper();
            // 提交表单
            this.present();
        }
        //点击事件
        eleClick() {
            //返回顶部按钮
            let timer;
            let toTop = () => {
                clearTimeout(timer);
                let offsetTop = $('.g-ad').offset().top;
                let currentTop = $(document).scrollTop();
                timer = setTimeout(function () {
                    if (currentTop >= offsetTop) {
                        $('.j-to-top').show();
                    } else {
                        $('.j-to-top').hide();
                    }
                }, 100);
            }
            $(document).scroll(function () {
                toTop();
            });
            $('.j-to-top').on('touchend', function () {
                $("body").animate({
                    scrollTop: 0
                }, 500);
            });

            //地区点击事件
            $('.selected-city').on('touchend', function (e) {
                e.preventDefault();
                cityHighlight();
                $('.city-list').toggle();
                $(this).find('.arrow').toggleClass('arrow-rotate');
            });
            $('body').on('click', function (e) {
                var ele = e.target;
                if (!$(ele).hasClass("selected-city")) {
                    $('.city-list').hide();
                    $('.selected-city').find('.arrow').removeClass('arrow-rotate');
                }
            });
            //显示地区为所点击地区
            $('.city-list').on('touchend', 'li', function () {
                $('.city-name').text($(this).text());
            });
            //地区选择框高亮
            let cityHighlight = () => {
                let currentCity = $('.city-name').text().replace(/\s/g, '');
                for (let i = 0, len = $('.city-list li').length; i < len; i++) {
                    if ($('.city-list li').eq(i).text() == currentCity) {
                        $('.city-list li.active').removeClass('active');
                        $('.city-list li').eq(i).addClass('active');
                    }
                }
            };

            //常见问题模块点击效果
            $('.m-help').on('touchend', 'dt', function () {
                let $dd = $(this).siblings('dd');
                if ($dd.hasClass('show')) {
                    $dd.removeClass('show');
                    $(this).find('.arrow').removeClass('arrow-rotate');
                } else {
                    $('dd.show').removeClass('show');
                    $('.m-help').find('.arrow').removeClass('arrow-rotate');
                    $dd.addClass('show');
                    $(this).find('.arrow').addClass('arrow-rotate');
                }
            });
        }

        //轮播图
        swiper() {
            let mySwiper = new Swiper('.swiper-container', {
                autoplay: 5000,
                pagination: '.swiper-pagination',
                loop: true,
                autoplayDisableOnInteraction: false
            });
        }

        present() {
            // 表单提交检查
            let checkForm = () => {
                // 是否提交
                let isSubmit = true;
                // 验证正则表达式
                let regularExp = (id, expression) => {
                    var $ele = $("#" + id);
                    let text;
                    if ($ele.val() != "") {
                        text = $ele.val();
                    } else {
                        text = $ele.html();
                    }
                    let value = text.replace(/\s/g, '');
                    return expression.test(value);
                }
                //验证表单方法
                let formValidate = (option) => {
                    if (!option.length) {
                        isSubmit = false;
                        return false;
                    }
                    $.each(option, function (i, m) {
                        if (!m.fun(m.id, m.reg)) {
                            isSubmit = false;
                            alert(m.msg);
                            return false;
                        }
                    });
                }
                // 验证对象
                let validateArr = [
                    {
                        // 城市
                        id: "city-name",
                        fun: regularExp,
                        reg: /\S/,
                        msg: '请选择您所需报名城市！'
                    }, {
                        // 手机号码
                        id: "u-mobile",
                        fun: regularExp,
                        reg: /(^1[3|4|5|7|8][0-9]\d{8}$)/,
                        msg: '请输入正确的11位手机号码！'
                    }
                ]
                // 提交验证
                formValidate(validateArr);
                return isSubmit;
            }

            // 赋值字段
            let AssignmentField = () => {
                // 赋值隐藏域
                // $("#name").val('车主M站');
                $("#mobile").val($("#u-mobile").val());
                // $("#regdate").val("已上牌");
                $("#vehicle").val("品牌");
                $("#zoneName").val($('.city-name').text());
            };

            // 表单重置
            let formReset = () => {
                console.log("reset");
                $('#u-form')[0].reset();
                let eleId = ['name', 'mobile', 'regdate', 'vehicle', 'zoneName'];
                for (let v of eleId) {
                    $('#' + v).val("")
                }
            }

            // 提交表单
            let formSubmit = (formId) => {
                if (checkForm()) {
                    AssignmentField();
                } else {
                    return false;
                }
                // console.log($('#form').serialize());
                $('#form').submit();
                // console.log($('#form').serialize());
                // $.ajax({
                //     url: 'http://openapi.ttpai.cn/api/hmc/v1.0/signup',
                //     type: 'GET',
                //     data: $('#form').serialize(),
                //     dataType: 'jsonp',
                //     success: function (result) {
                //         $('#form').submit();
                //         console.log(result);
                //         // formReset();
                //     }
                // });
            }

            // 确认按钮
            $("body").on('click', '.j-sub-btn', function () {
                formSubmit("form-info");
            });
        }
    }
    $(() => {
        new SellPage;
    });
});