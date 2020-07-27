// NOT QUITE WORKING YET
$(document).ready(function () {
    // $(".zackSubmit").on("click", function () {
    //     let clickedId = $(this).attr("data-id");
    //     $.ajax({
    //         url: `/api/carts/${clickedId}`,
    //         method: "DELETE",
    //         data: clickedId 
    //     }).done(function (data) {
    //         console.log(data);
    //         location.reload();
    //     })
    // })
 

    checkoutButton.on('click', function () {
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

    // var response = fetch('/api/id').then(function(response) {
    //     return response.json();
    // }).then(function(responseJson) {
    //     var sessionID = responseJson.session_id;
    //     stripe.redirectToCheckout(sessionID)
    //     // Call stripe.redirectToCheckout() with the Session ID.
    // });

    // function deleteItem() {
    //     event.preventDefault();
    //     console.log(userID)
    //     $.ajax({
    //         method: "DELETE",
    //         url: "/user/" + userID,
    //     }).done(function (data) {
    //         // location.href = "/"
    //     }).fail(function (err) {
    //         console.log(err);
    //         location.reload();
    //     })
    // }
    const checkoutButton = $('.checkout-button');
    cartObj =
    {
        payment_method_types: ['card'],
        line_items: [],
        mode: 'payment',
        success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/cancel',

    }

    function getCartID() {

        $.ajax('/readsessions').done(function (data) {
            console.log(data);
            cartId = data.user.cartId
            readCart(cartId)
        })

        function readCart(cartId) {
            $.ajax({
                url: `/api/carts/${cartId}`,
                method: "GET"
            }).done(function (cartInfo) {
                for (let i = 0; i < cartInfo.items.length; i++) {
                    cartObj.line_items.push(
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: cartInfo.items[i].name
                                },
                                unit_amount: cartInfo.items[i].prices_amountMax,
                            },
                            quantity: 1,
                        },
                    )}
                console.log(cartInfo);
                console.log(cartObj)
            }).fail(err => {
                console.log(err)
            })
        }

    }
    getCartID();


})


// READ CART
// CREATE AN OBJECT WITH ALL THE CART ITEMS
// NEED CURRENCY(ALWAYS USD), PRODUCT NAME, THE AMOUNT(PROBABLY 1 FOR NOW), AND PRICE



// EXAMPLE CODE
const session = await stripe.checkout.sessions.create(cartObj);
