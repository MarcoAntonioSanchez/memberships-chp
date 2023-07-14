import { Router } from "express";
import {
  loadPizzarellena,
  loadPizzatradicional,
  loadExtras,
  loadHome,
  loadSucursales,
} from "../controllers/staticController.js";
const router = Router();

// HOME - main page
router.get("/", loadHome);
// STATIC - catalogues
router.get("/pizzarellena", loadPizzarellena);
router.get("/pizzatradicional", loadPizzatradicional);
router.get("/extras", loadExtras);
router.get("/sucursales", loadSucursales);

export default router;
