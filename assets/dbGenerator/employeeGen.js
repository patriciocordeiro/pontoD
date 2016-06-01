(function() {
    'strict';
    var names = require('./names');

    var femaleNames = names.female;
    var maleNames = names.male;
    var familyNames = names.familyname;

    //nconsole.log(names);
    var employee = {};
    var civil = ['Casado', 'Solteiro'];
    var cursos = [{
        curso: 'Engenharia Elétrica',
        departamento: 'Engenharia',
        funcao: ['Projetista', 'Designer', 'Coordenador técnico', 'Estagiário']
    }, {
        curso: 'Serviço social',
        departamento: 'Planejamento',
        funcao: ['Assistente social', 'Coordenador', 'Diretor(a)', 'Estagiário']
    }, {
        curso: 'Administração',
        departamento: 'Administrativo',
        funcao: ['Assistente', 'Coordenador', 'Diretor', 'Estagiário']
    }, {
        curso: 'Pedagogia',
        departamento: 'Pedagógico',
        funcao: ['Assistente', 'Assistente', 'Coordenador', 'Estagiário']
    }, {
        curso: 'Direito',
        departamento: 'Jurídico',
        funcao: ['Assistente', 'Advogado', 'Coordenador', 'Estagiário']
    }];


    var email = ['yahoo', 'gmail', 'hotmail'];
    var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    var maxEmployees = 26;
    var employeeData = [];
    module.exports = {
        createEmployees: function(callback) {
            var gender;
            var data = [];
            for (var i = 0; i < maxEmployees; i++) {
                if (i < 14) {
                    gender = 'F';
                } else {
                    gender = 'M';
                }
                if (gender === 'F') {
                    employee['Nome completo'] = femaleNames[i] + ' ' + familyNames[i];
                    employee.sexo = 'Feminino';
                    employee.imgPath = 'employeeF' + i;
                    employee.email = femaleNames[i].toLowerCase() + '@' + email[Math.floor(Math.random() * ((email.length - 1) + 1) + 0)] + '.com';
                } else {
                    employee['Nome completo'] = maleNames[i] + ' ' + familyNames[i];
                    employee.sexo = 'Masculino';
                    var idx = i-14
                    employee.imgPath = 'employeeM' + idx;
                    employee.email = maleNames[i].toLowerCase() + '@' + email[Math.floor(Math.random() * ((email.length - 1) + 1) + 0)] + '.com';
                }
                employee.id = employee.id = (i + 100).toString();
                var bornYear = (Math.floor(Math.random() * ((1986 - 1979) + 1) + 1979))
                employee['Data de nascimento'] = (Math.floor(Math.random() * (29))).toString() + ' de ' + months[Math.floor(Math.random() * (12))] + ' ' + bornYear.toString();

                employee['Estado civil'] = civil[Math.floor(Math.random() * 2)];
                employee.Idade = (2016 - bornYear).toString();
                employee.Ramal = (Math.floor(Math.random() * ((3333 - 3000) + 1) + 3000)) + '-' + (Math.floor(Math.random() * ((9999 - 1000) + 1) + 1000));

                employee['data de contratação'] = (Math.floor(Math.random() * (29))).toString() + ' de ' + months[Math.floor(Math.random() * (12))] + '  ' + (Math.floor(Math.random() * ((2015 - 1979) + 1) + 1979));
                //        console.log(employee);
                var index = (Math.floor(Math.random() * ((cursos.length - 1 - 0) + 1) + 0));
                employee['Formação'] = cursos[index].curso;
                employee.Departamento = cursos[index].departamento;
                employee['Cargo/Função'] = cursos[index].funcao[(Math.floor(Math.random() * 4))];
//                console.log(employee);
                employeeData.push(employee);
                employee ={};
                if(i===maxEmployees-1){
//                    console.log(i, employeeData);
                    callback(employeeData);
                }

            }


        }
    };



})();


