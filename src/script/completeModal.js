import { employeesWithCompanies, renderUsers } from "./renderAdminPage.js";
import { depatmentId, dismissEmployee, getEmployeesOutofWork, green, hireEmployee } from "./requests.js";

export async function completModalSelect(){
  const select = document.querySelector('.userSelect')
  const userOutofWork = await getEmployeesOutofWork()

  select.textContent = ""
  const option = document.createElement('option')
  option.innerHTML="Selecionar usuário"
  option.value=""
  select.appendChild(option)

  userOutofWork.forEach(employee => {
    const select = renderselectUserOutofWork(employee)
    
  });
}

async function renderselectUserOutofWork(data){
  const select = document.querySelector('.userSelect')
  const options = document.createElement('option')

  
  options.innerText = data.name
  options.value = data.id
  select.append(options)
  return select
}

export async function renderDepartmentCompleteModal(data){
  
  const modalControler = document.querySelector('.modal__controler--department')
  const divModal = document.querySelector('.divModal')
  const divModalControler = document.querySelector('.div__modalControler')
  const ulUsers = document.querySelector('.users')
  const admissUser = document.querySelector('.admissUser')
  const select = document.querySelector('#userselect')

  modalControler.showModal()
  
  divModal.innerHTML = ""

  const departmentName = document.createElement('h1')
  departmentName.classList = 'departmentsName'
  departmentName.innerText = data.name
  
  const departmentDescription = document.createElement('h3')
  departmentDescription.classList ='description'
  departmentDescription.innerText = data.description

  const companyName = document.createElement('p')
  companyName.classList = 'companiesName'
  companyName.innerText = data.companyName

  divModal.append(departmentName,departmentDescription,companyName)
  
  const userData = await depatmentId(data.id)
  
  ulUsers.innerHTML =""

  if(userData.employees.length >0){
    userData.employees.forEach((employee)=>{

      const liUser = document.createElement('li')
    liUser.classList = 'liUsersModal'

    const userName= document.createElement('h3')
    userName.classList = 'description'
    userName.innerText = employee.name

    const nameCompany = document.createElement('p')
    nameCompany.classList ='companiesName'
    nameCompany.innerText = data.companyName

    const deleteButton = document.createElement('button')
    deleteButton.classList = 'deleteButtonModalComplete'
    deleteButton.innerText = "Desligar"
    deleteButton.dataset.id = employee.id
   
    liUser.append(userName, nameCompany, deleteButton)
    ulUsers.append(liUser)
    divModalControler.append(ulUsers)

    deleteButton.addEventListener('click', async(ev)=>{
  await dismissEmployee(ev.target.dataset.id)
  renderUsers(await employeesWithCompanies())
  modalControler.close() 

})
    })
  }else{
    ulUsers.innerHTML = "Este departamento não possue funcionários"
  }
  
  let idUser = ""
  let updatBody = {
    department_id: data.id
  }
  
 select.addEventListener("change",async()=>{
  idUser = select.value
  
})
admissUser.addEventListener('click', async()=>{
  await hireEmployee(idUser, updatBody)
  renderUsers(await employeesWithCompanies() )
  select.value =""
  
  await completModalSelect()
modalControler.close()
})
  
}

export function closeCompleteModal(){
  const closeButton = document.querySelector('.closeCompleteModal')
  const modalController = document.querySelector('.modal__controler--department')
const select =document.querySelector('#userselect')
  closeButton.addEventListener('click',(e) => {
    e.preventDefault()
    select.value =""
    modalController.close()
  })
}