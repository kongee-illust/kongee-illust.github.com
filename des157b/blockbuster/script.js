    (function() {
        "use strict ";
        // const fs = document.getElementsByClassName("fa-expand");
        const mySection = document.getElementById("mySection");
        const myText = document.getElementById("myText");
        const cutestdog = document.getElementById("cutestdog");
        // const intervalID = setInterval(checkTime, 1000);
        const cuteVideos = document.getElementsByClassName("video-object")
        const cuteVideoWrapper = document.querySelector(".video-wrapper")

        // fs.addEventListener("click ", function() {
        //     if (!document.fullscreenElement) {
        //         document.documentElement.requestFullscreen();
        //     } else {
        //         document.exitFullscreen();
        //     }
        // })

        // detect load for first video
        const loadingSign = document.getElementById('loading-sign')
        cuteVideos[0].addEventListener('playing', () => {
            loadingSign.classList.remove('open')
            cuteVideoWrapper.classList.remove('loading')
        });

        let currentVideoCounter = 0;
        let videosLength = cuteVideos.length;


        [...cuteVideos].forEach(cuteVideoElem => {
            cuteVideoElem.addEventListener('ended', playNext);
        })

        function playNext() {
            // skip if first time
            if (currentVideoCounter) {
                // pause and remove class
                let previousVideoPlace = (currentVideoCounter - 1) % videosLength
                const previousCuteVideoElem = cuteVideos[previousVideoPlace];
                previousCuteVideoElem.pause();
                previousCuteVideoElem.classList.remove('playing');
            }

            // play and add class
            let currentVideoPlace = currentVideoCounter % videosLength;
            const currentCuteVideoElem = cuteVideos[currentVideoPlace];
            currentCuteVideoElem.play();
            currentCuteVideoElem.classList.add('playing');
            console.log(currentVideoCounter, currentVideoPlace, currentCuteVideoElem)

            currentVideoCounter += 1;
        }
        playNext()


        function loaded() {

        }
    })();