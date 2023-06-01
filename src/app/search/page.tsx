import { PRICE, PrismaClient } from "@prisma/client"
import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import Sidebar from "./components/Sidebar"

interface SearchParams { 
  city?: string, 
  cuisine?: string, 
  price?: PRICE 
}

const prisma = new PrismaClient();

const fetchRestaurantByCity = async (searchParams: SearchParams) => {
  const where: any = {};

  if(searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase()
      }
    }
    where.location = location
  }
  if(searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase()
      }
    }
    where.cuisine = cuisine
  }
  if(searchParams.price) {
    const price = {
      equals: searchParams.price
    }
    where.price = price
  }
  
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true
  }

  return prisma.restaurant.findMany({
    where,
    select
  });;
} 

const fetchLocations = async () => {
  return prisma.location.findMany();
}

const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
}

const Search = async ({ 
  searchParams 
}: { 
  searchParams: { city?: string, cuisine?: string, price?: PRICE }
}) => {
  const restaurants = await fetchRestaurantByCity(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  
  return (
    <>
      <Header />
      <div className="flex items-start justify-between w-2/3 py-4 m-auto">
        <Sidebar 
          cuisines={cuisines} 
          locations={locations} 
          searchParams={searchParams} 
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} /> 
            ))
          ) : (
            <p>Sorry, we found no restaurant in this area</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Search

