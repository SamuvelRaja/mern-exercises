
import './App.css'
import Autocomplete from './components/Autocomplete'

function App() {
  
  const getRecipes= async (query:string):Promise<[]>=>{
      const res=await fetch(`https://dummyjson.com/recipes/search?q=${query}`)
      if(!res.ok){
        throw new Error('cant fetch respices')
      }
      const recipes=await res.json()
      return recipes
  }

  return (
    <>
      <Autocomplete getRec={getRecipes}/>
    </>
  )
}

export default App
