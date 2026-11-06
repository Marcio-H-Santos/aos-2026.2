const express = require('express');
const cors = require('cors');
const prisma = require('./prisma');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota raiz de teste
app.get('/', (req, res) => {
  res.json({ message: 'API de Currículos a rodar com sucesso!' });
});

// ==================== ROTAS DE PERFIS (PROFILES) ====================

// GET /profiles - Listar todos os perfis com seus relacionamentos
app.get('/profiles', async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        academicExperiences: true,
        professionalExperiences: true,
        projects: true,
      },
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfis' });
  }
});

// GET /profiles/:id - Buscar um perfil por ID
app.get('/profiles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        academicExperiences: true,
        professionalExperiences: true,
        projects: true,
      },
    });
    if (!profile) return res.status(404).json({ error: 'Perfil não encontrado' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

// POST /profiles - Criar novo perfil
app.post('/profiles', async (req, res) => {
  const { name, email, phone, bio, githubUrl, linkedinUrl } = req.body;
  try {
    const profile = await prisma.profile.create({
      data: { name, email, phone, bio, githubUrl, linkedinUrl },
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar perfil. Verifique se o e-mail já existe.' });
  }
});

// PUT /profiles/:id - Atualizar perfil
app.put('/profiles/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, bio, githubUrl, linkedinUrl } = req.body;
  try {
    const profile = await prisma.profile.update({
      where: { id },
      data: { name, email, phone, bio, githubUrl, linkedinUrl },
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar perfil' });
  }
});

// DELETE /profiles/:id - Remover perfil
app.delete('/profiles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.profile.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao apagar perfil' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});