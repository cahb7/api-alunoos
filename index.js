import express from "express";

const PORTA = 3000;

const server = express();

server.use(express.json());

let alunos = [
 {
  "id": 1,
  "nome" : "rafa",
 "idade" : 20,
"Curso" : "administração",
 },
 {
  "id": 2,
  "nome" : "Diego",
  "idade" : 22,
"Curso" : "engenharia",
 },
 {
  "id": 3,
  "nome" : "Ana",
  "idade" : 19,
    "Curso" : "medicina",
 },
];

let ultimoId = alunos.length;

server.get("/alunos", (request, response) => {
 response.json(alunos);
})

server.post("/alunos", (request, response) => {
 console.log("Criando o novo aluno: ", request.body);

 ultimoId++;
 request.body.id = ultimoId;

 alunos.push(request.body)

 response.sendStatus(201);
})

server.get("/alunos/:id", (request, response) => {
 const indexaluno = alunos.findIndex(aluno => aluno.id === Number(request.params.id));

 if (indexaluno == -1) {
  response.sendStatus(404);
 } else {
  response.json(alunos[indexaluno]);
 }
})


server.patch("/alunos/:id", (request, response) => {
 const indexalunos = alunos.findIndex(aluno => aluno.id === Number(request.params.id));

 if (indexaluno == -1) {
  response.sendStatus(404);
 } else {
  
  request.body.id = alunos[indexaluno].id;

  alunos[indexalunos] = request.body;
  response.json(alunos[indexalunos]);
 }
})

server.delete("/alunos/:id", (request, response) => {
 const indexAluno = alunos.findIndex(aluno => aluno.id === Number(request.params.id));

 if (indexaluno == -1) {
  response.sendStatus(404);
 } else {
  alunos.splice(indexaluno, 1);

  response.sendStatus(200);
 }
})

server.listen(PORTA, () => console.log("Meu servidor tá funcionando na porta:", PORTA));