import { loginRequest, red } from "./requests.js"
import { toast } from "./toast.js"

function handleToHome(){
  const homeButton = document.querySelector('.home__button')
  homeButton.addEventListener("click", ()=>{
    location.replace('/')
  })
}

function handleToRegister(){
  const registerButton = document.querySelectorAll('.register__button')

  registerButton.forEach((button)=>{
    button.addEventListener("click",()=>{
      location.replace('./register.html')
    })
  })
  
}

function handleToRegister2(){
  const button = document.querySelector('.register__button2')
  button.addEventListener("click",()=>{
    location.replace('./register.html')
  })
}

function handleLogin(){
  const inputs = document.querySelectorAll('.login__input')
  const submitButton = document.querySelector('.submit__login')
  let loginInformation = {}
  let count = 0

  submitButton.addEventListener("click", async(event)=>{
    event.preventDefault()

    inputs.forEach((input)=>{
      if(input.value.trim()==""){
        count++ 
      }
      loginInformation[input.name]= input.value
    })
    if(count!= 0){
      count = 0
      return toast(red, "Preencha todos os campos")
    }else{
      
      const token = await loginRequest(loginInformation)
      return token
    }
  })
}

handleToHome()
handleToRegister()
handleToRegister2()
handleLogin()


