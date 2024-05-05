import axios from "axios"
import { useRouter } from "next/router"
import { Button } from "@/components/Button"
import Link from "next/link"

export const getServerSideProps = async ({ query }) => {
    const place = await axios.get(
      `http://localhost:3000/api/places/${query.placeId}`
    )

    const data = place.data
    return { props : { data } }
}

const PlaceDetailsPage = ({ data }) => {
  const router = useRouter()
  const handleDelete = async (placeId) => {
    await axios.delete(`http://localhost:3000/api/places/${placeId}`)
  }

  const formatFreeOrNot = data.freeOrNot ? "free" : "not free"
  const freeOrNotPrice = data.freeOrNot ? "" : ` (${data.orNotPrice}$)`

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
    <div>
      <h1 className="text-3xl font-bold mb-4">Place details</h1>
    </div>
    <div>
      <p className="text-lg mb-2">The place name is : {data.name}</p>
      <p className="text-lg mb-2">The category is : {data.category}</p>
      <p className="text-lg mb-2">The address is : {data.address}</p>
      <p className="text-lg mb-2">The city is : {data.city}</p>
      <p className="text-lg mb-2">The ZIP Code is : {data.zipCode}</p>
      <p className="text-lg mb-2">The Country is : {data.country}</p>

      {data.category === "Restaurant" && (
        <div>
          <p className="text-lg mb-2">The food type is : {data.foodType}</p>
          <p className="text-lg mb-2">The restaurant is {data.stars} stars</p>
          <p className="text-lg mb-2">The average price is : {data.averagePrice}</p>
        </div>
      )}
      {data.category === "Museum" && (
        <div>
          <p className="text-lg mb-2">The artistic trend is : {data.artisticTrends}</p>
          <p className="text-lg mb-2">The art type is {data.artType}</p>
          <p className="text-lg mb-2">The museum is : {formatFreeOrNot}{freeOrNotPrice}</p>
        </div>
      )}
      {data.category === "Bar" && (
        <div>
          <p className="text-lg mb-2">The bar type is : {data.barType}</p>
          <p className="text-lg mb-2">The average price is : {data.averagePrice}</p>
        </div>
      )}
      {data.category === "Parc" && (
        <div>
          <p className="text-lg mb-2">The parc type is : {data.parcType}</p>
          <p className="text-lg mb-2">The parc is : {data.isPublic ? "public" : "private"}</p>
          <p className="text-lg mb-2">The parc is : {formatFreeOrNot}{freeOrNotPrice}</p>
        </div>
      )}
    </div>

    <div className="flex space-x-4 mt-8">
      <div className="flex-grow">
        <Button
          onClick={() => handleDelete(data._id)}
          size="md"
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded shadow"
        >
          DELETE
        </Button>
      </div>
      <Link href={`/places/${data._id}/edit`}>
        <Button 
          size="md"
          className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-6 rounded shadow"
        >
          Edit
        </Button>
      </Link>
    </div>
  </div>
  )
}

export default PlaceDetailsPage
