

function App() {

  return (
    <div>
      <Countwrapper />
      <Btnwrapper/>
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
  let count=0
  return(
      <input type="text" value={count} />
  )
}
function Btn(){
  return(
      <button>
        increment
      </button>
  )
}

export default App