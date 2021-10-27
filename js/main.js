
/*

	get started

*/ 
function start()
{
	console.log('starting...')
	// empty map
	

	createSidebar();
	showList2();
	createNetworkMap();
	
	toggleContent('list')
	$('[data-toggle="tooltip"]').tooltip()
}

function toggleContent(content)
{
	console.log(content)
	switch(content){
		case 'home':
			console.log('main here')
			$('#main-home').show()
			$('#main-list').hide()
			$('#main-network').hide()
			$('#main-institute').hide()
			$('#main-task').hide()
			$('#side-content').hide()
			break;
		
		case 'list':
			console.log('main here')
			$('#main-home').hide()
			$('#main-list').show()
			$('#main-network').hide()
			$('#main-institute').hide()
			$('#main-task').hide()
			$('#side-content').show()
			break;
		
		case 'network':
			console.log('network here')
			$('#main-home').hide()
			$('#main-list').hide()
			$('#main-network').show()
			$('#main-institute').hide()
			$('#main-task').hide()
			$('#side-content').hide()
			rlc.network.fit()
			break;

		case 'institute':
			$('#main-home').hide()
			$('#main-list').hide()
			$('#main-network').hide()
			$('#main-institute').show()
			$('#main-task').hide()
			$('#side-content').show()
			break;

		case 'task':
			$('#main-home').hide()
			$('#main-list').hide()
			$('#main-network').hide()
			$('#main-institute').show()
			$('#main-task').hide()
			$('#side-content').show()
			break;

	}
}
function showList2(){

	// clear
	$('#banner-section').empty()
	var html = '<div class="row" style="width:100%">'

	/*
	
		loop through each phase
	
	*/ 
	$.each(rlc.data.phases,function(i,phase){
		var tasks = getTasksByPhaseID(phase.id)

		/*
		
			Phase name and description
		
		*/ 
		html += `
			<div class="col-3" >
				<span class="text-muted" style="font-size:0.8em">Phase ${(i+1)}</span>
				<div class="h3">
					${phase.name}
				</div>
			`

			$.each(tasks,function(j,task){
				var institutes = getInstitutesByTaskID(task.id)

				html_institutes = '';
				$.each(institutes,function(k,institute){
					thisinstitute = getInstituteByInstituteID(institute.institute_id)
					html_institutes += `<span class="dot" title="${thisinstitute.acronym}" data-toggle="tooltip" onclick="showInstitute(${institute.institute_id})" style="background-color:${thisinstitute.color}"></span> `
				})

				html += `
				<div class="row card" style="width:100%;background-color:whitesmoke;" >
					<div class="col-1">
						
						<div class="circle">${(j+1)}</div>
						
					</div>
					<div class="col-11">
							<h6 class="" style="margin-top:9px">
							<a href="#"  onclick="showTask(${task.id})">${task.name}</a>
							</h6>
								
								${html_institutes}
					</div>
				</div>
				`
				console.log(`task ${j+1} of ${tasks.length}`)
				if(j < tasks.length-1){
					html +=`
					<div style="text-align:center;margin-top:-20px">
						<i class="line"></i>
					</div>
					`
				}
			})

		html += `
			</div>
			`

	})

	$('#main-list').html(html)
}
function showList(){

	// clear
	var html = ''
	$('#banner-section').empty()

	/*
	
		loop through each phase
	
	*/ 
	$.each(rlc.data.phases,function(i,phase){
		var tasks = getTasksByPhaseID(phase.id)
			console.log(phase)

		// first, append to the banner
		$('#banner-section').append(`<a class="badge" style="font-size:0.8em; color:white;background-color:${phase.color}" href="#${phase.name}" class="economica">${phase.name}${rlc.icons.more_info}</a> `)
		// $('#banner-section').append('<a href="#'+phase.name+'" class="economica">'+phase.name+rlc.icons.more_info+' </a>')

		/*
		
			Phase name and description
		
		*/ 
		html += `<a id="${phase.name}"></a>
			<div class="row" style="width:100%">
				<div class="col-8">
					<h1 class="display-4">
						Phase ${(i+1)}: ${phase.name}
					</h1>
					<!--- <p>${phase.description}</p> --->
			`




		$.each(tasks,function(j,task){
			var institutes = getInstitutesByTaskID(task.id)

			html_institutes = '';
			$.each(institutes,function(k,institute){
				thisinstitute = getInstituteByInstituteID(institute.institute_id)
				html_institutes += `<a href="#" class="badge badge-primary" onclick="showInstitute(${institute.institute_id})" style="font-weight: 400;background-color:${thisinstitute.color}">${thisinstitute.acronym}</a> `
				// <a href="#" class="badge badge-primary" onclick="showInstitute(${val.id})" style="font-weight: 400;background-color:${val.color}">${val.acronym}</a>
			})

			html += `
			<div class="row" style="width:100%">
				<div class="col-1">
					
					<div class="circle" style="background:${phase.color}">${(j+1)}</div>
					
				</div>
				<div class="col-11">
						<h5 class="" style="margin-top:9px">
						${task.name}
						</h5>
							<p class="card-text">${task.description}</p>
							${html_institutes}
				</div>
			</div>
			<br>
			`
		})

		html += `



				</div>
				<!---
				<div class="col-4">
					<br><br>
					<img src="images/${phase.name.toLowerCase()}.png" width=100%>
				</div>
				--->
			</div>
			`

		/*
		
			Tasks within this phase
		
		*/ 

		// start accordion
		html2 = ''
		html2 += `
		<div class="accordion">
			<div class="accordion-item">
				<h2 class="accordion-header" id="heading${phase.name}">
				<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${phase.name}" aria-expanded="true" aria-controls="collapse${phase.name}">
					Show tasks for this phase
				</button>
				</h2>
				
				<div id="collapse${phase.name}" class="accordion-collapse collapse" aria-labelledby="heading${phase.name}" data-bs-parent="#accordionExample">
				<div class="accordion-body">
		`


		$.each(tasks,function(j,task){
			var institutes = getInstitutesByTaskID(task.id)

			html_institutes = '';
			$.each(institutes,function(k,institute){
				thisinstitute = getInstituteByInstituteID(institute.institute_id)
				html_institutes += `<a href="#" class="badge badge-primary" onclick="showInstitute(${institute.institute_id})" style="font-weight: 400;background-color:${thisinstitute.color}">${thisinstitute.acronym}</a> `
				// <a href="#" class="badge badge-primary" onclick="showInstitute(${val.id})" style="font-weight: 400;background-color:${val.color}">${val.acronym}</a>
			})

			html2 += `
			<div class="row" style="width:100%">
				<div class="col-1">
					
					<div class="circle" style="background:${phase.color}">${(j+1)}</div>
					
				</div>
				<div class="col-11">
						<h5 class="card-header">
						${task.name}
						</h5>
							<p class="card-text">${task.description}</p>
							${html_institutes}
				</div>
			</div>
			<br>
			`
		})
		// end accordion
		html2 += `			
				</div>
				</div>
			</div>

		</div>
		<br>
		`

	})

	$('#main-list').html(html)
}




function createSidebar(){

	var sidehtml = '<h2>Supporting Entities</h2>'
	sidehtml += '<table class="table table-borderless align-middle">'

	// only show parents
	var parent_institutes = rlc.data.institutes.filter(item=>item.parent_id == '')

	$.each(parent_institutes,function(i,val){
		institute = getInstituteByInstituteID(val.id)
		sidehtml += '<tr class="align-middle">'
		sidehtml += `<td><div class="circle-small" style="background:${val.color}" onclick="showInstitute(${val.id})">${val.acronym}</div></td>`
		// sidehtml += `<a href="#" class="circle-small" onclick="showInstitute(${val.id})" style="font-weight: 400;background-color:${val.color}">${val.acronym}</a></td>`
		sidehtml += `<td style="font-size:.8em" class="align-middle"><a href="#" onclick="showInstitute(${val.id})" style="font-weight: 400;">${val.name}</a></td></tr>`

	})
	sidehtml += '</table>'

	$('#side-content').html(sidehtml)
}

function getTasksByPhaseID (phase_id){
	var taskarray = []
	$.each(rlc.data.tasks,function(i,val){
		if(val.phase_id == phase_id)
		{
			taskarray.push(val)
		}
	})
	taskarray.sort((a, b) => (a.order > b.order) ? 1 : -1)
	return taskarray
}

function getTasksByInstituteID (id){
	var taskids = rlc.data.institute2task.filter(item => item.institute_id == id)
	taskarray = []

	$.each(taskids,function(i,val){
		task = rlc.data.tasks.filter(item => item.id == val.task_id)[0]
		taskarray.push(task)
	})

	// taskarray.sort((a, b) => (a.order > b.order) ? 1 : -1)
	taskarray.sort((a, b) => a.phase_id.localeCompare(b.phase_id) || b.order - a.order);
	return taskarray
}

function getTaskByTaskID (id){
	console.log(id)
	var task = rlc.data.tasks.filter(item => item.id == id)[0]
	console.log(task)
	return task
}

function getInstitutesByTaskID (taskid){
	var institutearray = []
	$.each(rlc.data.institute2task,function(i,val){
		if(val.task_id == taskid)
		{
			institutearray.push(val)
		}
	})
	institutearray.sort((a, b) => (a.order > b.order) ? 1 : -1)
	return institutearray
}

function getInstituteByInstituteID (instituteid){
	var institute
	$.each(rlc.data.institutes,function(i,val){
		if(val.id == instituteid)
		{
			institute = val
		}
	})
	return institute
}

function createNodesAndEdges()
{
	// Idea logo
	rlc.nodes.push(
			{id: 'idea', level: 0, group: 100, image: 'images/idea.png', shape: 'image', size: 100,  x: -450, y: 100, font:{color:'#ffffff'}},)

	previous_node_id = 'idea'

	// loop through phases
	$.each(rlc.data.phases, function(i,phase){

		// get the position in the grid for this node
		coords = getNextXY()
		var thisphase = 
		{
			id: phase.id+'_phase', 
			level: i+1,
			x: coords[0],
			y: coords[1],
			label: phase.name,
			// label: phase.id+' ' +phase.name,
			color: {
				border: phase.color,
				background: phase.color
			},
			title: '<h1>'+phase.name + '</h1><p>' + phase.description + '</p>'
		}

		// draw the arrow from the previous node to this phase
		console.log('create arrow from '+ previous_node_id+' to '+phase.id+'_phase')
		rlc.edges.push(
			{
				from: previous_node_id, 
				to: phase.id+'_phase', 
				// from: rlc.options.nodeidstart-1, 
				// to: rlc.options.nodeidstart, 
				arrows:'to', 
				smooth: { 
					enabled: rlc.options.curved_edge, 
					"type": rlc.options.curved_edge_type, 
					roundness: 0.5
				}
			},
		)

		// append new data and phase options to the phase object 
		phase = $.extend({}, phase,thisphase,rlc.node_options.phase)

		//add to nodes
		rlc.nodes.push(phase)

		// reset the previous node
		previous_node_id = phase.id

		// get tasks for this phase
		tasksbythisphase = getTasksByPhaseID(phase.name)

		// loop and add nodes
		$.each(tasksbythisphase, function(j,task){

			// append task options to this task
			task = $.extend({}, task,rlc.node_options.task)

			// set task attributes
			task.level = i+1
			task.label = task.name
			// task.label = task.id+' ' +task.name
			task.title = '<h3>'+task.name + '</h3><p>' + task.description + '</p>'
			task.color = {
				border: phase.color.border,
				background: 'white'
			}

			// set the position in grid
			coords = getNextXY()
			task.x = coords[0]
			task.y = coords[1]

			rlc.nodes.push(task)

			// create the arrow from previous node to this task
			console.log('create arrow from '+previous_node_id+' to '+task.id)
			rlc.edges.push(
				{
					from: previous_node_id, 
					// from: rlc.options.nodeidstart-1, 
					to: task.id, 
					// to: rlc.options.nodeidstart, 
					arrows:'to', 
					smooth: { 
						enabled: rlc.options.curved_edge, 
						"type": rlc.options.curved_edge_type, 
						roundness: 0.5
					}
				},
			)

			previous_node_id = task.id
		})
	})

	// now that the nodes and edges are set, create the network
	createNetwork()
}

function createNetwork(){

	// create a network
	rlc.container = document.getElementById('mynetwork');

	// set the nodes and edges
	rlc.data.nodes = new vis.DataSet(rlc.nodes)
	rlc.data.edges = new vis.DataSet(rlc.edges)

	rlc.network_options = {
		edges: {
			width: 4,
			// length: 400
		},
		interaction:{
			hover:true,
			tooltipDelay: 0,

		},
	};

	rlc.network = new vis.Network(rlc.container, rlc.data, rlc.network_options);

	rlc.network.fit()

	// hover a node and show information in the side panel
	rlc.network.on("hoverNode", function (params) {

		$("#infopanel").html('<h2>'+rlc.data.nodes.get(params.node).label+'</h2>')
		if(params.node>=100)
		{
			// showModal()			
		}
		else if (params.node < 100)
		{
			console.log(params)
			addInstitutes2Task(params.node)
		}
		else if (params.node = undefined)
		{
			console.log('oh no, you clicked in space')
		}

	});

	// click on a node and show information in a modal
	rlc.network.on("click", function (params) {
		// if clicking on a node that is an institute, show modal, otherwise, expand
		if(params.nodes[0]>=100)
		{
			showModal()			
		}
		else if (params.nodes[0] < 100)
		{
			addInstitutes2Task(params.nodes[0])
			rlc.network.focus(params.nodes[0],{
				scale:1,
				animation:true
			})
		}
		else if (params.nodes[0] = undefined)
		{
			console.log('oh no, you clicked in space')
		}

	});

}

function addInstitutes2Task(taskid)
{
	// find institutes that support this task
	var institute_array = []
	$.each(rlc.data.institute2task,function(i,val){
		if(val.task_id.id == taskid)
		{
			institute_array.push(val)
		}
	})
	console.log('number of institutes for this task: '+institute_array.length)
	if(institute_array.length > 0) 
	{

		var institute_id_start = 100
		var x = rlc.data.nodes.get(taskid).x
		var y = rlc.data.nodes.get(taskid).y
		var x_distance_between_nodes = 70
		var y_distance_between_nodes = 70
		var radius = 150
		var buffer_angle = 60 //degrees
		var available_arc_angle = 180-buffer_angle*2

		// distribute the nodes on an arc to the right side of the task node
		// give a starting and ending buffer of 20 degrees on top and at the bottom
		// to avoid overlap

		if (institute_array.length == 1)
		{
			var angle_per_pie = 0
		}
		else
		{
			var angle_per_pie = available_arc_angle/(institute_array.length-1)
		}

		rlc.data.nodes.remove(100)
		rlc.data.nodes.remove(101)
		rlc.data.nodes.remove(102)
		rlc.data.nodes.remove(103)
		rlc.data.nodes.remove(104)
		rlc.data.edges.remove(100)
		rlc.data.edges.remove(101)
		rlc.data.edges.remove(102)
		rlc.data.edges.remove(103)
		rlc.data.edges.remove(104)


		$.each(institute_array,function(i,institute){

			var total_angle = buffer_angle+(i*angle_per_pie)
			
			// convert angles to radians
			var total_radians = total_angle*(Math.PI/180)

			var thisx = x-Math.sin(total_radians)*radius
			if (total_angle<90){
				var thisy = y-Math.cos(total_radians)*radius
			}
			else if (total_angle == 90)
			{
				var thisy = y
			}
			else
			{
				var thisy = y-Math.cos(total_radians)*radius
			}

			institute = $.extend({}, institute,rlc.node_options.institute)

			institute.id = institute_id_start+i
			institute.x = thisx
			institute.y = thisy
			institute.label = institute.institute_id.acronym, 
			institute.title = '<h3>'+institute.institute_id.name+'</h3><p>'+institute.institute_id.description+'</p>'
			institute.color.border = institute.institute_id.color
			institute.color.background = institute.institute_id.color

			rlc.data.nodes.add(institute)

			// rlc.data.nodes.add(
			// 	{
			// 		id: 			institute_id_start+i, 
			// 		shape: 			'box',
			// 		fixed: 			true, 
			// 		x: 				thisx, 
			// 		y: 				thisy, 
			// 		label: 			institute.institute_id.acronym, 
			// 		title: 			'<h3>'+institute.institute_id.name+'</h3><p>'+institute.institute_id.description+'</p>', 
			// 		borderWidth: 	2,
			// 		color:{border: 	'white',
			// 		background: 	'darkblue'}, 
			// 		size: 			6, 
			// 		font: {
			// 						size: 10,	
			// 						color: '#ffffff', 
			// 						strokeWidth:2, 
			// 						strokeColor:'#222'
			// 		}
			// 	})

			rlc.data.edges.add(
				{
					id: 			institute_id_start+i, 
					from: 			institute_id_start+i, 
					to: 			taskid, 
					width: 			1, 
					length: 		50, 
					smooth: { 
									enabled: false
					}
				})
			
		})		
	}


}


function getNextXY(task)
{
	// go down
	if ((rlc.options.direction == 'down')&&(rlc.options.current_y < rlc.options.nodes_per_column*rlc.options.ydistance_between))
	{
		x = rlc.options.current_x
		y = rlc.options.current_y
		rlc.options.current_y = rlc.options.current_y + rlc.options.ydistance_between
		rlc.options.curved_edge = false
	}
	// go across and up
	else if ((rlc.options.direction == 'down')&&(rlc.options.current_y == rlc.options.nodes_per_column*rlc.options.ydistance_between))
	{
		rlc.options.current_x = rlc.options.current_x + rlc.options.xdistance_between
		rlc.options.current_y = rlc.options.current_y - rlc.options.ydistance_between
		x = rlc.options.current_x
		y = rlc.options.current_y
		rlc.options.direction = 'up'
		rlc.options.curved_edge = true
		rlc.options.curved_edge_type = 'curvedCCW'
	}
	// go up
	else if(rlc.options.direction == 'up' && rlc.options.current_y > 0)
	{
		rlc.options.current_y = rlc.options.current_y - rlc.options.ydistance_between
		x = rlc.options.current_x
		y = rlc.options.current_y
		rlc.options.curved_edge = false
	}
	// go across and down
	else if (rlc.options.direction == 'up' && rlc.options.current_y == 0)
	{
		rlc.options.current_x = rlc.options.current_x + rlc.options.xdistance_between
		x = rlc.options.current_x
		y = rlc.options.current_y
		rlc.options.current_y = rlc.options.current_y + rlc.options.ydistance_between
		rlc.options.direction = 'down'			
		rlc.options.curved_edge = true
		rlc.options.curved_edge_type = 'curvedCW'
	}
	return [x,y]
}

function showModal(){
	$('#exampleModalCenter').modal('show');
}

/* **************************** 

	Institute

***************************** */ 

function showInstitute(id){
	// hide other stuff
	toggleContent('institute')
	// $('#main-network').hide()
	// $('#main-list').hide()
	
	institute = getInstituteByInstituteID(id)
	console.log(institute)
	html = '';

	html += `<span class="badge badge-primary" style="font-weight: 400;background-color:${institute.color}">${institute.acronym}</span><h1 class="display-4">${institute.name}</h1><small>${institute.url}</small><p>${institute.description}</p>`

	/*
	
		show children
	
	*/ 

	var children = rlc.data.institutes.filter(item=>item.parent_id == id)

	if(children.length>0){
		html += '<h2>Sub-units</h2>'
		html += '<table class="table table-borderless">'
		children.forEach(element => {
			html += '<tr style="border-bottom:1px solid gainsboro;"><td>'
			html += `<h3>${element.name}</h3><a href="${element.url}" class="text-muted" style="font-size:0.7em" target="_blank">${element.url}</a><p style="margin-left:20px">${element.description}</p></td></tr>`
		});
		html += '</table>'
	}

	/*
	
		show tasks
	
	*/ 
	tasks = getTasksByInstituteID(id);

	// table option
	html += '<h2>Supported tasks</h2>'
	html += '<table class="table table-borderless">'
	$.each(tasks,function(j,task){
		// what phase?
		var phase = rlc.data.phases.filter(item => item.id == task.phase_id)[0]
		var institutes = getInstitutesByTaskID(task.id)
		html += '<tr style="border-bottom:1px solid gainsboro;">'
		html += '<td><div class="circle-small" style="background:'+phase.color+'">'+phase.name+'</div><div class="vl" style="color:'+institute.color+'"></div></td>'
		html += '<td><h3>'+task.name
		html += rlc.icons.more_info+'</h3>'
		html += '<p>'+task.description+'</p>'
		// html += '</td>'
		$.each(institutes,function(k,institute){
			thisinstitute = getInstituteByInstituteID(institute.institute_id)
			html += `<a href="#" class="badge badge-primary" onclick="showInstitute(${thisinstitute.id})" style="font-weight: 400;background-color:${thisinstitute.color}">${thisinstitute.acronym}</a> `
			// html += '<a href="#" class="badge badge-primary" onclick="showInstitute(${val.id})" style="font-weight: 400;background-color:'+thisinstitute.color+'">'+thisinstitute.acronym+'</a> ' 
		})
		html += '</td>'
		html += '</tr>'
	})
	html += '</table>'

	$('#main-institute').html(html)
}

/* **************************** 

	Task

***************************** */ 

function showTask(id){
	console.log(id)
	// hide other stuff
	toggleContent('task')
	// $('#main-network').hide()
	// $('#main-list').hide()
	task = getTaskByTaskID(id)
	phase = rlc.data.phases.filter(item => item.id == task.phase_id)[0]
	console.log(task)

	// institute = getInstituteByInstituteID(id)
	// console.log(institute)
	html = '';

	html += `<span class="text-muted" style="font-size:0.8em">Phase: ${phase.name}</span>
		<h1 class="display-6">Task: ${task.name}</h1><p>${task.description}</p>`

	html += '<h2>Supporting entities</h2>'
	html += '<table class="table table-borderless">'

	var institutes = getInstitutesByTaskID(id)

	html_institutes = '';
	$.each(institutes,function(k,institute){
		thisinstitute = getInstituteByInstituteID(institute.institute_id)

		html += '<tr style="border-bottom:1px solid gainsboro;">'
		html += '<td><div class="circle-small" style="background:'+thisinstitute.color+'">'+thisinstitute.acronym+'</div></td>'
		html += `<td><h3>${thisinstitute.name}</h3>
				<p>${thisinstitute.description}</p>`

		// html_institutes += `<span class="badge badge-primary" style="font-weight: 400;background-color:${thisinstitute.color}">${thisinstitute.acronym}</span><span style="font-size:.8em">${thisinstitute.name}</span>`
		// html_institutes += `<span class="dot" title="${thisinstitute.acronym}" data-toggle="tooltip" onclick="showInstitute(${institute.institute_id})" style="background-color:${thisinstitute.color}"></span> `
	})

		
	// table option
	// html += '<table class="table">'
	// $.each(tasks,function(j,task){
	// 	// what phase?
	// 	var phase = rlc.data.phases.filter(item => item.id == task.phase_id)[0]
	// 	var institutes = getInstitutesByTaskID(task.id)
	// 	html += '<tr>'
	// 	html += '<td><div class="circle-small" style="background:'+phase.color+'">'+phase.name+'</div><div class="vl" style="color:'+institute.color+'"></div></td>'
	// 	html += '<td><h3>'+task.name
	// 	html += rlc.icons.more_info+'</h3>'
	// 	html += '<p>'+task.description+'</p>'
	// 	// html += '</td>'
	// 	$.each(institutes,function(k,institute){
	// 		thisinstitute = getInstituteByInstituteID(institute.institute_id)
	// 		html += '<a href="#" class="badge badge-primary" style="font-weight: 400;background-color:'+thisinstitute.color+'">'+thisinstitute.acronym+'</a> ' 
	// 	})
	// 	html += '</td>'
	// 	html += '</tr>'
	// })
	// html += '</table>'

	$('#main-institute').html(html)
}