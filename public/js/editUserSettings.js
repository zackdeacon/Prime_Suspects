$(document).ready(function () {

    // CAPTURES THE VALUES
    // ======================================================================================
    const userEmailInput = $("#userEmail");
    const userNameInput = $("#userName");
    const userPasswordInput = $("#userPassword");
    const userStreetAddressInput = $("#userStreetAddress");
    const userCityInput = $("#userCity");
    const userStateInput = $("#userState");
    const userZipInput = $("#userZip");
    const userFullNameInput = $("#userFullName");
    const userPhoneNumber = $("#userPhoneNumber");
    const userForm = $("#addUser");

    // ADDS AN EVENT LISTENER WHEN SUBMIT IS CLICKED
    $(userForm).on("submit", handleFormSubmit);

    const url = window.location.search;
    let userId;
    userId = url.split("=")[1];
    getUserData(postId, "user");

    // FUNCTIONS
    // ======================================================================================
    function handleFormSubmit(event) {
        event.preventDefault();
        if (
            !userEmailInput.val().trim() ||
            !userNameInput.val().trim() ||
            !userPasswordInput.val().trim() ||
            !userStreetAddressInput.val().trim() ||
            !userCityInput.val().trim() ||
            !userStateInput.val().trim() ||
            !userZipInput.val().trim() ||
            !userFullNameInput.val().trim() ||
            !userPhoneNumber.val().trim()) {
            return;
        }

        // CONSTRUCTS A NEW USER OBJECT
        // ======================================================================================
        var userObj = {
            email: userEmailInput
                .val()
                .trim(),
            // username: userNameInput
            //     .val()
            //     .trim(),
            password: userPasswordInput
                .val()
                .trim(),
            name: userFullNameInput
                .val(),
            // .trim(),
            address: userStreetAddressInput
                .val(),
            // .trim()
            city: userCityInput
                .val()
                .trim(),
            state: userStateInput
                .val()
                .trim(),
            zip: userZipInput
                .val()
                .trim(),
            phoneNumber: userPhoneNumber
                .val()
                .trim(),
        };
        updateUser(userObj);
    }

    function updateUser(userObj) {
        $.ajax({
            method: "PUT",
            url: "/api/users",
            data: userObj
        }).done(function (data) {
            console.log(data);
            location.href = "/login"
        }).fail(function (err) {
            console.log(err);
            location.reload();
        })
    }

    function getUserData(id, type) {
        let queryUrl = "api/users/" + id;
        $.get(queryUrl, function (data) {
            // If this post exists, prefill our cms forms with its data
            userEmailInput.val(data.email);
            userPasswordInput.val(data.password);
            userStreetAddressInput.val(data.address);
            userCityInput.val(data.city);
            userZipInput.val(data.zip);
            userPhoneNumber.val(data.phoneNumber);
            userFullNameInput.val(data.name);
        })
    }
});