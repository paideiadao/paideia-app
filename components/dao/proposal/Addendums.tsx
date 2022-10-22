import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, Button } from "@mui/material";
import * as React from "react";
import dateFormat from "dateformat";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { useRouter } from "next/router";

export interface IAddendum {
  id: number;
  name: string;
  date: Date;
  content: string;
}

const Addendums: React.FC = () => {
  const router = useRouter();
  const { id, proposal_id } = router.query;
  const proposalContext = React.useContext<IProposalContext>(ProposalContext);
  const addendums = proposalContext.api.value.addendums;
  return (
    <>
      {addendums.map((i: IAddendum, c: number) => {
        return (
          <Box
            sx={{
              width: "100%",
              borderRadius: ".3rem",
              border: 1,
              borderColor: "border.main",
              p: ".5rem",
              fontSize: ".9rem",
            }}
          >
            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              {i.name}
              <Box
                sx={{ ml: "auto", color: "text.secondary", fontSize: ".8rem" }}
              >
                {dateFormat(i.date, "mmmm dS, yyyy")}
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                color: "text.secondary",
                fontWeight: ".8rem",
              }}
              dangerouslySetInnerHTML={{
                __html: i.content,
              }}
            />
            <Link
              href={
                id === undefined
                  ? `/dao/proposal/${proposal_id}/addendum/${i.id}`
                  : `/dao/${id}/proposal/${proposal_id}/addendum/${i.id}`
              }
            >
              <Button
                size="small"
                endIcon={<NavigateNextIcon />}
                sx={{ mt: ".5rem" }}
              >
                Read addendum
              </Button>
            </Link>
          </Box>
        );
      })}
    </>
  );
};

export default Addendums;
