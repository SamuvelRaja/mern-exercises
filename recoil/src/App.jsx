import { countAtom } from "./store/atoms/count";
import { useRecoilValue, useRecoilState, RecoilRoot } from "recoil";

function App() {

  return (
    <div>
      <RecoilRoot>
          <Countwrapper />
          <Btnwrapper/>
      </RecoilRoot>
    </div>
  )
}



function Countwrapper(){
  return(
    <div>
      <Count/>
    </div>
  );
}

function Btnwrapper(){
  return(
    <div>
      <Btn/>
    </div>
  );
}

function Count(){
  let count=useRecoilValue(countAtom)
  return(
      <input type="text" value={count} />
  )
}
function Btn(){
  const[count, setCount]=useRecoilState(countAtom)
  return(
      <button onClick={()=>{
        setCount(count+1)
      }}>
        increment
      </button>
  )
}

export default App