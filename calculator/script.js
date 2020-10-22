$(document).ready(function() {
    let input = $('#calc-inp');
    let inputValue = input.val();
    let clear = $('#clear').val();
    let equals = $('#equals').val();
    let error = false;
    $('button').click(function(event) {
        let buttonInp = this.value;
        if (error) {
            inputValue = "";
            error = !error;
        }
        if (buttonInp === clear) {
            inputValue = "";
        } else if (buttonInp === equals) {
            try {
                let fun = new Function(`return ${inputValue}`);
                inputValue = fun();
            } catch (err) {
                inputValue = "Enter a valid input";
                error = true;
            }
        } else {
            inputValue += buttonInp;
        }
        input.val(inputValue);
    });
});