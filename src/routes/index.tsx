import { Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react'
import { useDrawerContext } from "../shared/contexts";
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from "../pages";


export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas',
      }
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />


      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}
