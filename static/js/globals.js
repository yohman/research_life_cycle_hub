/* **************************** 

	Global variables

***************************** */ 
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
		institute2task: [],
		institutes: []
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
	},
	icons: {
		more_info: ' <svg width=".8em" height=".8em" viewBox="0 0 16 16" class="bi bi-info-circle-fill" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"/></svg>'
	}
}

/*

	function to parse csv files

*/ 
function parseCsv(url, stepArr){
	return new Promise(function(resolve, reject){
		Papa.parse(url, {
			download:true,
			header:true,
			complete: resolve       
		});        
	});
}

/*

	On page load

*/ 
$(function() {
	getData();
})

/*

	get the data

*/ 
function getData(){

	console.log('getting data...')

	/*

		list of data to parse

	*/ 

	const test = parseCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vTBh6M3_gGIf4wBSRtdbXZaSnKKVm-jJv05OaQ4Y7Gw5Mw4qXFsMReIJ1Wth0iJZfx6bIwPnk4BvrFs/pub?output=csv')
	const task = parseCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vRBYB-vGl6QdGClfN4_VgK71bhiUoY21YA-Su9bsJqFOcD7_gv82L1UHW3M6Hcwqnz3018oNIS1zfbQ/pub?gid=393279233&single=true&output=csv')
	const institute = parseCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSZx8lTLKCD1kX-vSY-NTKQrtcCLqUMpW-BgTSO3sT4ZaEmC8jc1Uy1YO35xosWpGYTuIVRUB20bfU5/pub?gid=265372426&single=true&output=csv')
	const phase = parseCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSeME7cyJX0Z8VxhbOXgQwClHY1kpoxwFe6A1I4mLV8m7FtiZh9yJXL5HIrlH_KNzrcqMM8ItobTW-T/pub?output=csv')
	const institute2task = parseCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vTSXFzxGeBGMpuHA4a6OxwJsyP14ckxZueMAJ4EAULBrCqKKB9urI9enKqTM3_qhtec6c3Z6MbcyfMc/pub?gid=1379978136&single=true&output=csv')


	/*

		put them in a promise to load all data before moving on to the next step

	*/ 
	console.log('start promise...')
	var t0 = performance.now()

	Promise.all(
		[task,institute,phase,institute2task,test]
	).then(
		function(results){
			var t1 = performance.now()
			console.log("Call to get data took " + (t1 - t0) + " milliseconds.")
			/*
			
				put the data in global variables
			
			*/ 
			rlc.data.tasks = results[0].data
			rlc.data.phases = results[1].data
			rlc.data.institutes = results[2].data
			// rlc.data.institutes = results[2].data.filter(item=>item.parent_id == '')
			rlc.data.institute2task = results[3].data
			rlc.data.test = results[4].data

			rlc.data.phases.sort((a,b) => (a.order > b.order) ? 1 : -1)
			rlc.data.tasks.sort((a,b) => (a.order > b.order) ? 1 : -1)
			rlc.data.institutes.sort((a,b) => (a.acronym > b.acronym) ? 1 : -1)

			// let's get ready to rumble
			start();
		}
	)
}
