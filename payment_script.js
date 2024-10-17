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
  const dropdownStyles = `
    #step-1 .ira-form-item:has(select.currency) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0 !important;
      label {
        margin-left: 0;
        padding-left: 0;
      }

      .select2-selection__rendered {
        padding: 0 8px;
        height: auto !important;
      }

      .select2-selection {
        padding-left: 0 !important;
        margin-top: 0 !important;
        border: none !important;
        display: flex !important;
        align-items: center !important;
        outline: none !important;
        box-shadow: none !important;
        height: auto !important;
      }

      .select2-selection__arrow {
        height: auto !important;
        width: auto !important;

        b {
          top: 0 !important;
          left: 0 !important;
          margin-left: 0 !important;
          margin-top: 0 !important;

          &::before {
            content: '' !important;
            background-image: none !important;
            border-left: 5px solid transparent !important;
            border-right: 5px solid transparent !important;
            border-top: 5px solid black !important;
            display: inline-block !important;
            height: auto !important;
            width: auto !important;
            transform: translateY(-50%) !important;
          }
        }
      }

      .select2-container--open .select2-selection__arrow b::before {
        transform: translateY(-50%) rotate(180deg) !important;
      }
    }

    /* ---------- Currency dropdown styles ---------- */

    .currency-dropdown {
      border-radius: 6px !important;
      border: none !important;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
      padding: 5px 0px !important;
    }

    .currency-dropdown.select2-dropdown--below::after {
        content: '';
        position: absolute;
        top: -9px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
        filter: drop-shadow(0px -3px 2px rgba(0, 0, 0, 0.3));
    }

    .currency-dropdown.select2-dropdown--above::after {
        content: '';
        position: absolute;
        bottom: -9px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #fff;
        filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.3));
    }

    .currency-dropdown .select2-results .select2-results__options .select2-results__option {
      text-align: center;
      padding: 4px 24px !important;
      min-height: 0 !important;
    }

    .currency-option {
      font-weight: 600;
      color: #000;
      white-space: nowrap;
    }

    .currency-option .currency-symbol {
      margin-right: 8px !important;
    }
  `;

  // Add new styles to page head
  const styleElement = document.createElement("style");
  styleElement.textContent = dropdownStyles;
  document.head.appendChild(styleElement);

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
