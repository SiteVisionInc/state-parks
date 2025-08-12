function add_to_site_analytics_history(type, action)
{
	type = type || '';
	action = action || '';
	if(type != '' && action != '')
	{
		var given_url = document.URL;
		if(given_url != '')
		{
			given_url.replace('https://www.dcr.virginia.gov', '').replace('https://dcr.virginia.gov', '').replace('http://www.dcr.virginia.gov', '').replace('http://dcr.virginia.gov', '').replace('//www.dcr.virginia.gov', '').replace('//dcr.virginia.gov', '');
		 }
		ga('send', 'event', type, action, given_url);
	}
}

function clean_attack(given_value)
{
	return (given_value + '').replace(new RegExp('(<svg(.*?)>|<script(.*?)>|<param(.*?)>|javascript|document.|window.|location[^\W]|onshow|ontoggle|onabort|oncanplay|oncanplaythrough|oncuechange|ondurationchange|onemptied|onended|onerror|onloadeddata|onloadedmetadata|onloadstart|onpause|onplay|onplaying|onprogress|onratechange|onseeked|onseeking|onstalled|onsuspend|ontimeupdate|onvolumechange|onwaiting|oncopy|oncut|onpaste|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|onscroll|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onmousewheel|onwheel|onkeydown|onkeypress|onkeyup|onblur|onchange|oncontextmenu|onfocus|oninput|oninvalid|onreset|onsearch|onselect|onsubmit|onafterprint|onbeforeprint|onbeforeunload|onerror|onhashchange|onload|onmessage|onoffline|ononline|onpagehide|onpageshow|onpopstate|onresize|onstorage|onunload|%|select|insert|update|delete|[^\W]alter\s|truncate|[^\W]drop\s)', 'igm'), '').replace(new RegExp('<(script|applet|object)((?:.|[\r\n])*?)<\/(script|applet|object)>', 'ig'), '').replace(new RegExp('<', 'ig'), '&lt;');
}
function sanitize_input(given_string)
{
	if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(given_string))
	{
		return given_string;
	}
	return given_string.replace(/[^a-zA-Z0-9\s,.+-]/g, '');
}

$(function(){
	if(window.location.pathname != '/state-parks/annual-pass' && window.location.pathname != '/state-parks/daily-pass' && window.location.pathname != '/state-parks/other/your-comments-count')
	{
		$('input[type="button"],input[type="submit"]').on('click', function(){
			$('input,select,textarea').each(function(){
				$(this).val(clean_attack($(this).val()));
			});
		});
		$('input,select,textarea').on('change', function(){
			$(this).val(clean_attack($(this).val()));
		});
	}
});

function analytics_add(given_url)
{
	if(given_url != '')
	{
		var given_url_original = given_url;
		var given_url_lower = given_url.toLowerCase();
		var analytics_extension = 'pdf|mp3|dwg|doc|docx|docm|dotx|dotm|rtf|wps|xls|xlsx|xlsm|xlsb|xltx|xltm|csv|ppt|pptx|pptm|potx|potm|pot|ppsx|ppsm|pps|ppam|ppamdb|accdb|adp|zip|rar';
		var current_link = given_url_lower.split('?')[0].split('#')[0].reverse().split('.')[0].reverse().toLowerCase();
		var type = '';
		if(('|' + analytics_extension + '|').indexOf('|' + current_link + '|') != -1)
		{
			type = current_link.toUpperCase();
		}
		if(given_url_lower.substring(0, 7) == 'mailto:')
		{
			type = 'MAIL TO';
			given_url = (document.URL + '').toLowerCase().split('?')[0].split('#')[0];
			given_url_lower = given_url.toLowerCase();
		}
		if(type != '')
		{
			//if(given_url != '' && given_url_lower.substring(0, 8) == 'https://')
			//{
			//	given_url = '';
			//}
			if(given_url != '' && given_url_lower.substring(0, 8) == 'https://')
			{
				if(given_url_lower.substring(0, 28) != 'https://www.dcr.virginia.gov' && given_url_lower.substring(0, 24) != 'https://dcr.virginia.gov')
				{
					given_url = '';
				}
				else
				{
					given_url = given_url.replace('https://www.dcr.virginia.gov', '').replace('https://dcr.virginia.gov', '');
				}
			}
			if(given_url != '' && given_url_lower.substring(0, 7) == 'http://')
			{
				if(given_url_lower.substring(0, 27) != 'http://www.dcr.virginia.gov' && given_url_lower.substring(0, 23) != 'http://dcr.virginia.gov')
				{
					given_url = '';
				}
				else
				{
					given_url = given_url.replace('http://www.dcr.virginia.gov', '').replace('http://dcr.virginia.gov', '');
				}
			}
			if(given_url != '' && given_url_lower.substring(0, 2) == '//')
			{
				if(given_url_lower.substring(0, 22) != '//www.dcr.virginia.gov' && given_url_lower.substring(0, 18) != '//dcr.virginia.gov')
				{
					given_url = '';
				}
				else
				{
					given_url = given_url.replace('//www.dcr.virginia.gov', '').replace('//dcr.virginia.gov', '');
				}
			}
			if(given_url != '')
			{
				given_url = given_url.split('/');
				var division_type = (given_url.length == 2 ? 'ROOT' : ((given_url[1] + '').indexOf('document') == -1 ? given_url[1] : 'ROOT'));
				var file_name = (given_url_original.substring(0, 7) == 'mailto:' ? given_url_original.substring(7) : given_url[given_url.length - 1]);
				//document.title = type + ' => ' + division_type + ' => ' + file_name;
				ga('send', 'event', type, division_type, file_name);
			}
		}
	}
}
//if((document.URL + '').indexOf("test=yes") != -1)
//{
	$(function(){
		$('a').each(function(){
			var given_url = $(this).attr('href') || '';
			if(given_url != '')
			{
				var given_url_lower = given_url.toLowerCase();
				var analytics_extension = 'pdf|mp3|dwg|doc|docx|docm|dotx|dotm|rtf|wps|xls|xlsx|xlsm|xlsb|xltx|xltm|csv|ppt|pptx|pptm|potx|potm|pot|ppsx|ppsm|pps|ppam|ppamdb|accdb|adp|zip|rar';
				var current_link = given_url_lower.split('?')[0].split('#')[0].reverse().split('.')[0].reverse().toLowerCase();
				if(('|' + analytics_extension + '|').indexOf('|' + current_link + '|') != -1 || given_url_lower.substring(0, 7) == 'mailto:')
				{
					if(given_url != '' && given_url_lower.substring(0, 8) == 'https://')
					{
						if(given_url_lower.substring(0, 28) != 'https://www.dcr.virginia.gov' && given_url_lower.substring(0, 24) != 'https://dcr.virginia.gov')
						{
							given_url = '';
						}
					}
					if(given_url != '' && given_url_lower.substring(0, 7) == 'http://')
					{
						if(given_url_lower.substring(0, 27) != 'http://www.dcr.virginia.gov' && given_url_lower.substring(0, 23) != 'http://dcr.virginia.gov')
						{
							given_url = '';
						}
					}
					if(given_url != '' && given_url_lower.substring(0, 2) == '//')
					{
						if(given_url_lower.substring(0, 22) != '//www.dcr.virginia.gov' && given_url_lower.substring(0, 18) != '//dcr.virginia.gov')
						{
							given_url = '';
						}
					}
					if(given_url != '')
					{
						$(this).attr('onClick', (($(this).attr("onClick") !== undefined && $(this).attr("onClick") != '') ? ($(this).attr("onClick") + (($(this).attr("onClick") + '').substring(($(this).attr("onClick") + '').length - 1) != ';' ? ';' : '')) : '') + ' analytics_add(this.href);').attr('target', '_blank');
					}
				}
			}
		});
	});
//}


/* start google analytics capture hashes */
$(function(){
/*
	$('[href^="#"]').each(function(){
		$(this).attr('onClick', (($(this).attr("onClick") !== undefined && $(this).attr("onClick") != '') ? ($(this).attr("onClick") + (($(this).attr("onClick") + '').substring(($(this).attr("onClick") + '').length - 1) != ';' ? ';' : '')) : '') + ' ga("send", "pageview", {"page": location.pathname + location.search + "' + $(this).attr('href') + '"});');
	});
*/
});
/* end google analytics capture hashes */


/* start "update link for target=_blank and alt=Opens New Browers" */
$(function(){
	$('a[href], area[href]').each(function(){
		var given_url = $(this).attr('href') || '';
		if(given_url != '')
		{
			var given_url_lower = given_url.toLowerCase();
			var current_link = given_url_lower.split('?')[0].split('#')[0].reverse().split('.')[0].reverse().toLowerCase();
			if(given_url != '' && current_link != '/' && given_url_lower.substring(0, 11) != 'javascript:' && given_url_lower.substring(0, 28) != 'https://www.dcr.virginia.gov' && given_url_lower.substring(0, 24) != 'https://dcr.virginia.gov' && given_url_lower.substring(0, 27) != 'http://www.dcr.virginia.gov' && given_url_lower.substring(0, 23) != 'http://dcr.virginia.gov' && given_url_lower.substring(0, 22) != '//www.dcr.virginia.gov' && given_url_lower.substring(0, 18) != '//dcr.virginia.gov')
			{
				if(given_url_lower.substring(0, 2) == '//' || given_url_lower.substring(0, 6) == 'https:' || given_url_lower.substring(0, 5) == 'http:')
				{
					$(this).attr('onClick', (($(this).attr("onClick") !== undefined && $(this).attr("onClick") != '') ? ($(this).attr("onClick") + (($(this).attr("onClick") + '').substring(($(this).attr("onClick") + '').length - 1) != ';' ? ';' : '')) : '') + ' analytics_outbound_add(this.href);').attr('target', '_blank').attr("alt", "Opens New Browser");
				}
			}
		}
	});
});
function analytics_outbound_add(given_url)
{
	if(given_url != '')
	{
		var given_url_lower = given_url.toLowerCase();
		var current_link = given_url_lower.split('?')[0].split('#')[0].reverse().split('.')[0].reverse().toLowerCase();
		if(given_url != '' && current_link != '/' && given_url_lower.substring(0, 11) != 'javascript:' && given_url_lower.substring(0, 28) != 'https://www.dcr.virginia.gov' && given_url_lower.substring(0, 24) != 'https://dcr.virginia.gov' && given_url_lower.substring(0, 27) != 'http://www.dcr.virginia.gov' && given_url_lower.substring(0, 23) != 'http://dcr.virginia.gov' && given_url_lower.substring(0, 22) != '//www.dcr.virginia.gov' && given_url_lower.substring(0, 18) != '//dcr.virginia.gov')
		{
			if(given_url_lower.substring(0, 2) == '//' || given_url_lower.substring(0, 6) == 'https:' || given_url_lower.substring(0, 5) == 'http:')
			{
				ga('send', 'event', 'outbound', 'click', given_url, {
					'transport': 'beacon'
				});
			}
		}
	}
}
/* end "update link for target=_blank and alt=Opens New Browers" */


/* start "remvoe iframe and use embed" */
	$(function(){
		/*
			use:
			<div class="video_container" title="DCR video" video="https://www.youtube.com/embed/tGAiKJvfDIY"></div>
		*/
		$('.video_container[video]').each(function(){
			if($(this).attr('video'))
			{
				$(this).html('<embed title="' + ($(this).attr('title') || 'DCR video') + '" src="' + $(this).attr('video') + ($(this).attr('video').indexOf('youtube.com') == -1 ? '' : '?html5=1&amp;rel=0&amp;hl=en_US&amp;version=3') + '" wmode="transparent" width="100%" height="100%" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen class="video_tag">');
			}
		});
	});
/* end "remvoe iframe and use embed" */




/* start JavaScript function for verifying address */
	function address_verification_get(given_street, given_city, given_state, given_zip, given_country, loading_element_id, data_element_id, loading_text)
	{
		given_street = given_street || $('#Street').val() || $('#Address').val() || '';
		given_city = given_city || $('#City').val() || '';
		given_state = given_state || $('#State').val() || '';
		given_zip = given_zip || $('#Zip').val() || '';
		given_country = given_country || $('#Country').val() || '';

		loading_element_id = $('#' + (loading_element_id || 'address_verification_get_data'));
		data_element_id = $('#' + (data_element_id || 'address_verification_get_data'));

		loading_text = loading_text || '<center>Verifying...</center>';

		if((given_street != '' && given_zip != '') || (given_street != '' && given_city != '' && given_state != ''))
		{
			data_element_id.html('');
			loading_element_id.html(loading_text).show();
			$.post(document.URL.replace(window.location.protocol + "//" + window.location.host, ""), {'address_verification_get': 'address', 'address_verification_get_street': given_street, 'address_verification_get_city': given_city, 'address_verification_get_state': given_state, 'address_verification_get_zip': given_zip, 'address_verification_get_country': given_country}).done(function(data){
				loading_element_id.hide();
				data_element_id.html(data).show();
			});
		}
	}
/* end JavaScript function for verifying address */