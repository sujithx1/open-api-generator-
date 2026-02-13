export function generateOpenApi(data: any) {
  const { path, method, requestFields, responseFields } = data

  const convertFields = (fields: any[]) => {
    const properties: any = {}
    fields.forEach(field => {
      properties[field.name] = { type: field.type }
    })
    return {
      type: "object",
      properties
    }
  }

  return {
    openapi: "3.0.0",
    info: {
      title: "Generated API",
      version: "1.0.0"
    },
    paths: {
      [path]: {
        [method.toLowerCase()]: {
          requestBody: {
            content: {
              "application/json": {
                schema: convertFields(requestFields)
              }
            }
          },
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: convertFields(responseFields)
                }
              }
            }
          }
        }
      }
    }
  }
}



export type Field = {
  name: string
  type: "string" | "number" | "boolean" | "object" | "array"
  required?: boolean
  children?: Field[]      // for object
  arrayType?: Field       // for array of objects
}
function generateSchema(fields: Field[]): any {
  const properties: any = {}
  const required: string[] = []

  for (const field of fields) {
    if (field.required) {
      required.push(field.name)
    }

    if (field.type === "object") {
      properties[field.name] = {
        type: "object",
        ...generateSchema(field.children || [])
      }
    }

    else if (field.type === "array") {
      properties[field.name] = {
        type: "array",
        items: field.arrayType?.type === "object"
          ? {
              type: "object",
              ...generateSchema(field.arrayType.children || [])
            }
          : { type: field.arrayType?.type }
      }
    }

    else {
      properties[field.name] = {
        type: field.type
      }
    }
  }

  return {
    properties,
    required
  }
}
