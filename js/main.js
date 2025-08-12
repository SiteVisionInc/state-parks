/* start left navigation */
	(function($){
		$(function(){
			$('.left_nav ul').each(function(){
				$(this).hide().parent().find('a').eq(0).append('<span class="more">+</span>');
			});
			$('.left_nav a.selected').next('ul').show().end().parentsUntil('.left_nav', 'ul').show();
			$('.left_nav ul:visible').each(function(){
				$(this).prev().find('span').text('-').parent().addClass('bold');
			});
			$('.left_nav a span.more').click(function(event){
				event.stopPropagation();
				event.preventDefault();
				$(this).text(($(this).text() == '+' ? '-' : '+')).parent().next('ul').toggle();
			});
		});
	})(jQuery);
/* end left navigation */

/* start slider */
	/*
		<div class="slider no_print" auto_play="{play|stop|}" time="{3|#} in seconds" show_navigation="{yes|no}">
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
				$(this).append('<span class="slider_navigation"' + (($(this).attr('show_navigation') || 'yes') == 'yes' ? '' : ' style="display:none;"') + '>' + current_navigation + '</span>');
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
		slider_change_slide(slider_number, slider_next_slide, true);
	}
	function slider_back(slider_number)
	{
		var current_slider = $('[slider_id="slider_' + slider_number + '"]');
		var current_slider_total_slides = current_slider.find('div[slider_element_id]').length;
		var slider_back_slide = (current_slider.attr('current_slide') * 1) - 1;
		slider_back_slide = (slider_back_slide < 0 ? (current_slider_total_slides - 1) : slider_back_slide);
		slider_change_slide(slider_number, slider_back_slide, true);
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


/* start Accordion */
	/*
		<div class="accordion_wrapper">
			<div id="some_id_1" class="an_accordion">
				<h3>Accordion Title 1</h3>
				<p>This project was funded in part by the Virginia Coastal Program at the Department of Environmental Quality through Grant NA18NOS419 task #5 of the National Oceanic and Atmospheric Administration, Office of <a accordion="#some_id_2">Ocean and Coastal Resource Management</a>, under the Coastal Zone Management Act of 1972, as amended.</p>
				<!-- this is for sub accordian start -->
					<div class="sub_accordion_wrapper">
						<div id="some_id_1_a" class="sub_an_accordion">
							<h4>Question 1 A</h4>
							<p>This project was funded in part by the Virginia Coastal Program at the Department of Environmental Quality through Grant NA18NOS419 task #5 of the National Oceanic and Atmospheric Administration, Office of <a accordion="#some_id_2">Ocean and Coastal Resource Management</a>, under the Coastal Zone Management Act of 1972, as amended.</p>
						</div>
						<div id="some_id_1_b" class="sub_an_accordion">
							<h4>Question 1 B</h4>
							<p>National Oceanic and Atmospheric Administration, Office of Ocean and Coastal Resource Management, under the Coastal Zone Management Act of 1972, as amended.</p>
						</div>
					</div>
				<!-- this is for sub accordian end -->
			</div>
			<div id="some_id_2" class="an_accordion">
				<h3>Accordion Title 2</h3>
				<p>National Oceanic and Atmospheric Administration, Office of Ocean and Coastal Resource Management, under the Coastal Zone Management Act of 1972, as amended.</p>
			</div>
		</div>
	*/
	$(function(){
		$('.accordion_wrapper').each(function(){
			$(this).find('.an_accordion').each(function(){
				var this_accordion_title= $(this).find('h3:first').html();
				$(this).find('h3:first').remove();
				$(this).html('<div class="an_accordion_title"><span>' + this_accordion_title + '</span></div><div class="an_accordion_body">' + $(this).html() + '</div>');
			});
		});
		$('.an_accordion_title').click(function(){
			var this_accordion = $(this).parent();
			if(this_accordion.hasClass('an_accordion_selected'))
			{
				this_accordion.find('.an_accordion_body').slideUp();
				this_accordion.parent().find('.an_accordion_selected').removeClass('an_accordion_selected');
			}
			else
			{
				this_accordion.parent().find('.an_accordion_selected .an_accordion_body').slideUp();
				this_accordion.parent().find('.an_accordion_selected').removeClass('an_accordion_selected');
				this_accordion.find('.an_accordion_body').slideDown();
				this_accordion.addClass('an_accordion_selected');
			}
		});
		/* start Sub Accordion */
			$('.sub_accordion_wrapper').each(function(){
				$(this).find('.sub_an_accordion').each(function(){
					var this_accordion_title= $(this).find('h4:first').html();
					$(this).find('h4:first').remove();
					$(this).html('<div class="sub_an_accordion_title"><span>' + this_accordion_title + '</span></div><div class="sub_an_accordion_body">' + $(this).html() + '</div>');
				});
			});
			$('.sub_an_accordion_title').click(function(){
				var this_accordion = $(this).parent();
				if(this_accordion.hasClass('sub_an_accordion_selected'))
				{
					this_accordion.find('.sub_an_accordion_body').slideUp();
					this_accordion.parent().find('.sub_an_accordion_selected').removeClass('sub_an_accordion_selected');
				}
				else
				{
					this_accordion.parent().find('.sub_an_accordion_selected .sub_an_accordion_body').slideUp();
					this_accordion.parent().find('.sub_an_accordion_selected').removeClass('sub_an_accordion_selected');
					this_accordion.find('.sub_an_accordion_body').slideDown();
					this_accordion.addClass('sub_an_accordion_selected');
				}
			});
		/* end Sub Accordion */
		if(window.location.hash)
		{
			$('.an_accordion').each(function(){
				if($(this).attr('id') == (window.location.hash + '').replace('#', ''))
				{
					$(this).find('.an_accordion_title').click();
				}
			});
		}
		$('a[accordion]').each(function(){
			$(this).attr('href', 'javascript: void(0);');
		}).click(function(event){
			event.preventDefault();
			$('#' + $(this).attr('accordion').replace('#', '')).find('.an_accordion_title').click();
		});
	});
/* end Accordion */


/* start stay connected */
	(function($){
		$(function(){
			$('.stay_connected a img').hover(
				function(){
					$(this).attr('src', $(this).attr('src').replace('-light', '-dark'));
				}, function(){
					$(this).attr('src', $(this).attr('src').replace('-dark', '-light'));
				}
			);
		});
	})(jQuery);
/* end stay connected */

/* start add extenction to link */
	(function($){
		$(function(){
			$("#page a").each(function(){
				var do_not_add_file_type = (($(this).attr('do_not_add_file_type') || '') == 'yes');
				if(!do_not_add_file_type)
				{
					if($(this).text() != "")
					{
						var current_link = $(this).attr("href") || "";
						current_link = current_link.split("?")[0].split("#")[0].reverse().split(".")[0].reverse().toLowerCase();
						if(current_link == "pdf")
						{
							$(this).after(" (PDF)");
						}
						else if(current_link == "mp3")
						{
							$(this).after(" (MP3)");
						}
						else if(current_link == "dwg")
						{
							$(this).after(" (AutoCAD)");
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
				}
			});
		});
	})(jQuery);
/* end add extenction to link */

/* start add alt to image */
	(function($){
		$(function(){
			$("img").each(function(){
				if($(this).attr("alt") === undefined || $(this).attr("alt").trim() == "")
				{
					$(this).attr("alt", "An Image");
				}
			});
		});
	})(jQuery);
/* end add alt to image */

/* wrap table, pre for horizontal scroll bar if table is bigger then current card size */
	function table_add_wrapper()
	{
		(function($){
			$('table').each(function(){
				if($(this).width() <= $(this).parent().width()){}else
				{
					$(this).wrap('<div class="table_wrapper"></div>');
				}
			});
		})(jQuery);
	}
/* end wrap table */

/* str.trim(): remove white space */
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

/* str.left(int): left string */
String.prototype.left = function(n) { return this.substring(0, n); }

/* str.reverse(): reverse string */
String.prototype.reverse = function () { return this.split("").reverse().join(""); }