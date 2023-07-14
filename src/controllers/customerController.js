import { pool } from "../db.js";
import { upload } from "../app.js";
import multer from "multer";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import flash from "connect-flash";

// Crear membresías
//
export const createMemberships = async (req, res) => {
  const memberQr = req.query.member;
  const newCustomer = req.body;
  await pool.query("INSERT INTO members set ?", [newCustomer]);
  res.redirect("/");
};

// localhost/MEMBERSHIPS
export const renderCustomers = async (req, res) => {
  const memberQr = null;
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  const [rows] = await pool.query("SELECT * FROM members");
  res.render("memberships", { memberQr, userId: userId, members: rows });
};

// localhost/MEMBERSHIPS-REG
export const renderMembershipsReg = (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  const memberQr = req.query.member;
  res.render("memberships-reg", { memberQr, userId: userId });
};

// localhost/PROMOCIONES
export const renderPromos = async (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  const query =
    "SELECT *, DATE_FORMAT(validity, '%d/%M/%Y') AS validity FROM promos";
  const [rows] = await pool.query(query);
  res.render("promociones", { userId: userId, promos: rows });
};

export const createCustomers = async (req, res) => {
  const newCustomer = req.body;
  await pool.query("INSERT INTO members set ?", [newCustomer]);
  res.redirect("/memberships");
};

export const createPromos = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.log("Error en la carga del archivo:", err);
    } else if (err) {
      console.log("Error en el controlador:", err);
    }

    const newPromo = req.body;
    const filename = req.file ? req.file.filename : null;
    newPromo.membershipType = newPromo.membershipType.trim(); // Limpiar espacios en blanco

    const query = "INSERT INTO promos SET ?, image = IFNULL(?, 'default.jpg')";
    await pool.query(query, [newPromo, filename]);
    res.redirect("/promociones");
  });
};

export const updatePromos = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.log("Error en la carga del archivo:", err);
    } else if (err) {
      console.log("Error en el controlador:", err);
    }

    const newPromo = req.body;
    const filename = req.file ? req.file.filename : null;
    newPromo.image = filename;

    const query =
      "UPDATE promos  SET membershipType = ?, title = ?,  description = ?, active = ?, validity = ?,  image = IFNULL(?, image) WHERE id = ?";
    const promoId = req.params.id; // Obtén el ID de la promoción que deseas actualizar desde los parámetros de la ruta

    await pool.query(query, [
      newPromo.membershipType,
      newPromo.title,
      newPromo.description,
      newPromo.active,
      newPromo.validity,
      filename,
      promoId,
    ]);
    res.redirect("/promociones");
  });
};

export const editPromos = async (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  const { id } = req.params;
  const [result] = await pool.query(
    "SELECT id, membershipType, title, description, active, DATE_FORMAT(validity, '%Y-%m-%d %H:%i:%s') AS validity, image FROM promos WHERE id = ?",
    [id]
  );

  res.render("promos_edit", { id, userId: userId, promos: result[0] });
};

// Redeem promotion
export const redeemPromo = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  const memberQr = req.query.member;
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  try {
    const query =
      "SELECT id, membershipType, title, description, active, DATE_FORMAT(validity, '%d/%M/%Y') AS validity, image FROM promos WHERE id = ?";
    const [rows] = await pool.query(query, [id]);
    res.render("redeem-promo", {
      id,
      userId,
      memberQr,
      formattedDate,
      promo: rows,
    });
  } catch (error) {
    // Manejo de errores
    console.log(error);
    res.status(500).send("Error en la Base de Datos"); // Enviar una respuesta de error al cliente
  }
};

export const redeemPromoIntent = async (req, res) => {
  const promoRedeem = req.body;
  const query = "INSERT INTO member_promos SET ?";
  const result = await pool.query(query, [promoRedeem]);
  if ([result.length] === 1) {
    res.json({ message: "Membresía canjeada correctamente" });
  }
  res.redirect("/");
};

export const validMembership = async (req, res, next) => {
  const memberQr = req.query.member;
  const [memberType] = await pool.query(
    `SELECT membership FROM members WHERE variableQR = '${memberQr}'`
  );
  res.locals.mType = memberType[0];
  if (memberType[0] == undefined) {
    res.redirect(`/login?member=${memberQr}`);
  } else {
    next();
  }
};

export const renderPromosCat = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;
  const memberQr = req.query.member;
  const membershipVariable = res.locals.mType.membership;

  try {
    const query = `SELECT *
      FROM promos
      WHERE membershipType = '${membershipVariable}'
        AND validity > CURDATE()
        AND NOT EXISTS (
          SELECT 1
          FROM member_promos
          WHERE promos.id = member_promos.id_promo
        );`;
    const [rows] = await pool.query(query, [memberQr, membershipVariable]);
    res.render("promos-cat", { id, userId, memberQr, promos: rows });
  } catch (error) {
    // Manejo de errores
    console.log(error);
    res.status(500).send("Error al renderizar promos-cat"); // Enviar una respuesta de error al cliente
  }
};

export const editMembership = async (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  const { id } = req.params;
  const [result] = await pool.query("SELECT * FROM members WHERE id = ?", [id]);
  res.render("memberships_edit", { userId, members: result[0] });
};

export const updateMembership = async (req, res) => {
  const { id } = req.params;
  const newMembership = req.body;
  await pool.query("UPDATE members set ? WHERE id = ?", [newMembership, id]);
  res.redirect("/memberships");
};

export const deleteMembership = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM members WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Membresía eliminada correctamente" });
  }
  res.redirect("/memberships");
};

export const deletePromo = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM promos WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Promoción eliminada correctamente" });
  }
  res.redirect("/promociones");
};

export const loadMemberships = (req, res) => {
  res.render("memberships");
};

export const loadSignup = (req, res) => {
  res.render("register");
};

export const trySignup = async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  await user.save();
  res.redirect("/register");
};

export const staffLogin = (req, res) => {
  const userId = req.session.userId;
  const memberQr = req.query.member;
  const error = req.flash("error");
  res.render("login", { memberQr, userId: userId, error });
};

export const redeemLogin = (req, res) => {
  const userId = req.session.userId;
  const memberQr = req.query.member;
  const error = req.flash("error");
  res.render("login-redeem", { memberQr, userId, error });
};

export const redeemLoginIntent = async (req, res) => {
  const memberQr = req.body.variableQR;
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    req.flash("error", "Usuario incorrecto");
    res.redirect("login-redeem");
    return;
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (validPass) {
    req.session.userId = user.id_user;
    req.session.save((error) => {
      if (error) {
        console.error("Error al guardar la sesión:", error);
      } else {
        console.log("La sesión se guardó correctamente");
        console.log(user.id_user);
        res.redirect(`/promos-cat/?member=${memberQr}`);
      }
    });
  } else {
    req.flash("error", "Contraseña incorrecta");
    res.redirect("login-redeem");
  }
};

export const staffLoginIntent = async (req, res, next) => {
  const memberQr = req.body.variableQR;
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    req.flash("error", "Usuario incorrecto");
    res.redirect("login");
    return;
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (validPass) {
    req.session.userId = user.id_user;
    req.session.save((error) => {
      if (error) {
        console.error("Error al guardar la sesión:", error);
      } else {
        console.log("La sesión se guardó correctamente");
        console.log(user.id_user);
        res.redirect(`/memberships-reg?member=${memberQr}`);
      }
    });
  } else {
    req.flash("error", "Contraseña incorrecta");
    res.redirect("login");
  }
};

export const loadLoginPage = (req, res) => {
  const memberQr = null;
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  const error = req.flash("error");
  // Renderizar la vista EJS y pasar la variable userId
  res.render("adm-login", { memberQr, userId: userId, error });
};

export const loginIntent = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    // Usuario no encontrado
    req.flash("error", "Usuario incorrecto");
    res.redirect("/adm-login");
    return;
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (validPass) {
    req.session.userId = user.id_user;
    req.session.save((error) => {
      if (error) {
        console.error("Error al guardar la sesión:", error);
      } else {
        console.log("La sesión se guardó correctamente");
        console.log(user.id_user);
        res.redirect("/memberships");
      }
    });
  } else {
    req.flash("error", "Contraseña incorrecta");
    res.redirect("/adm-login");
  }
};

export const loadRegisterVisit = async (req, res) => {
  const memberQr = req.query.member;
  const userId = req.session.userId;
  const [memberVisit] = await pool.query(
    "SELECT * FROM members WHERE variableQR = ?",
    [memberQr]
  );
  res.render("register-visit", { memberQr, userId, visit: memberVisit[0] });
};

export const RegisterVisitIntent = async (req, res, next) => {
  req.mQR = req.body.memberQr;
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    console.log("Usuario incorrecto");
    res.send("Usuario incorrecto");
    return;
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (validPass) {
    req.session.userId = user.id_user;
    req.session.save((error) => {
      if (error) {
        console.error("Error al guardar la sesión:", error);
      } else {
        console.log("La sesión se guardó correctamente");
        console.log(user.id_user);
      }
    });
  } else {
    console.log("Contraseña incorrecta");
    res.send("Contraseña incorrecta");
  }
  next();
};

export const RegisterVisitSuccess = async (req, res) => {
  const userId = req.session.userId;
  const qR = req.mQR;
  const result = await pool.query(
    "INSERT INTO visits SET id_branch = ?, id_member = ?, id_user_register = ?",
    [userId, qR, userId]
  );
  if (result.affectedRows === 1) {
    res.json({ message: "Membresía eliminada correctamente" });
  }
  res.redirect(`/promos-cat/?member=${qR}`);
};

export const renderVisits = async (req, res) => {
  const memberQr = null;
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión

  const selectedBranch = req.query.id_branch;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  let query =
    "SELECT id_visit, id_branch, id_member, id_user_register, DATE_FORMAT(visitDate, '%d/%m/%Y') AS visitDate FROM visits";

  if (selectedBranch) {
    query += ` WHERE id_branch = '${selectedBranch}' AND visitDate BETWEEN DATE_FORMAT('${startDate}', '%Y-%m-%d') AND DATE_FORMAT('${endDate}', '%Y-%m-%d')`;
    var [rows] = await pool.query(query);
  } else {
    var [rows] = "";
  }
  res.render("visits", { memberQr, userId, visits: rows });
};
