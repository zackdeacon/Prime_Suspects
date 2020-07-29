$(document).ready(function () {

    // GLOBAL VARIABLE
    // ==============================================
    let cartId;


    // CALLED FUNCTIONS
    // =====================================================
    getCartID();




    // FUNCTIONS
    // ======================================================
    function getCartID() {
        event.preventDefault()
        $.ajax('/readsessions').done(data => {
            cartId = data.user.cartId
        })
    }

    const createCheckoutSession = function () {
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
            const stripe = Stripe(config.publicKey);
            $('#checkout-button').on('click', function (event) {
                createCheckoutSession().then(function (data) {
                    stripe.redirectToCheckout({
                        sessionId: data.sessionId,
                    }).then(handleResult);
                });
            });
        });
})
