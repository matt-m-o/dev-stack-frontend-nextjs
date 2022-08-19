import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/ColorSchemeToggle";

import { useQuery } from "react-query";

export default function HomePage() {
  

  const router = useRouter();
  
  return (
    <>
      <ColorSchemeToggle/>

      <Button
      onClick={ () => router.push('/createStack') }
      >
        Tech Stack Survey
      </Button>
      
    </>
  );
}
