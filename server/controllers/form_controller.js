const nodemailer = require('nodemailer')

const form_post = (req, res) => {
    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS;
    const GMAIL_PORT = process.env.GMAIL_PORT;
    const GMAIL_HOST = process.env.GMAIL_HOST;
    const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

    const smtpTrans = nodemailer.createTransport({
      host: GMAIL_HOST,
      port: GMAIL_PORT,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
      }
    })

    const mailBody2 = () => {
      if (req.body.inqueryType == 'Suggestion' || req.body.inqueryType == 'Composing' || req.body.inqueryType == 'FullCatalog' || req.body.inqueryType == 'CustomLicense') {
        return `<b>Project Name: </b>${req.body.project}<br/><br/><b>URL: </b>${req.body.url}<br/><br/><b>Details: </b>${req.body.details}<br/>`
      } else if (req.body.inqueryType == 'Stems') {
        return `<b>Track Name: </b>${req.body.song}<br/><br/><b>Invoice#: </b>${req.body.invoice}<br/><br/><b>Message / Request: </b>${req.body.message}<br/>`
      } else if (req.body.inqueryType == 'Length') {
        return `<b>Track Name: </b>${req.body.song}<br/><br/><b>Project Name: </b>${req.body.project}<br/><br/><b>Length: </b>${req.body.length}<br/><br/><b>Details: </b>${req.body.details}<br/>`
      } else if (req.body.inqueryType == 'Remix') {
        return `<b>Track Name: </b>${req.body.song}<br/><br/><b>Project Name: </b>${req.body.project}<br/><br/><b>Details: </b>${req.body.details}<br/>`
      } else if (req.body.inqueryType == 'Other') {
        return `<b>Message: </b>${req.body.message}<br/>`
      }
    }
    const mailHtml = {
      from: GMAIL_USER,
      to: EMAIL_RECEIVER,
      cc: `${req.body.email}`,
      subject: '[PBC] Thank You for Your Request',
      html: `<div style="width: 100%; height: 100%; text-align: center; background: #222; color: #fff; padding-bottom: 30px;">
      <a href="https://dev-catalog.patternbased.com/"><img src="https://pblibrary.s3.us-east-2.amazonaws.com/emailImages/PatternBased_Catalog_logo.png" alt="PatternBased Catalog" style="width: 200px; margin: 30px auto;"></a>
      <div style="width: auto; max-width: 600px; background: #f2f2f2; color:#222; text-align: center; font-family:GCentra,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; margin: 0 auto; border-radius: 5px; line-height: 1.4em; padding: 30px 20px;">
      <p">Dear ${req.body.name}, <br/> Thank you for your request. We will get back to you shortly.<br/><br/>
      <b>Inquery Type: </b>${req.body.inqueryType}<br/><br/>
      <b>Name: </b>${req.body.name}<br/><br/>
      <b>Email: </b>${req.body.email}<br/><br/>
      <b>Company: </b>${req.body.company}<br/><br/>
      ` + mailBody2() + `</p>
      </div>
        <p style="padding: 30px 0 0 0;">
            <a href="https://patternbased.com/" style="text-decoration: underline; color: #ddd;">PatternBased </a>
            <span style="width:10px; display: inline-block;"></span>
            <a href="https://legal.patternbased.com/privacy-policy/" style="text-decoration: underline; color: #ddd;"> Privacy Policy</a><br/><br/>
            &copy; Copyright 2021 PatternBased Corp
        </p>
    </div>`
    }
  
    // let mailBody;
    // if(req.body.inqueryType == 'Suggestion') {
    //     mailBody = {
    //     from: `${req.body.email}`,
    //     to: EMAIL_RECEIVER,
    //     subject: `[PBC] Suggestions Request from ${req.body.name}`,
    //     html: `<p>You received new massage via PB Catalog.</p><p><b>Inquery Type</b><br/>Requesting Suggestions<br/><br/><b>Name</b><br/>${req.body.name}<br/><br/><b>Email</b><br/>${req.body.email}<br/><br/><b>Company</b><br/>${req.body.company}<br/><br/><b>Project Name</b><br/>${req.body.project}<br/><br/><b>URL</b><br/>${req.body.url}<br/><br/><b>Details</b><br/>${req.body.details}<br/></p>`
    //   }
    // } else if(req.body.inqueryType == 'Stems') {
    //   mailBody = {
    //     from: `${req.body.email}`,
    //     to: EMAIL_RECEIVER,
    //     subject: `[PBC] Stems Request from ${req.body.name}`,
    //     html: `<p>You received new massage via PB Catalog.</p><p><b>Inquery Type</b><br/>Requesting Stems<br/><br/><b>Name</b><br/>${req.body.name}<br/><br/><b>Email</b><br/>${req.body.email}<br/><br/><b>Company</b><br/>${req.body.company}<br/><br/><b>Track Name</b><br/>${req.body.song}<br/><br/><b>Invoice#</b><br/>${req.body.invoice}<br/><br/><b>Message / Special Request</b><br/>${req.body.message}<br/></p>`
    //   }
    // } else if(req.body.inqueryType == 'Composing') {
    //   mailBody = {
    //     from: `${req.body.email}`,
    //     to: EMAIL_RECEIVER,
    //     subject: `[PBC] Composing Request from ${req.body.name}`,
    //     html: `<p>You received new massage via PB Catalog.</p><p><b>Inquery Type</b><br/>Requesting Composing<br/><br/><b>Name</b><br/>${req.body.name}<br/><br/><b>Email</b><br/>${req.body.email}<br/><br/><b>Company</b><br/>${req.body.company}<br/><br/><b>Project Name</b><br/>${req.body.project}<br/><br/><b>URL</b><br/>${req.body.url}<br/><br/><b>Details</b><br/>${req.body.details}<br/></p>`
    //   }
    // } else if(req.body.inqueryType == 'Length') {
    //   mailBody = {
    //     from: `${req.body.email}`,
    //     to: EMAIL_RECEIVER,
    //     subject: `[PBC] Custom Work Request from ${req.body.name}`,
    //     html: `<p>You received new massage via PB Catalog.</p><p><b>Inquery Type</b><br/>Requesting Custom Work<br/><br/><b>Name</b><br/>${req.body.name}<br/><br/><b>Email</b><br/>${req.body.email}<br/><br/><b>Company</b><br/>${req.body.company}<br/><br/><b>Project Name</b><br/>${req.body.project}<br/><br/><b>Length</b><br/>${req.body.length}<br/><br/><b>Details</b><br/>${req.body.details}<br/></p>`
    //   }
    // }

    smtpTrans.sendMail(mailHtml, (error, response) => {
      if (error) { res.json(error) }
      else { res.json(response);  }
    })
}

module.exports = {
    form_post
}