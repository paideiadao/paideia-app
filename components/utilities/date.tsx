import { parseISO, format } from "date-fns";

export default function Date({ dateString, formatString }: any) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, formatString)}</time>;
}
