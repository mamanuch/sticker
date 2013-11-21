$(function() {
		//var event = event || window.event;		
		var Sticker = Backbone.Model.extend({
			defaults: {
				usertext: "",
				left: "",
				top: ""
				
			}			
		}),

		StickerCollection = Backbone.Collection.extend({
			initialize: function() {
			},
			
			model: Sticker
		}),					
		
		StickerView = Backbone.View.extend({
			initialize: function() {
				this.model.on("change", this.render, this);
				
				var event = event || window.event;		
				
				function left(model, event) {
					//console.log("function left");
					if(event.pageX<100) {				
						model.set({"left": 0+"px"});
														
					}else if(event.pageX>900){
						model.set({"left": 800+"px"});						
					}else{
						model.set({"left": event.pageX-100+"px"});						
					}												
					
				};
				function top(model, event) {
					//console.log("function top");
					if(event.pageY<75) {				
						model.set({"top": 0+"px"});
														
					}else if(event.pageY>425){
						model.set({"top": 350+"px"});						
					}else{
						model.set({"top": event.pageY-75+"px"});						
					};
				};								
				var model = this.model;
				left(model, event);
				top(model, event);						
			},
			
			events: {
				"click": "stopPropagation",
				"contextmenu": "remove",
				"dblclick": "changeContent",
				"blur": "notActive"				
			},			
			
			className: "sticker",
			
			template: _.template($("#sticker-tpl").html()),
			
			render: function() {
			
				this.el.style.left = this.model.get("left");		 	
				this.el.style.top = this.model.get("top");			
				this.$el.html(this.template(this.model.toJSON()));	
				//console.log("StickerView is rendering");
				
				return this;	
			},		
			
			stopPropagation: function(event) {				
				event.stopPropagation();							
			},						

			changeContent:function(event) {					
				this.$el.attr("contentEditable", true);				
				event.stopPropagation();								
			},							
			
			remove: function(event) {								
				event.preventDefault();		
				this.$el.remove();
				this.model.destroy();								
			},
			
			notActive: function(event) {					
				var valueview = this.$el.html();		
				
				event.preventDefault();		
				this.$el.attr("contentEditable", false);				
				this.model.set("usertext", valueview);					
			},		
			
		}),
			

		StickerCollectionView = Backbone.View.extend({			
			initialize: function() {
				this.collection = new StickerCollection();				
				this.collection.on("add", this.addSticker, this);
				this.collection.on("change", this.changeCollection, this);
			}, 
						
			el: $("#container"),				
		
			events: {
				"click": "render"				
			},
						
			addSticker: function(sticker) {
					var view = new StickerView({model: sticker});
					this.$el.append(view.render().el);						
					//console.log(this.collection);
			},
			
			changeCollection: function(sticker) {					
					//console.log("changeCollection");
			},
			
			render: function() {	
				var newstiker = new Sticker();
				this.collection.add(newstiker);			
			}			
		}),
	
		collectionview = new StickerCollectionView();
		
});