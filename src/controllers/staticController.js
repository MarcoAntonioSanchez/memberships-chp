export const loadPizzarellena = (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión

  res.render("pizzarellena", { userId: userId });
};

export const loadPizzatradicional = (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  res.render("pizzatradicional", { userId: userId });
};

export const loadExtras = (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  res.render("extras", { userId: userId });
};

export const loadSucursales = (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  res.render("sucursales", { userId: userId });
};

export const loadHome = async (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario de la sesión
  const memberQr = req.query.member;
  res.render("home", { memberQr, userId: userId });
};
