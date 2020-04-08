const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (req, res) => {
  // TODO
  return res.json(repositories);

});

app.post("/repositories", (req, res) => {
  // TODO
  const {title, url, techs} = req.body;


  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return  res.json(repository);


});

app.put("/repositories/:id", (req, res) => {
  // TODO
  /*A rota deve alterar apenas o título, a url e as techs do repositório que possua o id igual ao id 
  presente nos parâmetros da rota; */
  const {id} = req.params;
  


  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return res.status(400).send('Repository not found.');
  }

  const repository = {
  id,
  url: "https://github.com/Rocketseat/unform",
  title: "Unform",
  techs: ["React", "ReactNative", "TypeScript", "ContextApi"],
  likes: 0
  }

  repositories[repositoryIndex] = repository;

  return  res.json(repository);

});

app.delete("/repositories/:id", (req, res) => {
  // TODO
  const {id} = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return res.status(400).send('Repository not found.');
  }

   res.status(204).json(repositories.splice(repositoryIndex, 1));

});

app.post("/repositories/:id/like", (req, res) => {
  // TODO
  const {id} = req.params;
  const repository = repositories.find(repository => repository.id === id);
  

  if(!repository){
    return  res.status(400).json("Repository not found.");
  }
  

  repository.likes++;
  
  return res.status(200).json(repository);

});

module.exports = app;
