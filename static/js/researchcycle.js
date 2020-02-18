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

var ydistance_between = 150;
var xdistance_between = 400;

var nodeidstart = 0;

var nodes = [];

nodes.push(// Idea logo
		{id: nodeidstart, level: 0, group: 100, image: 'images/idea.png', shape: 'image', size: 100,  x: -450, y: 100, font:{color:'#ffffff'}},)
	nodeidstart++

// loop through phases
$.each(rlc.data.phases, function(i,phase){
	// create title node
	var thistitle = 
	{
		id: nodeidstart, 
		level: i+1,
		x: i*xdistance_between,
		y: 0,
		label: phase.name,
		color: {
			border: phase.color,
			background: phase.color
		},
		font:{size: 25},
		shape: 'box',
		title:phase.name
	}

	//add to nodes
	nodes.push(thistitle)
	nodeidstart++

	// get tasks for this phase
	tasksbythisphase = getTasksByPhase(phase.name)

	// loop and add node
	$.each(tasksbythisphase, function(j,task){
		task.id = nodeidstart
		task.level = i+1
		task.label = task.name
		task.title = task.name
		task.x = i*xdistance_between
		task.y = (j+1)*ydistance_between
		task.color = {
			border: phase.color,
			background: 'white'
		}

		nodes.push(task)
		nodeidstart++
	})

})

var data = {

	edges: [
		// dashed edges between phases
		{from: 0, to: 1, length: 400, arrows:'to',dashes:[2,10], smooth: { enabled: true, "type": "curvedCW", roundness: 0.75}},

		{from: 100, to: 2, width: 2, length: 50, smooth: { enabled: false}},
		{from: 102, to: 2, width: 2, length: 50, smooth: { enabled: false}},
		{from: 103, to: 2, width: 2, length: 50, smooth: { enabled: false}},
		{from: 104, to: 2, width: 2, length: 50, smooth: { enabled: false}},

		{from: 101, to: 3, width: 2, length: 50, smooth: { enabled: false}},

		// solid edges between tasks
		{from: 1, to: 2, arrows:'to'},
		{from: 2, to: 3, arrows:'to'},
		{from: 3, to: 4, arrows:'to'},
		{from: 4, to: 5, arrows:'to'},
		{from: 5, to: 6, arrows:'to'},
		{from: 6, to: 7, arrows:'to'},
		{from: 7, to: 8, arrows:'to' },
		{from: 8, to: 9, arrows:'to', smooth: { enabled: true, "type": "curvedCCW", roundness: 0.75}},
		{from: 9, to: 10, arrows:'to'},
		{from: 10, to: 11, arrows:'to'},

		{from: 11, to: 12, arrows:'to'},
		{from: 12, to: 13, arrows:'to'},
		{from: 13, to: 14, arrows:'to'},
		{from: 14, to: 15, arrows:'to'},
		{from: 15, to: 16, arrows:'to'},
		{from: 16, to: 17, arrows:'to', smooth: { enabled: true, "type": "curvedCW", roundness: 0.75}},
		{from: 17, to: 18, arrows:'to'},
		{from: 18, to: 19, arrows:'to'},
		{from: 19, to: 20, arrows:'to'},
		{from: 20, to: 21, arrows:'to'},

		{from: 21, to: 22, arrows:'to'},
		{from: 22, to: 23, arrows:'to'},
		{from: 23, to: 24, arrows:'to'},
		{from: 24, to: 25, arrows:'to', smooth: { enabled: true, "type": "curvedCCW", roundness: 0.75}},
		{from: 25, to: 26, arrows:'to'},
		{from: 26, to: 27, arrows:'to'},
		{from: 27, to: 28, arrows:'to'},
		{from: 28, to: 29, arrows:'to'},
		{from: 29, to: 30, arrows:'to'},
		{from: 30, to: 31, arrows:'to'},
		{from: 31, to: 32, arrows:'to'},

	]
}

var data = {
	nodes: [
		// Idea logo
		{id: 0, level: 0, group: 100, image: 'images/idea.png', shape: 'image', size: 100,  x: -450, y: 100, font:{color:'#ffffff'}},
		
		// Plan
		{id: 1, level: 1, x: 0, y:0, label: "Plan", color: groupcolors.planning, font:{size: 25}, shape: 'box',title:"PLAN"},
		{id: 2, level: 1, x: 0, y:ydistance_between, label: "Project concept & scoping", title: "Project concept and scoping", color: groupcolors.planning_task},
		{id: 3, level: 1, x: 0, y:ydistance_between*2, label: "Funding", title: "Funding", color: groupcolors.planning_task},
		{id: 4, level: 1, x: 0, y:ydistance_between*3, label: "Literature review & landscape scan", title: "Literature review & landscape scan", color: groupcolors.planning_task},
		{id: 5, level: 1, x: 0, y:ydistance_between*4, label: "Workshops & trainings", title: "Workshops & trainings", color: groupcolors.planning_task},
		{id: 6, level: 1, x: 0, y:ydistance_between*5, label: "Tools & best practices", title: "Tools & best practices", color: groupcolors.planning_task},
		{id: 7, level: 1, x: 0, y:ydistance_between*6, label: "Data models & structures", title: "Data models & structures", color: groupcolors.planning_task},
		{id: 8, level: 1, x: 0, y:ydistance_between*7, label: "Prototyping", title: "Prototyping", color: groupcolors.planning_task},
		{id: 9, level: 1, x: 400, y:ydistance_between*7, label: "Ethics, compliance & security", title: "Ethics, compliance & security", color: groupcolors.planning_task},
		{id: 10, level: 1, x: 400, y:ydistance_between*6, label: "Project management guidance", title: "Project management guidance", color: groupcolors.planning_task},

		// Develop
		{id: 11, level: 2, x: 400, y:ydistance_between*5, label: "Develop", color: groupcolors.development, font:{size: 25}, shape: 'box',title:"DEVELOP"},
		{id: 12, level: 2, x: 400, y:ydistance_between*4, label: "Grant proposal development", color:groupcolors.development_task},
		{id: 13, level: 2, x: 400, y:ydistance_between*3, label: "Data management plan", color:groupcolors.development_task},
		{id: 14, level: 2, x: 400, y:ydistance_between*2, label: "Data collection and manipulation", color:groupcolors.development_task},
		{id: 15, level: 2, x: 400, y:ydistance_between*1, label: "Advanced computation", color:groupcolors.development_task},
		{id: 16, level: 2, x: 400, y:0, label: "Statistical analysis", color:groupcolors.development_task},
		{id: 17, level: 2, x: 800, y:0, label: "Data visualization", color:groupcolors.development_task},
		{id: 18, level: 2, x: 800, y:ydistance_between*1, label: "GIS & mapping", color:groupcolors.development_task},
		{id: 19, level: 2, x: 800, y:ydistance_between*2, label: "3D, VR & AR technologies", color:groupcolors.development_task},
		{id: 20, level: 2, x: 800, y:ydistance_between*3, label: "Text analysis", color:groupcolors.development_task},

		// Launch
		{id: 21, level: 3, x: 800, y:ydistance_between*4, label: "Launch", color: groupcolors.launch, font:{size: 25}, shape: 'box',title:"LAUNCH"},
		{id: 22, level: 3, x: 800, y:ydistance_between*5, label: "Copyright & permissions", color:groupcolors.launch_task},
		{id: 23, level: 3, x: 800, y:ydistance_between*6, label: "Web development & hosting", color:groupcolors.launch_task},
		{id: 24, level: 3, x: 800, y:ydistance_between*7, label: "Open access", color:groupcolors.launch_task},
		{id: 25, level: 3, x: 1200, y:ydistance_between*7, label: "Publishing", color:groupcolors.launch_task},

		// Preserve
		{id: 26, level: 4, x: 1200, y:ydistance_between*6, label: "Preserve", color: groupcolors.preservation, font:{size: 25}, shape: 'box',title:"PRESERVE"},
		{id: 27, level: 4, x: 1200, y:ydistance_between*5, label: "Project maintenance", color:groupcolors.preservation_task},
		{id: 28, level: 4, x: 1200, y:ydistance_between*4, label: "Digital repository", color:groupcolors.preservation_task},
		{id: 29, level: 4, x: 1200, y:ydistance_between*3, label: "Data archive & preservation", color:groupcolors.preservation_task},
		{id: 30, level: 4, x: 1200, y:ydistance_between*2, label: "Data curation", color:groupcolors.preservation_task},
		{id: 31, level: 4, x: 1200, y:ydistance_between*1, label: "Licensing & IP", color:groupcolors.preservation_task},
		{id: 32, level: 4, x: 1200, y:0, label: "Grant conclusion", color:groupcolors.preservation_task},

		// Institutes
		{id: 100, fixed: false, label: "IDRE", borderWidth: 2,color:{border:'white',background: 'darkblue'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}},
		{id: 101, fixed: false, label: "Library", borderWidth: 2,color:{border:'white',background: 'lightgreen'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}},
		{id: 102, fixed: false, label: "Data Science Center", borderWidth: 2,color:{border:'white',background: 'brown'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}},
		{id: 103, fixed: false, label: "Local", borderWidth: 2,color:{border:'white',background: 'yellow'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}},
		{id: 104, fixed: false, label: "Peers", borderWidth: 2,color:{border:'white',background: 'purple'}, size: 10, font: {size: 10,	color: '#ffffff', strokeWidth:2, strokeColor:'#222'}},




	],

	edges: [
		// dashed edges between phases
		{from: 0, to: 1, length: 400, arrows:'to',dashes:[2,10], smooth: { enabled: true, "type": "curvedCW", roundness: 0.75}},
		// {from: 1, to: 11, length: 400, arrows:'to',dashes:[2,10]},
		// {from: 11, to: 21, length: 400, arrows:'to',dashes:[2,10]},
		// {from: 21, to: 26, length: 400, arrows:'to',dashes:[2,10]},
		// {from: 26, to: 1, length: 400, arrows:'to',dashes:[2,10]},

		{from: 100, to: 2, width: 2, length: 50, smooth: { enabled: false}},
		{from: 102, to: 2, width: 2, length: 50, smooth: { enabled: false}},
		{from: 103, to: 2, width: 2, length: 50, smooth: { enabled: false}},
		{from: 104, to: 2, width: 2, length: 50, smooth: { enabled: false}},

		{from: 101, to: 3, width: 2, length: 50, smooth: { enabled: false}},

		// {from: 101, to: 4, width: 2, length: 50, smooth: { enabled: false}},
		// {from: 103, to: 4, width: 2, length: 50, smooth: { enabled: false}},
		// {from: 104, to: 4, width: 2, length: 50, smooth: { enabled: false}},


		// solid edges between tasks
		{from: 1, to: 2, arrows:'to'},
		{from: 2, to: 3, arrows:'to'},
		{from: 3, to: 4, arrows:'to'},
		{from: 4, to: 5, arrows:'to'},
		{from: 5, to: 6, arrows:'to'},
		{from: 6, to: 7, arrows:'to'},
		{from: 7, to: 8, arrows:'to' },
		{from: 8, to: 9, arrows:'to', smooth: { enabled: true, "type": "curvedCCW", roundness: 0.75}},
		{from: 9, to: 10, arrows:'to'},
		{from: 10, to: 11, arrows:'to'},
		// {from: 10, to: 11, arrows:'to', color: {color:"rgba(255,255,255,0.1)"}},

		{from: 11, to: 12, arrows:'to'},
		{from: 12, to: 13, arrows:'to'},
		{from: 13, to: 14, arrows:'to'},
		{from: 14, to: 15, arrows:'to'},
		{from: 15, to: 16, arrows:'to'},
		{from: 16, to: 17, arrows:'to', smooth: { enabled: true, "type": "curvedCW", roundness: 0.75}},
		{from: 17, to: 18, arrows:'to'},
		{from: 18, to: 19, arrows:'to'},
		{from: 19, to: 20, arrows:'to'},
		{from: 20, to: 21, arrows:'to'},
		// {from: 20, to: 21, arrows:'to', color: {color:"rgba(255,255,255,0.1)"}},

		{from: 21, to: 22, arrows:'to'},
		{from: 22, to: 23, arrows:'to'},
		{from: 23, to: 24, arrows:'to'},
		{from: 24, to: 25, arrows:'to', smooth: { enabled: true, "type": "curvedCCW", roundness: 0.75}},
		{from: 25, to: 26, arrows:'to'},
		// {from: 25, to: 26, arrows:'to', color: {color:"rgba(255,255,255,0.1)"}},

		{from: 26, to: 27, arrows:'to'},
		{from: 27, to: 28, arrows:'to'},
		{from: 28, to: 29, arrows:'to'},
		{from: 29, to: 30, arrows:'to'},
		{from: 30, to: 31, arrows:'to'},
		{from: 31, to: 32, arrows:'to'},
		// {from: 32, to: 1, arrows:'to'},
		// {from: 32, to: 1, arrows:'to', color: {color:"rgba(255,255,255,0.1)"}},


	]
}

// create a network
var container = document.getElementById('mynetwork');
var data = {
	nodes: new vis.DataSet(data.nodes),
	edges: new vis.DataSet(data.edges)
};
var options = {
	// layout: {
	//   hierarchical: {
	//   	direction: "LR",
	//   	levelSeparation: 400,
	//   	nodeSpacing: 200
	//   }
	// },
	// physics: {
	// 	enabled: true
	// },
	physics: {
		stabilization: {enabled: false, fit: true},
		enabled: true,
		// barnesHut: {
		// 	gravitationalConstant: -10000,
		// 	centralGravity: 0.1,
		// 	springLength: 95,
		// 	springConstant: 0.04,
		// 	damping: 0.09,
		// 	avoidOverlap: 0
		// },
		forceAtlas2Based: {
			gravitationalConstant: -2000,
			centralGravity: 0.01,
			springConstant: 0.08,
			springLength: 1,
			damping: 0.4,
			avoidOverlap: 1
		},
		// hierarchicalRepulsion: {
		// 	centralGravity: 0.0,
		// 	springLength: 10,
		// 	springConstant: 0.01,
		// 	nodeDistance: 10,
		// 	damping: 0.09,
		// 	avoidOverlap: 0
		// },
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
	params.event = "[original event]";
	document.getElementById('infopanel').innerHTML = '<h2>Click event for '+params.nodes[0]+':</h2>' + JSON.stringify(data.nodes.get(params.nodes[0]), null, 4);
	console.log(params.nodes[0]);
});



function addIDRE()
{
	// IDRE
	IDREnode = {id: 100, level: 1, label: "IDRE", shape: 'box', color: '#ccc', borderWidth: 0}
	data.nodes.add(IDREnode)

	IDREedges = [
		{from: 100, to: 4, width: 2, length:100, id:'idre-1'},
		{from: 100, to: 9, width: 2, length:100, id:'idre-2'},
		{from: 100, to: 10, width: 2, length:100, id:'idre-3'},
		{from: 100, to: 11, width: 2, length:100, id:'idre-4'},
		{from: 100, to: 18, width: 2, length:100, id:'idre-5'}
	]

	for (var i = IDREedges.length - 1; i >= 0; i--) {
		data.edges.add(IDREedges[i])
	}

}

function addORA()
{
	// IDRE
	ORAnode = {id: 101, label: "ORA", shape: 'box', color: '#ccc', borderWidth: 0}
	nodes.add(ORAnode)

	ORAedges = [
		// ORA
		{from: 101, to: 2, width: 2, length:100, id:'ora-1'},
		{from: 101, to: 5, width: 2, length:100, id:'ora-2'},
		{from: 101, to: 7, width: 2, length:100, id:'ora-3'},
		{from: 101, to: 21, width: 2, length:100, id:'ora-4'},
	]

	for (var i = IDREedges.length - 1; i >= 0; i--) {
		edges.add(IDREedges[i])
	}

}
