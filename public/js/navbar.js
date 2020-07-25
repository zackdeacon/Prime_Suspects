$.ajax('/auth/readsessions').done(function(data){
    console.log(data);
    if(data.user){
        // WILL FILL OUT AFTER WE KNOW MORE ABOUT THE FINAL NAV BAR SHAPE
    
        // $("#navbar").empty();
        // $("#navbar").append(`<span >Welcome, ${data.user.name}</span>`)
        // $("#navbar").append("<a href='/clubhouse'>my page</a>")
        // $("#navbar").append("<a href='/auth/logout'>logout</a>")
    }
})