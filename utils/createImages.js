const path = require('path');
const fs = require('fs');

const portPath = path.join(__dirname, '../public/portfolio-images');
const folders = fs.readdirSync(portPath);

const buckets = folders.reduce((bucks, f) => {
  const picPath = path.join(portPath, f);
  const picNames = fs.readdirSync(picPath);

  const pics = picNames.map((p, i) => ({
    altText: `Sweeney Restoration work on ${f} ${i + 1}`,
    src: `/portfolio-images/${f}/${p}`,
  }));
  return [
    ...bucks,
    {
      name: f,
      pics,
    },
  ];
}, []);

fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(buckets));
