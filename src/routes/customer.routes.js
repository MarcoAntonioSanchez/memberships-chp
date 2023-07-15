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

router.post("/add", createCustomers);
router.post("/add-reg", createMemberships);
router.post("/add-promo", createPromos);
router.get("/update/:id", editMembership);
router.post("/update/:id", updateMembership);
router.get("/update-promos/:id", editPromos);
router.post("/update-promos/:id", updatePromos);
router.get("/redeem/:id", redeemPromo);
router.post("/redeem/:id", redeemPromoIntent);
router.get("/delete/:id", deleteMembership);
router.get("/delete-promos/:id", deletePromo);
router.get("/promociones", renderPromos);
router.get("/promos-cat/", validMembership, renderPromosCat);
router.get("/memberships", renderCustomers);
router.get("/memberships-reg", renderMembershipsReg);
router.get("/login-redeem", redeemLogin);
router.post("/login-redeem", redeemLoginIntent);
router.get("/login", staffLogin);
router.post("/login", staffLoginIntent);
router.get("/adm-login", loadLoginPage);
router.post("/adm-login", loginIntent);
router.get("/register", loadSignup);
router.post("/register", trySignup);
router.get("/visits", renderVisits);
router.get("/register-visit", loadRegisterVisit);
router.post("/register-visit", RegisterVisitIntent, RegisterVisitSuccess);

export default router;
