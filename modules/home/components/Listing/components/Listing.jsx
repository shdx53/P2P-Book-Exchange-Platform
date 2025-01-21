import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSGTFormattedDate } from "@/lib/utils";
import Image from "next/image";
import { statusColors } from "../lib/constants/statusColors";
import AcceptForm from "./AcceptForm/components/AcceptForm";
import RequestForm from "./RequestForm/components/RequestForm";

export default function Listing({ listing, type }) {
  return (
    <>
      {type === "manage requests" || type === "my requests" ? (
        <ListingCard {...listing} type={type} />
      ) : (
        <Dialog>
          <DialogTrigger>
            <ListingCard {...listing} type={type} />
          </DialogTrigger>
          <DialogContent className="max-w-2xl p-0">
            <DialogHeader className="space-y-0">
              <DialogTitle />
              <ModalContent listing={listing} type={type} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

const ListingCard = ({
  imageURL,
  title,
  author,
  type,
  username,
  email,
  createdAt,
  requestId,
  listingId,
  status,
}) => {
  const formattedDate = getSGTFormattedDate(new Date(createdAt));

  let textColor, bgColor;

  if (status) {
    const colors = statusColors[status];
    textColor = colors.textColor;
    bgColor = colors.bgColor;
  }

  return (
    <article className="col-span-1">
      <div className="relative h-72 rounded-t-md bg-muted">
        <ListingImage imageUrl={imageURL} className="object-contain p-6" />
      </div>

      <div className="space-y-4 rounded-b-md border-x-2 border-b-2 border-border p-4 text-start text-sm">
        <div className="space-y-1">
          <p className="font-semibold">{title}</p>
          <p className="text-muted-foreground">by {author}</p>
        </div>

        {type === "manage requests" && (
          <>
            <hr className="border-border" />
            <div className="space-y-1">
              <p className="font-medium">Requested by</p>
              <p>{username}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Email</p>
              <p>{email}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Requested on</p>
              <p>{formattedDate}</p>
            </div>
            <AcceptForm requestId={requestId} listingId={listingId} />
          </>
        )}

        {type === "my requests" && (
          <>
            <div className="space-x-2">
              <span className="font-medium">Status:</span>
              <span
                className={`${textColor} ${bgColor} rounded-md p-2 capitalize`}
              >
                {status}
              </span>
            </div>
          </>
        )}
      </div>
    </article>
  );
};

const ModalContent = ({ listing, type }) => (
  <div className="grid grid-cols-3">
    <div className="col-span-1 bg-muted px-6 py-8">
      <div className="relative h-72">
        <ListingImage imageUrl={listing.imageURL} className="object-cover" />
      </div>
    </div>

    <ListingDetails {...listing} type={type} />
  </div>
);

const ListingImage = ({ imageUrl, className }) => (
  <Image src={imageUrl} alt="Listing image" className={className} fill />
);

const ListingDetails = ({
  title,
  author,
  genre,
  description,
  username,
  createdAt,
  listingId,
  type,
}) => {
  const formattedDate = getSGTFormattedDate(new Date(createdAt));

  return (
    <div className="col-span-2 space-y-6 px-6 py-8">
      <div className="space-y-4">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">
            by {author}, {genre}
          </p>
        </div>
        <p className="text-justify text-sm">{description}</p>
      </div>

      <hr className="border-border" />

      <div className="space-y-4 text-sm">
        <div className="flex gap-6">
          <div>
            <p className="font-medium">Listed by</p>
            <p>{username}</p>
          </div>
          <div>
            <p className="font-medium">Listed on</p>
            <p>{formattedDate}</p>
          </div>
        </div>
        <RequestForm listingId={listingId} />
      </div>
    </div>
  );
};
