

let cargarAnimaciones = new Promise((resolve, reject) => {

    let tituloDiv = document.querySelector("#titulo");
    let textoSpan = document.createElement("span");
    let underscore = document.createElement("span");

    underscore.innerHTML = "_";
    underscore.style.animation = "blink 1s infinite";

    tituloDiv.appendChild(textoSpan);
    tituloDiv.appendChild(underscore);

    let tituloString = "¡BIENVENIDOS A MI PORTAFOLIO!";

    let index = 0;

    setTimeout(() => {

        let intervalo = setInterval(() => {

            textoSpan.innerHTML = textoSpan.innerHTML + tituloString[index];
            index++;

            if (index == tituloString.length) {
                clearInterval(intervalo);
                tituloDiv.removeChild(underscore)
                resolve(underscore);
            }

            if (index == Math.round(tituloString.length / 2)) {

                let boton = document.querySelector("#boton");
                boton.style.animation = "animate-slide 1s forwards";
                hoverBoton();
                clickBoton();
            }

        }, 70)

    }, 1000);

}).then(function (underscore) {

    setTimeout(() => {

        cookieSpan();

        let divTexto = document.querySelector("#texto");
        let textoSpan = document.createElement("span");
        textoSpan.id = "maintext";


        divTexto.appendChild(textoSpan);
        divTexto.appendChild(underscore);

        let textoDelTexto = "Mi nombre es Ricardo, y después de 4 años aprendiendo a centrar divs en CSS, tengo el valor para auto considerarme como todo " +
            " un “Desarrollador Web Junior”. En este portafolio reúno  aquellos proyectos que considero " +
            "destacables como prueba de las cosas que puedo hacer y que disfruto haciendo. Estos van " +
            "desde el desarrollo Frontend, Backend y más.  ";

        let index = 0;

        let intervalo = setInterval(() => {

            textoSpan.innerHTML = textoSpan.innerHTML + textoDelTexto[index];
            index++;

            if (index == textoDelTexto.length) {
                clearInterval(intervalo);
            }

        }, 20);

    }, 500);

});

function cookieSpan() {

    let imagenGalleta = document.querySelector("#galleta");


    imagenGalleta.style.visibility = "visible";
    imagenGalleta.style.animation = "popUpGalleta 0.5s";

    imagenGalleta.addEventListener("animationend", () => {

        imagenGalleta.style.animation = "floatingGalleta 3s infinite";
        let textGalleta = document.querySelectorAll(".textoGalleta");

        textGalleta.forEach(element => {

            element.style.animation = "animate-slide 1s forwards";

        });
    });

}


function hoverBoton() {

    let boton = document.querySelector("#boton");
    let width = 0;
    let height = 0;

    boton.style.backgroundSize = `${width}% ${height}%`;

    let crecer;
    let decrecer;


    boton.addEventListener("mouseover", () => { //Crecer

        clearInterval(decrecer);

        crecer = setInterval(() => {

            width = width + 500;
            height = width * 3; //para mantener el ratio en el boton

            boton.style.backgroundSize = `${width}% ${height}%`;

            if (width >= 4000 || height >= 4000) {

                clearInterval(crecer);
            }

        }, 50);

    });

    boton.addEventListener("mouseout", () => { //Decrecer

        clearInterval(crecer);

        decrecer = setInterval(() => {

            width = width - 500;
            height = width * 3;

            boton.style.backgroundSize = `${width}% ${height}%`;

            if (width <= 0 || height <= 0) {

                clearInterval(decrecer);
            }

        }, 10);

    });

}

function clickBoton() {

    let boton = document.querySelector("#boton");
    loaded = false;
    boton.addEventListener("click", () => {


        let projectWindow = document.querySelector("#projects");
        projectWindow.style.animation = "pop 1s";
        projectWindow.style.display = "grid";

        projectWindow.scrollIntoView({ block: "end", behavior: "smooth" });

        if (loaded == false) {
            loaded = true;
            interaccionBotones();

           
            let techs = document.querySelectorAll(".boton");
            techs[0].style.transform = "translateY(11px)";
            techs[0].style.backgroundColor = "#FADFDF";
            techs[0].pressed = true;            
            
            let offset = techs[0].nextElementSibling;
            offset.style.boxShadow = "0 0 0 2px #b18597, 0 5px 0 2px #ffe3e2";
            querySelection();
        }

    });

}

function querySelection() {

    let seleccion = document.querySelectorAll(".boton");
    let projectsGrid = document.querySelector("#projectWindow");
    projectsGrid.innerHTML = "";

    fetch('proyectos.json')
        .then(response => response.json())
        .then(data => {

            let speedAnim = 0;
            let TechSelectedStrings = [];

            seleccion.forEach(element => {

                if (element.pressed) {

                    TechSelectedStrings.push(element.id);

                }

            });

            if (TechSelectedStrings.length == 0) {

                leyendaUpdate("0");
                return;
            }

            if (TechSelectedStrings[0] == "Todos") {

                data.proyectos.forEach(element => {

                    speedAnim++;
                    cargaProyecto(element.nombre, speedAnim, element.video,
                        element.descripcion, element.linkGithub, element.linkWeb)

                });

                leyendaUpdate(" " + data.proyectos.length);

                return;
            }

            let proyectosCargados = 0

            for (let x = 0; x < data.proyectos.length; x++) {

                let matches = 0;
                for (let z = 0; z < data.proyectos[x].techs.length; z++) {

                    let condicion = TechSelectedStrings.some(tech => data.proyectos[x].techs[z].includes(tech))

                    if (condicion) matches++;
                }

                if (matches == TechSelectedStrings.length) {

                    speedAnim++;
                    cargaProyecto(data.proyectos[x].nombre, speedAnim, data.proyectos[x].video,
                        data.proyectos[x].descripcion, data.proyectos[x].linkGithub, data.proyectos[x].linkWeb);
                    proyectosCargados++

                }
            }

            leyendaUpdate(" " + proyectosCargados);

        }).catch(error => console.error('Error al cargar el JSON:', error));

}


function cargaProyecto(name, speedAnim, videoProject, descripcion, linkGithub, linkWeb) {

    let projectsGrid = document.querySelector("#projectWindow");

    let proyectoContainer = document.createElement("div");
    proyectoContainer.classList.add("proyectoContainer");

    let proyecto = document.createElement("div");
    proyecto.classList.add("proyecto");

    let miniHeader = document.createElement("div");
    miniHeader.classList.add("miniHeader");
    miniHeader.style.backgroundColor = randomColor();

    let iconoCircle1 = document.createElement("div");
    iconoCircle1.classList.add("circulosMini");
    iconoCircle1.style.backgroundColor = randomColor();

    let iconoCircle2 = document.createElement("div");
    iconoCircle2.classList.add("circulosMini");
    iconoCircle2.style.backgroundColor = randomColor();

    let iconoCircle3 = document.createElement("div");
    iconoCircle3.classList.add("circulosMini");
    iconoCircle3.style.backgroundColor = randomColor();

    iconoCircle3.style.marginRight = "60px";

    miniHeader.appendChild(iconoCircle1);
    miniHeader.appendChild(iconoCircle2);
    miniHeader.appendChild(iconoCircle3);

    let mini = document.createElement("img");
    mini.classList.add("imgHeader");
    mini.src = "imgs/imgRepro/minimizar-signo.png";
    let square = document.createElement("img");
    square.classList.add("imgHeader");
    square.src = "imgs/imgRepro/cuadrado.png";
    let cerrar = document.createElement("img");
    cerrar.classList.add("imgHeader");
    cerrar.src = "imgs/imgRepro/cerrar.png";

    miniHeader.appendChild(mini);
    miniHeader.appendChild(square);
    miniHeader.appendChild(cerrar);

    let videoContenedor = document.createElement("div");
    videoContenedor.classList.add("videoContenedor");

    let nombreProject = document.createElement("div")
    nombreProject.innerHTML = name;
    nombreProject.classList.add("nombreProject");

    videoContenedor.appendChild(nombreProject);

    let video = document.createElement("video");
    video.src = videoProject;
    video.muted = true;
    video.classList.add("video");

    videoContenedor.appendChild(video)


    let miniBotones = document.createElement("div");
    miniBotones.classList.add("miniBotones");

    let backbut = document.createElement("img");
    backbut.classList.add("imgReproductor");
    backbut.src = "imgs/imgRepro/atras.png";
    let playbut = document.createElement("img");
    playbut.classList.add("imgReproductor");
    playbut.src = "imgs/imgRepro/jugar.png";
    let nextbut = document.createElement("img");
    nextbut.classList.add("imgReproductor");
    nextbut.src = "imgs/imgRepro/siguiente.png";

    miniBotones.appendChild(backbut);
    miniBotones.appendChild(playbut);
    miniBotones.appendChild(nextbut);

    proyecto.appendChild(miniHeader);
    proyecto.appendChild(videoContenedor);
    proyecto.appendChild(miniBotones);


    proyecto.addEventListener("mouseover", () => {

        nombreProject.style.opacity = "0%";
        video.play();
        playbut.src = "imgs/imgRepro/pausa.png"

    })

    proyecto.addEventListener("mouseout", () => {

        nombreProject.style.opacity = "100%";
        video.pause();
        playbut.src = "imgs/imgRepro/jugar.png"

    })

    proyecto.addEventListener("click", () => {

        lateral(name, videoProject, descripcion, linkGithub, linkWeb);
    })

    proyectoContainer.appendChild(proyecto);

    proyectoContainer.style.animation = "projectPop 1s forwards"
    proyectoContainer.style.animationDelay = 0.1 * speedAnim + "s";

    proyectoContainer.addEventListener("animationend", () => {

        proyectoContainer.style.opacity = "100%";
        proyectoContainer.style.animationDelay = 0;

        let duracion = Math.floor(Math.random() * 9) + 4;

        proyectoContainer.style.animation = `floatingProyecto ${duracion}s infinite`;

    })

    projectsGrid.appendChild(proyectoContainer);

}


function randomColor() {

    let random = Math.floor(Math.random() * 6) + 1;

    let color;

    switch (random) {
        case 1:
            color = "#FF8096";
            break;
        case 2:
            color = "#FF9C7E";
            break;
        case 3:
            color = "#FFBA7F";
            break;
        case 4:
            color = "#42D5B6";
            break;
        case 5:
            color = "#F1E9D6";
            break;
        case 6:
            color = "#FFCABA";
            break;
        case 7:
            color = "#E6D8B8";
            break;
        case 8:
            color = "#FE997A";
            break;
        default:
            break;
    }

    return color;

}



function leyendaUpdate(seleccion) {

    let leyendaSelec = document.querySelector("#textSeleccion");

    new Promise((resolve, reject) => {

        let intervalo = setInterval(() => {

            if (leyendaSelec.innerHTML.length == 0) {

                clearInterval(intervalo);
                resolve();

            }

            leyendaSelec.innerHTML = leyendaSelec.innerHTML.substring(0, leyendaSelec.innerHTML.length - 1);

        }, 50);

    }).then(function () {


        let index = 0;
        let intervalo = setInterval(() => {

            leyendaSelec.innerHTML = leyendaSelec.innerHTML + seleccion[index];
            index++;

            if (index == seleccion.length) {
                clearInterval(intervalo);
            }

        }, 50);

    })
}

////////funcion para desplegable lateral
let intervaloLateral;
function lateral(tituloPro, videoURLPro, descripcionPro, linkGitPro, linkWebPro) {

    let lateral = document.querySelector("#lateral");
    lateral.style.right = "0px";

    let overlay = document.querySelector("#over");
    overlay.style.display = "block";

    let titulo = document.querySelector("#nombreProyecto");
    let video = document.querySelector("#videoLat");
    let descripcion = document.querySelector("#descripcionProyectoTexto");
    descripcion.innerHTML = "";
    let linkGithub = document.querySelector("#githubLink");
    let linkGitWeb = document.querySelector("#webLink");

    titulo.innerHTML = tituloPro;
    video.src = videoURLPro;
    video.play();
    video.muted = true;
    video.loop = true;

    if (intervaloLateral) {

        clearInterval(intervaloLateral);

    }

    let index = 0;
    intervaloLateral = setInterval(() => {

        descripcion.innerHTML = descripcion.innerHTML + descripcionPro[index];
        index++;

        console.log(descripcion.innerHTML - length + " , " + descripcionPro.length)

        if (index == descripcionPro.length) {
            clearInterval(intervaloLateral);
            intervaloLateral = null;
        }

    }, 10);

    if (!linkGitPro) {

        linkGithub.style.display = "none";

    } else {

        linkGithub.style.display = "block";
        linkGithub.addEventListener("click", () => {
            window.location.href = linkGitPro;
        })

    }

    if (!linkWebPro) {

        linkGitWeb.style.display = "none";

    } else {

        linkGitWeb.style.display = "block";
        linkGitWeb.addEventListener("click", () => {
            window.location.href = linkWebPro;
        })

    }

}

let overlay = document.querySelector("#over");
overlay.addEventListener("click", () => {

    overlay.style.display = "none";
    let lateral = document.querySelector("#lateral");
    lateral.style.right = "-600px";

    if (intervaloLateral) {

        clearInterval(intervaloLateral);

    }
})

function interaccionBotones() {

    let botones = document.querySelectorAll(".boton");

    botones.forEach(element => {

        element.pressed = false;
        let offset = element.nextElementSibling;

        function hover() {
            if (!element.pressed) {
                element.style.transform = "translateY(6px)";
                element.style.backgroundColor = "#ffe9e9";

                offset.style.boxShadow = "0 0 0 2px #b18597, 0 7px 0 2px #ffe3e2";
            }
        }

        function hoverOut() {
            if (!element.pressed) {
                element.style.transform = "translateY(0px)";
                element.style.backgroundColor = "#fff0f0";

                offset.style.boxShadow = "0 0 0 2px #b18597, 0 11px 0 2px #ffe3e2";
            }
        }

        element.addEventListener("mouseover", hover);
        element.addEventListener("mouseout", hoverOut);

        element.addEventListener("click", () => {

            if (element.pressed == false) {//Cuando seleccionado

                element.style.transform = "translateY(11px)";
                element.style.backgroundColor = "#FADFDF";
                element.pressed = true;
                offset.style.boxShadow = "0 0 0 2px #b18597, 0 5px 0 2px #ffe3e2";

                if (element.id == "Todos") {

                    deSelectAll();
                    console.log("pase por aqui")

                } else {

                    deSelectJustAll();
                }

                querySelection();

            } else {

                element.style.transform = "translateY(0px)";
                element.pressed = false;
                offset.style.boxShadow = "0 0 0 2px #b18597, 0 10px 0 2px #ffe3e2";
                querySelection();
            }

        })
    });
}

function deSelectAll() {

    let techs = document.querySelectorAll(".boton");

    for (let index = 1; index < techs.length; index++) {

        let offset = techs[index].nextElementSibling;

        techs[index].style.transform = "translateY(0px)";
        techs[index].style.backgroundColor = "#fff0f0";
        techs[index].pressed = false;

        offset.style.boxShadow = "0 0 0 2px #b18597, 0 10px 0 2px #ffe3e2";

    }

}

function deSelectJustAll() {

    let techs = document.querySelectorAll(".boton");
    techs[0].style.transform = "translateY(0px)";
    techs[0].style.backgroundColor = "#fff0f0";
    techs[0].pressed = false;

    let offset = techs[0].nextElementSibling;
    offset.style.boxShadow = "0 0 0 2px #b18597, 0 10px 0 2px #ffe3e2";

}


