import { useState } from "react"

interface autoProps {
  getRec:(query:string)=>Promise<[]>
}

const Autocomplete= ({getRec}:autoProps) => {
    const[input, setinput]=useState<string>("")
    const[loading, setLoading]=useState<boolean|null>(null)
    const[error, setError]=useState<boolean|null>(null)
    const[suggestion, setsuggestion]=useState([])

    const handleInput=(val:string)=>{
      setinput(val)
    }
  return (
    <div>
        <input type="text" value={input} onChange={(e)=>{handleInput(e.target.value)}} />
        <ul>
          {
            loading&&<>loading..</>
          }
        </ul>
    </div>
  )
}

export default Autocomplete
