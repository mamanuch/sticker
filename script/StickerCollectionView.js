"use strict";

var StickerCollectionView = Backbone.View.extend({			
	initialize: function() {
				
		this.collection = new StickerCollection();				
		this.collection.on("add", this.addSticker, this);
		this.collection.on("change", this.changeCollection, this);			
	}, 						
		
	events: {
		"click": "render"				
	},
						
	addSticker: function(sticker) {
		var view = new StickerView({model: sticker});			
		this.$el.append(view.render().el);						
		console.log(this.collection);
	},
			
	changeCollection: function(sticker) {					
		//console.log("changeCollection");
	},
			
	render: function() {					
		var newstiker = new Sticker();
		this.collection.add(newstiker);			
	}			
});