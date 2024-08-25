import { NotionAPI } from 'notion-client';

const GET = async (
  request: Request,
  context: {
    params: { id: string };
  },
) => {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage(context.params.id);

  return new Response(JSON.stringify(recordMap), {
    headers: { 'content-type': 'application/json' },
  });
};

export { GET };
