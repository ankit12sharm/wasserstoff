import React, { useState, useEffect } from "react";

const ComponentEditor = ({ handleAddComponent,page,setPage }) => {
    
    const [components, setComponents] = useState([]);
    const handleRemoveComponent = async (id) => {
      await  fetch('http://localhost:8000/api/elements/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
           await fetch('http://localhost:8000/api/elements').then(res => res.json()).then(data => {setComponents(data)
            console.log(data)}).catch(e => console.log(e))
        // const updatedComponents = [...components];
        // updatedComponents.splice(index, 1);
        // setComponents(updatedComponents);
    };
      useEffect(()=>{handleGeneratePage()},[handleAddComponent])
    const handleGeneratePage = () => {
        // get
        fetch('http://localhost:8000/api/elements').then(res => res.json()).then(data => {setComponents(data)
    console.log(data)}).catch(e => console.log(e))
        let temp = components.sort((a, b) => {
            let A = a.grid.h;
            let B = b.grid.h;
            return A - B;
        });

        setComponents(temp);
        console.log("Saved temp:", temp.reverse());
        console.log("Saved Components:", components);
        
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "15px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {!page&&<div style={{ display: "flex", gap: 8, marginBottom: "15px" }}>
                {components.map((component, index) => (
                    <div
                        key={index}
                        className="component"
                        style={{
                            padding: "5px",
                            borderRadius: "5px",
                            border: "1px solid #000",
                            boxSizing: "border-box",
                        }}
                    >
                        {/* optional chaining */}
                        {component?.type}  
                        <button
                            style={{
                                marginLeft: "5px",
                                padding: "5px",
                                borderRadius: "3px",
                                border: 0,
                            }}
                            onClick={() => handleRemoveComponent(component?._id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>}
            <button
                style={{
                    width: "200px",
                    fontSize: "16px",
                    borderRadius: "3px",
                    padding: "5px",
                }}
                onClick={()=>{
                    setPage(!page);
                    handleGeneratePage();
                }}
            >
                {page?'Remove':'Generate'} Web Page
            </button>
            {page && (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "5px",
                        backgroundColor: "#345beb",
                        width: "96vw",
                        minHeight: "90vh",
                        padding: "20px",
                    }}
                >
                    {components.map((component, index) => (
                        <div
                            key={index}
                            className="component"
                            style={{
                                width: `${component.grid.w}px`,
                                border: "1px solid #999999",
                                boxSizing: "border-box",
                                height: `${component.grid.h}px`,
                                borderRadius: "15px",
                                backgroundColor: "#eb9e34",
                                fontSize: 10,
                                // textAlign:"center",
                            }}
                        >
                            {component.properties.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComponentEditor;
