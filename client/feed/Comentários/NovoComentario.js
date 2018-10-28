Template.Post.helpers({
    usernameDoAutor: function() {
        var idDoAutor = this.idDoAutor;
        var autor = Meteor.users.findOne({_id: idDoAutor});
        return autor.username;
    },
    numeroDeCurtidas: function() {
        return this.curtidas.length;
    },
    usuarioCurtiu: function() {
        var curtidas = this.curtidas;
        var posicao = curtidas.indexOf(Meteor.userId());

        if(posicao === -1) {
            return false;
        } else {
            return true;
        }
    },
    comentarios: function() {
        return Comentarios.find({post: this._id}).fetch();
    }
});

Template.NovoComentario.events({
    "submit form": function(evento, template) {
        evento.preventDefault();
        var texto = evento.target.texto.value;
        var idDoPost = template.data._id;

        Meteor.call("inserirComentario", texto, idDoPost);

        evento.target.texto.value = "";
    }
});