const { VM } = require('vm2');

async function runCodeInSandbox(code, category) {
  const vm = new VM({
    timeout: 5000,
    sandbox: {},
    eval: false,
    wasm: false,
  });

  try {
    console.log('Running code for category:', category); // Debug log
    let sandboxCode = `
      let output = [];
      console.log = (...args) => output.push(args.join(' '));
    `;

    // Define require once in the outer scope, with category-specific overrides
    if (category === 'react') {
      sandboxCode += `
        const require = (module) => {
          if (module === 'react') {
            return {
              createElement: (type, props, ...children) => {
                const element = { type, props: props || {}, children };
                output.push(\`Rendered: <\${type}>\${children.join('') || ''}</\${type}>\`);
                return element;
              }
            };
          }
          return () => {};
        };
        const transformedCode = ${JSON.stringify(code)}
          .replace(/<([a-zA-Z]+)>(.*?)<\\/\\1>/g, 'React.createElement("$1", null, "$2")')
          .replace(/<([a-zA-Z]+) \\/>/g, 'React.createElement("$1", null)');
        eval(transformedCode);
        if (typeof App !== 'undefined') {
          React.createElement(App().type, App().props, ...App().children);
        }
      `;
    } else if (category === 'node') {
      sandboxCode += `
        const require = (module) => {
          if (module === 'http') {
            return {
              createServer: (callback) => ({
                listen: (port, cb) => {
                  output.push(\`Server listening on port \${port}\`);
                  if (cb) cb();
                }
              })
            };
          }
          return () => {};
        };
        ${code}
      `;
    } else if (category === 'mongodb') {
      sandboxCode += `
        const require = () => {};
        const db = {
          users: {
            insertOne: (doc) => output.push(\`Inserted: \${JSON.stringify(doc)}\`),
            find: (query) => output.push(\`Found users: \${JSON.stringify(query || {})}``),
            updateOne: (query, update) => output.push(\`Updated: \${JSON.stringify(query)} with \${JSON.stringify(update.$set)}\`),
            deleteOne: (query) => output.push(\`Deleted: \${JSON.stringify(query)}\`)
          }
        };
        ${code}
      `;
    } else if (category === 'express') {
      sandboxCode += `
        const require = (module) => {
          if (module === 'express') {
            return () => ({
              get: (path, callback) => {
                output.push(\`GET \${path} registered\`);
                // Simulate a request to capture res.send output
                const req = {};
                const res = {
                  send: (data) => output.push(\`Response: \${data}\`)
                };
                callback(req, res);
              },
              listen: (port, callback) => {
                output.push(\`Server started on port \${port}\`);
                if (callback) callback();
              },
              use: () => output.push('Middleware registered'),
            });
          }
          return () => {};
        };
        ${code}
      `;
    } else {
      sandboxCode += `
        const require = () => {};
        ${code}
      `;
    }

    sandboxCode += `output.join('\\n');`;
    const result = await vm.run(sandboxCode);
    return result || 'No output';
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

module.exports = { runCodeInSandbox };