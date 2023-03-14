import { _decorator, Component, Node, Label } from 'cc';
import { PipeM } from './PipeM';
const { ccclass, property } = _decorator;

@ccclass('UI')
export class UI extends Component {
   @property({type:Label})
   ScoreLable:Label=null
   

}


