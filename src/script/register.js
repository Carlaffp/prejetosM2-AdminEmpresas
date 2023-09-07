import { registerRequest,red } from "./requests.js"
import { toast} from "./toast.js"


function handleToHome(){
  const homeButton = document.querySelector('.home__button')
  homeButton.addEventListener("click", ()=>{
    location.replace('/')
  })
}

function handleToLogin(){
  const returnButton = document.querySelectorAll('.return__button')

  returnButton.forEach((button)=>{
    button.addEventListener('click', ()=>{
      location.replace('./login.html')
    })
  }) 
}

function handleToLogin2(){
  const returnButton = document.querySelectorAll('.return__button2')

  returnButton.forEach((button)=>{
    button.addEventListener('click', ()=>{
      location.replace('./login.html')
    })
  }) 
}

function handleRegister(){
  const inputs = document.querySelectorAll('.register__input')
  const submitButton = document.querySelector('.submit__button')
  let registerInformation = {}
  let count = 0

  submitButton.addEventListener("click", async(event)=>{
    event.preventDefault()

    inputs.forEach((input)=>{
      if(input.value.trim()==""){
        count++
      }
      registerInformation[input.name]= input.value

    })
    if(count!= 0){
      count = 0
      return toast(red, "Preencha todos os campos")
    }else{
       const token = await registerRequest(registerInformation)
      return token
    }
  })
}

handleToHome()
handleToLogin()
handleRegister()
handleToLogin2()