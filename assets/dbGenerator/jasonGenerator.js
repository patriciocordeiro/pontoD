var nomes = [
    "Miguel",
    "Davi",
    "Arthur",
    "Pedro",
    "Gabriel",
    "Bernardo",
    "Lucas",
    "Matheus",
    "Rafael",
    "Heitor",
    "Enzo",
    "Guilherme",
    "Nicolas",
    "Lorenzo",
    "Gustavo",
    "Felipe",
    "Samuel",
    "João Pedro",
    "Daniel",
    "Vitor",
    "Leonardo",
    "Henrique",
    "Theo",
    "Murilo",
    "Eduardo",
    "Pedro Henrique",
    "Pietro",
    "Cauã",
    "Isaac",
    "Caio",
    "Vinicius",
    "Benjamin",
    "João",
    "Lucca",
    "João Miguel",
    "Bryan",
    "Joaquim",
    "João Vitor",
    "Thiago",
    "Antônio",
    "Davi Lucas",
    "Francisco",
    "Enzo Gabriel",
    "Bruno",
    "Emanuel",
    "João Gabriel",
    "Ian",
    "Davi Luiz",
    "Rodrigo",
    "Otávio",
    "Sophia",
    "Alice",
    "Julia",
    "Isabella",
    "Manuela",
    "Laura",
    "Luiza",
    "Valentina",
    "Giovanna",
    "Maria Eduarda",
    "Helena",
    "Beatriz",
    "Maria Luiza",
    "Lara",
    "Mariana",
    "Nicole",
    "Rafaela",
    "Heloísa",
    "Isadora",
    "Lívia",
    "Maria Clara ",
    "Ana Clara",
    "Lorena",
    "Gabriela",
    "Yasmin",
    "Isabelly",
    "Sarah",
    "Ana Julia",
    "Letícia",
    "Ana Luiza",
    "Melissa ",
    "Marina ",
    "Clara ",
    "Cecí lia ",
    "Esther ",
    "Emanuelly ",
    "Rebeca ",
    "Ana Beatriz ",
    "Laví nia ",
    "Vitó ria ",
    "Bianca ",
    "Catarina ",
    "Larissa ",
    "Maria Fernanda ",
    "Fernanda ",
    "Amanda ",
    "Alí cia ",
    "Carolina ",
    "Agatha ",
    "Gabrielly "
]


var sobrenomes = ["Alves", "Monteiro",
    "Novaes",
    "Mendes",
    "Barros",
    "Freitas",
    "Barbosa",
    "Pinto",
    "Moura",
    "Cavalcanti",
    "Dias",
    "Castro",
    "Campos",
    "Cardoso",
    "Silva",
    "Souza",
    "Costa",
    "Santos",
    "Oliveira",
    "Pereira",
    "Rodrigues",
    "Almeida",
    "Nascimento",
    "Lima",
    "Araú jo",
    "Fernandes",
    "Carvalho",
    "Gomes",
    "Martins",
    "Rocha",
    "Ribeiro",
    "Rezende",
    "Sales",
    "Peixoto",
    "Fogaça",
    "Porto",
    "Ribeiro",
    "Duarte",
    "Moraes",
    "Ramos",
    "Pereira",
    "Ferreira",
    "Silveira",
    "Moreira",
    "Teixeira",
    "Caldeira",
    "Vieira",
    "Nogueira",
    "da Costa",
    "da Rocha",
    "da Cruz",
    "da Cunha",
    "da Mata",
    "da Rosa",
    "da Mota",
    "da Paz",
    "da Luz",
    "da Conceiçã o",
    "das Neves",
    "Fernandes",
    "Gonçalves",
    "Rodrigues",
    "Martins",
    "Lopes",
    "Gomes",
    "Mendes",
    "Nunes",
    "Carvalho",
    "Melo",
    "Cardoso",
    "Pires",
    "Jesus",
    "Aragã o",
    "Viana",
    "Farias"
]

var name = [];
var id;
var minNomes = 0;
var maxNomes = nomes.length;
var minSobrenomes = 0;
var maxSobrenomes = sobrenomes.length;
var employee = {
    name: '',
    id: 0,
    password: 0,
    working: false
};
var data = []
for (var i = 0; i < 50; i++) {

    nomesIndex = Math.floor(Math.random() * ((maxNomes-minNomes)+1) + minNomes);
    sobrenomesIndex = Math.floor(Math.random() * ((maxSobrenomes-minSobrenomes)+1) + minSobrenomes);
    employee.name = nomes[nomesIndex] + ' ' + sobrenomes[sobrenomesIndex];
    employee.id = i + 100;
    employee.id = employee.id.toString();
    employee.working= false;
    employee.ponto =[];
    employee.password =i + 100000;
    employee.password = employee.password.toString();
    data.push(employee)
    employee = {};



}

console.log('data: ', data);
///save file with data
var fs = require('fs');
fs.writeFile("db_employees.js", JSON.stringify(data), function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("File saved in output!");
});
