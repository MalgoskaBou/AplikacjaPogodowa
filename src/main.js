const web = {
    init: function () {
        const title = document.querySelector('h1');
        const sound = document.querySelector('audio');

        const titleOnStart = function () {
            title.innerText = 'What the weather?';
        }

        const soundOnStart = function () {
            sound.play()
            sound.currentTime = 0;
        }

        const soundStop = function () {
            sound.pause();
            sound.currentTime = 0;
        }

        titleOnStart();
        title.addEventListener('click', soundOnStart)
        title.addEventListener('dblclick', soundStop)

    } // <-- end of init function
}; // <-- end of web obj.

document.onload = web.init(); //To trzeba chyba usunąć gdy zaczniemy pracę z Webpackiem
//