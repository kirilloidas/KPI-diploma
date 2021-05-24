import {APBlock} from './Blocks';
import {PIDBlock} from './Blocks';

export default class ControlSystem {
    constructor(dt) {
        this.obj = new APBlock(20,dt);
        this.pid = new PIDBlock(2,0.1,0,dt);
        this.zd = 0;
        this.dt = dt;
        this.y = 0;
        this.u = 0;
        this.x = 0;
        this.time = 0;
        this.isManual = false;
    }
    transfer() {
        if(this.isManual === false){
            this.u = this.pid.transfer(this.zd - this.y);
            this.y = this.obj.transfer(this.x + this.u);
            this.time += this.dt;
            console.log(this.y, '!manualllllllllll')
            return this.y;
        } else if(this.isManual === true) {
            this.y = this.obj.transfer(this.x);
            this.time += this.dt;
            console.log(this.y, 'manual')
            return this.y;
        }
        
    }
}