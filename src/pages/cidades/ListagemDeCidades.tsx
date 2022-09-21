import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDeListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";


export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  return (
    <LayoutBasePagina
      titulo='Listagem de Cidades'
      barraFerramentas={
        <FerramentasDeListagem
          mostrarInputBusca
          textoBotaoNovo='nova'
          textoDaBusca={busca}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >
    </LayoutBasePagina>
  );
};