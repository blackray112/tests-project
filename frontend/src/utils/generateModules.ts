export interface ModulePackageConfig {
  singleton: boolean
  requiredVersion: string
}

export interface GenerateModules {
  [key: string]: ModulePackageConfig
}

export const generateModules = (
  dependencies: Record<string, string>,
  packageNames: string[],
): GenerateModules => {
  const sharedModules = {}

  if (!Object.entries(dependencies).length) return sharedModules

  packageNames.forEach(packageName => {
    sharedModules[packageName] = {
      singleton: true,
      requiredVersion: dependencies[packageName],
    }
  })

  return sharedModules
}
