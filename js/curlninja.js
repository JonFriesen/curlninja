/*************************************************************************
 * curl.ninja
 *
 *************************************************************************
 *
 * @description
 * A GUI cURL command builder
 * 
 * @author
 * Jon Friesen (jon@jonfriesen.ca)
 *
 *************************************************************************/

	// Variables
	var reqType = 'GET';
	var url = '';
	var body = '';
	var headers = {};

	var htmlHeader = '<div class="header"><input type="text" class="form-control" placeholder="Key" /> <input type="text" class="form-control" placeholder="Value" /></div>';

$(document).ready(function() {

	// Watch fields

	$("#url").blur(function() {
		var newUrl = $(this).val();
		if(newUrl.length > 0) {
			url = newUrl;
		}
		generateCommand();
	});

	$("#body").blur(function() {
		var newBody = $(this).val();
		if(newBody.length > 0) {
			newBody = newBody.replace(/(\r\n|\n|\r)/gm,'');
			body = $.trim(newBody);
		}
		generateCommand();
	});

	$("#addMoreHeaders").click(function() {
		$("#headersContainer").append(htmlHeader);
	});

	$("#headersContainer").on('blur', 'input', function(){
		var parent = $(this).parent();
		var fields = parent.children();

		var key = fields[0].value;
		var val = fields[1].value;

		console.log('Triggered');

		if(key.length > 0) { 

			// Assemble object
			var headerObj = {};
			headerObj.key = key;
			headerObj.value = val;

			// Push onto array
	  	headers[key] = val;
		}

		generateCommand();
	});

	$(".reqType").click(function() {
		var newReqType = $(this).text();
		if(newReqType.length > 0) {
			$(this).addClass('active').siblings().removeClass('active');
			reqType = newReqType;
		}
		generateCommand();
	});
});

// Update command
function generateCommand() {
	var cmd = 'curl';

	// Request Type
	cmd += ' -X ';
	cmd += reqType;

	// Header Management
	for(var header in headers) {
		cmd += ' -H "';
		cmd += header;
		if(headers[header] && headers[header].length > 0) {
			cmd += ': ';
			cmd += headers[header];
		}
		cmd += '"';
	}

	// Body management
	if(body.length > 0) {
		cmd += ' -d ';
		cmd += '"';
		cmd += body;
		cmd += '"';
	}

	// URL management
	if(url.length > 0) {
		cmd += ' ';
		cmd += url;
	}

	// Set command field
	$('#curlCommand').val(cmd);

}