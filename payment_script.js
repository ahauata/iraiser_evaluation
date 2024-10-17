const STYLESHEET_URL =
  "https://cdn.jsdelivr.net/gh/ahauata/iraiser_evaluation/payment_styles.css";

// Replace credit card text by VISA
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

// Update payment method text each time payment method is changed
function updatePaymentModeText() {
  replaceCreditCardText();
  if (typeof Step3 !== "undefined" && Step3.showPaymentModes) {
    const originalShowPaymentModes = Step3.showPaymentModes;
    Step3.showPaymentModes = function (frequency) {
      originalShowPaymentModes.call(Step3, frequency);
      replaceCreditCardText();
    };
  }
}

// Format currency for currency dropdown using Common.price_currencies
function formatCurrency(currency) {
  if (!currency.id) return currency.text;
  return $(`<span class="currency-option">
            <span class="currency-symbol">${
              Common.price_currencies[currency.id] || currency.id
            }</span>
            <span class="currency-code">${currency.id}</span>
          </span>`);
}

// Update currency dropdown
function updateCurrencyDropdown() {
  // Add new styles to page head
  const stylesheet = document.createElement("link");
  stylesheet.href = STYLESHEET_URL;
  stylesheet.rel = "stylesheet";
  document.head.appendChild(stylesheet);

  // Initialize currency dropdown
  $(".currency").select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: "currency-dropdown",
    templateResult: formatCurrency,
    templateSelection: formatCurrency,
    width: "auto",
    dropdownAutoWidth: true,
  });
}

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    const pathname = window.location.pathname;
    if (pathname.includes("visa")) {
      updatePaymentModeText();
    }
    if (pathname.includes("currency")) {
      updateCurrencyDropdown();
    }
  }
};
