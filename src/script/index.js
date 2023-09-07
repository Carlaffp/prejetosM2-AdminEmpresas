import { companiesWithCategories, receptData, renderAllCompanies, selectRender} from "./render index.js";



const handleSelect = (array)=>{
  const selectOptions = document.querySelector('select')

  selectOptions.addEventListener('change',async ()=>{
    if(selectOptions.value === 'all'){
      renderAllCompanies( array)
    }else{
      selectRender( array, selectOptions.value)
    }
  })
}


function handleLogin(){
  const buttonLogin = document.querySelector('.login__button')
  buttonLogin.addEventListener("click", ()=>{
    location.replace('./src/pages/login.html')
  })
}

function handleRegister(){
  const buttonRegister = document.querySelector('.register__button')
  buttonRegister.addEventListener("click", ()=>{
    location.replace('./src/pages/register.html')
  })
}


receptData()
handleSelect( await companiesWithCategories())
handleLogin()
handleRegister()
