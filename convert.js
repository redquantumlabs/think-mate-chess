const { Jimp } = require('jimp');

async function convert() {
  const image = await Jimp.read('assets/icon.png');
  await image.write('assets/icon_real.png');
  console.log('Converted to real PNG');
}
convert().catch(console.error);
