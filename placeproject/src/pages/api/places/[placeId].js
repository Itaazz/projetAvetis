import { mw } from "@/api/mw"
import { deletePlace, readPlace, updatePlace } from "@/db/crud"

const handle = mw(async (req, res) => {
  const { placeId } = req.query

  if (req.method === "GET") {
    const place = await readPlace(placeId)
    if (!place) {
      res.status(404).send({ error: "Not found" })
      return
    }
    res.send(place)
    return
  }

  if (req.method === "PATCH") {
    const data = req.body
    const updatedPlace = await updatePlace(placeId, { data })

    if (!updatedPlace) {
      res.status(404).send({ error: "Not found" })
      return
    }
    res.send(updatedPlace)
    return
  }

  if (req.method === "DELETE") {
    const placeToBeDelete = await deletePlace(placeId)

    if (!placeToBeDelete) {
      res.status(404).send({ error: "Not found" })
      return
    }

    res.send(placeToBeDelete)
    return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle
