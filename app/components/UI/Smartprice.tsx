interface Price {
    price: string;
  }

export default function Smartprice({ price }:Price) {
  return (
    <div className="py-1 lg:py-2 px-2 lg:px-4 font-[--navy] h-min min-w-max text-sm lg:text-lg">
        <p className="smartprice">{price}</p>
    </div>
  )
}
