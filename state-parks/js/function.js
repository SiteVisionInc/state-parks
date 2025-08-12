$(function(){
	add_extinction_2_a_href("page");
	add_alt_2_img("page");
});

/* wrap table, pre for horizontal scroll bar if table is bigger then current card size */
	$(function(){
		$('.mobile table').each(function(){
			if($(this).width() <= $(this).parent().width()){}else
			{
				$(this).wrap('<div class="table_wrapper"></div>');
			}
		});
	});
/* end wrap table */

function gid(id)
{
	return document.getElementById(id);
}
function isKeyEnter(e)
{
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13)
	{
		return true;
	}
	return false;
}
function validateEmail(email)
{
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
function GoToLink(new_url,open_new_window)
{
	open_new_window = (typeof open_new_window == "undefined") ? false : open_new_window;
	new_url = (typeof new_url == "undefined") ? "" : new_url;
	/* if(new_url == ""){new_url = document.URL;} */
	if(new_url == ""){window.location.reload();return false;}
	var open_window = open_new_window ? "_blank" : "_self";
	window.open(new_url, open_window); 
	return false;
}
function url_parameter(parameter, query_string)
{
	parameter = parameter || null;
	query_string = query_string || document.URL;
	var the_url = query_string.substring(0, query_string.indexOf('?')), the_hash = query_string.lastIndexOf('#') > -1 ? query_string.substring(query_string.lastIndexOf('#')) : "";
	query_string = query_string.indexOf('?') > -1 ? query_string.substring(query_string.indexOf('?') + 1) : query_string;
	query_string = query_string.indexOf('#') > -1 ? query_string.substring(0, query_string.indexOf('#')) : query_string;
	if(parameter == null)
		return query_string;
	if(typeof parameter == 'string')
	{
		var final_parameter_value = "";
		var vars = query_string.split("&");
		for (var i = 0; i < vars.length; i++)
		{
			var pair = vars[i].replace('=', '[ap]equal[ap]').split('[ap]equal[ap]');
			if(pair.length == 2)
				if(pair[0] == parameter)
					final_parameter_value = pair[1];
		}
		return decodeURIComponent(final_parameter_value);
	}
	var query_array = {};
	var vars = query_string.split("&");
	for (var i = 0; i < vars.length; i++)
	{
		var pair = vars[i].split("=");
		if(pair.length == 2)
			query_array[pair[0]] = pair[1];
	}
	for (var parameter_key in parameter)
		if(parameter.hasOwnProperty(parameter_key))
			query_array[parameter_key] = encodeURIComponent(parameter[parameter_key]);
	var final_query_string = "";
	for (var query_key in query_array)
		if (query_array.hasOwnProperty(query_key) && query_array[query_key] != "")
			final_query_string += (final_query_string != "" ? "&" : "") + query_key + "=" + query_array[query_key];
	return the_url + (final_query_string == "" ? "" : "?" + final_query_string) + the_hash;
}

function add_extinction_2_a_href(the_id)
{
	$("#" + the_id + " a").each(function(){
		if($(this).text() != "")
		{
			var current_link = $(this).attr("href") || "";
			current_link = GetFileExtinction(current_link).toLowerCase();
			if(current_link == "pdf")
			{
				$(this).after(" (PDF)");
			}
			else if(current_link == "mp3")
			{
				$(this).after(" (MP3)");
			}
			else if(current_link == "doc" || current_link == "docx" || current_link == "docm" || current_link == "dotx" || current_link == "dotm" || current_link == "rtf" || current_link == "wps")
			{
				$(this).after(" (Word)");
			}
			else if(current_link == "xls" || current_link == "xlsx" || current_link == "xlsm" || current_link == "xlsb" || current_link == "xltx" || current_link == "xltm" || current_link == "csv")
			{
				$(this).after(" (Excel)");
			}
			else if(current_link == "ppt" || current_link == "pptx" || current_link == "pptm" || current_link == "potx" || current_link == "potm" || current_link == "pot" || current_link == "ppsx" || current_link == "ppsm" || current_link == "pps" || current_link == "ppam" || current_link == "ppa")
			{
				$(this).after(" (PowerPoint)");
			}
			else if(current_link == "mdb" || current_link == "accdb" || current_link == "adp")
			{
				$(this).after(" (Access)");
			}
		}
	});
}

function add_alt_2_img(the_id)
{
	$("#" + the_id + " img").each(function(){
		if($(this).attr("alt") === undefined || $(this).attr("alt").trim() == "")
		{
			$(this).attr("alt", "An Image");
		}
	});
}

/* Get File Extenction from url */
function GetFileExtinction(url)
{
	url = url || window.location.pathname;
	return url.split("?")[0].split("#")[0].reverse().split(".")[0].reverse();
}

String.prototype.left = function(len){ return left(this, len); }
function left(str, len)
{
	return (len > str.length) ? str : str.substring(0, len);
}
String.prototype.right = function(len){ return rigth(this, len); }
function right(str, len)
{
	return (len > str.length) ? str : str.substring(str.length - len);
}

/* str.capitalize(): Capitalize Every word's First Letter */
String.prototype.capitalize = function(){return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );};

/* str.trim(): remove white space */
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

/* str.reverse(): reverse string */
String.prototype.reverse = function () { return this.split("").reverse().join(""); }

/* Get File Name from Url, no extenction */
function GetFilename(url)
{
	url = url || window.location.pathname;
	var m = url.split("#")[0].toString().split("/");
	if (m && m.length > 1)
	{
		return m[m.length - 1] || 'index';
	}
	return "";
}

/* default value input */
	$(function(){
		$('input[type="text"][default]').each(function(index, element){
			var $element = $(element);
			var defaultValue = $element.attr('default');
			$element.css('color', '#999999').val(defaultValue);
			$element.focus(function() {
				var actualValue = $element.val();
				if (actualValue == defaultValue && $element.css('color') != 'rgb(0, 0, 0)') {
					$element.val('');
					$element.css('color', '#000000');
				}
			});
			$element.blur(function() {
				var actualValue = $element.val();
				if (!actualValue) {
					$element.val(defaultValue);
					$element.css('color', '#999999');
				}
			});
		});
	});
/* end default value input */

/* mega menu start */
	$(function(){
		$('#find_a_park_link, #find_a_park, #where_to_stay_link, #where_to_stay, #what_to_do_link, #what_to_do')
			.mouseenter(function(){
				if($(window).width() >= 960)
				{
					var mega_menu_current_id = $(this).attr('id') + '';
					if(right(mega_menu_current_id, 5) == '_link')
					{
						mega_menu_current_id = left(mega_menu_current_id, mega_menu_current_id.length - ('_link').length);
					}
					$('#' + mega_menu_current_id).removeClass('hide');
					$('#' + mega_menu_current_id + '_link').addClass(mega_menu_current_id + '_link_hover');
				}
			})
			.mouseleave(function(){
				if($(window).width() >= 960)
				{
					var mega_menu_current_id = $(this).attr('id') + '';
					if(right(mega_menu_current_id, 5) == '_link')
					{
						mega_menu_current_id = left(mega_menu_current_id, mega_menu_current_id.length - ('_link').length);
					}
					$('#' + mega_menu_current_id).addClass('hide');
					$('#' + mega_menu_current_id + '_link').removeClass(mega_menu_current_id + '_link_hover');
				}
			})
		;
		$('#find_a_park, #where_to_stay, #what_to_do').addClass('hide');
	});
/* end mega menu start */

/* start fader */
	(function($) {
		$(function(){
			var fader_list = $('#fader');
			var fader_li_list = $('li', fader_list);

			var option = {
				'speed':      (fader_list.attr('fader-speed') || 3000)*1, // please use only numbers because of the jumpNav fade!! 600 is normal, 1200 is slow
				'duration':   (fader_list.attr('fader-duration') || 10000)*1,
				'list':       fader_list.attr('fader-list') || 'true',
				'navigation': fader_list.attr('fader-navigation') || 'true',
				'auto_run':   fader_list.attr('fader-auto-run') || 'false',
				'random':   fader_list.attr('fader-random') || 'false'
			};


			var fader_wrapper = $('<div>');
			fader_wrapper.addClass('fader_wrapper').insertBefore(fader_list);

			var fader_navigation = $('<div>');
			fader_navigation.addClass('fader_navigation').appendTo(fader_wrapper);

			var fader_list = $('<div>');
			fader_list.addClass('fader_list').appendTo(fader_wrapper);

			var fader_back = $('<a>');
			fader_back.addClass('fader_back').attr('href', 'javascript:void(0);').html('<img src="/state-parks/image/back.png" alt="Left arrow">').appendTo(fader_navigation);

			var fader_play = $('<a>');
			fader_play.hide().addClass('fader_play').attr('href', 'javascript:void(0);').html('<img src="/state-parks/image/play.png" alt="Play">').appendTo(fader_navigation);

			var fader_pause = $('<a>');
			fader_pause.hide().addClass('fader_pause').attr('href', 'javascript:void(0);').html('<img src="/state-parks/image/pause.png" alt="Pause">').appendTo(fader_navigation);

			var fader_next = $('<a>');
			fader_next.addClass('fader_next').attr('href', 'javascript:void(0);').html('<img src="/state-parks/image/next.png" alt="Right arrow">').appendTo(fader_navigation);

			fader_li_list.each(function(i){
				$('<a>').attr('href', 'javascript:void(0);').html('<img src="/state-parks/image/fader-list.png" alt="Images">').appendTo(fader_list).click(function(){
					fader_play.show();
					fader_pause.hide();					
					fader_current_li = i;
					fader_fadein(i,$('img', fader_li_list.eq(fader_current_li)).attr('src'),option.speed,fader_wrapper);
				});
			});

			if(option.navigation == 'false')
			{
				fader_navigation.hide();
			}
			if(option.list == 'false')
			{
				fader_list.hide();
			}

			fader_current_li = (option.random == 'true') ? Math.floor((Math.random()*fader_li_list.length)+0) : 0;
			fader_wrapper.css('background', "url('" + $('img', fader_li_list.eq(fader_current_li)).attr('src') + "')");
			$('.fader_list img', fader_wrapper).eq(fader_current_li).attr('src','/state-parks/image/stop.png').attr('alt', 'Stop');


			if(option.auto_run == 'true')
			{
				fader_pause.show();
			}
			else
			{
				fader_play.show();
			}
			var fader_timer = true;
				fader_timer = setInterval(function() {
					if(option.auto_run == 'true')
					{
						fader_current_li = fader_next_number(fader_current_li,fader_li_list.length,option.random);
						fader_fadein(fader_current_li, $('img', fader_li_list.eq(fader_current_li)).attr('src'),option.speed,fader_wrapper);
						fader_pause.show();
					}
					else
					{
						fader_play.show();
					}
	        		}, option.duration);


			fader_play.click(function(){
				option.auto_run = 'true';
				fader_current_li = fader_next_number(fader_current_li,fader_li_list.length,option.random);
				fader_fadein(fader_current_li, $('img', fader_li_list.eq(fader_current_li)).attr('src'),option.speed,fader_wrapper);
				fader_play.hide();
				fader_pause.show();
			});
			fader_pause.click(function(){
				option.auto_run = 'false';
				fader_play.show();
				fader_pause.hide();
			});
			fader_next.click(function(){
				option.auto_run = 'false';
				fader_current_li = fader_next_number(fader_current_li,fader_li_list.length,option.random);
				fader_fadein(fader_current_li, $('img', fader_li_list.eq(fader_current_li)).attr('src'),option.speed,fader_wrapper);
				fader_play.show();
				fader_pause.hide();
			});
			fader_back.click(function(){
				option.auto_run = 'false';
				fader_current_li = fader_back_number(fader_current_li,fader_li_list.length,option.random);
				fader_fadein(fader_current_li, $('img', fader_li_list.eq(fader_current_li)).attr('src'),option.speed,fader_wrapper);
				fader_play.show();
				fader_pause.hide();
			});
		});
	})(jQuery);
	function fader_next_number(current_number,total,random)
	{
		var new_number = 0;
		if(random == 'true')
		{
			do
			{
				new_number = Math.floor((Math.random()*total)+0);
			}
			while(total > 1 && current_number == new_number);
		}
		else
		{
			new_number = ((current_number+1 >= total) ? 0 : (current_number+1));
		}
		return new_number;
	}
	function fader_back_number(current_number,total,random)
	{
		var new_number = 0;
		if(random == 'true')
		{
			do
			{
				new_number = Math.floor((Math.random()*total)+0);
			}
			while(total > 1 && current_number == new_number);
		}
		else
		{
			new_number = ((current_number == 0) ? total-1 : (current_number-1));
		}
		return new_number;
	}
	function fader_fadein(current_number,current_img,speed,fader_wrapper)
	{
		var current_list_img = $('.fader_list img', fader_wrapper);
		current_list_img.attr('src','/state-parks/image/fader-list.png').attr('alt', 'Images');
		current_list_img.eq(current_number).attr('src','/state-parks/image/stop.png').attr('alt', 'Sotp');
		var fader_active = $("<div>");
		fader_active.addClass('fader_active').css('background', "url('" + current_img + "')").appendTo(fader_wrapper).fadeIn(speed, function () {
			fader_wrapper.css('background', "url('" + current_img + "')");
			fader_active.remove();
		});
	}
/* end fader */


/* start slider */
	/*
		<div class="slider no_print" auto_play="{play|stop|}">
			<div><a href="/virginia-treasures"><img alt="Splash Image" src="image/splash-picture-01.jpg"></a></div>
			<div><a href="/natural-heritage/thirtyyears"><img alt="Splash Image" src="image/splash-picture-02.jpg"></a></div>
			<div><a href="/state-parks/"><img alt="Splash Image" src="image/splash-picture-03.jpg"></a></div>
		</div>
	*/
	var slider_number = 0;
	var slider_slide_number = 0;
	(function($){
		$(function(){
			$('.slider > div').addClass('slide').fadeOut('fast');
			$('.slider').each(function(){
				slider_slide_number = 0;
				var current_navigation = '';
				$(this).attr('slider_id', 'slider_' + slider_number).attr('current_slide', '0');
				$(this).children('div').each(function(index){
					$(this).attr('slider_element_id', 'slider_element_' + slider_slide_number);
					current_navigation += '<a href="javascript:slider_change_slide(\'' + slider_number + '\', \'' + slider_slide_number + '\', true);"><img src="/image/slider-not-active.png" alt="Not Active"></a>';
					slider_slide_number++;
				});
				$(this).append('<span class="slider_navigation">' + current_navigation + '</span>');
				//$('<div class="clear"></div>').insertAfter($(this));
				slider_change_slide(slider_number, '0', false);
				slider_number++;
			});
			$(window).resize(function(){
				$('[slider_id] div[slider_element_id]:visible').each(function(){
					$(this).parent().css('height', $(this).height() + 'px');
				});
			}).resize();
			setTimeout(function(){ $(window).resize(); }, 500);
			setInterval(slider_auto_play, 8000, false);
		});
	})(jQuery);
	function slider_auto_play()
	{
		$('[slider_id]').each(function(){
			var current_auto_play = ($(this).attr('auto_play') || '');
			if(current_auto_play == 'play')
			{
				var current_slide = $(this).find('div[slider_element_id]:visible').attr('slider_element_id').split('_').pop() * 1;
				current_slide = (current_slide == ($(this).find('div[slider_element_id]').length - 1) ? 0 : (current_slide + 1));
				slider_change_slide($(this).attr('slider_id').split('_').pop(), current_slide);
			}
		});
	}
	function slider_next(slider_number)
	{
		var current_slider = $('[slider_id="slider_' + slider_number + '"]');
		var current_slider_total_slides = current_slider.find('div[slider_element_id]').length;
		var slider_next_slide = (current_slider.attr('current_slide') * 1) + 1;
		slider_next_slide = (slider_next_slide >= current_slider_total_slides ? 0 : slider_next_slide);
		slider_change_slide(slider_number, slider_next_slide);
	}
	function slider_back(slider_number)
	{
		var current_slider = $('[slider_id="slider_' + slider_number + '"]');
		var current_slider_total_slides = current_slider.find('div[slider_element_id]').length;
		var slider_back_slide = (current_slider.attr('current_slide') * 1) - 1;
		slider_back_slide = (slider_back_slide < 0 ? (current_slider_total_slides - 1) : slider_back_slide);
		slider_change_slide(slider_number, slider_back_slide);
	}
	function slider_change_slide(slider_number, slider_slide_number, stop_auto_play)
	{
		stop_auto_play = (typeof stop_auto_play === 'boolean' ? stop_auto_play : false);
		if(stop_auto_play)
		{
			$('[slider_id="slider_' + slider_number + '"]').attr('auto_play', 'stop');
		}
		$('[slider_id="slider_' + slider_number + '"]').attr('current_slide', slider_slide_number).css('height', $('[slider_id="slider_' + slider_number + '"] div[slider_element_id="slider_element_' + slider_slide_number + '"]').height() + 'px');
		$('[slider_id="slider_' + slider_number + '"] > div[slider_element_id]').fadeOut('fast');
		$('[slider_id="slider_' + slider_number + '"] div[slider_element_id="slider_element_' + slider_slide_number + '"]').fadeIn('fast');
		$('[slider_id="slider_' + slider_number + '"] .slider_navigation a img').each(function(index){
			$(this).attr('src', '/image/slider-' + (index == slider_slide_number ? '' : 'not-') + 'active.png').attr('alt', 'Active');
		});
	}
/* end slider */


/* start tab */
	$(function(){
		$('.tabs').each(function(){
			var current_tabs = $(this);
			var tab_navigation = $('<ul>');
			tab_navigation.addClass('tab_navigation');
			var tab_class_counter = 0;
			$('.tab', current_tabs).each(function(){
				tab_class_counter++;
				var current_class_color = "";
				if(tab_class_counter == 1)
				{
					current_class_color = "yellow";
				}
				if(tab_class_counter == 2)
				{
					current_class_color = "blue";
				}
				if(tab_class_counter == 3)
				{
					current_class_color = "orange";
					tab_class_counter = 0;
				}

				$(this).html('<div class="tab_top"></div><div class="tab_body"><div class="tab_content">' + $(this).html() + '</div></div><div class="tab_bottom"></div>').addClass('tab_' + current_class_color);

				var current_li = $('<li>');
				if($(this).hasClass('selected'))
				{
					current_li.addClass('selected');
				}
				current_li.addClass('tab_' + current_class_color).html('<a href="javascript:void(0);"><span class="tab_title_left"></span><span class="tab_title_body">' + $('h3:first', this).addClass('tab_title').text() + '</span><span class="tab_title_right"></span></a>').appendTo(tab_navigation);
			});
			current_tabs.prepend(tab_navigation);
			$('li', tab_navigation).click(function(){
				$('li', tab_navigation).removeClass('selected');
				$('.tab', current_tabs).removeClass('selected').eq($(this).addClass('selected').index()).addClass('selected');
			});
		});
	});
/* end tab */

/* start park template code */
	$(function(){
		//$('#alert').html($('#alert').html().trim());//.addClass('hide');
		if($('#alert').text().trim() != '' && GetFilename() != 'index' && GetFilename() != '' && GetFilename() != 'index1')
		{
			var sp_alert = $('<div>');
			sp_alert.addClass('sp_alert').insertAfter('#alert').click(function(){
				if($('#alert').hasClass('hide'))
				{
					$('#alert').removeClass('hide')
				}
				else
				{
					$('#alert').addClass('hide')
				}
			});
		}
		else
		{
			if(GetFilename() != 'index' && GetFilename() != '' && GetFilename() != 'index1')
			{
				$('#alert').remove();
			}
		}
		$('#about_this_park_links a:first').css('border-top', '0px');
		$('#about_this_park_links a:last').css('border-bottom', '0px');
	});
/* end park template code */

/* start redirect url */
	$(function(){
		$('a[redirect_url]').click(function(event){
			event.preventDefault();
			window.location = '/redirect?r=' + $(this).attr('redirect_url');
		});
	});
/* end redirect url */

/* start Google Analytics Tracking */
/*
function TrackEventGA(Category, Action, Label, Value) {
    if (typeof (_gaq) !== "undefined") {
        _gaq.push(['_trackEvent', Category, Action, Label, Value]);
    } else if (typeof (ga) !== "undefined") {
        ga('send', 'event', Category, Action, Label, Value);
    }
}
if (typeof jQuery != 'undefined') {
    jQuery(document).ready(function($) {
        var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
        var baseHref = '';
        if (jQuery('base').attr('href') != undefined)
            baseHref = jQuery('base').attr('href');
        jQuery('a').each(function() {
            var href = jQuery(this).attr('href');
            if (href && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
                jQuery(this).click(function() {
                    var extLink = href.replace(/^https?\:\/\//i, '');
                    //_gaq.push(['_trackEvent', 'External', 'Click', extLink]);
                    TrackEventGA('_trackEvent', 'External', 'Click', extLink);
                    if (jQuery(this).attr('target') != undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
                        setTimeout(function() { location.href = href; }, 200);
                        return false;
                    }
                });
            }
            else if (href && href.match(/^mailto\:/i)) {
                jQuery(this).click(function() {
                    var mailLink = href.replace(/^mailto\:/i, '');
                    //_gaq.push(['_trackEvent', 'Email', 'Click', mailLink]);
                    TrackEventGA('_trackEvent', 'Email', 'Click', mailLink);
                });
            }
            else if (href && href.match(filetypes)) {
                jQuery(this).click(function() {
                    var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                    var filePath = href;
                    //_gaq.push(['_trackEvent', 'Download', 'Click-' + extension, filePath]);
                    TrackEventGA('_trackEvent', 'Download', 'Click-' + extension, filePath);
                    if (jQuery(this).attr('target') != undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
                        setTimeout(function() { location.href = baseHref + href; }, 200);
                        return false;
                    }
                });
            }
        });
    });
}
*/
/* end Google Analytics Tracking */



/* start new template css as of 2023-06-13 */
	$(function(){
		$('.mobile .menu_item > a').each(function(){
			if($(this).parent().find('.menu_subitem').length)
			{
				$(this).append('<img class="menu_down" src="/state-parks/image/down.png"><img class="menu_up" src="/state-parks/image/up.png">');
			}
		});

		$('.menu_item').not('.mobile .menu_item')
		.mouseenter(function(){
			if($(window).width() >= 960)
			{
		      	  $(this).find('.menu_subitem').slideDown('fast').addClass('menu_item_focus');
		        }
		})
		.mouseleave(function(){
			if($(window).width() >= 960)
			{
		      	  $(this).find('.menu_subitem').slideUp('fast').removeClass('menu_item_focus');
		        }
		});

		$('#mobile_menu').click(function(){
			$('.menu_up').hide();
			$('.menu_down').show();
			$('.menu_subitem').slideUp();
			$('.menu_item').slideToggle();
			$('#menu_image, #menu_close_image').slideToggle();
			$('.menu_down').show();
		});
		$('.menu_item').click(function(event){
			if($(event.target).hasClass('menu_item') || $(event.target).hasClass('menu_item_link') || $(event.target).hasClass('menu_item_link_strong'))
			{
				$(this).find('.menu_subitem').slideToggle();
				$(this).find('.menu_down, .menu_up').toggle();
			}
		});
		$('.menu_down, .menu_up').click(function(){
			$(this).parent().parent().find('.menu_subitem').slideToggle();
			$(this).parent().parent().find('.menu_down, .menu_up').toggle();
		});
		$('.menu_subitem').hide();
	});
/* end new template css as of 2023-06-13 */