import FieldBuilder from "./Filebuilder"


interface Props {
  responses: ResponseType[]
  setResponses: (r: ResponseType[]) => void
}

export default function ResponseBuilder({ responses, setResponses }: Props) {

  const addResponse = () => {
    setResponses([...responses, { status: "200", fields: [] }])
  }

  const updateResponse = (index: number, updated: ResponseType) => {
    const copy = [...responses]
    copy[index] = updated
    setResponses(copy)
  }

  return (
    <div>
      {responses.map((res, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <input
            value={res.status}
            onChange={(e) =>
              updateResponse(i, { ...res, status: e.target.value })
            }
            placeholder="Status code (200, 400...)"
          />

          <FieldBuilder
            fields={res.fields}
            setFields={(fields) =>
              updateResponse(i, { ...res, fields })
            }
          />
        </div>
      ))}

      <button onClick={addResponse}>+ Add Response</button>
    </div>
  )
}
