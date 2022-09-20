require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    await sequelize.authenticate();
    const blogs = await sequelize.query("SELECT * FROM blog", {
      type: QueryTypes.SELECT,
    });
    blogs.forEach((a) => {
        console.log(a.author,":",a.title,",",a.likes,"likes" )
   })
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
