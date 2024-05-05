import { mw } from "@/api/mw"
import { createPlace, readPlaces } from "@/db/crud"

const handle = mw(async (req, res) => {

  try {
    if (req.method === "GET") {
      const places = await readPlaces()
      res.send(places)
      return
    }

    if (req.method === "POST") {
      const values = req.body
      if (!values) {
        res.status(422).send({ error: "missing values argument" })
        return
      }
      const newPlace = await createPlace(values)
      res.send(newPlace)
      return
    }
  } catch {
    res.status(404).send({ error: "Not found" })
  }
})

export default handle
