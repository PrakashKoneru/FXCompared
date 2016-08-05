var Reflux=require("reflux");
var Api=('../utils/api');
var Actions=require('./actions');

module.exports=Reflux.createStore({
   listenables:[Actions],
    getData : function(){
        return Api.get()
            .then(function(json){
                this.data=json.query.results.rate;
                this.triggerChange();
            }.bind(this));

    },
    triggerChange: function(){
        this.trigger('change',this.data);
    }
});