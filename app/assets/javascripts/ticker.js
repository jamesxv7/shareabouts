$.widget("ui.ticker", (function() {
  return {
    options : {
      url       : "",   // should return HTML of lis, like "<li>thing</li><li>thing2</li>"
      frequency : 5000, // ms between checking for new items
      limit     : 10    // max number of items to add each refresh
    },
  
    /**
     * Constructor
     */
    _create : function() {
      var self = this;
      
      this.list = $( "<ul>" ).appendTo( this.element );
      this.refresh();
    },
    
    refresh : function(utc) {
      var self = this;

      $.ajax({
        type : 'GET',
        url  : this.options.url,
        data : {utc:utc, limit:this.options.limit}, 
        complete : function(data, status){
          self.list.prepend(data.responseText);
          
          var date = new Date(),
              utc  = date.getTime() + date.getTimezoneOffset() * 60000;
              
          self.timeout = window.setTimeout(function(){
            self.refresh(utc);
          }, self.options.frequency);
        }, 
        dataType: "html"
      });
    }
  };
})());