let contentSize = 1.4;
let h1Size = 1.9;

const makeBigger = () => {
   // alert('make bigger!');
   h1Size += 0.2;
   contentSize += 0.2;
   setFont();
};

const makeSmaller = () => {
   // alert('make smaller!');
   h1Size -= 0.2;
   contentSize -= 0.2;
   setFont();
};

const setFont = () => {
   document.querySelector('.content').style.fontSize = `${contentSize}em`;
   document.querySelector('h1').style.fontSize = `${h1Size}em`;
}

document.querySelector('#a1').addEventListener('click', makeBigger);
document.querySelector('#a2').addEventListener('click', makeSmaller);
