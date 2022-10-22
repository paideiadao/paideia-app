export interface IUserSettings {
  showEmail: boolean;
  emailAddress: string;
  showPhone: boolean;
  phoneNumber: string;
  createProposal: boolean;
  voteCastCreatedProposal: boolean;
  proposalVotedEnded: boolean;
  votedAddendum: boolean;
  voteOnApproved: boolean;
  voteOnDenied: boolean;
  commentReply: boolean;
  followingNewProposal: boolean;
  terminationProposal: boolean;
}
