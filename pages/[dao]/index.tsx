import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import React from "react";
import Dashboard from "@components/dao/dashboard/Dashboard";
import { paths, props } from "@lib/DaoPaths";
import { useRouter } from "next/router";

export default function Dao() {
  return <Dashboard />;
}
