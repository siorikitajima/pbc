const PDFDocument = require('pdfkit');
const path = require('path');

function buildPDF(dataCallback, endCallback, invoice) {
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.image(path.join(__dirname, '', 'PatternBased_Catalog.png'), 420, 123, { width: 100 })

// Info
doc
  .font('Courier', 20)
  .text('//// INVOICE ////', 100, 80, { align: 'center'})
  .font('Courier', 10)
  .moveDown()
  .text(`TO: ${invoice.name} \n${invoice.email} \nOrder#: ${invoice.orderIdPB} \nDate: ${invoice.date} \nPaid in full`, {
    width: 420,
    align: 'left',
    height: 100,
    ellipsis: true
  }, 150)
  .text('PatternBased Corp \npatternbased.com \n48999 Paradise Ave. \nMorongo Valley, CA 92256 USA \ninfo@patternbased.com', {
    width: 420,
    align: 'right',
    height: 100,
    ellipsis: true
  }, 150);
  
 // Line
 doc.lineCap('round')
 .lineWidth(3)
 .moveTo(100, 67)
 .lineTo(520, 67)
 .stroke('#222222');
 doc.lineCap('round')
 .lineWidth(3)
 .moveTo(100, 107)
 .lineTo(520, 107)
 .stroke('#222222');

 doc.lineCap('round')
 .lineWidth(3)
 .moveTo(100, 220)
 .lineTo(520, 220)
 .stroke('#222222');

// items
for(let i = 0; i < invoice.items.length; i++) {
    doc
    .font('Courier', 12)
    .moveDown()
    .text(`${invoice.items[i].license.name} \n${invoice.items[i].songName} by ${invoice.items[i].songBy}`, {
        width: 420,
        align: 'left',
        height: 100,
        ellipsis: true
    }, 240 + (60 * i))
    .text(`$ ${invoice.items[i].license.price}`, {
        width: 420,
        align: 'right',
        height: 100,
        ellipsis: true
    }, 240 + (60 * i));
    
    doc.lineCap('round')
    .lineWidth(1)
    .moveTo(100, 280 + (60 * i))
    .lineTo(520, 280 + (60 * i))
    .stroke('#222222');
}

let offset = 60 * (invoice.items.length -1);
let string1 = (invoice.discount !== '0') ? 'Subtotal \nDiscount \n\nTotal' : 'Subtotal \n\nTotal'
let string2 = (invoice.discount !== '0') ? `$ ${invoice.subtotal} \n$ ${invoice.discount} \n\n $ ${invoice.total}` : `$ ${invoice.subtotal} \n\n $ ${invoice.total}`

// Total
doc
  .font('Courier', 12)
  .moveDown()
  .text(string1, {
    width: 200,
    align: 'left',
    height: 100,
    ellipsis: true
  }, 300 + offset)
  .text(string2, {
    width: 420,
    align: 'right',
    height: 100,
    ellipsis: true
  }, 300 + offset);

 // Line
 doc.lineCap('round')
 .lineWidth(3)
 .moveTo(100, 370 + offset)
 .lineTo(520, 370 + offset)
 .stroke('#222222');

// Footer
doc
  .font('Courier', 10)
  .moveDown()
  .text('All amounts shown are in USD.\nThis is a computer generated invoice. No signature is required.', {
    width: 420,
    align: 'center',
    height: 100,
    ellipsis: true
  }, 390 + offset);

  doc.end();
}

module.exports = { buildPDF };