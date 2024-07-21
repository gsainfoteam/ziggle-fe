import { redirect } from 'next/navigation';

export default async function CreateGroup() {
  redirect(`/createGroup/name`);
}
