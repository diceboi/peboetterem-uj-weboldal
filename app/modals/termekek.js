import mongoose from "mongoose";

const TermekekSchema = new mongoose.Schema(
  {
    nev: String,
    elsodlegesar: String,
    masodlagosar: String,
    allergenek: String,
    kategoria: String,
    elsoelotag: String,
    masodikelotag: String,
  },
  {
      timestamps: true,
  }
);

const Termekek = mongoose.models.Termekek || mongoose.model("Termekek", TermekekSchema);

export default Termekek;
