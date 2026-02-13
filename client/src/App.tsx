import { useState } from "react"
import FieldBuilder from "./components/Filebuilder"
import type { Field } from "./type"
import ResponseBuilder from "./components/Respose"


function App() {
  const [routes, setRoutes] = useState<any[]>([])
  const [activeRoute, setActiveRoute] = useState<number | null>(null)
  const [result, setResult] = useState("")

  const addRoute = () => {
    const newRoute = {
      path: "",
      method: "GET",
      requestFields: [],
      responses: []
    }

    setRoutes([...routes, newRoute])
    setActiveRoute(routes.length)
  }

  const updateRoute = (key: string, value: any) => {
    if (activeRoute === null) return

    const updated = [...routes]
    updated[activeRoute][key] = value
    setRoutes(updated)
  }

  return (
    <div className="h-screen flex bg-[#0f172a] text-gray-200">

      {/* Sidebar */}
      <div className="w-64 bg-[#111827] border-r border-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-4">Routes</h2>

        <button
          onClick={addRoute}
          className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg mb-4"
        >
          + Add Route
        </button>

        {routes.map((route, index) => (
          <div
            key={index}
            onClick={() => setActiveRoute(index)}
            className={`p-2 rounded cursor-pointer mb-2 ${
              activeRoute === index
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {route.method} {route.path || "/new-route"}
          </div>
        ))}
      </div>

      {/* Builder */}
      <div className="flex-1 p-6 overflow-y-auto">

        {activeRoute !== null && (
          <div className="space-y-6">

            {/* Route Config */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Route Config</h2>

              <div className="flex gap-4">
                <input
                  placeholder="/users"
                  value={routes[activeRoute].path}
                  onChange={(e) =>
                    updateRoute("path", e.target.value)
                  }
                  className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded"
                />

                <select
                  value={routes[activeRoute].method}
                  onChange={(e) =>
                    updateRoute("method", e.target.value)
                  }
                  className="bg-gray-800 border border-gray-700 p-2 rounded"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
              </div>
            </div>

            {/* Request Body */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">
                Request Body
              </h2>

              <FieldBuilder
                fields={routes[activeRoute].requestFields}
                setFields={(fields: Field[]) =>
                  updateRoute("requestFields", fields)
                }
              />
            </div>

            {/* Responses */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">
                Responses
              </h2>

              <ResponseBuilder
                responses={routes[activeRoute].responses}
                setResponses={(responses: ResponseType[]) =>
                  updateRoute("responses", responses)
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Preview Panel */}
      <div className="w-1/3 bg-black border-l border-gray-800 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Schema Preview</h2>

          <button
            onClick={() => {
              const blob = new Blob([result], {
                type: "application/json"
              })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "openapi.json"
              a.click()
            }}
            className="bg-green-600 px-3 py-1 rounded"
          >
            Download
          </button>
        </div>

        <pre className="text-green-400 text-sm whitespace-pre-wrap">
          {result || "Generated schema will appear here..."}
        </pre>
      </div>

    </div>
  )
}

export default App
