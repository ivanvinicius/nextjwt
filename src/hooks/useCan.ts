import { useAuth } from '../contexts/Auth'
import { validateUserPermissions } from '../utils/validateUserPermissions'

interface IUseCanParams {
  roles?: ['administrator' | 'editor']
  permissions?: ['users.list' | 'users.create' | 'metrics.list']
}

export function useCan({ roles, permissions }: IUseCanParams) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    roles,
    permissions
  })

  return userHasValidPermissions
}
