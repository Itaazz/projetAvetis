import mongoose from "mongoose"
import { placeSchema } from "../schemas/placeSchema"

export const PlaceModel =
  mongoose.models.Place || mongoose.model("Place", placeSchema)
