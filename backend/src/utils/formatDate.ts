import moment from "moment";

export default function formatDate(datetime: string | Date) {
  return moment(datetime).format("DD/MM/YYYY");
}
