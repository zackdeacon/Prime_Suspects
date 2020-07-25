$.ajax('/readsessions').done(function(data){
    console.log(data);
    if(data.user){
        $("#navbarUser").text(`Hello, ${data.user.name}`)
    }
})