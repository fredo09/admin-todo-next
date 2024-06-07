/**
 * Componente provider para proveer la sesion a componentes de tipo 'client side' -> nextAuth v4
 */

//* -> importante ponerlo ya que es un componente que se genera del lado del cliente
"use client" 

import { SessionProvider } from 'next-auth/react';
import React from 'react';

//*  -> un sessionProvider debe tener un children para proveeer la sesion en todo la app
interface Props {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
        { children }
    </SessionProvider>
  )
}
