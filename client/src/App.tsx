import { useState } from "react"
import axios from "axios"

function App() {
  const [path, setPath] = useState("")
  const [method, setMethod] = useState("GET")
  const [requestFields, setRequestFields] = useState<any[]>([])
  const [responseFields, setResponseFields] = useState<any[]>([])
  const [result, setResult] = useState("")

  const addField = (type: "request" | "response") => {
    const field = { name: "", type: "string" }

    if (type === "request") {
      setRequestFields([...requestFields, field])
    } else {
      setResponseFields([...responseFields, field])
    }
  }

  const generateSchema = async () => {
    const res = await axios.post("http://localhost:7000/generate", {
      path,
      method,
      requestFields,
      responseFields
    })

    setResult(JSON.stringify(res.data, null, 2))
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>OpenAPI Generator</h1>

      <input
        placeholder="/users"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />

      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>

      <h3>Request Fields</h3>
      {requestFields.map((field, i) => (
        <div key={i}>
          <input
            placeholder="field name"
            onChange={(e) => {
              const updated = [...requestFields]
              updated[i].name = e.target.value
              setRequestFields(updated)
            }}
          />
          <select
            onChange={(e) => {
              const updated = [...requestFields]
              updated[i].type = e.target.value
              setRequestFields(updated)
            }}
          >
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="boolean">boolean</option>
          </select>
        </div>
      ))}

      <button onClick={() => addField("request")}>
        Add Request Field
      </button>

      <h3>Response Fields</h3>
      {responseFields.map((field, i) => (
        <div key={i}>
          <input
            placeholder="field name"
            onChange={(e) => {
              const updated = [...responseFields]
              updated[i].name = e.target.value
              setResponseFields(updated)
            }}
          />
          <select
            onChange={(e) => {
              const updated = [...responseFields]
              updated[i].type = e.target.value
              setResponseFields(updated)
            }}
          >
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="boolean">boolean</option>
          </select>
        </div>
      ))}

      <button onClick={() => addField("response")}>
        Add Response Field
      </button>

      <br />
      <br />
      <button onClick={generateSchema}>Generate</button>

      <pre>{result}</pre>
    </div>
  )
}

export default App
