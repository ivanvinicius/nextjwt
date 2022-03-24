import { ReactNode } from 'react'

import { useCan } from '../hooks/useCan'

interface ICanProps {
  children: ReactNode
  roles?: ['administrator' | 'editor']
  permissions?: ['users.list' | 'users.create' | 'metrics.list']
}

export function Can({ roles, permissions, children }: ICanProps) {
  const useCanSeeComponent = useCan({ roles, permissions })

  if (!useCanSeeComponent) {
    return null
  }

  return <>{children}</>
}
