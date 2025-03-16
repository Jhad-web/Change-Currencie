document.addEventListener("DOMContentLoaded", async function () {
    const currencySelects = document.querySelectorAll("select");
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

    // قائمة رموز العملات
    const currencySymbols = {
        "USD": "💵", "EUR": "💶", "GBP": "💷", "JPY": "💴", "CNY": "¥",
        "SAR": "﷼", "AED": "د.إ", "EGP": "£", "TRY": "₺", "INR": "₹",
        "BTC": "₿", "ETH": "Ξ", "RUB": "₽", "CHF": "₣"
    };

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            currencySelects.forEach(select => {
                let option = document.createElement("option");
                option.value = currency;
                option.textContent = `${currencySymbols[currency] || ''} ${currency}`;
                select.appendChild(option);
            });
        });

        document.getElementById("fromCurrency").value = "USD";
        document.getElementById("toCurrency").value = "EUR";
    } catch (error) {
        console.error("حدث خطأ أثناء تحميل العملات:", error);
    }
});

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    const currencySymbols = {
        "USD": "💵", "EUR": "💶", "GBP": "💷", "JPY": "💴", "CNY": "¥",
        "SAR": "﷼", "AED": "د.إ", "EGP": "£", "TRY": "₺", "INR": "₹",
        "BTC": "₿", "ETH": "Ξ", "RUB": "₽", "CHF": "₣"
    };

    if (amount === "" || amount <= 0) {
        alert("الرجاء إدخال مبلغ صالح");
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const exchangeRate = data.rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        document.getElementById("result").textContent = 
            `${currencySymbols[fromCurrency] || ''} ${amount} ${fromCurrency} = 
            ${currencySymbols[toCurrency] || ''} ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("خطأ في جلب بيانات التحويل:", error);
    }
}