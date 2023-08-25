import Link from 'next/link';

type Props = {
  link: string,
  value: string,
  clss?: string
};

const LinkButton = ({ link, value, clss }: Props) => (
  <Link href={link} className={clss || "inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"}>
    {value}
  </Link>
);

export default LinkButton;