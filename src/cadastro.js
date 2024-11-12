import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert'; // Importar Alert para mostrar mensagens de erro ou sucesso
import axios from 'axios'; // Importar axios para enviar a requisição HTTP

const theme = createTheme();

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mensagem de erro
  const [loading, setLoading] = useState(false); // Estado para controlar a submissão do formulário
  const navigate = useNavigate(); // Criar um hook de navegação

  // Função de validação de e-mail
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar se o nome, email e senha são válidos
    if (!name || !email || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setError(''); // Limpar erros anteriores
    setLoading(true); // Iniciar carregamento

    try {
      // Enviar dados para o backend para cadastro
      await axios.post('http://localhost:5000/cadastrar-usuario', { name, email, password });

      // Redirecionar para a página inicial após o cadastro
      navigate('/'); // Redireciona para a página inicial após o sucesso
    } catch (err) {
      setError('Ocorreu um erro ao criar a conta. Tente novamente.');
    } finally {
      setLoading(false); // Finalizar carregamento
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          
          {/* Exibição de erro */}
          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ mt: 3, mb: 2 }} 
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}