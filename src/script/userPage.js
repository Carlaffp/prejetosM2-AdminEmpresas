import { employeesrequest } from "./requests.js"

function authentication(){
  const token = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) 
  const isAdmin = JSON.parse( localStorage.getItem('@kenzieEmpresas:admin'))

  if(!token){
    location.replace('../../index.html')
  }
  
  if(isAdmin){
    window.location.replace("./adminPage.html")
  }
  
}

function handleLogout(){
  const logoutButton = document.querySelector('.logout__button')

  logoutButton.addEventListener("click",()=>{
    localStorage.clear()
    location.replace('/')
  })
}

async function receptData(){
  const alldata = await employeesrequest()
  render (alldata)
}

function render(data){
  const userName = document.querySelector('.username')
  const userEmail = document.querySelector('.useremail')
  const companyAndDepatment = document.querySelector('.companyName')
  const employeesContainer = document.querySelector('.employees__container')
  const ulEmployees = document.querySelector('.ulEmployees')
  const sectionCompanyName = document.querySelector('.company__container')
  

  if(data.company_id == null){
    userName.innerHTML = data.name
    userEmail.innerHTML = data.email
    ulEmployees.innerHTML = "Você ainda não foi contratado"
    ulEmployees.style.alignItems = "center"
    ulEmployees.style.paddingLeft = "250px"
    ulEmployees.style.fontSize = "50px"
    sectionCompanyName.style.display= "none"
  }else{
    userName.innerHTML = JSON.parse(localStorage.getItem("@kenzieEmpresas:name"))
    userEmail.innerHTML = JSON.parse(localStorage.getItem("@kenzieEmpresas:email"))
    companyAndDepatment.innerHTML= `${data.company.name} - ${data.name}`

    employeesContainer.innerHTML= ""

    const alldata = data.employees
    alldata.forEach((employee) => {
      const listEmployees = creatEmployee(employee)
      ulEmployees.append(listEmployees)
      employeesContainer.append(ulEmployees)
    });
  }
}

function creatEmployee(data){
  const liEmployee = document.createElement('li')
  liEmployee.classList='liEmployee'

  const employeeName = document.createElement('h3')
  employeeName.innerText = data.name
  liEmployee.append(employeeName)

  return liEmployee
}

handleLogout()
receptData()
authentication()
