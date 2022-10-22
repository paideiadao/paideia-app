import WalletSelector from "@components/creation/governance/WalletSelector";
import {
  CapsInfo,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import { useWallet } from "@components/wallet/WalletContext";
import { IWallet } from "@lib/creation/Interfaces";
import { Box, Button, InputAdornment, TextField, Modal } from "@mui/material";
import * as React from "react";
import { modalBackground } from "@components/utilities/modalBackground";
import { deviceWrapper } from "@components/utilities/Style";
import CancelLink from "@components/utilities/CancelLink";
const WithdrawForm: React.FC = () => {
  const { wallet } = useWallet();
  const [holder, setHolder] = React.useState<IWallet>({
    alias: "Alone Musk",
    address: wallet,
    img: "",
  });
  const ticker = "PAI",
    available = "50,000";
  const [withdraw, setWithdraw] = React.useState<boolean>(false);
  const openWithdraw = () => setWithdraw(true);
  const closeWithdraw = () => setWithdraw(false);
  const [value, setValue] = React.useState<number>(100);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value));
  };
  return (
    <Box>
      <CapsInfo title="Withdrawal Form" mb=".5rem" />
      <Subtitle subtitle="Description here....." />
      <Box sx={{ mt: "1rem" }} />
      <WalletSelector
        id="staking-wallet-input"
        data={{
          alias: "Alone Musk",
          address: wallet,
          img: "",
        }}
        number={1}
        set={(j: any) => {
          setHolder(j);
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center", mt: "1rem" }}>
        <TextField
          label="Amount of tokens to stake"
          sx={{ width: deviceWrapper("90%", "45%") }}
          size="medium"
          value={value}
          type="number"
          onChange={handleChange}
          helperText={`${available} ${ticker} available`}
          InputProps={{
            inputProps: {
              min: 1,
              max: 50000,
            },
            endAdornment: (
              <InputAdornment position="end">{ticker}</InputAdornment>
            ),
          }}
        />
        <Button
          variant="text"
          size="small"
          sx={{ ml: ".5rem" }}
          onClick={() => setValue(50000)}
        >
          Max
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "2rem",
        }}
      >
        <CancelLink>
          <Button
            variant="outlined"
            sx={{ width: "50%", mr: "1rem" }}
            size="small"
          >
            Cancel
          </Button>
        </CancelLink>

        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={openWithdraw}
          size="small"
        >
          Withdraw
        </Button>
      </Box>
      {/* <Modal open={withdraw} onClose={closeWithdraw}>
        <Box
          sx={{
            ...modalBackground,
            backgroundColor: "fileInput.main",
            width: "30rem",
            pb: ".5rem",
          }}
        >
          Withdraw confirm here...
        </Box>
      </Modal> */}
    </Box>
  );
};

export default WithdrawForm;
