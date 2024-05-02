import Activity, { IActivity } from "@components/dao/activity/Activity";
import { Box, Button, CircularProgress } from "@mui/material";
import { Subheader } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import { useContext, useEffect, useState } from "react";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import { fetcher } from "@lib/utilities";
import useSWR from "swr";
import { useRouter } from "next/router";

const Transactions: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;
  const [transactions, setTransactions] = useState<IActivity[] | null>(null);
  const context = useContext<IGlobalContext>(GlobalContext);
  const daoId = context.api?.daoData?.id;

  const { data: transactionData, error: error } = useSWR(
    daoId && `/dao/treasury/${daoId}/transactions`,
    fetcher
  );

  useEffect(() => {
    const getData = async () => {
      setTransactions(
        transactionData.transactions
          .map(
            (transaction: {
              label: string;
              transaction_id: string;
              time: string | number | Date;
            }) => {
              return {
                name: transaction.label,
                action: "transaction was executed with id",
                value: transaction.transaction_id,
                date: new Date(transaction.time),
                category: transaction.label,
              };
            }
          )
          .slice(0, 10)
      );
    };

    if (transactionData) {
      getData();
    }
  }, [transactionData]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Subheader title="Latest Transactions" />
        <Button
          variant="text"
          sx={{ ml: "auto" }}
          size="small"
          onClick={() => {
            router.push(`/${dao ?? "dao"}/activity`);
          }}
        >
          <Box sx={{ display: deviceWrapper("none", "block") }}>
            View All Activity
          </Box>
          <Box sx={{ display: deviceWrapper("block", "none") }}>View All</Box>
        </Button>
      </Box>
      {transactions ? (
        transactions.map((i: any, c: number) => {
          return <Activity i={i} c={c} key={`transaction-activity-${c}`} />;
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Transactions;
