// 判断当前是否是IE浏览器（IE6-11）
// 因IE6/7已做特殊处理，在此不再过滤。
if("ActiveXObject" in window){
  $('input[placeholder],textarea[placeholder]').each(function() {
    var $this = $(this),
        txt_placeholder = $this.attr('placeholder');

    if(this.type == 'hidden') return true;
    // 初始化值
    if($this.val() === '') {
      // 此处的txt-placeholder就是用来设置placeholder文本颜色的。
      $this.val(txt_placeholder).addClass('txt-placeholder');
    }

    $this.off('.placeholder');
    // 获得焦点事件
    $this.on('focus.placeholder', function() {
      if($this.val() === txt_placeholder) {
        $this.val('').removeClass('txt-placeholder');
      }
    })
    // 失去焦点事件
    .on('blur.placeholder', function() {
      if($this.val() === '') {
        $this.val(txt_placeholder).addClass('txt-placeholder');
      }
    });
  });
}