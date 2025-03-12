
register.addEventListener('click', (e) => {
    e.preventDefault()

    location.href = "/views/rolSelector/rolSelectorRegister.html"
})

Login.addEventListener('click', (e)=>{
    e.preventDefault()

    location.href = "/views/rolSelector/rolSelectorLogin.html"
})

const header = document.querySelector('header');

window.addEventListener('scroll', function(){
header.classList.toggle ("sticky", window.scrollY > 0 );
})