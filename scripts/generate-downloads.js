const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const AdmZip = require('adm-zip');

const OUTPUT_DIR = path.resolve(__dirname, '../backend/downloads');

const books = [
  {
    slug: 'the-no-contact-blueprint',
    title: 'The No-Contact Blueprint',
    subtitle: 'The Definitive Behavioral Intelligence Guide to No-Contact Psychology',
  },
  {
    slug: 'texting-psychology',
    title: 'Texting Psychology',
    subtitle: 'A Framework-Driven Guide to Understanding Communication Psychology',
  },
  {
    slug: 'the-attachment-archive',
    title: 'The Attachment Archive',
    subtitle: 'A Deep Behavioral Archive Explaining Attachment Psychology',
  },
  {
    slug: 'the-attraction-code',
    title: 'The Attraction Code',
    subtitle: 'A Premium Behavioral Intelligence Report on Attraction Dynamics',
  },
];

async function createPdf(book) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  page.drawText('Quiet Psychology', {
    x: 50,
    y: height - 60,
    size: 10,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(book.title, {
    x: 50,
    y: height - 140,
    size: 28,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText(book.subtitle, {
    x: 50,
    y: height - 180,
    size: 14,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(
    'This is a premium behavioral intelligence publication. The complete content of this document is proprietary and confidential.',
    {
      x: 50,
      y: height - 260,
      size: 12,
      font,
      color: rgb(0.2, 0.2, 0.2),
      maxWidth: width - 100,
      lineHeight: 18,
    }
  );

  page.drawText('© Quiet Psychology. All rights reserved.', {
    x: 50,
    y: 60,
    size: 10,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });

  const pdfBytes = await doc.save();
  fs.writeFileSync(path.join(OUTPUT_DIR, `${book.slug}.pdf`), pdfBytes);
}

function createEpub(book) {
  const zip = new AdmZip();
  zip.addFile('mimetype', Buffer.from('application/epub+zip'), '', 0);

  zip.addFile(
    'META-INF/container.xml',
    Buffer.from(`<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`)
  );

  zip.addFile(
    'OEBPS/content.opf',
    Buffer.from(`<?xml version="1.0"?>
<package version="2.0" xmlns="http://www.idpf.org/2007/opf">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${book.title}</dc:title>
    <dc:creator>Quiet Psychology</dc:creator>
    <dc:language>en</dc:language>
  </metadata>
  <manifest>
    <item id="toc" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="chapter" href="chapter.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine toc="toc">
    <itemref idref="chapter"/>
  </spine>
</package>`)
  );

  zip.addFile(
    'OEBPS/toc.ncx',
    Buffer.from(`<?xml version="1.0"?>
<ncx version="2005-1" xmlns="http://www.daisy.org/z3986/2005/ncx/">
  <head>
    <meta name="dtb:uid" content="urn:uuid:qp-${book.slug}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>${book.title}</text></docTitle>
  <navMap>
    <navPoint id="chapter" playOrder="1">
      <navLabel><text>${book.title}</text></navLabel>
      <content src="chapter.xhtml"/>
    </navPoint>
  </navMap>
</ncx>`)
  );

  zip.addFile(
    'OEBPS/chapter.xhtml',
    Buffer.from(`<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>${book.title}</title></head>
<body>
  <h1>${book.title}</h1>
  <h2>${book.subtitle}</h2>
  <p>This is a premium behavioral intelligence publication. The complete content of this document is proprietary and confidential.</p>
  <p>© Quiet Psychology. All rights reserved.</p>
</body>
</html>`)
  );

  zip.writeZip(path.join(OUTPUT_DIR, `${book.slug}.epub`));
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const book of books) {
    await createPdf(book);
    createEpub(book);
    console.log(`Generated downloads for ${book.title}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
