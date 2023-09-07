
import { closeCompleteModal, completModalSelect } from "./completeModal.js"
import { creatSelectModal, handleCreatNewDepartment,closeCreatModal } from "./creatModal-admin.js"
import { closeDeleteModal } from "./deleteDepartment.js"
import { closeDeleteUserModal } from "./deleteUser.js"
import { creatSelect,  departmentsWithCompanies,  employeesWithCompanies,  renderDepartments, renderUsers,selectRender } from "./renderAdminPage.js"
import { closeUpdateModal } from "./updateDepartment.js"
import { closeUpdateUserModal } from "./updateUser.js"

function authentication(){
  const token = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) 
  const isAdmin = JSON.parse(localStorage.getItem('@kenzieEmpresas:admin'))
   
  if(!token){
    location.replace('../../index.html')
  }

  if(!isAdmin){
    location.replace('./userPage.html')
  }
}

function handleLogout(){
  const logoutButton = document.querySelector('.logout__button')

  logoutButton.addEventListener("click",()=>{
    localStorage.clear()
    location.replace('/')
  })
}

const handleSelect = (array)=>{
  const selectOptions = document.querySelector('.selectCompany')
  
  selectOptions.addEventListener('change',async ()=>{
    if(selectOptions.value === 'all'){
      renderDepartments( array)
      
    }else{
      selectRender( array, selectOptions.value)
    }
  })
}





handleLogout()
creatSelect()
handleSelect( await departmentsWithCompanies())
renderDepartments(await departmentsWithCompanies())
renderUsers(await employeesWithCompanies())
creatSelectModal()
closeUpdateModal()
handleCreatNewDepartment()
closeCreatModal()
closeDeleteModal()
closeUpdateUserModal()
closeDeleteUserModal()
completModalSelect()
closeCompleteModal()
authentication()




