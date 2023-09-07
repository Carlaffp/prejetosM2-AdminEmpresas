import { getAllCategories, getAllCompanies } from "./requests.js"


export async function companiesWithCategories(){
  const allCompanies = await getAllCompanies()
  const allCategories = await getAllCategories()

  const AllCompaniesWithCategories = allCompanies.map(company =>{
    const category = allCategories.find(cat => cat.id === company.category_id)
    return {...company, categoryName: category? category.name: ''}
  })

return AllCompaniesWithCategories
}

 export async function receptData( ){
  const allData = await companiesWithCategories()
  renderAllCompanies(allData)
 }

 export function renderAllCompanies(data){
  
  const ulList = document.createElement('ul')
  ulList.classList="ulList"
  
  const divList = document.querySelector('.divList')
  

  divList.innerHTML = ''

  data.forEach((company) => {
    const listCompany = creatCompany(company)
    ulList.append(listCompany)
    divList.append(ulList)
   
    
  });
}

function creatCompany(data){
  const liCompany = document.createElement('li')
  liCompany.classList = 'liCompany'

  const companyName = document.createElement('h3')
  companyName.innerText = data.name
  companyName.classList = 'companyName'

  const companyCategory = document.createElement('p')
  companyCategory.innerText = data.categoryName
  companyCategory.classList = 'categoryName'

  liCompany.append(companyName, companyCategory)

  return liCompany
}


export async function selectRender(data, option){
  const filteredCompanies= await data.filter((company)=>{
    if(company.categoryName.toLowerCase() === option.toLowerCase()){
      return company
    }
  })

  renderAllCompanies(filteredCompanies)
}