import { renderDepartments, departmentsWithCompanies } from "./renderAdminPage.js"
import { deleteDepartmentId, getDepartmentAll } from "./requests.js"

export async function deleteDepartments(data){
  const divDelete = document.querySelector('.divDeleteModal')
  const modalControler= document.querySelector('.modal__controler--deleteDepartment')
  const submitButton =  document.querySelector('.removeDepartment')

  const information = document.querySelector(".h2")
  information.innerText = `Realmente deseja remover o departamneto ${data.name} e demitir seus funcionários?`
  divDelete.append(information)
  modalControler.append(divDelete)

  modalControler.showModal()

    submitButton.addEventListener("click",async()=>{
        await deleteDepartmentId(data.id)
        await getDepartmentAll()
        renderDepartments(await departmentsWithCompanies())

        modalControler.close() 
      })
}
export function closeDeleteModal(){
  const closeButton = document.querySelector('.closeDeleteButton')
  const modalController = document.querySelector('.modal__controler--deleteDepartment')

  closeButton.addEventListener('click',() => {
   
    modalController.close()
  })
}