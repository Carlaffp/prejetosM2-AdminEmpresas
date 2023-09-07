import { getAllCompanies, getDepartmentAll, getEmployeesAll} from "./requests.js"
import { updateDepartment } from "./updateDepartment.js";
import { deleteDepartments } from "./deleteDepartment.js";
import { updateUser } from "./updateUser.js";
import { deleteUsers } from "./deleteUser.js";
import {renderDepartmentCompleteModal } from "./completeModal.js";

export async function creatSelect(array){
  const divSelect = document.querySelector('.divSelect')
  array = await getAllCompanies()

  array.forEach((element) => {
   const allselect = renderSelect(element) 
   divSelect.append(allselect)   
  });
  
}

function renderSelect(data){
  const select =document.querySelector('.selectCompany')
  const options = document.createElement('option')

  options.value = data.name
  options.id= data.id
  options.innerText = data.name
  select.append(options)
  return select

}

export async function departmentsWithCompanies(){
  const allDepartments = await getDepartmentAll()
  const allCompanies= await getAllCompanies()

  const allDepartmentsWithCompanies = allDepartments.map(deparment =>{
    const company = allCompanies.find(comp => comp.id === deparment.company_id)
    return {...deparment, companyName: company? company.name: ''}
  })
  
  return allDepartmentsWithCompanies
}


export async function renderDepartments(data){
  const departmentsSection = document.querySelector('.department__controler')
  const ulDepartment = document.createElement('ul')
  ulDepartment.classList = "uldepartment"
  
  departmentsSection.innerHTML = ""

  data.forEach((department)=>{
    const listDepartment = creatDepartment(department)
    ulDepartment.append(listDepartment)
    departmentsSection.append(ulDepartment)
  })
    }

function creatDepartment(data){

  const listDepartments = document.createElement('li')
  listDepartments.classList = 'liDepartments'

  const divData = document.createElement('div')
  divData.classList = 'divData'

  const departmentName = document.createElement('p')
  departmentName.innerText = data.name
  departmentName.classList = 'departmentName'

  const departmentDescription = document.createElement('p')
  departmentDescription.innerText = data.description 

  const companyName = document.createElement('p')
  companyName.innerText = data.companyName

  divData.append(departmentName, departmentDescription,companyName)

  const divIcons = document.createElement('div')
  divIcons.classList = 'divIcons'

  const seeDepartment = document.createElement('img')
  seeDepartment.src = '../img/icon olho.svg'
  seeDepartment.classList= 'seeIcon'

  const writeDepartment = document.createElement('img')
  writeDepartment.src = '../img/icon lapis.svg'
  writeDepartment.classList= 'writeIcon'
  writeDepartment.dataset.departmentId = data.id

  const deleteDepartment = document.createElement('img')
  deleteDepartment.src = '../img/icon lixeira.svg'
  deleteDepartment.classList= 'deleteIcon'
  deleteDepartment.dataset.departmentId = data.id

  divIcons.append(seeDepartment,writeDepartment,deleteDepartment)

  listDepartments.append(divData,divIcons)
  
  writeDepartment.addEventListener("click",()=>{
    updateDepartment(data)
  })

  deleteDepartment.addEventListener("click", ()=>{
    deleteDepartments(data)
  })

  seeDepartment.addEventListener("click", ()=>{
    renderDepartmentCompleteModal(data)
  })
  return listDepartments
}



export async function employeesWithCompanies(){
  const allEmployees = await getEmployeesAll()
  const allCompanies= await getAllCompanies()

  const allEmployeesWithCompanies = allEmployees.map(employee =>{
    const company = allCompanies.find(comp => comp.id === employee.company_id)
    return {...employee, companyName: company? company.name: ''}
  })
  return allEmployeesWithCompanies
}

export async function renderUsers(allData){
  const divUsers = document.querySelector('.usersList')
  const ulUsers = document.querySelector('.ulUsers')

  ulUsers.innerHTML = ""

  allData.forEach((employee)=>{
    const listEmployee = creatUser(employee)
    ulUsers.append(listEmployee)
    divUsers.append(ulUsers)
  })
    }


function creatUser(data){
  const listUsers = document.createElement('li')
  listUsers.classList = 'liusers'

  const divData = document.createElement('div')
  divData.classList = 'divData'

  const userName = document.createElement('p')
  userName.innerText = data.name
  userName.classList = 'userName'

  const companyName = document.createElement('p')
  companyName.innerText = data.companyName
  companyName.classList= 'companyName'

  divData.append(userName,companyName)

  const divIcons = document.createElement('div')
  divIcons.classList = 'divIconsUsers'

  const writeUser = document.createElement('img')
  writeUser.src = '../img/icon lapis.svg'
  writeUser.classList= 'writeUserIcon'
  writeUser.dataset.userId = data.id

  const deleteUser = document.createElement('img')
  deleteUser.src = '../img/icon lixeira.svg'
  deleteUser.classList= 'deleteUserIcon'
  deleteUser.dataset.userId = data.id

  divIcons.append(writeUser,deleteUser)

  listUsers.append(divData,divIcons)

  writeUser.addEventListener("click",()=>{
    updateUser(data)
  })

  deleteUser.addEventListener("click",()=>{
    deleteUsers(data)
  })

  return listUsers

}

export async function selectRender(data, option){
  const departmentSection = document.querySelector('.department__controler')
  const filteredCompanies= await data.filter((company)=>{
    if(company.companyName.toLowerCase() === option.toLowerCase()){
      return company
    } 
  })
    if(filteredCompanies.length==0){
      const tagP = document.createElement('p')
      tagP.classList = 'tagP'
      tagP.innerText = `Empresa ${option} não possui departamentos`
      departmentSection.innerHTML =""
      departmentSection.append(tagP)   
    }else{
      departmentSection.style.paddingLeft = "0px"
      renderDepartments(filteredCompanies)
    }
}