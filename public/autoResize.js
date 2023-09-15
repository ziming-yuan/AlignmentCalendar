(function () {
    const iframe = document.getElementById("alignment-calendar");
    function updateIframeHeight(event) {
        if (event.data && event.data.type === "SET_IFRAME_HEIGHT") {
            iframe.style.height = event.data.height;
        }
    }
    window.addEventListener("message", updateIframeHeight);
})();
