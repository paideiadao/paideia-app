import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const CancelLink: React.FC = (props) => {
  const router = useRouter();
  const { dao } = router.query;
  return <Link href={`/${dao}`}>{props.children}</Link>;
};

export default CancelLink;
