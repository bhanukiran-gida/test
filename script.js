document.addEventListener("DOMContentLoaded", () => {
    const billInput = document.getElementById("bill");
    const peopleInput = document.getElementById("people");
    const tipButtons = document.querySelectorAll(".tip-btn");
    const customTipInput = document.getElementById("custom-tip-input");
    const customTipButton = document.getElementById("custom-tip");
    const tipAmountDisplay = document.getElementById("tip-amount");
    const totalAmountDisplay = document.getElementById("total-amount");
    const resetButton = document.getElementById("reset");
    const peopleError = document.getElementById("people-error");

    let tipPercentage = 0;

    tipButtons.forEach(button => {
        button.addEventListener("click", () => {
            tipButtons.forEach(btn => btn.classList.remove("active"));
            if (button === customTipButton) {
                customTipButton.style.display = "none";
                customTipInput.style.display = "block";
                customTipInput.focus();
                customTipInput.addEventListener("input", () => {
                    tipPercentage = parseFloat(customTipInput.value) || 0;
                    calculateTip();
                });
            } else {
                customTipButton.style.display = "block";
                customTipInput.style.display = "none";
                button.classList.add("active");
                tipPercentage = parseFloat(button.getAttribute("data-tip"));
                calculateTip();
            }
        });
    });

    billInput.addEventListener("input", calculateTip);
    peopleInput.addEventListener("input", () => {
        if (parseInt(peopleInput.value) <= 0) {
            peopleError.style.display = "block";
            peopleInput.classList.add("error");
        } else {
            peopleError.style.display = "none";
            peopleInput.classList.remove("error");
            calculateTip();
        }
    });
    resetButton.addEventListener("click", resetCalculator);

    function calculateTip() {
        const bill = parseFloat(billInput.value);
        const people = parseInt(peopleInput.value);

        if (isNaN(bill) || isNaN(people) || people <= 0) {
            tipAmountDisplay.textContent = "$0.00";
            totalAmountDisplay.textContent = "$0.00";
            return;
        }

        const tipAmount = (bill * (tipPercentage / 100)) / people;
        const totalAmount = (bill + tipAmount) / people;

        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }

    function resetCalculator() {
        billInput.value = "";
        peopleInput.value = "1";
        tipButtons.forEach(btn => btn.classList.remove("active"));
        customTipInput.style.display = "none";
        customTipInput.value = "";
        tipPercentage = 0;
        calculateTip();
        peopleError.style.display = "none";
        peopleInput.classList.remove("error");
    }
});
