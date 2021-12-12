const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate("banks");

      console.log("alert >>");
      console.log(alert);

      res.render("admin/payment/view_payment", {
        payment,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      // console.log(err);
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render("admin/payment/create", { banks });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      // console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { banks, type } = req.body;

      let payment = await Payment({ banks, type });
      await payment.save();

      req.flash("alertMessage", "Berhasil tambah payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      // console.log(err);
    }
  },

  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     const payment = await Payment.findOne({ _id: id });
  //     // console.log(payment);

  //     res.render("admin/payment/edit", {
  //       payment,
  //     });
  //   } catch (err) {
  //     req.flash("alertMessage", `${err.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/payment");
  //     // console.log(err);
  //   }
  // },

  // actionEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { coinName, coinQuantity, price } = req.body;

  //     const payment = await Payment.findOneAndUpdate(
  //       {
  //         _id: id,
  //       },
  //       { coinName, coinQuantity, price }
  //     );

  //     req.flash("alertMessage", "Berhasil ubah payment");
  //     req.flash("alertStatus", "success");

  //     res.redirect("/payment");
  //   } catch (err) {
  //     req.flash("alertMessage", `${err.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/payment");
  //     // console.log(err);
  //   }
  // },

  // actionDelete: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     const payment = await Payment.findOneAndRemove({
  //       _id: id,
  //     });
  //     req.flash("alertMessage", "Berhasil hapus payment");
  //     req.flash("alertStatus", "success");

  //     res.redirect("/payment");
  //   } catch (err) {
  //     req.flash("alertMessage", `${err.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/payment");
  //     // console.log(err);
  //   }
  // },
};