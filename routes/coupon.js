const express = require("express");
const router = express.Router();
const Coupon = require("../model/Coupon.js");

// ADD NEW Coupon
router.post("/", async (req, res) => {
  try {
    const { code, discountPercent } = req.body;

    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ error: "This coupon already exists" });
    }
    const newCoupon = new Coupon({ code, discountPercent });
    await newCoupon.save();

    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ send: "Server Error" });
  }
});

// TUM kuponlari GETIRMEK
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ send: "Server Error" });
  }
});

// GET SINGLE KUPON ITEM - BY ID
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;

    try {
      const coupon = await Coupon.findById(couponId);
      res.status(200).json(coupon);
    } catch (error) {
      res.status(404).json({ error: "Coupon Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ send: "Server Error" });
  }
});

// GET SINGLE KUPON ITEM - BY KUPON NAME
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;

    try {
      const coupon = await Coupon.findOne({ code: couponCode });
      const { discountPercent } = coupon;
      res.status(200).json({ discountPercent: discountPercent });
    } catch (error) {
      res.status(404).json({ error: "Coupon Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ send: "Server Error" });
  }
});

// UPDATE COUPON ITEM
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updateCoupon = req.body;

    try {
      const existingCoupon = await Coupon.findById(couponId);
      if (!existingCoupon) {
        return res.status(404).json({ error: "Coupon Not Found" });
      }
      const updatedCoupon = await Coupon.findByIdAndUpdate(
        couponId,
        updateCoupon,
        { new: true }
      );
      res.status(200).json(updatedCoupon);
    } catch (error) {
      res.status(404).json({ error: "Coupon Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ send: "Server Error" });
  }
});

// Coupon DELETE
router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const deleteCoupon = await Coupon.findOneAndDelete(couponId);
    if (!deleteCoupon) {
      return res.status(404).json({ error: "Coupon Not Found" });
    }
    res.status(200).json(deleteCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ send: "Server Error" });
  }
});

module.exports = router;
