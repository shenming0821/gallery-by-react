function testAnim(ele,animateStyle) {
    $(ele).addClass(animateStyle + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass(animateStyle + ' animated');
    });
};


testAnim("#test1","flash");

testAnim("#test2","flash infinite hinge");