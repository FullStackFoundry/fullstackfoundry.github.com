/*
 *  Project: Full Stack Foundry
 *  Description: Napkin stage talent, tools, and capital in Vancouver, BC.
 *  Author: Shawn Adrian <shawn@nerdburn.com> | Input Logic Inc.
 *
*/
(function($, window, document){
    
	// options
	var opts = {
	    url:    $.url()    // a jquery plugin for working with urls
	};
	
	// namespace rawr
	function Fullstack() {
	    this.init();
		this.route();
	}
	
	/*
		INIT
		- sets up page options and calls router
	*/	
	Fullstack.prototype.init = function() {
	    var self = this;
	}

	/*
		ROUTE
		- execute different js based on the real URL
	*/
    Fullstack.prototype.route = function() {
        var self = this;
        
        //console.log(opts.url.attr('path'));
        
        // home page
        crossroads.addRoute('/', function(){
            
            // initiate map + scrolling stuff
            self.initMap();
            self.initScrolling();
        });     
        
        // temporary home page
        crossroads.addRoute('/index-template.html', function(){
            
            // initiate map + scrolling stuff
            self.initMap();
            self.initScrolling();
        });             
        
        // blog pages
        crossroads.addRoute('/post.html', function(){
            self.initBlog();
        });        
                
        // initiate route detection - use url.js to get current path
        crossroads.parse(opts.url.attr('path'));
        
        // init footer (stuff for all pages)
        self.initFooter();        
    }

	/*
		INIT BLOG
	*/
    Fullstack.prototype.initBlog = function() {
        var self = this;
        
        // disable links that don't go anywhere yet
        $('a[href="#"]').live('click', function(e){
            e.preventDefault();
            alert("This link doesn't work yet, sorry.");
        });
        
        // disable subscribe form for now
        $('form.subscribe').submit(function(e){
            e.preventDefault();
            alert("Sorry, subscribe isn't working yet.");
        });
    }

	/*
		INIT SCROLLING
		- sets up the hiding nav on scroll and scrolling on nav click
	*/	
	Fullstack.prototype.initScrolling = function() {
	    var self = this;

	    // hide header until ready for showing
	    $('header').hide();
	    
        $(window).scroll(function(){
          if($(window).scrollTop() >= 672){
              $("header").slideDown("fast");
        	  $('header').removeClass('hide').addClass('show');
          }
        });
        
        $(window).scroll(function(){
          if($(window).scrollTop() < 672){
              $("header").slideUp("fast");
          }
        });	    
        
        $(document).ready(function(){
            
            $('ul.jsnav a, ul.poly-links a, a.jslink').bind('click',function(e){
                e.preventDefault();

                var id = $(this).attr('href'); 
                var el = $(id);

                var top = el.offset().top;
                
                $('html, body').stop().animate({
                    scrollTop: top
                }, 750, 'easeInOutExpo');              
            });    
            
            $('a.home-link').bind('click', function(e){
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 750, 'easeInOutExpo');               
            });
                                    
        });	    
    }

	/*
		INIT MAP
		- used on contact page
	*/	
	Fullstack.prototype.initMap = function() {
	    var self = this;
	    
        // Create map
        var map = mapbox.map('map', null, null, []);
        
        map.addLayer(mapbox.layer().id('nerdburn.map-1qedyuol'));

        // Create and add marker layer
        var markerLayer = mapbox.markers.layer().features([{
            "geometry": { "type": "Point", "coordinates": [-123.103423, 49.28247]},
            "properties": { "image": "images/marker.png" }
        }]).factory(function(f) {
            
            // Define a new factory function. This takes a GeoJSON object
            // as its input and returns an element - in this case an image -
            // that represents the point.
            var img = document.createElement('img');
            img.className = 'marker-image';
            img.setAttribute('src', f.properties.image);
            return img;
        });
        
        map.addLayer(markerLayer).setExtent(markerLayer.extent());
        map.centerzoom({lat: 49.28247, lon: -123.103423 }, 16);	    
	}
	
	/*
		INIT FOOTER
		- used on all pages
	*/	
	Fullstack.prototype.initFooter = function() {
	    var self = this;
	    
	    $(document).ready(function(){
	       
	        // make form subscribe work
	        $('a.subscribe-btn').click(function(e){
	            e.preventDefault();
	            $(this).closest('form.subscribe').submit();
	        });
	        
	    });
	}
	
	window.Fullstack = new Fullstack;
	
})($, window, document);