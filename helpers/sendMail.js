const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

module.exports = {
  confirmRegister: async (data) => {
    const { name, email, token } = data;
    const msg = {
      to: email, // Change to your recipient
      from: process.env.SENDGRID_MAIL, // Change to your verified sender
      subject: "Confirma tu cuenta",
      text: "Confirma tu cuenta en Project Manager",
      html: `
      <p> Hola ${name}, haz click en el siguiente enlace para confirmar tu registro: <p/>
      <a href="${process.env.URL_FRONT}/confirm/${token}">Confirma tu cuenta </a>
      `,
    };
    try {
      await sgMail.send(msg)
      console.log("Mail enviado");

    } catch (error) {
      console.log(error);
    }
  },

  frogotPassword: async (data) => {
    const { name, email, token } = data;
    const msg = {
      to: email, // Change to your recipient
      from: process.env.SENDGRID_MAIL, // Change to your verified sender
      subject: "Reestablece tu contraseña",
      text: "Reestablece tu contraseña en Project Manager",
      html: `
      <p> Hola ${name}, haz click en el siguiente enlace para reestablecer tu contraseña: <p/>
      <a href="${process.env.URL_FRONT}/confirm/${token}">Reestablece tu contraseña</a>
      `,
    };

    try {
      await sgMail.send(msg)
      console.log("Mail enviado");
    } catch (error) {
      console.log(error);
    }
  },
};
