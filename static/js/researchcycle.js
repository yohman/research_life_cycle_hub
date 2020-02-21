// namespace
var rlc = {}

// data
rlc.data = {
	phases: [
		{
			name: 'Plan',
			color: '#f1c232'
		},
		{
			name: 'Develop',
			color: '#cc4125'
		},
		{
			name: 'Launch',
			color: '#3c78d8'
		},
		{
			name: 'Preserve',
			color: '#6aa84f'
		},
	],
	tasks: [
		{
			name: 'Project concept & scoping',
			phase: 'Plan',
			order: 1
		},
		{
			name: 'Funding',
			phase: 'Plan',
			order: 2
		},
		{
			name: 'Literature review & landscape scan',
			phase: 'Plan',
			order: 3
		},
		{
			name: 'Workshops & trainings',
			phase: 'Plan',
			order: 4
		},
		{
			name: 'Tools & best practices',
			phase: 'Plan',
			order: 5
		},
		{
			name: 'Data models & structures',
			phase: 'Plan',
			order: 6
		},
		{
			name: 'Prototyping',
			phase: 'Plan',
			order: 7
		},
		{
			name: 'Ethics, compliance & security',
			phase: 'Plan',
			order: 8
		},
		{
			name: 'Project management guidance',
			phase: 'Plan',
			order: 9
		},
		{
			name: 'Grant proposal development',
			phase: 'Develop',
			order: 1
		},
		{
			name: 'Data management plan',
			phase: 'Develop',
			order: 2
		},
		{
			name: 'Data collection & manipulation',
			phase: 'Develop',
			order: 3
		},
		{
			name: 'Advanced computation',
			phase: 'Develop',
			order: 4
		},
		{
			name: 'Statistical analysis',
			phase: 'Develop',
			order: 5
		},
		{
			name: 'Data visualization',
			phase: 'Develop',
			order: 6
		},
		{
			name: 'GIS & mapping',
			phase: 'Develop',
			order: 7
		},
		{
			name: '3D, VR & AR',
			phase: 'Develop',
			order: 8
		},
		{
			name: 'Text analysis',
			phase: 'Develop',
			order: 9
		},
		{
			name: 'Copyright & Permissions',
			phase: 'Launch',
			order: 1
		},
		{
			name: 'Web development & hosting',
			phase: 'Launch',
			order: 2
		},
		{
			name: 'Open access',
			phase: 'Launch',
			order: 3
		},
		{
			name: 'Publishing',
			phase: 'Launch',
			order: 4
		},
		{
			name: 'Project maintenance',
			phase: 'Preserve',
			order: 1
		},
		{
			name: 'Digital repository',
			phase: 'Preserve',
			order: 2
		},
		{
			name: 'Data archive and preservation',
			phase: 'Preserve',
			order: 3
		},
		{
			name: 'Data curation',
			phase: 'Preserve',
			order: 4
		},
		{
			name: 'Licensing & IP',
			phase: 'Preserve',
			order: 5
		},
		{
			name: 'Grant conclusion',
			phase: 'Preserve',
			order: 6
		},
	]
}

function getTasksByPhase (phase){
	var taskarray = []
	$.each(rlc.data.tasks,function(i,val){
		if(val.phase == phase)
		{
			taskarray.push(val)
		}
	})
	return taskarray
}

var groupcolors = {
	planning: {
		border: '#f1c232',
		background: '#f1c232'
	},
	planning_task: {
		border: '#f1c232',
		background: '#fff'
	},
	development: {
		border: '#cc4125',
		background: '#cc4125'
	},
	development_task: {
		border: '#cc4125',
		background: '#fff'
	},
	launch: {
		border: '#3c78d8',
		background: '#3c78d8'
	},
	launch_task: {
		border: '#3c78d8',
		background: '#fff'
	},
	preservation: {
		border: '#6aa84f',
		background: '#6aa84f'
	},
	preservation_task: {
		border: '#6aa84f',
		background: '#fff'
	},
}

var ydistance_between = 200;
var xdistance_between = 400;
var current_x = 0
var current_y = 0
var direction = 'down'
var curved_edge = false
var curved_edge_type = 'curvedCW'
var nodes_per_column = 5

var nodeidstart = 0;

var nodes = [];
var edges = [];

nodes.push(// Idea logo
		{id: nodeidstart, level: 0, group: 100, image: '../static/images/idea.png', shape: 'image', size: 100,  x: -450, y: 100, font:{color:'#ffffff'}},)
nodeidstart++

edges.push(
	{from: 0, to: 1, length: 400, arrows:'to',dashes:[2,10], smooth: { enabled: true, "type": "curvedCW", roundness: 0.75}},)

// loop through phases
$.each(rlc.data.phases, function(i,phase){
	// create title node

	coords = getNextXY()

	console.log(phase.name)
	console.log(coords)
	var thisphase = 
	{
		id: nodeidstart, 
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

		edges.push(
			{from: nodeidstart-1, to: nodeidstart, arrows:'to', smooth: { enabled: curved_edge, "type": curved_edge_type, roundness: 0.5}},
		)

	previous_phase_id = nodeidstart

	//add to nodes
	nodes.push(thisphase)

	nodeidstart++

	// get tasks for this phase
	tasksbythisphase = getTasksByPhase(phase.name)


	// loop and add node
	$.each(tasksbythisphase, function(j,task){
		task.id = nodeidstart
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

		nodes.push(task)
		edges.push(
			{from: nodeidstart-1, to: nodeidstart, arrows:'to', smooth: { enabled: curved_edge, "type": curved_edge_type, roundness: 0.5}},
		)
		nodeidstart++
	})
})

function getNextXY(task)
{
	// go down
	if ((direction == 'down')&&(current_y < nodes_per_column*ydistance_between))
	{
		x = current_x
		y = current_y
		current_y = current_y + ydistance_between
		curved_edge = false
	}
	// go across and up
	else if ((direction == 'down')&&(current_y == nodes_per_column*ydistance_between))
	{
		current_x = current_x + xdistance_between
		current_y = current_y - ydistance_between
		x = current_x
		y = current_y
		direction = 'up'
		curved_edge = true
		curved_edge_type = 'curvedCCW'
	}
	// go up
	else if(direction == 'up' && current_y > 0)
	{
		current_y = current_y - ydistance_between
		x = current_x
		y = current_y
		curved_edge = false
	}
	// go across and down
	else if (direction == 'up' && current_y == 0)
	{
		current_x = current_x + xdistance_between
		x = current_x
		y = current_y
		current_y = current_y + ydistance_between
		direction = 'down'			
		curved_edge = true
		curved_edge_type = 'curvedCW'
	}
	return [x,y]
}


// create a network
var container = document.getElementById('mynetwork');
var data = {
	nodes: new vis.DataSet(nodes),
	edges: new vis.DataSet(edges)
};
var options = {
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
network = new vis.Network(container, data, options);

network.fit()

network.on("hoverNode", function (params) {
	console.log('hoverNode Event:', params);
	$("#infopanel").html('<h2>'+data.nodes.get(params.node).label+'</h2>')
});
network.on("click", function (params) {
	addInstitutes2Task(params.nodes[0])
	params.event = "[original event]";
	document.getElementById('infopanel').innerHTML = '<h2>Click event for '+params.nodes[0]+':</h2>' + JSON.stringify(data.nodes.get(params.nodes[0]), null, 4);
	console.log(params.nodes[0]);
});

function addInstitutes2Task(taskid)
{
		data.nodes.remove(100)
		data.nodes.remove(101)
		data.nodes.remove(102)
		data.nodes.remove(103)
		data.nodes.remove(104)

		// Institutes
		data.nodes.add({id: 100, fixed: false, label: "IDRE", borderWidth: 2,color:{border:'white',background: 'darkblue'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})
		data.nodes.add({id: 101, fixed: false, label: "Library", borderWidth: 2,color:{border:'white',background: 'lightgreen'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})
		data.nodes.add({id: 102, fixed: false, label: "Data Science Center", borderWidth: 2,color:{border:'white',background: 'brown'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})
		data.nodes.add({id: 103, fixed: false, label: "Local", borderWidth: 2,color:{border:'white',background: 'yellow'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})
		data.nodes.add({id: 104, fixed: false, label: "Peers", borderWidth: 2,color:{border:'white',background: 'purple'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}})


		data.edges.remove(100)
		data.edges.remove(101)
		data.edges.remove(102)
		data.edges.remove(103)
		data.edges.remove(104)

		data.edges.add({id: 100, from: 100, to: taskid, width: 1, length: 50, smooth: { enabled: false}})
		data.edges.add({id: 101, from: 101, to: taskid, width: 1, length: 50, smooth: { enabled: false}})
		data.edges.add({id: 102, from: 102, to: taskid, width: 1, length: 50, smooth: { enabled: false}})
		data.edges.add({id: 103, from: 103, to: taskid, width: 1, length: 50, smooth: { enabled: false}})
		data.edges.add({id: 104, from: 104, to: taskid, width: 1, length: 50, smooth: { enabled: false}})


}

