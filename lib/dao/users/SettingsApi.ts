import { AppApi } from "@lib/AppApi";
import { AbstractApi } from "@lib/utilities";
import { IUserSettings } from "./Interfaces";

const defaultSettingsData: IUserSettings = {
  showEmail: false,
  emailAddress: "",
  showPhone: false,
  phoneNumber: "",
  createProposal: false,
  voteCastCreatedProposal: false,
  proposalVotedEnded: false,
  votedAddendum: false,
  voteOnApproved: false,
  voteOnDenied: false,
  commentReply: false,
  followingNewProposal: false,
  terminationProposal: false,
};

export default class SettingsApi extends AbstractApi {
  api: AppApi;
  value: IUserSettings;
  setValue: (val: IUserSettings) => void;

  constructor(
    api: AppApi,
    value: IUserSettings,
    setValue: (val: IUserSettings) => void
  ) {
    super();
    this.api = api;
    this.value = value;
    this.setValue = setValue;
    this.setAlert = api.setAlert;
  }

  edit(): Promise<any> | void {
    return this.put(
      `/users/profile/settings?user_details_id=${this.api.daoUserData.id}`,
      {
        settings: this.value,
      }
    );
  }
}
