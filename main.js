document.addEventListener("DOMContentLoaded", function () {
    const profile = document.getElementById("profile");
    const projects = document.querySelectorAll(".project");
    const labels = document.querySelectorAll(".label");

    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');

    const projectsSection = document.getElementById('projects');

    document.getElementById("git").addEventListener('click', function () {
        window.open("https://www.github.com/NottSoSure", '_blank');
    });
    document.getElementById("insta").addEventListener('click', function () {
        window.open("https://www.instagram.com/itisnayan", '_blank');
    });
    document.getElementById("li").addEventListener('click', function () {
        window.open("https://www.linkedin.com/in/nayan23/", '_blank');
    });


    profile.addEventListener("click", function () {
        this.classList.toggle("tilt");
        setTimeout(() => {
            this.classList.toggle("tilt");
        }, 1000);
    });

    function loadMainScript(callback) {
        const script = document.createElement('script');
        script.src = 'main.js';
        script.onload = callback;
        script.onerror = function () {
            console.error('Failed to load main.js');
        };
        document.head.appendChild(script);
    }

    loadMainScript(function () {
        labels.forEach(function (item) {
            item.addEventListener("click", function (event) {
                event.preventDefault();
                const selectedLabel = this.dataset.tag;
                hideAllExcept(selectedLabel);
                changeLabel(this);
            });
        });
    });
    function hideAllExcept(labelToShow) {
        projects.forEach(function (div) {
            if (div.classList.contains(labelToShow)) {
                div.classList.remove("hidden");
            } else {
                div.classList.add("hidden");
            }
        });
    }
    function changeLabel(elem) {
        labels.forEach(function (item) {
            item.style.backgroundColor = "whitesmoke";
            item.querySelector("li").style.color = "rgb(43, 43, 43)";
        });
        elem.style.backgroundColor = "#D53867";
        elem.querySelector("li").style.color = "#f5f5f5";
    }

    document.getElementById("reset").addEventListener("click", function () {
        labels.forEach(function (item) {
            item.style.backgroundColor = "whitesmoke";
            item.querySelector("li").style.color = "rgb(43, 43, 43)";
        });
        projects.forEach(function (div) {
            div.classList.remove("hidden");
        });
        history.replaceState(null, document.title, window.location.pathname);
    });

    let allCount = 0;
    document.getElementById("ft").addEventListener("click", function () {
        allCount++;
        if (allCount === 3) {
            projects.forEach(function (div) {
                if (div.classList.contains("all")) { div.classList.remove("all"); }
            });
        }
    });

    if (tag) {
        labels.forEach(function (label) {
            if (label.dataset.tag === tag) {
                hideAllExcept(tag);
                changeLabel(label);
            }
        });
        projectsSection.scrollIntoView({ behavior: 'smooth' });        
    }

    projects.forEach(function (project) {
        project.addEventListener("click", function () {
            const link = "/projects/" + this.id + ".html";
            window.location.href = link;
        });
    });
    
    AOS.init();

});
