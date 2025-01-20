import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSGTFormattedDate } from "@/lib/utils";
import Image from "next/image";
import RequestForm from "./RequestForm";

export default function Listing({ listing }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Trigger {...listing} />
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="space-y-0">
          <DialogTitle />
          <Description {...listing} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const Trigger = ({ imageURL, title, author }) => (
  <article className="col-span-1">
    <div className="relative h-72 rounded-t-md bg-muted">
      <Image
        src={imageURL}
        alt="Listing image"
        className="object-contain p-6"
        fill
      />
    </div>

    <div className="space-y-1 rounded-b-md border-x-2 border-b-2 border-muted p-4 text-start text-sm">
      <p className="font-semibold">{title}</p>
      <p className="text-muted-foreground">by {author}</p>
    </div>
  </article>
);

const Description = ({
  imageURL,
  title,
  author,
  genre,
  description,
  listedBy,
  createdAt,
}) => {
  const formattedDate = getSGTFormattedDate(new Date(createdAt));

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 bg-muted px-6 py-8">
        <div className="relative h-72">
          <Image
            src={imageURL}
            alt="Listing image"
            className="object-cover"
            fill
          />
        </div>
      </div>

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

        <hr className="border-muted" />

        <div className="text-sm space-y-4">
          <div className="flex gap-6">
            <div>
              <p className="font-medium">Listed by</p>
              <p>{listedBy}</p>
            </div>
            <div>
              <p className="font-medium">Listed on</p>
              <p>{formattedDate}</p>
            </div>
          </div>
          <RequestForm />
        </div>
      </div>
    </div>
  );
};
