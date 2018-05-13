//**********************************************************************************
// New User Wod on Create New Userwod Page                                        //
//**********************************************************************************

function Userwod(data) {
	this.id = data.id;
	this.name = data.name;
	this.date = data.date;
	this.result = data.result;
	this.pr = data.pr;
	this.userId = data.user_id;
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
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		$.getJSON(this.href, function(wods) {
			renderWods(wods);
		});
	});
};

function renderWods(wods) {
	wods.forEach(wod => {
		let newWod = new Userwod(wod);
		let wodHtml = newWod.indexWodTemplate();
		$('.crossfit-container').append(wodHtml);
	});
};

Userwod.prototype.indexWodTemplate = function() {
	let wodHtml = `
	<li> ${this.id} </li><br>
	<li class="wodName">Wod: ${this.name}</li><br>
	<li class="wodDate">Date Completed: ${this.date}</li><br>
	<li class="wodResult">Result Achieved: ${this.result}</li><br>
	<li class="wodPr">PR? (true/false): ${this.pr}</li><br>
	<div class="">
		<a href="/users/${this.userId}/userwods/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Wod</a>
	</div>
	<h3>_____________________________________</h3>
		`;
	return wodHtml;
};

function Userwod(wod) {
	this.id = wod.id;
	this.name = wod.name;
	this.date = wod.date;
	this.result = wod.result;
	this.pr = wod.pr;
	this.userId = wod.user_id;
};

function showWods() {
	$('a.show_wods').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
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
	<li class="wodPr">PR? (true/false): ${this.pr}</li><br>
	<div class="">
		<a href="/users/${this.userId}/userwods/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Wod</a>
	</div><br>
	<div>
	<button class="next-wod" data-id="${this.id}" id="${this.userId}" name="${this.name}">Next Wod</button> |
	<button class="previous-wod" data-id="${this.id}" id="${this.userId}" name="${this.name}">Previous Wod</button>
	</div>
	<h3>_____________________________________</h3>
		`;
	return wodHtml;
};

function getNextWod() {
	$(document).on('click', '.next-wod', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		let id = $(this).attr('data-id');
		let nextId = (parseInt(id) + 1).toString();
		let userId = $(this).attr('id');
		let name = $(this).attr('name');
		$.getJSON(`/users/${userId}/userwods/${nextId}`, function(nextWod) {
			if(nextWod['name'] === undefined) {
				alert('no more wods');
			} else {
				renderNextWod(nextWod);
			};
		});
	});
};

function getPreviousWod() {
	$(document).on('click', '.previous-wod', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		let id = $(this).attr('data-id');
		let prevId = (parseInt(id) - 1).toString();
		let userId = $(this).attr('id');
		let name = $(this).attr('name');
		$.getJSON(`/users/${userId}/userwods/${prevId}`, function(prevWod) {
			if(prevWod['name'] === undefined) {
				alert('no more wods');
			} else {
				renderNextWod(prevWod);
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
	<li class="wodPr">PR? (true/false): ${this.pr}</li><br>
	<div class="">
		<a href="/users/${this.userId}/userwods/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Wod</a>
	</div><br>
	<div>
	<button class="next-wod" data-id="${this.id}" id="${this.userId}" name="${this.name}">Next Wod</button> |
	<button class="previous-wod" data-id="${this.id}" id="${this.userId}" name="${this.name}">Previous Wod</button>
	</div>
	<h3>_____________________________________</h3>
		`;
	return wodHtml;
};
