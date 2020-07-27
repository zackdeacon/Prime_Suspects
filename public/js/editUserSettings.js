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
    const userForm = $("#editUser");
    getUserData();
    // ADDS AN EVENT LISTENER WHEN SUBMIT IS CLICKED
    $(userForm).on("submit", handleFormSubmit);

    // FUNCTIONS
    // ======================================================================================
    function handleFormSubmit(event) {
        event.preventDefault();
        // if (
        //     // !userEmailInput.val().trim() ||
        //     !userNameInput.val().trim() ||
        //     !userPasswordInput.val().trim() ||
        //     !userStreetAddressInput.val().trim() ||
        //     !userCityInput.val().trim() ||
        //     !userStateInput.val().trim() ||
        //     !userZipInput.val().trim() ||
        //     !userFullNameInput.val().trim() ||
        //     !userPhoneNumber.val().trim()) {
        //     return;
        // }

        // CONSTRUCTS A NEW USER OBJECT
        // ======================================================================================
        var userObj = {
            email: userEmailInput
                .val(),
                // .trim(),
            // username: userNameInput
            //     .val()
            //     .trim(),
            password: userPasswordInput
                .val(),
                // .trim(),
            name: userFullNameInput
                .val(),
            // .trim(),
            address: userStreetAddressInput
                .val(),
            // .trim()
            city: userCityInput
                .val(),
                // .trim(),
            state: userStateInput
                .val(),
                // .trim(),
            zip: userZipInput
                .val(),
                // .trim(),
            phoneNumber: userPhoneNumber
                .val(),
                // .trim(),
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
            location.href = "/"
        }).fail(function (err) {
            console.log(err);
            location.reload();
        })
    }

    function getUserData() {
        $.ajax('/readsessions').done(function(data){
            if(data.user){
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