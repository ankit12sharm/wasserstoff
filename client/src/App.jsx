import { useState } from "react";
import ComponentEditor from "./component/ComponentEditor";
import ComponentForm from "./component/ComponentForm";


export default function App() {
  const [page, setPage] = useState(false);
  const[toggle,setToggle] =useState(false);
  const [components, setComponents] = useState([]);
  const handleAddComponent = (type, width, height) => {
    const newComponent = {
      type,
      grid: {
        w: width,
        h: height,
      },
      properties: { text: `component ${components.length + 1}` },
    };
    console.log(newComponent)
    fetch('http://localhost:8000/api/elements', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComponent)
      // body: {
      //   ...newComponent
      // }
    }).then(res => res.json()).then(data => {console.log(data)
    setToggle(!toggle)}).catch(e => console.log(e))
    setComponents([...components, newComponent]);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
     { !page&&<ComponentForm onAddComponent={handleAddComponent} />}
      <ComponentEditor
        handleAddComponent={toggle}
        page={page}
        setPage={setPage}
        
      />
    </div>
  );
}
