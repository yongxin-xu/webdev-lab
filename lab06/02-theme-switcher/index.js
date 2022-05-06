/*
    Hints: 
    1. Attach click event handlers to all four of the 
       buttons (#default, #ocean, #desert, and #high-contrast).
    2. Modify the className property of the body tag 
       based on the button that was clicked.
*/
const themeDefault = ev => {
   document.querySelector('body').className = '';
};

const themeOcean = ev => {
   document.querySelector('body').className = 'ocean';
};

const themeDesert = ev => {
   document.querySelector('body').className = 'desert';
};

const themeHighContrast = ev => {
   document.querySelector('body').className = 'high-contrast';
};

document.querySelector('#default').addEventListener('click', themeDefault);
document.querySelector('#ocean').addEventListener('click', themeOcean);
document.querySelector('#desert').addEventListener('click', themeDesert);
document.querySelector('#high-contrast').addEventListener('click', themeHighContrast);
