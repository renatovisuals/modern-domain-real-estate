const settings ={
  host :process.env.DB_HOST,
  user :process.env.DB_USER,
  password:process.env.DB_PASS,
  database:'heroku_925257397425112',
  multipleStatements:true
}
module.exports = settings;
