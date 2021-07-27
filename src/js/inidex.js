function initCanvas(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var backgroundImage = new Image();
    var naveImage   = new Image(); // nave
    var enemiespic1  = new Image(); // enemigo 1
    var enemiespic2 = new Image(); // enemigo 2

    // backgroundImage y naveImage
    backgroundImage.src = "src/assets/img/nasa--hI5dX2ObAs-unsplash.jpg"; //Background picture
    // naveImage.src       = "images/spaceship-pic.png"; //Spaceship picture
    // // Enemigos fotos
    enemiespic1.src     = "src/assets/img/BlueBalloon.jpg";
    // enemiespic2.src     = "images/enemigo2.png"; //Enemies picture
    
    // width and height (canvas)
    var cW = ctx.canvas.width; // 700px 
    var cH = ctx.canvas.height;// 600px

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
        new enemyTemplate({id: "enemy1", x: 350, y: 500, w: 60, h: 80})
    ];

    var renderEnemies = function(enemyList){
        
        for(var i=0; i<enemyList.length; i++) {
            var enemy = enemyList[i];
            ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.w, enemy.h);
        }
    }

    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        renderEnemies(enemies);
    }

    var animateInterval = setInterval(animate, 6)
}

 

window.addEventListener('load', function(event) {
    initCanvas();
});
