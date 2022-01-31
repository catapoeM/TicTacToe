function start() {
	var cell = [];
	var combinations_x = [];
	var combinations_0 = [];
	var ticTac = 1;
	var info = document.getElementById('info');
	const grid = document.getElementById('grid');
	const winning_combinations = [
		[1, 2, 3],
		[1, 4, 7],
		[1, 5, 9],
		[2, 5, 8],
		[3, 5, 7],
		[3, 6, 9],
		[4, 5, 6],
		[7, 8, 9]
	]
	var coverAllButtons = 0;
	var whoWins = 2;
	var check_0 = 0, check_x = 0;
	tableCreate();
	// Here we create the table and disable the start button
	function tableCreate() {
		document.getElementById('startButton').setAttribute("disabled", "");
	    for (var id = 1; id < 10; ++id) {
	    	cell[id] = document.createElement('button');
	    	cell[id].innerHTML = "<span style='font-size:100px'>-</span>";
	    	cell[id].style.border = '1px solid black';
	    	cell[id].style.width = '200px';
	    	cell[id].style.height = '200px';
	    	grid.appendChild(cell[id]);
	    	cell[id].setAttribute("id-cell", id);
		  	cell[id].onclick = function(id) {
		  		pickCell(this.getAttribute("id-cell"))
		  	};
		  	if (id == 3 || id == 6) {
		    	var br = document.createElement('br');
		    	grid.appendChild(br);
		    }
	    }
	}

	function pickCell(idCell) {
		++coverAllButtons;
		cell[idCell].setAttribute("disabled", "");
		if (ticTac == 1) {
			cell[idCell].innerHTML = "<span style='font-size:100px'>X</span>";
			combinations_x.push(idCell);
			info.innerHTML = "<span style='font-size:40px'>0's turn</span>";
			ticTac = 0;
		}else if (ticTac == 0) {
			cell[idCell].innerHTML = "<span style='font-size:100px'>0</span>";
			combinations_0.push(idCell);
			info.innerHTML = "<span style='font-size:40px'>X's turn</span>";
			ticTac = 1;
		}
		// In the first for loop we check every line of combination array
		for (var i = 0; combinations_x.length > 2 || combinations_0.length > 2 && i < winning_combinations.length; ++i) {
			// This second for checks the specific line of winning combination array
			for (var j = 0; j < 3; ++j) {
				// this third for verify the equality between elements of the specific line and the x or 0 combinations
				for (var k = 0; k < combinations_x.length || k < combinations_0.length; ++k) {
					if (winning_combinations[i][j] == combinations_x[k]) {
						++check_x;
					}else if (winning_combinations[i][j] == combinations_0[k]) {
						++check_0;
					}
				}
			}
			if (check_x == 3) {
				whoWins = 1;
				winner();
				
			}else if (check_0 == 3) {
				whoWins = 0;
				winner();
			}else if (coverAllButtons == 9 && whoWins == 2) {
				coverAllButtons = 0;
				check_x = 0;
				tie();
			}
			check_x = 0;
			check_0 = 0;
		}
	}		
	
	function winner() {
		if (whoWins == 0) {
	    	info.innerHTML = "<span style='font-size:40px'>'0' wins!</span>";
	    }else if (whoWins == 1) {
	    	info.innerHTML = "<span style='font-size:40px'>'X' wins!</span>";
	    }
	    return resetGame();
	}

	function tie() {
		info.innerHTML = "<span style='font-size:40px'>No one wins, it is TIE!</span>";
		return resetGame();
	}
		  
    function resetGame() {
    	for (var id = 1; id < 10; ++id) {
			cell[id].setAttribute("disabled", "");
		}
    	var reset = document.createElement('button');
		reset.innerHTML = 'RESET';
		document.getElementById('reset').appendChild(reset);
		reset.onclick = function() {
			for (var i = 1; i < 10; ++i) {
				document.getElementById('grid').removeChild(cell[i]);
			}
			var br1 = document.getElementsByTagName('br')[0];
			var br2 = document.getElementsByTagName('br')[1];
			grid.removeChild(br1);
			grid.removeChild(br2);
		  	reset.parentNode.removeChild(reset);
		  	document.getElementById('info').innerHTML = " ";
		  	start();
		}
    }
}