
// ctx problem
var run=(function(global){// this is a function expression
    
            var doc=document;  
            var win =window;
            var c = doc.getElementById("mycanvas");
            var ctx = c.getContext("2d");
            ctx=ctx;
            c.width = 510;
            c.height = 606;
            var dist= 500;
            var dura=2000;
            var reqId;
            var add=0;
            var nextmove=0;
            var gameOver=false;
            var collisionvar=false;
            var wins=false;
            c.style="border:1px solid #d3d3d3";
            var lasttime=0;
        
            Resources.load(['.././images/stone-block.png',
             '.././images/water-block.png',
             '.././images/grass-block.png',
             '.././images/enemy-bug.png',
             '.././images/char-cat-girl.png',
             '.././images/explosion.png']);
           
    
            function main(){
                 var now = Date.now(),
                     dt = (now - lasttime) / 1000.0;
                     
                update(dt);
                // collision();
                render();
                lasttime = now;
                // winLose();
                if(gameOver){
                    winLose();
                }
                if(gameOver==false){
                    reqId=win.requestAnimationFrame(main);
                    
                }
            } 
            // a constructor class to make start , score, display text after win or collision
            function Component(width,height,color,x,y){
                this.width=width;
                this.height=height;
                this.x=x;
                this.y=y;
                
                this.update=function(){
                    ctx.font=this.width +" "+this.height;
                    ctx.fillStyle=color;
                    ctx.fillText(this.text,this.x,this.y);
                }
             
            }
            //checks whether the player collided with the enemy or  not
            function collision(){
                for(var i=0;i<allEnemies.length;i++){
                   if( ((allEnemies[i].x+allEnemies[i].width)<=player.x
                       ||allEnemies[i].x>(player.x+player.width)
                       ||(allEnemies[i].y+allEnemies[i].height)<=player.y
                       ||allEnemies[i].y>(player.y+player.height))==false){
                        console.log("collision detected,game over");
                        gameOver=true;
                        stopAnimation();
                        collisionvar=true;
                        
                    }
                }
            }
            // display text if the player won the game or collision is detected.
            function winLose(){
                if(collisionvar){
                    
                     player.collisiondet();
                     var stop= new Component("80px","Fontdiner Swanky, cursive","blue",20,250);
                     stop.text="Game Over";
                     stop.update();
                        
                }
                if(wins){
                     var won= new Component("80px","Fontdiner Swanky, cursive","blue",20,250);
                     won.text="You won!";
                     won.update();
                }
                
            }
            //stops all the animation
            function stopAnimation(){
                win.cancelAnimationFrame(reqId)
            }
            
            function update(dt){
                
                enemyUpdate(dt);
                
            }
            // moves the enemies forward towards the end of the canvas
            function enemyUpdate(dt){
                collision();
                // updateScore();
                dt=Math.min(dt,1);
                for(var i=0;i<allEnemies.length;i++){
                    if(allEnemies[i].x <= 550){
                        // console.log(allEnemies[i].update)
                        allEnemies[i].update(dt);
                        
                    }else{
                        
                        allEnemies[i].x=Math.floor(Math.random() * (allEnemies[i].max_x - allEnemies[i].min_x + 1)) + allEnemies[i].min_x; //13
                        
                        allEnemies[i].y=Math.floor(Math.random() * (allEnemies[i].max_y - 90 + 1)) + 90; //100,50
                        allEnemies[i].update(dt)
                       
                    }
                }
            };
            //when the player moves up score is updated
            function updateScore(){
                var move=player.y
                
                if(move<nextmove){
                   
                    add=add+500;
                }
                nextmove=move;
                
            }
            //renders the background and entities pattern
            function render(){
                var rowImages = [
                '.././images/water-block.png',   // Top row is water
                '.././images/stone-block.png',   // Row 1 of 4 of stone
                '.././images/stone-block.png',   // Row 2 of 4 of stone 
                '.././images/stone-block.png',   // Row 3 of 4 of stone
                '.././images/stone-block.png',   // Row 3 of 4 of stone
                '.././images/grass-block.png',   // Row 1 of 2 of grass
                '.././images/grass-block.png'    // Row 2 of 2 of grass
            ];
            
            Object.values(rowImages).forEach(function(value,j){
                  
               Object.values(rowImages).forEach(function(url,i){
                            
                            // console.log(i);
                            var img2= Resources.get_img(url);
                            // console.log(img2);
                            ctx.drawImage(img2,j*102,i*80);
                        
                             });
                             
                });
                renderAccessories();
                renderEntities();
            }
            // adds start button and scores
            function renderAccessories(){
                
                var start= new Component("30px"," Fontdiner Swanky, cursive","black",20,40);
                start.text="Start"
                start.update();
                // start.restart();
                var score= new Component("30px"," Fontdiner Swanky, cursive","black",300,40)
                score.text="score:"+ add;
                score.update();
                return start
            
            }
            // renders the player and enemies on the screen
            function renderEntities(){
               for(var i=0;i<allEnemies.length;i++){
                    allEnemies[i].render();
                }
              playerBoundAndWin();
              
            }
            // playerBoundAndWin function makes the player stays on the board
            function playerBoundAndWin(){
                updateScore();
                if((player.x>0&&player.x+player.width<=c.width&&player.y>=0)){
                    player.render()
                    
                }
                if(player.x<=0)
                {
                    player.x=0;
                    player.render();
                    
                }
                if(player.y<=(c.height-500)&&player.y>=100){
                        console.log("this is"+player.y)
                        gameOver=true;
                        wins=true;
                        stopAnimation();
                        player.y=100;
                        player.render();
                      
                }
                if(player.x>=c.width-player.width){
                    player.x=c.width-player.width;
                    player.render();
                    
                }
                if(player.y>=c.height-player.height){
                    player.y=c.height-player.height;
                    player.render()
                }
                
            }
            // When the start button is clicked the values are reset. and main function called
        
            c.addEventListener("click",function(event){
                var newStart= renderAccessories();
                
                
                var y=newStart.y-40;    
                var x=newStart.x; 
                var width= 80;
                var height=80; 
                
                var mouseX=event.pageX-c.offsetLeft;
                
                var mouseY=event.pageY-c.offsetTop;
                
                 if(mouseY>y&&mouseY<height+y&&mouseX>x&&mouseX<x+width){
                    
                    player.x=initPlayer.x
                    player.y=initPlayer.y
                    add=0;
                    gameOver=false;
                    wins=false;
                    collisionvar=false;
                    main();
                    console.log("clicked")
                  }
            })
            
            global.ctx=ctx;
            
            reqId=win.requestAnimationFrame(main);
         
}(this))