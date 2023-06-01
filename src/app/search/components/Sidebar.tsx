import { Cuisine, Location, PRICE } from "@prisma/client"
import Link from "next/link"

const Sidebar = ({ 
  locations, 
  cuisines,
  searchParams
}: { 
  locations: Location[]; 
  cuisines: Cuisine[];
  searchParams: { city?: string, cuisine?: string, price?: PRICE };
}) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "w-full p-2 font-light border rounded-l text-reg"
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className: "w-full p-2 font-light border-t border-b border-r text-reg"
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "w-full p-2 font-light border-t border-b border-r rounded-r text-reg"
    },
  ]
  
  return (
    <div className="w-1/5">
      <div className="flex flex-col pb-4 border-b">
        <h1 className="mb-2">Region</h1>
        {locations.map(location => (
          <Link 
            href={{ 
              pathname: "/search",
              query: {
                ...searchParams,
                city: location.name
              }
            }}
          >
            <p key={location.id} className="font-light capitalize text-reg">{location.name}</p>
          </Link>
        ))}
      </div>
      <div className="pb-4 mt-3 border-b">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map(cuisine => (
          <Link 
            href={{ 
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisine.name
              }
            }}
          >
            <p key={cuisine.id} className="font-light capitalize text-reg">{cuisine.name}</p>
          </Link>
        ))}
      </div>
      <div className="pb-4 mt-3">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({className, label, price}) => (
            <Link 
              href={{ 
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: price
                }
              }}
              className={className}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>  
  )
}

export default Sidebar
