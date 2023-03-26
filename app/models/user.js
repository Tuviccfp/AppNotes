const mongoose = require('mongoose');
const bc = require('bcrypt');

let userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true}, //Nota: A utlização de unique é para evitar que existam usuários com e-mails duplicados ou qualquer outro tipo de dado dependendo da sua lógica.
    password: {type: String, required: true}, 
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

userSchema.pre('save', function(next) {
    if(this.isNew || this.isModified('password')) {
        //const document = this;
        bc.hash(this.password, 10, (err, hashedPassword) => {
            if(err) {
                next(err);
            } else {
                this.password = hashedPassword,
                next();
            };
        });
    };
});

userSchema.methods.isCorrectP = function (pass, next) {
    bc.compare(pass, this.password, function(err, same) {
        if(err) {
            next(err)
        } else {
            next(err, same)
        };
    });
};  

module.exports = mongoose.model('User', userSchema);

/*Nota:
*
*Linha 12: Utilizo minha variável que tem como valor o model da minha collection e passo uma função pre, que é renderizada antes de alguma informação ser salva.
*Passo uma função como segundo "parâmetro" de userSchema.pre e crio uma verificação condicional que vê se o documento é novo ou o atributo password foi alterado (poderia ser qualquer um atributo do model).
*Se a condição atingir verdadeira, encripto a senha dos usuários. A utilização do this é para referenciar os dados do documento.
*
*Linha 15: 
*Chamo minha função hash que tem como parâmetro o atributo a ser criptografado, como segundo parâmetro passo a quantidade de caracteres que será gerada da criptografia daquele dado, 
*e como terceiro parâmetro uma função que recebe dois parâmetro, um para erro e um para criptografia em si.
*
*O parâmetro next utilizado na função mencionada na linha 12, tem como funcionalidade de passar para o próximo middlewares.
*
*Linha 26:
*Utilizo novamente a variável do meu model e uso methods, que serve para passar um método para o model.
*
*Linha 27:
*Com compare, comparo a senha com o hash e vice versa. No segundo parâmetro da função compare, recebo outra função com parâmetro de error e same(iguais), com isso passo uma verificação dentro
dessa função que vai me retonar um error caso tenha um erro e um ok caso a comparação esteja correta.
*/