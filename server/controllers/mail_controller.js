const nodemailer = require('nodemailer');
const { all } = require('../routes/license_api');
const Invoice = require('../models/invoice_schema');
const thedomain = process.env.DOMAIN;

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
      } else if (req.body.inqueryType == 'CustomQuote' || req.body.inqueryType == 'FullCatalogLicense') {
        return `<b>Project Name: </b>${req.body.project}<br/><br/><b>URL: </b>${req.body.url}<br/><br/><b>Details: </b>${req.body.details}<br/><br/><br/><b>License Category: </b>${req.body.category}<br/><br/><b>License Type: </b>${req.body.type}<br/><br/><b>License Sub-Type: </b>${req.body.subType}<br/><br/><b>License Song ID: </b>${req.body.songID}<br/><br/><b>License Song Title: </b>${req.body.songName}<br/><br/><b>License Song By: </b>${req.body.songBy}<br/>`
      } else if (req.body.inqueryType == 'Stems') {
        return `<b>Track Name: </b>${req.body.song}<br/><br/><b>Invoice#: </b>${req.body.invoice}<br/><br/><b>Message / Request: </b>${req.body.message}<br/>`
      } else if (req.body.inqueryType == 'Length') {
        return `<b>Track Name: </b>${req.body.song}<br/><br/><b>Project Name: </b>${req.body.project}<br/><br/><b>Length: </b>${req.body.length}<br/><br/><b>Details: </b>${req.body.details}<br/>`
      } else if (req.body.inqueryType == 'Remix') {
        return `<b>Track Name: </b>${req.body.song}<br/><br/><b>Project Name: </b>${req.body.project}<br/><br/><b>Details: </b>${req.body.details}<br/>`
      } else if (req.body.inqueryType == 'Other') {
        return `<b>Invoice#: </b>${req.body.invoice}<br/><br/><b>Message: </b>${req.body.message}<br/>`
      }
    }
    const mailHtml = {
      from: GMAIL_USER,
      to: EMAIL_RECEIVER,
      cc: `${req.body.email}`,
      subject: '[PBC] Thank You for Your Request',
      html: `<div style="width: 100%; height: 100%; text-align: center; background: #222; color: #fff; padding-bottom: 30px;">
      <a href="${thedomain}"><img src="https://pblibrary.s3.us-east-2.amazonaws.com/emailImages/PatternBased_Catalog_logo.png" alt="PatternBased Catalog" style="width: 200px; margin: 30px auto;"></a>
      <div style="width: auto; max-width: 600px; background: #f2f2f2; color:#222; text-align: center; font-family:GCentra,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; margin: 0 auto; border-radius: 5px; line-height: 1.4em; padding: 30px 20px;">
      <h2>THANK YOU FOR YOUR REQUEST<h2/>
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
            &copy; Copyright 2022 PatternBased Corp
        </p>
    </div>`
    }

    smtpTrans.sendMail(mailHtml, (error, response) => {
      if (error) { res.json(error) }
      else { res.json(response);  }
    })
}

const order_comfirmation = (req, res) => {
  Invoice.find({ orderIdPB: req.body.pbId})
  .then((data) => {
    console.log(req.body.pbId)
    // console.log(data)
    console.log(data[0].mp3Url)

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

  let allItems = ''
  for( let i = 0; i < req.body.items.length; i++ ) {
    let anItem = `<div style="width: 500px; display: flex; justify-content: space-between; border-bottom: #ddd 1px solid; margin: 0 auto; padding: 10px 0;">
    <p style="width: 500px; margin: 0 auto; text-align: left;"><b>${req.body.items[i].license.name}</b><br/>
    <i>${req.body.items[i].songName}</i> by ${req.body.items[i].songBy}</p>
    <p style="width: 500px; margin: 0 auto; text-align: right;">$ ${req.body.items[i].license.price}</p></div>`
    allItems = allItems + anItem;
  }
  let total = req.body.discount !== 0  ? `<div style="width: 500px; display: flex; justify-content: space-between; border-top: #ddd 4px solid; margin: 0 auto; padding: 10px 0;">
  <p style="width: 500px; margin: 0 auto; text-align: left;">Subtotal<br/>Discount<br/>Total</p>
  <p style="width: 500px; margin: 0 auto; text-align: right;">$ ${req.body.subtotal}<br/>$ ${req.body.discount}<br/>$ ${req.body.total}</p></div>` : `<div style="width: 500px; display: flex; justify-content: space-between; border-top: #ddd 4px solid; margin: 0 auto; padding: 10px 0;">
  <p style="width: 500px; margin: 0 auto; text-align: left;">Subtotal<br/>Total</p>
  <p style="width: 500px; margin: 0 auto; text-align: right;">$ ${req.body.subtotal}<br/>$ ${req.body.total}</p></div>`

  const mailHtml = {
    from: GMAIL_USER,
    to: `${data[0].email}`,
    cc: EMAIL_RECEIVER,
    subject: `[PBC] Order Confirmation #${req.body.pbId}`,
    html: `<div style="width: 100%; height: 100%; text-align: center; background: #222; color: #fff; padding-bottom: 30px;">
    <a href="${thedomain}"><img src="https://pblibrary.s3.us-east-2.amazonaws.com/emailImages/PatternBased_Catalog_logo.png" alt="PatternBased Catalog" style="width: 200px; margin: 30px auto;"></a>
    <div style="width: auto; max-width: 600px; background: #f2f2f2; color:#222; text-align: center; font-family:GCentra,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; margin: 0 auto; border-radius: 5px; line-height: 1.4em; padding: 40px 20px;">
    <h2>ORDER CONFIRMATION</h2>
    <p">Dear ${req.body.payer.name.given_name + ' ' + req.body.payer.name.surname}, <br/> We have received your order, thank you!<br/><br/></p>
    <h3>Order#: </b>${req.body.pbId}</h3>
    <p><b>Date: </b>${req.body.date}</p>
    <hr style="width: 500px; margin: 0 auto; border: 1px #ddd solid;"/>
    ` + allItems + total + `

    <a href="${data[0].mp3Url}">
    <div style="width: 460px; height: auto; margin: 10px auto; padding: 10px 20px; background: #444; color: #fff; border-radius: 5px; font-size: 1.1em; text-decoration: none;">Download MP3</div>
    </a>

    <a href="${thedomain}invoice/${req.body.pbId}">
    <div style="width: 460px; height: auto; margin: 10px auto; padding: 10px 20px; background: #444; color: #fff; border-radius: 5px; font-size: 1.1em; text-decoration: none;">View Invoice</div>
    </a>
    <a href="${thedomain}requests?type=stems&order=${req.body.pbId}">
    <div style="width: 460px; height: auto; margin: 10px auto; padding: 10px 20px; background: #444; color: #fff; border-radius: 5px; font-size: 1.1em; text-decoration: none;">Request Stems</div>
    </a>

    <div style="width: 500px; display: flex; justify-content: space-between; margin: 10px auto 0 auto; padding: 10px 0;">
    <img src="https://pblibrary.s3.us-east-2.amazonaws.com/emailImages/audio-file_blue.png" alt="PatternBased Catalog" style="width: 40px; height: 40px; margin: 10px 10px 10px 0;">
    <p style="width: 400px; text-align: left; margin: 10px 0;">Click on 'Download MP3' above to download MP3. We will send you wav format file(s) within 24 hours via Email.</p></div>

    <div style="width: 500px; display: flex; justify-content: space-between; margin: 0 auto; padding: 0;">
    <img src="https://pblibrary.s3.us-east-2.amazonaws.com/emailImages/Stems_icon_blue.png" alt="PatternBased Catalog" style="width: 40px; height: 40px; margin: 10px 10px 10px 0;">
    <p style="width: 400px; text-align: left; margin: 10px 0;">Stems are available for most of our music upon request. Click on 'Request Stems' above.</p></div>

    <div style="width: 500px; display: flex; justify-content: space-between; margin: 0 auto 10px auto; padding: 10px 0;">
    <img src="https://pblibrary.s3.us-east-2.amazonaws.com/emailImages/email_icon_blue.png" alt="PatternBased Catalog" style="width: 40px; height: 40px; margin: 10px 10px 10px 0;">
    <p style="width: 400px; text-align: left; margin: 10px 0;">Download Links will expire in 7 days. Please <a href="${thedomain}requests?type=other&order=${req.body.pbId}">contact us</a> with your Order# to re-issue download links.</p></div>

    </div>
      <p style="padding: 30px 0 0 0; color: #ddd;">
          <a href="https://patternbased.com/" style="text-decoration: underline; color: #ddd;">PatternBased.com</a>
          <span style="width:10px; display: inline-block;"></span>
          <a href="https://legal.patternbased.com/privacy-policy/" style="text-decoration: underline; color: #ddd;"> Privacy Policy</a><br/><br/>
          &copy; Copyright 2022 PatternBased Corp
      </p>
  </div>`
  }

  setTimeout(() => {
    smtpTrans.sendMail(mailHtml, (error, response) => {
      if (error) { res.json(error) }
      else { res.json(response);  }
    })
    console.log('Email sent')
  }, 300000)
  // }, 3000)// Dev Email Test
  })
  .catch((err) => {
    console.error(err);
  });
}

const stem_request = (req, res) => {
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
    let songs = ''
    for (let s = 0; s < req.body.items.length; s++ ) {
      songs = songs + '<br/>' + req.body.items[s].songID + ` '` + req.body.items[s].songName + `'`;
    }
      return `<b>Track Name(s): </b>${songs}<br/><br/><b>Order#: </b>${req.body.pbId}<br/><br/>`
  }

  const mailHtml = {
    from: GMAIL_USER,
    to: EMAIL_RECEIVER,
    cc: `${req.body.payer.email_address}`,
    subject: '[PBC] Thank You for Your Request',
    html: `<div style="width: 100%; height: 100%; text-align: center; background: #222; color: #fff; padding-bottom: 30px;">
    <a href="${thedomain}"><img src="https://pblibrary.s3.us-east-2.amazonaws.com/emailImages/PatternBased_Catalog_logo.png" alt="PatternBased Catalog" style="width: 200px; margin: 30px auto;"></a>
    <div style="width: auto; max-width: 600px; background: #f2f2f2; color:#222; text-align: center; font-family:GCentra,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; margin: 0 auto; border-radius: 5px; line-height: 1.4em; padding: 30px 20px;">
    <h2>THANK YOU FOR YOUR REQUEST<h2/>
    <p">Dear ${req.body.payer.name.given_name + ' ' + req.body.payer.name.surname}, <br/> Thank you for your request. We will get back to you shortly.<br/><br/>
    <b>Inquery Type: </b>Stems<br/><br/>
    <b>Name: </b>${req.body.payer.name.given_name + ' ' + req.body.payer.name.surname}<br/><br/>
    <b>Email: </b>${req.body.payer.email_address}<br/><br/>
    ` + mailBody2() + `</p>
    </div>
      <p style="padding: 30px 0 0 0;">
          <a href="https://patternbased.com/" style="text-decoration: underline; color: #ddd;">PatternBased </a>
          <span style="width:10px; display: inline-block;"></span>
          <a href="https://legal.patternbased.com/privacy-policy/" style="text-decoration: underline; color: #ddd;"> Privacy Policy</a><br/><br/>
          &copy; Copyright 2022 PatternBased Corp
      </p>
  </div>`
  }

  smtpTrans.sendMail(mailHtml, (error, response) => {
    if (error) { res.json(error) }
    else { res.json(response);  }
  })
}

module.exports = {
    form_post,
    order_comfirmation,
    stem_request
}