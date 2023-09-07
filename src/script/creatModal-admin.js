import { renderDepartments,departmentsWithCompanies } from "./renderAdminPage.js";
import { getAllCompanies,creatNewDepartmentRequest, red, green } from "./requests.js"
import { toast } from "./toast.js";

export async function creatSelectModal(){
  const divModalContainer =document.querySelector('.modal__container')
  const company = await getAllCompanies() 
  company.forEach(element => {
    const selectCompany = renderSelectModal(element)
      divModalContainer.append( selectCompany)  
  });

}
function renderSelectModal(data){
  const select =document.querySelector('.selectCompanyModal')
  const options = document.createElement('option')

  options.innerText = data.name
  options.value= data.id
  select.append(options)
  return select

}

 export function handleCreatNewDepartment(){
  const creatButton = document.querySelector('.creat__button')
  const modalControler = document.querySelector('.modal__controler--newDepartment')
  const inputs = document.querySelectorAll('.inputNewDepartment')
  const submitButton = document.querySelector('.creat__button--modal')
  const select = document.querySelector('.selectCompanyModal')

  let creatInformation = {
    name: "",
    description: "",
    company_id: ""
  }
  let count = 0

  creatButton.addEventListener("click", ()=>{
    modalControler.showModal()
    
    select.addEventListener("change",()=>{
      creatInformation.company_id= select.value 
    })
    
    submitButton.addEventListener("click", async(event)=>{
      event.preventDefault()
     
    inputs.forEach((input)=>{
      if(input.value.trim()==""){
        count++
      }
      creatInformation[input.name]= input.value
      
    })
    if(count!= 0){
      count = 0
      return toast(red,"Preencha todos os campos")
    }else{
        await creatNewDepartmentRequest(creatInformation)
        const dataDepartment = await departmentsWithCompanies() 
       await renderDepartments(dataDepartment)
       toast(green, "Departamento criado com sucesso")
       modalControler.close()
       inputs.forEach((input)=>{
        input.value= ""
       })
    }
  })
  })
}
export function closeCreatModal(){
  const closeButton = document.querySelector('.closeModal')
  const modalController = document.querySelector('.modal__controler--newDepartment')

  closeButton.addEventListener('click',(e) => {
    e.preventDefault()
    modalController.close()
  })
}





