import { _decorator, Component, Node, instantiate, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObjectPool')
export class ObjectPool extends Component {
    public static instance: ObjectPool;
    private pooledObjects: Node[] = [];
    private amountToPool: number = 10;
    @property({type:Node}) 
    bulletPrefab: Node;
    i:number
    
    start() {
        for(this.i=0;this.i<this.amountToPool;this.i++){
          
            const node = instantiate(this.bulletPrefab);
            node.parent = director.getScene().getChildByName('Canvas');
            node.active=false;
            this.pooledObjects.push(node);
        }
    }

    public GetPooledOjects(){
        for(this.i=0;this.i<this.pooledObjects.length;this.i++){
            if(!this.pooledObjects[this.i].active){
                return this.pooledObjects[this.i];
        }
    }
        return null;
    }

    update(){
     

    }
}

