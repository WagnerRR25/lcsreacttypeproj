import { Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react'
import { useDrawerContext } from "../shared/contexts";
import { Dashboard, ListagemDeCidades } from "../pages";


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
        icon: 'location_city',
        path: '/cidades',
        label: 'Cidade',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/cidades" element={<ListagemDeCidades />} />
      {/* <Route path="/cidades/detalhe/:id" element={<Dashboard />} /> */}


      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}
