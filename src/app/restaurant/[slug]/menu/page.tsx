import { PrismaClient } from "@prisma/client";
import RestaurantNavbar from "../components/RestaurantNavbar";
import Menu from "./components/Menu";

const prisma = new PrismaClient();

const fetchMenus = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      items: true
    }
  })

  if(!restaurant) {
    throw new Error
  }

  return restaurant.items
}

const RestaurantMenu = async ({ 
  params 
}: {
  params: { slug: string };
}) => {
  const menus = await fetchMenus(params.slug)

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow"> 
      <RestaurantNavbar slug={params.slug} />
      <Menu menus={menus} />
    </div>
  )
}

export default RestaurantMenu
