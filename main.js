const calculatorDisplay=document.querySelectorAll('h1')[0]
//console.log(calculatorDisplay);
const inputBtns=document.querySelectorAll('button')
const clearBtn=document.querySelector('.clear')
//console.log(clearBtn,inputBtns);
let firstValue=0
let awaitingNextValue=false
let operatorValue=''
const calculate={
    '/':(firstNumber,secondNumber)=>firstNumber/secondNumber,
    '*':(firstNumber,secondNumber)=>firstNumber*secondNumber,
    '+':(firstNumber,secondNumber)=>firstNumber+secondNumber,
    '-':(firstNumber,secondNumber)=>firstNumber-secondNumber,
    '=':(firstNumber,secondNumber)=>secondNumber
}
    

function sendNumberValue(number){
    if(awaitingNextValue){
        calculatorDisplay.textContent=number
        awaitingNextValue=false
    }else{
        const displayValue=calculatorDisplay.textContent
        calculatorDisplay.textContent=displayValue==='0'?number:displayValue+number
       // console.log(typeof number);
    }
}
function addDecimal(){
    if(awaitingNextValue)return
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`
    }
}
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent)
    if(operator && awaitingNextValue){
        operatorValue=operator
        return
    }
    if(!firstValue){
        firstValue = currentValue
    }else{
        const colculation=calculate[operatorValue](firstValue,currentValue)
        calculatorDisplay.textContent=colculation
        firstValue=colculation
        //console.log(firstValue);
    }
    
    awaitingNextValue=true
    operatorValue=operator

   // console.log(operatorValue);
}


inputBtns.forEach(inputBtn=>{
    if(inputBtn.classList.length===0){
        inputBtn.addEventListener('click',()=>sendNumberValue(inputBtn.value))

    
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',()=>addDecimal())
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',()=>useOperator(inputBtn.value))
    }
})
function resetAll(){
    firstValue=0
    operatorValue=''
    awaitingNextValue=false
    calculatorDisplay.textContent='0'
}
clearBtn.addEventListener('click',resetAll)