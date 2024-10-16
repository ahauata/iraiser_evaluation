function replaceCreditCardText() {
  const cardElements = document.querySelectorAll(
    ".payment_mode-card[data-paymentid='payment_mode-card']"
  );

  cardElements.forEach((element) => {
    const creditCardTextElement = element.querySelector(".payment_mode_title");
    if (creditCardTextElement) {
      creditCardTextElement.textContent = "VISA";
    }
  });
}

function initPaymentScript() {
  replaceCreditCardText();

  if (typeof Step3 !== "undefined" && Step3.showPaymentModes) {
    const originalShowPaymentModes = Step3.showPaymentModes;
    Step3.showPaymentModes = function (frequency) {
      originalShowPaymentModes.call(Step3, frequency);
      replaceCreditCardText();
    };
  }
}

document.addEventListener("DOMContentLoaded", initPaymentScript);
