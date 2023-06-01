import { Review } from "@prisma/client"
import ReviewCard from "./ReviewCard"

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="pb-5 mt-10 text-3xl font-bold mb-7 borber-b">
        What {reviews.length} {reviews.length === 1 ? "person" : "people"} are saying
      </h1>
      <div>
        {reviews.map(review => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
    </div>
  )
}

export default Reviews
