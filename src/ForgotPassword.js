import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setStatusMessage('Por favor, insira um email válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subject: 'Recuperação de senha',
          message: `Olá, clique no link para redefinir sua senha: http://localhost:3000/redefinir-senha?email=${email}`,
        }),
      });

      if (response.ok) {
        setStatusMessage('Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
      } else {
        setStatusMessage('Erro ao enviar o email de recuperação. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setStatusMessage('Erro ao enviar o email. Verifique sua conexão.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Esqueceu sua senha?
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Enviar email de recuperação
          </Button>
        </form>
        
        {statusMessage && (
          <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
            {statusMessage}
          </Typography>
        )}

        <Box sx={{ marginTop: 2 }}>
          <Link href="/" variant="body2">
            Já tem cadastro? Clique aqui
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
