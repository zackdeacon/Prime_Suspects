$(document).ready(function () {
    // Getting jQuery references.
    const userEmailInput = $("#userEmail");
    const userNameInput = $("#userName");
    const userPasswordInput = $("#userPassword");
    const userStreetAddressInput = $("#userStreetAddress");
    const userCityInput = $("#userCity");
    const userStateInput = $("#userState");
    const userZipInput = $("#userZip");
    const cmsForm = $("#cms");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
  
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var userId;
    userId = url.split("=")[1];
    // Sets a flag for whether or not we're updating a user to be false initially
    var updating = false;
  
    // Gets the users
    getUsers();
  
    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing fields
      if (
        !userEmailInput.val().trim() ||
        !userNameInput.val().trim() ||
        !userPasswordInput.val().trim() ||
        !userStreetAddressInput.val().trim() ||
        !userCityInput.val().trim() ||
        !userStateInput.val().trim() ||
        !userZipInput.val().trim()) {
        return;
      }
      // Constructing a new user object to hand to the database
      var newUser = {
        // userID: ?
        email: userEmailInput
          .val()
          .trim(),
        name: userNameInput
          .val()
          .trim(),
        password: userPasswordInput
          .val()
          .trim(),
        street_address: userStreetAddressInput
          .val()
          .trim(),
        city: userCityInput
          .val()
          .trim(),
        state: userStateInput
          .val()
          .trim(),
        zip: userZipInput
          .val()
          .trim(),
      };
  
      // If we're updating a user run updateUser to update a user
      // Otherwise run submitUser to create a new user
      if (updating) {
        newUser.id = userId;
        updateUser(newUser);
      }
      else {
        submitUser(newUser);
      }
    }
  
    // Submits a new post and brings user to blog page upon completion
    function submitUser(newUser) {
      $.post("/api/users", newUser, function () {
        window.location.href = "/"; // COULD BE SUCCESS PAGE?
      });
    }
  
    // Gets user data for the current user if we're editing
    // function getUserData(id) {
    //   var queryUrl = 'api/users/' + id;
    // }
  
    $.get(queryUrl, function (data) {
      if (data) {
        console.log(data.AuthorId || data.id);
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        authorId = data.AuthorId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  
    // A function to get Authors and then render our list of Authors
    // function getAuthors() {
    //   $.get("/api/authors", renderAuthorList);
    // }
  
    // Function to either render a list of authors, or if there are none, direct the user to the page
    // to create an author first
  
    // function renderAuthorList(data) {
    //   if (!data.length) {
    //     window.location.href = "/authors";
    //   }
    //   $(".hidden").removeClass("hidden");
    //   var rowsToAdd = [];
    //   for (var i = 0; i < data.length; i++) {
    //     rowsToAdd.push(createAuthorRow(data[i]));
    //   }
    //   authorSelect.empty();
    //   console.log(rowsToAdd);
    //   console.log(authorSelect);
    //   authorSelect.append(rowsToAdd);
    //   authorSelect.val(authorId);
    // }
  
    // Creates the author options in the dropdown
    // function createAuthorRow(author) {
    //   var listOption = $("<option>");
    //   listOption.attr("value", author.id);
    //   listOption.text(author.name);
    //   return listOption;
    // }
  
    // Update a given post, bring user to the blog page when done
    function updateUser(user) {
      $.ajax({
        method: "PUT",
        url: "/api/users",
        data: user
      })
        .then(function () {
          window.location.href = "/blog";
        });
    }
  });
  