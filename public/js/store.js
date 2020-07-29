// ===========================================================

// GLOBAL VARIABLE
// =======================================

let userId;


// PAGE LOAD ON READY
// ===========================================================
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// FUNCTION
// =========================================
function getUserId() {

    // V=- NEEDS ADJUSTING TO JQUERY -=V //
    $.ajax('/readsessions').done(data => {
        userId = data.user.cartId
        // createCheckoutSession(cartId)
    })
}

function ready() {
    getUserId();

    // EVENT LISTENERS
    // ===============================================
    $(".zackSubmit").on("click", function (data) {
        let clickedId = $(this).attr("data-id");
        console.log(clickedId);
        $.ajax({
            url: "/api/items/",
            method: "POST",
            data: { itemId: clickedId }
        }).done(function (data) {
        }).catch(err => {
            console.error(err)
        })
    })

    $(".zackRemoveBtn").on("click", function (data) {
        console.log(userId)
        let clickedId = $(this).attr("data-id");
        console.log(clickedId);
        $.ajax({
            url: `/cart/delete/${userId}/${clickedId}`,
            method: "DELETE",
            data: { itemId: clickedId }
        }).done(function (data) {
            location.reload();
        }).catch(err => {
            console.error(err)
        })
    })
}

$("#zackSubmit").on("submit", function (event) {
    event.preventDefault();
    let searched = $(".zackGrab").val();
    $.ajax({
        url: `/search/${searched}`,
        method: "GET"
    }).done(data => {
        location.href = `/search/${searched}`
    }).fail(err => {
        alert('something went wrong');
        window.location.reload();
    })
})

$("#zackSubmitSideNav").on("submit", function (event) {
    event.preventDefault();
    let searched = $("#search").val();
    $.ajax({
        url: `/search/${searched}`,
        method: "GET"
    }).done(data => {
        location.href = `/search/${searched}`
    }).fail(err => {
        alert('something went wrong');
        window.location.reload();
    })
})