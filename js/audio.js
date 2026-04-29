document.addEventListener('click', function() {
    var audio = document.getElementById("myAudio");
    
    //  (20%)
    audio.volume = 0.2; 
    
    audio.play().catch(function(error) {
        console.log("error, we are sorry:", error);
    });
}, { once: true });
