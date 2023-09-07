import { renderDepartments,departmentsWithCompanies } from "./renderAdminPage.js"
import { green, patchUpdatDepartment, red } from "./requests.js"
import { toast } from "./toast.js"

export function updateDepartment(data){
  const input = document.querySelector('#descriptionUpdate')
  const submitButton = document.querySelector('.save_-button')
  const modalControler = document.querySelector('.modal__controler--editDepartment')
  
  let updateBody = {}
  let count = 0

    modalControler.showModal()

    submitButton.addEventListener("click", async(ev)=>{
      ev.preventDefault()

      if(input.value.trim()===""){
        count++
      }
      updateBody[input.name]=input.value
      
      if(count!==0){
        count=0
        return toast(red, "Favor preencher o campo necessário")
      }else{
        console.log(ev.target)
        await patchUpdatDepartment(data.id, updateBody)
        toast(green, "Atualização feita com sucesso")
        modalControler.close()

        input.value = ""
      }
      renderDepartments(await departmentsWithCompanies())
    })
}
export function closeUpdateModal(){
  const closeButton = document.querySelector('.closeUpdateModal')
  const modalController = document.querySelector('.modal__controler--editDepartment')

  closeButton.addEventListener('click',(e) => {
    e.preventDefault()
    modalController.close()
  })
}
