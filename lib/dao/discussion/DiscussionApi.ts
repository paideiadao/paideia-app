import { AppApi } from "@lib/AppApi";
import { AbstractApi } from "@lib/utilities";
import { IDiscussion } from "@pages/[dao]/discussion/create";
import { IProposalEndpointBody } from "../proposal/ProposalApi";

export default class DiscussionApi extends AbstractApi {
  api: AppApi;
  value: IDiscussion;
  setValue: Function;

  constructor(api: AppApi, value: IDiscussion, setValue: Function) {
    super();
    this.api = api;
    this.value = value;
    this.setValue = setValue;
    this.setAlert = api.setAlert;
  }

  validData(): Boolean {
    return true;
  }

  cleanData(image_url: string, dao_id: number): IProposalEndpointBody {
    return {
      dao_id: dao_id,
      user_details_id: this.api.daoUserData.id,
      name: this.value.name,
      image_url: image_url,
      category: this.value.category,
      content: this.value.content,
      references: this.value.references,
      attachments: [],
      is_proposal: false,
    };
  }

  create(image_url: string, dao_id: number): Promise<any> | void {
    const data = this.cleanData(image_url, dao_id);
    return this.post("/proposals/", data);
  }
}
