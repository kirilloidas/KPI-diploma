class GainBlock {
    constructor(k) {
        this.k = k;
    }
    calc(x) {
        return this.k * x;
    }
}

class DiffBlock {
    constructor(k, dt) {
        this.k = k;
        this.dt = dt;
        this.prev = 0;
    }
    transfer(x, prev) {
        return this.k * (x - this.prev) / this.dt;
    }
}

class IntegralBlock {
    constructor(Ti, dt) {
        this.i1 = 0;
        this.x1 = 0;
        this.Ti = Ti;
        this.dt = dt;
    }
    transfer(x) {
        this.i1 = this.i1 + this.Ti * this.dt * (x + this.x1) / 2; 
        this.x1 = x;   
        return this.i1;
    }
}

export class APBlock {
    constructor(K, T, dt) {
        this.T = T;
        this.K = K;
        this.dt = dt;
        this.yi_1 = 0;
    }
    transfer(x) {
        this.yi_1 =  (x * this.K * this.dt + this.T * this.yi_1) / (this.T + this.dt);
        return this.yi_1;
    }
}

export class PIDBlock {
    constructor(K,Ti,Td, dt) {
        this.K = K;
        this.Ti = Ti;
        this.Td = Td;
        this.dt = dt;
        this.u = 0;
        this.integral = new IntegralBlock(Ti, dt);
        this.diff  = new DiffBlock(Td, dt);
    }
    transfer(x) {
        // console.log(x)
        this.u =  this.K*(x+this.integral.transfer(x)+this.diff.transfer(x));
        if(this.u != NaN)  return this.u;
        return 0;
        
    }

}