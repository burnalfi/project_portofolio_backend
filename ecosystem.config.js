module.exports = {
  apps : [{
    name   : "project_portofolio_backend",
    script : "npm run dev",
    watch: true,
    env: {
      "DB_HOST": "localhost",
      "DB_PORT": 27017,
      "DB_NAME": "portofolio",
      "DB_USER": "mongodb"
    }
  }]
}
