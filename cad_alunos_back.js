const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let alunos = [];

app.get('/alunos', (req, res) => {
    res.status(200).json(alunos);
});

app.post('/alunos', (req, res) => {
    const { matricula, nome, email, dataNascimento } = req.body;

    const alunoExistente = alunos.find(aluno => aluno.matricula === matricula);
    if (alunoExistente) {
        return res.status(400).json({ message: 'Matrícula já registrada' });
    }

    const novoAluno = { matricula, nome, email, dataNascimento };
    alunos.push(novoAluno);
    res.status(201).json({ message: 'Aluno registrado com sucesso', aluno: novoAluno });
});

app.put('/alunos/:matricula', (req, res) => {
    const { matricula } = req.params;
    const { nome, email, dataNascimento } = req.body;

    const alunoIndex = alunos.findIndex(aluno => aluno.matricula === matricula);

    if (alunoIndex === -1) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    const alunoExistente = alunos.find(aluno => aluno.matricula !== matricula && aluno.matricula === req.body.matricula);
    if (alunoExistente) {
        return res.status(400).json({ message: 'Matrícula já registrada em outro aluno' });
    }

    alunos[alunoIndex] = { matricula, nome, email, dataNascimento };
    res.status(200).json({ message: 'Aluno atualizado com sucesso', aluno: alunos[alunoIndex] });
});

app.delete('/alunos/:matricula', (req, res) => {
    const { matricula } = req.params;

    const alunoIndex = alunos.findIndex(aluno => aluno.matricula === matricula);

    if (alunoIndex === -1) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    const alunoRemovido = alunos.splice(alunoIndex, 1);
    res.status(200).json({ message: 'Aluno removido com sucesso', aluno: alunoRemovido[0] });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});