//**********************************************************************************
// Admin Movements Index, Show and Next Movement on Users Show Page               //
//**********************************************************************************

$(function() {
	getAdminMovements();
  showAdminMovements();
});

function getAdminMovements() {
	$('a.load_adminmovements').on('click', function(e) {
		e.preventDefault();
		$('.crossfit-container').html('');
		$.getJSON(this.href, function(adminmovements) {
			renderAdminMovements(adminmovements);
		});
	});
};

function renderAdminMovements(adminmovements) {
  adminmovements.forEach(adminmovement => {
    let newAdminMovement = new Movement(adminmovement);
    let adminmovementHtml = newAdminMovement.adminIndexTemplate();
    $('.crossfit-container').append(adminmovementHtml);
  });
};

Movement.prototype.adminIndexTemplate = function() {
	let adminmovementHtml = `
	<li> ${this.id} </li><br>
	<li class="adminmovementName">Movement: ${this.name}</li><br>
	<li class="adminmovementType">Movement Type: ${this.movement_type}</li><br>
	<li class="adminmovementQuantity">Quantity: ${this.quantity}</li><br>
	<div class="">
		<a href="/admin/movements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div>
	<h3>_____________________________________</h3>
		`;
	return adminmovementHtml;
};

function Movement(adminmovement) {
	this.id = adminmovement.id;
	this.name = adminmovement.name;
	this.movement_type = adminmovement.movement_type;
	this.quantity = adminmovement.quantity;
};

function showAdminMovements() {
  $('a.show_adminmovements').on('click', function(e) {
    e.preventDefault();
    $('.crossfit-container').html('');
    $.getJSON(this.href, function(adminmove) {
      renderShowAdminMovement(adminmove);
    });
  });
};

function renderShowAdminMovement(adminmove) {
  let oneMovement = new Movement(adminmove);
  let oneMovementHtml = oneMovement.showAdminTemplate();
  $('.crossfit-container').append(oneMovementHtml);
}

Movement.prototype.showAdminTemplate = function() {
	let oneMovementHtml = `
	<li> ${this.id} </li><br>
	<li class="adminmovementName">Movement: ${this.name}</li><br>
	<li class="adminmovementType">Movement Type: ${this.movement_type}</li><br>
	<li class="adminmovementQuantity">Quantity: ${this.quantity}</li><br>
	<div class="">
		<a href="/admin/movements/${this.id}/edit" data-id="${this.id} class="show_link">Edit/Delete Movement</a>
	</div>
	<h3>_____________________________________</h3>
		`;
	return oneMovementHtml;
};
