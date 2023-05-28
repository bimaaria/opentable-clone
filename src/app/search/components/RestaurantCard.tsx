import Price from "@/app/components/Price";
import { Cuisine, Item, Location, PRICE } from "@prisma/client";
import Link from "next/link";

interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
}

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {

  return (
    <div className="flex pb-5 ml-4 border-b">
      <img
        src={restaurant.main_image}
        alt={restaurant.slug}
        className="rounded w-44 h-36"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="flex font-light text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>
    </div>  
  )
}

export default RestaurantCard