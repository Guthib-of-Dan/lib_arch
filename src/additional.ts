export function getDataByPermission<T extends boolean>(permission: T): T extends true ? {} : null {
  return (permission ? {} : null) as any;
} 
