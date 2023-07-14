import express from "express";
import path from "path";
import morgan from "morgan";
import multer from "multer";

import customerRoutes from "./routes/customer.routes.js";
import staticRoutes from "./routes/static.routes.js";
import { fileURLToPath } from "url";

import session from "express-session";

import dotenv from "dotenv";
dotenv.config();

import flash from 'connect-flash';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "notgoodsecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Multer - upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/uploads")); // Carpeta de destino para las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre del archivo
  },
});

export const upload = multer({ storage: storage });

// routes
app.use(customerRoutes);
app.use(staticRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
export default app;
