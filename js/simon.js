


var simon = (function (s, Choice, domU) {

    var rc = new Choice(['red', 'green', 'blue', 'yellow']);
    var Buttons = []; // array of Button objects
    var buttons = []; // array of dom elements
    var beeps = [];

    const buttonControllerProto =  {
        simonSaysArray: [rc.get()],
        numberOfGuesses: 0,
        guessesArray: [],
        allGuessesAreCorrect: function (e) {
            // todo: add try catch here
            if (this.simonSaysArray.length !== this.guessesArray.length) {
                return false;
            }
            let guessIndex = this.guessesArray.length - 1;
            for (let i = 0, l = this.simonSaysArray.length; i < l; i++) {
                if ( this.simonSaysArray[guessIndex] !== this.guessesArray[guessIndex]) {
                    return false
                }
            }
            return true;
        },
        lastGuessWasCorrect: function(){
            let guessIndex = this.guessesArray.length - 1;
            return this.guessesArray[guessIndex] === this.simonSaysArray[guessIndex];
        },
        addNewItem: function () {
            this.simonSaysArray.push(rc.get());
            console.log('new value of simonSaysArray:', this.simonSaysArray)
        },
        addGuess: function(guess) {
            this.guessesArray.push(guess);
        },
        clearGuesses: function() {
            this.guessesArray = [];
        },

    };


    const bc = Object.create(buttonControllerProto);


    const Button = function (obj) {
        this.id = obj.getAttribute('id');
    };

    Button.prototype.playErrorTone = function (frequency = 440) {
        const audioError = document.getElementById('audio-error');
        audioError.play();
    };


    Button.prototype.handleClick = function (e) {
        bc.addGuess(this.id);
        if (bc.lastGuessWasCorrect()) {
            console.log('last guess was correct');
            this.beep.play();
        } else {
            console.log('you made a bad guess, start again');
            this.playErrorTone();
            bc.clearGuesses();
            bc.simonSaysArray = [];
            bc.addNewItem();
        }

        if (bc.allGuessesAreCorrect()) {
            console.log('all guesses correct!!!');
            bc.clearGuesses();
            bc.addNewItem();
            start();
        }
    };


    var setUpButtons = function () {
        buttons = document.querySelectorAll('.button');


        console.log('beeps;', beeps)
        buttons.forEach(function (b, i) {
            let newButton = new Button(b);
            Buttons[i] = newButton;
            Buttons[i].beep = beeps[i];
            buttons[i].addEventListener('click', function (e) {
                newButton.handleClick(e);
            });
        });
    };

    var setUpBeeps = function() {
        beeps = document.querySelectorAll('.beeps');
    };


    var loop = function (i) {
        let current = bc.simonSaysArray[i];
        let previous = bc.simonSaysArray[i - 1 || 0];
        let thisButton = document.querySelectorAll(`.${current}`);
        let prevButton = document.querySelectorAll(`.${previous}`);
        domU.removeClass(prevButton, 'active');
        domU.addClass(thisButton, 'active');
        setTimeout(function () {
            if (++i < bc.simonSaysArray.length) loop(i);
        }, 1000);

    };

    var start = function () {
        let i = 0;
        console.log(bc.simonSaysArray);
        loop(i);
        setTimeout(function () {
            console.log('>>>>', bc.simonSaysArray);
            domU.removeClass(document.querySelectorAll(`.${bc.simonSaysArray[bc.simonSaysArray.length - 1]}`), 'active');
        }, 1000 * bc.simonSaysArray.length + 1);

    };

    const says = function () {
        console.log('simon is awake and wants to play a game');
        setUpBeeps();
        setUpButtons();
        start();
    };

    s.says = says;

    // making the below public for debugging / testing
    // todo: wrap in env var
    s.buttons = buttons;
    s.Buttons = Buttons;
    s.buttonController = bc;
    s.beeps = beeps;
    return s;

})(simon || {}, Rando.Choice, UTIL.dom);

// init on ready
UTIL.domReady(function () {
    simon.says();
});
