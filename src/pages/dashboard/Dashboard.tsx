import React from 'react'
import { FerramentasDeDetalhe } from '../../shared/components'
import { LayoutBasePagina } from "../../shared/layouts/LayoutBasePagina"



export const Dashboard = () => {
  return (
    <LayoutBasePagina titulo="Página inicial"
      barraFerramentas={(
        <FerramentasDeDetalhe mostrarBotaoSalvarEFechar />
        )} >
      Testando
    </LayoutBasePagina>
  )
}