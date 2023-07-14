import { Router } from "express";
import {
  createCustomers,
  createMemberships,
  deleteMembership,
  deletePromo,
  editMembership,
  updateMembership,
  renderCustomers,
  renderPromos,
  createPromos,
  renderPromosCat,
  renderMembershipsReg,
  redeemPromo,
  redeemPromoIntent,
  validMembership,
  loadLoginPage,
  editPromos,
  updatePromos,
  loginIntent,
  loadSignup,
  trySignup,
  staffLogin,
  staffLoginIntent,
  redeemLogin,
  redeemLoginIntent,
  loadRegisterVisit,
  RegisterVisitIntent,
  RegisterVisitSuccess,
  renderVisits,
} from "../controllers/customerController.js";

const router = Router();

// CREAR - membresías
router.post("/add", createCustomers);
router.post("/add-reg", createMemberships);
// ACTUALIZAR - membresías existentes
router.get("/update/:id", editMembership);
router.post("/update/:id", updateMembership);
// ACTUALIZAR - promociones existentes
router.get("/update-promos/:id", editPromos);
router.post("/update-promos/:id", updatePromos);
// CANJEOS - de promociones y confirmación
router.get("/redeem/:id", redeemPromo);
router.post("/redeem/:id", redeemPromoIntent);
// ELIMINACIÓN - de membresías y promociones
router.get("/delete/:id", deleteMembership);
router.get("/delete-promos/:id", deletePromo);
// PROMOCIONES - catálogo general, creación de promos y listar por membresía
router.get("/promociones", renderPromos);
router.post("/add-promo", createPromos);
router.get("/promos-cat/", validMembership, renderPromosCat);
// MEMBRESÍAS - catálogo y registro
router.get("/memberships", renderCustomers);
router.get("/memberships-reg", renderMembershipsReg);
// LOGIN - de encargados para canjear promos
router.get("/login-redeem", redeemLogin);
router.post("/login-redeem", redeemLoginIntent);
// LOGIN - de encargados de sucursal
router.get("/login", staffLogin);
router.post("/login", staffLoginIntent);
// LOGIN - de usuario administrador
router.get("/adm-login", loadLoginPage);
router.post("/adm-login", loginIntent);
// REGISTRO - de membresías
router.get("/register", loadSignup);
router.post("/register", trySignup);
// VISITAS - a sucursales
router.get("/visits", renderVisits);
router.get("/register-visit", loadRegisterVisit);
router.post("/register-visit", RegisterVisitIntent, RegisterVisitSuccess);

export default router;
