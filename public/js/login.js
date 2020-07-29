$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        const userObj = {
            email: $("#loginEmail").val(),
            password: $("#loginPassword").val()
        }
        // console.log(userObj);
        $.ajax({
            url: "/login",
            method: "POST",
            data: userObj
        }).done(function (data) {
            location.href = "/"
        }).fail(function (err) {
            console.log(err);
            $("#errorSpan").text("Incorrect login info.")
        })
    })
})