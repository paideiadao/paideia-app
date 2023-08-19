import { Box, TextField, Button, Modal, Collapse } from "@mui/material";
import * as React from "react";
import { Header } from "@components/creation/utilities/HeaderComponents";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import { IObj } from "@lib/Interfaces";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Status from "@components/utilities/Status";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";
import { LoadingButton } from "@mui/lab";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import { IUserSettings } from "@lib/dao/users/Interfaces";
import SettingsApi from "@lib/dao/users/SettingsApi";
import { fetcher, getDaoPath } from "@lib/utilities";
import { id } from "date-fns/locale";
import useSWR from "swr";
import { useRouter } from "next/router";
import useDidMountEffect from "@components/utilities/hooks";
import CancelLink from "@components/utilities/CancelLink";

interface INotification {
  label: string;
  value: keyof IUserSettings;
}

const notifications: INotification[] = [
  {
    label: "A comment is made in a proposal I created",
    value: "createProposal",
  },
  {
    label: "A vote is casted in a proposal I created",
    value: "voteCastCreatedProposal",
  },
  { label: "A proposal I voted on ends", value: "proposalVotedEnded" },
  {
    label: "A proposal I voted on gets a new addendum",
    value: "votedAddendum",
  },
  { label: "A proposal I voted on is approved", value: "voteOnApproved" },
  { label: "A proposal I voted on is denied", value: "voteOnDenied" },
  { label: "A reply is written to a comment I made", value: "commentReply" },
  {
    label: "A user I follow creates a proposal",
    value: "followingNewProposal",
  },
  {
    label: "A DAO termination proposal is created",
    value: "terminationProposal",
  },
];

const EditNotifications: React.FC<{ params: any }> = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [value, setValue] = React.useState<IUserSettings>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const settingsApi = new SettingsApi(globalContext.api, value, setValue);
  const router = useRouter();
  const { id } = router.query;

  const { data: userSettingsData, error: userSettingsError } = useSWR(
    settingsApi.api.daoUserData != null &&
      `/users/profile/settings?user_details_id=${settingsApi.api.daoUserData.id}`,
    fetcher
  );

  React.useEffect(() => {
    if (userSettingsData) {
      setValue(userSettingsData.settings);
    }
  }, [userSettingsData]);

  return (
    <Layout>
      {value !== undefined && (
        <>
          <Header title="Notification settings" large />
          <LabeledSwitch
            title="Notify me through emails"
            value={value.showEmail}
            onChange={() => setValue({ ...value, showEmail: !value.showEmail })}
            small
          />
          <Collapse in={value.showEmail}>
            <TextField
              value={value.emailAddress}
              label="Email Address"
              sx={{ width: "100%" }}
              onChange={(e: any) =>
                setValue({ ...value, emailAddress: e.target.value })
              }
            />
          </Collapse>
          <Collapse in={value.showPhone}>
            <TextField
              value={value.phoneNumber}
              label="Phone number"
              sx={{ width: "100%" }}
              onChange={(e: any) =>
                setValue({ ...value, phoneNumber: e.target.value })
              }
            />
          </Collapse>
          <Collapse in={value.showEmail || value.showPhone}>
            <Box sx={{ width: "100%", mt: "1.5rem", fontSize: ".9rem" }}>
              Notify me when
              <FormGroup>
                {notifications.map((i: INotification) => (
                  <FormControlLabel
                    disableTypography
                    control={
                      <Checkbox
                        checked={value[i.value] as boolean}
                        size="small"
                        onClick={() =>
                          setValue({ ...value, [i.value]: !value[i.value] })
                        }
                      />
                    }
                    label={i.label}
                    sx={{
                      mt: ".25rem",
                      mb: ".25rem",
                      fontSize: deviceWrapper(".8rem", ".9rem"),
                    }}
                  />
                ))}
              </FormGroup>
            </Box>
          </Collapse>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "1rem",
            }}
          >
            <CancelLink>
              <Button
                variant="outlined"
                sx={{ width: "49%", mr: ".5rem" }}
                size="small"
              >
                Cancel
              </Button>
            </CancelLink>
            <LoadingButton
              disabled
              variant="contained"
              sx={{ width: "49%" }}
              size="small"
              loading={loading}
              loadingPosition="center"
              onClick={async () => {
                try {
                  setLoading(true);
                  await settingsApi.edit();
                  settingsApi.api.showAlert(
                    "Successfully updated user settings",
                    "success"
                  );
                } catch (e) {
                  settingsApi.error("Unable to update settings");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Box sx={{ display: deviceWrapper("none", "block") }}>
                Save Changes
              </Box>
              <Box sx={{ display: deviceWrapper("block", "none") }}>Save</Box>
            </LoadingButton>
          </Box>
        </>
      )}
    </Layout>
  );
};

export default EditNotifications;
