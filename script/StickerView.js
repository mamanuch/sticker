"use strict";

var StickerView;
$(function() {
		StickerView = Backbone.View.extend({
			initialize: function() {
				this.model.on("change", this.render, this);					
				this.saveCoords();
						
			},
			
			events: {
				"click": "stopPropagation",
				"contextmenu": "remove",
				"dblclick": "changeContent",
				"blur": "notActive",		
				"mousedown": "dragDrop",
				"mouseup": "saveCoords"
				
			},			
			
			className: "sticker",
			
			template: _.template($("#sticker-tpl").html()),
				
			
			dragDrop: function() {				
				
				var event = event || window.event;
				//console.log("function dragDrop");
				var moving_object = this.el;						
				moving_Box(event);				
				
				function moving_Box(event) {
					var movex = moving_object.style.left = event.pageX-70+"px", 
						movey = moving_object.style.top = event.pageY-40+"px";					
													
					return movex, movey;
				}; 
						
				document.onmousemove = function(event) {							
					moving_Box(event);			
				};								
				this.el.onmouseup = function() {
					document.onmousemove = moving_object.onmouseup = null; 
				};	
				
				return this;
			},				
		
			saveCoordsX: function() {
				var event = event || window.event;
				this.model.set("usertext", this.$el.html());
				if(event.pageX<80) {				
					this.model.set({"left": 10+"px"});		
				}else if(event.pageX>840){
					this.model.set({"left": 790+"px"});				
				}else{
					this.model.set({"left": event.pageX-70+"px"});					
				};					
				
			},
			
			saveCoordsY: function() {
				var event = event || window.event;
				if(event.pageY<50) {				
						this.model.set({"top": 10+"px"});														
					}else if(event.pageY>380){
						this.model.set({"top": 340+"px"});						
					}else{
						this.model.set({"top": event.pageY-40+"px"});						
					};		
			},
					
			saveCoords: function() {
				this.saveCoordsX();
				this.saveCoordsY();				
			},	
			
			saveContent: function() {
				console.log("saveContent");
				this.model.set("usertext", this.$el.html());
				this.$el.html(this.template(this.model.toJSON()));
						
			},	
			
			render: function() {			
				
				this.el.style.left = this.model.get("left");		 	
				this.el.style.top = this.model.get("top");			
				this.$el.html(this.template(this.model.toJSON()));	
				
				//console.log("StickerView is rendering");				
				//console.log(this.model.get("left"));
				//console.log(this.model.get("top"));
				
				return this;	
			},		
			
			stopPropagation: function(event) {				
				event.stopPropagation();							
			},						

			changeContent:function(event) {					
				this.$el.attr("contentEditable", true);				
				event.stopPropagation();	
				//console.log("StickerView changeContent");
			},							
			
			remove: function(event) {								
				event.preventDefault();		
				this.$el.remove();
				this.model.destroy();
				//console.log("StickerView remove");
			},
			
			notActive: function(event) {									
				event.preventDefault();		
				this.$el.attr("contentEditable", false);				
				this.model.set("usertext", this.$el.html());	
				//console.log("StickerView notActive");
				
			},		
			
		});
		
});		