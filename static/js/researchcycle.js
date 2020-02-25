// namespace
var rlc = {}

// data
// rlc.data = {
// 	phases: [
// 		{
// 			name: 'Plan',
// 			color: '#f1c232'
// 		},
// 		{
// 			name: 'Develop',
// 			color: '#cc4125'
// 		},
// 		{
// 			name: 'Launch',
// 			color: '#3c78d8'
// 		},
// 		{
// 			name: 'Preserve',
// 			color: '#6aa84f'
// 		},
// 	],
// 	tasks: [
// 		{
// 			name: 'Project concept & scoping',
// 			phase: 'Plan',
// 			order: 1
// 		},
// 		{
// 			name: 'Funding',
// 			phase: 'Plan',
// 			order: 2
// 		},
// 		{
// 			name: 'Literature review & landscape scan',
// 			phase: 'Plan',
// 			order: 3
// 		},
// 		{
// 			name: 'Workshops & trainings',
// 			phase: 'Plan',
// 			order: 4
// 		},
// 		{
// 			name: 'Tools & best practices',
// 			phase: 'Plan',
// 			order: 5
// 		},
// 		{
// 			name: 'Data models & structures',
// 			phase: 'Plan',
// 			order: 6
// 		},
// 		{
// 			name: 'Prototyping',
// 			phase: 'Plan',
// 			order: 7
// 		},
// 		{
// 			name: 'Ethics, compliance & security',
// 			phase: 'Plan',
// 			order: 8
// 		},
// 		{
// 			name: 'Project management guidance',
// 			phase: 'Plan',
// 			order: 9
// 		},
// 		{
// 			name: 'Grant proposal development',
// 			phase: 'Develop',
// 			order: 1
// 		},
// 		{
// 			name: 'Data management plan',
// 			phase: 'Develop',
// 			order: 2
// 		},
// 		{
// 			name: 'Data collection & manipulation',
// 			phase: 'Develop',
// 			order: 3
// 		},
// 		{
// 			name: 'Advanced computation',
// 			phase: 'Develop',
// 			order: 4
// 		},
// 		{
// 			name: 'Statistical analysis',
// 			phase: 'Develop',
// 			order: 5
// 		},
// 		{
// 			name: 'Data visualization',
// 			phase: 'Develop',
// 			order: 6
// 		},
// 		{
// 			name: 'GIS & mapping',
// 			phase: 'Develop',
// 			order: 7
// 		},
// 		{
// 			name: '3D, VR & AR',
// 			phase: 'Develop',
// 			order: 8
// 		},
// 		{
// 			name: 'Text analysis',
// 			phase: 'Develop',
// 			order: 9
// 		},
// 		{
// 			name: 'Copyright & Permissions',
// 			phase: 'Launch',
// 			order: 1
// 		},
// 		{
// 			name: 'Web development & hosting',
// 			phase: 'Launch',
// 			order: 2
// 		},
// 		{
// 			name: 'Open access',
// 			phase: 'Launch',
// 			order: 3
// 		},
// 		{
// 			name: 'Publishing',
// 			phase: 'Launch',
// 			order: 4
// 		},
// 		{
// 			name: 'Project maintenance',
// 			phase: 'Preserve',
// 			order: 1
// 		},
// 		{
// 			name: 'Digital repository',
// 			phase: 'Preserve',
// 			order: 2
// 		},
// 		{
// 			name: 'Data archive and preservation',
// 			phase: 'Preserve',
// 			order: 3
// 		},
// 		{
// 			name: 'Data curation',
// 			phase: 'Preserve',
// 			order: 4
// 		},
// 		{
// 			name: 'Licensing & IP',
// 			phase: 'Preserve',
// 			order: 5
// 		},
// 		{
// 			name: 'Grant conclusion',
// 			phase: 'Preserve',
// 			order: 6
// 		},
// 	]
// }

rlc.options = {
	ydistance_between: 150,
	xdistance_between: 400,
	current_x: 0,
	current_y: 0,
	direction: 'down',
	curved_edge: false,
	curved_edge_type: 'curvedCW',
	nodes_per_column: 6,
	nodeidstart: 0,
}

rlc.nodes = [];
rlc.edges = [];
rlc.data = {
	tasks: []
}

rlc.network = ''

$(function() {
	console.log('initializing...')

	$.getJSON('/api/task',function(data){
		$.each(data,function(i,val){
			rlc.data.tasks.push(val)
		})
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

	// add edge
	// rlc.edges.push(
	// 	{from: 0, to: 1, length: 400, arrows:'to',dashes:[2,10], smooth: { enabled: true, "type": "curvedCW", roundness: 0.75}},)

	// loop through phases
	$.getJSON('/api/phase',function(data){
		console.log(data)

		$.each(data, function(i,phase){
			// create title node

			coords = getNextXY()

			console.log(phase.name)
			console.log(coords)
			var thisphase = 
			{
				id: rlc.options.nodeidstart, 
				level: i+1,
				x: coords[0],
				y: coords[1],
				label: phase.name,
				color: {
					border: phase.color,
					background: phase.color
				},
				font:{size: 25},
				shape: 'box',
				title:phase.name
			}

			rlc.edges.push(
				{from: rlc.options.nodeidstart-1, to: rlc.options.nodeidstart, arrows:'to', smooth: { enabled: rlc.options.curved_edge, "type": rlc.options.curved_edge_type, roundness: 0.5}},
			)

			previous_phase_id = rlc.options.nodeidstart

			//add to nodes
			rlc.nodes.push(thisphase)

			rlc.options.nodeidstart++

			// get tasks for this phase
			tasksbythisphase = getTasksByPhase(phase.name)

			// loop and add node
			$.each(tasksbythisphase, function(j,task){
				task.id = rlc.options.nodeidstart
				task.level = i+1
				task.label = task.name
				task.title = task.name

				coords = getNextXY()
				task.x = coords[0]
				task.y = coords[1]

				task.color = {
					border: phase.color,
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

	})

}

function createNetwork(){

	// create a network
	rlc.container = document.getElementById('mynetwork');

	// set the nodes and edges
	rlc.data.nodes = new vis.DataSet(rlc.nodes)
	rlc.data.edges = new vis.DataSet(rlc.edges)

	rlc.network_options = {
		physics: {
			stabilization: {enabled: false, fit: true},
			enabled: true,
			forceAtlas2Based: {
				gravitationalConstant: -2000,
				centralGravity: 0.01,
				springConstant: 0.08,
				springLength: 1,
				damping: 0.4,
				avoidOverlap: 1
			},
			solver: 'barnesHut',
		},
		nodes: {
			shape: 'dot',
			margin: 20,
			widthConstraint: {
				maximum: 180,
				minimum: 80
			},
			size: 20,
			font: {
				size: 16,
				color: '#ffffff',
				strokeWidth:5, 
				strokeColor:'#222'
			},
			borderWidth: 4,
			fixed: true,
		},
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

	rlc.network.on("hoverNode", function (params) {
		console.log('hoverNode Event:', params);
		$("#infopanel").html('<h2>'+rlc.data.nodes.get(params.node).label+'</h2>')
	});
	rlc.network.on("click", function (params) {
		addInstitutes2Task(params.nodes[0])
		params.event = "[original event]";
		document.getElementById('infopanel').innerHTML = '<h2>Click event for '+params.nodes[0]+':</h2>' + JSON.stringify(rlc.data.nodes.get(params.nodes[0]), null, 4);
		console.log(params.nodes[0]);
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
	return taskarray
}

function addInstitutes2Task(taskid)
{
		rlc.data.nodes.remove(100)
		rlc.data.nodes.remove(101)
		rlc.data.nodes.remove(102)
		rlc.data.nodes.remove(103)
		rlc.data.nodes.remove(104)

		// Institutes
		rlc.data.nodes.add({id: 100, fixed: false, label: "IDRE", borderWidth: 2,color:{border:'white',background: 'darkblue'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})
		rlc.data.nodes.add({id: 101, fixed: false, label: "Library", borderWidth: 2,color:{border:'white',background: 'lightgreen'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})
		rlc.data.nodes.add({id: 102, fixed: false, label: "Data Science Center", borderWidth: 2,color:{border:'white',background: 'brown'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})
		rlc.data.nodes.add({id: 103, fixed: false, label: "Local", borderWidth: 2,color:{border:'white',background: 'yellow'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})
		rlc.data.nodes.add({id: 104, fixed: false, label: "Peers", borderWidth: 2,color:{border:'white',background: 'purple'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})

		rlc.data.edges.remove(100)
		rlc.data.edges.remove(101)
		rlc.data.edges.remove(102)
		rlc.data.edges.remove(103)
		rlc.data.edges.remove(104)

		rlc.data.edges.add({id: 100, from: 100, to: taskid, width: 1, length: 50, smooth: { enabled: false}})
		rlc.data.edges.add({id: 101, from: 101, to: taskid, width: 1, length: 50, smooth: { enabled: false}})
		rlc.data.edges.add({id: 102, from: 102, to: taskid, width: 1, length: 50, smooth: { enabled: false}})
		rlc.data.edges.add({id: 103, from: 103, to: taskid, width: 1, length: 50, smooth: { enabled: false}})
		rlc.data.edges.add({id: 104, from: 104, to: taskid, width: 1, length: 50, smooth: { enabled: false}})


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


