import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

// Verifica la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos MySQL.");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

// Define el modelo de usuario
export const User = sequelize.define(
  "User",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //For user registration ONLY
    // role: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: "admin",
    // },
    // registerDate: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    // id_created_by: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   defaultValue: 0,
    // },
    // id_branch: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   defaultValue: 0,
    // },
  },
  {
    // Otras opciones del modelo
    tableName: "users",
  }
);
