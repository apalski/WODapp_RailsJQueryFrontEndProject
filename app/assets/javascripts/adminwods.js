//**********************************************************************************
// Admin Wods Index, Show and Next WOD on Users Show Page                         //
//**********************************************************************************

$(function() {
  getAdminWods();
  showAdminWods();
  getNextAdminWod();
  getPreviousAdminWod();
});

function getAdminWods() {
	$('a.load_adminwods').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
		$('.movement-container').html('');
		$('.wod_actions').html('');
		$.getJSON(this.href, function(adminwods) {
			renderAdminWods(adminwods);
		});
	});
};

function renderAdminWods(adminwods) {
  adminwods.forEach(adminwod => {
    let newAdminWod = new Wod(adminwod);
    let adminwodHtml = newAdminWod.adminIndexWodTemplate();
    $('.crossfit-container').append(adminwodHtml);
  });
};

Wod.prototype.adminIndexWodTemplate = function() {
	let adminwodHtml = `
	<li> ${this.id} </li><br>
	<li class="adminwodName">Wod: ${this.title}</li><br>
	<li class="adminwodDescription">Description: ${this.description}</li><br>
	<li class="adminwodType">Wod Type: ${this.wod_type}</li><br>
	<div class="">
		<a href="/admin/wods/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete WOD</a>
	</div>
	<h3>_____________________________________</h3>
		`;
	return adminwodHtml;
};

function Wod(adminwod) {
	this.id = adminwod.id;
	this.title = adminwod.title;
	this.description = adminwod.description;
	this.wod_type = adminwod.wod_type;
};

function showAdminWods() {
  $('a.show_adminwods').on('click', function(e) {
    e.preventDefault();
    $('.crossfit-container').html('');
    $('.movement-container').html('');
    $('.wod_actions').html('');
    $.getJSON(this.href, function(adminwod) {	
      renderShowAdminWod(adminwod['wod']);
      renderAddWodMovements(adminwod['movements']);
      renderWodAction(adminwod['wod']);
    });
  });
};

function renderShowAdminWod(adminwod) {
  let oneWod = new Wod(adminwod);
  let oneWodHtml = oneWod.showAdminWodTemplate();
  $('.crossfit-container').append(oneWodHtml);
};

function renderWodAction(adminwod) {
	let wodaction = new Wod(adminwod);
	let wodActionHtml = wodaction.wodActionTemplate();
	$('.wod_actions').append(wodActionHtml);
}

function renderAddWodMovements(adminwods) {
	adminwods.forEach(adminwod => {
		let wodMovement = new Movement(adminwod);
		let wodMovementHtml = wodMovement.addMovementTemplate();
		$('.movement-container').append(wodMovementHtml);
	});
};

Wod.prototype.showAdminWodTemplate = function() {
	let oneWodHtml = `
	<li> ${this.id} </li><br>
	<li class="adminwodName">Wod: ${this.title}</li><br>
	<li class="adminmwodType">Wod Type: ${this.wod_type}</li><br>
	<li class="adminwodDescription">Description: ${this.description}</li><br>
		`;
	return oneWodHtml;
};

Wod.prototype.wodActionTemplate = function() {
	let wodActionHtml = `
	<div class="">
		<a href="/admin/wods/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Wod</a>
	</div>
	<div>
	<button class="next-adminwod" data-id="${this.id}" id="${this.owner_id}" name="${this.name}">Next WOD</button> |
	<button class="previous-adminwod" data-id="${this.id}" id="${this.owner_id}" name="${this.name}">Previous Wod</button>
	</div>
	<h3>_____________________________________</h3>
	`
	return wodActionHtml;
}

Movement.prototype.addMovementTemplate = function() {
	let wodMovementHtml = `
	<li>Movement Name: ${this.name}</li><br>
	<li>Movement Quantity: ${this.quantity}</li><br>
	<li>Movement Type: ${this.movement_type}</li><br>
	`
	return wodMovementHtml;
}

function getNextAdminWod() {
	$(document).on('click', '.next-adminwod', function(e) {
		e.preventDefault();
		let id = $(this).attr('data-id');
		let next_id = (parseInt(id) + 1).toString();
		let title = $(this).attr('title');
		$.getJSON(`/admin/wods/${next_id}`, function(next_adminwod) {
			renderNextAdminWod(next_adminwod);
		});
	});
};

function getPreviousAdminWod() {
	$(document).on('click', '.previous-adminwod', function(e) {
		e.preventDefault();
		let id = $(this).attr('data-id');
		let prev_id = (parseInt(id) - 1).toString();
		let title = $(this).attr('title');
		$.getJSON(`/admin/wods/${prev_id}`, function(prev_adminwod) {
			renderNextAdminWod(prev_adminwod);
		});
	});
};

function renderNextAdminWod(adminwod) {
	let newNextAdminWod = new Wod(adminwod);
	let adminWodNextHtml = newNextAdminWod.showAdminWodTemplate();
	$('.crossfit-container').html(adminWodNextHtml);
};
