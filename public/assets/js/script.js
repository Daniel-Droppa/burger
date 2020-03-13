$("#addBurger").on("submit", function(event) {
    event.preventDefault();

    var newBurger = $("#input").val().trim();

    $.post('/api/burgers',{burger_name: newBurger}).then(
      function() {
        console.log("created new burger");
        location.reload();
      }
    );
});

$('.devourBtn').click(function(){
    const id = $(this).attr('data-id')
    $.ajax({
        url: '/api/burgers/'+id,
        method: 'PUT',
    }).then((results)=>{
        if(results === "OK"){
            location.reload()
        }
    })
})