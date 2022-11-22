const container = document.querySelector(".container"),

    video = document.querySelector("video"),

    playBTN = document.querySelector(".play-BTN"),

    prevBTN = document.querySelector(".prev-BTN"),

    nextBTN = document.querySelector(".next-BTN"),

    theatre = document.querySelector(".theatre"), 

    fullScreen = document.querySelector("#full-screen"),

    miniPlayer = document.querySelector(".mini-player"),

    mute = document.querySelector(".mute"),

    input = document.querySelector("input"),
   
    repeat = document.querySelector("#repeat"),

    totalTime = document.querySelector(".total-time"),

    currentTime = document.querySelector(".current-time"),

    speed = document.querySelector(".speed"),

    slower = document.querySelector(".slower"),

    timelineContainer = document.querySelector('.timeline-container')




document.addEventListener("keydown", (e) =>{

    const tagName = document.activeElement.tagName.toLowerCase()


    if (tagName === "input") return


    switch (e.key.toLowerCase()) {
        
        case " ":

            if (tagName === "input") return

        case "k":

            togglePlay()
            
        break


        case "t":

            miniPlayerChange()

        break


        case "f":

            fullScreenChange()

        break


        case "h":

            theatreModeChange()

        break


        case "m":

            toggleMute()

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



theatre.addEventListener("click", theatreModeChange)


function theatreModeChange(){

    container.classList.toggle("theatre-mode")

}



fullScreen.addEventListener("click", fullScreenChange)


function fullScreenChange(){

      if (document.fullscreenElement === null) {
        
        container.requestFullscreen()

      } else {

        document.exitFullscreen()
        
      }

}


document.addEventListener("fullscreenchange", () =>{

    container.classList.toggle("full-screen")  

})



miniPlayer.addEventListener("click", miniPlayerChange)



function miniPlayerChange(){

    if (container.classList.contains("mini-player")) {

        document.exitPictureInPicture()

    } else {

        video.requestPictureInPicture()
        
    }

}




video.addEventListener("enterpictureinpicture", () =>{

    container.classList.add("mini-player")

})



video.addEventListener("leavepictureinpicture", () =>{

    container.classList.remove("mini-player")

})



mute.addEventListener("click", toggleMute)



function toggleMute(){

    video.muted = !video.muted
    
}





input.addEventListener("input", (e) =>{

    video.volume = e.target.value

    video.muted = e.target.value === 0

})




video.addEventListener("volumechange", () =>{

    input.value = video.volume


    let volumeLevel


    if (video.muted || video.volume === 0) {
        
        input.value = 0

        volumeLevel = "muted"

    }else if(video.volume >= .5) {

        volumeLevel = "high"
        
    }else{

        volumeLevel = "low"

    }


    container.dataset.volumeLevel = volumeLevel
    
})





repeat.addEventListener("click", () =>{

    container.classList.toggle("repeat")

})




video.addEventListener("loadeddata", () =>{

    totalTime.textContent = formatDuration(video.duration)

})




video.addEventListener("timeupdate", () =>{

    currentTime.textContent = formatDuration(video.currentTime)

    if (container.classList.contains("repeat") && video.currentTime === video.duration) {
        
        video.currentTime = 0

        togglePlay()

    }
   
    const percent = video.currentTime / video.duration

    timelineContainer.style.setProperty("--progress-position", percent)

})


const leadingZeroFormatter = new Intl.NumberFormat(undefined, {

    minimumIntegerDigits: 2

})



function formatDuration(time){

    const seconds = Math.floor(time % 60)

    const minutes = Math.floor(time / 60) % 60

    const hours = Math.floor(time / 3600)


    if (hours === 0) {
        
        return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        
    }else{
        
        return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`

    }

}




speed.addEventListener("click", playBackSpeed)




function playBackSpeed(){

    let newPlaybackRate = video.playbackRate + .25

    if(newPlaybackRate > 2)

        newPlaybackRate + .25

        video.playbackRate = newPlaybackRate

        speed.textContent = `${newPlaybackRate}x`

}




slower.addEventListener("click", slowPlayBackSpeed)




function slowPlayBackSpeed(){

    let newPlaybackRate = video.playbackRate - .25

    if(newPlaybackRate < 2)

        newPlaybackRate - .25

        video.playbackRate = newPlaybackRate

        slower.textContent = `${newPlaybackRate}x`

        console.log('working')

}




timelineContainer.addEventListener("mousemove", timelineUpdate)

timelineContainer.addEventListener("mousedown", toggleScrubbing)






let isScrubbing = false

let wasPaused


function toggleScrubbing(e){

    const rect = timelineContainer.getBoundingClientRect()

    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width


    isScrubbing = (e.buttons & 1) === 1

    container.classList.toggle("scrubbing", isScrubbing)



    if (isScrubbing) {
        
        wasPaused = video.paused

        video.pause()

    } else {

        video.currentTime = percent * video.duration

        if(!wasPaused) video.play()

    }

    timelineUpdate(e)

}


function timelineUpdate(e){

      const rect = timelineContainer.getBoundingClientRect()

      const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width


      timelineContainer.style.setProperty("--preview-position", percent)

}

