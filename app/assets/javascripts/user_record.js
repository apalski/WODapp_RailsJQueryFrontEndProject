//**********************************************************************************
// New User Movement on Create New Usermovement Page                              //
//**********************************************************************************

function Usermovement(data) {
	this.id = data.id;
	this.name = data.name;
	this.date = data.date;
	this.result = data.result;
	this.pr = data.pr;
	this.comment = data.comment;
	this.user_id = data.user_id;
};

Usermovement.prototype.newTemplate = function() {
	let newHtml = `
	<h3>New Movement</h3>
	<li>ID: ${this.id}</li><br>
	<li>Movement: ${this.name}</li><br>
	<li>Date Completed: ${this.date}</li><br> 
	<li>Result Achieved: ${this.result}</li><br>		
	<li>PR? (true/false): ${this.pr}</li><br>
	<li>Comment: ${this.comment}</li><br>
	<li>User Id: ${this.user_id}</li><br> 
	<div class="">
		<a href="/users/${this.user_id}/usermovements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div><br>
	<h3>_____________________________________</h3> 
		`;
	return newHtml;
};

$(function() {
	$(document).on('submit', '#new_usermovement', function(e) {
		e.preventDefault();
		$.ajax({
			url: $(this).attr("action"),
			method: 'post',
			data: $(this).serialize(),
			success: function(data) {
				$("div#usermovement_form").hide();
				let newMovement = new Usermovement(data);
				let newHtml = newMovement.newTemplate();
				$("div#new_movement").append(newHtml)
			},
		});
	});
});

//**********************************************************************************
// User Movements Index, Show and Next Movement on Users Show Page                //
//**********************************************************************************

$(function() {
	getMovements();
	showMovements();
	getNextMovement();
	getPreviousMovement();
	// newMovement();
	getWods();
	showWods();
	getNextWod();
	getPreviousWod();
});

function getMovements() {
	$('a.load_movements').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
		$.getJSON(this.href, function(movements) {
			renderMovements(movements);
		});
	});
};

function renderMovements(movements) {
	movements.forEach(movement => {
		let newMovement = new Usermovement(movement);
		let movementHtml = newMovement.indexTemplate();
		$('.crossfit-container').append(movementHtml);
	});
};

Usermovement.prototype.indexTemplate = function() {
	let movementHtml = `
	<li> ${this.id} </li><br>
	<li class="movementName">Movement: ${this.name}</li><br>
	<li class="movementDate">Date Completed: ${this.date}</li><br> 
	<li class="movementResult">Result Achieved: ${this.result}</li><br>		
	<li class="movement_cftype">Movement done for: ${this.cftype}</li><br>
	<li class="movementPr">PR? (true/false): ${this.pr}</li><br>
	<li class="movementComment">Comment: ${this.comment}</li><br>
	<div class="">
		<a href="/users/${this.user_id}/usermovements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div>
	<h3>_____________________________________</h3>
		`;
	return movementHtml;
}; 

function Usermovement(movement) {
	this.id = movement.id;
	this.name = movement.name;
	this.date = movement.date;
	this.cftype = movement.cftype;
	this.result = movement.result;
	this.pr = movement.pr;
	this.comment = movement.comment;
	this.user_id = movement.user_id;
};

function showMovements() {
	$('a.show_movements').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
		$.getJSON(this.href, function(move) {
			renderShowMovement(move);
		});
	});
};

function renderShowMovement(move) {
	let newOneMovement = new Usermovement(move);
	let movementOneHtml = newOneMovement.showTemplate();
	$('.crossfit-container').append(movementOneHtml);
};

Usermovement.prototype.showTemplate = function() {
	let movementHtml = `
	<li class="movementName">Movement: ${this.name}</li><br>
	<li class="movementDate">Date Completed: ${this.date}</li><br> 
	<li class="movementResult">Result Achieved: ${this.result}</li><br>		
	<li class="movement_cftype">Movement done for: ${this.cftype}</li><br>
	<li class="movementPr">PR? (true/false): ${this.pr}</li><br>
	<li class="movementComment">Comment: ${this.comment}</li><br>
	<div class="">
		<a href="/users/${this.user_id}/usermovements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div><br>
	<div>
	<button class="next-movement" data-id="${this.id}" id="${this.user_id}" name="${this.name}">Next Movement</button> | 
	<button class="previous-movement" data-id="${this.id}" id="${this.user_id}" name="${this.name}">Previous Movement</button>
	</div>
	<h3>_____________________________________</h3> 
		`;
	return movementHtml;
};

function getNextMovement() {
	$(document).on('click', '.next-movement', function(e) {
		e.preventDefault();
		let id = $(this).attr('data-id');
		let next_id = (parseInt(id) + 1).toString();
		let user_id = $(this).attr('id');
		let name = $(this).attr('name');
		$.getJSON(`/users/${user_id}/usermovements/${next_id}`, function(next_move) {
			if(next_move['name'] === undefined) {
				alert('no more movements');
			} else {			
				renderNextMovement(next_move);
			};
		});
	});
};

function getPreviousMovement() {
	$(document).on('click', '.previous-movement', function(e) {
		e.preventDefault();
		let id = $(this).attr('data-id');
		let prev_id = (parseInt(id) - 1).toString();
		let user_id = $(this).attr('id');
		let name = $(this).attr('name');
		$.getJSON(`/users/${user_id}/usermovements/${prev_id}`, function(prev_move) {
			if(prev_move['name'] === undefined) {
				alert('no more movements');
			} else {
				renderNextMovement(prev_move);
			};
		});
	});
};

function renderNextMovement(move) {
	let newNextMovement = new Usermovement(move);
	let movementNextHtml = newNextMovement.nextTemplate();
	$('.crossfit-container').html(movementNextHtml);
};

Usermovement.prototype.nextTemplate = function() {
	let movementHtml = `
	<li class="movementName">Movement: ${this.name}</li><br>
	<li class="movementDate">Date Completed: ${this.date}</li><br> 
	<li class="movementResult">Result Achieved: ${this.result}</li><br>		
	<li class="movement_cftype">Movement done for: ${this.cftype}</li><br>
	<li class="movementPr">PR? (true/false): ${this.pr}</li><br>
	<li class="movementComment">Comment: ${this.comment}</li><br>
	<div class="">
		<a href="/users/${this.user_id}/usermovements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div><br>
	<div>
	<button class="next-movement" data-id="${this.id}" id="${this.user_id}" name="${this.name}">Next Movement</button> | 
	<button class="previous-movement" data-id="${this.id}" id="${this.user_id}" name="${this.name}">Previous Movement</button>
	</div>
	<h3>_____________________________________</h3>
		`;
	return movementHtml;	
}; 

//**********************************************************************************
// New User Wod on Create New Userwod Page                                        //
//**********************************************************************************

function Userwod(data) {
	this.id = data.id;
	this.name = data.name;
	this.date = data.date;
	this.result = data.result;
	this.pr = data.pr;
	this.user_id = data.user_id;
};

$(function() {
	$(document).on('submit', '#new_userwod', function(e) {
		e.preventDefault();
		$.ajax({
			url: $(this).attr("action"),
			method: 'post',
			data: $(this).serialize(),
			success: function(data) {
				$("div#new_userwodForm").hide();
				let newWod = new Userwod(data);
				let newWodHtml = newWod.indexWodTemplate();
				$("div#new_wod").append(newWodHtml)
			},
		});
	});
});

//**********************************************************************************
// User Wods Index, Show and Next Movement on Users Show Page                     //
//**********************************************************************************

function getWods() {
	$('a.load_wods').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
		$.getJSON(this.href, function(wods) {
			renderWods(wods);
		});
	});
};

function renderWods(wods) {
	wods.forEach(wod => {
		let newwod = new Userwod(wod);
		let wodHtml = newwod.indexWodTemplate();
		$('.crossfit-container').append(wodHtml);
	});
};

Userwod.prototype.indexWodTemplate = function() {
	let wodHtml = `
	<li> ${this.id} </li><br>
	<li class="wodName">Wod: ${this.name}</li><br>
	<li class="wodDate">Date Completed: ${this.date}</li><br> 
	<li class="wodResult">Result Achieved: ${this.result}</li><br>		
	<li class="wod_cftype">Wod done for: ${this.cftype}</li><br>
	<li class="wodPr">PR? (true/false): ${this.pr}</li><br>
	<div class="">
		<a href="/users/${this.user_id}/userwods/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Wod</a>
	</div>
	<h3>_____________________________________</h3>
		`;
	return wodHtml;
}; 

function Userwod(wod) {
	this.id = wod.id;
	this.name = wod.name;
	this.date = wod.date;
	this.cftype = wod.cftype;
	this.result = wod.result;
	this.pr = wod.pr;
	this.user_id = wod.user_id;
};

function showWods() {
	$('a.show_wods').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
		$.getJSON(this.href, function(wod) {
			renderShowWod(wod);
		});
	});
};

function renderShowWod(wod) {
	let newOneWod = new Userwod(wod);
	let wodOneHtml = newOneWod.showWodTemplate();
	$('.crossfit-container').append(wodOneHtml);
};

Userwod.prototype.showWodTemplate = function() {
	let wodHtml = `
	<li class="wodName">Wod: ${this.name}</li><br>
	<li class="wodDate">Date Completed: ${this.date}</li><br> 
	<li class="wodResult">Result Achieved: ${this.result}</li><br>		
	<li class="wod_cftype">wod done for: ${this.cftype}</li><br>
	<li class="wodPr">PR? (true/false): ${this.pr}</li><br>
	<div class="">
		<a href="/users/${this.user_id}/userwods/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Wod</a>
	</div><br>
	<div>
	<button class="next-wod" data-id="${this.id}" id="${this.user_id}" name="${this.name}">Next Wod</button> | 
	<button class="previous-wod" data-id="${this.id}" id="${this.user_id}" name="${this.name}">Previous Wod</button>
	</div>
	<h3>_____________________________________</h3> 
		`;
	return wodHtml;
};

function getNextWod() {
	$(document).on('click', '.next-wod', function(e) {
		e.preventDefault();
		let id = $(this).attr('data-id');
		let next_id = (parseInt(id) + 1).toString();
		let user_id = $(this).attr('id');
		let name = $(this).attr('name');
		$.getJSON(`/users/${user_id}/userwods/${next_id}`, function(next_wod) {
			if(next_wod['name'] === undefined) {
				alert('no more wods');
			} else {			
				renderNextWod(next_wod);
			};
		});
	});
};

function getPreviousWod() {
	$(document).on('click', '.previous-wod', function(e) {
		e.preventDefault();
		let id = $(this).attr('data-id');
		let prev_id = (parseInt(id) - 1).toString();
		let user_id = $(this).attr('id');
		let name = $(this).attr('name');
		$.getJSON(`/users/${user_id}/userwods/${prev_id}`, function(prev_wod) {
			if(prev_wod['name'] === undefined) {
				alert('no more wods');
			} else {
				renderNextWod(prev_wod);
			};
		});
	});
};

function renderNextWod(wod) {
	let newNextWod = new Userwod(wod);
	let wodNextHtml = newNextWod.nextWodTemplate();
	$('.crossfit-container').html(wodNextHtml);
};

Userwod.prototype.nextWodTemplate = function() {
	let wodHtml = `
	<li class="wodTitle">Wod: ${this.name}</li><br>
	<li class="wodDate">Date Completed: ${this.date}</li><br> 
	<li class="wodResult">Result Achieved: ${this.result}</li><br>		
	<li class="wod_cftype">Wod done for: ${this.cftype}</li><br>
	<li class="wodPr">PR? (true/false): ${this.pr}</li><br>
	<div class="">
		<a href="/users/${this.user_id}/userwods/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Wod</a>
	</div><br>
	<div>
	<button class="next-wod" data-id="${this.id}" id="${this.user_id}" name="${this.name}">Next Wod</button> | 
	<button class="previous-wod" data-id="${this.id}" id="${this.user_id}" name="${this.name}">Previous Wod</button>
	</div>
	<h3>_____________________________________</h3>
		`;
	return wodHtml;	
}; 

