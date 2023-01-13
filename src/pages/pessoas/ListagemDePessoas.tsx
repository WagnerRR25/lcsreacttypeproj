import React, { useEffect, useMemo, useState,  } from 'react';
import { useSearchParams } from 'react-router-dom';

import {  IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDeListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks"
import { Table, TableContainer } from '@mui/material';
  //  IListagemPessoa,         useState



export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [ rows, setRows ] = useState<IListagemPessoa[]>([]);
  const [ totalCount, setTotalCount ] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);

            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <TableContainer>
        <Table>
          
        </Table>
      </TableContainer>

    </LayoutBasePagina>
  );
};