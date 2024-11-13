import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);  // Estado para armazenar os usuários
  const [loading, setLoading] = useState(true);  // Estado de carregamento
  const [activeSection, setActiveSection] = useState('configuracoes');  // Definir a seção ativa

  useEffect(() => {
    // Função para buscar os usuários no backend
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/usuarios'); // URL do backend
        setUsuarios(response.data);  // Armazena os usuários no estado
        setLoading(false);  // Desativa o estado de carregamento
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setLoading(false);  // Desativa o carregamento em caso de erro
      }
    };

    fetchUsuarios();  // Chama a função de busca ao carregar o componente
  }, []);

  return (
    <div>
      <div className={`section ${activeSection === 'configuracoes' ? 'active' : ''}`}>
        <h2>Usuários</h2>
        <p>Configurações do usuário.</p>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Usuarios;
