import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { LayoutBasePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";

interface IFormData {
nome: string;
}
const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required('Campo de preenchimento obrigatório.').min(3, 'O campo precisa ser preenchido com pelo menos 3 caracteres.'),
})


export const DetalheDeCidades: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');


  useEffect(() => {
  if (id !== 'nova') {
    setIsLoading(true);

    CidadesService.getById(Number(id))
    .then((result) => {
      setIsLoading(false)

      if (result instanceof Error) {
        alert(result.message);
        navigate('/cidades')
      } else {
        setNome(result.nome);
        formRef.current?.setData(result);
      }
    });
  } else {
    formRef.current?.setData({
      nome: '',
    });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = (dados: IFormData) => {

    formValidationSchema
    .validate(dados, { abortEarly: false })
    .then((dadosValidados) => {
      setIsLoading(true);

      if (id === 'nova') {
        CidadesService
        .create(dadosValidados)
        .then((result) => {
          setIsLoading(false);
  
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/cidades');
            } else {
              navigate(`/cidades/detalhe/${result}`);
            }
          } 
        });
      } else {
        CidadesService
        .updateById(Number(id), {id: Number(id), ...dadosValidados})
        .then((result) => {
          setIsLoading(false);
  
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/cidades');
            }
          }
        });
      }
    })
    .catch((errors: yup.ValidationError) => {
      const validationErrors: IVFormErrors = {};

      errors.inner.forEach(error => {
        if (!error.path) return;

        validationErrors[error.path] = error.message;
      });
      
      formRef.current?.setErrors(validationErrors)
    })
    };


   

    const handleDelete = (id: number) => {
      if (window.confirm("Realmente deseja apagar?")) {
        CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado!')
            navigate('/cidades')
          }
        });
      }
    };

  return (
    <LayoutBasePagina 
    titulo= {id === 'nova' ? 'Nova cidade' : nome }
    barraFerramentas={
      <FerramentasDeDetalhe
      textoBotaoNovo="nova"
      mostrarBotaoSalvarEFechar
      mostrarBotaoNovo={id !== 'nova'}
      mostrarBotaoApagar={id !== 'nova'}

      aoClicarEmSalvar={save}
      aoClicarEmSalvarEFechar={saveAndClose}
      aoClicarEmVoltar={() => navigate('/cidades')}
      aoClicarEmApagar={() => handleDelete(Number(id))}
      aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
       />
    } 
    >

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined" >

          <Grid container direction="column" padding={2} spacing={2} >

            
            {isLoading && (
            <Grid item>
              <LinearProgress variant="indeterminate" />
            </Grid>
            )}


            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2} >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2} >

              <VTextField 
              fullWidth 
              name="nome" 
              disabled={isLoading}
              label="Nome" 
              onChange={e => setNome(e.target.value)}
              />
            </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBasePagina>
  )
}