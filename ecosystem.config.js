module.exports = {
  apps: [
    {
      name: 'onlyofficevn',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/onlyofficevn',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
