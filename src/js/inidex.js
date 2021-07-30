function initCanvas(){
    var contador = 0;
    reduceScore();
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var backgroundImage = new Image();
    var naveImage   = new Image(); // nave
    var enemiespic1  = new Image(); // enemigo 1
    var enemiespic2 = new Image(); // enemigo 2
    var misile = new Image(); // misisle
    var punto = document.getElementById('score');
    // backgroundImage y naveImage
    backgroundImage.src = "src/assets/img/graham-holtshausen-fUnfEz3VLv4-unsplash.jpg"; //Background picture
    naveImage.src       = "src/assets/img/alien-spaceship.jpg"; //Spaceship picture
    // // Enemigos fotos
    enemiespic1.src     = "src/assets/img/BlueBalloon.jpg";
    enemiespic2.src     = "src/assets/img/globo-rojo.jpg";
    misile.src          = "src/assets/img/misile.jpg";
    // width and height (canvas)
    var cW = ctx.canvas.width;  
    var cH = ctx.canvas.height;

    function addPuntation(tipo)
    {
    contador = contador + tipo;
    const counter = document.getElementById('score');
    counter.innerHTML = contador;
    console.log(contador);
    }
    
    // Reduccion de puntuacion
    function reduceScore() {
        setInterval(() => {
            contador = contador - 5;
            const counter = document.getElementById('score');
            counter.innerHTML = contador;
        }, 10000);
    }
    //Spawn de Enemigos
    var stageWidth = 700;
    var stageHeight = 350;
    var intervalInMilliseconds = 1500;
    var enemies = [
    ];  
    var enemyWidth = 100;
    var enemyHeight = 50;
    function spawnEnemy(){
        
        // console.log(enemies);
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
        
        // console.log(enemies2);
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





// aqui se renderizan los enemigos para que puedan aparecer
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
        this.bg="red", // bullet color (color de bala)
        this.misiles = [];

        this.gameStatus = {
            over: false,
            message: "",
            fillstyle: 'red',
            font: 'italic bold 36px Arial, sans-serif',
        }

        this.render = function() 
        {
            if(this.direccion === "downArrow"){
                this.y+=5;
                if(this.y == 500){
                    naveImage.src = "src/assets/img/Explosion.jpg";

            if (naveImage.src = "src/assets/img/Explosion.jpg")
            {
                                    this.gameStatus.over = true;
                                    this.gameStatus.message = 'La nave se ha estrellado';
                                    if(this.gameStatus.over === true)
                                    {
                                        clearInterval(animateInterval);
                                        ctx.fillstyle = this.gameStatus.fillstyle;
                                        ctx.font = this.gameStatus.font;
                    
                                      alert(this.gameStatus.message)
                                    }
                                }
                }
            }else if(this.direccion === "upArrow"){
                this.y-=5;
                if(this.y == 20){
                    naveImage.src = "src/assets/img/Explosion.jpg";

            if (naveImage.src = "src/assets/img/Explosion.jpg")
            {
                                    this.gameStatus.over = true;
                                    this.gameStatus.message = 'La nave se ha estrellado';
                                    if(this.gameStatus.over === true)
                                    {
                                        clearInterval(animateInterval);
                                        ctx.fillstyle = this.gameStatus.fillstyle;
                                        ctx.font = this.gameStatus.font;
                    
                                      alert(this.gameStatus.message)
                                    }
                                }
                
                }
            }
            ctx.fillstyle = this.bg;
            ctx.drawImage(naveImage, this.x, this.y, 100, 100);
            
            //aqui es que se crea el misil cuando se presiona espcio
            for(var i=0; i < this.misiles.length; i++){
                var misileObject = this.misiles[i];
                // misileObject.x -= .5;
                ctx.drawImage(misile, misileObject.exploded?misileObject.x: misileObject.x -= 5, misileObject.y , 100, 50);
             //  console.log(enemies, "Enemies")

             //Aqui se conoce cuando el misil choca con un globo azul
                for (var k=0; k < enemies.length; k++)
                {
                    if(misileObject.x >= enemies[k].x &&misileObject.x <= (enemies[k].x + 60) && misileObject.y >= enemies[k].y &&misileObject.y <= (enemies[k].y + 80))
                    {

                             misileObject.exploded = true; 
                             addPuntation(10);
                             ctx.drawImage(enemies[k].image, 0,0,0,0)
                             enemies.splice(k,1);
                             this.misiles.splice(i, 1);
                             
                    }
                }

                // var count  = 0;
               // Aqui se conoce cuando el misil choca con un globo rojo
                for (var r=0; r < enemies2.length; r++)
                {
                    if(misileObject.x >= enemies2[r].x &&misileObject.x <= (enemies2[r].x + 60) && misileObject.y >= enemies2[r].y &&misileObject.y <= (enemies2[r].y + 80))
                    {
                        // var misileExplosion = new Image(); //
                        // misileExplosion.src =  "src/assets/img/Explosion.jpg";

                             misileObject.exploded = true; 
                             addPuntation(1);
                             ctx.drawImage(enemies2[r].image, 0,0,0,0)
                             enemies2.splice(r,1);
                             this.misiles.splice(i, 1);
                            //  count += 1;
                            //  document.getElementById
                            //  var counter =parseInt(document.getElementById("score").value);
                            //  counter += 1; 
                            //  console.log(counter);
                    }
                }
            }
        }
    }

    var launcher = new launcher();

    //aqui se da la animacion
    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies, enemies2);
    }

    var animateInterval = setInterval(animate, 6);
    

    //Se escuchan las teclas del teclado que se precionan para las diferentes acciones
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


   document.body.onkeyup = function(e){
    if (e.key === ' ')
    {
        launcher.misiles.push({
            x: launcher.x + launcher.h*.5, 
            y: launcher.y,
            w: 10,
            h: 3});
            console.log(launcher.misiles.length, "longitud de misiles");
    }
}

}

 //Cronometro

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

function formatearMS(tiempo_ms) 
{
    let MS = tiempo_ms % 1000
    let S = Math.floor(((tiempo_ms - MS) / 1000) % 60)
    let m = Math.floor((S / 60) % 60)
    let H = Math.floor((m / 60))
    Number.prototype.ceros = function (n)
    {
        return (this + "").padStart(n, 0)
    }
    return H.ceros(2) + ":" + m.ceros(2) + ":" + S.ceros(2)
        + "." + MS.ceros(3)

}
