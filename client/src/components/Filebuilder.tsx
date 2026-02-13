import type { Field } from "../type"

interface Props {
  fields: Field[]
  setFields: (fields: Field[]) => void
}

export default function FieldBuilder({ fields, setFields }: Props) {

    const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}


  const updateField = (index: number, updated: Field) => {
    const copy = [...fields]
    copy[index] = updated
    setFields(copy)
  }

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const addField = () => {
    setFields([
      ...fields,
      { name: "", type: "string", required: false }
    ])
  }

  return (
    <div className="space-y-4 border-l-2 border-gray-700 pl-4">

      {fields.map((field, i) => (
        <div
          key={i}
          className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-sm space-y-3"
        >

          {/* Top Row */}
          <div className="flex flex-wrap gap-3 items-center">

            <input
              className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Field name"
              value={field.name}
              onChange={(e) =>
                updateField(i, { ...field, name: e.target.value })
              }
            />

            <select
              className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={field.type}
              onChange={(e) =>
                updateField(i, {
                  ...field,
                  type: e.target.value as any,
                  children:
                    e.target.value === "object" ? [] : undefined
                })
              }
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="object">object</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={field.required || false}
                onChange={(e) =>
                  updateField(i, {
                    ...field,
                    required: e.target.checked
                  })
                }
              />
              Required
            </label>

            <button
              onClick={() => removeField(i)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Delete
            </button>
          </div>

          {/* Recursive nesting */}
          {field.type === "object" && field.children && (
            <div className="mt-3">
              <FieldBuilder
                fields={field.children}
                setFields={(childFields) =>
                  updateField(i, { ...field, children: childFields })
                }
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addField}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
      >
        + Add Field
      </button>
    </div>
  )
}
