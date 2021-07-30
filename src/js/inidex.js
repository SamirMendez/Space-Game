function initCanvas(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var backgroundImage = new Image();
    var naveImage   = new Image(); // nave
    var enemiespic1  = new Image(); // enemigo 1
    var enemiespic2 = new Image(); // enemigo 2

    // backgroundImage y naveImage
    backgroundImage.src = "src/assets/img/graham-holtshausen-fUnfEz3VLv4-unsplash.jpg"; //Background picture
    naveImage.src       = "src/assets/img/alien-spaceship.jpg"; //Spaceship picture
    // // Enemigos fotos
    enemiespic1.src     = "src/assets/img/BlueBalloon.jpg";
    // enemiespic2.src     = "";
    
    // width and height (canvas)
    var cW = ctx.canvas.width;  
    var cH = ctx.canvas.height;

    
//Spawn de Enemigos
    var stageWidth = 700;
    var stageHeight = 350;
    
    var intervalInMilliseconds = 800;
    
    var enemies = [
    ];
    
    var enemyWidth = 100;
    var enemyHeight = 50;
    
    function spawnEnemy(){
        
        console.log(enemies);
        var randomXPosition = Math.floor(Math.random() * (stageWidth - enemyWidth)) + 1;
        var randomYPosition = (2 * (stageHeight - enemyHeight)) + 1;
        
        var newEnemy = {
            x: randomXPosition,
            y: randomYPosition,
            w: '60',
            h: '80',
            image: enemiespic1
        };
    
        enemies.push(newEnemy);
    }
    
    //This function will run 'spawnEnemy()' every 'intervalInMilliSeconds'.
    setInterval(spawnEnemy, intervalInMilliseconds);






    var renderEnemies = function(enemyList){
        
        for(var i=0; i<enemyList.length; i++) {
            var enemy = enemyList[i];
            ctx.drawImage(enemy.image, enemy.x, enemy.y -= .5, enemy.w, enemy.h);
        }
    }

    function launcher(){
        // bullet location (ubicación de balas)
        this.y = 350, 
        this.x = 700, 
        this.w = 100, 
        this.h = 100,   
        this.direccion, 
        this.bg="red", // bullet color (color de bala)
        this.misiles = [];

        this.render = function() {
            if(this.direccion === "downArrow"){
                this.y+=5;
                if(this.y == 500){
                    naveImage.src = "src/assets/img/Explosion.jpg";
                }
            }else if(this.direccion === "upArrow"){
                this.y-=5;
                if(this.y == 20){
                    naveImage.src = "src/assets/img/Explosion.jpg";
                }
            }
            ctx.fillstyle = this.bg;
            // ctx.drawImage(backgroundImage, 15, 15);
            ctx.drawImage(naveImage, this.x, this.y, 100, 100);
        }
    }

    var launcher = new launcher();

    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }

    var animateInterval = setInterval(animate, 6);
    
    document.addEventListener('keydown', function(event){
        if(event.keyCode == 38) // up arrow
        {
          launcher.direccion = 'upArrow';  
          if(launcher.y < cH*.2-80){
             launcher.y += 0;
             launcher.direccion = '';
           }
        }
   });



   document.addEventListener('keyup', function(event){
        if(event.keyCode == 38) // up arrow
        {
          launcher.y -= 0;
          launcher.direccion = '';
        }
   });

   document.addEventListener('keydown', function(event){
        if(event.keyCode == 40) // down arrow
        {
          launcher.direccion = 'downArrow';  
         if(launcher.y > cH - 110){
           launcher.y -= 0;
           launcher.direccion = '';
          }
        }
   });
   document.addEventListener('keyup', function(event){
        if(event.keyCode == 40) // down arrow
        {
          launcher.y += 0;
          launcher.direccion = '';
        }
   });
}

 

window.addEventListener('load', function(event) {
    initCanvas();
});

let tiempoRef = Date.now()
let cronometrar = true
let acumulado = 0

// function iniciar() {
//     cronometrar = true
// }

// function pausar() {
//     cronometrar = false
// }

// function reiniciar() {
//     acumulado = 0
// }

setInterval(() => {
    let tiempo = document.getElementById("tiempo")
    if (cronometrar) {
        acumulado += Date.now() - tiempoRef
    }
    tiempoRef = Date.now()
    tiempo.innerHTML = formatearMS(acumulado)
}, 1000 / 60);

function formatearMS(tiempo_ms) {
    let MS = tiempo_ms % 1000
    let S = Math.floor(((tiempo_ms - MS) / 1000) % 60)
    let M = Math.floor((S / 60) % 60)
    let H = Math.floor((M / 60))
    Number.prototype.ceros = function (n) {
        return (this + "").padStart(n, 0)
    }
    return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2)
        + "." + MS.ceros(3)
}
