export function hello<T extends boolean>(param: T): T{
  console.log("hello")
  return param;
}
