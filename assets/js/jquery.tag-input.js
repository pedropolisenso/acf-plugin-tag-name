(function($){
  $.fn.tagInput = function() {
    return this.each(function() {
      var oldKey = 0;
      var newKey;
      var TABKEYTAB = 9;
      var TABKEYENTER = 13;

      var parentName = 'app-' + Date.now();
      var tagHereName = 'tagHere-' + Date.now();

      var $input = $(this);
      $input.wrap('<div id="' + parentName + '" class="app"/>');
      
      var $parentInput = $input.parent();
      $parentInput.append('<div id="'+ tagHereName +'"/>');
      
      var dataValue = $input.data('value') ? $input.data('value') : [];
      var dataName = $input.data('name');
         
      var $inputHidden = $('<input type="hidden" name="'+ dataName +'" />');
      $inputHidden.val(JSON.stringify(dataValue));
      $parentInput.prepend($inputHidden);
      
      var $appendHere = $("#" + tagHereName);
      var values = [];
      dataValue.map(function(value) {
        addTag(value);
      });

      $input.keydown(function(e){
        var $thisInput = $(this);
        if(e.keyCode == TABKEYTAB || e.keyCode == TABKEYENTER) {
          e.preventDefault();
          if($thisInput.val() == '' || $thisInput.val() == ' ') {
            return false;
          }
          $thisInput.val().split(',').map(function(val){
            addTag($.trim(val));
          });
          $thisInput.val('');
          $inputHidden.val(JSON.stringify(values));
        }
      });
    
      function addTag(value) {
        if ( values.indexOf(value) >= 0) {
          return false;
        }

        var $tag = $("<div class='tag'/>");
        var $a = $("<a href='javascript: void(0);' />");
        var $span = $("<span />");

        $('<i class="fa fa-times" aria-hidden="true"></i>').appendTo($a);
        
        $span.text(value);
        
        $a.bind('click', function(e){
          e.preventDefault();
          $(this).parent().remove();
          $(this).unbind('click');
          var idx = values.indexOf(value);
          values.splice(idx, 1);
          $inputHidden.val(JSON.stringify(values));
        });
        
        $a.appendTo($tag);
        
        $span.appendTo($tag);
        $tag.appendTo($appendHere);

        values.push(value);
      }      
    });
  }

})(jQuery);