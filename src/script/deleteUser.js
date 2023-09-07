import { employeesWithCompanies, renderUsers } from "./renderAdminPage.js"
import { deleteEmployee, getEmployeesAll } from "./requests.js"

export async function deleteUsers(data){
  const modalControler = document.querySelector('.modal__controler--deleteUser')
  const submitButton = document.querySelector('.deleteUserButton')
  const divControler= document.querySelector('.divControlerDeleteUser')
  
  const information = document.querySelector('.h2information')
  information.innerText = `Realmente deseja remover o usuário ${data.name} ?`
  divControler.append(information)

  modalControler.showModal()

  submitButton.addEventListener("click", async()=>{
    await deleteEmployee(data.id)
    await getEmployeesAll()
    renderUsers(await employeesWithCompanies())

    modalControler.close()
  })
}
export function closeDeleteUserModal(){
  const closeButton = document.querySelector('.closeUserDelete')
  const modalController = document.querySelector('.modal__controler--deleteUser')

  closeButton.addEventListener('click',() => {
   
    modalController.close()
  })
}

