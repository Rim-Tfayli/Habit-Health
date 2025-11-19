function addClickListeners(selector, handler){
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener("click", handler);
    });
}