export type FieldType = "string" | "number" | "boolean" | "object"


export interface ResponseType {
  status: string       // 200, 400, 500
  fields: Field[]
}
export type Field = {
  name: string
  type: "string" | "number" | "boolean" | "object" | "array"
  required?: boolean
  children?: Field[]      // for object
  arrayType?: Field       // for array of objects
}
