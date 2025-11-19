
function checkUserType(){
    const navbar = document.getElementById("nav");
    const user_type = localStorage.getItem("user_type");
    console.log(user_type);
    if(user_type == 1){
        navLinkToAdminPanel(navbar);
    }
}
function navLinkToAdminPanel(navbar){
    const adminPanelList = document.createElement("li");
    const adminPanelLink = document.createElement("a");
    adminPanelLink.textContent = "Admin Panel";
    adminPanelLink.href = "./admin.html";
    navbar.appendChild(adminPanelList);
    navbar.appendChild(adminPanelLink);
}