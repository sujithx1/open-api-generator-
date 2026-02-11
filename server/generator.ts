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
