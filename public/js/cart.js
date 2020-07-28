// NOT QUITE WORKING YET
$(document).ready(function () {
    var stripe = Stripe('pk_test_51H6lyMACrjNtDH8GqBanKtwFegjiWxVci5kU3I8kXSc0gtl4hZg32JkxMpxobsCoJRyFKuR58V0KgdNwPLjLenpy009kCobCkO');
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
    
    const checkoutButton = $('.checkout-button');
    cartObj =
    {
        payment_method_types: ['card'],
        line_items: [],
        mode: 'payment',
        success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/cancel'
    }

    function getCartID() {

        $.ajax('/readsessions').done(function (data) {
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
                    )
                }
                // console.log(cartInfo);
                console.log(cartObj)
            }).fail(err => {
                console.log(err)
            })
        }

    }
    getCartID();


    // const session = await stripe.checkout.sessions.create(cartObj);
})
