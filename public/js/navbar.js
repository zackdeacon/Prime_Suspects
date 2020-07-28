$.ajax('/readsessions').done(function(data){
    if(data.user){
        $("#navbarUser").text(`Hello, ${data.user.name}`)
    } else {
        $("#navList").empty()
        const link = $("<a>")
        link.attr("href", "/login")
        link.text("Login")
        $("#navList").attr("class", "right")
        $("#navList").append(link)
    }
})