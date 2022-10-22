import { getDaoPath } from "@lib/utilities";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const CancelLink: React.FC = (props) => {
  const router = useRouter();
  const { id } = router.query;
  return <Link href={`${getDaoPath(id as string, "")}`}>{props.children}</Link>;
};

export default CancelLink;
