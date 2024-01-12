import { Typography } from "@material-tailwind/react";
 
export default function SimpleFooter() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2023 Panda Development Corp
      </Typography>      
      <Typography color="blue-gray" className="font-normal">
        Developed by: Arjay Oropesa
      </Typography>     
    </footer>
  );
}