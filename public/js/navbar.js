$.ajax('/readsessions').done(function(data){
    console.log(data);
    if(data.user){
        $("#navbarUser").text(`Hello, ${data.user.name}`)
    } else {
        $("#nav-mobile").empty()
        const link = $("<a>")
        link.attr("href", "/login")
        link.text("Login")
        $("#nav-mobile").attr("class", "right")
        $("#nav-mobile").append(link)
    }
})