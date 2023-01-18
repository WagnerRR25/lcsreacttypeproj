import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { LayoutBasePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

interface IFormData {
email: string;
cidadeId: number;
nomeCompleto: string;
}
const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nomeCompleto: yup.string().required('Campo de preenchimento obrigatório.').min(3, 'O campo precisa ser preenchido com pelo menos 3 caracteres.'),
  cidadeId: yup.number().required(),
  email: yup.string().required().email(),
})


export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');


  useEffect(() => {
  if (id !== 'nova') {
    setIsLoading(true);

    PessoasService.getById(Number(id))
    .then((result) => {
      setIsLoading(false)

      if (result instanceof Error) {
        alert(result.message);
        navigate('/pessoas')
      } else {
        console.log(result);

        formRef.current?.setData(result);
      }
    });
  } else {
    formRef.current?.setData({
      nomeCompleto: '',
      cidadeId: '',
      email: '',
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
        PessoasService
        .create(dadosValidados)
        .then((result) => {
          setIsLoading(false);
  
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/pessoas');
            } else {
              navigate(`/pessoas/detalhe/${result}`);
            }
          } 
        });
      } else {
        PessoasService
        .updateById(Number(id), {id: Number(id), ...dadosValidados})
        .then((result) => {
          setIsLoading(false);
  
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/pessoas');
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
        PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado!')
            navigate('/pessoas')
          }
        });
      }
    };

  return (
    <LayoutBasePagina 
    titulo= {id === 'nova' ? 'Nova pessoa' : nome }
    barraFerramentas={
      <FerramentasDeDetalhe
      textoBotaoNovo="nova"
      mostrarBotaoSalvarEFechar
      mostrarBotaoNovo={id !== 'nova'}
      mostrarBotaoApagar={id !== 'nova'}

      aoClicarEmSalvar={save}
      aoClicarEmSalvarEFechar={saveAndClose}
      aoClicarEmVoltar={() => navigate('/pessoas')}
      aoClicarEmApagar={() => handleDelete(Number(id))}
      aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
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
              name="nomeCompleto" 
              disabled={isLoading}
              label="Nome Completo" 
              onChange={e => setNome(e.target.value)}
              />
            </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2} >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2} >

              <VTextField 
              fullWidth 
              name="email" 
              disabled={isLoading}
              label="Email" 
              />
            </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2} >
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2} >

              <VTextField 
              fullWidth 
              name="cidadeId" 
              disabled={isLoading}
              label="Cidade" 
              />
            </Grid>
            </Grid>

          </Grid>

         
                
        </Box>
      </VForm>

    
    <p>DetalheDePessoas</p>
    </LayoutBasePagina>
  )
}