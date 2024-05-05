// Importations de modules
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"

export const getServerSideProps = async () => {
  const { data: places } = await axios("http://localhost:3000/api/places")

  return {
    props: { initialPlaces: Object.values(places) }
  }
}

const IndexPage = ({ initialPlaces }) => {
  const [places, setPlaces] = useState(initialPlaces)
  const [filterCategory, setFilterCategory] = useState(null)
  const [filterCountry, setFilterCountry] = useState(null)

  const [categories, setCategories] = useState([])
  const [countries, setCountries] = useState([])
  const [foodTypes, setFoodTypes] = useState([])
  const [barTypes, setBarTypes] = useState([])
  const [artisticTrends, setArtisticTrends] = useState([])
  const [artTypes, setArtTypes] = useState([])
  const [freeOrNotOptions, setFreeOrNotOptions] = useState([])
  const [parcTypes, setParcTypes] = useState([])

  const [averagePriceFilter, setAveragePriceFilter] = useState(1)
  const [starsFilter, setStarsFilter] = useState(1)
  const [foodTypeFilter, setFoodTypeFilter] = useState(null)
  const [barTypeFilter, setBarTypeFilter] = useState(null)
  const [artisticTrendFilter, setArtisticTrendFilter] = useState(null)
  const [artTypeFilter, setArtTypeFilter] = useState(null)
  const [freeOrNotFilter, setFreeOrNotFilter] = useState(null)
  const [parcTypeFilter, setParcTypeFilter] = useState(null)
  const [isPublicFilter, setIsPublicFilter] = useState(null)

  const [showAveragePriceFilter, setShowAveragePriceFilter] = useState(false)
  const [showStarsFilter, setShowStarsFilter] = useState(false)
  const [showFoodTypeFilter, setShowFoodTypeFilter] = useState(false)
  const [showBarTypeFilter, setShowBarTypeFilter] = useState(false)
  const [showArtisticTrendFilter, setShowArtisticTrendFilter] = useState(false)
  const [showArtTypeFilter, setShowArtTypeFilter] = useState(false)
  const [showFreeOrNotFilter, setShowFreeOrNotFilter] = useState(false)
  const [showParcTypeFilter, setShowParcTypeFilter] = useState(false)


  useEffect(() => {
    const uniqueCategories = [...new Set(initialPlaces.map(place => place.category))]
    setCategories(uniqueCategories)
  }, [initialPlaces])

  useEffect(() => {
    let uniqueCountries = []

    if (filterCategory) {
      const filteredPlacesByCategory = initialPlaces.filter(place => place.category === filterCategory)
      uniqueCountries = [...new Set(filteredPlacesByCategory.map(place => place.country))]
    } else {
      uniqueCountries = [...new Set(initialPlaces.map(place => place.country))]
    }

    setCountries(uniqueCountries)
  }, [filterCategory, initialPlaces])

  useEffect(() => {
    let uniqueFoodTypes = []

    if (filterCategory === "Restaurant") {
      const filteredPlacesByCategory = initialPlaces.filter(place => place.category === filterCategory)
      uniqueFoodTypes = [...new Set(filteredPlacesByCategory.map(place => place.foodType))]
    }

    setFoodTypes(uniqueFoodTypes)
  }, [filterCategory, initialPlaces])

  useEffect(() => {
    let uniqueBarTypes = []

    if (filterCategory === "Bar") {
      const filteredPlacesByCategory = initialPlaces.filter(place => place.category === filterCategory)
      uniqueBarTypes = [...new Set(filteredPlacesByCategory.map(place => place.barType))]
    }

    setBarTypes(uniqueBarTypes)
  }, [filterCategory, initialPlaces])

  useEffect(() => {
    let uniqueArtisticTrends = []

    if (filterCategory === "Museum") {
      const filteredPlacesByCategory = initialPlaces.filter(place => place.category === filterCategory)
      uniqueArtisticTrends = [...new Set(filteredPlacesByCategory.map(place => place.artisticTrends))]
    }

    setArtisticTrends(uniqueArtisticTrends)
  }, [filterCategory, initialPlaces])

  useEffect(() => {
    let uniqueArtTypes = []

    if (filterCategory === "Museum") {
      const filteredPlacesByCategory = initialPlaces.filter(place => place.category === filterCategory)
      uniqueArtTypes = [...new Set(filteredPlacesByCategory.map(place => place.artType))]
    }

    setArtTypes(uniqueArtTypes)
  }, [filterCategory, initialPlaces])

  useEffect(() => {
    let uniqueFreeOrNotOptions = []

    if (filterCategory === "Museum" || filterCategory === "Parc") {
      const filteredPlacesByCategory = initialPlaces.filter(place => place.category === filterCategory)
      uniqueFreeOrNotOptions = [...new Set(filteredPlacesByCategory.map(place => place.freeOrNot))]
    }

    setFreeOrNotOptions(uniqueFreeOrNotOptions)
  }, [filterCategory, initialPlaces])

  useEffect(() => {
    let uniqueParcTypes = []

    if (filterCategory === "Parc") {
      const filteredPlacesByCategory = initialPlaces.filter(place => place.category === filterCategory)
      uniqueParcTypes = [...new Set(filteredPlacesByCategory.map(place => place.parcType))]
    }

    setParcTypes(uniqueParcTypes)
  }, [filterCategory, initialPlaces])

  const filterPlaces = () => {
    let filteredPlaces = initialPlaces

    if (filterCategory) {
      filteredPlaces = filteredPlaces.filter(place => place.category === filterCategory)
    }
    if (filterCountry) {
      filteredPlaces = filteredPlaces.filter(place => place.country === filterCountry)
    }
    if (filterCategory === "Restaurant" || filterCategory === "Bar") {
      filteredPlaces = filteredPlaces.filter(place => place.averagePrice >= averagePriceFilter)
    }
    if (filterCategory === "Restaurant" && starsFilter) {
      filteredPlaces = filteredPlaces.filter(place => place.stars === starsFilter)
    }
    if (filterCategory === "Restaurant" && foodTypeFilter) {
      filteredPlaces = filteredPlaces.filter(place => place.foodType === foodTypeFilter)
    }
    if (filterCategory === "Bar" && barTypeFilter) {
      filteredPlaces = filteredPlaces.filter(place => place.barType === barTypeFilter)
    }
    if (filterCategory === "Museum" && artisticTrendFilter) {
      filteredPlaces = filteredPlaces.filter(place => place.artisticTrends === artisticTrendFilter)
    }

    if (filterCategory === "Museum" && artTypeFilter) {
      filteredPlaces = filteredPlaces.filter(place => place.artType === artTypeFilter)
    }
    if ((filterCategory === "Museum" || filterCategory === "Parc") && freeOrNotFilter !== null && freeOrNotFilter !== "") {
      filteredPlaces = filteredPlaces.filter(place => place.freeOrNot === (freeOrNotFilter === "true"))
    }
    if (filterCategory === "Parc" && parcTypeFilter) {
      filteredPlaces = filteredPlaces.filter(place => place.parcType === parcTypeFilter)
    }
    if (filterCategory === "Parc" && isPublicFilter !== null && isPublicFilter !== "") {
      filteredPlaces = filteredPlaces.filter(place => place.isPublic === (isPublicFilter === "true"))
    }

    return filteredPlaces
  }

  useEffect(() => {
    setPlaces(filterPlaces())
  }, [filterCategory, filterCountry, averagePriceFilter, starsFilter, foodTypeFilter, barTypeFilter, artisticTrendFilter, artTypeFilter, freeOrNotFilter, parcTypeFilter, isPublicFilter])


  useEffect(() => {
    setShowAveragePriceFilter(filterCategory === "Restaurant" || filterCategory === "Bar")
  }, [filterCategory])

  useEffect(() => {
    setShowStarsFilter(filterCategory === "Restaurant")
  }, [filterCategory])

  useEffect(() => {
    setShowFoodTypeFilter(filterCategory === "Restaurant")
  }, [filterCategory])

  useEffect(() => {
    setShowBarTypeFilter(filterCategory === "Bar")
  }, [filterCategory])

  useEffect(() => {
    setShowArtisticTrendFilter(filterCategory === "Museum")
  }, [filterCategory])

  useEffect(() => {
    setShowArtTypeFilter(filterCategory === "Museum")
  }, [filterCategory])

  useEffect(() => {
    setShowFreeOrNotFilter(filterCategory === "Museum" || filterCategory === "Parc")
  }, [filterCategory])

  useEffect(() => {
    setShowParcTypeFilter(filterCategory === "Parc")
  }, [filterCategory])

  return (
    <div> 
      <div>
        <div className="mb-4">
          <select className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1"
          onChange={e => setFilterCategory(e.target.value)}>
            <option value="">All categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>    
        <div className="mb-4"> 
          <select className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1"
          onChange={e => setFilterCountry(e.target.value)}>
            <option value="">All countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">     
          {showFoodTypeFilter && (
              <select className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1"
              onChange={e => setFoodTypeFilter(e.target.value)}>
                <option value="">All food type</option>
                {foodTypes.map(foodType => (
                  <option key={foodType} value={foodType}>{foodType}</option>
                ))}
              </select>
          )}
        </div> 
        <div className="mb-4">  
          {showBarTypeFilter && (
              <select className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1"
              onChange={e => setBarTypeFilter(e.target.value)}>
                <option value="">All bar type</option>
                {barTypes.map(barType => (
                  <option key={barType} value={barType}>{barType}</option>
                ))}
              </select>
          )}
        </div>
        <div className="mb-4"> 
          {showArtisticTrendFilter && (
              <select className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1"
              onChange={e => setArtisticTrendFilter(e.target.value)}>
                <option value="">All artistic trends</option>
                {artisticTrends.map(trend => (
                  <option key={trend} value={trend}>{trend}</option>
                ))}
              </select>
          )}
        </div>
        <div className="mb-4"> 
          {showArtTypeFilter && (
              <select className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1"
              onChange={e => setArtTypeFilter(e.target.value)}>
                <option value="">All art types</option>
                {artTypes.map(artType => (
                  <option key={artType} value={artType}>{artType}</option>
                ))}
              </select>
          )}
        </div>
        <div className="mb-4"> 
          {showFreeOrNotFilter && (
              <select className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1"
              onChange={e => setFreeOrNotFilter(e.target.value)}>
                <option value="">All</option>
                {freeOrNotOptions.map(option => (
                  <option key={option} value={option}>{option ? "Free" : "Not free"}</option>
                ))}
              </select>
          )}
        </div>
        <div className="mb-4"> 
          {showParcTypeFilter && (
              <select className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1"
              onChange={e => setParcTypeFilter(e.target.value)}>
                <option value="">All parc type</option>
                {parcTypes.map(parcType => (
                  <option key={parcType} value={parcType}>{parcType}</option>
                ))}
              </select>
          )}
        </div>
        <div className="mb-4"> 
          {showAveragePriceFilter && (
            <div className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1">
              <p>Average Price &gt;= {averagePriceFilter}</p>
              <input
                type="range"
                min={1}
                max={5}
                value={averagePriceFilter}
                onChange={e => setAveragePriceFilter(parseInt(e.target.value))}
              />
            </div>
          )}
        </div>
        <div className="mb-4"> 
          {showStarsFilter && (
            <div className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-1">
              <p>Stars: {starsFilter}</p>
              <input
                type="range"
                min={1}
                max={3}
                value={starsFilter}
                onChange={e => setStarsFilter(parseInt(e.target.value))}
              />
            </div>
          )}
        </div>
        <div> 
          {showParcTypeFilter && (
            <div>
              <select onChange={e => setIsPublicFilter(e.target.value)}>
                <option value="">All</option>
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <ul>
            {places.map(({ _id, name }) => (
              <li key={_id} className="bg-white hover:bg-gray-100 rounded shadow p-3 mb-4">
                <Link href={`/places/${_id}`}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default IndexPage