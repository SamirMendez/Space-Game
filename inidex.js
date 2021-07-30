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
    enemiespic2.src     = "src/assets/img/globo-rojo.jpg";
    
    // width and height (canvas)
    var cW = ctx.canvas.width;  
    var cH = ctx.canvas.height;

    
//Spawn de Enemigos
    var stageWidth = 700;
    var stageHeight = 350;
    var intervalInMilliseconds = 1500;
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

    //Spawn de enemigos Rojos
    //Spawn de Enemigos
    var stageWidth2 = 700;
    var stageHeight2 = 350;
    var intervalInMilliseconds2 = 800;
    var enemies2 = [
    ];  
    var enemyWidth2 = 100;
    var enemyHeight2 = 50;
    function spawnEnemy2(){
        
        console.log(enemies2);
        var randomXPosition2 = Math.floor(Math.random() * (stageWidth2 - enemyWidth2)) + 1;
        var randomYPosition2 = (2 * (stageHeight2 - enemyHeight2)) + 1;
        
        var newEnemy2 = {
            x: randomXPosition2,
            y: randomYPosition2,
            w: '60',
            h: '80',
            image: enemiespic2
        };
    
        enemies2.push(newEnemy2);
    }
    
    //This function will run 'spawnEnemy()' every 'intervalInMilliSeconds'.
    setInterval(spawnEnemy2, intervalInMilliseconds2);






    var renderEnemies = function(enemyList, enemyList2) {
        
        for(var i=0; i<enemyList.length; i++) {
            var enemy = enemyList[i];
            var enemy2 = enemyList2[i];
            ctx.drawImage(enemy.image, enemy.x, enemy.y -= .7, enemy.w, enemy.h);
            ctx.drawImage(enemy2.image, enemy2.x, enemy2.y -= .3, enemy2.w, enemy2.h);
        }
    }

    function launcher(){
        // bullet location (ubicación de balas)
        this.y = 350, 
        this.x = 700, 
        this.w = 100, 
        this.h = 100,   
        this.direccion, 
        this.bg="white", // bullet color (color de bala)
        this.misiles = [];

        this.gameStatus = {
            over: false,
            message: "",
            fillstyle: 'red',
            font: 'italic bold 36px Arial, sans-serif',
        }

        this.render = function() {
            if(this.direccion === "downArrow"){
                this.y+=5;
                if(this.y == 500){
                    naveImage.src = "src/assets/img/Explosion.jpg";
                    if (naveImage.src = "src/assets/img/Explosion.jpg"){//Explosion al chocar abajo
                        this.gameStatus.over = true;
                        this.gameStatus.message = 'La nave se ha estrellado';
                        if(this.gameStatus.over === true){
                            clearInterval(animateInterval);
                            ctx.fillstyle = this.gameStatus.fillstyle;
                            ctx.font = this.gameStatus.font;
        
                          //  ctx.fillText(this.gameStatus.message, cW * .5 -80 , 50);
                          alert(this.gameStatus.message);
    
                        }

                    }
                   
                }
            }else if(this.direccion === "upArrow"){
                this.y-=5;
                if(this.y == 20){
                    naveImage.src = "src/assets/img/Explosion.jpg";//Explosion al chocar arriba
                    if (naveImage.src = "src/assets/img/Explosion.jpg"){//Explosion al chocar arriba
                        this.gameStatus.over = true;
                        this.gameStatus.message = 'La nave se ha estrellado';
                        if(this.gameStatus.over === true){
                            clearInterval(animateInterval);
                            ctx.fillstyle = this.gameStatus.fillstyle;
                            ctx.font = this.gameStatus.font;
        
                          //  ctx.fillText(this.gameStatus.message, cW * .5 -80 , 50);
                          alert(this.gameStatus.message);
    
                        }

                    }
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
        renderEnemies(enemies, enemies2);
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
