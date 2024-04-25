import { IComment } from "@components/dao/discussion/Comments";
import { AppApi } from "@lib/AppApi";
import { AbstractApi } from "@lib/utilities";

interface ICommentPut {
  user_details_id: number;
  comment: string;
  parent: string;
}

export default class CommentsApi extends AbstractApi {
  api?: AppApi;
  proposalId: string;

  constructor(api: AppApi | undefined, proposalId: string) {
    super();
    this.api = api;
    this.proposalId = proposalId;
    this.setAlert = api?.setAlert ?? (() => {});
  }

  commentData(comment: IComment): ICommentPut {
    return {
      user_details_id: this.api?.daoUserData.id,
      comment: comment.comment,
      parent: comment.parent,
    };
  }

  publish(comment: IComment): Promise<any> | void {
    const data = this.commentData(comment);
    return this.put(
      `/proposals/comment/${this.proposalId}`,
      data,
      "Added comment"
    );
  }

  deleteComment(id: string): Promise<any> {
    return this.delete(`/proposals/comment/${id}`, {}, "Deleted comment");
  }

  deleteDiscussion(): Promise<any> {
    return this.delete(
      `/proposals/${this.proposalId}`,
      {},
      "Deleted Discussion"
    );
  }
}
