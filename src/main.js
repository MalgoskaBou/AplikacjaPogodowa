const web = {
    init: function () {
        const titleOnStart = function () {
            const title = document.querySelector('h1');
            title.innerText = 'What the weather?';
        }
        titleOnStart();

    } // <-- end of init function
}; // <-- end of web obj.
document.onload = web.init();