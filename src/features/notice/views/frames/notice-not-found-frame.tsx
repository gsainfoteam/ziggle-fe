import { Link } from '@tanstack/react-router';

export function NoticeNotFoundFrame() {
  // TODO: translate
  return (
    <div className="flex h-[calc(80vh)] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-3 text-4xl font-bold">404</h1>
        <p className="mb-3 text-xl">Notice not found</p>
        <Link to="/">
          <p className="bg-primary rounded-md px-4 py-1 text-lg">
            Go back to home
          </p>
        </Link>
      </div>
    </div>
  );
}
