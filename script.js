const playBtn = document.querySelector("#play"),

    video = document.querySelector("video")


playBtn.addEventListener("click", () =>{

    playBtn.classList.remove("fa-play")
    
    playBtn.classList.add("fa-pause")

    video.play()

})