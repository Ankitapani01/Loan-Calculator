var loanAmount = document.getElementById("amount");
var interestRate = document.getElementById("interest");
var payMonths = document.getElementById("months");
var loanForm = document.getElementById("submit-form");
var Monthly = document.getElementById("monthly");
var TotalValue = document.getElementById("total");
var TotalInterest = document.getElementById("totalinterest");
var resetButton = document.getElementById("resetbtn");

window.onload=function(){
    document.getElementById("results").style.display="none";
    document.getElementById("gif-loader").style.display = "none";
};

loanForm.addEventListener('submit', displayLoad);
resetButton.addEventListener('click', refreshPage);


function refreshPage(){
    
    location.reload();
}


function displayLoad(e){
 
    document.getElementById("results").style.display="none";
    document.getElementById("gif-loader").style.display = "block";
    setTimeout(calculateLoan,2000);
    e.preventDefault();
}

function calculateLoan(){
 
    // Calculating interest per month
    const interestValue = parseFloat((loanAmount.value * (interestRate.value * 0.01)) / 12);
     
    // Calculating monthly payments
    const monthlyPayment = parseFloat(((loanAmount.value / payMonths.value) + interestValue));
 
    // Calculating total payment
    const totalPayment = parseFloat(monthlyPayment * payMonths.value);
   
    if(loanAmount.value < 0)
    {
        showError('Please Enter Positive Amount ');
    }
    else if(interestRate.value < 0)
    {
        showError('Please Enter Positive Interest Rate');
    }
    else if(payMonths.value  < 0)
    {
        showError('Please Enter Positive Months Value');
    }
    else {
        Monthly.value = monthlyPayment.toFixed(2);
        TotalValue.value = totalPayment.toFixed(2);
        TotalInterest.value = (interestValue * payMonths.value).toFixed(2);
        //show result
        document.getElementById('results').style.display = 'block';
        //hide loader
        document.getElementById('gif-loader').style.display = 'none';
    } 
}

function showError(error){
    //hide result
    document.getElementById('results').style.display = 'none';
    //hide loader
    document.getElementById('gif-loader').style.display = 'none';
    //create a div
    const errorDiv =document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    //get Element
    const card = document.querySelector('.card');
    const form= document.getElementById("submit-form");

    //  Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert Error above heading
    card.insertBefore(errorDiv,form);

    //clear Error after 3second
    setTimeout(clearError,3000);
}

function clearError()
{
    document.querySelector('.alert').remove();
    refreshPage();
}
