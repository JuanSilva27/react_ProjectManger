const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.HOST_MAIL,
  port: process.env.PORT_MAIL,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL,
  },
});

module.exports = {
  confirmRegister: async (data) => {
    const { name, email, token } = data;

    try {
      const infoMail = await transport.sendMail({
        from: "Project Manager <info@projectManager.com>",
        to: email,
        subject: "Confirma tu cuenta",
        text: "Confirma tu cuenta en Project Manager",
        html: `
                <p> Hola ${name}, haz click en el siguiente enlace para confirmar tu registro: <p/>
                <a href="${process.env.URL_FRONT}/confirm/${token}">Confirma tu cuenta </a>
                `,
      });
      console.log("Mail enviado");
    } catch (error) {
      console.log(error);
    }
  },

  frogotPassword: async (data) => {
    const { name, email, token } = data;

    try {
      const infoMail = await transport.sendMail({
        from: "Project Manager <info@projectManager.com>",
        to: email,
        subject: "Reestablece tu contraseña",
        text: "Reestanlece tu contraseña en Project Manager",
        html: `
                <p> Hola ${name}, haz click en el siguiente enlace para reestablecer tu contraseña: <p/>
                <a href="${process.env.URL_FRONT}/confirm/${token}">Reestablece tu contraseña</a>
                `,
      });
      console.log("aaaaaaaaaaaaaaaaa");
    } catch (error) {
      console.log(error);
    }
  },
};
