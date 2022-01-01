const path = require('path');

process.chdir(path.resolve(__dirname, '../swagger'));
const resolve = require('json-refs').resolveRefs;
const YAML = require('js-yaml');
const fs = require('fs');

const root = YAML.load(fs.readFileSync(path.resolve(__dirname, '../swagger/index.yaml')).toString());
const options = {
  filter: ['relative', 'remote'],
  loaderOptions: {
    processContent: (res, callback) => {
      callback(null, YAML.load(res.text));
    }
  }
};
resolve(root, options).then((results) => {
  fs.writeFile(path.resolve(__dirname, '../swagger/swagger.yaml'), YAML.dump(results.resolved), (err) => {
    if (err) {
      console.log('swagger merged fail:', err);
    } else {
      console.log('swagger merged successfully.');
    }
  });
}).catch((err) => {
  console.log('swagger merged fail:', err);
});
