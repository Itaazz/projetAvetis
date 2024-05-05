import { Schema } from "mongoose"


export const placeSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    zipCode: {type: Number, required: true},
    country: {type: String, required: true},
    foodType: {type: String},
    averagePrice: {type: Number},
    stars: {type: Number},
    artisticTrends: {type: String},
    artType: {type: String},
    freeOrNot: {type: Boolean},
    orNotPrice: {type: Number},
    barType: {type: String},
    parcType: {type: String},
    isPublic: {type: Boolean}
  });
  
  export default placeSchema;
