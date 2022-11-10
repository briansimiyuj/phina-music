const container = document.querySelector(".container"),

    video = document.querySelector("video"),

    playBTN = document.querySelector(".play-BTN")


playBTN.addEventListener("click", togglePlay)

video.addEventListener("click", togglePlay)



function togglePlay(){
      
    video.paused ? video.play() : video.pause()

}



video.addEventListener("play", () =>{

    container.classList.remove("paused")

    console.log('working')

})



video.addEventListener("pause", () =>{

    container.classList.add("paused")

    console.log('perfect')

})