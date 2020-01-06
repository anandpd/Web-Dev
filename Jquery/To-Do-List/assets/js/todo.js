
// Check off a specific todo //
$('ul').on('click','li',function () { 
    $(this).toggleClass("completed");

});

//click on x to delete
$('ul').on("click","span",function (e) { 
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    e.stopPropagation(); 
});

$("input[type='text']").keypress(function (e) { 
    if (e.which === 13) {
        if ($("input[type='text']").val() === ""){
            alert("Please enter a TO-DO first !")
        }
        else{
        var text = $(this).val();
        $('ul').append("<li><span><i class='fa fa-trash'></i></span>" + text + "</li>");
        $("input[type='text']").val("");
        $(this).css("border","none");  
            }
    }
});

$('.fa-plus-square').click(function () { 
    $("input[type='text'").fadeToggle();
});
