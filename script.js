const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");
const amortizationTable = document.getElementById("amortizationTable");

const calculateBtn = document.querySelector(".calculate-btn");

let myChart;

const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#8ca7e0", "#053cb2"],
          borderWidth: 0,
        },
      ],
    }, 
    options: {
      responsive: true,
      maintainAspectRatio: false, // This helps control the chart size
      plugins: {
        legend: {
          position: 'bottom',
        }
      },
      animation: {
        duration: 1000, // Duration of the animation in milliseconds
        easing: 'easeInOutQuad', // Type of easing function to use
      }
    },
  });
};

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);

  interest = interestRate / 12 / 100; // Monthly interest rate
};

const calculateEMI = () => {
  if (!loanAmount || !interestRate || !loanTenure || isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTenure)) {
    alert("Please enter valid values for loan amount, interest rate, and tenure.");
    return;
  }

  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));
  return emi;
};

const generateAmortizationSchedule = (emi) => {
  amortizationTable.innerHTML = `
    <tr>
      <th>Month</th>
      <th>EMI</th>
      <th>Interest</th>
      <th>Principal</th>
      <th>Balance</th>
    </tr>
  `;

  let remainingBalance = loanAmount;

  for (let i = 1; i <= loanTenure; i++) {
    let interestPayment = remainingBalance * interest;
    let principalPayment = emi - interestPayment;
    remainingBalance -= principalPayment;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i}</td>
      <td>${emi.toFixed(2)}</td>
      <td>${interestPayment.toFixed(2)}</td>
      <td>${principalPayment.toFixed(2)}</td>
            <td>${remainingBalance > 0 ? remainingBalance.toFixed(2) : 0}</td>
    `;
    amortizationTable.appendChild(row);
  }
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmount = Math.round(loanTenure * emi);
  totalAmountValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  // Generate the amortization schedule
  generateAmortizationSchedule(emi);

  // Update or display the chart
  if (myChart) {
    updateChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable);
  }
};

const init = () => {
  refreshInputValues();
  let emi = calculateEMI();

  // Check if emi calculation is valid before proceeding
  if (emi) {
    updateData(emi);
  }
};

init();
calculateBtn.addEventListener("click", init);

