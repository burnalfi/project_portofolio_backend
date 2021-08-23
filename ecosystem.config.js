module.exports = {
  apps : [{
    name   : "project_portofolio_backend",
    script : "npm run dev",
    watch: true,
    env: {
      DB_USER: "mongodb",
      DB_HOST: "127.0.0.1",
      DB_PORT: 27017,
      DB_NAME: "portofolio",
      SECRET_KEY: "SellinArt2DeezYuppies"
    }
  }]
}
