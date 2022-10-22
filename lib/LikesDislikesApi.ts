import { IComment } from "@components/dao/discussion/Comments";
import { AppApi } from "@lib/AppApi";
import { AbstractApi } from "@lib/utilities";
import { IDiscussion } from "@pages/[dao]/discussion/create";

type LikeDislikeAction = "like" | "dislike" | "remove";

interface ILikeDislikePut {
  user_details_id: number;
  type: LikeDislikeAction;
}

export default class LikesDislikesApi extends AbstractApi {
  api: AppApi;
  putUrl: string;

  constructor(api: AppApi, putUrl: string) {
    super();
    this.api = api;
    this.putUrl = putUrl;
  }

  likeDislikeData(type: LikeDislikeAction): ILikeDislikePut {
    return {
      user_details_id: this.api.daoUserData.id,
      type: type,
    };
  }

  like(): Promise<any> | void {
    let data = this.likeDislikeData("like");
    return this.put(this.putUrl, data, "");
  }

  dislike(): Promise<any> | void {
    let data = this.likeDislikeData("dislike");
    return this.put(this.putUrl, data, "");
  }

  remove(): Promise<any> | void {
    let data = this.likeDislikeData("remove");
    return this.put(this.putUrl, data, "");
  }
}
