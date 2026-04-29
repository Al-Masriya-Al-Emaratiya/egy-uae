document.addEventListener('click', function() {
    var audio = document.getElementById("myAudio");
    
    //  (60%)
    audio.volume = 0.6; 
    
    audio.play().catch(function(error) {
        console.log("error, we are sorry:", error);
    });
}, { once: true });
