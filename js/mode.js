let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#mode-button');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
    document.getElementById("mode-button").src = "icon/moon.svg";
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
    document.getElementById("mode-button").src = "icon/sun.svg";
}

if (darkMode === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode'); 

    if (darkMode !== 'enabled') {
        enableDarkMode();  
    } else {  
        disableDarkMode(); 
    }
});