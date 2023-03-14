import { _decorator, Component, Node, Vec3, randomRange, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MonsterMove')
export class MonsterMove extends Component {
    @property({type:Sprite})
    bullet:Sprite;
    start() {

    }

    update(deltaTime: number) {
        let positionX=this.node.position.x;
        positionX -=1.5;  
        this.node.position=new Vec3(positionX,this.node.position.y);
        if (this.node.getPosition().x < -571.385) { // Nếu Sprite thoát khỏi màn hình bên trái
            this.node.setPosition(randomRange(589.711,728.066),randomRange(142.687,-114.961),0);
        }

        if(this.bullet.node.position.x==this.node.position.x&&this.bullet.node.position.y==this.node.position.y){
            this.node.setPosition(randomRange(589.711,728.066),randomRange(142.687,-114.961),0);
        }

    }
}


