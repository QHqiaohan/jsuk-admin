var config = {
  project: 'jsuk-admin',
  outDir: 'bundle',
  tmpDir: '/tmp/jsuk-admin',
  deployDir: '/usr/share/nginx/html',
  htmlDeployDir: '/usr/share/nginx/html',
  buildCmd: ['npm run build'],
  files: {
    'jsuk-admin': ['dist/*'],
  },
  configs: [{
    env: 'prod',
    user: 'root',
    middleServer: '47.99.45.67',
    targetServer: ['172.16.91.130']
  }, {
    env: 'test',
    user: 'root',
    middleServer: '192.168.0.84',
    targetServer: ['192.168.0.84']
  }]
};

module.exports = config;

