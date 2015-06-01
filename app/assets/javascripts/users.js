$(document).ready(function() {
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  // Watch for a form submission -we added the id to the button:
  $("#form-submit-btn").click(function(event) {
    // don't send anything from button - don't let submit
    event.preventDefault();
    // disable button
    $('input[type=submit]').prop('disabled', true);
    var error = false;
    // take cc field values
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    if (!error) {
      // Get the Stripe token and send content to stripe:
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler); 
    }
    return false;
  }); // form submission
  //stripe sends back a response which includes a card tocken
  function stripeResponseHandler(status, response) {
    // Get a reference to the form:
    var f = $("#new_user");
    // Get the token from the response:
    var token = response.id;
    // Add the token to the form:
    f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
    // Submit the form:
    f.get(0).submit(); 
  }
});