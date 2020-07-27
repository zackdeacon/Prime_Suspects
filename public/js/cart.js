// NOT QUITE WORKING YET
console.log("Hello world!")
$(document).ready(function () {
//     $(".zackSubmit").on("click", function () {
//         let clickedId = $(this).attr("data-id");
//         $.ajax({
//             url: `/cartRoute/${clickedId}`,
//             method: "DELETE",
//             data: itemId 
//         }).done(function (data) {
//             console.log(data);
//             location.reload();
//         })
//     })
var checkoutButton = $('.checkout-button');

checkoutButton.addEventListener('click', function() {
  stripe.redirectToCheckout({
    // Make the id field from the Checkout Session creation API response
    // available to this file, so you can provide it as argument here
    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    sessionId: '{{CHECKOUT_SESSION_ID}}'
  }).then(function (result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  });
});

var response = fetch('/api/id').then(function(response) {
    return response.json();
}).then(function(responseJson) {
    var sessionID = responseJson.session_id;
    stripe.redirectToCheckout(sessionID)
    // Call stripe.redirectToCheckout() with the Session ID.
});
})



// READ CART
// CREATE AN OBJECT WITH ALL THE CART ITEMS
// NEED CURRENCY(ALWAYS USD), PRODUCT NAME, THE AMOUNT(PROBABLY 1 FOR NOW), AND PRICE



// EXAMPLE CODE
// const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [{
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: 'T-shirt',
//         },
//         unit_amount: 2000,
//       },
//       quantity: 1,
//     }],
//     mode: 'payment',
//     success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
//     cancel_url: 'https://example.com/cancel',
//   });
