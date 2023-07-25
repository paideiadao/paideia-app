import { AppApi } from "@lib/AppApi";
import { AbstractApi } from "@lib/utilities";
import {
  ActionType,
  IProposal,
  IProposalAction,
  VotingType,
} from "@pages/[dao]/proposal/create";

export interface IProposalEndpointBody {
  dao_id: number;
  user_details_id: number;
  name: string;
  image_url: string;
  category: string;
  content: string;
  voting_system?: VotingType;
  references: string[];
  actions?: ActionType[];
  tags?: string[];
  attachments: string[];
  is_proposal: boolean;
}

export default class ProposalApi extends AbstractApi {
  api: AppApi;
  value: IProposal;
  setValue: Function;

  constructor(api: AppApi, value: IProposal, setValue: Function) {
    super();
    this.api = api;
    this.value = value;
    this.setValue = setValue;
    this.setAlert = api.setAlert;
  }

  validData(): Boolean {
    return true;
  }

  cleanData(): IProposalEndpointBody {
    return {
      dao_id: 1,
      user_details_id: this.api.daoUserData.id,
      name: this.value.name,
      image_url: "",
      category: this.value.category,
      content: this.value.content,
      voting_system: this.value.voting_system,
      references: this.value.references,
      actions: this.value.actions.map((i: IProposalAction) => i.data),
      tags: [],
      attachments: [],
      is_proposal: true,
    };
  }

  create(): Promise<any> | void {
    const data = this.cleanData();
    return this.post("/proposals", data);
  }
}
