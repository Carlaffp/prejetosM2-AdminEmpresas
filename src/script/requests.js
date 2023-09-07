
import { toast } from "./toast.js"
const baseUrl = 'http://localhost:3333'

const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token")) || ""
const requestHeader= {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
}

export const red = '#FF5630'
export const green = '#36B37E'

 export async function getAllCompanies(){
  const allCompanies = await fetch(`${baseUrl}/companies/readAll`, {
    method: "GET"
  })
  .then((response)=>{
    if(response.ok){
      return response.json()
    }else{
      return false
    }
  }).catch(error =>console.error(error))
  return allCompanies
}

export async function getAllCategories(){
  const allCategories = await fetch(`${baseUrl}/categories/readAll`, {
    method: "GET"
  })
  .then((response)=>{
    if(response.ok){
      return response.json()
    }else{
      return false
    }
  }).catch(error =>console.error(error))
  return allCategories
}

export async function loginRequest(loginInformation){
  
  const token = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(loginInformation)
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      const {authToken, isAdm} = responseJson
      
      localStorage.setItem("@kenzieEmpresas:token", JSON.stringify(authToken))
      localStorage.setItem("@kenzieEmpresas:admin",JSON.stringify(isAdm))
      
      if(isAdm===true){
        toast(green, 'Login realizado com sucesso')
        setTimeout(()=>{
          location.replace("./adminPage.html")
        }, 1500)
       
      }else{
        toast(green, 'Login realizado com sucesso')
        setTimeout(()=>{
          location.replace("./userPage.html")
        }, 1500)
        
      }
    }else{
      const responseJson = await response.json()
      toast (red, responseJson.message)
    }
  }).catch(error =>console.error(error))
  return token
}

export async function registerRequest(registerInformation){
  const token = await fetch(`${baseUrl}/employees/create`, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(registerInformation)
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()

      toast(green, 'Cadastro realizado com sucesso')

      setTimeout(()=>{
        location.replace('./login.html')
      }, 1500)
      
      return responseJson
    }else{
      const responseJson = await response.json()
      toast (red, responseJson.message)
    }
  }).catch(error =>console.error(error))
  return token
}

export async function employeesrequest(){
  const employee = await fetch(`${baseUrl}/employees/profile`, {
    method: "GET",
    headers:requestHeader
  })
  .then( async(response)=>{
    if(response.ok){
      
      const responseJson = await response.json()
      const {department_id, name, email} = responseJson
      
      if(department_id != null){
        
        localStorage.setItem("@kenzieEmpresas:name", JSON.stringify(name))
        localStorage.setItem("@kenzieEmpresas:email", JSON.stringify(email))
       const department = await depatmentId(department_id)
       return department
      } else{
        return responseJson
      }
    }
  }).catch(error =>console.error(error))
return employee
}

export async function depatmentId(id){
  const department = await fetch(`${baseUrl}/departments/readById/${id}`, {
    method: "GET",
    headers: requestHeader
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      return responseJson
    }
    
  }).catch(error =>console.error(error))
  return department
}

export async function getDepartmentAll(){
  const allDepartment = await fetch(`${baseUrl}/departments/readAll`, {
    method: "GET",
    headers: requestHeader
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      return responseJson
    }
  }).catch(error => console.error(error))
  return allDepartment
}

export async function getEmployeesAll(){
  const allEmployees = await fetch(`${baseUrl}/employees/readAll`, {
    method: "GET",
    headers: requestHeader
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      return responseJson
    }
  }).catch(error => console.error(error))
  return allEmployees
}

export async function creatNewDepartmentRequest(creatInformation){
  const token = await fetch(`${baseUrl}/departments/create`, {
    method: "POST",
    headers: requestHeader,
    body: JSON.stringify(creatInformation)
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()

      toast(green, 'Departamento criado com sucesso')
      
      return responseJson
    }else{
      const responseJson = await response.json()
      toast (red, responseJson.message)
    }
  }).catch(error =>console.error(error))
  return token
}

export async function patchUpdatDepartment(id, newDescription){
  const updatDepartment = await fetch(`${baseUrl}/departments/update/${id}`, {
    method: "PATCH",
    headers: requestHeader,
    body: JSON.stringify(newDescription)
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      toast(green, responseJson.message)
      
      return responseJson
    }else{
      const responseJson = await response.json()
      toast (red, responseJson.message)
  }
}).catch(error =>console.error(error))
  return updatDepartment
}

export async function deleteDepartmentId(id){
  const deleteDepartment = await fetch(`${baseUrl}/departments/delete/${id}`, {
    method: "DELETE",
    headers: requestHeader
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      toast(green, responseJson.message)
      
      return responseJson
    }else{
      const responseJson = await response.json()
      toast (red, responseJson.message)
  }
  }).catch(error =>console.error(error))
  return deleteDepartment
}

export async function patchUpdateEmployee(id, updateBody){
  const updateEmployee = await fetch(`${baseUrl}/employees/updateEmployee/${id}`, {
    method: "PATCH",
    headers:requestHeader,
    body: JSON.stringify(updateBody)
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      toast(green, "Atualização feita com sucesso")
      
      return responseJson
    }else{
      
      toast (red, "Preencha todos os dados corretamente")
  }
  }).catch(error =>console.error(error))
  return updateEmployee
}

export async function deleteEmployee(id){
  const deleteEmployee = await fetch(`${baseUrl}/employees/deleteEmployee/${id}`, {
    method: "DELETE",
    headers: requestHeader
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      toast(green, responseJson.message)
      return responseJson
    }else{ 
      toast(red, responseJson.message)

    }
  })
  return deleteEmployee
}

export async function getCompaniesById(id){
  const compnaiesById = await fetch(`${baseUrl}/companies/readById/${id}`, {
    method: "GET",
    headers:requestHeader
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      return responseJson
    }
  }).catch(error=> console.error(error))
  return compnaiesById
}

export async function getEmployeesOutofWork(){
  const users = await fetch(`${baseUrl}/employees/outOfWork`,{
    method: "GET",
    headers: requestHeader
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      return responseJson
    }
  }).catch(error=> console.error(error))
  return users
}
export async function hireEmployee(id, updateBody){
  const users = await fetch(`${baseUrl}/employees/hireEmployee/${id}`,{
    method: "PATCH",
    headers: requestHeader,
    body: JSON.stringify(updateBody)
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      toast(green, responseJson.message)
      return responseJson
    }
  }).catch(error=> console.error(error))
  return users
}

export async function dismissEmployee(id){
  const users = await fetch(`${baseUrl}/employees/dismissEmployee/${id}`,{
    method: "PATCH",
    headers: requestHeader,
  })
  .then(async(response)=>{
    if(response.ok){
      const responseJson = await response.json()
      toast(green, responseJson.message)
      return responseJson
    }
  }).catch(error=> console.error(error))
  return users
}