console.log("AnI");
const Furry = function() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
};

const Coin = function () {
    this.x = Math.floor(Math.random()*10);
    this.y = Math.floor(Math.random()*10);
};

const Game = function() {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    const self = this;
    this.index = function (x, y) {
            return x + (y * 10);
    };
    this.showFurry = function ()
    {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry')
    };
    this.hideVisibleFurry = function () {
        let actualFurry = document.querySelector('.furry');
        actualFurry.classList.remove('furry');
    };



    this.showCoin = function ()
    {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin')
    };
    this.moveFurry = function () {
        this.hideVisibleFurry();
        this.gameOver();
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        }else if (this.furry.direction === "top") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "bottom") {
            this.furry.y = this.furry.y + 1;
        }

        this.showFurry();
        this.checkCoinCollision();
    };
    this.turnFurry = function (event) {
        switch (event.which){
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 38:
                this.furry.direction = 'top';
                break;
            case 40:
                this.furry.direction = 'bottom';
                break;
        }
        this.moveFurry()
    };
    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            let actualCoin = document.querySelector('.coin');
            actualCoin.classList.remove('coin');
            score ++;
            let strong = document.querySelector('strong');
            strong.innerText++;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    this.gameOver = function () {
        if (this.furry.x<0 || this.furry.x>9 || this.furry.y<0 || this.furry.y>9) {
            console.log("ania1");
            clearInterval(this.idSetInterval);
            console.log("ania2");
            // this.hideVisibleFurry();
            console.log("ania");
            let over = document.getElementById('over');
            over.classList.remove('invisible');
        }
    };



    this.startGame = function() {
        this.idSetInterval = setInterval(function () {
            self.moveFurry()
        }, 250);

    };


    document.addEventListener('keydown', function (event) {
        self.turnFurry(event);
    });




    
};

let game = new Game();
game.showFurry();
game.showCoin();
game.startGame();

