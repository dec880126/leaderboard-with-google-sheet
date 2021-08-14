var answerCount = 0
googleScript_Path = 'https://script.google.com/macros/s/AKfycbyZsYyshuMgFMd7ENUxUaljWZBOHXIy01IVdSqTvfNHLgJOekhphLYh5_6b93vkoVQGEg/exec'

var nameParam = {
url: 'https://docs.google.com/spreadsheets/d/1VkBUIGg9duRCCH2rfuuhzcsxsW-2OES-xzZL6BRGyio/edit#gid=293141823',
name: 'answerSheet',
startRow: 2,
startColumn: 2,
};      


$.get(googleScript_Path, nameParam, function(data) {
	// console.log(data);
	var dataList = new Array();
	dataList = data.split(",");
	score_name = new Array();
	idx = 0;
	for(i = 0; i < dataList.length; i = i + 2){
		score_name[idx] = [dataList[i], dataList[i+1]];
		idx += 1;
	}

	score_name.sort(function(a, b) {
		return b[0] - a[0];
	});

	for(i = 0; i < dataList.length; i++){
		if(score_name[i]){
			var node_lboard = document.createElement('div');
			node_lboard.setAttribute('class', 'lboard_mem');
			lboard_mem_id = 'v1_lboard_mem_' + String(i);
			node_lboard.setAttribute('id', lboard_mem_id);
			document.getElementById('v1').appendChild(node_lboard);

			var node_namebar = document.createElement('div');
			node_namebar.setAttribute('class', 'name_bar');
			namebar_id = 'v1_namebar_' + String(i);
			node_namebar.setAttribute('id', namebar_id);
			document.getElementById(lboard_mem_id).appendChild(node_namebar);

			var node_name = document.createElement('p');
			name2html = String(i+1) + '. ' + String(score_name[i][1]);
			var name = document.createTextNode(name2html);
			node_name.appendChild(name)
			document.getElementById(namebar_id).appendChild(node_name)

			var node_bar_wrap = document.createElement('div');
			node_bar_wrap.setAttribute('class', 'bar_wrap');
			barWrap_id = 'v1_barWrap_' + String(i);
			node_bar_wrap.setAttribute('id', barWrap_id)
			document.getElementById(namebar_id).appendChild(node_bar_wrap)

			var node_inner_bar = document.createElement('div')
			node_inner_bar.setAttribute('class', 'inner_bar');
			bar_width_num = Number(score_name[i][0]) / 100;
			bar_width_str = 'width: ' + String(bar_width_num.toFixed(2)*100) + '%';
			node_inner_bar.setAttribute('style', bar_width_str);
			document.getElementById(barWrap_id).appendChild(node_inner_bar)

			var node_points = document.createElement('div');
			node_points.setAttribute('class', 'points')								
			points_id = 'v1_points_' + String(i);
			node_points.setAttribute('id', points_id)
			document.getElementById(lboard_mem_id).appendChild(node_points)

			var text_content = document.createElement('p');
			var textnode = document.createTextNode(String(score_name[i][0]));
			text_content.appendChild(textnode)
			document.getElementById(points_id).appendChild(text_content)
		}

	}						
});
