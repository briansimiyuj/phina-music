const container = document.querySelector(".container"),

    video = document.querySelector("video"),

    playBTN = document.querySelector(".play-BTN"),

    prevBTN = document.querySelector(".prev-BTN"),

    nextBTN = document.querySelector(".next-BTN"),

    theatre = document.querySelector(".theatre"), 

    fullScreen = document.querySelector("#full-screen")




document.addEventListener("keydown", (e) =>{

    const tagName = document.activeElement.tagName.toLowerCase()


    if (tagName === "input") return


    switch (e.key.toLowerCase()) {
        
        case " ":

            if (tagName === "input") return


        case "k":

            togglePlay()
            
        break
    
    }

})


const videos = ['In Love', 'Number One', 'Sitaki Tena', 'Upo Nyonyo']


let videoIndex = 0


const loadVideo = (song) =>{

    video.src = `videos/${song}.mp4`

}

loadVideo(videos[videoIndex])


playBTN.addEventListener("click", togglePlay)

video.addEventListener("click", togglePlay)



function togglePlay(){
      
    video.paused ? video.play() : video.pause()

}



video.addEventListener("play", () =>{

    container.classList.remove("paused")

})



video.addEventListener("pause", () =>{

    container.classList.add("paused")

})




const nextSong = () =>{

    videoIndex++

    if (videoIndex > videos.length - 1) {
        
        videoIndex = 0

    }


    loadVideo(videos[videoIndex])


    if (container.classList.contains("paused")) {

        container.classList.remove("paused")


        setTimeout(() => {
            
            togglePlay()
            
        }, 1000)

    }

}


nextBTN.addEventListener("click", () =>{

    nextSong()

})





const previousSong = () =>{

    videoIndex--

    if (videoIndex < 0) {
        
        videoIndex = videos.length - 1

        console.log('working')

    }


    loadVideo(videos[videoIndex])


    if (container.classList.contains("paused")) {

        container.classList.remove("paused")


        setTimeout(() => {
            
            togglePlay()
            
        }, 1000)

    }

}



prevBTN.addEventListener("click", () =>{

    previousSong()

})




theatre.addEventListener("click", () =>{

    container.classList.toggle("theatre-mode")

})




fullScreen.addEventListener("click", fullScreenChange)


function fullScreenChange(){

      if (document.fullscreenElement === null) {
        
        container.requestFullscreen()

        console.log('working')

      } else {

        document.exitFullscreen()

        console.log('perfect')
        
      }

}