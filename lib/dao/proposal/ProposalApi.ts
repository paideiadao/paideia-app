import { AppApi } from "@lib/AppApi";
import { AbstractApi } from "@lib/utilities";
import {
  ActionType,
  ICreateProposalErrors,
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
  errors: ICreateProposalErrors;
  setErrors: Function;

  constructor(
    api: AppApi,
    value: IProposal,
    setValue: Function,
    errors: ICreateProposalErrors,
    setErrors: Function
  ) {
    super();
    this.api = api;
    this.value = value;
    this.setValue = setValue;
    this.errors = errors;
    this.setErrors = setErrors;
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
      // @ts-ignore
      actions: this.value.actions
        .map((i: IProposalAction) => i.data)
        .filter((data) => data !== undefined),
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
