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
  const userForm = $("#addUser");

  // ADDS AN EVENT LISTENER WHEN SUBMIT IS CLICKED
  $(userForm).on("submit", handleFormSubmit);


  // FUNCTIONS
  // ======================================================================================
  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      !userEmailInput.val().trim() ||
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
    var newUserObj = {
      email: userEmailInput
        .val()
        .trim(),
      password: userPasswordInput
        .val()
        .trim(),
      name: userFullNameInput
        .val(),
      address: userStreetAddressInput
        .val(),
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
    submitUser(newUserObj);
  }

  function submitUser(newUserObj) {
    $.ajax({
      url: "/signup",
      method: "POST",
      data: newUserObj
    }).done(function (data) {
      location.href = "/login"
    }).fail(function (err) {
      console.log(err);
      location.reload();
    })
  }
});