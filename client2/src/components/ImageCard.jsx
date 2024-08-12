import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function ImageCard({ id, title, image, author, price, icon1, icon2 }) {
  return (
    <Card className=" mt-12 lg:w-100 lg:h-[300px] m-6 mb-12 " id={id}>
      <CardHeader color="blue-gray" className="relative ">
        <img
          src={image}
          alt="card-image"
          className="w-full h-[150px] object-cover"
        />
      </CardHeader>
      <CardBody className="h-1">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>

        <Typography variant="h6" color="green">
          ${price}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0  absolute left-0 right-0  bottom-0  ">
        <div className=" flex items-end   ">
          {
            icon1
          }

          {
            icon2
          }
        </div>
      </CardFooter>
    </Card>
  );
}
