'use strict';

const License = require('../models/license_schema');
const Promo = require('../models/promo_schema');
const Order = require('../models/order_schema');
const Invoice = require('../models/invoice_schema');

const s3Zip = require('s3-zip');
const aws = require('aws-sdk');
const stream = require("stream");
const pdfService = require('../service/pdf-service.js');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const readLicenseData = (req, res) => {
    License.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
}

const readPromoData = (req, res) => {
  Promo.find()
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
}

const getOrderData = (req, res) => {
  let id = req.params.id
  Invoice.find({ orderIdPB: id })
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
}

const postOrderData = async (req, res) => {
  const region = process.env.AWS_REGION;
  const bucket = 'pblibrary';

  ////// MP3s & Wav
  const types = [ 'mp3' ]; // Add 'wav' once available
  for(let t = 0; t < types.length; t++) {
      const zipName = 'downloads/PBCatalog_' + req.body.pbId + '_' + types[t] + '.zip';
      let files = [];
      for(let i = 0; i < req.body.items.length; i++) {
        let file = req.body.items[i].CatNum + '/' + req.body.items[i].songID + '.' + types[t]
        files.push(file)
      }
      const uploadFromStream = (s3client) => {
        const pass = new stream.PassThrough()
        const s3params = {
          Bucket: bucket,
          Key: zipName,
          Body: pass,
          ContentType: 'application/zip'
        }
        s3client.upload(s3params, (err, data) => {
          if (err) console.log(err)
          if (data) console.log('Success')
        })
        return pass
      }
      
      await s3Zip
      .archive({ region: region, bucket: bucket, debug: true }, '', files)
      .pipe(uploadFromStream(s3, zipName));
      // console.log('Uploaded ' + types[t] + ' to S3')
    }

  const signedUrlExpireSeconds = 60 * 60 * 24 * 7;
  // const signedUrlExpireSeconds = 60 * 5; // 5 min expiration for test

  const mp3url = await s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: 'downloads/PBCatalog_' + req.body.pbId + '_' + 'mp3.zip',
      Expires: signedUrlExpireSeconds
  }) 
  /// Duplicate above for wavurl if(wav = true), once available
  /// Key: 'https://pblibrary.s3.us-east-2.amazonaws.com/downloads/PBCatalog_' + req.body.pbId + '_' + 'wav.zip'

  const invoiceData = new Invoice({
    date: req.body.date,
    orderIdPB: req.body.pbId,
    description: req.body.description,
    items: req.body.items,
    total: req.body.total,
    subtotal: req.body.subtotal,
    discount: req.body.discount,
    mp3Url: mp3url,
    name: req.body.payer.name.given_name + ' ' + req.body.payer.name.surname,
    email: req.body.payer.email_address
    //wavUrl: wavurl
  });
  invoiceData.save((err) => {
    if(err) {  console.error(err); }});

  const orderData = new Order({
    date: req.body.date,
    orderIdPB: req.body.pbId,
    paymentId: req.body.paymentId,
    payer: req.body.payer,
    purchase_units: req.body.purchase_units,
    description: req.body.description,
    items: req.body.items,
    total: req.body.total,
    subtotal: req.body.subtotal,
    discount: req.body.discount,
    status: req.body.status,
    mp3Url: mp3url,
    //wavUrl: wavurl
  });
  orderData.save((err) => {
      if(err) { 
          console.error(err); 
          res.status(500).json(err);
      } else {
          res.status(200).json(mp3url)
      }
  });
};

const downloadMp3s = (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  const region = process.env.AWS_REGION;
  const bucket = 'pblibrary';
  let files = [];
  for(let i = 0; i < req.body.ids.length; i++) {
    let file = req.body.ids[i].CatNum + '/' + req.body.ids[i].songID + '.mp3'
    files.push(file)
  }
  s3Zip
  .archive({ region: region, bucket: bucket, debug: true }, '', files)
  .pipe(res);
}

const downloadInvoice = (req, res, next) => {
  let id = req.params.id;
  Invoice.find({ orderIdPB: id })
  .then((data) => {

    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment;filename=PBCinvoice-${id}.pdf`,
    });

    pdfService.buildPDF(
      (chunk) => stream.write(chunk),
      () => stream.end(), 
      data[0]
    );

  })
}

module.exports = {
    readLicenseData,
    readPromoData,
    getOrderData,
    postOrderData,
    downloadMp3s,
    downloadInvoice
};
