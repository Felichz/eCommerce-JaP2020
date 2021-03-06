function initAuth() {
    gapi.load('auth2', function () {
        const auth2 = gapi.auth2.init({
            client_id: '213419820394-uvd8bancrgor4shmd9dqjupsni82kvt7.apps.googleusercontent.com',
        });

        auth2.then(() => {
            const profile = auth2.currentUser.get().getBasicProfile();
            if (profile) {
                localStorage.removeItem("correo");
                var nombre = profile.getGivenName();
                var img = profile.getImageUrl();
                var toAdd = createButton(nombre, img);
                const menu = document.getElementById("menu");
                menu.innerHTML += toAdd;
            }else if(localStorage.getItem('correo')){
                var toAdd = createButton(localStorage.getItem('correo'), "img/defaultUserImg.svg");
                const menu = document.getElementById("menu");
                menu.innerHTML += toAdd;
            }
        });
        window.auth2 = auth2;
    });
};

function createButton(nombre, img){
    let btnMenu = `
    <div id="userMenu" class="dropdown show">
        <a class="btn dropdown-toggle" style="color: white;" href="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="${img}" height="25px" style="display: inline-inblock;"> ${nombre}
        </a>
            
        <div class="dropdown-menu" style="width: 100%; text-align: center;" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#" onClick="logOut()">Cerrar sesión</a>
        </div>
    </div>
    `
    return btnMenu;
};

function logOut(){
    auth2.disconnect();
    localStorage.clear();
    window.location = "login.html";
}