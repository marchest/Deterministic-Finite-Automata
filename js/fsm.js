var graph = new joint.dia.Graph();

function state(x, y, label) {
	
	var cell = new joint.shapes.fsa.State({
		position: { x: x, y: y },
		size: { width: 60, height: 60 },
		attrs: {
			text : { text: label, fill: '#000000', 'font-weight': 'normal' },
			'circle': {
				id:label,
				fill: '#f6f6f6',
				stroke: '#000000',
				'stroke-width': 2
			}
		}
	});
	graph.addCell(cell);
	return cell;
}

function transition(source, target, label, vertices) {
	
	var cell = new joint.shapes.fsa.Arrow({
		source: { id: source.id },
		target: { id: target.id },
		labels: [{ position: 0.5, attrs: { text: { text: label || '', 'font-weight': 'bold' } } }],
		vertices: vertices || []
	});
	graph.addCell(cell);
	return cell;
}

function startNode (x, y){
	var cell = new joint.shapes.fsa.StartState({ position: { x: x, y: y } });
	graph.addCell(cell);
	return cell;
}

function endNode(x, y) {
	var cell = new joint.shapes.fsa.EndState({ position: { x: x, y: y } });
	graph.addCell(cell);
	return cell;
}

function drawFSM (states, startState, finalStates){
	if(startState === undefined){
		//fail drawing fsm
		$('#result').empty();
		$('#result').append('Wrong FSM Description');
		return;
	}
	var start = startNode (startState.x-80, startState.y + 20);
	
	for(var i = 0, len = states.length; i < len; i++){
		states[i].node = state(states[i].x, states[i].y, states[i].name);
	}
	
	//after nodes created, define trans
	transition(start, startState.node,  'start');
	for(var i = 0, len = states.length; i < len; i++){
		$.each(states[i].tran, function(key, val){
			transition(states[i].node, val.node, key);
		})
	}
	
	var end=undefined;
	if(Object.keys(finalStates).length>0){
		$.each(finalStates, function(key, val){
			if(end===undefined){
				end = endNode (val.x+150, val.y+20);
			}
			transition(val.node, end, 'end');
		})
	}
}

function validateString (states, startState, finalStates, string){
	var currentState = startState;
	$('#' + currentState.name).attr('fill','#ff0000');
	var i = 0, len = string.length;
	var interval = setInterval(step, 1000);
	function step(){
		if(i<len){
			$('#' + currentState.name).attr('fill','#f6f6f6');
			currentState = currentState.tran[string[i]];
			if(currentState===undefined){
				console.log('Fail');
				$('#result').empty();
				$('#result').attr('style','background: red; color: white; font-size: 45px; width:200px;');
				$('#result').append('Fail');
				clearInterval(interval);
			}
			else{
				$('#' + currentState.name).attr('fill','#ff0000');
				i++;
				if(i === len){
					if(finalStates[currentState.name] === undefined){
						console.log('Fail');
						$('#result').empty();
						$('#result').attr('style','background: red; color: white; font-size: 45px; width:200px;');
						$('#result').append('Fail');
						clearInterval(interval);
					}
					else{
						console.log('Passed');
						$('#result').empty();
						$('#result').attr('style','background: green; color: white; font-size: 45px; width:200px;');
						$('#result').append('Passed');
					}
				}
			}
		}
		else{
			clearInterval(interval);
		}
	}
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function fsmRun(){
	$.each(states,function(sI,sV){
		$('#' + sV.name).attr('fill','#f6f6f6');
	});
	
	validateString(states, startState, finalStates,document.getElementById('fsmVal').value);
}
function createFsm(){
			
			var s0 = {name:'s0', x:100, y:100, tran:{}};
			var s1 = {name:'s1', x:200, y:200, tran:{}};   
			var s2 = {name:'s2', x:300, y:150, tran:{}};
			var s3 = {name:'s3', x:400, y:300, tran:{}};
		
			var s4 = {name:'s4', x:500, y:250, tran:{}};
			var s5 = {name:'s5', x:600, y:150, tran:{}};
		
			var s6 = {name:'s6', x:700, y:250, tran:{}};
			var s7 = {name:'s7', x:800, y:300, tran:{}};
			var s8 = {name:'s8', x:900, y:200, tran:{}};
			var s9 = {name:'s9', x:1000, y:150, tran:{}};
			var s10 = {name:'s10', x:1100, y:150, tran:{}};
			var s11= {name:'s11', x:1200, y:150, tran:{}};
			var s12 = {name:'s12', x:1300, y:250, tran:{}};
			var s13= {name:'s13', x:1400, y:400, tran:{}};
			var s14 = {name:'s14', x:1500, y:250, tran:{}};
			var s15 = {name:'s15', x:150, y:400, tran:{}};
			var s16 = {name:'s16', x:250, y:200, tran:{}};
			var s17 = {name:'s17', x:350, y:150, tran:{}};
			var s18 = {name:'s18', x:450, y:200, tran:{}};
			var s19 = {name:'s19', x:550, y:150, tran:{}};
			var s20 = {name:'s20', x:750, y:250, tran:{}};
			var s21 = {name:'s21', x:950, y:100, tran:{}};
		//	var s22 = {name:'s22', x:3050, y:250, tran:{}};
		//	var s23 = {name:'s23', x:3200, y:200, tran:{}};
			
			states.push(s0);
			states.push(s1);
			states.push(s2);
			states.push(s3);
			states.push(s4);
			states.push(s5);
			states.push(s6);
			states.push(s7);
			states.push(s8);
			states.push(s9);
			states.push(s10);
			states.push(s11);
			states.push(s12);
			states.push(s13);
			states.push(s14);
			states.push(s15);
			states.push(s16);
			states.push(s17);
			states.push(s18);
			states.push(s19);
			states.push(s20);
			states.push(s21);
		//	states.push(s22);
	    //  states.push(s23);
			
			
			
			
			//  hocam sadece 1' ler 2'ler yerine a b kullandım.
			s0.tran.x=s21;
			s0.tran.a=s1;
			s1.tran.a=s2;
			s1.tran.b=s3;
			s1.tran.c=s4;
			s1.tran.x=s21;
			s4.tran.a=s7;
			s4.tran.x=s21;
			s4.tran.b=s6;	
			s4.tran.x=s21;	
			s16.tran.x=s21;
			s2.tran.x=s21;
			s1.tran.d=s5;			
			s0.tran.b=s8;
			s8.tran.a=s9;  // s8 tran b unutma
			s8.tran.x=s21;
		    s9.tran.x=s21;	
			s9.tran.a=s12;
			s5.tran.x=s21;
			s6.tran.x=s21;
			s7.tran.x=s21;
			
			s9.tran.b=s13;		
			s13.tran.a=s14;
			s13.tran.b=s15;			
			s8.tran.b=s10;
			s13.tran.x=s21;				
			s10.tran.a=s11;
			s10.tran.b=s12;
			s10.tran.x=s21;		
			s0.tran.b=s8;
			s0.tran.c=s16;
			s3.tran.x=s21;
			s18.tran.x=s21;
			s0.tran.k=s17;
			s20.tran.x=s21;
			s17.tran.a=s18;
			s17.tran.b=s19;
			s17.tran.c=s20;	
		    s17.tran.x=s21;	
			s11.tran.x=s21;
			startState = s0;
			finalStates["s2"]=s3;
			finalStates["s3"]=s3;
			finalStates["s7"]=s7;
			finalStates["s15"]=s15;
			finalStates["s16"]=s16;
			finalStates["s12"]=s12;
			finalStates["s13"]=s13;
			finalStates["s18"]=s18;
			finalStates["s19"]=s19;
			finalStates["s20"]=s20;
			finalStates["s21"]=s21;
			
		/*	finalStates=[
				"s2","s3","s7","s15","s16","s12","s13","s18","s19","s20","s21"
			
			];*/
			
			
		//	finalStates["s7"] = s7;
			drawFSM(states, startState, finalStates);
		
}