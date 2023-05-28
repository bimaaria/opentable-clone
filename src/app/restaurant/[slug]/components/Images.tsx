const Images = ({ images, slug }: { images: string[], slug: string }) => {
  return (
    <div>
      <h1 className="pb-5 mt-10 text-3xl font-bold border-b mb-7">
        {images.length + 1} photos
      </h1>
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <img
            key={slug + index + 1}
            className="w-56 mb-1 mr-1 h-44"
            src={image}
            alt={slug + index + 1}
          />
        ))}
      </div>
    </div>
  )
}

export default Images
