import { Item } from "@prisma/client"
import MenuCard from "./MenuCard"

const Menu = ({menus}: {menus: Item[]}) => {
  return (
    <main className="mt-5 bg-white">
      <div>
        <div className="pb-1 mt-4 mb-1">
          <h1 className="text-4xl font-bold">Menu</h1>
        </div>
        {menus.length ? (
          <div className="flex flex-wrap justify-between">
          {menus.map(menu => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
        </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>This restaurant does not have any menu</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Menu
