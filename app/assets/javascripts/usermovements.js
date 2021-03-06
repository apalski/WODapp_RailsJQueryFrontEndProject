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
	this.userId = data.user_id;
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
	<li>User Id: ${this.userId}</li><br>
	<div class="">
		<a href="/users/${this.userId}/usermovements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
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
	getWods();
	showWods();
	getNextWod();
	getPreviousWod();
});

Usermovement.prototype.filterTemplate = function() {
	let filterHtml = `

	`
	return filterHtml
}

function checkPr() {
	return this.pr === true;
}

<button type="submit" value="submit" id="filter_movement">Filter</button>

function getMovements() {
	$('a.load_movements').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		$.getJSON(this.href, function(movements) {
			renderMovements(movements);
		});
	});
};

function renderMovements(movements) {
	movements.forEach(movement => {
		let newMovement = new Usermovement(movement);
		let movementHtml = newMovement.indexTemplate();
		this.pr.filter()
		$('.crossfit-container').append(movementHtml);
	});
};

Usermovement.prototype.indexTemplate = function() {
	let movementHtml = `
	<li> ${this.id} </li><br>
	<li class="movementName">Movement: ${this.name}</li><br>
	<li class="movementDate">Date Completed: ${this.date}</li><br>
	<li class="movementResult">Result Achieved: ${this.result}</li><br>
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
	this.result = movement.result;
	this.pr = movement.pr;
	this.comment = movement.comment;
	this.userId = movement.user_id;
};

function showMovements() {
	$('a.show_movements').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
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
	<li class="movementPr">PR? (true/false): ${this.pr}</li><br>
	<li class="movementComment">Comment: ${this.comment}</li><br>
	<div class="">
		<a href="/users/${this.userId}/usermovements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div><br>
	<div>
	<button class="next-movement" data-id="${this.id}" id="${this.userId}" name="${this.name}">Next Movement</button> |
	<button class="previous-movement" data-id="${this.id}" id="${this.userId}" name="${this.name}">Previous Movement</button>
	</div>
	<h3>_____________________________________</h3>
		`;
	return movementHtml;
};

function getNextMovement() {
	$(document).on('click', '.next-movement', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		let id = $(this).attr('data-id');
		let nextId = (parseInt(id) + 1).toString();
		let userId = $(this).attr('id');
		let name = $(this).attr('name');
		$.getJSON(`/users/${userId}/usermovements/${nextId}`, function(nextMove) {
			if(nextMove['name'] === undefined) {
				alert('no more movements');
			} else {
				renderNextMovement(nextMove);
			};
		});
	});
};

function getPreviousMovement() {
	$(document).on('click', '.previous-movement', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		let id = $(this).attr('data-id');
		let prevId = (parseInt(id) - 1).toString();
		let userId = $(this).attr('id');
		let name = $(this).attr('name');
		$.getJSON(`/users/${userId}/usermovements/${prevId}`, function(prevMove) {
			if(prevMove['name'] === undefined) {
				alert('no more movements');
			} else {
				renderNextMovement(prevMove);
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
	<li class="movementPr">PR? (true/false): ${this.pr}</li><br>
	<li class="movementComment">Comment: ${this.comment}</li><br>
	<div class="">
		<a href="/users/${this.userId}/usermovements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div><br>
	<div>
	<button class="next-movement" data-id="${this.id}" id="${this.userId}" name="${this.name}">Next Movement</button> |
	<button class="previous-movement" data-id="${this.id}" id="${this.userId}" name="${this.name}">Previous Movement</button>
	</div>
	<h3>_____________________________________</h3>
		`;
	return movementHtml;
};
