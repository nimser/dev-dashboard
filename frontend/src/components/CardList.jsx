import Card from "./Card";

export default function CardList({ resources }) {
  return resources?.map((rsc) => <Card key={rsc.id} resource={rsc} />);
}
