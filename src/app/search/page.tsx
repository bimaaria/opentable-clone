import { PrismaClient } from "@prisma/client"
import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import Sidebar from "./components/Sidebar"

const prisma = new PrismaClient();

const fetchRestaurantByCity = async (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true
  }

  if(!city) return await prisma.restaurant.findMany({select});
  
  const restaurant = await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase()
        }
      }
    },
    select
  });

  return restaurant;
} 

const Search = async ({ searchParams }: { searchParams: { city: string }}) => {
  const restaurants = await fetchRestaurantByCity(searchParams.city);
  
  return (
    <>
      <Header />
      <div className="flex items-start justify-between w-2/3 py-4 m-auto">
        <Sidebar />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map(restaurant => (
              <RestaurantCard restaurant={restaurant} /> 
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

