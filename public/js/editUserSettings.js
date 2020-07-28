$(document).ready(function () {

    // CAPTURES THE VALUES
    // ======================================================================================
    const userEmailInput = $("#userEmail");
    const userPasswordInput = $("#userPassword");
    const userStreetAddressInput = $("#userStreetAddress");
    const userCityInput = $("#userCity");
    const userStateInput = $("#userState");
    const userZipInput = $("#userZip");
    const userFullNameInput = $("#userFullName");
    const userPhoneNumber = $("#userPhoneNumber");
    let userID;
    getUserData();
    
    // ADDS AN EVENT LISTENER WHEN SUBMIT IS CLICKED
    $("#editUser").on("click", handleFormSubmit);
    $("#logout-button").on("click", logout)
    // $("#deleteUser").on("click", deleteUser)

    function handleFormSubmit(event) {
        event.preventDefault();

        // CONSTRUCTS A NEW USER OBJECT
        // ======================================================================================
        var userObj = {
            email: userEmailInput.val(),
            password: userPasswordInput.val(),
            name: userFullNameInput.val(),
            address: userStreetAddressInput.val(),
            city: userCityInput.val(),
            state: userStateInput.val(),
            zip: userZipInput.val(),
            phoneNumber: userPhoneNumber.val(),
        };
        updateUser(userObj);
    }

    function updateUser(userObj) {
        $.ajax({
            method: "PUT",
            url: "/settings",
            data: userObj,
        }).done(function (data) {
            console.log(data);
            location.href = "/logout"
        }).fail(function (err) {
            console.log(err);
            location.reload();
        })
    }

    function logout(event) {
        event.preventDefault();
        location.href = "/logout"
    }

    // function deleteUser() {
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

    function getUserData() {
        $.ajax('/readsessions').done(function (data) {
            if (data.user) {
                userID=(data.user.id)
                userEmailInput.val(data.user.email);
                userStreetAddressInput.val(data.user.address);
                userCityInput.val(data.user.city);
                userZipInput.val(data.user.zip);
                userStateInput.val(data.user.state);
                userPhoneNumber.val(data.user.phoneNumber);
                userFullNameInput.val(data.user.name);
            } else {
                location.href = "/"
            }
        })
    }
});