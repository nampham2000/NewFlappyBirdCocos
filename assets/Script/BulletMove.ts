import { _decorator, Component, Node, Vec3, Sprite, director, randomRange } from 'cc';
import { ObjectPool } from './ObjectPool';
const { ccclass, property } = _decorator;

@ccclass('BulletMove')
export class BulletMove extends Component {
    @property({type:Node})
    fly01:Node;
    @property({type:Sprite})
    monster:Sprite
    start() {
    
    }

    update(deltaTime: number) {
        let positionX=this.node.position.x;
        positionX +=5;  
        this.node.position=new Vec3(positionX,this.node.position.y)
        if(positionX>445){
            this.node.active=false;
        }
        if(this.node.position.x>=this.monster.node.position.x-38.053&&this.node.position.x<=this.monster.node.position.x+38.053&&this.node.position.y<=this.monster.node.position.y+33.825&&this.node.position.y>=this.monster.node.position.y-33.825){
            
            this.monster.node.setPosition(randomRange(589.711,728.066),randomRange(142.687,-114.961),0);
   
        }
    
}

}
