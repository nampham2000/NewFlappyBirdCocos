import { _decorator, Component, Node, Vec3, input, Input, Prefab, NodePool, instantiate, sys, Vec2, randomRange, Label, EventKeyboard, KeyCode, v2, Tween, tween, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovePipe')

export class PipeM extends Component {
    
    speedPipe: number = 2;
    time:number=2
    limit:number;
    moverate:number=2000;
    limitDash:number;
    static infi:boolean=false;
    start() {
        this.limitDash=0;
        this.limit =0;
    }
//Controltime
    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_DOWN:
                if(Date.now()>this.limit){
                    this.limit=Date.now()+this.moverate;
                    this.speedPipe -= 1;
                }
                this.scheduleOnce(function() {
                this.speedPipe +=1;
                }, 2);

        }
    }
//Dash
    onKeyTo (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_RIGHT:
            if(Date.now()>this.limitDash)
            {   
                PipeM.infi=true
                this.limitDash=Date.now()+this.moverate
                
                tween(this.node)
                .to(0.05, {position: new Vec3(this.node.position.x-300,this.node.position.y, this.node.position.z)})
                .call(() => {  })
                .start()
            }
            this.scheduleOnce(function() {
                PipeM.infi=false              
            }, 0.06);

        }
    }

    

    update(deltaTime: number) {
        let positionX=this.node.position.x;
        positionX -=this.speedPipe;  
        this.node.position=new Vec3(positionX,this.node.position.y)
        if (this.node.getPosition().x < -571.385) { // Nếu Sprite thoát khỏi màn hình bên trái
           this.node.setPosition(randomRange(589.711,728.066),randomRange(142.687,-114.961),0);
          }
          
        
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyTo, this);
        
    }
}