import { Header } from "@components/creation/utilities/HeaderComponents";
import { Button } from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useRouter } from "next/router";

const Termination: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;
  return (
    <>
      <Header
        mb=".25rem"
        title="DAO termination"
        subtitle="If you wish, you can terminate the DAO. This will delete it forever and divides the treasury as decided. You can either send the treasury to whitelisted addresses, or divide equally between all the members of the DAO. Keep in mind that this process would go through a proposal."
      />
      <Link href={`/${dao}/dao-config/terminate`}>
        <Button
          disabled
          endIcon={<DeleteIcon />}
          color="error"
          variant="contained"
          size="small"
        >
          TERMINATE DAO
        </Button>
      </Link>
    </>
  );
};

export default Termination;
