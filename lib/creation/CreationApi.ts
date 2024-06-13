
import {
  ICreationData,
  ISocialLink,
  ITokenHolder,
  IWallet,
} from "@lib/creation/Interfaces";
import { AbstractApi } from "@lib/utilities";

export class CreationApi {
  api?: AbstractApi;
  data: ICreationData;
  setData: Function;

  constructor(
    api: AbstractApi | undefined,
    data: ICreationData,
    setData: Function
  ) {
    this.api = api;
    this.data = data;
    this.setData = setData;
  }

  async createDao(draft: boolean = true): Promise<any> {
    const data = this.cleanData(this.data, draft);
    const res = await this.api?.post<any>("/dao", data);
    return res;
  }

  cleanData(data: ICreationData, draft: boolean): any {
    return {
      dao_name: data.basicInformation.daoName,
      dao_short_description: data.basicInformation.shortDescription,
      dao_url: data.basicInformation.daoUrl,
      governance: {
        is_optimistic: data.governance.quadraticVoting,
        is_quadratic_voting: data.governance.quadraticVoting,
        time_to_challenge__sec: data.governance.timeToChallenge,
        quorum: data.governance.quorum,
        vote_duration__sec: data.governance.voteDuration,
        amount: data.governance.amount === "" ? 0 : data.governance.amount,
        currency: data.governance.currency,
        support_needed: data.governance.supportNeeded,
        governance_whitelist: data.governance.whitelist.map(
          (i: IWallet) => i.address
        ),
      },
      tokenomics: {
        type: data.tokenomics.type,
        token_name: data.tokenomics.tokenName,
        token_ticker: data.tokenomics.tokenTicker,
        // existing token: how to get amount
        token_amount: data.tokenomics.tokenAmount,
        token_image_url: data.tokenomics.tokenImageUrl,
        token_remaining: data.tokenomics.tokenRemaining,
        is_activated: data.tokenomics.activateTokenomics,
        token_holders: data.tokenomics.tokenHolders.map((i: ITokenHolder) => {
          return {
            address: i.address,
            percentage: i.percentage,
            balance: i.balance,
          };
        }),
        /// MVP does not include distributions...
        distributions: [],
      },
      design: {
        theme_id: data.design.theme,
        logo_url: "",
        show_banner: data.design.banner.show,
        banner_url: "",
        show_footer: data.design.footer.show,
        footer_text: data.design.footer.mainText,
        footer_social_links: data.design.footer.links.map((i: ISocialLink) => {
          return { social_network: i.socialNetwork, link_url: i.address };
        }),
      },
      is_draft: draft ? 1 : 0,
      is_published: draft ? 0 : 1,
      nav_stage: data.navStage,
      is_review: data.review != null,
    };
  }
}
