import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { averagePriceValidator, booleanValidator, numberPriceValidator, numberValidator, starsValidator, stringValidator } from "@/validators"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"


export const getServerSideProps = async ({ query: { placeId } }) => {
  const { data: place } = await axios(
    `http://localhost:3000/api/places/${placeId}`,
  )

  return { props: { place } }
}

const validationSchema = yup.object({
  name: stringValidator,
  category: stringValidator,
  address: stringValidator,
  city: stringValidator,
  zipCode: numberValidator,
  country: stringValidator,
  averagePrice: averagePriceValidator,
  stars: starsValidator,
  freeOrNot: booleanValidator,
  orNotPrice: numberPriceValidator,
  isPublic: booleanValidator
})


const PlaceEditPage = ({ place }) => {
  const router = useRouter()
  const handleEdit = async (values) => {
    await axios.patch(`http://localhost:3000/api/places/${place._id}`, values)
    router.push("/")
  }

  return (
    <Formik
      initialValues={place}
      validationSchema={validationSchema}
      onSubmit={handleEdit}
    >
    {({ values }) => (
        <Form className="grid grid-cols-2 gap-4">
        <FormField
          name="name"
          placeholder="Enter a description"
          label="Place name"
        />
        <FormField
          name="category"
          placeholder="Choose a category"
          label="Category"
          as="select"
        >
          <option value =""> Select a category </option>
          <option value ="Restaurant"> Restaurant </option>
          <option value ="Museum"> Musée </option>
          <option value ="Bar"> Bar </option>
          <option value ="Parc"> Parc </option>
        </FormField>
        <FormField
          name="address"
          placeholder="Enter the address"
          label="Address"
        />
        <FormField
          name="city"
          placeholder="Enter the city"
          label="City"
        />
        <FormField
          name="zipCode"
          placeholder="Enter the ZIP code"
          label="ZIP Code"
        />
        <FormField
          name="country"
          placeholder="Enter the country"
          label="Country"
        />
        {values.category === "Restaurant" && (
          <>
            <FormField
              name="foodType"
              placeholder="Enter food type"
              label="Food Type"
            />
            <FormField
            name="stars"
            label="Stars from 1 to 3"
            />
            <FormField
            name="averagePrice"
            label="Enter average price from 1 to 5 (1 is cheap and 5 expensive)"
            />
          </>
        )}
        {values.category === "Museum" && (
          <>
            <FormField
              name="artisticTrends"
              placeholder="Enter artistic trend"
              label="Artistic Trends"
            />
            <FormField
              name="artType"
              placeholder="Enter art type"
              label="Art Type"
            />
            <FormField className ="bg-gray-100 hover:bg-gray-200 text-black py-2 px-4 rounded shadow"
              name="freeOrNot"
              type="checkbox"
              label="Is it free ?"
            />
            {values.freeOrNot === false &&(
              <FormField
                name="orNotPrice"
                placeholder="Enter price"
                label="Enter the price (in $)"
              />
            )}
          </>
        )}
        {values.category === "Bar" && (
          <>
            <FormField
              name="barType"
              placeholder="Enter bar type"
              label="Bar Type"
            />
            <FormField
            name="averagePrice"
            label="Enter average price from 1 to 5 (1 is cheap and 5 expensive)"
            />
          </>
        )}
        {values.category === "Parc" && (
          <>
            <FormField
              name="parcType"
              placeholder="Enter parc type"
              label="Parc Type"
            />
            <FormField className ="bg-gray-100 hover:bg-gray-200 text-black py-2 px-4 rounded shadow"
              name="isPublic"
              type="checkbox"
              label="Public or Private (check the box if it's public)"
            />
            <FormField className ="bg-gray-100 hover:bg-gray-200 text-black py-2 px-4 rounded shadow"
              name="freeOrNot"
              type="checkbox"
              label="Is it free ?"
            />
            {values.freeOrNot === false &&(
              <FormField
                name="orNotPrice"
                placeholder="Enter price"
                label="Enter the price (in $)"
              />
            )}
          </>
        )}
        <div className="col-span-2 flex justify-center">
        <Button
          className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-6 rounded shadow w-full" 
          type="submit"
        >
          Save
        </Button>
      </div>
    </Form>
      )}
    </Formik>
  )
}

export default PlaceEditPage
