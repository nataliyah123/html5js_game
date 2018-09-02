// ctx is creating problem because it is defined in newengine which runs after newapp.js
var Enemy=function(x,y,min_x){
    this.x=x;
    this.y=y;
    this.max_x=x;
    this.min_x=min_x;
    this.max_y=y;
    this.width=89;
    this.height=61;
    this.sprite='.././images/enemy-bug.png';
    this.img=Resources.get_img('.././images/enemy-bug.png');
    
    
}
Enemy.prototype.update=function(dt){
    this.x=this.x+(this.x*dt);
    // this.y=this.y+(this.y*dt) // doing diagnol 
    // var left=Resources.get_img(this.sprite).clientLeft;
    
    // console.log( left)
}

Enemy.prototype.render=function(){
    ctx.drawImage(Resources.get_img(this.sprite), this.x, this.y);
    // var data= ctx.getImageData(this.x,this.y,101,171);
    // console.log(data)
    // begin
        // ctx.beginPath();
        // ctx.lineWidth="6";
        // ctx.strokeStyle="red";
        // ctx.rect(this.x,this.y,this.width,this.height);
        // ctx.stroke();
    // end
}

var enemy1= new Enemy(15,200,1);
var enemy2= new Enemy(50,320,50);
var enemy3 =new Enemy(10,240,30)

var allEnemies=[enemy1,enemy2,enemy3];
var initallEnemies=[enemy1,enemy2,enemy3];


var Player=function(x,y){
    this.sprite='.././images/char-cat-girl.png';
    this.x=x;
    this.y=y;
    this.width=74;
    this.height=76;
    this.sprite2='.././images/explosion.png';
    
}

Player.prototype.render=function(){
    ctx.drawImage(Resources.get_img(this.sprite),this.x,this.y );
    // begin
        // ctx.beginPath();
        // ctx.lineWidth="6";
        // ctx.strokeStyle="red";
        // ctx.rect(this.x,this.y,this.width,this.height);
        // ctx.stroke();
    // end
    // console.log(this.x,this.y)
    
}
Player.prototype.collisiondet=function(){
    ctx.drawImage(Resources.get_img(this.sprite2),this.x-50,this.y)
}

Player.prototype.handleInput=function(keys){
    if(keys=="up"){
        this.y=this.y-10
    }
    if(keys=="down"){
        this.y=this.y+10
    }
    if(keys=="right"){
        this.x=this.x+10
    }
    if(keys=="left"){
        this.x=this.x-10
    }
    // console.log(this.x,this.y)
}
// var keyp;
// Player.prototype.update=function(dt){
    
//     if(keyp=="up"){
//     this.y=this.y-(this.y*dt);
//     };
//     if(keyp=="down"){
//     this.y=this.y+(this.y*dt);
//     };
//     if(keyp=="right"){
//     this.x=this.x+(this.x*dt);
//     };
//     if(keyp=="left"){
//     this.x=this.x-(this.x*dt);
//     }
    
    
// }
var player=new Player(100 ,500);
var initPlayer=new Player(100 ,500)

window.document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // console.log("the key pressed is:",)
    player.handleInput(allowedKeys[e.keyCode]);
    keyp=allowedKeys[e.keyCode]
});

