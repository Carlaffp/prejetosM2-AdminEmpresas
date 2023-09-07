import { employeesWithCompanies, renderUsers } from "./renderAdminPage.js"
import { green, patchUpdateEmployee, red } from "./requests.js"
import { toast } from "./toast.js"

export function updateUser(data){
  const inputUser = document.querySelectorAll('.inputUser')
  const submitButton = document.querySelector('.saveUpdate')
  const modalControler = document.querySelector('.modal__controler--editEmployee')
  
  let updateBody = {}
  let count = 0

    modalControler.showModal()

    submitButton.addEventListener("click",async(ev)=>{
      ev.preventDefault()
      
      inputUser.forEach((input) => {
        if(input.value.trim()==""){
          count++
        }
        updateBody[input.name]= input.value
        console.log(updateBody)
      })
      
      if(count!==0){
        count=0
        return toast(red, "Favor preencher o campo necessário")
      }else{
        await patchUpdateEmployee(data.id, updateBody)
        const datauser = await employeesWithCompanies()
        await renderUsers(datauser)
        toast(green, "Atualização feita com sucesso")
        modalControler.close()
         inputUser.forEach((input)=>{
            input.value =""
})
}
})
}
export function closeUpdateUserModal(){
  const closeButton = document.querySelector('.closeUpdateUser')
  const modalController = document.querySelector('.modal__controler--editEmployee')

  closeButton.addEventListener('click',(e) => {
    e.preventDefault()
    modalController.close()
  })
}
