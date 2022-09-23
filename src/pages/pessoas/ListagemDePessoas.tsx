import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDeListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks"



export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {

    debounce(() => {
      PessoasService.getAll(1, busca)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
          }
        });
    });
  }, [busca]);


  return (
    <LayoutBasePagina
      titulo='Listagem de Pessoas'
      barraFerramentas={
        <FerramentasDeListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo='nova'
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >
    </LayoutBasePagina>
  );
};