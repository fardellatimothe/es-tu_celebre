console.log("Script loaded successfully");

const handleClick = () => {
    
}


// const scale = document.getElementById('scale');
// scale.innerHTML = '';

// for (let i = 0; i <= 5; i++) {
//     const item = document.createElement('div');
//     item.className = 'scale-item';
//     item.textContent = i;
    
//     if (i <= score) {
//         item.classList.add('active');
//     }
    
//     scale.appendChild(item);
// }

// result.style.display = 'block';
// result.scrollIntoView({ behavior: 'smooth' });

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('visible').classList.remove('active');
    document.getElementById('hidden').classList.add('active');
});
