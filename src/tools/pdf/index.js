import deps from '../../dependencies'

const { PdfPrinter } = deps
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
}
export const textToPdf = text => {
  const docDefinition = {
    content: [text],
  }

  return new Promise(resolve => {
    const printer = new PdfPrinter(fonts)
    const doc = printer.createPdfKitDocument(docDefinition)
    const chunks = []

    doc.on('data', chunk => {
      chunks.push(chunk)
    })

    doc.on('end', () => {
      const result = Buffer.concat(chunks)
      resolve(result)
    })

    doc.end()
  })
}
