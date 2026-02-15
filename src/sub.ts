type ScopeT = "private" | "public"
type ClientT = "admin" | "user"
export function hasPermission(client: "admin", scope: ScopeT): true
export function hasPermission(client: "user", scope: "public"): true
export function hasPermission(client: "user", scope: "private"): false
export function hasPermission(client: ClientT, scope: ScopeT) {
  return client === "admin" || scope === "public"
}
// test multi-file functionality
export * from "./additional.js"
