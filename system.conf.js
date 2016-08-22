System.config({
  packages: {
    '': {
      defaultExtension: 'js'
    }
  },
  paths: {
    'systemjs': 'node_modules/systemjs/dist/system.js'
  },
  meta: {
    'dist/*': { format: 'register' }
  },
  transpiler: null
});
