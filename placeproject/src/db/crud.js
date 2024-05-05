import { PlaceModel } from "./models/PlaceModel.js"

export const createPlace = async ( values ) => {
  const newPlace = new PlaceModel( values )
  await newPlace.save()
  return newPlace
}

export const readPlaces = async () => await PlaceModel.find()
export const readPlace = async (placeId) => await PlaceModel.findById(placeId)
export const updatePlace = async (
  placeId,
  data
) => {
  const updatedPlace = await PlaceModel.findByIdAndUpdate(placeId, data.data, {
    returnDocument: "after",
  })

  return updatedPlace
}
export const deletePlace = async (placeId) => {
  const place = await PlaceModel.findOneAndDelete({ _id: placeId })

  if (!place) {
    return null
  }

  return place
}
