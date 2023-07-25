import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import dateFormat from "dateformat";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { useRouter } from "next/router";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import { props } from "@lib/DaoPaths";

export interface IAddendum {
  id: number;
  name: string;
  date: Date;
  content: string;
}

const Addendums: React.FC = () => {
  const router = useRouter();
  const { dao, proposal_id } = router.query;
  const proposalContext = React.useContext<IProposalContext>(ProposalContext);
  const addendums = proposalContext.api.value.addendums;
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexWrap: deviceWrapper("wrap", "nowrap"),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: deviceWrapper("100%", "50%"),
          }}
        >
          <CapsInfo
            title={`There are ${addendums.length} ${
              addendums.length === 1 ? "addendum" : "addendums"
            } to this proposal`}
            mb="0"
          />
        </Box>
        {addendums.map((i: IAddendum, c: number) => {
          return (
            <Box
              sx={{
                width: "100%",
                borderRadius: ".3rem",
                border: 1,
                borderColor: "border.main",
                p: "1rem",
                fontSize: ".9rem",
              }}
            >
              <Box
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Typography>{i.name}</Typography>
                <Box
                  sx={{
                    ml: "auto",
                    color: "text.secondary",
                    fontSize: ".8rem",
                  }}
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
                  dao === undefined
                    ? ``
                    : `/${dao}/proposal/${proposal_id}/addendum/${i.id}`
                }
              >
                <Button
                  size="small"
                  endIcon={<NavigateNextIcon />}
                  sx={{ mt: ".5rem" }}
                  disabled
                >
                  Read addendum
                </Button>
              </Link>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Addendums;
