const json2md = require('json2md');
const fs = require('fs/promises');
const { join } = require('path');

fs.readdir(
  join(process.cwd(), 'schemas')
).then((files) => {
  files.forEach(file => {
    console.log('processing file ==> %s', file);
    const json = require(`./schemas/${file}`);

    const md = json2md([
      {
        table: {
          headers: [
            "Field", "Data Type", "Description", "Data Status", "Database Source", "Field Source"
          ],
          rows: json.fields.map((field) => [
            `\`${field.name}\``, `\`${typeof field.type === 'object' ? JSON.stringify(field.type) : field.type}\``, `\`${field.doc}\``, 'Mandatory', '`ms-ng-ecom-product`', `\`products.${field.name}\``
          ]),
        }
      }
    ]);

    fs.writeFile(join(process.cwd(), 'outputs', file.replace('.json', '.md')), md)
  });
})
