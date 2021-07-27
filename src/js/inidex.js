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
    // enemiespic2.src     = "images/enemigo2.png"; //Enemies picture
    
    // width and height (canvas)
    var cW = ctx.canvas.width;  
    var cH = ctx.canvas.height;

    // template for naves
    var enemyTemplate = function(options){
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemiespic1
        }
    }

    var enemies = [
        new enemyTemplate({id: "enemy1", x: 350, y: 500, w: 60, h: 80}),
        new enemyTemplate({id: "enemy2", x: 450, y: 550, w: 60, h: 80}),
        new enemyTemplate({id: "enemy3", x: 500, y: 500, w: 60, h: 80})
    ];

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
            }else if(this.direccion === "upArrow"){
                this.y-=5;
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
    ctx.font = "30px Arial";
    ctx.fillText("Hello World", 10, 50);
}

 

window.addEventListener('load', function(event) {
    initCanvas();
});
