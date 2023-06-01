import { PRICE } from "@prisma/client"

const Price = ({ price }: { price: PRICE }) => {
  const renderPrice = (): JSX.Element => {
    if(price === PRICE.CHEAP) {
      return <p className="flex mr-3">$</p>
    } else if(price === PRICE.REGULAR) {
      return <p className="flex mr-3">$$</p>
    } else {
      return <p className="flex mr-3">$$$</p>
    }
  }
  
  return renderPrice()
}

export default Price
