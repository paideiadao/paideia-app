import { IComment } from "@components/dao/discussion/Comments";
import { AppApi } from "@lib/AppApi";
import { AbstractApi } from "@lib/utilities";

interface ICommentPut {
  user_details_id: number;
  comment: string;
  parent: number;
}

export default class CommentsApi extends AbstractApi {
  api: AppApi;
  proposalId: number;

  constructor(api: AppApi, proposalId: number) {
    super();
    this.api = api;
    this.proposalId = proposalId;
  }

  commentData(comment: IComment): ICommentPut {
    return {
      user_details_id: this.api.daoUserData.id,
      comment: comment.comment,
      parent: comment.parent,
    };
  }

  publish(comment: IComment): Promise<any> | void {
    let data = this.commentData(comment);
    return this.put(
      `/proposals/comment/${this.proposalId}`,
      data,
      "Added comment"
    );
  }
}
