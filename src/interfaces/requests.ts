export interface IRequests {
  action: string,
  id: string,
  status: "error" | "success",
  request: string,
  response: any
}