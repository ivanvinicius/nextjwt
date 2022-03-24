interface IUserData {
  roles: ['administrator' | 'editor']
  permissions: ['users.list' | 'users.create' | 'metrics.list']
}

interface IValidateUserPermissions {
  user: IUserData
  roles?: ['administrator' | 'editor']
  permissions?: ['users.list' | 'users.create' | 'metrics.list']
}

export function validateUserPermissions({
  user,
  roles,
  permissions
}: IValidateUserPermissions) {
  if (permissions?.length > 0) {
    const hasAllPermission = permissions.every((permission) => {
      return user.permissions?.includes(permission)
    })

    if (!hasAllPermission) {
      return false
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some((role) => {
      return user.roles?.includes(role)
    })

    if (!hasAllRoles) {
      return false
    }
  }

  return true
}
