const form = document.getElementById('form');
const form_nombre = document.getElementById('nombre');
const form_email = document.getElementById('email');
const form_telefono = document.getElementById('telefono');
const form_asunto = document.getElementById('asunto');
const form_texto = document.getElementById('texto');
const msg_good = document.getElementById('msg_good');
const msg_error = document.getElementById('msg_error');
const msg_errorRevisar = document.getElementById('msg_error_revisar');


form.addEventListener('submit', e => {
    e.preventDefault();

    limpiarClases();

    const nombre = validoText(form.nombre.value, form_nombre, true);
    const asunto = validoText(form.asunto.value, form_asunto, false);
    const texto = validoText(form.texto.value, form_texto, true);
    const telefono = validoTelefono(form.telefono.value, form_telefono, false);
    const email = validoEmail(form.email.value, form_email, true);

    if (nombre && asunto && texto && telefono && email) {
        enviarCorreo(form)
    }
});

const enviarCorreo = (formulario) => {

    const url = 'email.php';
    const msg = `
    De: ${formulario.nombre.value}
    Correo: ${formulario.email.value}
    Telefono: ${formulario.telefono.value}
    Asunto: ${formulario.asunto.value}
    Mensaje: ${formulario.texto.value}
    `
    let formData = new FormData();
    formData.append("mensaje", msg); // En la posición 0; es decir, el primer elemento
    const params = {
        method: 'POST',
        body: formData
    }
    fetch(url, params)
        .then(respuesta => respuesta.text())
        .then(decodificado => {
            if (decodificado == 'ok') {
                if (msg_good.classList.contains('form__none'))
                    msg_good.classList.remove('form__none')
                form.reset();
            }
        }).catch(e => {
            if (msg_error.classList.contains('form__none'))
                msg_error.classList.remove('form__none')
        });

    // form.reset();

}

const limpiarClases = () => {
    const form_items = [form_nombre, form_email, form_telefono, form_asunto, form_texto];

    //quitamos todos los boder rojos de los inputs
    form_items.forEach(item => {
        if (item.classList.contains('form__border-error'))
            item.classList.remove('form__border-error')
    });


    //quitamos los mensajes de error
    if (!msg_error.classList.contains('form__none'))
        msg_error.classList.add('form__none')

    if (!msg_errorRevisar.classList.contains('form__none'))
        msg_errorRevisar.classList.add('form__none')

    //quitamos los mensajes de good
    if (!msg_good.classList.contains('form__none'))
        msg_good.classList.add('form__none')

}

const validoText = (valor, etiqueta, requerido) => {
    if (validarVacio(valor) && requerido) {
        etiqueta.classList.add('form__border-error');
        if (msg_errorRevisar.classList.contains('form__none'))
            msg_errorRevisar.classList.remove('form__none')
        return false
    }
    return true
}
const validoEmail = (valor, etiqueta, requerido) => {
    valor = valor.toString()
    const patron = /[\w]+@{1}[\w]+\.[a-z]{2,3}/

    if ((requerido && validarVacio(valor)) || (requerido && !valor.match(patron)) || (!requerido && !validarVacio(valor) && !valor.match(patron))) {
        // if ((requerido && validarVacio(valor))) {
        etiqueta.classList.add('form__border-error');
        if (msg_errorRevisar.classList.contains('form__none'))
            msg_errorRevisar.classList.remove('form__none')
        return false;
    }
    return true;

}
const validoTelefono = (valor, etiqueta, requerido) => {
    const patron = /^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/

    // if (!valor.match(patron) && requerido) {
    if ((requerido && validarVacio(valor)) || (requerido && !valor.match(patron)) || (!requerido && !validarVacio(valor) && !valor.match(patron))) {
        etiqueta.classList.add('form__border-error');
        if (msg_errorRevisar.classList.contains('form__none'))
            msg_errorRevisar.classList.remove('form__none')
        return false;
    }
    return true;
}

const validarVacio = valor => valor.trim().length === 0 ? true : false;