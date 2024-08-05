import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function ImageCard({ id, title, image, author, price }) {
  return (
    <Card className="mt-12 w-96 " id={id}>
      <CardHeader color="blue-gray" className="relative ">
        <img
          src={image}
          alt="card-image"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography color="gray" className="mb-2">
          Author: {author}
        </Typography>
        <Typography variant="h6" color="green">
          ${price}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}
