import { useState } from "react"


const Autocomplete = ({getRec}:(query:string)=>any) => {
    const[input, setinput]=useState(null)
    const[loading, setLoading]=useState(null)
    const[error, setError]=useState(null)
    const[suggestion, setsuggestion]=useState([])

    const handleInput=(e)=>{
      setinput()
    }
  return (
    <div>
        <input type="text"  onChange={} />
        <ul>
          
        </ul>
    </div>
  )
}

export default Autocomplete
