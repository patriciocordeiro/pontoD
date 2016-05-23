module.exports = {

    //    000        usuário não encontrado
    //    001        senha não existe
    //    002        senha inválida
    //    003        já está logado (trabalhando)

    error: {
        noUser: {
            code: '000',
            text: 'No user'
        }, //Usuário não existe
        noPassword: {
            code: '001',
            text: 'No password'
        }, //Seha não existe
        wrongPassword: {
            code: '002',
            text: 'Wrong password'
        }, //Senha inválida
        alreadyWorking: {
            code: '003',
            text: 'already opened'
        }, //O ponto já foi aberto (trabalhando)

        userNotWorking: {
            code: '004',
            text: 'User not workng'
        }, //Não está trabalhando

        userNotUpdated: {
            code: '005',
            text: 'user not updated'
        }

    },
    success: {

        userUpdatedOk: {
            code: '1000',
            text: 'updated ok'
        }, //Atualizado com sucesso
    }





}
