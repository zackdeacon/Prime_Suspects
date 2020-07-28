if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    $(".zackSubmit").on("click", function(data){
        console.log(data);
        // if(cookie.user=== "undefined"){
        //     location.href = "/"
        //         } else {
    let clickedId = $(this).attr("data-id");
    $.ajax({
        url:"/api/items/",
        method: "POST",
        data: {itemId: clickedId}
    }).done(function(data){
        console.log(data);
    })  
    })
}