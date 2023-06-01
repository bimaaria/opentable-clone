import { Stars } from "@/app/components/Stars"
import { calculateReview } from "@/app/utils/CalculateReview"
import { Review } from "@prisma/client"

const Rating = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="flex items-end">
      <div className="flex items-center mt-2 ratings">
        <Stars reviews={reviews} />
        <p className="ml-3 text-reg">{calculateReview(reviews)}</p>
      </div>
      <div>
        <p className="ml-4 text-reg">
          {reviews.length} Review{reviews.length === 1 ? "": "s"}
        </p>
      </div>
    </div>
  )
}

export default Rating
