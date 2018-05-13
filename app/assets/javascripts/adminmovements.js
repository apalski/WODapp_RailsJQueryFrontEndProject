//**********************************************************************************
// Admin Movements Index, Show and Next Movement on Users Show Page               //
//**********************************************************************************

$(function() {
  getAdminMovements();
  showAdminMovements();
  getNextAdminMovement();
  getPreviousAdminMovement();
});

function getAdminMovements() {
	$('a.load_adminmovements').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		$.getJSON(this.href, function(adminMovements) {
			renderAdminMovements(adminMovements);
		});
	});
};

function renderAdminMovements(adminMovements) {
  adminMovements.forEach(adminMovement => {
    let newAdminMovement = new Movement(adminMovement);
    let adminMovementHtml = newAdminMovement.adminIndexTemplate();
    $('.crossfit-container').append(adminMovementHtml);
  });
};

Movement.prototype.adminIndexTemplate = function() {
	let adminMovementHtml = `
	<li> ${this.id} </li><br>
	<li class="adminmovementName">Movement: ${this.name}</li><br>
	<li class="adminmovementType">Movement Type: ${this.movementType}</li><br>
	<li class="adminmovementQuantity">Quantity: ${this.quantity}</li><br>
	<div class="">
		<a href="/admin/movements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div>
	<h3>_____________________________________</h3>
		`;
	return adminMovementHtml;
};

function Movement(adminMovement) {
	this.id = adminMovement.id;
	this.name = adminMovement.name;
	this.movementType = adminMovement.movement_type;
	this.quantity = adminMovement.quantity;
  this.ownerId = adminMovement.owner_id;
};

function showAdminMovements() {
  $('a.show_adminmovements').on('click', function(e) {
    e.preventDefault();
    $('.crossfit-container').html('');
    $('.movement-container').html('');
    $('.wod_actions').html('');
    $.getJSON(this.href, function(adminMove) {
      renderShowAdminMovement(adminMove);
    });
  });
};

function renderShowAdminMovement(adminMove) {
  let oneMovement = new Movement(adminMove);
  let oneMovementHtml = oneMovement.showAdminTemplate();
  $('.crossfit-container').append(oneMovementHtml);
}

Movement.prototype.showAdminTemplate = function() {
	let oneMovementHtml = `
	<li> ${this.id} </li><br>
	<li class="adminmovementName">Movement: ${this.name}</li><br>
	<li class="adminmovementType">Movement Type: ${this.movementType}</li><br>
	<li class="adminmovementQuantity">Quantity: ${this.quantity}</li><br>
	<div class="">
		<a href="/admin/movements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div>
	<div>
	<button class="next-adminmovement" data-id="${this.id}" id="${this.ownerId}" name="${this.name}">Next Movement</button> |
	<button class="previous-adminmovement" data-id="${this.id}" id="${this.ownerId}" name="${this.name}">Previous Movement</button>
	</div>
	<h3>_____________________________________</h3>
		`;
	return oneMovementHtml;
};

function getNextAdminMovement() {
	$(document).on('click', '.next-adminmovement', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		let id = $(this).attr('data-id');
		let nextId = (parseInt(id) + 1).toString();
		let name = $(this).attr('name');
		$.getJSON(`/admin/movements/${nextId}`, function(nextAdminMove) {
			renderNextAdminMovement(nextAdminMove);
		});
	});
};

function getPreviousAdminMovement() {
	$(document).on('click', '.previous-adminmovement', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
	    $('.movement-container').html('');
	    $('.wod_actions').html('');
		let id = $(this).attr('data-id');
		let prevId = (parseInt(id) - 1).toString();
		let name = $(this).attr('name');
		$.getJSON(`/admin/movements/${prevId}`, function(prevAdminMove) {
			renderNextAdminMovement(prevAdminMove);
		});
	});
};

function renderNextAdminMovement(adminMove) {
	let newNextAdminMovement = new Movement(adminMove);
	let adminMovementNextHtml = newNextAdminMovement.showAdminTemplate();
	$('.crossfit-container').html(adminMovementNextHtml);
};
