// start a new set, pick the first colour, add to simonSaid array


var simon = (function (s, Choice) {

    var rc = new Choice(['red', 'green', 'blue', 'yellow']);
    const says = function () {
        console.log('simon is awake and wants to play a game');
        setUpButtons(rc.get());
    };
    var Buttons = []; // array of Button objects
    var buttons = []; // array of dom elements

    var Button = function (obj) {
        var container = document.querySelector('.container');
        this.id = obj.getAttribute('id');

    };

    Button.prototype.handleClick = function (e) {
        console.log('this', this);
        var correct;
        this.numberOfGuesses = this.numberOfGuesses + 1;
        if (this.numberOfGuesses === this.simonSaysArray.length) {
            this.numberOfGuesses = 0;
            console.log('e', e);
            this.guessesArray.push(e);
            if (this.allGuessesAreCorrect()) {
                // provide positive reinforcement (ding),
                // add a new item to the array,
                // and play the whole new sequence
                this.simonSaysArray.push(rc.get());
            }

        }


        // when the number of clicks equals the number of answers,
        // play back the correct results


    };
    Button.prototype.allGuessesAreCorrect = function (e) {


    };
    Button.prototype.addNewItem = function () {

    };
    Button.prototype.simonSaysArray = [rc.get()];
    Button.prototype.numberOfGuesses = 0;
    Button.prototype.guessesArray = [];


    var setUpButtons = function () {
        buttons = document.querySelectorAll('.button');
        buttons.forEach(function (b, i) {
            Buttons[i] = new Button(b);
            buttons[i].addEventListener('click', function (i) {
                Buttons[i].handleClick(i);
            });
        });
    };

    s.says = says;
    s.buttons = buttons;
    s.Buttons = Buttons;
    return s;

})(simon || {}, Rando.Choice);

// init on ready
UTIL.domReady(function () {
    simon.says();
});
