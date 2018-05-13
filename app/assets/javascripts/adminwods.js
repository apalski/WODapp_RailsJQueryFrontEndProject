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
		$.getJSON(this.href, function(adminWods) {
			renderAdminWods(adminWods);
		});
	});
};

function renderAdminWods(adminWods) {
  adminWods.forEach(adminwod => {
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
	return adminWodHtml;
};

function Wod(adminwod) {
	this.id = adminwod.id;
	this.title = adminwod.title;
	this.description = adminwod.description;
	this.wodType = adminwod.wod_type;
  this.ownerId = adminWod.owner_id;
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
  let oneWod = new Wod(adminWod);
  let oneWodHtml = oneWod.showAdminWodTemplate();
  $('.crossfit-container').append(oneWodHtml);
};

function renderWodAction(adminWod) {
	let wodAction = new Wod(adminWod);
	let wodActionHtml = wodAction.wodActionTemplate();
	$('.wod_actions').append(wodActionHtml);
}

function renderAddWodMovements(adminWods) {
	adminWods.forEach(adminWod => {
		let wodMovement = new Movement(adminWod);
		let wodMovementHtml = wodMovement.addMovementTemplate();
		$('.movement-container').append(wodMovementHtml);
	});
};

Wod.prototype.showAdminWodTemplate = function() {
	let oneWodHtml = `
	<li> ${this.id} </li><br>
	<li class="adminwodName">Wod: ${this.title}</li><br>
	<li class="adminmwodType">Wod Type: ${this.wodType}</li><br>
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
	<button class="next-adminwod" data-id="${this.id}" id="${this.ownerId}" name="${this.name}">Next WOD</button> |
	<button class="previous-adminwod" data-id="${this.id}" id="${this.ownerId}" name="${this.name}">Previous Wod</button>
	</div>
	<h3>_____________________________________</h3>
	`
	return wodActionHtml;
}

Movement.prototype.addMovementTemplate = function() {
	let wodMovementHtml = `
	<li>Movement Name: ${this.name}</li><br>
	<li>Movement Quantity: ${this.quantity}</li><br>
	<li>Movement Type: ${this.movementType}</li><br>
	`
	return wodMovementHtml;
}

function getNextAdminWod() {
	$(document).on('click', '.next-adminwod', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		let id = $(this).attr('data-id');
		let nextId = (parseInt(id) + 1).toString();
		$.getJSON(`/admin/wods/${nextId}`, function(nextAdminWod) {
			renderShowAdminWod(nextAdminWod['wod']);
			renderAddWodMovements(nextAdminWod['movements']);
      		renderWodAction(nextAdminWod['wod']);
		});
	});
};

function getPreviousAdminWod() {
	$(document).on('click', '.previous-adminwod', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		let id = $(this).attr('data-id');
		let prevId = (parseInt(id) - 1).toString();
		$.getJSON(`/admin/wods/${prevId}`, function(prevAdminWod) {
			renderShowAdminWod(prevAdminWod['wod']);
			renderAddWodMovements(prevAdminWod['movements']);
      		renderWodAction(prevAdminWod['wod']);
		});
	});
};

function renderNextAdminWod(adminWod) {
	let newNextAdminWod = new Wod(adminWod);
	let adminWodNextHtml = newNextAdminWod.showAdminWodTemplate();
	$('.crossfit-container').html(adminWodNextHtml);
};
