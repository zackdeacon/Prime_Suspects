// NOT QUITE WORKING YET
$(document).ready(function () {
    let cartId;
    getCartID();
    // const stripe = Stripe('pk_test_51H6lyMACrjNtDH8GqBanKtwFegjiWxVci5kU3I8kXSc0gtl4hZg32JkxMpxobsCoJRyFKuR58V0KgdNwPLjLenpy009kCobCkO');
    // $(".checkout-button").on("click", getCartID);

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

    // cartObj =
    // {
    //     payment_method_types: ['card'],
    //     line_items: [],
    //     mode: 'payment',
    //     success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    //     cancel_url: 'https://example.com/cancel'
    // }
    function getCartID() {
        event.preventDefault()

        $.ajax('/readsessions').done(data => {
            cartId = data.user.cartId
            // createCheckoutSession(cartId)
        })

        //     function createCheckoutSession(cartId) {
        //         $.ajax({
        //             url: `/create-checkout-session/${cartId}`,
        //             method: "POST"
        //         }).done(result => {
        //             return result.json()
        //         }).fail(err => {
        //             console.error(err)
        //         })
        //     }
        // }
    }

    var createCheckoutSession = function () {
        return fetch(`/create-checkout-session/${cartId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
        }).then(function (result) {
            return result.json();
        });
    };

    fetch('/config')
        .then(function (result) {
            return result.json();
        })
        .then(function (json) {
            window.config = json;
            var stripe = Stripe(config.publicKey);
            // updateQuantity();
            // Setup event handler to create a Checkout Session on submit
            $('#checkout-button').on('click', function (event) {
                createCheckoutSession().then(function (data) {
                    stripe.redirectToCheckout({
                        sessionId: data.sessionId,
                    }).then(handleResult);
                });
            });
        });
})
