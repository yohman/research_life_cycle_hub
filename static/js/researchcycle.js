// namespace
var rlc = {
	options: {
		ydistance_between: 	200,
		xdistance_between: 	450,
		current_x: 			0,
		current_y: 			0,
		direction: 			'down',
		curved_edge: 		false,
		curved_edge_type: 	'curvedCW',
		nodes_per_column: 	7,
		nodeidstart: 		0,
	},
	nodes: [],
	edges: [],
	data: {
		tasks: [],
		phases: [],
		institute2task: []
	},
	network: '',
	node_options: {
		phase: {
			font:{
				size: 50,
				color: '#ffffff',
				face: 'Economica'
			},
			shape: 'box',
			margin: 20,
			widthConstraint: {
				maximum: 200,
				minimum: 200
			},
			size: 20,
			borderWidth: 4,
			fixed: true,
		},
		task: {
			shape: 'dot',
			margin: 20,
			widthConstraint: {
				maximum: 180,
				minimum: 80
			},
			size: 20,
			font: {
				size: 24,
				color: '#ffffff',
				strokeWidth:5, 
				strokeColor:'#222',
				face: 'Economica'
			},
			borderWidth: 4,
			fixed: true,
		},
		institute: {
			shape: 'box',
			margin: 6,
			widthConstraint: {
				maximum: 100,
				minimum: 40
			},
			size: 10,
			color: {
				background:'#fff',
				border: '#666699'
			},
			font: {
				size: 14,
				color: '#fff',
				face: 'Economica'
				// strokeWidth:5, 
				// strokeColor:'#222'
			},
			borderWidth: 4,
			fixed: true,
		},
	}
}

$(function() {

	// get the data from multiple api requests first
	// then start drawing the network map
	$.when(
		$.getJSON('/api/task',function(data){
			$.each(data,function(i,val){
				rlc.data.tasks.push(val)
			})
		}),
		$.getJSON('/api/phase',function(data){
			$.each(data,function(i,val){
				rlc.data.phases.push(val)
			})
		}),
		$.getJSON('/api/institute2task',function(data){
			$.each(data,function(i,val){
				rlc.data.institute2task.push(val)
			})
		}),

	).then(function() {
		// start by creating the nodes and edges
		createNodesAndEdges()

	})

});

function createNodesAndEdges()
{
	// Idea logo
	rlc.nodes.push(
			{id: rlc.options.nodeidstart, level: 0, group: 100, image: '../static/images/idea.png', shape: 'image', size: 100,  x: -450, y: 100, font:{color:'#ffffff'}},)

	// increment node id
	rlc.options.nodeidstart++

	// loop through phases

	$.each(rlc.data.phases, function(i,phase){


		coords = getNextXY()
		var thisphase = 
		{
			id: rlc.options.nodeidstart, 
			level: i+1,
			x: coords[0],
			y: coords[1],
			label: phase.id+' ' +phase.name,
			color: {
				border: phase.color,
				background: phase.color
			},
			title: '<h1>'+phase.name + '</h1><p>' + phase.description + '</p>'
		}

		rlc.edges.push(
			{from: rlc.options.nodeidstart-1, to: rlc.options.nodeidstart, arrows:'to', smooth: { enabled: rlc.options.curved_edge, "type": rlc.options.curved_edge_type, roundness: 0.5}},
		)

		phase = $.extend({}, phase,thisphase,rlc.node_options.phase)

		previous_phase_id = rlc.options.nodeidstart

		//add to nodes
		rlc.nodes.push(phase)

		rlc.options.nodeidstart++

		// get tasks for this phase
		tasksbythisphase = getTasksByPhase(phase.name)

		// loop and add node
		$.each(tasksbythisphase, function(j,task){

			task = $.extend({}, task,rlc.node_options.task)

			task.id = rlc.options.nodeidstart
			task.level = i+1
			task.label = task.id+' ' +task.name
			task.title = '<h3>'+task.name + '</h3><p>' + task.description + '</p>'

			coords = getNextXY()
			task.x = coords[0]
			task.y = coords[1]

			task.color = {
				border: phase.color.border,
				background: 'white'
			}

			rlc.nodes.push(task)
			rlc.edges.push(
				{from: rlc.options.nodeidstart-1, to: rlc.options.nodeidstart, arrows:'to', smooth: { enabled: rlc.options.curved_edge, "type": rlc.options.curved_edge_type, roundness: 0.5}},
			)
			rlc.options.nodeidstart++
		})
	})
	// now that the nodes are done, create the network
	createNetwork()

}

function createNetwork(){

	// create a network
	rlc.container = document.getElementById('mynetwork');

	// set the nodes and edges
	rlc.data.nodes = new vis.DataSet(rlc.nodes)
	rlc.data.edges = new vis.DataSet(rlc.edges)

	rlc.network_options = {
		// physics: {
		// 	stabilization: {enabled: false, fit: true},
		// 	enabled: true,
		// 	forceAtlas2Based: {
		// 		gravitationalConstant: -2000,
		// 		centralGravity: 0.01,
		// 		springConstant: 0.08,
		// 		springLength: 1,
		// 		damping: 0.4,
		// 		avoidOverlap: 1
		// 	},
		// 	solver: 'barnesHut',
		// },
		// nodes: {
		// 	shape: 'dot',
		// 	margin: 20,
		// 	widthConstraint: {
		// 		maximum: 180,
		// 		minimum: 80
		// 	},
		// 	size: 20,
		// 	font: {
		// 		size: 16,
		// 		color: '#ffffff',
		// 		strokeWidth:5, 
		// 		strokeColor:'#222'
		// 	},
		// 	borderWidth: 4,
		// 	fixed: true,
		// },
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
	// rlc.network.on("hoverNode", function (params) {

	// 	$("#infopanel").html('<h2>'+rlc.data.nodes.get(params.node).label+'</h2>')
	// 	if(params.node>=100)
	// 	{
	// 		// showModal()			
	// 	}
	// 	else if (params.node < 100)
	// 	{
	// 		addInstitutes2Task(params.node)
	// 	}
	// 	else if (params.node = undefined)
	// 	{
	// 		console.log('oh no, you clicked in space')
	// 	}

	// });

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
		}
		else if (params.nodes[0] = undefined)
		{
			console.log('oh no, you clicked in space')
		}

	});

}

function getTasksByPhase (phase){
	var taskarray = []
	$.each(rlc.data.tasks,function(i,val){
		if(val.phase_id.name == phase)
		{
			taskarray.push(val)
		}
	})
	taskarray.sort((a, b) => (a.order > b.order) ? 1 : -1)
	return taskarray
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
			
			console.log(total_angle)
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

