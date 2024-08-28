import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

export function ImageCard({ id, title, image, price, icon1, icon2, button, button1 }) {
  const author = useSelector(state => state.auth.author)
  return (
    <Card className=" mt-12 w-[240px] bg-black/10 h-[300px] pt-4 pb-4 lg:pt-0 lg:pb-0 lg:w-[250px] lg:h-[300px] m-6 mb-12 " id={id}>
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
        <div className=" flex items-end justify-between     ">
          {
            icon1
          }

          {
            icon2
          }
          {
            button
          }
          {
            button1
          }
        </div>
      </CardFooter>
    </Card>
  );
}
