function homePage() {

    const userName = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
  
    if (userName === 'admin' && pass === 'admin123') {
        window.location.href = "home.html";
    } else {
        alert("Incorrect username or password!");
    }
    
   
}