import { createContext } from 'react'

export interface IModalContext {
  isActive: boolean
}

export const ModalContext = createContext<IModalContext>({ isActive: true })
