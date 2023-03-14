import { _decorator, Component,Node, find, input, Input, Vec3, EventTouch, Sprite, sys, director, Label, Button, Animation, AnimationClip, AnimationComponent, SpriteFrame, AssetManager, AudioSource, AudioClip, math, PageView, Slider, instantiate, QuadRenderData, Canvas, EventKeyboard, KeyCode } from 'cc';
import { ObjectPool } from './ObjectPool';
import { PipeM } from './PipeM';
const { ccclass, property } = _decorator;

@ccclass('Fly01')

export class Fly extends Component {
   @property({type: Label})
   Scorelable: Label=null;
   @property({type:Sprite})
   GameOver:Sprite=null;
   @property({type:Button})
   replayButton:Button=null;
   @property({type:Label})
   Best:Label=null;
   @property({type:AudioClip})
   audioJump:AudioClip=null
   @property({type:AudioClip})
   audioPoint:AudioClip=null
   @property({type:AudioClip})
   audioDie:AudioClip=null
   @property({type:AnimationClip})
   ani1:AnimationClip=null;
   @property({type:Button})
   Choose:Button=null;
   @property({type:SpriteFrame})
   sprite1:SpriteFrame;
   @property({type:SpriteFrame})
   sprite2:SpriteFrame;
   @property({type:AnimationClip})
   ani2:AnimationClip=null;
   @property({type:PageView})
   page:PageView;
   @property({type:Slider})
   slider1:Slider;
   @property({type:Slider})
   slider2:Slider;
   @property({type:Node})
   bg:Node
   @property({type:PageView})
   pageSetting:PageView
   @property({type:Button})
   settingButton:Button
   @property({type:Node})
   Pipe1:Node;
   @property({type:Node})
   Pipe2:Node;
   speed: number;
   score: number = 0;
   scores:number []=[]
   ispass:boolean;
   firerate:number=200;
   nextfire:number;
   countPipe:number=0;

   @property({type:ObjectPool})
      objectPool: ObjectPool

   
   start () {
      this.page.node.active=true
      this.pageSetting.node.active=false;
      this.GameOver.node.active=false;
      let bestscore=localStorage.getItem('scores');
      if(bestscore){
         this.scores=JSON.parse(bestscore);
      }
      director.pause()
      
      this.nextfire=0;
     
      
   }
   onLoad(){
      input.on(Input.EventType.TOUCH_START,this.onTouchStart,this);
      //
      this.ispass=false
   }
   updateScore(){
      this.score += 1;
      this.score+=0;
   }

   update(deltaTime:number){
      this.speed-=0.05;
      let positionY=this.node.position.y;
      positionY +=this.speed;
      let angle = -(this.speed/2)*20;
        if(angle < 20){
            angle = 20;
        }else {
            angle = -20;
        }
        this.node.angle = angle;
        
      this.node.position=new Vec3(this.node.position.x,positionY,0);

  
      
      var sprite=find("Canvas/Bird").getComponent(Sprite) 
      var spritePosition = sprite.node.position.y;
      var spritePositionX=sprite.node.position.x;
        

      var sprite1=this.Pipe1.getComponent(Sprite) 
      var spritePosition1 = sprite1.node.position.y;
      var spritePositionX1= sprite1.node.position.x;
        
      
      // check va chạm với ông thứ nhất
      if(spritePositionX1-this.node.position.x<this.Pipe2.position.x-this.node.position.x&&PipeM.infi==false){
         if (spritePositionX>=(spritePositionX1-71.229 )&& spritePositionX<=(spritePositionX1+71.229) && spritePosition>(spritePosition1+80) || spritePositionX>=(spritePositionX1-71.229 )&& spritePositionX<=(spritePositionX1+71.229)&& spritePosition<(spritePosition1-77.154)) {
            this.scores.push(this.score);
            this.audioDie.play();
            localStorage.setItem('scores',JSON.stringify(this.scores))
            this.Best.string='BestScore: ' +(Math.max(...this.scores))
            director.stopAnimation();
            this.GameOver.node.active=true;
         }else if(/*spritePositionX>(spritePositionX1+51 ) && spritePositionX<(spritePositionX1+52.5 )*/spritePositionX1<=-427.911&&spritePositionX1>=-429.3) {
            this.ispass=true
            this.updateScore();
            this.audioPoint.play();
            this.Scorelable.string='Score:'+this.score
          }
      }
      //check va chạm ống thứ 2
      if(this.Pipe2.position.x-this.node.position.x<spritePositionX1-this.node.position.x && PipeM.infi==false){
         if (spritePositionX>=(this.Pipe2.position.x-71.229 )&& spritePositionX<=(this.Pipe2.position.x+71.229) && spritePosition>(this.Pipe2.position.y+80) || spritePositionX>=(this.Pipe2.position.x-71.229 )&& spritePositionX<=(this.Pipe2.position.x+71.229)&& spritePosition<(this.Pipe2.position.y-77.154)) {
            this.scores.push(this.score);
            this.audioDie.play();
            localStorage.setItem('scores',JSON.stringify(this.scores))
            this.Best.string='BestScore: ' +(Math.max(...this.scores))
            director.stopAnimation();
            this.GameOver.node.active=true;
         }else if(/*spritePositionX>(spritePositionX1+51 ) && spritePositionX<(spritePositionX1+52.5 )*/this.Pipe2.position.x<=-427.911&&this.Pipe2.position.x>=-429.3) {
            this.ispass=true
            this.updateScore();
            this.audioPoint.play();
            this.Scorelable.string='Score:'+this.score
          }
      }
      
       
       input.on(Input.EventType.KEY_PRESSING,this.Shoot,this);
   }
   onTouchStart(event:EventTouch){
      this.speed=2;
      this.audioJump.play() 
   }


   Shoot(event: EventKeyboard){
      switch(event.keyCode){
      case KeyCode.SPACE:
      if(Date.now()>this.nextfire){
         this.nextfire=Date.now()+this.firerate
         if(this.objectPool.GetPooledOjects() != null)
            { 
               let Object =  this.objectPool.GetPooledOjects()
               Object.position = this.node.position
               Object.active=true;
            }
         }  
      }
    }
     

   playSetting(){
      director.resume();
      // this.Choose.node.active=false
      this.pageSetting.node.active=false;
      this.page.node.active=false;
   }

   pauseBt(){
      director.pause();
      this.pageSetting.node.active=true;
   }

   replay(){
      director.loadScene("main")
      
   }
   chooseSkin(){
      const animationComponent = this.node.getComponent(Animation);
      this.node.getComponent(Sprite).spriteFrame = this.sprite1;
      animationComponent.defaultClip=this.ani1;
      animationComponent.play('Bid2');
   
   }

   chooseSkin2(){
      const animationComponent = this.node.getComponent(Animation);
      this.node.getComponent(Sprite).spriteFrame = this.sprite2;
      animationComponent.defaultClip=this.ani2;
      animationComponent.play ('BirdFly');
   
   }
  volumEffect(){
      this.audioDie.getVolume();
      this.audioDie.setVolume(this.slider1.progress);
      this.audioJump.getVolume();
      this.audioJump.setVolume(this.slider1.progress);
      this.audioPoint.getVolume();
      this.audioPoint.setVolume(this.slider1.progress);
   }
   
   volumBG(){
      this.bg.getComponent(AudioSource).volume=this.slider2.progress;
   }
}