function convertNumber() {
    const number = document.getElementById("number").value.trim();  // Get the input number as a string
    const fromBase = parseInt(document.getElementById("fromBase").value);  // Get the base of input number
    const toBase = parseInt(document.getElementById("toBase").value);  // Get the base to convert to

    try {
        // Split the number into integer and fractional parts
        let [integerPart, fractionalPart] = number.split('.');

        // Convert the integer part to decimal from the selected base
        let decimalInteger = parseInt(integerPart, fromBase);
        if (isNaN(decimalInteger)) {
            throw new Error("Invalid integer part for the selected base.");
        }

        // Convert the fractional part to decimal from the selected base (if exists)
        let decimalFraction = 0;
        if (fractionalPart) {
            for (let i = 0; i < fractionalPart.length; i++) {
                decimalFraction += parseInt(fractionalPart[i], fromBase) / Math.pow(fromBase, i + 1);
            }
        }

        // Combine the integer and fractional parts to get the full decimal value
        let decimalValue = decimalInteger + decimalFraction;

        // Convert the decimal value to the target base (integer part)
        let convertedIntegerPart = Math.floor(decimalValue).toString(toBase).toUpperCase();

        // Convert the fractional part to the target base (if present)
        let convertedFractionalPart = '';
        if (fractionalPart) {
            let fractional = decimalValue - Math.floor(decimalValue);  // Get only the fractional part
            convertedFractionalPart = '.';
            let precision = 8;  // Limit precision to avoid infinite repeating decimals

            while (fractional !== 0 && precision > 0) {
                fractional *= toBase;
                let fractionalDigit = Math.floor(fractional);
                convertedFractionalPart += fractionalDigit.toString(toBase).toUpperCase();
                fractional -= fractionalDigit;
                precision--;
            }
        }

        // Combine integer and fractional results
        const result = convertedIntegerPart + convertedFractionalPart;

        // Display the result
        document.getElementById("result").innerHTML = `Result: ${result}`;
    } catch (error) {
        document.getElementById("result").innerHTML = `Error: ${error.message}`;
    }
}
