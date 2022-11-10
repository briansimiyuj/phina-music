const container = document.querySelector(".container"),

    video = document.querySelector("video"),

    playBTN = document.querySelector(".play-BTN"),

    prevBTN = document.querySelector(".prev-BTN"),

    nextBTN = document.querySelector(".next-BTN")



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


    loadVideo(videos[videoIndex])

}



prevBTN.addEventListener("click", () =>{

    previousSong()

    console.log('working')

})