import React, { ReactNode } from 'react'
import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useDrawerContext } from '../contexts';



interface ILayoutBadePaginaProps {
  children: React.ReactNode
  titulo: string;
  barraFerramentas?: ReactNode
}

export const LayoutBasePagina: React.FC<ILayoutBadePaginaProps> = ({ children, titulo, barraFerramentas }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height='100%' display="flex" flexDirection="column" gap={1} >
      <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12 )}  >
        {smDown && (
        <IconButton onClick={toggleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>
        )}

        <Typography variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis"  >
        {titulo}
        </Typography>
      </Box>

      {barraFerramentas && (
      <Box>
        {barraFerramentas}
      </Box>
      )}

      <Box flex={1} overflow="auto" >
        {children}
      </Box>
    </Box>
  )
}